/// <reference types="vitest" />
import viteConfig from './vite.config';
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['/tests/setup.js', '/tests/setupVuetify.js'],
    deps: {
      inline: ['vuetify']
    },
    coverage: {
      all: true
    }
  }
}));
