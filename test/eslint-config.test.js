import assert from "node:assert/strict";
import stylistic from "@stylistic/eslint-plugin";
import { ESLint } from "eslint";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { base, react, vue } from "eslint-stylistic-config";

const eslint = new ESLint({
  overrideConfigFile: fileURLToPath(new URL("../eslint.config.js", import.meta.url))
});

async function lint(code, filePath = "sample.js") {
  const [result] = await eslint.lintText(code, { filePath });
  return result.messages.map(({ ruleId }) => ruleId);
}

const behaviorCases = [
  {
    ruleId: "@stylistic/arrow-parens",
    expected: "expression-bodied single-argument arrows omit parentheses",
    code: "const identity = (value) => value;\n"
  },
  {
    ruleId: "@stylistic/arrow-spacing",
    expected: "arrow functions have spaces around the arrow",
    code: "const identity = (value)=>value;\n"
  },
  {
    ruleId: "@stylistic/block-spacing",
    expected: "blocks have spaces just inside their braces",
    code: "function run() {return true;}\n"
  },
  {
    ruleId: "@stylistic/brace-style",
    expected: "else starts on a new line after a multiline block",
    code: "if (ready) {\n  run();\n} else {\n  stop();\n}\n"
  },
  {
    ruleId: "@stylistic/comma-dangle",
    expected: "multiline lists do not have a trailing comma",
    code: "const values = [\n  1,\n];\n"
  },
  {
    ruleId: "@stylistic/comma-spacing",
    expected: "a comma is followed by one space",
    code: "const values = [1,2];\n"
  },
  {
    ruleId: "@stylistic/comma-style",
    expected: "commas stay after the preceding item",
    code: "const values = [\n  1\n  , 2\n];\n"
  },
  {
    ruleId: "@stylistic/computed-property-spacing",
    expected: "computed property brackets have no inner spaces",
    code: "const value = object[ key ];\n"
  },
  {
    ruleId: "@stylistic/dot-location",
    expected: "a dot stays on the same line as its property",
    code: "const value = object.\n  property;\n"
  },
  {
    ruleId: "@stylistic/eol-last",
    expected: "files end with a newline",
    code: "const value = \"text\";"
  },
  {
    ruleId: "@stylistic/generator-star-spacing",
    expected: "generator stars have no space before and one after",
    code: "function *generate() { yield 1; }\n"
  },
  {
    ruleId: "@stylistic/indent",
    expected: "nested statements use two-space indentation",
    code: "if (ready) {\n    run();\n}\n"
  },
  {
    ruleId: "@stylistic/indent-binary-ops",
    expected: "continued binary expressions are indented",
    code: "const result = first +\nsecond;\n"
  },
  {
    ruleId: "@stylistic/key-spacing",
    expected: "object keys have a space after the colon",
    code: "const value = {key:\"text\"};\n"
  },
  {
    ruleId: "@stylistic/keyword-spacing",
    expected: "keywords are separated from parentheses",
    code: "if(ready) {}\n"
  },
  {
    ruleId: "@stylistic/lines-between-class-members",
    expected: "multiline class members are separated by a blank line",
    code: "class Example {\n  first() {\n    return 1;\n  }\n  second() {\n    return 2;\n  }\n}\n"
  },
  {
    ruleId: "@stylistic/list-style",
    expected: "single-line arrays have no inner spacing",
    code: "const values = [ 1, 2 ];\n"
  },
  {
    ruleId: "@stylistic/max-statements-per-line",
    expected: "each line contains at most one statement",
    code: "const first = 1; const second = 2;\n"
  },
  {
    ruleId: "@stylistic/multiline-ternary",
    expected: "multiline ternary operands each start on their own line",
    code: "const result = ready ?\n  first : second;\n"
  },
  {
    ruleId: "@stylistic/new-parens",
    expected: "zero-argument constructors use parentheses",
    code: "const instance = new Example;\n"
  },
  {
    ruleId: "@stylistic/no-extra-parens",
    expected: "function expressions do not get unnecessary parentheses",
    code: "const run = (function() {});\n"
  },
  {
    ruleId: "@stylistic/no-floating-decimal",
    expected: "decimal literals include a leading zero",
    code: "const value = .5;\n"
  },
  {
    ruleId: "@stylistic/no-mixed-operators",
    expected: "different logical operators are grouped explicitly",
    code: "const result = first && second || third;\n"
  },
  {
    ruleId: "@stylistic/no-mixed-spaces-and-tabs",
    expected: "indentation does not mix tabs and spaces",
    code: "function run() {\n \treturn true;\n}\n"
  },
  {
    ruleId: "@stylistic/no-multi-spaces",
    expected: "tokens are separated by one space",
    code: "const  value = 1;\n"
  },
  {
    ruleId: "@stylistic/no-multiple-empty-lines",
    expected: "there is at most one blank line between statements",
    code: "const first = 1;\n\n\nconst second = 2;\n"
  },
  {
    ruleId: "@stylistic/no-tabs",
    expected: "indentation uses spaces instead of tabs",
    code: "\tconst value = 1;\n"
  },
  {
    ruleId: "@stylistic/no-trailing-spaces",
    expected: "lines do not end with whitespace",
    code: "const value = 1; \n"
  },
  {
    ruleId: "@stylistic/no-whitespace-before-property",
    expected: "member access has no space before the dot",
    code: "const value = object .property;\n"
  },
  {
    ruleId: "@stylistic/operator-linebreak",
    expected: "a line-broken operator starts the next line",
    code: "const result = first +\n  second;\n"
  },
  {
    ruleId: "@stylistic/padded-blocks",
    expected: "blocks do not have blank padding around their contents",
    code: "function run() {\n\n  return true;\n}\n"
  },
  {
    ruleId: "@stylistic/quote-props",
    expected: "unnecessary quotes are omitted from object keys",
    code: "const value = {\"name\": 1};\n"
  },
  {
    ruleId: "@stylistic/quotes",
    expected: "JavaScript strings use double quotes",
    code: "const greeting = 'hello';\n"
  },
  {
    ruleId: "@stylistic/rest-spread-spacing",
    expected: "spread operators have no space before their operand",
    code: "const copy = [... values];\n"
  },
  {
    ruleId: "@stylistic/semi",
    expected: "statements end with semicolons",
    code: "const value = 1\n",
    acceptedCode: "const value = 1;\n"
  },
  {
    ruleId: "@stylistic/semi-spacing",
    expected: "semicolons have no space before them",
    code: "const value = 1 ;\n"
  },
  {
    ruleId: "@stylistic/space-before-blocks",
    expected: "a space precedes each block",
    code: "if (ready){}\n"
  },
  {
    ruleId: "@stylistic/space-before-function-paren",
    expected: "named function declarations have no space before the parenthesis",
    code: "function run () {}\n"
  },
  {
    ruleId: "@stylistic/space-in-parens",
    expected: "parentheses have no inner spaces",
    code: "run( value );\n"
  },
  {
    ruleId: "@stylistic/space-infix-ops",
    expected: "infix operators have spaces on both sides",
    code: "const value=1;\n"
  },
  {
    ruleId: "@stylistic/space-unary-ops",
    expected: "symbolic unary operators touch their operand",
    code: "const value = ! ready;\n"
  },
  {
    ruleId: "@stylistic/spaced-comment",
    expected: "line comments have a space after the marker",
    code: "//comment\n"
  },
  {
    ruleId: "@stylistic/template-curly-spacing",
    expected: "template expressions have no inner spaces",
    code: "const greeting = `Hello, ${ name }`;\n"
  },
  {
    ruleId: "@stylistic/template-tag-spacing",
    expected: "tagged templates have no space before the template",
    code: "const value = tag `text`;\n"
  },
  {
    ruleId: "@stylistic/wrap-iife",
    expected: "immediately invoked function expressions are wrapped",
    code: "const value = function() { return 1; }();\n"
  },
  {
    ruleId: "@stylistic/yield-star-spacing",
    expected: "yield stars have one space after and none before",
    code: "function* generate() { yield*items; }\n"
  },
  {
    ruleId: "@stylistic/jsx-closing-bracket-location",
    expected: "multiline closing brackets align with the opening tag",
    filePath: "sample.jsx",
    code: "const element =\n  <Button\n    disabled\n    />;\n"
  },
  {
    ruleId: "@stylistic/jsx-closing-tag-location",
    expected: "multiline closing tags start on their own aligned line",
    filePath: "sample.jsx",
    code: "const element = <Button>\n  text</Button>;\n"
  },
  {
    ruleId: "@stylistic/jsx-curly-newline",
    expected: "JSX expression braces use consistent line breaks",
    filePath: "sample.jsx",
    code: "const element = <Button value={value\n} />;\n"
  },
  {
    ruleId: "@stylistic/jsx-curly-spacing",
    expected: "JSX expression braces have no inner spaces",
    filePath: "sample.jsx",
    code: "const element = <Button value={ value } />;\n"
  },
  {
    ruleId: "@stylistic/jsx-equals-spacing",
    expected: "JSX attributes have no spaces around equals signs",
    filePath: "sample.jsx",
    code: "const element = <Button value = \"text\" />;\n"
  },
  {
    ruleId: "@stylistic/jsx-first-prop-new-line",
    expected: "the first prop starts on a new line when a multiline tag has multiple props",
    filePath: "sample.jsx",
    code: "const element = <Button disabled\n  label=\"text\" />;\n"
  },
  {
    ruleId: "@stylistic/jsx-function-call-newline",
    expected: "multiline JSX call arguments start and end on their own lines",
    filePath: "sample.jsx",
    code: "render(<Button>\n  text\n</Button>);\n"
  },
  {
    ruleId: "@stylistic/jsx-indent-props",
    expected: "multiline JSX props use two-space indentation",
    filePath: "sample.jsx",
    code: "const element = <Button\n first=\"one\"\n second=\"two\"\n/>;\n"
  },
  {
    ruleId: "@stylistic/jsx-max-props-per-line",
    expected: "multiline tags have at most one prop per line",
    filePath: "sample.jsx",
    code: "const element = <Button\n  first=\"one\" second=\"two\"\n/>;\n"
  },
  {
    ruleId: "@stylistic/jsx-one-expression-per-line",
    expected: "each JSX child starts on its own line",
    filePath: "sample.jsx",
    code: "const element = <div><span /><span /></div>;\n"
  },
  {
    ruleId: "@stylistic/jsx-quotes",
    expected: "JSX attribute values use double quotes",
    filePath: "sample.jsx",
    code: "const element = <Button label='text' />;\n"
  },
  {
    ruleId: "@stylistic/jsx-tag-spacing",
    expected: "self-closing tags have a space before the slash",
    filePath: "sample.jsx",
    code: "const element = <Button/>;\n"
  },
  {
    ruleId: "@stylistic/jsx-wrap-multilines",
    expected: "multiline JSX assignments are wrapped in parentheses",
    filePath: "sample.jsx",
    code: "const element = <Button>\n  text\n</Button>;\n"
  }
];

