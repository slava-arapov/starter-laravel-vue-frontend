import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = require('path');
export default defineConfig({
  plugins: [vue({
    template: {
      transformAssetUrls: {
        'v-img': ['src', ':src']
      }
    }
  })],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve('src') }
    ]
  }
});
