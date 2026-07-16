<script setup lang="ts">
import { BLOCKS } from '~/config/blocks';
import { type DraftConfig, STUDIO_DRAFT_KEY, readDraft } from '~/utils/studio-draft';

/**
 * /studio 的即時預覽目標(iframe 載入):讀 localStorage 草稿渲染,
 * 監聽 storage 事件即時更新(studio 每次修改都會重寫草稿)。
 * 獨立 document = 真實視口,手機寬 iframe 的 RWD 行為是真的。
 */
definePageMeta({ layout: false });

const route = useRoute();
const page = computed(() => (route.query.page as string) || 'home');

const draft = ref<DraftConfig | null>(null);
const sync = () => { draft.value = readDraft(); };

onMounted(() => {
  sync();
  window.addEventListener('storage', (e) => {
    if (e.key === STUDIO_DRAFT_KEY) sync();
  });
});

useHead({ htmlAttrs: { 'data-theme': computed(() => draft.value?.skin ?? 'win100') } });

const sections = computed(() => draft.value?.pages[page.value]?.sections ?? []);
const chrome = (part: 'header' | 'footer') =>
  BLOCKS[`site-${part}`].variants[draft.value?.chrome[part] ?? 'v1'] ?? BLOCKS[`site-${part}`].variants.v1;
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-surface-deep">
    <template v-if="draft">
      <component :is="chrome('header')" />
      <BlockRenderer :sections="sections" />
      <component :is="chrome('footer')" />
    </template>
    <p v-else class="p-8 text-center text-body text-ink-4">等待 /studio 草稿…</p>
  </div>
</template>
