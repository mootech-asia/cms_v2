# 工廠純 HTML 化 + 交付流水線 — 階段性任務計畫

> 建立:2026-07-17(Asia/Taipei)
> 狀態:**已定案待執行**(等 usage 恢復後,依 phase 開新 session 執行)
> 位置:本 repo = 生成系統母體(工廠);本計畫只動工廠形態與交付流程,不動已交付專案。

## 目標(業主定案)

把**工廠本身改為純 HTML+CSS+JS**;現在的 Nuxt 版是「產出模板後再轉譯出去的結果」
(= 工程師要的形式),不是工廠的原生形態。

## 交付流水線(目標流程)

```
工廠選好版型 → 定案 → 轉出設計 HTML+CSS+JS(不含工廠本身,工廠=本 repo)
→ 業主對轉出檔做一次「工程師要的編譯」 → 變成工程師要的結果
→ 新建 repo → 建立版本號 → 設計+程式碼轉交工程師接手後續串接
```

先例驗證:`cms_system_v3` 就是這條路的手動版
(純 HTML/CSS+CDN React prototype → Vue 3 + Vite 重構 → 獨立 repo 交付)。

## 階段任務

> 每個 phase = 一個獨立 session(省 token 鐵則第 5 條);
> 接手時先讀本文件 + `docs/CLAUDE-HANDOFF-LATEST.md`。
> 每 phase 完成:commit + push + 回報一行結論,並更新本文件的狀態欄。

### Phase 0 — 盤點與轉出格式定案 ⬜
- 盤點現有 Nuxt 版型資產:頁面清單、`app/config/blocks.ts` 區塊、
  `main.css @layer components` 共用視覺、`themes/*.css` token。
- 定案「轉出設計包」的規格:純靜態、免建置(直接開 index.html)、
  token 一律 CSS custom properties、檔案結構與命名規則、附 manifest(版型名/版本/頁面清單)。
- 定案工廠目錄:`factory/`(版型庫)+ `factory/shared/`(token、共用 CSS、共用 vanilla JS)。
- 產出:`docs/export-spec.md`(轉出格式規格書)。
- **定案點(業主)**:後台(/admin、/studio)是否納入純 HTML 工廠。
  **建議:先不納入**,首波只做前台版型;後台留在 Nuxt 母體,之後視需要再議。

### Phase 1 — 純 HTML 工廠骨架 ⬜
- 建 `factory/starter/`:頁面外殼、token(CSS variables)、共用視覺 class
  (對應現有 btn-*/input-ui/card-ui/pill-*/mode-tabs/dd-panel/seg-btn/mf-modal)、
  vanilla JS 行為件(tabs、modal、輪播、下拉)。
- 沿用復用鐵則:同一視覺 = 一份定義,禁止等價樣式。
- 更新 `docs/template-guide.md`:新增「純 HTML 版型開發規範」章節。
- 產出:可直接開瀏覽器看的 starter 骨架。

### Phase 2 — WIN100 回移為首個純 HTML 版型 ⬜
- 把現有 WIN100 前台頁面從 Nuxt 回移成 `factory/win100/` 純 HTML+CSS+JS。
- 驗收:DOM 斷言 + pixel-diff 對照現正式站,數字異常才讀圖(截圖鐵則)。
- 現有 `frontend/`(Nuxt)保留不動 — 它就是 WIN100 的「工程師形式結果」示範。

### Phase 3 — 轉出機制(設計包匯出)⬜
- 一支腳本:選定版型 → 產出設計包(該版型 HTML/CSS/JS + shared token + assets
  + manifest,**不含工廠其他內容**),輸出到 `dist/export/<版型>-<版本>/` 或 zip。
- 版本號在此蓋章(見 Phase 5 版號規則)。
- 驗收:匯出包在乾淨環境直接開啟、無外部依賴缺漏。

### Phase 4 — 工程師編譯層 ⬜
- 定案「工程師要的結果」目標形態。
  **建議:Vue 3 + Vite + `<script setup>`**(沿用 v3 成功先例與其程式碼風格)。
- 產出:轉譯指南 `docs/compile-guide.md`(設計包 → Vue 專案的對照規則:
  頁面→元件切分、CSS 沿用不改、行為 JS → composables)
  + 一支 scaffold 腳本(從設計包長出 Vite 專案骨架)。
- 這一步由業主主導、腳本輔助;不追求全自動。

### Phase 5 — 新 repo 建立與交付規範 ⬜
- 定案並文件化:repo 命名(`cms_system_vN` 續號)、版號規則
  (**建議 semver,交付起始 = v1.0.0 + git tag**)、
  初始 commit 內容(設計包 + 編譯結果 + 工程師交接文件)。
- 產出:`docs/delivery-checklist.md` + 工程師交接文件模板
  (含:可改/不可改範圍、串接點清單、mock 資料位置)。

### Phase 6 — 全流程試跑定版 ⬜
- 用一個版型完整走一遍:工廠 → 定案 → 轉出 → 編譯 → 新 repo → tag → 交接文件。
- 修正流程中發現的缺口,回寫各規格文件。
- 更新 `CLAUDE.md` 專案速覽與 `docs/CLAUDE-HANDOFF-LATEST.md`,宣告新流水線生效。

## 插隊任務:首次交付 cms_v2_1.0.0(先於各 Phase)🟡

抽出目前工程師形式(`frontend/` Nuxt 版)成獨立 repo。

- 已完成:交付腳本 `scripts/extract-delivery.sh`(複製、產 README、commit、tag、push 一鍵完成);
  抽出內容已在乾淨環境 `npm ci && npm run build` 驗證(結果見 handoff/session 紀錄)。
- **卡點:session 的 GitHub App 憑證無「建立 repo」權限(org 與個人帳號皆 403)。**
- 恢復步驟(業主先在 GitHub 手動建空 repo `cms_v2_1.0.0`,不勾 README):
  1. 新 session 把該 repo 加進 session(add_repo)並 clone。
  2. 跑 `scripts/extract-delivery.sh <clone路徑> 1.0.0`。
  3. 回報 push 與 tag `v1.0.0` 結果即完成。

## 待業主定案清單

| # | 事項 | 建議(單一推薦) |
|---|---|---|
| 1 | 後台是否納入純 HTML 工廠 | 先不納入,首波只做前台 |
| 2 | 工程師目標形態 | Vue 3 + Vite(v3 先例) |
| 3 | 版號規則 | semver,交付 = v1.0.0 + git tag |
| 4 | 匯出物形式 | repo 內 `dist/export/`(需要再加 zip) |

## 原則

- 工廠 = 本 repo,永不隨設計包外流;交付出去的一律是獨立新專案。
- 全部資產屬業主個人;一個交付版型 = 一個專案(定位鐵則)。
- 各 phase 不得越界先做下一 phase 的事;遇設計決策給單一推薦選項。
