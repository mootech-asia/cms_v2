<script setup lang="ts">
import { BLOCKS } from '~/config/blocks';
import { TEMPLATE } from '~/config/template';

/**
 * R6 客戶後台:終端客戶控制系統 — 內容文案/促銷管理/區塊開關與排序/換膚。
 * 可控範圍由模板定義(config/template.ts):鎖定區塊不可動、皮膚限清單、
 * 內容僅開放模板允許的範圍。編輯直接作用於 site/content store(同一 SPA
 * session 內回站點即見);「儲存變更」為占位(接 API 時換掉 content.save)。
 * 變體選擇/新增區塊/匯出模板包是設計師工具(/studio),這裡刻意不提供。
 */
definePageMeta({ layout: false });

const scope = TEMPLATE.client;
const siteStore = useSiteStore();
const content = useContentStore();

const tab = ref('content');
const tabs = [
  ...(scope.editable.banners ? [{ label: '內容文案', value: 'content' }] : []),
  ...(scope.editable.promos ? [{ label: '促銷管理', value: 'promos' }] : []),
  { label: '版面區塊', value: 'layout' },
  ...(scope.skins.length ? [{ label: '皮膚', value: 'skin' }] : []),
];

// ---- 版面區塊(限模板授權範圍) ----
const PAGE = 'home';
const sections = computed(() => siteStore.sectionsFor(PAGE));
const isLocked = (id: string) => scope.lockedSections.includes(id);
/** 只能與相鄰的「非鎖定」區塊交換(鎖定區塊是模板版面錨點,位置不可被擠動) */
const canMove = (i: number, dir: -1 | 1) => {
  const j = i + dir;
  const cur = sections.value[i];
  const tgt = sections.value[j];
  return !!cur && !!tgt && !isLocked(cur.id) && !isLocked(tgt.id);
};

// ---- 促銷管理 ----
const newPromo = ref('');
const addPromo = () => {
  const name = newPromo.value.trim();
  if (!name) return;
  content.addPromo(name);
  newPromo.value = '';
};

// ---- 占位儲存 ----
const saved = ref(false);
const save = () => {
  content.save();
  saved.value = true;
  setTimeout(() => { saved.value = false; }, 2500);
};
</script>

