// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxtjs/i18n'],
  css: ['@nordhealth/css/lib/nord.min.css', '@nordhealth/themes/lib/vet.css'],
  // Source directory
  srcDir: 'client/',
  components: {
    dirs: [
      { path: './components', pathPrefix: false },
      { path: './features', pathPrefix: false },
    ],
  },

  app: {
    head: {
      title: 'Product Sign-up',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: [{ code: 'en', name: 'English', file: 'en.json' }],
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes('-'),
    },
  },
});
