import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@primevue/nuxt-module'],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/', '/hot-games', '/mini-games', '/slot', '/sport', '/live', '/fish', '/promotion',
        '/account', '/deposit', '/withdrawal', '/personal-info', '/profit-loss', '/security',
        '/support', '/account-record', '/betting-record', '/deposit-record', '/withdrawal-record',
        '/about', '/change-password', '/banking-details',
      ],
    },
  },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: '/figma.css' },
        { rel: 'stylesheet', href: '/tokens.css' },
      ],
    },
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    },
  },
});
