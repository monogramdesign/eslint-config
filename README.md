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
pnpm add -D eslint @monogram/eslint-config
```

Add the following to a `.eslintrc.js` file, while replacing `ENVIRONMENT` with the name of a supported environment

```js
module.exports = {
	extends: ['@monogram/eslint-config/<ENVIRONMENT>']
}
```

## Supported Environments

- [Node.js]("./node.js")
- [Next.js]("./next.js")
- Svelte _(coming soon)_
