import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [
      ...configDefaults.exclude,
      "node_modules",
      "src/constants/**",
      "src/styles/**",
      "src/interfaces/**",
      "src/mirage",
      "**/*.mock.ts",
      "src/main.tsx",
      "src/App.tsx",
      "src/assets/**",
      "src/auth/**",
    ],
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        ...configDefaults.include,
        "node_modules",
        "src/constants/**",
        "src/styles/**",
        "src/interfaces/**",
        "src/mirage",
        "**/*.mock.ts",
        "src/main.tsx",
        "src/App.tsx",
        "src/assets/**",
        "src/auth/**", // Ignorando a pasta auth porque ainda não foi implementada.
      ],
    },
  },
});
