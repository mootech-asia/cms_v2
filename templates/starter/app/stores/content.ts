import { defineStore } from 'pinia';
import {
  banners as bannerSeed,
  promoCards as promoSeed,
  type Banner,
  type PromoCard,
} from '~/config/mock/content';

/**
 * 站點內容 store(R6)— 客戶後台「內容文案/促銷管理」的編輯對象。
 * config/mock/content.ts 為種子資料;區塊元件改讀這裡(banner/promotion 系列)。
 * 注意:actions 一律「就地變更」(splice/Object.assign),不得整條重新指派
 * 陣列 — 元件端持有的是陣列 reference,重新指派會斷開反應鏈。
 * 儲存為占位:正式環境改為 API 載入/寫回即可,元件不用動。
 */
export const useContentStore = defineStore('content', {
  state: () => ({
    banners: JSON.parse(JSON.stringify(bannerSeed)) as Banner[],
    promoCards: JSON.parse(JSON.stringify(promoSeed)) as PromoCard[],
    /** 最近一次(占位)儲存時間,admin 顯示用 */
    savedAt: null as string | null,
  }),
  actions: {
    /** 文案編輯:就地覆寫指定 banner 的欄位 */
    updateBanner(id: number, patch: Partial<Banner>) {
      const b = this.banners.find((x) => x.id === id);
      if (b) Object.assign(b, patch);
    },
    /** 促銷管理 */
    addPromo(name: string) {
      const id = `promo-${Date.now().toString(36)}`;
      this.promoCards.push({ id, name });
    },
    removePromo(id: string) {
      const i = this.promoCards.findIndex((x) => x.id === id);
      if (i >= 0) this.promoCards.splice(i, 1);
    },
    updatePromo(id: string, name: string) {
      const p = this.promoCards.find((x) => x.id === id);
      if (p) p.name = name;
    },
    movePromo(from: number, to: number) {
      if (to < 0 || to >= this.promoCards.length || !this.promoCards[from]) return;
      const [p] = this.promoCards.splice(from, 1);
      this.promoCards.splice(to, 0, p!);
    },
    /** 占位:正式環境接 API 寫回 */
    save() {
      this.savedAt = new Date().toLocaleTimeString();
    },
  },
});