for (const { ruleId, expected, code, acceptedCode, filePath } of behaviorCases) {
  test(`${ruleId}: ${expected}`, async () => {
    assert.ok(
      (await lint(code, filePath)).includes(ruleId),
      `Expected ${ruleId} to report for:\n${code}`
    );
    if (acceptedCode) {
      assert.ok(
        !(await lint(acceptedCode, filePath)).includes(ruleId),
        `Expected ${ruleId} to accept:\n${acceptedCode}`
      );
    }
  });
}

const typescriptCases = [
  {
    ruleId: "@stylistic/member-delimiter-style",
    expected: "multiline interface members have no delimiters",
    code: "interface User {\n  name: string;\n  age: number;\n}\n"
  },
  {
    ruleId: "@stylistic/type-annotation-spacing",
    expected: "type annotations have no space before the colon",
    code: "const user : string = \"Ada\";\n"
  },
  {
    ruleId: "@stylistic/type-generic-spacing",
    expected: "generic brackets have no surrounding spaces",
    code: "const values: Array <string> = [];\n"
  },
  {
    ruleId: "@stylistic/type-named-tuple-spacing",
    expected: "named tuple labels are separated from their types",
    code: "type Range = [start : number];\n"
  }
];

for (const { ruleId, expected, code } of typescriptCases) {
  test(`${ruleId}: is enabled in the recommended config`, async () => {
    const config = await eslint.calculateConfigForFile("sample.js");
    assert.equal(config.rules[ruleId]?.[0], 2);
  });

  test.skip(`${ruleId}: ${expected} (requires a TypeScript parser)`, async () => {
    assert.ok((await lint(code, "sample.ts")).includes(ruleId));
  });
}

