const config = {
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
		'react/jsx-props-no-spreading': 'off',
		'@typescript-eslint/consistent-type-imports': 'error',
		'react/no-multi-comp': 'error',
		'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
		'react/prop-types': 'off', // Since we do not use prop-types
		'react/require-default-props': 'off', // Since we do not use prop-types
		'no-plusplus': [2, { allowForLoopAfterthoughts: true }] // allow ++ only in for loops
	}
}

export default config
