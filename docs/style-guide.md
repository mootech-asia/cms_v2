# 全站樣式規範(工程師版)

> 適用範圍:靜態站(`pages/` + `js/` + `partials/`)與 Nuxt 版(`frontend/app/`)。
> 兩個前端必須使用同一套值;任何樣式改動都要雙邊同步。
> 盤點歷史與階段紀錄見 `design-system-plan.md`,本文件只講「現在怎麼寫」。

---

## 1. 樣式放在哪裡(分層)

- `css/base.css` — Tailwind **編譯產物**(107KB)。唯讀,**不要手改**;markup 只能用裡面已存在的 utility class。
- `css/tokens.css` — 設計代幣 + 少量工具類(`.fw-*`、`.hero-band`)。**改這裡必須同步複製到 `frontend/public/tokens.css`**(兩檔內容一致,CI 沒有自動同步)。
- `pages/*.html` — 頁面內容片段(單行壓縮 HTML),樣式用 Tailwind class + inline style。
- `partials/member-pre|post.html`、`marketing-pre|post.html` — 共用 chrome(header/會員側欄/footer/底部導覽),由 `js/router.js` 組裝;active 樣式對照表在 `partials/chrome-map.json`。
- `js/*.js` — 各模組用 `injectStyle()` 注入 `<style id="...">`(如 `member-forms.js`、`vendors.js`、`back-buttons.js`)。
- `frontend/app/**/*.vue` — Nuxt 端用 `<style scoped>`,值必須與靜態端對應模組一致。

## 2. 色彩代幣(唯一允許的顏色來源)

寫法慣例:**直接寫正典 hex 值**(全站現況),`var(--c-*)` 引用尚未全面化;禁止發明清單以外的新色值。

