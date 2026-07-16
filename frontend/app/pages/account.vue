<script setup lang="ts">
definePageMeta({ layout: 'member' });
import { computed, ref } from 'vue';
import { useBankStore } from '~/stores/bank';
const root = ref<HTMLElement | null>(null);
useMemberPage(root);

const bankStore = useBankStore();
const nickname = useState<string>('member:nickname', () => 'meqomcao');
const banks = computed(() => bankStore.accounts);
const bankIdx = ref(0);
function prevBank() {
  if (banks.value.length) bankIdx.value = (bankIdx.value - 1 + banks.value.length) % banks.value.length;
}
function nextBank() {
  if (banks.value.length) bankIdx.value = (bankIdx.value + 1) % banks.value.length;
}
type BankModal = { type: 'danger' | 'success'; message?: string; subject?: string; onConfirm?: () => void } | null;
const bankModal = ref<BankModal>(null);
function deleteBank() {
  const acct = banks.value[bankIdx.value];
  bankModal.value = {
    type: 'danger',
    subject: acct?.bank || 'this bank account',
    onConfirm: () => {
      bankStore.removeAccount(bankIdx.value);
      if (bankIdx.value >= banks.value.length) bankIdx.value = Math.max(0, banks.value.length - 1);
      bankModal.value = { type: 'success', message: 'Bank account deleted successfully.' };
    },
  };
}
function closeBankModal(confirmed: boolean) {
  const m = bankModal.value;
  bankModal.value = null;
  if (confirmed) m?.onConfirm?.();
}
</script>

