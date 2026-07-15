import type { Component } from 'vue';
import AppBanner from '~/components/AppBanner.vue';
import AppBannerV2 from '~/components/AppBannerV2.vue';
import AppBannerV3 from '~/components/AppBannerV3.vue';
import AppHeader from '~/components/AppHeader.vue';
import AppHeaderV2 from '~/components/AppHeaderV2.vue';
import AppHeaderV3 from '~/components/AppHeaderV3.vue';
import AppFooter from '~/components/AppFooter.vue';
import AppFooterV2 from '~/components/AppFooterV2.vue';
import AppFooterV3 from '~/components/AppFooterV3.vue';
import CategoryHero from '~/components/CategoryHero.vue';
import CategoryHeroV2 from '~/components/CategoryHeroV2.vue';
import CategoryHeroV3 from '~/components/CategoryHeroV3.vue';
import MemberCard from '~/components/MemberCard.vue';
import MemberCardV2 from '~/components/MemberCardV2.vue';
import MemberCardV3 from '~/components/MemberCardV3.vue';
import HomeTicker from '~/components/home/Ticker.vue';
import HomeTickerV2 from '~/components/home/TickerV2.vue';
import HomeTickerV3 from '~/components/home/TickerV3.vue';
import HomeSportsPromo from '~/components/home/SportsPromo.vue';
import HomeSportsPromoV2 from '~/components/home/SportsPromoV2.vue';
import HomeSportsPromoV3 from '~/components/home/SportsPromoV3.vue';
import HomeHotGamesRail from '~/components/home/HotGamesRail.vue';
import HomeHotGamesRailV2 from '~/components/home/HotGamesRailV2.vue';
import HomeHotGamesRailV3 from '~/components/home/HotGamesRailV3.vue';
import HomeMiniGamesGrid from '~/components/home/MiniGamesGrid.vue';
import HomeMiniGamesGridV2 from '~/components/home/MiniGamesGridV2.vue';
import HomeMiniGamesGridV3 from '~/components/home/MiniGamesGridV3.vue';
import HomePromotion from '~/components/home/Promotion.vue';
import HomePromotionV2 from '~/components/home/PromotionV2.vue';
import HomePromotionV3 from '~/components/home/PromotionV3.vue';

/**
 * 區塊登錄表 — 頁面可被後台重組的最小單位(R2 打底,R4 擴充變體)。
 * key 是穩定識別碼(存進 page-config,不可任意改名)。
 *
 * 變體命名規範(R4):
 * - registry key `v1` 一律是「現行/預設版面」,不得刪除或改變視覺(既有頁面的相容性基準)。
 * - `v2`/`v3`(/`v4`/`v5`)是額外版面,每個主要區塊至少 3 個(v1+2 新)。
 * - 元件檔名 = 該區塊 v1 檔名 + `V2`/`V3` 後綴,與 v1 同目錄(如 `AppBanner.vue` → `AppBannerV2.vue`)。
 * - 變體必須吃同一份內容(`config/mock/*.ts` 或呼叫端傳入的 props)與同一套皮膚 token,
 *   只能改版面/排列/裝飾,不得新增內容欄位或色碼(色碼只能用 tailwind.config 的語意 token)。
 */
export interface BlockDef {
  /** 後台顯示名稱 */
  label: string;
  /** variant key → 元件;'v1' 為現行版面 */
  variants: Record<string, Component>;
}

export const BLOCKS = {
  'home-banner': { label: '首頁 Banner 輪播', variants: { v1: AppBanner, v2: AppBannerV2, v3: AppBannerV3 } },
  'home-ticker': { label: '中獎跑馬燈', variants: { v1: HomeTicker, v2: HomeTickerV2, v3: HomeTickerV3 } },
  'home-live-sport': { label: 'Live Sport 即時賽事', variants: { v1: HomeSportsPromo, v2: HomeSportsPromoV2, v3: HomeSportsPromoV3 } },
  'home-hot-games': { label: 'Hot Games 熱門遊戲', variants: { v1: HomeHotGamesRail, v2: HomeHotGamesRailV2, v3: HomeHotGamesRailV3 } },
  'home-mini-games': { label: '遊戲速覽(Mini/Slot/Live)', variants: { v1: HomeMiniGamesGrid, v2: HomeMiniGamesGridV2, v3: HomeMiniGamesGridV3 } },
  'home-promotion': { label: '促銷區', variants: { v1: HomePromotion, v2: HomePromotionV2, v3: HomePromotionV3 } },
  'category-hero': { label: '類別頁 Hero 橫幅', variants: { v1: CategoryHero, v2: CategoryHeroV2, v3: CategoryHeroV3 } },
  'member-card': { label: '會員銀行卡', variants: { v1: MemberCard, v2: MemberCardV2, v3: MemberCardV3 } },
  'site-header': { label: '全站頂部導覽', variants: { v1: AppHeader, v2: AppHeaderV2, v3: AppHeaderV3 } },
  'site-footer': { label: '全站頁尾', variants: { v1: AppFooter, v2: AppFooterV2, v3: AppFooterV3 } },
} satisfies Record<string, BlockDef>;

export type BlockKey = keyof typeof BLOCKS;

/** 一個頁面區塊的組態:後台調的就是這個(順序 = 陣列順序) */
export interface SectionConfig {
  /** 頁內唯一 id(拖拉排序的 key) */
  id: string;
  block: BlockKey;
  /** 缺省 = 'v1' */
  variant?: string;
  /** 缺省 = true;後台的顯示開關 */
  enabled?: boolean;
  /** 傳給元件的 props(頁面級參數,如 hero 標題) */
  props?: Record<string, unknown>;
}