<template>
  <div class="min-h-screen bg-surface-deep">
    <!-- 頂欄 -->
    <header class="sticky top-0 z-10 flex items-center justify-between border-b border-line-soft bg-surface px-4 py-2.5">
      <div class="flex items-center gap-3">
        <NuxtLink to="/" class="text-note text-ink-3 hover:text-ink">← 回站點檢視</NuxtLink>
        <h1 class="text-h2 font-bold text-ink">客戶後台 <span class="text-note font-normal text-ink-4">/admin · 模板 {{ TEMPLATE.name }}</span></h1>
      </div>
      <div class="flex items-center gap-2">
        <UiTag v-if="saved" :label="`已儲存 ${content.savedAt}(占位)`" status="ok" />
        <UiButton label="儲存變更" size="sm" @click="save" />
      </div>
    </header>

    <div class="container mx-auto max-w-4xl px-4 py-6">
      <UiTabs v-model="tab" :tabs="tabs">
        <!-- 內容文案:banner 輪播文案 -->
        <template #content>
          <div class="space-y-4 pt-2">
            <p class="text-note text-ink-4">首頁 Banner 輪播文案 — 修改即時反映到站點(色彩/版面屬皮膚與變體,由模板控制)。</p>
            <UiCard v-for="b in content.banners" :key="b.id" :title="`Slide ${b.id} — ${b.badge}`">
              <div class="grid gap-3 md:grid-cols-2">
                <label class="block">
                  <span class="mb-1 block text-note text-ink-3">徽章(badge)</span>
                  <UiInput :model-value="b.badge" @update:model-value="content.updateBanner(b.id, { badge: $event as string })" />
                </label>
                <label class="block">
                  <span class="mb-1 block text-note text-ink-3">按鈕文字(CTA)</span>
                  <UiInput :model-value="b.cta" @update:model-value="content.updateBanner(b.id, { cta: $event as string })" />
                </label>
                <label class="block">
                  <span class="mb-1 block text-note text-ink-3">標題</span>
                  <UiInput :model-value="b.title" @update:model-value="content.updateBanner(b.id, { title: $event as string })" />
                </label>
                <label class="block">
                  <span class="mb-1 block text-note text-ink-3">主打字(highlight)</span>
                  <UiInput :model-value="b.highlight" @update:model-value="content.updateBanner(b.id, { highlight: $event as string })" />
                </label>
                <label class="block md:col-span-2">
                  <span class="mb-1 block text-note text-ink-3">副標</span>
                  <UiInput :model-value="b.sub" @update:model-value="content.updateBanner(b.id, { sub: $event as string })" />
                </label>
              </div>
            </UiCard>
          </div>
        </template>

        <!-- 促銷管理 -->
        <template #promos>
          <div class="space-y-3 pt-2">
            <p class="text-note text-ink-4">促銷卡清單 — 新增/改名/排序/移除,即時反映到促銷區塊。</p>
            <ul class="space-y-2">
              <li
                v-for="(p, i) in content.promoCards" :key="p.id"
                class="flex items-center gap-2 rounded-ui border border-line-soft bg-surface p-2.5"
              >
                <UiInput :model-value="p.name" class="flex-1" @update:model-value="content.updatePromo(p.id, $event as string)" />
                <button type="button" class="px-1 text-ink-4 hover:text-ink disabled:opacity-30" :disabled="i === 0" title="上移" @click="content.movePromo(i, i - 1)">↑</button>
                <button type="button" class="px-1 text-ink-4 hover:text-ink disabled:opacity-30" :disabled="i === content.promoCards.length - 1" title="下移" @click="content.movePromo(i, i + 1)">↓</button>
                <button type="button" class="px-1 text-ink-4 hover:text-danger" title="移除促銷" @click="content.removePromo(p.id)">✕</button>
              </li>
            </ul>
            <div class="flex items-center gap-2">
              <UiInput v-model="newPromo" placeholder="新促銷名稱…" class="flex-1" @keyup.enter="addPromo" />
              <UiButton label="新增促銷" size="sm" variant="ghost" :disabled="!newPromo.trim()" @click="addPromo" />
            </div>
          </div>
        </template>

        <!-- 版面區塊:開關 + 排序(限模板授權) -->
        <template #layout>
          <div class="space-y-3 pt-2">
            <p class="text-note text-ink-4">
              首頁區塊的顯示開關與排序。標示 🔒 的區塊是模板版面錨點,由模板鎖定,不可隱藏或移動。
            </p>
            <ul class="space-y-2">
              <li
                v-for="(s, i) in sections" :key="s.id"
                class="flex items-center gap-3 rounded-ui border border-line-soft bg-surface px-3 py-2.5"
              >
                <span class="min-w-0 flex-1 truncate text-body font-semibold" :class="s.enabled === false ? 'text-ink-4 line-through' : 'text-ink'">
                  <span v-if="isLocked(s.id)" title="模板鎖定">🔒 </span>{{ BLOCKS[s.block]?.label ?? s.block }}
                </span>
                <template v-if="!isLocked(s.id)">
                  <span class="flex gap-1 text-ink-4">
                    <button type="button" class="px-1 hover:text-ink disabled:opacity-30" :disabled="!canMove(i, -1)" title="上移" @click="siteStore.moveSection(PAGE, i, i - 1)">↑</button>
                    <button type="button" class="px-1 hover:text-ink disabled:opacity-30" :disabled="!canMove(i, 1)" title="下移" @click="siteStore.moveSection(PAGE, i, i + 1)">↓</button>
                  </span>
                  <button
                    type="button" role="switch" :aria-checked="s.enabled !== false"
                    class="relative h-5 w-9 rounded-full transition-colors"
                    :class="s.enabled !== false ? 'bg-g-primary' : 'bg-surface-2'"
                    :title="s.enabled !== false ? '顯示中' : '已隱藏'"
                    @click="siteStore.toggleSection(PAGE, s.id)"
                  >
                    <span
                      class="absolute top-0.5 h-4 w-4 rounded-full bg-surface transition-all"
                      :class="s.enabled !== false ? 'left-[18px]' : 'left-0.5'"
                    />
                  </button>
                </template>
                <UiTag v-else label="鎖定" />
              </li>
            </ul>
          </div>
        </template>

        <!-- 皮膚(限模板允許清單) -->
        <template #skin>
          <div class="space-y-3 pt-2">
            <p class="text-note text-ink-4">切換整站皮膚(此模板開放:{{ scope.skins.join(' / ') }})。</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="k in scope.skins" :key="k" type="button"
                class="rounded-ui border px-4 py-2 text-body font-semibold transition-colors"
                :class="siteStore.skin === k
                  ? 'border-transparent bg-g-primary text-on-primary'
                  : 'border-line-soft bg-surface text-ink-3 hover:text-ink'"
                @click="siteStore.setSkin(k)"
              >{{ k }}</button>
            </div>
          </div>
        </template>
      </UiTabs>
    </div>
  </div>
</template>
