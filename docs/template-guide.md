# 模板開發規範(R7)

> 適用對象:要開發「新模板」的設計者與接手的工程師。
> 本規範由 WIN100 模板(`frontend/`)的完美執行經驗導出(rebuild-plan §1-C);
> 起新模板一律從 `templates/starter/` 複製,不要從 WIN100 複製再刪。
> 技術棧固定:Nuxt 4 + PrimeVue + TailwindCSS + Pinia(§1-B)。

---

## 1. 架構總覽(四層 + 雙後台)

```
皮膚層   assets/css/themes/<skin>.css     改值 = 換膚(唯一視覺參數來源)
變體層   components/**/<Block>[V2|V3].vue  同內容同皮膚,只換版面
組合層   config/blocks.ts + stores/site.ts 頁面 = 設定檔(放哪些區塊/變體/順序/開關)
內容層   stores/content.ts(種子 config/mock/*) 文案與清單資料,客戶可編輯
─────────────────────────────────────────────
/studio  設計後台(設計師):組版、換膚、選變體、排序、匯出模板包
/admin   客戶後台(終端客戶):文案/促銷/開關排序/換膚,範圍由 config/template.ts 授權
```

賣模板 = 皮膚(themes/*.css)+ 版面組合(page-config)+ 授權範圍(template.ts),
程式碼(元件/後台/渲染器)全模板共用。

## 2. 資料夾結構(固定,不得自創)

```
app/
  assets/css/
    main.css            @layer components 共用視覺(只能用 theme token)
    themes/<skin>.css   皮膚檔(人類可讀 CSS 變數;見 §3)
  components/
    ui/                 PrimeVue 包裝(UiButton/UiInput/…)— 全模板共用,勿改壞介面
    blocks/(或依域分類) 區塊元件與變體(<Block>.vue、<Block>V2.vue…)
    BlockRenderer.vue   依 SectionConfig[] 渲染(共用,勿動)
  config/
    blocks.ts           區塊登錄表 BLOCKS(key 穩定,存進 page-config)
    template.ts         模板授權範圍(客戶後台可控範圍)
    mock/               內容種子資料(interface + 陣列)
  stores/
    site.ts             skin + chrome + pages(sections)+ 後台 actions
    content.ts          可編輯內容(種子自 mock;actions 一律就地變更)
  layouts/default.vue   chrome(header/footer)由 BLOCKS 變體驅動
  pages/
    index.vue           = BlockRenderer + site store(config-driven,不寫死)
    ui-kit.vue          元件 + 變體型錄(驗收用)
    studio/…、admin.vue 雙後台(共用,通常不用改)
  utils/                zip/themes/studio-draft(共用,勿動)
```

## 3. 皮膚(theme)建立流程

1. 複製 `assets/css/themes/` 內任一皮膚檔為 `<新名>.css`。
2. 選擇器改成 `:root[data-theme="<新名>"]`(預設皮用 `:root`)。
3. 只改「值」,不增刪變數名;色彩一律 `R G B` 三個十進位數字
   (tailwind 以 `rgb(var(--c-x) / <alpha-value>)` 包裝,存 hex 會壞掉透明度運算)。
4. 在 `nuxt.config.ts` 的 `css` 陣列加入該檔。
5. 完成 — `/studio` 與 `/ui-kit` 的皮膚清單自動掃 `themes/*.css` 檔名出現新皮;
   `<html data-theme>` 由 site store `setSkin()` 即時切換,不需重編譯。

規則:
- **單一來源**:`tailwind.config.ts` 與 PrimeVue preset(nuxt.config.ts)只准讀
  theme 變數,不得出現寫死的 hex/px;元件裡禁任意值色碼(`bg-[#…]`)與
  Tailwind 內建色(gray/red/white…),只能用語意 token(`bg-surface`、`text-ink-2`…)。
- 字級/字距/行高各有固定階梯(見 docs/style-guide.md),新皮只能改值不能加階。

## 4. 區塊與變體規則

- 頁面上可被後台重組的最小單位是「區塊」;每個**主要**區塊要做 **3–5 種變體**。
- registry key `v1` 一律是預設版面,**不得刪除或改變視覺**(相容性基準)。
- 檔名 = v1 檔名 + `V2`/`V3` 後綴,與 v1 同目錄(`ExampleHero.vue` → `ExampleHeroV2.vue`)。
- 變體必須吃**同一份內容**(content store 或呼叫端 props)與**同一套皮膚 token**,
  只能改版面/排列/裝飾;不得新增內容欄位、不得出現色碼。
- 抽取判斷:同一段 markup 出現在 ≥2 處 → 抽成元件;元件內同構節點重複 ≥2 次
  → 抽成 mock 資料陣列 + `v-for`。
- 共用視覺(按鈕/輸入框/卡片…)進 `main.css` `@layer components`,禁 scoped CSS
  (允許 `@apply`);PrimeVue 元件優先,統一包裝在 `components/ui/`。

## 5. Config schema(存進 page-config 的合約)

```ts
// config/blocks.ts
export const BLOCKS: Record<string, {
  label: string;                        // 後台顯示名稱
  variants: Record<string, Component>;  // 'v1' 必存在
}>;

export interface SectionConfig {
  id: string;        // 頁內唯一(拖拉排序 key;template.ts 鎖定用這個)
  block: BlockKey;   // BLOCKS 的 key(穩定識別碼,不可改名)
  variant?: string;  // 缺省 'v1'
  enabled?: boolean; // 缺省 true
  props?: Record<string, unknown>;
}

// stores/site.ts
state: {
  skin: string;
  chrome: { header: string; footer: string };   // 全站 chrome 變體
  pages: Record<string, { sections: SectionConfig[] }>;
}

// config/template.ts — 客戶後台授權(模板定義客戶可控範圍)
TEMPLATE.client: {
  skins: string[];            // 客戶可切換的皮膚(空 = 不開放)
  lockedSections: string[];   // 版面錨點:不可隱藏、不可被擠動
  editable: { banners: boolean; promos: boolean };
}
```

`/studio` 匯出的模板包 = `README.md` + `page-config.json`(上述 shape)
+ `themes/<skin>.css`。工程師接手:皮膚檔放回 `themes/`、config 載入 site store
(正式環境改 API 載入/儲存,渲染端不用動)。

## 6. 命名

- 區塊 key:`<域>-<名>` 小寫連字(`home-banner`、`site-header`);**進了 page-config 就不可改名**。
- 元件:PascalCase;變體 `V2`/`V3` 後綴;PrimeVue 包裝 `Ui` 前綴。
- 皮膚:檔名即 key(`themes/aurora.css` → `data-theme="aurora"`)。
- section id:頁內唯一、小寫(`banner`、`hot-games`);模板鎖定(lockedSections)引用它。
- commit message 英文、聚焦動機。

## 7. 雙後台分工

| | /studio(設計師) | /admin(終端客戶) |
|---|---|---|
| 目的 | 組出新版面、產出模板包 | 在授權範圍內營運站點 |
| 皮膚 | 全部皮膚 | 限 `TEMPLATE.client.skins` |
| 變體選擇 | ✅(含全站 chrome) | ❌(變體是設計決策) |
| 區塊增刪 | ✅ | ❌ |
| 排序/開關 | ✅ 全部 | 限非 lockedSections |
| 內容文案/促銷 | ❌(內容是客戶資產) | ✅(限 editable 範圍) |
| 輸出 | 匯出模板包 zip | 占位儲存(接客戶 API) |

工作流(1-D-4;2026-07-17 業主整併:工廠與 WIN100 交付合一於 **cms_system_v2**):
1. 設計師在 cms_system_v2 的 `/studio` 組版 → 匯出模板包。
2. 產出新版本時以 `cms_system_v<版本號>` 建**交付 repo**(架構底目前為本 repo 的 Nuxt 版
   與 cms_system_v3 的 vue3-app 版),把模板包 + `templates/starter/` 組成新專案。
3. 工程師在交付 repo 內依協定的架構動手術(框架/結構調整只做在交付 repo)。
4. 該版本的後續編輯一律在其交付 repo 執行;工具與規範(starter/本文件/共用層)的演進回本 repo。
5. 終端客戶用該版本的 `/admin` 營運。

## 8. 驗收清單(每個新模板出貨前)

1. `nuxt build` 與 `nuxt generate` 零錯誤,所有路由 prerender 通過。
2. 全站 grep 零任意值色碼(`bg-[#`、`text-[#`…)、零 scoped CSS、零 Tailwind 內建色。
3. 每主要區塊 ≥3 變體,`/ui-kit` 型錄可視驗,變體切換不改內容。
4. 換膚驗證:每套皮膚跑代表頁截圖(桌機+手機雙視口),確認全站跟隨;
   基準頁改動用 pixel-diff 對照(數字異常才讀圖)。
5. `/studio` e2e:換膚/變體/開關/排序/手機預覽/匯出 zip(zip 用真實解析器驗 CRC
   與內容)/套用到本站。
6. `/admin` e2e:以模板內容走完客戶全流程(文案/促銷/開關排序/換膚/占位儲存),
   鎖定區塊確認不可動;回站點確認全部生效。
7. 文件同步:README(模板特有內容)+ 本規範引用的 schema 若有擴充,回寫本文件。

## 9. 從 starter 起新模板

```bash
cp -r templates/starter my-template && cd my-template
npm install && npm run dev
```

1. `themes/base.css` 複製改名 → 新皮膚(§3)。
2. 依設計稿把區塊做成元件 + 3–5 變體,登錄進 `config/blocks.ts`(§4)。
3. 內容種子放 `config/mock/`,接進 `stores/content.ts`;頁面 sections 進 `stores/site.ts`。
4. 調 `config/template.ts` 決定客戶可控範圍。
5. 跑 §8 驗收清單。

starter 內已含:皮膚兩套(base/demo)、Ui 元件層、BlockRenderer、
config-driven 首頁、範例區塊(hero ×3 變體、cards ×2 變體)、chrome 區塊、
`/ui-kit`、`/studio`(含匯出)、`/admin`,全部可直接運行。
