<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  type?: 'success' | 'warning' | 'confirm';
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}>();
defineEmits<{ confirm: []; cancel: [] }>();

const type = computed(() => props.type || 'success');
const title = computed(() => props.title || (type.value === 'warning' ? 'Warning' : type.value === 'confirm' ? 'Confirmation' : 'Success!'));
const message = computed(() => (props.message != null ? props.message : (type.value === 'success' ? 'Profile updated successfully.' : '')));
const confirmText = computed(() => props.confirmText || (type.value === 'confirm' ? 'Yes' : 'Got It'));
</script>

<template>
  <div class="mf-overlay" @click.self="$emit('cancel')">
    <div class="mf-modal" role="dialog" aria-modal="true">
      <div class="mf-modal-icon">
        <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        <svg v-else-if="type === 'warning'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
      </div>
      <h3 class="mf-modal-title">{{ title }}</h3>
      <p v-if="message" class="mf-modal-msg">{{ message }}</p>
      <button type="button" class="mf-modal-btn" @click="$emit('confirm')">{{ confirmText }}</button>
      <button v-if="type === 'confirm'" type="button" class="mf-modal-btn secondary" @click="$emit('cancel')">{{ cancelText || 'No' }}</button>
    </div>
  </div>
</template>

<style scoped>
.mf-overlay{position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);padding:20px}
.mf-modal{position:relative;width:340px;max-width:calc(100vw - 40px);background:#2b313c;border-radius:22px;padding:34px 28px 24px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.5)}
.mf-modal::before{content:"";position:absolute;inset:0;border-radius:22px;padding:2px;background:linear-gradient(120deg,#ff4d9d,#ff8a3d,#ffb43d);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.mf-modal-icon{width:58px;height:58px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.mf-modal-icon svg{width:30px;height:30px;color:#1a2128}
.mf-modal-title{color:#fff;font-size:22px;font-weight:800;margin:0 0 8px}
.mf-modal-msg{color:#c3cbd6;font-size:14px;margin:0 0 22px;line-height:1.5;word-break:break-word}
.mf-modal-btn{display:block;width:100%;padding:13px;border:0;border-radius:999px;background:linear-gradient(90deg,#ff4d9d,#ffb43d);color:#1a2128;font-weight:800;font-size:15px;cursor:pointer}
.mf-modal-btn.secondary{background:none;color:#fff;margin-top:6px}
</style>
