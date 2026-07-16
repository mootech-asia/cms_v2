# WIN100 CMS(交付版)— 工作守則

## 專案速覽
- 本 repo = **WIN100 模板交付版**:`frontend/`(Nuxt 4 + PrimeVue + Tailwind + Pinia,純 UI、邏輯占位)。
- **工廠已整併回本 repo(業主 2026-07-17)**:`templates/starter/`(起新模板骨架)與
  `docs/template-guide.md`(模板開發規範)都在這裡;`mootech-asia/cms_system` 已廢除待刪。
- GitHub Pages 正式站由 `gh-pages` 分支提供(mootech-asia.github.io/cms_system_v2);
  `main` 先建置到 `pages-candidate`,完成驗證後才可升級正式分支;不得刪除既有備份分支。
- **最新接手入口:**`docs/CLAUDE-HANDOFF-LATEST.md`(先讀;含目前正式站、分支 SHA、部署流程與最新驗證)。
- **歷史交接紀錄:**`docs/handoff-2026-07-16.md`(需要追查早期改動時再讀)。
- 驗收紀錄:`docs/rebuild-plan.md`;token 對照:`docs/style-guide.md`;
  完整規範:`docs/template-guide.md`。

## 省 token 守則(必守)
1. **截圖能省則省**:deviceScaleFactor 1、寬 ≤1280、只截判斷所需的頁;
   驗收比對用 pixel-diff 腳本輸出數字,**數字異常才讀圖**。
2. **批次機械修改用一支腳本**,不逐檔 Edit;驗證靠 `nuxt build` + grep。
3. 大輸出導到檔案再挑著讀;可合併的 shell 指令合併成一次呼叫。
4. 大型批次工作可交 subagent 執行,主對話只收結論。
5. 完成一個階段:commit + push + 一行報告;大階段建議開新 session 接續。

## 模型調度(必守)
> 主對話用哪個模型由使用者 `/model` 決定;這裡管 subagent 分派時的 model 參數。
1. **機械/批次型任務一律指定 `model: 'sonnet'`**(整批改寫、搜尋替換、逐頁驗證)。
2. **架構/設計/判斷型任務不降級**(省略 model 參數繼承主對話)。
3. 純機械檢查可用 `model: 'haiku'`。
4. 平行多開前先估額度;可能撞頂就整批 `sonnet`。
5. 絕不擅自建議使用者切換主對話模型。

## 慣例
- **復用鐵則(業主 2026-07-16,寫入 DNA)**:已有統一形式的視覺**一律復用既有定義**
  (main.css @layer components 的共用 class / Ui 元件),**禁止新增等價樣式**;
  需要新視覺時先抽成一份共用定義再使用,發現等價的舊寫法要一併改用同一份
  (現有共用件例:btn-*/input-ui/card-ui/pill-*/mode-tabs/dd-panel/seg-btn/mf-modal)。
- **命名鐵則(業主 2026-07-17)**:分頁/產品名稱由業主定,不得擅自更動:
  前台預設 = `CMS_前台_v2`(**命名權已做進後台**:/admin 皮膚分頁與 /studio 站點名稱欄
  可改前台站名,site store `siteName` 驅動、隨模板包匯出);
  客戶後台 = `CMS_後台_v2`、設計後台 = `CMS_設計後台_v2`。
- **頁簽規範(2026-07-17)**:頁簽一律用 `.mode-tabs`(唯一定義:底線式、單行、
  溢出時橫向捲動),不得 wrap 換行、不得另創頁簽樣式或加覆寫打破層級。
- 分支:主線 = `main`;依 session 指定分支開發後併回;commit message 英文、聚焦動機。
- 樣式:只用 theme token(tailwind.config.ts 讀 `themes/*.css`),禁任意值色碼、禁 Tailwind 內建色、
  禁 scoped CSS;共用視覺進 `assets/css/main.css` @layer components(同一視覺 = 一份定義)。
- 元件:PrimeVue 優先,包裝於 `components/ui/*`;區塊登錄表 `app/config/blocks.ts`;
  變體規則(v1 不可動、同內容同皮膚)不可違反。
