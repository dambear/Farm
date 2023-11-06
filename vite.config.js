import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/send-message": "http://localhost:3001",
    },
  },

  build: {
    chunkSizeWarningLimit: 1000, // Set the limit to a higher value (in bytes)
  },

  plugins: [reactRefresh()],
})
