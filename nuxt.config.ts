// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@vee-validate/nuxt',
  ],
  css: [
    '@nordhealth/css/lib/nord.min.css',
    '@nordhealth/themes/lib/vet.css',
    '~/assets/scss/main.scss',
  ],
  // Source directory
  srcDir: 'client/',
  components: {
    dirs: [
      { path: './components', pathPrefix: false },
      { path: './features', pathPrefix: false },
    ],
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001/api',
    },
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
    strategy: 'no_prefix',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'no', name: 'Norsk', file: 'no.json' },
    ],
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes('-'),
    },
  },
});
