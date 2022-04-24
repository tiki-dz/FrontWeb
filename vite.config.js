import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 8090,
    proxy: {
      "/home/api": {
        target: "http://127.0.0.1:5002",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home/, '')
      },
      "/home/subList/api": {
        target: "http://127.0.0.1:5002",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/home\/subList/, '')
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
