import { driver } from '../mod.ts'

driver({ browser: 'safari' })
	.then(({ service }) => {
		service.cases = [
			{
				name: 'Verify Failed Title',
				fn: async ({ builder, assert }) => {
					const title = await builder.getTitle()
					assert.assertEquals(title, 'Drowsers')
				},
			},
			{
				name: 'Verify Title',
				fn: async ({ builder, assert }) => {
					const title = await builder.getTitle()
					assert.assertEquals(title, 'Drowser')
				},
			},
		]
	})
	.catch((error) => console.log(error))
