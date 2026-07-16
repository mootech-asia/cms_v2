import { fileURLToPath } from 'node:url';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

/**
 * PrimeVue 品牌 preset(規範 1-B.4:元件樣式集中於此調整)。
 * 值讀 app/assets/css/themes/win100.css 的 CSS 變數(R3 皮膚層單一來源),
 * 與 tailwind.config 的 primary/surface 同步換皮 — 不在這裡寫死 hex。
 * 變數存的是「R G B」三個數字,這裡用 rgb(var(x)) 包成合法顏色值
 * (PrimeVue 不像 Tailwind 有透明度修飾語法,不需要 <alpha-value>)。
 */
function rgbVar(name: string) {
  return `rgb(var(${name}))`;
}

const Win100 = definePreset(Aura, {
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
  /* 皮膚層(R3):CSS 變數檔案,先於 Tailwind 編譯產物載入。
     兩份都常駐(無額外請求切換),用 <html data-theme="..."> 切換生效皮膚;
     新增皮膚 = 複製一份、改值、加進這個陣列(見 app/assets/css/themes/aurora.css)。 */
  css: [
    '~/assets/css/themes/win100.css',
    '~/assets/css/themes/aurora.css',
    '~/assets/css/themes/noir.css',
    '~/assets/css/themes/fashion-blue.css',
    '~/assets/css/themes/rose-graphite.css',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  nitro: {
    /* 皮膚原始檔以 /themes/<key>.css 曝露(R5 /studio 匯出模板包用)—
       repo 內仍只有 assets/css/themes/ 一份來源;raw import 走不通,
       因為 Vite 對 .css specifier 一律套 CSS pipeline(?inline&used)。 */
    publicAssets: [
      { baseURL: 'themes', dir: fileURLToPath(new URL('./app/assets/css/themes', import.meta.url)) },
    ],
    prerender: {
      crawlLinks: true,
      routes: [
        '/', '/hot-games', '/mini-games', '/slot', '/sport', '/live', '/fish', '/promotion',
        '/account', '/deposit', '/withdrawal', '/personal-info', '/profit-loss', '/security',
        '/support', '/account-record', '/betting-record', '/deposit-record', '/withdrawal-record',
        '/about', '/change-password', '/change-nickname', '/banking-details', '/ui-kit',
        '/admin', '/studio', '/studio/preview',
      ],
    },
  },
  app: {
    /* 預設 root '/';部署到子路徑(如 GitHub Pages 的 /cms_system_v2/)時用
       NUXT_APP_BASE_URL 於 build 時覆寫 — 在 config 期讀 env 才會同時
       套到 Vite base(import.meta.env.BASE_URL,withBase() 依賴它)。 */
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      /* 分頁名稱(業主定名 2026-07-17,不得更動):前台 CMS_前台_v2;
         後台頁各自 useHead 覆寫(CMS_後台_v2 / CMS_設計後台_v2) */
      title: 'CMS_前台_v2',
      /* 全站固定深色;PrimeVue preset 的 darkModeSelector 綁定此 class。
         data-theme 預設 win100,由 app.vue 綁定 site store 的 skin 即時切換。 */
      htmlAttrs: { class: 'dark-mode', 'data-theme': 'win100' },
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
