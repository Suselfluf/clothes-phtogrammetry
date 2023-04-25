import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // basicSsl() For enebling https 
  ],
  server: {
    port: 3000, // Default port => 3000
  },
});
