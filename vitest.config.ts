import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: [
      'client/**/*.test.ts',
      'client/**/*.spec.ts',
      'test/**/*.test.ts',
    ],
  },
  resolve: {
    alias: {
      '@': new URL('./client', import.meta.url).pathname,
      '~': new URL('./client', import.meta.url).pathname,
    },
  },
});
