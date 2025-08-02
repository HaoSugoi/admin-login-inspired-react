import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";



export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve";

  return {
    // 👇 Base path để router hoạt động khi deploy lên Render
    base: "/",

    // 👇 Cho phép chạy local và kết nối API thật qua proxy
    server: isDev
      ? {
          host: true,
          port: 8080,
          proxy: {
            "/api": {
              target: "https://chosachonline-datn.onrender.com",
              changeOrigin: true,
              secure: false,
              configure: (proxy, _options) => {
                proxy.on("error", (err, _req, _res) => {
                  console.log("proxy error", err);
                });
                proxy.on("proxyReq", (proxyReq, req, _res) => {
                  console.log(
                    "Sending Request to the Target:",
                    req.method,
                    req.url
                  );
                });
                proxy.on("proxyRes", (proxyRes, req, _res) => {
                  console.log(
                    "Received Response from the Target:",
                    proxyRes.statusCode,
                    req.url
                  );
                });
              },
            },
          },
        }
      : undefined,

    // 👇 Cho phép chạy thử `vite preview` sau build
    preview: {
      port: Number(process.env.PORT) || 4173,
      host: true,
      allowedHosts: ["admin-login-inspired-react.onrender.com/"], // Tên miền React trên Render
    },

    // 👇 Build đầu ra cho Render
    build: {
      outDir: "dist",
    },

    

    plugins: [
      react(),
      mode === "development" && componentTagger(), // Optional plugin khi dev
    ].filter(Boolean),

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
