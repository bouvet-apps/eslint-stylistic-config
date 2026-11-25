# eslint-stylistic-config

Composable ESLint flat configs for shared Stylistic rules, with optional Vue and
React file scopes. The package handles styling only; it does not add
framework-specific correctness or accessibility rules.

## Installation

```sh
npm install --save-dev eslint eslint-stylistic-config
```

ESLint 10 or later is required. The current Stylistic plugin declares
compatibility with ESLint 10; future ESLint major versions may need a plugin
update.

## Usage

Import only the configs the project needs. `base` targets `**/*.js` and
`**/*.es6` by default. Change its `files` pattern to restrict it to project
paths if needed. Configs later in the array can override any rule.

```js
import { base, react } from "eslint-stylistic-config";

export default [
  { ...base, files: ["src/**/*.{js,es6}"] },
  { ...react, files: ["src/**/*.{jsx,js}"] }
];
```

The `react` preset enables JSX parsing and targets `**/*.jsx` by default. Change
its `files` pattern to include `.js` or other project paths if needed.

The `vue` preset targets `**/*.vue`, but does not choose a Vue parser. Configure
`vue-eslint-parser` (or a Vue ESLint preset that configures it) in the project
alongside this stylistic config.

Available named exports are `base`, `vue`, and `react`. A default export also
contains those three configs.

## Development

Run `npm run lint` to check this project's style and `npm test` to run the tests.