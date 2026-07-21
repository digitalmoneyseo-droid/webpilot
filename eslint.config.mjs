import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".astro/**", ".wrangler/**", "dist/**", "node_modules/**", "test-results/**", "tests/**/*.png"] },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs["flat/recommended"],
  { files: ["src/**/*.ts", "tests/**/*.ts"], rules: { "@typescript-eslint/no-explicit-any": "error" } }
);
