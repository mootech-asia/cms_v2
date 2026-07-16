import type { Component } from 'vue';
import ExampleHero from '~/components/blocks/ExampleHero.vue';
import ExampleHeroV2 from '~/components/blocks/ExampleHeroV2.vue';
import ExampleHeroV3 from '~/components/blocks/ExampleHeroV3.vue';
import ExampleCards from '~/components/blocks/ExampleCards.vue';
import ExampleCardsV2 from '~/components/blocks/ExampleCardsV2.vue';
import SiteHeader from '~/components/blocks/SiteHeader.vue';
import SiteFooter from '~/components/blocks/SiteFooter.vue';

/**
 * 區塊登錄表 — 頁面可被後台重組的最小單位。
 * key 是穩定識別碼(存進 page-config,不可任意改名)。
 *
 * 變體命名規範(docs/template-guide.md §4):
 * - registry key `v1` 一律是「預設版面」,不得刪除或改變視覺(相容性基準)。
 * - `v2`/`v3`(/`v4`/`v5`)是額外版面,每個主要區塊至少 3 個。
 * - 元件檔名 = v1 檔名 + `V2`/`V3` 後綴,與 v1 同目錄。
 * - 變體必須吃同一份內容(content store 或 props)與同一套皮膚 token,
 *   只能改版面/排列/裝飾,不得新增內容欄位或色碼。
 *
 * starter 內附範例:example-hero(3 變體,示範完整規範)、
 * example-cards(2 變體 — 起新模板時主要區塊要補到 ≥3)。
 */
export interface BlockDef {
  /** 後台顯示名稱 */
  label: string;
  /** variant key → 元件;'v1' 為預設版面 */
  variants: Record<string, Component>;
}

export const BLOCKS = {
  'example-hero': { label: '範例 Hero 輪播', variants: { v1: ExampleHero, v2: ExampleHeroV2, v3: ExampleHeroV3 } },
  'example-cards': { label: '範例卡片區', variants: { v1: ExampleCards, v2: ExampleCardsV2 } },
  'site-header': { label: '全站頂部導覽', variants: { v1: SiteHeader } },
  'site-footer': { label: '全站頁尾', variants: { v1: SiteFooter } },
} satisfies Record<string, BlockDef>;

export type BlockKey = keyof typeof BLOCKS;

/** 一個頁面區塊的組態:後台調的就是這個(順序 = 陣列順序) */
export interface SectionConfig {
  /** 頁內唯一 id(拖拉排序的 key;template.ts lockedSections 引用它) */
  id: string;
  block: BlockKey;
  /** 缺省 = 'v1' */
  variant?: string;
  /** 缺省 = true;後台的顯示開關 */
  enabled?: boolean;
  /** 傳給元件的 props(頁面級參數) */
  props?: Record<string, unknown>;
}
