/**
 * 皮膚清單:直接掃 assets/css/themes/*.css 的檔名(單一來源,新增皮膚檔
 * 即自動出現在 /studio 清單,不用改程式)。
 *
 * 注意:這裡的 glob 故意「非 eager、也不取內容」— 只用 keys。
 * .css 的 raw import 走不通:Vite 對 .css specifier 一律套 CSS pipeline
 * (?raw 會被追加 ?inline&used 而炸 RollupError)。皮膚原始 CSS 由
 * nuxt.config 的 nitro.publicAssets 以 /themes/<key>.css 曝露,
 * 匯出時用 fetchThemeSource() 取得。
 */
const loaders = import.meta.glob('../assets/css/themes/*.css');

/** 皮膚顯示名稱(業主命名;新皮膚檔未列入時以檔名顯示) */
export const THEME_LABELS: Record<string, string> = {
  win100: 'Emerald',
  aurora: 'Aurora',
  noir: 'Noir Gold',
  'fashion-blue': 'Fashion Blue',
  'rose-graphite': 'Rose Graphite',
  'cyber-green': '電競綠黑',
};
export const themeLabel = (key: string) => THEME_LABELS[key] ?? key;

export const THEME_KEYS = Object.keys(loaders)
  .map((p) => p.split('/').pop()!.replace('.css', ''))
  .sort((a, b) => (a === 'win100' ? -1 : b === 'win100' ? 1 : a.localeCompare(b)));

/** 取皮膚原始 CSS(R5 匯出模板包用) */
export async function fetchThemeSource(key: string): Promise<string> {
  const res = await fetch(withBase(`/themes/${key}.css`));
  if (!res.ok) throw new Error(`theme fetch failed: ${key} (${res.status})`);
  return res.text();
}
