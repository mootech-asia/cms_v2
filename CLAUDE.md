# WIN100 CMS(交付版)— 工作守則

## 專案速覽
- 本 repo = **WIN100 模板交付版**:`frontend/`(Nuxt 4 + PrimeVue + Tailwind + Pinia,純 UI、邏輯占位)。
- 模板工廠(工具/規範主要驅動)= `mootech-asia/cms_system`;本版本的編輯在本 repo,工具演進回工廠。
- 舊靜態站已自 main 移除,**凍結於 `gh-pages` 分支**續服現行網址(mootech-asia.github.io/cms_v2),
  **不得刪除 gh-pages、不得恢復 push-main 鏡像 Pages 的 workflow**;退場時點由業主決定。
- **目前交接紀錄:**`docs/handoff-2026-07-16.md`(先讀;含已完成改動、未驗證項目與待續清單)。
- 驗收紀錄:`docs/rebuild-plan.md`;token 對照:`docs/style-guide.md`;
  完整規範見工廠 repo `cms_system/docs/template-guide.md`。

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
- 分支:主線 = `main`;依 session 指定分支開發後併回;commit message 英文、聚焦動機。
- 樣式:只用 theme token(tailwind.config.ts 讀 `themes/*.css`),禁任意值色碼、禁 Tailwind 內建色、
  禁 scoped CSS;共用視覺進 `assets/css/main.css` @layer components(同一視覺 = 一份定義)。
- 元件:PrimeVue 優先,包裝於 `components/ui/*`;區塊登錄表 `app/config/blocks.ts`;
  變體規則(v1 不可動、同內容同皮膚)不可違反。
