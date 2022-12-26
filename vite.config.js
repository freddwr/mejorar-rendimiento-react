import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
  },
  plugins: [react()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
});
