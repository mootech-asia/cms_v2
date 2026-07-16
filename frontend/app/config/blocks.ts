import { defineComponent, h, mergeProps, type Component } from 'vue';
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
 * - 每個主要區塊固定提供 v1-v10；v1-v3 保留既有獨立元件，v4-v10 由
 *   tenVariants() 將既有內容模板套入共用 Web3 layout system，避免複製 70 份邏輯。
 * - v4-v10 依序交錯使用三種既有資訊結構，再由 layout class 改變框架、密度、
 *   導覽排列與裝飾，因此功能、事件、slot 與 props 都會完整向下傳遞。
 * - 變體必須吃同一份內容(`config/mock/*.ts` 或呼叫端傳入的 props)與同一套皮膚 token,
 *   只能改版面/排列/裝飾,不得新增內容欄位或色碼(色碼只能用 tailwind.config 的語意 token)。
 */
export interface BlockDef {
  /** 後台顯示名稱 */
  label: string;
  /** variant key → 元件;'v1' 為現行版面 */
  variants: Record<string, Component>;
}

/**
 * 將 v4-v10 綁定到既有內容模板。wrapper 不宣告 props，所有 attrs 與 slots
 * 原樣傳給底層元件；class 只負責選擇 app/assets/css/main.css 的版面系統。
 */
function web3Variant(
  block: string,
  version: string,
  base: Component,
): Component {
  const blockName = block
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return defineComponent({
    name: `Web3${blockName}${version.toUpperCase()}`,
    inheritAttrs: false,
    setup(_props, { attrs, slots }) {
      return () => h(
        base,
        mergeProps(attrs, {
          class: [
            'web3-module',
            `web3-module--${block}`,
            `web3-layout--${version}`,
          ],
          'data-web3-layout': version,
        }),
        slots,
      );
    },
  });
}

function tenVariants(
  block: string,
  v1: Component,
  v2: Component,
  v3: Component,
): Record<string, Component> {
  return {
    v1,
    v2,
    v3,
    v4: web3Variant(block, 'v4', v1),
    v5: web3Variant(block, 'v5', v2),
    v6: web3Variant(block, 'v6', v3),
    v7: web3Variant(block, 'v7', v1),
    v8: web3Variant(block, 'v8', v2),
    v9: web3Variant(block, 'v9', v3),
    v10: web3Variant(block, 'v10', v1),
  };
}

export const BLOCKS = {
  'home-banner': {
    label: '首頁 Banner 輪播',
    variants: tenVariants('home-banner', AppBanner, AppBannerV2, AppBannerV3),
  },
  'home-ticker': {
    label: '中獎跑馬燈',
    variants: tenVariants('home-ticker', HomeTicker, HomeTickerV2, HomeTickerV3),
  },
  'home-live-sport': {
    label: 'Live Sport 即時賽事',
    variants: tenVariants('home-live-sport', HomeSportsPromo, HomeSportsPromoV2, HomeSportsPromoV3),
  },
  'home-hot-games': {
    label: 'Hot Games 熱門遊戲',
    variants: tenVariants('home-hot-games', HomeHotGamesRail, HomeHotGamesRailV2, HomeHotGamesRailV3),
  },
  'home-mini-games': {
    label: '遊戲速覽(Mini/Slot/Live)',
    variants: tenVariants('home-mini-games', HomeMiniGamesGrid, HomeMiniGamesGridV2, HomeMiniGamesGridV3),
  },
  'home-promotion': {
    label: '促銷區',
    variants: tenVariants('home-promotion', HomePromotion, HomePromotionV2, HomePromotionV3),
  },
  'category-hero': {
    label: '類別頁 Hero 橫幅',
    variants: tenVariants('category-hero', CategoryHero, CategoryHeroV2, CategoryHeroV3),
  },
  'member-card': {
    label: '會員銀行卡',
    variants: tenVariants('member-card', MemberCard, MemberCardV2, MemberCardV3),
  },
  'site-header': {
    label: '全站頂部導覽',
    variants: tenVariants('site-header', AppHeader, AppHeaderV2, AppHeaderV3),
  },
  'site-footer': {
    label: '全站頁尾',
    variants: tenVariants('site-footer', AppFooter, AppFooterV2, AppFooterV3),
  },
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
