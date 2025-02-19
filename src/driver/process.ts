import { assert, By, ThenableWebDriver } from '../../deps.ts'
import type {
	CaseFn,
	Data,
	DriverBrowser,
	DriverServiceCaseParamsBuilder,
	DrowserServiceCase,
} from '../types.ts'
import { result } from '../utils.ts'
import { caseStatus } from '../constants.ts'

type ByType = typeof By
type AssertType = typeof assert

export const processServiceCase = (
	serviceCase: DrowserServiceCase,
	builder: ThenableWebDriver,
	assert: AssertType,
	By: ByType,
	browser: DriverBrowser,
	data: Data,
): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		const omitedBuilder = builder as unknown as DriverServiceCaseParamsBuilder
		const megaBuilder = {
			builder: omitedBuilder,
			assert,
			by: By,
		}
		const method = serviceCase.fn as CaseFn
		const methodPromise = method(megaBuilder)

		const start = performance.now()

		methodPromise
			.then(() => {
				const end = performance.now()
				data.results.push(
					result({
						name: serviceCase.name,
						status: caseStatus.passed,
						timestamp: new Date(),
						duration: end - start,
						browser,
					}),
				)

				resolve()
			})
			.catch(() => {
				const end = performance.now()
				data.results.push(
					result({
						name: serviceCase.name,
						status: caseStatus.failed,
						duration: end - start,
						browser,
					}),
				)

				reject()
			})
	})
}
