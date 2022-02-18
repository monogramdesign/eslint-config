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
			indent: 'off',
			'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
			'jsx-a11y/anchor-is-valid': 'off' // TODO: enable this rule for anchors that are not within Next.js Link component
		}
	},
	dependencies: ['eslint-config-prettier', 'eslint-config-airbnb', 'eslint-config-next']
}
