module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "react", "@typescript-eslint", "prettier", "jsx-a11y"],
  rules: {
    "prettier/prettier": "error",
    "jsx-quotes": ["error", "prefer-double"],
    "no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off"
  },
}
