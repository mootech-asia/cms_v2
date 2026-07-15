# 萬用設計系統計劃(R0–R7)— 驗收基準文件

> 本文件是唯一驗收基準。所有「完成」宣告必須逐字對照 §1 的原文,
> 不得對照任何衍生清單。**任何項目不得由執行者自行省略、降級或延後;
> 需要調整範圍時必須回頭取得使用者同意。**

---

## 1. 使用者原文(逐字,驗收對照用)

### 1-A. 全局整理指令(原始)

> 剛剛有commit了新資料,先同步
> 然後幫我檢視全站,所有的樣式,顏色,風格字體大小,字距,行高。以及我可能沒有提到,但是跟全局有關的都要包含進去
> 整體要有層級感,
> 要特別檢查是否有因為疊加製作而累積的多餘代碼,或是多餘的隱藏的結構
> 我要做一次全局的大整理與重新規劃
> 要保證維持原版面的情況下,對整體做有效整理,與style樣式整理與再規劃
> 手機版pc版本都要做,列一個報告給我,然後給我一個階段性計劃,評估是否能在usage之內一次完成

### 1-B. 配合工程師的開發規範(逐字)

> 使用的框架為Nuxt4, UI framework是 Primevue, CSS是 TailwindCSS,狀態管理是Pinia
> 開發規則如下:
> 1. CSS樣式請放在適合tailwindcss 的地方
> 2. 若有共用的組件請抽取出來用
> 3. 邏輯的部分可做一個占位方法,但略過實作
> 4. 如果某些功能適合使用primevue,請儘量使用primevue component來實作,並讓組件的樣式方便後續調整
> 5. 這是一個純UI的網站,目標是讓工程師可快速將nuxt組件拿去使用,不用再調整CSS樣式

### 1-C. 執行原則指令

> 我需要你在這個專案製作完後。建立一個未來我需要做其他模板的規範
> 並且由你來直接給我範本模板
> 所以我需要你在這個專案能盡量完美執行就完美執行
> 有了完美執行的經驗,我再去調整其他模板
> 這樣我每次生成的新設計都可以讓與我配合的工程師接續著做
> 所以我力求程式碼乾淨,已經不重複設計樣式,同樣的設計要多層套用
> 邏輯要有層次(這句話,要套用在所有全部專案架構)
> 我要的是完美執行
> 這個session不夠我們可以分階段把它完美執行完畢
> 絕對不准再給我自行省略貨或是忽略我要做的事情

### 1-D. 模板產品線指令(2026-07-15 新增,共四條)

> １．根據目前的網站所有內容,給我一個網站的結構路線圖wirframe,以一張圖完整呈現目前的結構圖給我

> ２．我要求的整個網站的style要幫我能夠獨立拆分出來,除了style的寫法與排列要讓人類看得懂之外,未來我會以這隻style去做變體,來切換整體網站的skin,根據我這個目的,你去看看對現在的重構有沒有要修改計劃的,所以我要求的要你做樣式整理就是要達成這樣的目的

> ３．我要求網站的每一個區塊主要區塊都要做３－５種變體,並且以目前的內容去做一個控制後台,因為我是要幫公司設計不同模板去賣系統,所以我需要盡可能地去變換網站創意,以及區塊的排列順序調整都要能在後台去控制變換

> ４．以後的開發留成順序是 , 我會利用設計後台 來做一個新版面,然後根據目前的版面再去編成能讓工程師接手的代碼, 根據目前給工程師的設計, 我還要做一個給客戶用的後台控制系統, 以上所有的規劃 , 我知道這是一個巨大的改變以及大工程,幫我設定一個完整的階段性規劃, 我們來分階段的打造出這個萬用的設計系統。以上

2026-07-15:1-D 的解讀(模板產品線:皮膚層/變體層/組合層/雙後台/產線工作流)已向使用者覆述並獲確認(「好的開始」)。
1-D-1 已交付(結構圖 PNG + artifact)。

---

## 2. 目標定義(由 §1 逐字導出)

