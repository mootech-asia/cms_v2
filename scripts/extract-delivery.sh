#!/usr/bin/env bash
# 交付抽取腳本:把 frontend/(工程師形式 Nuxt 版)抽成獨立交付 repo。
# 用法: scripts/extract-delivery.sh <目標repo的本地clone路徑> [版本號]
# 例:  scripts/extract-delivery.sh ../cms_v2_1.0.0 1.0.0
# 前置: 目標 repo 已在 GitHub 建好(空 repo、不要 README)並 clone 到本地。
set -euo pipefail

TARGET="${1:?用法: extract-delivery.sh <目標clone路徑> [版本號]}"
VERSION="${2:-1.0.0}"
SRC="$(cd "$(dirname "$0")/.." && pwd)/frontend"

[ -d "$TARGET/.git" ] || { echo "FAIL: $TARGET 不是 git clone"; exit 1; }

# 1) 複製工程版(排除產物)
(cd "$SRC" && tar -cf - --exclude=node_modules --exclude=.nuxt --exclude=.output --exclude=dist .) \
  | tar -xf - -C "$TARGET"

# 2) 交付 README
cat > "$TARGET/README.md" <<EOF
# CMS_前台_v2 — 交付版 v${VERSION}

工程師形式(Nuxt 4 + PrimeVue + Tailwind + Pinia),由生成系統工廠
\`mootech-asia/cms_system_v2\` 抽出交付;本 repo 為獨立專案,交付後自行演進。
全部資產屬業主個人。

## 開發
\`\`\`bash
npm ci
npm run dev      # 開發
npm run build    # 建置(SSR)
npm run generate # 靜態輸出
\`\`\`

## 部署
子路徑部署時設 \`NUXT_APP_BASE_URL=/<path>/\`(預設 \`/\`)。

## 工程師接手注意
- 目前為純 UI + 邏輯占位:content store 儲存為 in-memory、入款結果為模擬、
  暱稱狀態刷新即重置;後端串接點請依此尋找 TODO/占位實作。
- 樣式規則:只用 theme token(\`app/assets/css/themes/*.css\`),
  共用視覺在 \`app/assets/css/main.css\` @layer components(同一視覺 = 一份定義)。
- 站名由 site store \`siteName\` 驅動,可在 /admin、/studio 修改。
EOF

# 3) commit + tag + push
cd "$TARGET"
git add -A
git commit -m "cms_v2 delivery ${VERSION}: engineer-form Nuxt build from factory"
git branch -M main
git tag "v${VERSION}"
git push -u origin main
git push origin "v${VERSION}"
echo "OK: delivery v${VERSION} pushed to $(git remote get-url origin)"
