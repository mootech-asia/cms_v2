<script setup lang="ts">
definePageMeta({ layout: 'member' });
import { ref } from 'vue';
const root = ref<HTMLElement | null>(null);
useMemberPage(root);
const showSuccess = ref(false);
</script>

<template>
  <div ref="root" class="flex flex-col items-center">
    <h1 class="text-ink text-3xl mb-8 w-full">Personal Info</h1>
    <div class="bg-surface border border-line-soft rounded-xl p-6 w-full max-w-md">
    <h2 class="text-ink text-center font-semibold text-lg mb-5">Username : PLAYER</h2>
    <div class="flex flex-col gap-3 mb-4">
    <div class="flex items-center gap-2 bg-surface-deep border border-line rounded-lg px-4 py-3">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-ink-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z">
    </path>
    </svg>
    <input type="text" placeholder="Please enter your nickname" class="bg-transparent text-ink-2 flex-1 outline-none text-sm placeholder-gray-600">
    </div>
    <div class="flex items-center gap-2 bg-surface-deep border border-line rounded-lg px-4 py-3">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-ink-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2">
    </rect>
    </svg>
    <span class="text-ink-2 text-sm">2008/03/03</span>
    </div>
    <div class="flex items-center gap-2 bg-surface-deep border border-line rounded-lg px-4 py-3">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-ink-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6">
    </path>
    </svg>
    <span class="text-ink-2 text-sm">xxxxxxx</span>
    </div>
    <div class="flex items-center gap-2 bg-surface-deep border border-line rounded-lg px-4 py-3">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-ink-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="2" y="5" width="20" height="14" rx="2">
    </rect>
    </svg>
    <span class="text-ink-2 text-sm">s**</span>
    </div>
    <div class="flex items-center gap-2">
    <div class="flex items-center gap-2 bg-surface-deep border border-line rounded-lg px-4 py-3 w-24 flex-shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-ink-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10">
    </circle>
    </svg>
    <span class="text-ink-2 text-sm">+82</span>
    </div>
    <div class="flex items-center gap-2 bg-surface-deep border border-line rounded-lg px-4 py-3 flex-1">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-ink-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
    </path>
    </svg>
    <span class="text-ink-2 text-sm">123••••••••</span>
    </div>
    </div>
    </div>
    <div class="flex justify-center mb-3">
    <span class="text-xs px-3 py-1 rounded-full" style="background-color: rgba(152, 231, 210, 0.15); color: rgb(152, 231, 210);">We care about your privacy</span>
    </div>
    <p class="text-ink-4 text-xs text-center mb-4 leading-relaxed">All the user data are encrypted to ensure your personal privacy is protected. For updates to your personal info, please contact support.</p>
    <button class="w-full py-3 rounded-lg font-semibold mb-2 bg-g-primary text-on-primary hover:opacity-90 transition-opacity" @click="showSuccess = true">Submit</button>
    </div>
    <MemberModal v-if="showSuccess" type="success" @confirm="showSuccess = false" @cancel="showSuccess = false" />
  </div>
</template>