1. 交付物 = `frontend/` 的 Nuxt 4 專案:純 UI、元件可直接被工程師取用、不需再調 CSS(1-B.5)。
2. 樣式規則層 = theme token + `@layer components` + PrimeVue brand preset;**同一視覺只允許一份定義,多處套用**(1-B.1、1-C)。
3. 重複 UI 一律抽成元件;頁面 = 資料 + 元件組合(1-B.2)。
4. 邏輯分層:Pinia store(占位 action)→ composable → 元件;mock 資料集中管理(1-B.3、1-C「邏輯要有層次」)。
5. 適用場景一律使用 PrimeVue 元件,樣式由 preset 集中調(1-B.4)。
6. 疊加產生的多餘代碼與隱藏結構清除:JS 注入樣式、執行期 !important 覆蓋、雙前端重複維護(1-A)。
7. 版面維持:與現行正式站視覺一致(PrimeVue 替換容許 1–2px 級容差,逐頁截圖比對留證)(1-A)。
8. 手機版 + PC 版皆驗收(1-A)。
9. 完成後產出:未來模板開發規範 + 可直接複用的範本模板(1-C)。
10. **皮膚層**:全站視覺參數(色彩/字體/字距/行高/圓角/漸層/陰影)收斂為獨立、人類可讀的 `themes/*.css`(CSS 變數);`tailwind.config` 與 PrimeVue preset 改讀同一組變數(單一來源、不得重複定義);複製檔案改值 = 新皮膚,整站換裝(1-D-2)。
11. **區塊變體**:每個主要區塊 3–5 種變體,吃同一份內容與皮膚;頁面 = 設定檔(放哪些區塊/各用哪個變體/順序/開關)驅動渲染,不寫死(1-D-3)。
12. **設計後台**:換膚、選變體、拖拉排序、區塊開關、即時預覽,輸出工程師可接手的模板包(Nuxt 專案 + page-config);儲存為占位(1-D-3、1-D-4)。
13. **客戶後台**:終端客戶控制系統(內容文案/促銷/區塊開關與排序/換膚),可控範圍由模板定義;純 UI + 占位 API(1-D-4)。

## 3. 階段計劃

| 階段 | 內容 | 完成定義 |
|---|---|---|
| R0 ✅ | `tailwind.config.ts` 品牌 theme、`assets/css/main.css` @layer components、PrimeVue brand preset、規範對照文件 | 設定上線、build 通過、既有頁面零視覺變化 |
| R1 ✅ | 基礎元件層:PV 包裝(UiButton/UiInput/UiSelect/UiDatePicker/UiDialog/UiTag/UiTabs/UiAccordion)+ SectionTitle/UiCard;`/ui-kit` 展示頁 | 元件齊備、ui-kit 頁可視驗、皆用 theme token |
| R2(修訂) | `layouts/default` + `layouts/member`;區塊全面元件化;**頁面 = 區塊登錄表(registry)+ page-config 驅動渲染**(排序/開關架構在此打底);RecordPage(PV DataTable)套 5 個紀錄頁;會員頁瘦身;遊戲/promotion/about 頁元件化 | 無重複 chrome、無頁內複製貼上結構、scoped 原生 CSS 清零(允許 @apply)、頁面主區塊皆經 config 渲染 |
| R3(修訂) | **皮膚層獨立**:`themes/win100.css`(CSS 變數,人類可讀,唯一 token 來源)、tailwind.config 與 PV preset 改讀變數、第二套示範皮驗證整站換膚、移除 figma.css/tokens.css;Pinia 占位 action 補齊、mock 集中;全站雙視口截圖驗收;交接索引 | 改一支 theme 檔 = 整站換皮;5 條工程規範 + §1-A 逐字覆核通過 |
| R4 | **區塊變體庫**:主要區塊各 3–5 變體(banner/跑馬燈/賽事區/hero/遊戲牆/促銷區/會員卡/header/footer…);variant 命名規範;`/ui-kit` 擴為變體型錄 | 每主要區塊 ≥3 變體、型錄可視驗、變體皆吃同一 config 與皮膚 |
| R5 | **設計後台**(`/studio`):皮膚切換、每區塊變體選擇、拖拉排序、顯示開關、即時預覽、匯出模板包(page-config + theme 檔) | 可純後台操作組出新版面,輸出工程師可接手的模板包 |
| R6 | **客戶後台**:內容文案/促銷管理、區塊開關與排序(限模板授權範圍)、換膚;純 UI + 占位儲存 | 以 win100 內容可完整走完客戶操作流程 |
| R7 | 《模板開發規範》(資料夾結構/theme 建立流程/元件與變體抽取規則/config schema/命名/雙後台/驗收清單)+ starter 範本模板(去內容留骨架:theme、基礎元件、layouts、config、studio、文件) | 文件 + 範本可直接起新模板、工程師可直接遵循 |

## 4. 靜態站處置

Nuxt 為交付物;根目錄靜態站在 R3 驗收通過後由 `nuxt generate` 產物取代(或凍結為預覽),
終結雙前端重複維護。切換時點由使用者決定。變體/皮膚/雙後台一律只做在 Nuxt。

## 5. 進度紀錄

- [x] R0(2026-07-15:theme/@layer/preset 上線,46 路由 build 通過,5 頁 pixel-diff ≤0.3%(跑馬燈雜訊))
- [x] R1(2026-07-15:PV 包裝元件 ×10 + `/ui-kit` 型錄頁,139788f)
- [x] R2(2026-07-15:layouts/default+member 去重複 chrome;首頁 config-driven 渲染
  (site store + BlockRenderer + block registry);5 紀錄頁併入 RecordPage(PV DataTable);
  全站 scoped CSS 歸零 — 8 頁 + 5 元件皆已轉為 token utilities/`@layer components`。
  遺留待辦(交給 R3):AppHeader/AppFooter/MemberHeader/MemberSidebar/MobileBottomNav/
  home 區塊元件/personal-info/security/support 仍有任意值色碼 `bg-[#…]`,
  屬於 token 單一來源整併範圍,非 scoped CSS 問題)
