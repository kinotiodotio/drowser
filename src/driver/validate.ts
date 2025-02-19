import { driverBrowserList } from '../constants.ts'
import { DriverParams } from '../types.ts'
import { isEmpty } from '../../deps.ts'

export const validateParams = (params: DriverParams): void => {
	const { browser } = params

	if (isEmpty(browser) || !driverBrowserList.includes(browser)) {
		throw new Error('An error occurred, please provide a valid browser driver')
	}
}
