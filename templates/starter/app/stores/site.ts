import { defineStore } from 'pinia';
import type { SectionConfig } from '~/config/blocks';

/**
 * 站點組態 store — 設計後台(/studio)/客戶後台(/admin)調整的目標。
 * 頁面 = sections 陣列(順序即渲染順序);skin 驅動 <html data-theme>。
 * 儲存為占位:目前只留在記憶體,持久化 API 由工程師接。
 */
export const useSiteStore = defineStore('site', {
  state: () => ({
    skin: 'base',
    /** 全站 chrome(header/footer)使用的變體 — layouts/default.vue 讀這裡 */
    chrome: { header: 'v1', footer: 'v1' },
    pages: {
      home: {
        sections: [
          { id: 'hero', block: 'example-hero' },
          { id: 'cards', block: 'example-cards' },
        ] as SectionConfig[],
      },
    } as Record<string, { sections: SectionConfig[] }>,
  }),
  getters: {
    sectionsFor: (state) => (page: string): SectionConfig[] =>
      state.pages[page]?.sections ?? [],
  },
  actions: {
    /** 後台:調整區塊順序 */
    moveSection(page: string, from: number, to: number) {
      const list = this.pages[page]?.sections;
      if (!list || !list[from]) return;
      const [s] = list.splice(from, 1);
      list.splice(to, 0, s!);
    },
    /** 後台:切換區塊變體 */
    setVariant(page: string, id: string, variant: string) {
      const s = this.pages[page]?.sections.find((x) => x.id === id);
      if (s) s.variant = variant;
    },
    /** 後台:顯示開關 */
    toggleSection(page: string, id: string, enabled?: boolean) {
      const s = this.pages[page]?.sections.find((x) => x.id === id);
      if (s) s.enabled = enabled ?? !(s.enabled !== false);
    },
    /** 後台:換膚(themes/*.css) */
    setSkin(skin: string) {
      this.skin = skin;
    },
    /** 後台:全站 chrome 變體(header/footer) */
    setChrome(part: 'header' | 'footer', variant: string) {
      this.chrome[part] = variant;
    },
  },
});
