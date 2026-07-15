import type { Config } from 'tailwindcss';

/**
 * 品牌 theme — 全站唯一的設計代幣來源(規範 1-B.1)。
 * 語意命名,markup 一律使用這些 token,禁止任意值色碼(如 bg-[#98E7D2])。
 * 值全部讀 CSS 變數(R3 皮膚層,見 app/assets/css/themes/win100.css);
 * 改皮膚不必改這個檔案 — 換的是變數值,不是 token 名稱。
 * 變數存的是「R G B」三個數字(不是 hex),這裡用 rgb(var(x) / <alpha-value>)
 * 包起來,讓 bg-primary/10、border-primary/25 這類透明度寫法能正常運作。
 * 對照表見 docs/style-guide.md。
 */
function rgbVar(name: string) {
  return `rgb(var(${name}) / <alpha-value>)`;
}

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        /* 主色 */
        primary: { DEFAULT: rgbVar('--c-primary'), soft: rgbVar('--c-primary-soft'), faint: rgbVar('--c-primary-faint') },
        'on-primary': rgbVar('--c-on-primary'),
        /* 面板(綠黑系) */
        surface: { deep: rgbVar('--c-bg'), DEFAULT: rgbVar('--c-surface'), 2: rgbVar('--c-surface-2') },
        line: { DEFAULT: rgbVar('--c-border'), soft: rgbVar('--c-border-soft') },
        /* 文字四階 */
        ink: { DEFAULT: rgbVar('--c-text'), 2: rgbVar('--c-text-2'), 3: rgbVar('--c-text-3'), 4: rgbVar('--c-text-4') },
        /* 狀態/強調 */
        danger: rgbVar('--c-danger'),
        success: rgbVar('--c-success'),
        gold: rgbVar('--c-gold'),
        accent: rgbVar('--c-accent'),
        /* 銀行卡擬物卡面(全站唯一保留的藍黑系) */
        card: { 1: rgbVar('--c-card-face-1'), 2: rgbVar('--c-card-face-2'), 3: rgbVar('--c-card-face-3'), line: rgbVar('--c-card-border') },
      },
      fontSize: {
        display: ['var(--fs-display)', { lineHeight: 'var(--lh-heading)' }],
        h1: ['var(--fs-h1)', { lineHeight: 'var(--lh-heading)' }],
        h2: ['var(--fs-h2)', { lineHeight: 'var(--lh-heading)' }],
        'body-lg': ['var(--fs-body-lg)', { lineHeight: 'var(--lh-body)' }],
        body: ['var(--fs-body)', { lineHeight: 'var(--lh-body)' }],
        note: ['var(--fs-caption)', { lineHeight: 'var(--lh-body)' }],
        micro: ['var(--fs-micro)', { lineHeight: 'var(--lh-solid)' }],
      },
      letterSpacing: {
        wide2: 'var(--ls-wide)',   /* 小型標籤 */
        numeric: 'var(--ls-numeric)', /* 卡號/金額 */
      },
      backgroundImage: {
        'g-primary': 'var(--g-primary)',
        'g-hero': 'var(--g-hero)',
      },
      borderRadius: {
        ui: 'var(--radius-ui)', /* 按鈕/輸入框標準圓角 */
      },
      boxShadow: {
        mint: 'var(--shadow-mint)',
      },
    },
  },
};
