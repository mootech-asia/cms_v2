> **分支說明(2026-07-18)**:本分支凍結保存 WIN100 的**工程師框架實作**(Nuxt 4 + PrimeVue + Tailwind + Pinia,`frontend/`)。
> `main` 已改為工廠純 HTML+CSS+JS 形態;需要框架版(工程師形式)一律以本分支為準。

# cms_system_v2 — WIN100(交付版)

> 本 repo 是 **WIN100 模板的交付版本**:Nuxt 4 + PrimeVue + TailwindCSS + Pinia,
> 純 UI、邏輯占位,工程師可直接取用元件接後端。
> 本 repo 同時是**模板工廠**(2026-07-17 業主整併,cms_system 已廢除):
> `templates/starter/` 起新模板、`docs/template-guide.md` 為模板開發規範;
> 本版本的後續編輯都在本 repo 進行。

## 快速開始

```bash
cd frontend && npm install && npm run dev   # http://localhost:3000
npm run generate                            # 靜態輸出(.output/public,54 路由)
```

| 路由 | 用途 |
|---|---|
| `/` 等 23 頁 | WIN100 站點(首頁為 config-driven 區塊渲染) |
| `/studio` | 設計後台(組版/換膚/變體/排序/匯出模板包) |
| `/admin` | 客戶後台(文案/促銷/區塊開關排序/換膚;範圍由 `app/config/template.ts` 授權) |
| `/ui-kit` | 元件視驗 + 區塊變體型錄 |

## 工程接手重點

- **占位儲存**:`stores/site.ts`(版面組態)與 `stores/content.ts`(文案/促銷)目前為
  記憶體占位,`save()` 換成 API 寫回、初始 state 換成 API 載入即可,渲染端不用動。
- **換膚**:`app/assets/css/themes/*.css` 是全站視覺唯一來源(CSS 變數);
  加皮膚 = 複製檔案改值 + nuxt.config css 陣列加一行。
- **區塊/變體**:登錄表 `app/config/blocks.ts`(v1 不可動;變體同內容同皮膚只換版面)。
- Token 對照:`docs/style-guide.md`;驗收紀錄:`docs/rebuild-plan.md`;
  完整《模板開發規範》:`docs/template-guide.md`;起新模板:`templates/starter/`(規範 §9)。

## GitHub Pages

Nuxt 正式站由 `gh-pages` 分支提供:
https://mootech-asia.github.io/cms_system_v2/

- `main`:原始碼
- `pages-candidate`:GitHub Actions 建置候選版
- `gh-pages`:驗證後的正式版
- `backup/gh-pages-legacy-2026-07-16`:改版前靜態站備份

安全 tag:`keep/github-pages-latest-2026-06-29`、`keep/figma-react-version-2026-06-29`。
