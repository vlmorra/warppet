import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/relay': {
        target: 'https://relay.farcaster.xyz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/relay/, '')
      }
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST"
    }
  },
  define: {
    'process.env': {}
  }
});
