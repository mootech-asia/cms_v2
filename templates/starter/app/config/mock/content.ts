/**
 * 內容種子資料(骨架佔位)— 起新模板時換成該模板的實際內容。
 * interface 是 content store 與後台編輯表單的合約,欄位增刪要同步
 * stores/content.ts 與 pages/admin.vue。
 */
export interface Banner {
  id: number;
  badge: string;
  title: string;
  highlight: string;
  sub: string;
  cta: string;
  /** 裝飾用重點色/背景 — 只能引用皮膚變數或中性值,不得寫死品牌色 */
  accent: string;
  bg: string;
}

export const banners: Banner[] = [
  { id: 1, badge: 'BADGE ONE', title: 'Headline', highlight: 'One', sub: 'SUPPORTING COPY GOES HERE', cta: 'Call to Action', accent: 'rgb(var(--c-primary-400))', bg: 'rgb(var(--c-surface-900))' },
  { id: 2, badge: 'BADGE TWO', title: 'Headline', highlight: 'Two', sub: 'SECOND SLIDE SUPPORTING COPY', cta: 'Learn More', accent: 'rgb(var(--c-primary-300))', bg: 'rgb(var(--c-surface-800))' },
];

export interface PromoCard {
  id: string;
  name: string;
}

export const promoCards: PromoCard[] = [
  { id: 'card-a', name: 'Card A' },
  { id: 'card-b', name: 'Card B' },
  { id: 'card-c', name: 'Card C' },
];
