import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:5000/",
        target: "https://chat-1ykr.onrender.com/",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
