import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This MUST match the path in your tsconfig
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
