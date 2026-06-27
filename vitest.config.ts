import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig } from 'vitest/config';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'output/**', 'test-results/**'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
});
