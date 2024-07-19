import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        injectTo: 'head',
        tags: [
          {
            tag: 'meta',
            attrs: {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'resources/js'),
    },
  },
});
