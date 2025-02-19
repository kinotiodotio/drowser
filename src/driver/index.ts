import { assert, Builder, By, isEmpty, Kia } from '../../deps.ts'
import type {
	Data,
	DriverParams,
	DrowserDriverResponse,
	DrowserServiceCase,
	DrowserThenableWebDriver,
} from '../types.ts'
import { isValidHttpUrl } from '../utils.ts'
import { driverBrowsers, seleniumExceptions } from '../constants.ts'
import { exportGeneratedLog, exportJSONReport } from './export.ts'
import { getConfig } from './config.ts'
import { validateParams } from './validate.ts'
import { processServiceCase } from './process.ts'

const driver = async ({
	browser,
}: DriverParams): Promise<DrowserDriverResponse> => {
	const data: Data = { url: '', results: [] }

	const config = await getConfig()
	data.url = config.url

	validateParams({ browser })

	return new Promise<DrowserDriverResponse>((resolve, reject) => {
		if (isEmpty(data.url) || !isValidHttpUrl({ url: data.url })) reject()

		const builder = new Builder()
			.forBrowser(driverBrowsers[browser])
			.build() as DrowserThenableWebDriver

		const service = { cases: [] }

		const kia = new Kia('Processing your tests')
		kia.start()

		builder
			.get(data.url)
			.then(() => resolve({ service }))
			.catch((error: Record<string, string>) => {
				kia.fail('An error occurred while running tests')
				reject(seleniumExceptions[error.name])
			})
			.finally(() => {
				const methodPromises: Promise<void>[] = []

				service.cases.forEach((serviceCase: DrowserServiceCase) => {
					if (typeof serviceCase === 'object') {
						const methodPromise = processServiceCase(
							serviceCase,
							builder,
							assert,
							By,
							browser,
							data,
						)
						methodPromises.push(methodPromise)
					}
				})

				const exportGeneratedFiles = () => {
					exportGeneratedLog({ results: data.results })
					exportJSONReport({
						results: data.results,
						browser,
					})
				}

				Promise.allSettled(methodPromises)
					.catch((error) => reject(error))
					.finally(() => {
						exportGeneratedFiles()
						kia.succeed(`All tests completed on ${browser}`)
						builder.quit()
					})
			})
	})
}

export default driver
