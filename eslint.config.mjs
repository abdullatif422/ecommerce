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

const eslintconfig = [
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

  ...compat.config({
    extends: ["next", "prettier"],
  }),

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
      "@typescript-eslint/no-unused-vars": "warn",
      "@next/next/no-html-link-for-pages": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-key": "warn",
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      
      // --- Added Rules for Common Developer Mistakes ---

      // Ensures `const` is used for variables that are never reassigned.
      // This helps with code predictability and prevents bugs.
      "prefer-const": "error",
      
      // Enforces a consistent line ending style to prevent issues on different OS.
      "linebreak-style": ["error", "unix"],
      
      // Disallows trailing spaces at the end of lines.
      "no-trailing-spaces": "error",

      // Enforces a consistent semi-colon style.
      // It's recommended to choose one and stick with it.
      // For this example, we enforce semicolons.
      "semi": ["error", "always"], 
      
      // Enforces single quotes for strings unless a string contains a single quote.
      "quotes": ["error", "single", { "avoidEscape": true }],
      
      // Enforces consistent indentation, using 2 spaces.
      "indent": ["error", 2],
      
      // Disallows using the `any` type. This rule is great for ensuring type safety.
      // The default `@typescript-eslint/no-explicit-any` rule is an error.
      "@typescript-eslint/no-explicit-any": "error",
      
      // Avoids using the empty object type `{}` which can be overly permissive.
      // We recommend using `object` or `unknown` instead.
      "@typescript-eslint/no-empty-object-type": "error",
      
      // Enforces a consistent order of imports.
      "import/order": [
        "error",
        {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always"
        }
      ],
    },
  },
];

export default eslintconfig;