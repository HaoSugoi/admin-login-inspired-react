import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// URL backend Render thật
const RENDER_API_URL = "https://chosachonline-datn.onrender.com";

export default defineConfig(({ command, mode }) => ({
  server: command === "serve" ? {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: RENDER_API_URL,
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  } : undefined,

  define: {
    __API_BASE_URL__: JSON.stringify(
      command === "serve" ? "/api" : RENDER_API_URL
    ),
  },

  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  base: "/", // 🔧 Bắt buộc nếu dùng React Router
  build: {
    outDir: "dist",
  },
}));
