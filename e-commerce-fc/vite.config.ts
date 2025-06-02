import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@components/ui": "/src/components/ui",
      "@assets": "/src/assets",
      "@hooks": "/src/hooks",
      "@context": "/src/context",
      "@utils": "/src/utils",
      "@api": "/src/api",
    },
  },
});
