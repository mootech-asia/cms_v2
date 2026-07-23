# v2 前台去編譯化 Stage B（語意化）— 可執行計畫

> 建立:2026-07-23。承接 `docs/HANDOFF-2026-07-21.md` 路線圖 #3。
> 目標(業主 2026-07-23 親口):v2 前台收斂成**純 HTML+CSS+JS 且「手寫可讀」**
> —— 語意 class（非 utility soup）+ 手寫元件化 CSS，比照 v3 手寫 `assets/css/main.css` 模型。
> 本計畫供新 session 直接開衝(鐵則 5:新 session 便宜一個數量級);逐項驗證、功能對齊原版。

## 現況與規模(2026-07-23 實測確認)

| 項目 | 現況 |
|---|---|
| 前台頁 | `factory/win100/` 21 個 `.html`(index 776 class 屬性最多、ui-kit 1061 是 UI 參考頁) |
| HTML class | ~5,000+ utility class 屬性(`px-3.5 py-2.5 text-ink-2 hover:bg-surface-deep` 之類) |
| `assets/css/app.css` | **5,943 行「編譯 Tailwind dump」**(preflight `--tw-*` + 生成 utilities),非手寫,要換掉 |
| `assets/css/global.css` | 349 行,**已是手寫、語意、有註解的共用層**(範本/落腳處,如 `.cs-modal-ico`) |
| `assets/css/primevue.css` | 189 行 **PrimeVue 元件樣式,活的**(紀錄頁 DataTable + 篩選 DatePicker/Select 用 `.p-*`)。**Batch 3.1 曾誤刪出包,勿再當死碼刪** |
| `assets/js/site.js` | 2,693 行,以 class/id 為行為 hook:querySelector×141 + classList×51 + getElementById×2 ≈ **194 耦合點** |

**目標模型**:v3 `assets/css/main.css`(手寫原始 styles.css,語意 class)+ v2 現有 `global.css` 的組織風格(依元件分段、繁中註解、只用 `rgb(var(--c-*))` token)。

## 核心策略:非破壞式增量(全程網站不斷、可逐步驗證)

utility class 與語意 class 是可共存的普通 class。策略:**逐元件把 utility→語意 + 補手寫 CSS,`app.css` 留到最後才拆**。每一步網站照常運作,rendering 不變即通過。順序:

