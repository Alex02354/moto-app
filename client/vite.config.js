import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://moto-app.onrender.com",
        secure: true,
        changeOrigin: true,
      },
      "/events": {
        target: "https://moto-app.onrender.com",
        secure: true,
        changeOrigin: true,
      },
    },
  },
});
