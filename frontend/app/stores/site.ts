import { defineStore } from 'pinia';
import type { SectionConfig } from '~/config/blocks';
import { THEME_KEYS } from '~/utils/themes';

/**
 * 站點組態 store — R5 設計後台/R6 客戶後台調整的目標。
 * 頁面 = sections 陣列(順序即渲染順序);skin 供 R3 換膚。
 * 儲存為占位:目前只留在記憶體,持久化 API 由工程師接。
 */
export const useSiteStore = defineStore('site', {
  state: () => ({
    /** 前台分頁/站點名稱 — 命名權在後台:/admin(客戶)與 /studio(設計師)可改 */
    siteName: 'CMS_前台_v2',
    skin: 'win100',
    /** Studio 控制前台開放哪些 skin;預設全公開,縮到 0/1 個時前台切換器隱藏。 */
    publicSkins: [...THEME_KEYS] as string[],
    /** 全站 chrome(header/footer)使用的變體 — layouts/default.vue 讀這裡 */
    chrome: { header: 'v1', footer: 'v1' },
    pages: {
      home: {
        sections: [
          { id: 'banner', block: 'home-banner' },
          { id: 'ticker', block: 'home-ticker' },
          { id: 'live-sport', block: 'home-live-sport' },
          { id: 'hot-games', block: 'home-hot-games' },
          { id: 'mini-games', block: 'home-mini-games' },
          { id: 'promotion', block: 'home-promotion' },
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
    /** 後台:換膚(R3 接 themes/*.css) */
    setSkin(skin: string) {
      this.skin = skin;
    },
    /** 設計後台:控制前台可看見/可切換的 skin 清單 */
    setPublicSkins(skins: string[]) {
      this.publicSkins = [...new Set(skins.filter(Boolean))];
    },
    /** 後台:站點命名(命名權下放,見 CLAUDE.md 命名鐵則) */
    setSiteName(name: string) {
      if (name.trim()) this.siteName = name.trim();
    },
    /** 後台:全站 chrome 變體(header/footer) */
    setChrome(part: 'header' | 'footer', variant: string) {
      this.chrome[part] = variant;
    },
  },
});