1. **共用 shell**(sidebar / topbar / footer / bottom-nav / 三個 modal 外殼)——出現在全 21 頁,先轉語意收益最大。設計語意 class(參 v3:`sb-item`/`.shell`…風格,但沿用 v2 既有共用件命名 `mode-tabs`/`dd-panel`/`mf-modal`/`btn-*`)→ 寫手寫 shell CSS → 機械替換全頁 shell markup → 同步 site.js shell hook(抽屜 toggle、nav)。
2. **共用元件**:遊戲卡/Rail、紀錄頁表格、篩選列、modal 內容。**紀錄頁 DataTable(PrimeVue `.p-datatable` markup + `primevue.css`)要改寫成手寫 `<table>` + 手寫 CSS**,做完才可移除 `primevue.css`。DatePicker/Select 篩選同理。
3. **各頁專屬內容**:逐頁(account/deposit/withdrawal/promotion/about/support/personal-info/security/…)轉語意。
4. **site.js hook**:每轉一塊,同步更新對應的 194 個 querySelector/classList 選擇器,逐狀態瀏覽器驗。
5. **收尾**:全站無 utility 引用後,`app.css` 只留 preflight/reset 手寫精簡版(或併入 global.css);移除 `primevue.css`(#2 完成後)。**purge 前先掃 `site.js` 字面字串**,保住 runtime 動態加的 class,勿誤刪。

## 驗證(業主標準:功能對齊原版 + 瀏覽器操作驗過,結構綠燈不算完成)

- `npm run verify:win100`(結構 9/9)+ `npm run serve:win100`(4173)+ `npm run verify:win100:behavior`(行為 31/31)。
- 每個增量:Playwright 對該頁/該狀態做 DOM 斷言 + 視覺不變(pixel-diff 數字,異常才讀圖、先裁段)。
- 每群完成 commit + push,更新本檔狀態欄與 task 清單。

## 分派(CLAUDE.md 省 token 鐵則)

- **設計(語意 class 命名、CSS 架構)= 主對話判斷**,不下放/不降級。
- **機械轉換(逐頁 markup find/replace、逐頁驗證)= sonnet subagent**;同一檔(site.js/app.css)序列化避免衝突,不同頁可平行。
- 大輸出導檔、回讀 grep;subagent 只回 OK/FAIL 摘要。

## 狀態欄

- [x] **1 共用 shell 語意化(2026-07-23 完成、全驗證)**
  - 全站頁首外層 `.site-topbar`(21 頁);會員殼 `.member-topbar-row/-mobile/-logo`
    + `.sb-item`/`.member-sidebar` + `.mobile-bottom-nav`/`.mbn-grid`/`.mbn-item`(11–20 頁)。
  - site.js 3 個 hook 已同步:Browse 鈕(`.mobile-bottom-nav`)、帳號列注入
    (`.member-topbar-mobile`/`.member-topbar-row`)。
  - 順手清掉 **58 個死的 router-link-active/exact-active**(全站,含大廳頁)。
  - 驗證:結構 9/9、行為 28/28、computed-style 逐項像素等價、帳號列注入/Browse→抽屜/
    皮膚切換行為皆確認。commits `aa9aa81` `219b574` `5afc345`。
- [~] 2 共用元件(部分完成)
  - [x] **mini 遊戲卡**(`.mini-card*`;buildMiniCard + 100 靜態卡)`1d55478`。
  - [x] **game 遊戲卡**(`.game-card*`;buildGameCard 主結構)`3eb07f0`,vendor grid 30 卡驗證。
  - [x] **promo 卡**(`.promo-card*`;10×2 靜態,hover 遮罩驗證)`bc41df6`。
  - [x] **球隊徽章條**(`.team-item/-badge/-badge-text/-name(+.clamp)`;index/sport/ui-kit 16×)`1945930`。
  - [x] **sports 比分卡**(`.match-card/-score/-status/-bet-btn`)`4296bac`。
  - [x] **得獎跑馬燈**(`.win-ticker/-item/-sep`)`6cad2e6`。
  - [x] **operation-promo 卡外框/標題/按鈕**(`.op-promo-card/-title/-btn`,保留 group)`04d7261`。
  - [x] **LIVE 徽章**(`.live-badge`,24×)`9b6ceca`。
  - [ ] **分類 tab(7×,`px-2 py-1.5 ...hover:bg-g-primary` pill)**——⚠️ 慣例待業主確認:
    CLAUDE.md「頁簽一律用 .mode-tabs(底線式)」,但這是 pill 式分類鈕,非底線頁簽;
    要嘛比照做成 `.cat-pill` 新共用件、要嘛改用 .mode-tabs。**先擱置待確認。**
  - [ ] dropdown 選單項(5×,`rounded-md ...hover:bg-surface-deep`,dd-panel 內)。
  - [ ] 大廳 app-header 內層(皮膚切換/帳號列/分類 nav — 較複雜)。
  - [ ] 紀錄頁 PrimeVue DataTable → 手寫 `<table>` + 手寫 CSS(做完才可移除 primevue.css)。
  - [ ] 其餘一次性區塊:hero、rewards banner、leaderboard/tournaments/providers 區段外框、
    sport 比分卡外框(全寬列變體)。多為合理版面 utility(flex/container),soup 已大幅清除。
- [ ] 3 各頁專屬內容逐頁(會員內容殘餘 utility、大廳內容區塊)
- [ ] 4 site.js 其餘 hook 同步 + 逐狀態驗
- [ ] 5 收尾:拆 app.css / 移除 primevue.css / purge 死碼(先掃 site.js 字面)
- 進度:2026-07-23 已完成 **shell 全套(topbar/sidebar/底部 nav)+ router-link 死碼清除 + mini/game 兩種遊戲卡**,
  全數瀏覽器驗證。commits:aa9aa81 / 219b574 / 5afc345 / 1d55478 / 3eb07f0。
  **剩餘為大廳內容多個一次性區塊 + 大廳 header + PrimeVue 表 + purge**,量大且較複雜,
  建議新 session 從本檔續做(鐵則 5:新 session 便宜一個數量級)。
