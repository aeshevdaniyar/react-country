import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@router": path.resolve(__dirname, "src/router"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@service": path.resolve(__dirname, "src/service"),
    },
  },
});
