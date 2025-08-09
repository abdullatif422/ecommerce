// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import ts from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: ts.configs["eslint-recommended"],
});

export default [
  // This object contains settings for all files.
  // We'll define language options and global variables here.
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // This object extends recommended configs for Next.js, TypeScript, and Prettier.
  // It's a convenient way to get a solid base of rules.
  ...compat.config({
    extends: ["next", "prettier"],
    // `files` is intentionally left out here as `compat.config` is for
    // converting legacy configs and doesn't directly handle file matching.
  }),

  // This is a dedicated configuration object for your TypeScript files.
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        project: "./tsconfig.json",
        projectService: true,
      },
    },
    plugins: {
      "@typescript-eslint": ts,
    },
    rules: {
      // Basic recommended rules from the plugin
      ...ts.configs.recommended.rules,

      // Your custom rules go here.
      // E.g., setting unused variables to 'warn' instead of the default 'error'.
      "@typescript-eslint/no-unused-vars": "warn",
      
      // Prevent HTML links for pages in Next.js
      "@next/next/no-html-link-for-pages": "off",

      // Warn on missing dependencies in React hooks
      "react-hooks/exhaustive-deps": "warn",

      // Warn on missing keys for list items
      "react/jsx-key": "warn",

      // Turn off this rule which can be annoying in some cases
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  },
];