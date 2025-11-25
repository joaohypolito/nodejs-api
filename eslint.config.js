import js from "@eslint/js";
import json from "@eslint/json";
import globals from "globals";

export default [
  // Ignora arquivos que não devem ser lintados
  {
    ignores: ["node_modules/**"]
  },
  // Aplica regras recomendadas do ESLint
  js.configs.recommended,
  // Configuração para arquivos JavaScript (ES modules)
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    },
    rules: {
      "indent": ["error", 2],
      "linebreak-style": ["error", "windows"],
      "quotes": ["error", "double"],
      "semi": ["error", "always"]
    }
  },
  // Configuração para arquivos JSON
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json"
  }
];
