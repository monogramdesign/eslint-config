# eslint-config

ESLint config used at Monogram.

## Usage

### Automatic

Run the following command and follow the prompts.

```sh
npx @monogram/eslint-config
```

### Manual

Install dependencies

```sh
npm i -D eslint @monogram/eslint-config
```

Add the following to a `.eslintrc.js` file, while replacing ENVIRONMENT wih the name of a supported environment

```js
module.exports = {
	extends: ['@monogram/eslint-config/ENVIRONMENT']
}
```

## Supported Environments

- [node]("./node.js")
- [next]("./next.js")
- svelte _(coming soon)_

## TODO

- re-integrate [commit-lint](https://commitlint.js.org/) and husky pre-commit hooks
- reintegrate CHANGELOG.md versioning through [release-please](https://github.com/googleapis/release-please) since `standard-version` is deprecated
