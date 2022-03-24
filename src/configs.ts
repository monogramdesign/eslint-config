// TODO: move each config to its own file then import here
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
				'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
				'jsx-a11y/anchor-is-valid': 'off' // TODO: enable this rule for anchors that are not within Next.js Link component
			}
		},
		dependencies: ['eslint-config-prettier', 'eslint-config-airbnb', 'eslint-config-next']
	},
	'nextjs-ts': {
		config: {
			parser: '@typescript-eslint/parser',
			plugins: ['@typescript-eslint', 'import'],
			settings: {
				'import/parsers': {
					'@typescript-eslint/parser': ['.ts', '.tsx']
				},
				'import/resolver': {
					typescript: {
						alwaysTryTypes: true // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
					}
				}
			},

			extends: [
				'airbnb',
				'airbnb/hooks',
				'eslint:recommended',
				'plugin:@typescript-eslint/recommended',
				'next', // = eslint-plugin-react / eslint-plugin-react-hooks / eslint-plugin-next
				'next/core-web-vitals',
				'prettier'
			],
			rules: {
				indent: 'off',
				'no-use-before-define': 'off',
				'no-else-return': [
					'error',
					{
						allowElseIf: true
					}
				],
				'import/extensions': 'off',
				'@typescript-eslint/ban-ts-comment': 'off',
				'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
				'react/jsx-props-no-spreading': 'off'
			}
		},
		dependencies: [
			'eslint-config-prettier',
			'eslint-config-airbnb',
			'eslint-plugin-import',
			'eslint-import-resolver-typescript',
			'@typescript-eslint/eslint-plugin',
			'@typescript-eslint/parser'
		]
	}
} as const

export const availableConfigs = Object.keys(configs) as Array<keyof typeof configs>

export type AvailableConfigs = typeof availableConfigs
export type AvailableConfig = typeof availableConfigs[number]
