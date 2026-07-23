# HANDOFF 2026-07-22 (PM) — 設計 review 卡片/篩選列收尾

> 給新 session 接手用。先讀本檔 + `CLAUDE.md` + `docs/HANDOFF-2026-07-21.md`(上一份)。
> 本檔只記今天下午這批(業主截圖標註的手機版排版 + 帳戶卡設計對齊)。

## 部署現況(v2)

| 分支 / 來源 | SHA |
|---|---|
| `main`(前端來源,現行) | `8648121` |
| `pages-candidate`(來自 8648121) | `db37f7e2` |
| `gh-pages`(正式站) | `db37f7e2`(本批 promote 後) |
| 開發分支 `claude/handover-docs-review-cot2mr` | 已對齊 `8648121`(被否決的一行實驗 `c3000d6` 已 reset 丟棄) |

**部署流程不變**:push `factory/**` 到 `main` →`build-pages-candidate`(自動)→ 手動
`promote-pages.yml`(input `candidate_sha` = `git ls-remote origin pages-candidate` 的完整 SHA;
短 SHA 會被 mismatch 拒絕,務必用完整 40 字)→ 等 GitHub 原生 Pages 傳播(~3 分)→ 驗證正式站。
**教訓:asset(site.js/global.css)無 cache-busting,手機瀏覽器/CDN 會顯示舊版,實測要帶 `?cb=亂數`;
使用者看不到更新多半是快取,不是沒部署。**

## 本批已完成並上正式站

前一份 `HANDOFF-2026-07-21.md` 底部「設計 review B1–B6」+ 六項手機調整之後,今天再處理:

1. **加密錢包卡(account.html,JS 渲染 `initAccountWalletCard`)** — 照業主設計圖重排:
   - 去掉深色底(`.wallet-card` 蓋掉 `.registered-card` 的 `--c-bg`)。
   - 去掉 ₿ 圖示框(`bank-logo`)。
   - **去掉整個框線**(`.wallet-card` 設 `border:0; padding:0; height:auto; margin-top:0; align-items:flex-start`),
     讓錢包卡跟左邊銀行卡一樣**扁平貼齊 bg-surface 模塊**。
   - **複製鈕移到位址後面 inline**(不在最右邊),複製完整未遮罩位址,`stopPropagation` 不觸發刪除。
   - **移除「綁定日期」那行**(業主設計沒有日期)。
2. **銀行帳戶卡(account.html 靜態 markup)** — 刪除鈕從第 2 行(KB Bank)**移到第 1 行(卡號行)右上**,
   跟錢包卡刪除鈕對齊在同一條線(業主鐵則:兩張卡是同一個模組,刪除鈕固定右上、同一水平線)。
3. **紀錄頁篩選列手機版(5 頁共用,`global.css` media ≤639px)** — 業主最終定案 **兩行**:
   - Row 1:狀態下拉 + 日期區間(日期 `flex: 1 1 50%`,逼確認換行)。
   - Row 2:確認 + 自動刷新。
   - **自動刷新樣式廢棄「手機專用秒數徽章」實驗,跟電腦版共用同一個完整文字**
     (`site.js initAutoRefresh` 用純 `label.textContent`;曾試過復用首頁 `.mini-countdown-chip`
     秒數徽章 + 一行版,業主否決 → 已 reset 丟棄,勿再做)。

驗證:結構 `verify:win100` 9/9;篩選兩行在 360/390/430px 皆正確(狀態+日期同行、確認+刷新次行);
帳戶卡 browser 實測(錢包無框無日期、複製 inline、兩卡刪除鈕對齊)。

## ⚠️ 這個 session 用量過高的教訓(務必避免重蹈)

業主明確表達不滿:一個「基本的挪位置」燒掉約 50% 用量。根因與對策:

1. **猜設計,不看來源** — 一直拿聊天截圖猜像素,而不是先看業主的來源設計(舊框架 Nuxt
   `frontend/app/components/RecordPage.vue`、或直接問業主要一張圖/一句規格)。
   **對策:動手前先取得明確來源/規格,一次到位。**
2. **逐格猜、逐次部署** — 做→還原→再做→再改,同一件事來回三四趟,每趟都 build+promote+截圖疊加。
   **對策:小改先本機 render 給業主確認、確認後才一次部署;禁止把沒拍板的版本推 main。**
3. **長上下文複利** — 這串對話極長,每回合把整段歷史重算,這才是最大的用量殺手。
   **對策(業主 CLAUDE.md 鐵則 5):一個階段做完就結束 session,下次用交接文件開新 session。**

## 未完成 / 待業主定奪(承接 `HANDOFF-2026-07-21.md`,仍開放)

- **studio/admin 靜態化部署接線**:靜態 `factory/win100/studio`、`admin` 只在 main 未接進 candidate/正式站
  (仍建 Nuxt `/studio`)。要正式站用靜態版取代,需改 workflow + promote —— **動部署,待業主確認**。
- **內容管理 runtime**(banner/促銷/遊戲即時編輯)+ studio 區塊/變體編輯:需前台改 config 驅動,
  牴觸「手寫切版=交付物」DNA,**屬架構方向,待業主拍板**。
- **v2 #3 Stage B 語意化**(site.js 以特定 class/id 為 hook 的大重構)、**#6 收尾清理**
  (刪 `frontend/`/`vue3-app/`、刪分支)——高風險/不可逆,**業主在場再做**。
- **帳戶卡真正「同一個模組」化**:目前銀行卡(靜態 markup + carousel JS)與錢包卡(JS 渲染)是兩套結構,
  只是視覺對齊;若要真正抽成一份共用模組,是額外重構(非本批範圍)。