const jsxCurlyBraceCase = {
  ruleId: "@stylistic/jsx-curly-brace-presence",
  code: "const element = <Button icon={<Icon />} />;\n"
};

test("@stylistic/jsx-curly-brace-presence: JSX element props use expression braces", async () => {
  const { code, ruleId } = jsxCurlyBraceCase;
  assert.ok(!(await lint(code, "sample.jsx")).includes(ruleId));
});

test("has an example for every recommended rule", () => {
  const testedRuleIds = [
    ...behaviorCases.map(({ ruleId }) => ruleId),
    ...typescriptCases.map(({ ruleId }) => ruleId),
    jsxCurlyBraceCase.ruleId
  ].sort();
  const recommendedRuleIds = Object.keys(stylistic.configs.recommended.rules).sort();

  assert.deepEqual(testedRuleIds, recommendedRuleIds);
});

test("base lints both JavaScript and ES6 files", async () => {
  const baseLint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [base]
  });

  for (const filePath of ["src/sample.js", "src/sample.es6"]) {
    const [result] = await baseLint.lintText("const value = 'text';\n", { filePath });
    assert.ok(result.messages.some(({ ruleId }) => ruleId === "@stylistic/quotes"), filePath);
  }
});

test("exports the shared base config and project-specific file scopes", async () => {
  assert.ok(base.rules["@stylistic/quotes"]);
  assert.deepEqual(vue.files, ["**/*.vue"]);
  assert.deepEqual(react.files, ["**/*.jsx"]);
  assert.equal(react.languageOptions.parserOptions.ecmaFeatures.jsx, true);

  const vueLint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [vue]
  });
  const vueConfig = await vueLint.calculateConfigForFile("sample.vue");
  assert.equal(vueConfig.rules["@stylistic/quotes"][0], 2);

  const reactLint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [react]
  });
  const reactConfig = await reactLint.calculateConfigForFile("sample.jsx");
  assert.equal(reactConfig.languageOptions.parserOptions.ecmaFeatures.jsx, true);
  assert.equal(reactConfig.rules["@stylistic/quotes"][0], 2);
});

test("allows projects to override the base rules with later flat config entries", async () => {
  const projectLint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      base,
      {
        rules: {
          "@stylistic/quotes": ["error", "single"]
        }
      }
    ]
  });
  const config = await projectLint.calculateConfigForFile("sample.js");

  assert.equal(config.rules["@stylistic/quotes"][1], "single");
});
