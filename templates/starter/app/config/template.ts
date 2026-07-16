/**
 * 模板授權範圍 — 客戶後台(/admin)可控範圍由模板定義:
 * 設計後台(/studio)是設計師工具、不受限;終端客戶只能在這份設定
 * 允許的範圍內操作。賣不同模板 = 換這份設定 + themes/*.css + page-config。
 */
export interface TemplateClientScope {
  /** 客戶可切換的皮膚(留空 = 不開放換膚) */
  skins: string[];
  /** 鎖定的區塊 id(不可隱藏、不可移動 — 模板的版面錨點) */
  lockedSections: string[];
  /** 可編輯的內容範圍 */
  editable: { banners: boolean; promos: boolean };
}

export const TEMPLATE = {
  name: 'starter',
  client: {
    skins: ['base', 'demo'],
    lockedSections: ['hero'],
    editable: { banners: true, promos: true },
  } satisfies TemplateClientScope,
};
