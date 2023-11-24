import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": "http://localhost:5000",
      "/outfiles": "http://localhost:5000",
    },
  },
});
