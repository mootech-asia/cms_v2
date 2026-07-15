import type { SectionConfig } from '~/config/blocks';
import type { useSiteStore } from '~/stores/site';

/**
 * 設計後台(/studio)草稿:studio 編輯的是這份 draft,不直接動 site store;
 * 透過 localStorage + storage 事件同步給 /studio/preview iframe 即時渲染。
 * 「套用到本站」才寫回 store(儲存 API 為占位,見 rebuild-plan §2-12)。
 */
export interface DraftConfig {
  skin: string;
  /** 全站 chrome 變體(header/footer 不屬於頁面 sections) */
  chrome: { header: string; footer: string };
  pages: Record<string, { sections: SectionConfig[] }>;
}

export const STUDIO_DRAFT_KEY = 'win100-studio-draft';

type SiteStore = ReturnType<typeof useSiteStore>;

export function buildDraft(store: SiteStore): DraftConfig {
  return JSON.parse(JSON.stringify({
    skin: store.skin,
    chrome: store.chrome,
    pages: store.pages,
  }));
}

export function applyDraft(store: SiteStore, draft: DraftConfig) {
  store.skin = draft.skin;
  store.chrome = { ...draft.chrome };
  store.pages = JSON.parse(JSON.stringify(draft.pages));
}

export function readDraft(): DraftConfig | null {
  if (!import.meta.client) return null;
  try {
    const raw = localStorage.getItem(STUDIO_DRAFT_KEY);
    return raw ? (JSON.parse(raw) as DraftConfig) : null;
  } catch {
    return null;
  }
}

export function writeDraft(draft: DraftConfig) {
  if (!import.meta.client) return;
  localStorage.setItem(STUDIO_DRAFT_KEY, JSON.stringify(draft));
}