- ~~**cache-busting**~~ ✅ **完成(branch `claude/handover-tasks-list-sj48kv`,commit `5319d36`)**:
  新增 `scripts/cache-bust-candidate.js`,在 build-pages-candidate 組裝候選時給本地 asset
  引用注入 `?v=<內容 hash>`(site.js/global.css/app.css/data.js/primevue.css 各自 hash;
  themes 由 site.js 執行期載入,一併蓋 build stamp)。**source 保持裸引用、`open index.html`
  本地不變**,只有正式站帶版本號 → 根治「更新看不到」。下次 promote 後生效。

## 排程任務(業主 2026-07-22 要求列出)

帳號下 `list_triggers` 共 9 筆,**全部是已觸發完成(`run_once_fired`)或已停用(`auto_disabled_session_gone`)
的一次性 `send_later` 提醒,沒有任何仍在等待或循環中的排程**;且都不屬於本 CMS 專案
(是 `littlebow11549/auto-leadgen` 每日名單早晨重試提醒 + 一則 `factory-web-refactor` 續作提醒)。
→ **本 CMS 工作沒有任何 active 排程任務需要接手或清理。**

---

## Stage B 語意化進度(2026-07-22 接續 session,分支 `claude/handover-tasks-list-sj48kv`)

業主指示先把 v2 全部做完再做 v3。本 session 執行 task #3 Stage B(把 factory 前台
Tailwind utility 堆改成 v3 式手寫語意 class)+ 附帶項目。**全部只進分支,正式站由業主
promote 才更新。**

**業主定案(2026-07-23):**
1. **`cms_v2_1.0.0` 首次交付**(卡 GitHub App 無建 repo 權限)→ **取消**,未來 session 勿再提。
2. **靜態 studio 取代正式站 Nuxt studio 的部署接線 → 要做**(業主 2026-07-23 明確指示;
   授權自主進行、不必再問)。範圍:改 `build-pages-candidate.yml` 候選組裝,改用靜態
   `factory/win100/studio`(+ `admin`)、移除 Nuxt `nuxt generate`/`_nuxt` studio 步驟;
   v3 同理改 `deploy-pages.yml` 用靜態 `studio/`。**取捨(業主已接受)**:靜態 studio 目前
   只有換膚/站名/公開範圍,少掉 Nuxt studio 的區塊/變體編輯(那需前台 config 驅動,屬 DNA
   決策,不在此範圍)。workflow 改在分支;**正式站實際切換仍由業主 promote**。
3. **連帶**:studio 改靜態後,`frontend/`(v2)、`vue3-app/`(v3)不再是部署必需 →
   task #6 收尾清理「刪 `frontend/`/`vue3-app/` + 移除 Nuxt/Vite build」**重新回到範圍**,
   但屬不可逆動作,排在最後、確認靜態 studio 正式站驗過後才做。
→ 本 session 自主範圍 = **Stage B 前台語意化 + studio 靜態化部署接線 + 安全收尾**。

**方法(已定型):** 不憑空重寫 CSS —— 把 `assets/css/app.css` 裡既有的 utility 宣告
**精確重組**進手寫 `assets/css/components.css` 的語意 class(宣告完全相同,只是換語意名),
所以視覺零變、只有 markup 變手寫可讀。每批獨立跑 **computed-style parity(git stash 前後
逐屬性比對,要求 0 diff)+ 結構 9/9 + 行為 28/28** 才 commit。大件用 sonnet subagent 做、
主線審查驗證 commit(省 context)。

**已完成(commit / 驗證):**
| 批 | 元件 | commit | 驗證 |
|---|---|---|---|
| C1 | cache-busting(候選組裝時注入 `?v=<hash>`,`scripts/cache-bust-candidate.js`) | `5319d36` | 9/9 |
| B1 | 5 個脆弱 utility hook → 語意 class(拆 site.js 耦合) | `1fbfa49` | 9/9 · 28/28 · sport 針對性 |
| B2 | footer + 共用 `.page-container` + 新建 `components.css` | `73e384c` | parity 0 · 9/9 · 28/28 |
| B3 | site header(公開+member 兩變體;清 router-link 死 class) | `f7b3d0d` | parity 0(2170 值)· 9/9 · 28/28 |
| B4 | 手機底部導覽 + member 側欄(router-link 全清 0) | `37c0a4b` | parity 0(870 值)· 9/9 · 28/28 |

→ **共用 shell(footer/header/手機底部導覽/member 側欄)已全部語意化完成。**

**進行中 / 待做(content 區,依序):**
- 🔄 B5:共用遊戲卡 / rail / 篩選格 / 分類檢視 / vendor 卡(site.js 樣板為主)。
- ⬜ 首頁 hero/campaign banner/promo ribbon/rewards banner;leaderboard/tournaments/sports/promotion；account 各頁(overview/deposit/withdrawal/personal/security)；record 5 頁；3 個 modal(signin/game/cs);about/promotion 雜項。
- ⬜ **收尾**:`ui-kit.html`(非交付 dev 頁,暫留)一起語意化或排除;全部 content 轉完後,**移除 app.css 中已無人引用的死 utility 規則**(Stage B 最後一步,轉完前不可動,否則未轉元件會壞)。

**續接方式:** 沿用上表方法逐元件做;subagent prompt 範式見本 session 對話(規模、hook 保留清單、parity 指令)。JS hook 一律先 grep `site.js` 再改;`ui-kit.html` 依前例暫跳。
