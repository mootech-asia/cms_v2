import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

/**
 * PrimeVue 品牌 preset(規範 1-B.4:元件樣式集中於此調整)。
 * primary 對齊 tailwind.config 的 primary(#98E7D2),
 * dark surface 對齊面板綠黑階。
 */
const Win100 = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#F0FBF8', 100: '#DCF5EE', 200: '#CBE8E4', 300: '#B2EDDC', 400: '#A5EAD7',
      500: '#98E7D2', 600: '#7FDFC4', 700: '#5ED0AF', 800: '#3DBD98', 900: '#2A9678', 950: '#1C6450',
    },
    colorScheme: {
      dark: {
        surface: {
          0: '#FFFFFF', 50: '#D1D5DB', 100: '#9CA3AF', 200: '#6B7280', 300: '#4B5563',
          400: '#374151', 500: '#2A3138', 600: '#232B36', 700: '#1F2937', 800: '#1A2128',
          900: '#0F1419', 950: '#0A0E12',
        },
      },
    },
  },
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@primevue/nuxt-module'],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/', '/hot-games', '/mini-games', '/slot', '/sport', '/live', '/fish', '/promotion',
        '/account', '/deposit', '/withdrawal', '/personal-info', '/profit-loss', '/security',
        '/support', '/account-record', '/betting-record', '/deposit-record', '/withdrawal-record',
        '/about', '/change-password', '/banking-details', '/ui-kit',
      ],
    },
  },
  app: {
    head: {
      /* 全站固定深色;PrimeVue preset 的 darkModeSelector 綁定此 class */
      htmlAttrs: { class: 'dark-mode' },
      link: [
        { rel: 'stylesheet', href: '/figma.css' },
        { rel: 'stylesheet', href: '/tokens.css' },
      ],
    },
  },
  primevue: {
    options: {
      theme: {
        preset: Win100,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    },
  },
});
