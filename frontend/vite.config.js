import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// Dynamically find all .html files in the root folder so Vite builds all of them
const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
const input = {};
htmlFiles.forEach(file => {
  const name = file.replace('.html', '');
  input[name] = resolve(__dirname, file);
});

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input
    }
  }
});
