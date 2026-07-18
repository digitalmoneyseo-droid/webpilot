import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".astro/**", ".next/**", ".wrangler/**", "dist/**", "legacy-next-src/**", "node_modules/**", "test-results/**", "tests/visual/**/*.png", "worker-configuration.d.ts"] },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs["flat/recommended"],
  { files: ["src/**/*.ts", "tests/**/*.ts"], rules: { "@typescript-eslint/no-explicit-any": "error" } }
);
