import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/homepage/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  }
})
