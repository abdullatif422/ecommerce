// eslint.config.js
import js from "@eslint/js";

export default [
  // This is a configuration object
  {
    // These properties are all inside the object
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
    },
  },

  // Another configuration object for different file types
  {
    files: ["**/*.jsx"],
    // ... other properties for JSX files
  },
];