/* eslint-env node */
module.exports = {
  env: {
    browser: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "preact",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // "react/prop-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    // TODO: I would like to enable this rule eventually
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // TODO: This rule should ignore the JSX pragma... should file an issue
    "@typescript-eslint/no-unused-vars": [
      "error",
      { varsIgnorePattern: "^h$" },
    ],
  },
};
