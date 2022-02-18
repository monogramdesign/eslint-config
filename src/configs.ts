export const availableConfigs = ['nextjs'] as const

export type AvailableConfigs = typeof availableConfigs
export type AvailableConfig = typeof availableConfigs[number]

export const nextjs = {
	config: {
		extends: [
			'airbnb',
			'airbnb/hooks',
			'eslint:recommended',
			'next', // = eslint-plugin-react / eslint-plugin-react-hooks / eslint-plugin-next
			'prettier'
		],
		rules: {
			indent: 'off'
		}
	},
	dependencies: ['eslint-config-prettier', 'eslint-config-airbnb', 'eslint-config-next']
}