### 主色
- `--c-primary: #98E7D2` — 品牌 mint(強調、active、連結)
- `--c-primary-soft: #CBE8E4` — 漸層起點
- `--g-primary: linear-gradient(90deg, #CBE8E4, #98E7D2)` — **所有 CTA/選中態漸層固定 90deg soft→primary**
- `--c-primary-faint: #313E40` — 選中底色(次要選中、hover 背景)
- `--c-on-primary: #0F1622` — 漸層/主色上的文字(**不要用 #111827/#0F172A,已淘汰**)
- `#AAE5D3` — 區塊標題/註標綠(pm-title 等既有慣例,沿用)

### 面板(綠黑系)
- `--c-bg: #0F1419` — 頁面底
- `--c-surface: #1A2128` — 卡片/面板
- `--c-surface-2: #2A3138` — 第二層面板
- `--c-border: #374151` — 標準邊框
- `--c-disabled: #4B5563` — 停用態底色
- `#1F2937` — 卡片細邊框(既有慣例)

### 文字灰階(只有四階,不要新增)
- `--c-text: #FFFFFF` — 主文字(**#F9FAFB 已淘汰併入**)
- `--c-text-2: #D1D5DB` — 次要文字(**#C3CBD6/#CBD5E1/#E5E7EB 已淘汰併入**)
- `--c-text-3: #9CA3AF` — 輔助文字(**#8FA39C 已淘汰併入**)
- `--c-text-4: #6B7280` — placeholder/最弱

### 狀態/強調
- `--c-danger: #F87171` — 錯誤/警示(**唯一的紅,rgb(239,68,68)/#FB7185/#FF6B72 已淘汰**)
- `--c-success: #4ADE80` — 成功
- `--c-gold: #F0B24A` — 金色強調(VIP、bind holder)

### 類別頁 hero 橫幅
- `--g-hero: linear-gradient(90deg, #0F766E 0%, #10B981 55%, #B9DE5A 100%)` — 全站唯一一條,用 `.hero-band` 類;**不要再造新漸層**。

### 刻意保留的例外(不要「順手修正」)
- 銀行卡擬物卡面:`--c-card-face-1/2/3: #1B2536/#131C2B/#0D1420`、`--c-card-border: #26324A` — 全站唯一保留的藍黑系。
- 廠商卡純色底:`#161E2C` + 邊框 `#212B3D` — 使用者核可設計。
- 首頁各區塊交替底色(`#1E2730` 等)— 設計需求。
- 白底銀行下拉的內部淺灰(`#EEF0F2/#F1F3F5/#F5F7F9`)— 淺色元件內部值。
- 彈窗容器 `#1A2330` + 邊框 `#2A3441` — auth modal 既有慣例。

## 3. 字級階梯(7 階)

- `--fs-display: 30px` — 頁面大標(= `text-3xl`)
- `--fs-h1: 24px` — 區塊主標/彈窗標題/金額(= `text-2xl`)
- `--fs-h2: 18px` — 卡片標題(= `text-lg`)
- `--fs-body-lg: 16px` — 強調內文(= `text-base`)
- `--fs-body: 14px` — 內文(= `text-sm`)
- `--fs-caption: 12px` — 說明/標籤(= `text-xs`)
- `--fs-micro: 10px` — 徽章/角標(**9px 已淘汰,最小 10px**)

## 4. 字重(只有四階)

- `400` 內文 / `600` 次強調 / `700` 標題 / `800` 數值與 CTA
- **禁止** 500、900、1000、`font-medium`、`font-black`、`font-light`
- base.css 缺 800 的 utility → 用 tokens.css 的 `.fw-800`(同理 `.fw-400/600/700`)

## 5. 字距 / 行高(各三階)

- 字距:`0`(內文)/ `.06em`(小型標籤)/ `.12em`(卡號、金額等等寬感數字)
- 行高:`1`(按鈕/徽章/數值)/ `1.2`(標題)/ `1.5`(內文)

## 6. 共用元件規格(改規格 = 改所有副本)

### Back 按鈕(單一來源:`css/tokens.css` 的 `.cms-back-button`)
- 40px 高 pill、`border:1px solid rgba(152,231,210,.24)`、底 `#1A2128`、文字 `#FFF` 15px/800
- hover/focus:`--g-primary` 漸層底、文字 `#0F1419`、`translateY(-1px)` + mint 陰影
- 靜態:`js/back-buttons.js` 執行期自動掛 class;**Nuxt:元件直接寫 `class="cms-back-button"`,禁止自寫 idle/hover**
- 出現規則:**只在第二層視圖**(廠商遊戲列表、promotion 詳情);頂層分類頁與會員頁**不放**頂部 Back

### Load More 按鈕(規格源頭:`js/category-load-more.js`)
- 外層 `.cms-load-more-wrap flex justify-center mt-8`;按鈕 `.cms-load-more-button px-8 py-3 rounded-lg`
- 底 `rgba(255,255,255,.05)`、邊 `rgba(255,255,255,.2)`、文字 `#D1D5DB` 600
- hover:底 `#304242`、文字 `#AAE5D3`
- 行為:每次 +12(遊戲卡)/ +8(賽事卡),最多 3 次後移除;只出現在 hot-games/slot/live/fish/mini-games/sport 的內容格,promotion 不放

### 會員彈窗(規格源頭:`js/member-forms.js` showModal / `MemberModal.vue`)
- 340px、圓角 22、底 `#1A2128`、mint 漸層描邊(mask 技法)+ 漸層圓 icon
- 三種:success(勾)/ warning(驚嘆)/ confirm(問號,Yes/No)
- 按鈕:pill、`--g-primary`、文字 `#0F1622` 800

### 廠商徽章(規格源頭:`js/vendors.js`)
- `.vnd-provider-badge`:pill、`rgba(152,231,210,.1)` 底、`.3` 邊、文字 `#98E7D2` 14px/800
- 標題列:`標題 26px/800 + 徽章`,**不用漸層大標/底線**

### 紀錄表格 rec-table(規格源頭:`css/tokens.css`)
- 適用:betting/deposit/withdrawal/account record、profit-loss(靜態 + Nuxt 同一份 markup)
- 對齊規則:文字靠左、數字靠右(`td.num`,tabular-nums)、狀態置中(`td.ctr`)— **th 與 td 必須同對齊**
- 表頭:`thead tr` 一條 `--g-primary` 漸層,th 12px/800 大寫、字距 `--ls-wide`
- 儲存格類別:`rec-mono`(編號)/`rec-strong`(主要文字)/`rec-dim`(時間等次要)/`rec-pos`/`rec-neg`(±金額綠紅)
- 狀態膠囊 `.rec-pill`:`ok`(success)/`warn`(gold)/`bad`(danger);膠囊內文字要保留 Approved/Pending/Rejected 原字,records 篩選靠它比對
- 篩選列 Confirm 用 `.rec-confirm`(40px、圓角 10、`--g-primary`,即全站標準 CTA)
- 注意:base.css 缺的 `text-right`/`py-2.5`/`py-5`/`tracking-wide` 已在 tokens.css 補齊,新表格一律直接用 rec-* 類別

### 表單欄位錯誤(auth modal)
- 欄位紅框 `#F87171` + 下方 13px `#F87171` 訊息,聚焦第一個錯誤欄位
- 文案與會員區一致:密碼「Length must be 5-16 characters.」、「The two passwords do not match.」

## 7. 新增/修改樣式的規則

1. 顏色只能從 §2 清單選;需要新色 → 先更新 `tokens.css` + 本文件,再使用。
2. 字級/字重/字距/行高只能落在階梯上。
3. 靜態端改了,`frontend/` 對應檔案**同一個 commit** 內同步(反之亦然)。
4. 共用元件(§6)改規格時,grep 所有副本一起改,不要只改一處。
5. 新頁面:會員區用 `partials/member-*` chrome,行銷區用 `partials/marketing-*`;不要在 `pages/*.html` 裡重複貼 header/footer。
6. 不要改 `css/base.css`;markup 需要的 utility 不存在時,加進 `tokens.css` 工具類區。

## 8. 上線前流程

1. 改了 `pages/*.html` 或 `partials/*` → bump `js/router.js` 的 `PAGES_V`。
2. 改了任何 `js/*.js` 或 `css/tokens.css` → bump `index.html` 對應 `?v=` 時間戳。
3. `cd frontend && npm run generate` 必須通過(46 條路由 prerender)。
4. 視覺改動:兩前端截圖比對(參考 `p4-acceptance.md` 的方法)。
5. merge `main` → GitHub Actions 自動部署 gh-pages;邊緣快取最多 10 分鐘,驗收用無痕視窗。
