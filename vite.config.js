import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer()],
    },
  },
  build: {
    outDir: 'build', // Path to output directory for Django
    minify: true,
    rollupOptions: {
      input: {
        main: './src/main.tsx'
      }
    }
  }
});
