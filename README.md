# eslint-config

ESLint config used at [Monogram](https://monogram.io/).

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

Depending on your project, add the following to a `.eslintrc.js` file:

#### Node.js rules

```js
module.exports = {
	extends: '@monogram/eslint-config/node'
}
```

_[See the rules](./node.js)_

#### Next.js rules

```js
module.exports = {
	extends: '@monogram/eslint-config/next'
}
```

_[See the rules](./next.js)_

#### Svelte

_coming soon_

#### Astro

_coming soon_
