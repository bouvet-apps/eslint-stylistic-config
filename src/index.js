import stylistic from "@stylistic/eslint-plugin";

const recommended = stylistic.configs.recommended;

export const base = {
  ...recommended,
  files: ["**/*.{js,es6}"],
  rules: {
    ...recommended.rules,
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/semi": ["error", "always"],
    "@stylistic/comma-dangle": ["error", "never"],
    "@stylistic/eol-last": ["error", "always"]
  }
};

export const vue = {
  ...base,
  files: ["**/*.vue"]
};

export const react = {
  ...base,
  files: ["**/*.jsx"],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  }
};

export default { base, vue, react };
