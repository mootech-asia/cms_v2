<script setup lang="ts">
definePageMeta({ layout: 'member' });
import { ref } from 'vue';
const root = ref<HTMLElement | null>(null);
useMemberPage(root);
</script>

<template>
  <div ref="root" class="flex flex-col items-center">
    <h1 class="text-ink text-3xl mb-8 w-full">Security Center</h1>
    <div class="w-full max-w-4xl">
    <h2 class="text-ink-3 text-sm font-semibold uppercase tracking-wider mb-2">Last login</h2>
    <div class="bg-surface border border-line-soft rounded-lg p-4 mb-6">
    <div class="flex items-center justify-between py-2">
    <span class="text-ink text-sm">Time</span>
    <span class="text-ink-3 text-sm">2026/04/21 13:29:25</span>
    </div>
    <div class="border-t border-line my-1">
    </div>
    <div class="flex items-center justify-between py-2">
    <span class="text-ink text-sm">IP Address</span>
    <span class="text-ink-3 text-sm">125.227.44.193</span>
    </div>
    </div>
    <h2 class="text-ink-3 text-sm font-semibold uppercase tracking-wider mb-2">Security Setting</h2>
    <div class="bg-surface border border-line-soft rounded-lg overflow-hidden">
    <NuxtLink to="/personal-info" class="flex items-center justify-between p-4 border-b border-line-soft hover:bg-surface-deep cursor-pointer">
    <div class="flex items-center gap-3">
    <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/15">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z">
    </path>
    </svg>
    </div>
    <div>
    <div class="text-ink text-sm font-semibold">Personal Info</div>
    <div class="text-ink-4 text-xs mt-0.5">Complete your personal profile</div>
    </div>
    </div>
    <span class="text-ink-4 text-sm whitespace-nowrap flex-shrink-0">Not set ›</span>
    </NuxtLink>
    <NuxtLink to="/change-password" class="flex items-center justify-between p-4 border-b border-line-soft hover:bg-surface-deep cursor-pointer">
    <div class="flex items-center gap-3">
    <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/15">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2">
    </rect>
    </svg>
    </div>
    <div>
    <div class="text-ink text-sm font-semibold">Change Login Password</div>
    <div class="text-ink-4 text-xs mt-0.5">Recommended letter and number combination</div>
    </div>
    </div>
    <span class="text-ink-4 text-sm whitespace-nowrap flex-shrink-0">Not set ›</span>
    </NuxtLink>
    <NuxtLink to="/change-password?type=txn" class="flex items-center justify-between p-4 border-b border-line-soft hover:bg-surface-deep cursor-pointer">
    <div class="flex items-center gap-3">
    <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/15">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z">
    </path>
    </svg>
    </div>
    <div>
    <div class="text-ink text-sm font-semibold">Change Transaction Password</div>
    <div class="text-ink-4 text-xs mt-0.5">Set a password to improve the security of fund operations</div>
    </div>
    </div>
    <span class="text-ink-4 text-sm whitespace-nowrap flex-shrink-0">Not set ›</span>
    </NuxtLink>
    <NuxtLink to="/banking-details" class="flex items-center justify-between p-4 border-b border-line-soft hover:bg-surface-deep cursor-pointer">
    <div class="flex items-center gap-3">
    <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/15">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
    </path>
    </svg>
    </div>
    <div>
    <div class="text-ink text-sm font-semibold">Banking Details</div>
    <div class="text-ink-4 text-xs mt-0.5">Recommended letter and number combination</div>
    </div>
    </div>
    <span class="text-ink-4 text-sm whitespace-nowrap flex-shrink-0">Not set ›</span>
    </NuxtLink>
    <div class="flex items-center justify-between p-4 hover:bg-surface-deep cursor-pointer">
    <div class="flex items-center gap-3">
    <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/15">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9">
    </path>
    </svg>
    </div>
    <div>
    <div class="text-ink text-sm font-semibold">Logout</div>
    <div class="text-ink-4 text-xs mt-0.5">Logout safely</div>
    </div>
    </div>
    <span class="text-ink-4 text-sm whitespace-nowrap flex-shrink-0">Not set ›</span>
    </div>
    </div>
    </div>
  </div>
</template>
