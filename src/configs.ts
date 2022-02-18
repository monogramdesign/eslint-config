export const configs = {
	nextjs: {
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
	},
	typescript: {
		config: {
			parser: '@typescript-eslint/parser',
			plugins: ['@typescript-eslint'],
			extends: [
				'airbnb',
				'airbnb/hooks',
				'eslint:recommended',
				'plugin:@typescript-eslint/recommended',
				'prettier'
			],
			rules: {
				indent: 'off',
				'no-use-before-define': 'off',
				'no-console': 'off',
				'no-else-return': [
					'error',
					{
						allowElseIf: true
					}
				],
				'import/extensions': 'off',
				'import/prefer-default-export': 'off',
				'@typescript-eslint/ban-ts-comment': 'off'
			},
			settings: {
				'import/resolver': {
					node: {
						extensions: ['.ts']
					}
				}
			}
		},
		dependencies: [
			'eslint-config-prettier',
			'eslint-config-airbnb',
			'@typescript-eslint/eslint-plugin',
			'@typescript-eslint/parser'
		]
	}
} as const

export const availableConfigs = Object.keys(configs) as Array<keyof typeof configs>

export type AvailableConfigs = typeof availableConfigs
export type AvailableConfig = typeof availableConfigs[number]
