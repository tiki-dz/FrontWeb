import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import $ from "jquery";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 8090,
    proxy: {
      "/home/api/admin/subCategory": {
        target: "http://192.168.15.37:7777/service-event/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, ""),
      },
      "/home/api/admin/codepromo": {
        target: "http://192.168.15.37:7777/service-purchase/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, ""),
      },
      "/home/api/admin/signup": {
        target: "http://192.168.15.37:7777/service-auth/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, ""),
      },
      "/home/api/autre/cities": {
        target: "http://192.168.15.37:7777/service-auth/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, ""),
      },
      "/home/api/payment/purchases": {
        target: "http://192.168.15.37:7777/service-purchase/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, ""),
      },

      "admin/client/activate": {
        target: "http://192.168.15.37:7777/service-auth/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, ""),
      },
      "/home/api/admin/event": {
        target: "http://192.168.15.37:7777/service-event/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, ""),
      },
      "/home/api/admin/category": {
        target: "http://192.168.15.37:7777/service-event/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, ""),
      },
      "/home/api/admin/Category": {
        target: "http://192.168.15.37:7777/service-event/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, ""),
      },
      "/api/admin/subCategory": {
        target: "http://192.168.15.37:7777/service-event/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, ""),
      },
      "/home/api/admin": {
        target: "http://192.168.15.37:7777/service-auth/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, ""),
      },
      "/home/api": {
        target: "http://192.168.15.37:7777/service-event/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, ""),
      },
      "/home/subList/api": {
        target: "http://192.168.15.37:7777/service-event/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home\/subList/, ""),
      },
      "/api/payment/purchase": {
        target: "http://192.168.15.37:7777/service-purchase/",
        changeOrigin: true,
        secure: false,
      },
      "/api/statistic/update": {
        target: "http://192.168.15.37:7777/service-auth/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, ""),
      },
      "/api/update/": {
        target: "http://192.168.15.37:7777/service-purchase/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/update/, "api"),
      },
      "/api/statistic/": {
        target: "http://192.168.15.37:7777/service-stat/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, ""),
      },
      "/api": {
        target: "http://192.168.15.37:7777/service-auth/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components(
      {
        resolvers: [ElementPlusResolver()],
      },
      $
    ),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