<template>
  <div ref="root" class="flex flex-col">
    <h1 class="text-ink text-2xl md:text-3xl mb-6 md:mb-8 w-full">Account Overview</h1>
    <div class="relative overflow-hidden flex-shrink-0 rounded-2xl p-4 md:p-6 mb-8 w-full account-hero-bg">
    <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 320" preserveAspectRatio="none" fill="none">
    <path d="M0,305 C300,255 620,365 1200,150 L1200,320 L0,320 Z" fill="rgba(152,231,210,0.02)">
    </path>
    <path d="M0,255 C340,185 740,325 1200,120 L1200,320 L0,320 Z" fill="rgba(152,231,210,0.025)">
    </path>
    <path d="M0,232 C380,162 780,300 1200,92 L1200,150 C780,332 380,205 0,278 Z" fill="rgba(152,231,210,0.03)">
    </path>
    <path d="M0,232 C380,162 780,300 1200,92" stroke="rgba(190,245,225,0.05)" stroke-width="1.2">
    </path>
    </svg>
    <div class="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
    <div class="w-20 h-20 rounded-full bg-g-primary flex items-center justify-center flex-shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user w-10 h-10 text-on-primary">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2">
    </path>
    <circle cx="12" cy="7" r="4">
    </circle>
    </svg>
    </div>
    <div class="flex-1 text-center md:text-left w-full">
    <div class="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 mb-2">
    <div class="flex items-center gap-2">
    <h2 class="text-ink text-xl md:text-2xl font-semibold">{{ nickname }}</h2>
    <NuxtLink
      to="/change-nickname"
      class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-colors hover:bg-primary/20"
      aria-label="Change nickname"
      title="Change nickname"
    >
    <AppIcon name="pencil" class="h-4 w-4" />
    </NuxtLink>
    </div>
    <span class="bg-g-primary text-on-primary px-3 py-1 rounded-full text-xs font-semibold">VIP1</span>
    </div>
    <div class="grid grid-cols-1 gap-4 mt-4">
    <div>
    <p class="text-ink-3 text-sm mb-1">Current Balance</p>
    <p class="text-primary text-xl md:text-2xl font-bold">₩1,000,000,000</p>
    </div>
    <div>
    <p class="text-ink-3 text-sm mb-1">Member Since</p>
    <p class="text-ink text-base md:text-lg">August 2025</p>
    </div>
    </div>
    </div>
    <div class="text-center md:text-right flex-shrink-0">
    <p class="text-xl md:text-2xl font-bold mb-1 text-gold">Rollover</p>
    <p class="text-ink text-sm md:text-base font-semibold mb-1">Remaining Turnover Amount:</p>
    <p class="text-ink-2 text-xl md:text-2xl font-mono">₩16,517.41</p>
    </div>
    </div>
    <div class="rewards-bar" style="--rk-pct: 62%">
    <div class="rk-rw-top"><span class="rk-rw-label">Rewards · Day 27, 03:26 UTC</span></div>
    <div class="rk-track" role="progressbar" aria-label="Rewards progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="62"><div class="rk-fill" /></div>
    <div class="rk-meta"><span class="rk-cur">Current: <b>Unranked</b><i class="rk-dot rk-dot-gray" /></span><span class="rk-pts">62%</span><span class="rk-rw-next">Next: <b>Bronze</b><i class="rk-dot rk-dot-bronze" /></span></div>
    </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 w-full">
    <div class="bg-surface border border-line-soft rounded-lg p-4 md:p-6">
    <h3 class="text-ink text-lg font-semibold mb-4">Quick Actions</h3>
    <div class="space-y-3">
    <a class="block w-full bg-g-primary text-on-primary py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold text-center text-sm md:text-base" :href="withBase('/deposit')">Deposit Now</a>
    <a class="block w-full bg-surface-2 text-ink py-3 rounded-lg hover:opacity-90 transition-opacity text-center text-sm md:text-base" :href="withBase('/withdrawal')">Withdraw</a>
    </div>
    </div>
    <div class="bg-surface border border-line-soft rounded-lg p-4 md:p-6">
    <div class="flex items-center justify-between mb-4">
    <h3 class="text-ink text-lg font-semibold">Banking Details</h3>
    <div class="flex items-center gap-2">
    <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-2 text-ink-3 hover:text-ink transition-colors" aria-label="Previous bank account" @click="prevBank">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
    <path d="m15 18-6-6 6-6">
    </path>
    </svg>
    </button>
    <span class="text-ink-3 text-sm">{{ banks.length ? bankIdx + 1 : 0 }}/{{ banks.length }}</span>
    <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-2 text-ink-3 hover:text-ink transition-colors" aria-label="Next bank account" @click="nextBank">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
    <path d="m9 18 6-6-6-6">
    </path>
    </svg>
    </button>
    </div>
    </div>
    <div class="space-y-3">
    <template v-if="banks.length">
    <div class="flex items-center gap-3 text-ink-2 text-sm md:text-base">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card w-5 h-5 text-ink-4 flex-shrink-0">
    <rect width="20" height="14" x="2" y="5" rx="2">
    </rect>
    <line x1="2" x2="22" y1="10" y2="10">
    </line>
    </svg>
    <span>{{ banks[bankIdx].num }}</span>
    </div>
    <div class="flex items-center gap-3 text-ink-2 text-sm md:text-base">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building w-5 h-5 text-ink-4 flex-shrink-0">
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2">
    </rect>
    <path d="M9 22v-4h6v4">
    </path>
    <path d="M8 6h.01">
    </path>
    <path d="M16 6h.01">
    </path>
    <path d="M12 6h.01">
    </path>
    <path d="M12 10h.01">
    </path>
    <path d="M12 14h.01">
    </path>
    <path d="M16 10h.01">
    </path>
    <path d="M16 14h.01">
    </path>
    <path d="M8 10h.01">
    </path>
    <path d="M8 14h.01">
    </path>
    </svg>
    <span>{{ banks[bankIdx].bank }}</span>
    <button class="ml-auto text-ink-4 hover:text-ink transition-colors" aria-label="Delete bank account" @click="deleteBank">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
    <path d="M3 6h18">
    </path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6">
    </path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2">
    </path>
    </svg>
    </button>
    </div>
    </template>
    <p v-else class="text-ink-4 text-sm md:text-base">No bank account</p>
    <a class="text-primary hover:text-primary-soft text-sm transition-colors" :href="withBase('/banking-details?add=1')">+ Add New Bank Account</a>
    </div>
    </div>
    </div>
    <div class="bg-surface border border-line-soft rounded-lg p-4 md:p-6 w-full">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
    <h3 class="text-ink text-lg font-semibold">Recent Transactions</h3>
    <button class="text-primary hover:text-primary-soft text-sm transition-colors text-left md:text-right">View More Records →</button>
    </div>
    <div class="md:hidden space-y-4">
    <div class="bg-surface-deep border border-line-soft rounded-lg p-4">
    <div class="flex justify-between items-start mb-2">
    <div>
    <p class="text-ink font-semibold">SABA Bet Started</p>
    <p class="text-ink-3 text-sm">2025-08-12 15:48</p>
    </div>
    <span class="bg-success text-on-primary px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </div>
    <p class="text-lg font-semibold text-success">+₩ 1,000</p>
    </div>
    <div class="bg-surface-deep border border-line-soft rounded-lg p-4">
    <div class="flex justify-between items-start mb-2">
    <div>
    <p class="text-ink font-semibold">SABA Bet Started</p>
    <p class="text-ink-3 text-sm">2025-08-12 14:30</p>
    </div>
    <span class="bg-success text-on-primary px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </div>
    <p class="text-lg font-semibold text-danger">-₩ 500</p>
    </div>
    <div class="bg-surface-deep border border-line-soft rounded-lg p-4">
    <div class="flex justify-between items-start mb-2">
    <div>
    <p class="text-ink font-semibold">SABA Bet Started</p>
    <p class="text-ink-3 text-sm">2025-08-11 18:20</p>
    </div>
    <span class="bg-success text-on-primary px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </div>
    <p class="text-lg font-semibold text-success">+₩ 2,500</p>
    </div>
    <div class="bg-surface-deep border border-line-soft rounded-lg p-4">
    <div class="flex justify-between items-start mb-2">
    <div>
    <p class="text-ink font-semibold">SABA Bet Started</p>
    <p class="text-ink-3 text-sm">2025-08-11 12:15</p>
    </div>
    <span class="bg-success text-on-primary px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </div>
    <p class="text-lg font-semibold text-danger">-₩ 1,000</p>
    </div>
    <div class="bg-surface-deep border border-line-soft rounded-lg p-4">
    <div class="flex justify-between items-start mb-2">
    <div>
    <p class="text-ink font-semibold">SABA Bet Started</p>
    <p class="text-ink-3 text-sm">2025-08-10 16:45</p>
    </div>
    <span class="bg-success text-on-primary px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </div>
    <p class="text-lg font-semibold text-success">+₩ 750</p>
    </div>
    </div>
    <div class="hidden md:block overflow-x-auto">
    <table class="w-full">
    <thead>
    <tr class="border-b border-line-soft">
    <th class="text-left text-ink-3 text-sm py-3 px-4">Type</th>
    <th class="text-left text-ink-3 text-sm py-3 px-4">Amount</th>
    <th class="text-left text-ink-3 text-sm py-3 px-4">Date</th>
    <th class="text-left text-ink-3 text-sm py-3 px-4">Time</th>
    <th class="text-left text-ink-3 text-sm py-3 px-4">Status</th>
    </tr>
    </thead>
    <tbody>
    <tr class="border-b border-line-soft hover:bg-surface-deep transition-colors">
    <td class="text-ink py-4 px-4">SABA Bet Started</td>
    <td class="py-4 px-4 font-semibold text-success">+₩ 1,000</td>
    <td class="text-ink-2 py-4 px-4">2025-08-12</td>
    <td class="text-ink-2 py-4 px-4">15:48</td>
    <td class="py-4 px-4">
    <span class="bg-success text-on-primary px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </td>
    </tr>
    <tr class="border-b border-line-soft hover:bg-surface-deep transition-colors">
    <td class="text-ink py-4 px-4">SABA Bet Started</td>
    <td class="py-4 px-4 font-semibold text-danger">-₩ 500</td>
    <td class="text-ink-2 py-4 px-4">2025-08-12</td>
    <td class="text-ink-2 py-4 px-4">14:30</td>
    <td class="py-4 px-4">
    <span class="bg-success text-on-primary px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </td>
    </tr>
    <tr class="border-b border-line-soft hover:bg-surface-deep transition-colors">
    <td class="text-ink py-4 px-4">SABA Bet Started</td>
    <td class="py-4 px-4 font-semibold text-success">+₩ 2,500</td>
    <td class="text-ink-2 py-4 px-4">2025-08-11</td>
    <td class="text-ink-2 py-4 px-4">18:20</td>
    <td class="py-4 px-4">
    <span class="bg-success text-on-primary px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </td>
    </tr>
    <tr class="border-b border-line-soft hover:bg-surface-deep transition-colors">
    <td class="text-ink py-4 px-4">SABA Bet Started</td>
    <td class="py-4 px-4 font-semibold text-danger">-₩ 1,000</td>
    <td class="text-ink-2 py-4 px-4">2025-08-11</td>
    <td class="text-ink-2 py-4 px-4">12:15</td>
    <td class="py-4 px-4">
    <span class="bg-success text-on-primary px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </td>
    </tr>
    <tr class="border-b border-line-soft hover:bg-surface-deep transition-colors">
    <td class="text-ink py-4 px-4">SABA Bet Started</td>
    <td class="py-4 px-4 font-semibold text-success">+₩ 750</td>
    <td class="text-ink-2 py-4 px-4">2025-08-10</td>
    <td class="text-ink-2 py-4 px-4">16:45</td>
    <td class="py-4 px-4">
    <span class="bg-success text-on-primary px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    <MemberModal v-if="bankModal" :type="bankModal.type" :message="bankModal.message" :subject="bankModal.subject" @confirm="closeBankModal(true)" @cancel="closeBankModal(false)" />
  </div>
</template>
