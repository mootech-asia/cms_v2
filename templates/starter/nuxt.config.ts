import { fileURLToPath } from 'node:url';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

/**
 * PrimeVue preset 讀皮膚變數(單一來源:app/assets/css/themes/*.css)。
 * 不得在此寫死 hex/px — 見 docs/template-guide.md §3。
 */
function rgbVar(name: string) {
  return `rgb(var(${name}))`;
}

const BrandPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: rgbVar('--c-primary-50'), 100: rgbVar('--c-primary-100'), 200: rgbVar('--c-primary-200'),
      300: rgbVar('--c-primary-300'), 400: rgbVar('--c-primary-400'), 500: rgbVar('--c-primary-500'),
      600: rgbVar('--c-primary-600'), 700: rgbVar('--c-primary-700'), 800: rgbVar('--c-primary-800'),
      900: rgbVar('--c-primary-900'), 950: rgbVar('--c-primary-950'),
    },
    colorScheme: {
      dark: {
        surface: {
          0: rgbVar('--c-surface-0'), 50: rgbVar('--c-surface-50'), 100: rgbVar('--c-surface-100'),
          200: rgbVar('--c-surface-200'), 300: rgbVar('--c-surface-300'), 400: rgbVar('--c-surface-400'),
          500: rgbVar('--c-surface-500'), 600: rgbVar('--c-surface-600'), 700: rgbVar('--c-surface-700'),
          800: rgbVar('--c-surface-800'), 900: rgbVar('--c-surface-900'), 950: rgbVar('--c-surface-950'),
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
  /* 皮膚層:CSS 變數檔,全部常駐,用 <html data-theme="..."> 切換生效皮膚;
     新增皮膚 = 複製一份、改值、加進這個陣列(docs/template-guide.md §3)。 */
  css: [
    '~/assets/css/themes/base.css',
    '~/assets/css/themes/demo.css',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  nitro: {
    /* 皮膚原始檔以 /themes/<key>.css 曝露(/studio 匯出模板包用)—
       repo 內仍只有 assets/css/themes/ 一份來源;.css 無法 ?raw import,
       Vite 會強套 CSS pipeline。 */
    publicAssets: [
      { baseURL: 'themes', dir: fileURLToPath(new URL('./app/assets/css/themes', import.meta.url)) },
    ],
    prerender: {
      crawlLinks: true,
      routes: ['/', '/ui-kit', '/studio', '/studio/preview', '/admin'],
    },
  },
  app: {
    head: {
      /* 全站固定深色;PrimeVue preset 的 darkModeSelector 綁定此 class。
         data-theme 預設 base,由 app.vue 綁 site store 的 skin 即時切換。 */
      htmlAttrs: { class: 'dark-mode', 'data-theme': 'base' },
    },
  },
  primevue: {
    options: {
      theme: {
        preset: BrandPreset,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    },
  },
});
