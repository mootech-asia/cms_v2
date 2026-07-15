<script setup lang="ts">
// 紀錄頁的自動更新倒數(與靜態版 js/records.js 一致:30 秒循環,↺ 立即重置)
import { onBeforeUnmount, onMounted, ref } from 'vue';

const emit = defineEmits<{ refresh: [] }>();

const INTERVAL = 30;
const left = ref(INTERVAL);
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = setInterval(() => {
    if (left.value > 0) {
      left.value -= 1;
    } else {
      left.value = INTERVAL;
      emit('refresh');
    }
  }, 1000);
});
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
function reset() {
  left.value = INTERVAL;
  emit('refresh');
}
</script>

<template>
  <div class="flex items-center gap-1 whitespace-nowrap text-body text-ink-3">
    <span>Auto refresh in {{ left }} s</span>
    <span class="ml-1 cursor-pointer text-primary" role="button" aria-label="Refresh now" @click="reset">↺</span>
  </div>
</template>
