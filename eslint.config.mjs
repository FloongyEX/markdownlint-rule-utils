import js from "@eslint/js"
import globals from "globals"
import { defineConfig } from "eslint/config"
import stylingConfig from "@floongyex/eslint-config-styling"
import jest from "eslint-plugin-jest"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [stylingConfig.stylistic]
  },
  {
    files: ["test/*.test.{js,mjs,cjs}"],
    extends: [jest.configs["flat/recommended"]]
  }
])
