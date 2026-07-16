import { defineStore } from 'pinia';
import {
  banners as bannerSeed,
  promoCards as promoSeed,
  hotGames as gameSeed,
  type Banner,
  type PromoCard,
  type HotGame,
} from '~/config/mock/home';

/**
 * 站點內容 store(R6)— 客戶後台「內容文案/促銷管理」的編輯對象。
 * config/mock/home.ts 降為種子資料;區塊元件改讀這裡(banner/promotion 系列)。
 * 注意:actions 一律「就地變更」(splice/Object.assign),不得整條重新指派
 * 陣列 — 元件端持有的是陣列 reference,重新指派會斷開反應鏈。
 * 儲存為占位:正式環境改為 API 載入/寫回即可,元件不用動。
 */
export const useContentStore = defineStore('content', {
  state: () => ({
    banners: JSON.parse(JSON.stringify(bannerSeed)) as Banner[],
    promoCards: JSON.parse(JSON.stringify(promoSeed)) as PromoCard[],
    hotGames: JSON.parse(JSON.stringify(gameSeed)) as HotGame[],
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
    /** 遊戲管理(R6 追加 2026-07-16:上架/編輯含換圖/下架/排序) */
    addGame(g: HotGame) {
      this.hotGames.push({ ...g });
    },
    updateGame(index: number, patch: Partial<HotGame>) {
      const g = this.hotGames[index];
      if (g) Object.assign(g, patch);
    },
    removeGame(index: number) {
      this.hotGames.splice(index, 1);
    },
    moveGame(from: number, to: number) {
      if (to < 0 || to >= this.hotGames.length || !this.hotGames[from]) return;
      const [g] = this.hotGames.splice(from, 1);
      this.hotGames.splice(to, 0, g!);
    },
    /** 占位:正式環境接 API 寫回 */
    save() {
      this.savedAt = new Date().toLocaleTimeString();
    },
  },
});
