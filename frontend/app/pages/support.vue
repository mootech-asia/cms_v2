<script setup lang="ts">
definePageMeta({ layout: 'member' });
import { ref } from 'vue';
const root = ref<HTMLElement | null>(null);
useMemberPage(root);
</script>

<template>
  <div ref="root" class="flex flex-col">
    <h1 class="text-ink text-3xl mb-8 w-full">Customer Service</h1>
    <div class="bg-surface border border-line-soft rounded-lg p-8 text-center w-full">
    <p class="text-ink-3">Coming Soon</p>
    </div>
  </div>
</template>
