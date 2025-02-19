import { isEmpty, join } from '../../deps.ts'
import { isValidHttpUrl } from '../utils.ts'

export const getConfig = async (): Promise<{ url: string }> => {
	const configPath = join(Deno.cwd(), 'drowser.json')

	try {
		await Deno.stat(configPath)

		const { url } = JSON.parse(await Deno.readTextFile(configPath))

		if (isEmpty(url) || !isValidHttpUrl({ url })) {
			throw new Error(
				'An error occurred, please provide a valid url in drowser config',
			)
		}

		return { url }
	} catch (error) {
		if (error instanceof Deno.errors.NotFound) {
			throw new Error('An error occurred, please create drowser.json file.')
		}

		throw new Error(
			'An error occurred, please provide a valid url drowser.json file.',
		)
	}
}