- [x] R3(2026-07-15:皮膚層獨立 — `themes/win100.css`(RGB channel 變數,唯一 token 來源,含 PV ramp)
  + `themes/aurora.css` 示範皮;tailwind.config.ts 全色改讀 `rgb(var(x)/<alpha-value>)`、
  nuxt.config Win100 preset 改讀同組變數;`<html data-theme>` 由 site store `skin` 即時驅動
  (app.vue useHead),`/ui-kit` 加皮膚切換鈕可視驗;移除 `public/figma.css`+`tokens.css`,
  遷移其僅存依賴(hero-band→bg-g-hero、cms-back-button→btn-back、fw-800→font-extrabold);
  AppHeader/AppFooter/MemberHeader/MemberSidebar/MobileBottomNav/5 個 home 區塊元件/
  personal-info/security/support 任意值色碼與 Tailwind 內建 gray/white/red 全數歸零改用 token
  (含 JS-injected hover style 清除);GameModal/AutoRefreshTimer/RecordPage 同步補上遺漏 token;
  bank/records store 補 addAccount/removeAccount/refresh 佔位 action 並接上頁面呼叫,移除死代碼
  ui.ts store;6 個首頁區塊元件的重複貼上 markup 抽成 `config/mock/home.ts` 資料陣列 + v-for。
  驗證:`nuxt build` 通過;win100 皮膚 5 頁雙視口 pixel-diff 0%(僅跑馬燈捲動雜訊同 R0);
  Aurora 皮膚同 5 頁截圖確認 header/nav/hero/badge/會員頁側欄全站隨皮膚切換。
  docs/style-guide.md 已改寫為 Nuxt-only、對照新 token 名稱與來源。)
- [x] R4(2026-07-15:區塊變體庫 — 10 個主要區塊各 3 變體(v1 現行版面 + v2/v3 新版面):
  home-banner(左靠雷達點陣/置中卡片/分割主打+縮圖欄)、home-ticker(水平跑馬燈/單則輪播/靜態
  chip 列)、home-live-sport(橫向捲動卡/直列賽事列/密集網格)、home-hot-games(橫向 rail/固定
  網格/大卡常駐資訊列)、home-mini-games(底線 tabs+rail/pill tabs+網格/三分類同屏)、
  home-promotion(桌機網格+手機捲動雙份/單一響應式 2x2/精簡列表)、category-hero(置中/左靠+icon/
  精簡)、member-card(擬物卡面/清單列/緊湊 chip)、site-header(單列右靠/雙列置中 nav/左 nav 右
  actions)、site-footer(置中窄欄/三欄/單行極簡)。變體命名規範入 blocks.ts 註解(v1 不可動、
  檔名 V2/V3 後綴、同內容同皮膚只換版面);其中 category-hero 同時把 6 頁重複貼上的 hero 段落
  收斂為單一元件、member-card 把 withdrawal 頁內嵌卡面抽成元件。`/ui-kit` 擴為變體型錄:每區塊
  變體切換鈕 + 即時渲染(吃 config/mock/home.ts 同一份內容)。
  驗證:`nuxt build` + `generate`(48 路由)通過;/ui-kit 型錄 v2/v3 全數截圖視驗;Aurora 皮膚下
  型錄抽查確認變體全部跟隨皮膚換色。)
- [x] R5(2026-07-15:設計後台 `/studio` — 左控制欄 + 右 iframe 即時預覽。
  皮膚切換(清單自動掃 `themes/*.css` 檔名,`utils/themes.ts`);全站 chrome(header/footer)
  變體選擇(site store 新增 `chrome` 狀態,`layouts/default.vue` 改為變體驅動);頁面區塊:
  變體選擇/顯示開關/拖拉排序(HTML5 drag + ↑↓ 鈕)/移除/從區塊庫新增(需 props 的區塊給示範值);
  即時預覽 = iframe 載 `/studio/preview`,草稿經 localStorage + storage 事件同步
  (`utils/studio-draft.ts`),iframe 是獨立視口所以桌機/手機 390 預覽的 RWD 是真的;
  「套用到本站」寫回 site store(儲存 API 維持占位);「匯出模板包」產 zip
  (`utils/zip.ts` 無依賴 stored-zip:README.md 接手說明 + page-config.json + themes/<skin>.css,
  皮膚原始碼經 nitro publicAssets `/themes/*.css` 取得 — .css 無法 ?raw import,Vite 會強套
  CSS pipeline)。
  驗證:build + generate 52 路由通過;Playwright e2e 9 項全過(換膚→iframe data-theme、
  變體切換、開關隱藏、↑↓/拖拉排序、手機 390 寬、匯出下載、套用後回首頁生效);
  匯出 zip 經 python zipfile 驗 CRC 全過、page-config 精準記錄操作、theme css 與來源逐位元相同。)
- [ ] R6
- [ ] R7

每階段完成:commit + 部署 + 一行報告(做了什麼/比對結果/下一步),不冗述。
