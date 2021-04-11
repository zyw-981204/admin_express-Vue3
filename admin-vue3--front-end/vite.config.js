const path = require("path")
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  mode: "development",
  plugins: [vue()],
  server:{
    port: 8080,
    proxy:{
      '^/api/': {
        target: 'http://localhost:3000',
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  alias:{
    "@": path.resolve(__dirname, "src"),
    "@components": path.resolve(__dirname, "src/components"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@api": path.resolve(__dirname, "src/api/module"),
    "@css" : path.resolve(__dirname, "public/css")
  }
})
