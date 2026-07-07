<script setup lang="ts">
import { ref } from 'vue';
const root = ref<HTMLElement | null>(null);
useMemberPage(root);
</script>

<template>
  <div ref="root" class="min-h-screen bg-[#0f1419]" style="overflow-x: hidden;">
    <MemberHeader />
    <div class="flex bg-[#0f1419] min-h-screen" style="overflow-x: hidden;">
    <aside class="hidden md:block w-64 flex-shrink-0 bg-[#1a2128] border-r border-gray-800 sticky top-0 h-screen overflow-y-auto">
    <nav class="p-4 space-y-2">
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-300 hover:bg-[#0f1419] hover:text-white" href="/account">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard w-5 h-5">
    <rect width="7" height="9" x="3" y="3" rx="1">
    </rect>
    <rect width="7" height="5" x="14" y="3" rx="1">
    </rect>
    <rect width="7" height="9" x="14" y="12" rx="1">
    </rect>
    <rect width="7" height="5" x="3" y="16" rx="1">
    </rect>
    </svg>
    <span class="text-sm">Account Overview</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-300 hover:bg-[#0f1419] hover:text-white" href="/deposit">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-to-line w-5 h-5">
    <path d="M12 17V3">
    </path>
    <path d="m6 11 6 6 6-6">
    </path>
    <path d="M19 21H5">
    </path>
    </svg>
    <span class="text-sm">Deposit</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-300 hover:bg-[#0f1419] hover:text-white" href="/withdrawal">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-from-line w-5 h-5">
    <path d="m18 9-6-6-6 6">
    </path>
    <path d="M12 3v14">
    </path>
    <path d="M5 21h14">
    </path>
    </svg>
    <span class="text-sm">Withdrawal</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 font-semibold" href="/betting-record">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history w-5 h-5">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8">
    </path>
    <path d="M3 3v5h5">
    </path>
    <path d="M12 7v5l4 2">
    </path>
    </svg>
    <span class="text-sm">Betting Record</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-300 hover:bg-[#0f1419] hover:text-white" href="/deposit-record">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-5 h-5">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z">
    </path>
    <path d="M14 2v4a2 2 0 0 0 2 2h4">
    </path>
    <path d="M10 9H8">
    </path>
    <path d="M16 13H8">
    </path>
    <path d="M16 17H8">
    </path>
    </svg>
    <span class="text-sm">Deposit Record</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-300 hover:bg-[#0f1419] hover:text-white" href="/profit-loss">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up w-5 h-5">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17">
    </polyline>
    <polyline points="16 7 22 7 22 13">
    </polyline>
    </svg>
    <span class="text-sm">Profit And Loss</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-300 hover:bg-[#0f1419] hover:text-white" href="/withdrawal-record">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-5 h-5">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z">
    </path>
    <path d="M14 2v4a2 2 0 0 0 2 2h4">
    </path>
    <path d="M10 9H8">
    </path>
    <path d="M16 13H8">
    </path>
    <path d="M16 17H8">
    </path>
    </svg>
    <span class="text-sm">Withdrawal Record</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-300 hover:bg-[#0f1419] hover:text-white" href="/account-record">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-5 h-5">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z">
    </path>
    <path d="M14 2v4a2 2 0 0 0 2 2h4">
    </path>
    <path d="M10 9H8">
    </path>
    <path d="M16 13H8">
    </path>
    <path d="M16 17H8">
    </path>
    </svg>
    <span class="text-sm">Account Record</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-300 hover:bg-[#0f1419] hover:text-white" href="/personal-info">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user w-5 h-5">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2">
    </path>
    <circle cx="12" cy="7" r="4">
    </circle>
    </svg>
    <span class="text-sm">Personal Info</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-300 hover:bg-[#0f1419] hover:text-white" href="/security">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-5 h-5">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z">
    </path>
    </svg>
    <span class="text-sm">Security Center</span>
    </a>
    <button class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-300 hover:bg-[#0f1419] hover:text-white">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-5 h-5">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z">
    </path>
    </svg>
    <span class="text-sm">Customer Service</span>
    </button>
    </nav>
    </aside>
    <main class="flex-1 min-w-0 p-4 md:p-8 flex flex-col" style="padding-bottom: 80px;">
    <h1 class="text-white text-3xl font-bold mb-8 w-full">Betting Record</h1>
    <div class="w-full mb-6 flex md:hidden flex-col gap-2">
    <div class="w-full flex gap-3 items-center">
    <input type="date" class="bg-[#1a2128] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-300 text-sm focus:outline-none focus:border-[#98E7D2] transition-colors" value="" style="flex: 1 1 0%; min-width: 0px;">
    <span class="text-gray-500 font-light" style="flex-shrink: 0;">—</span>
    <input type="date" class="bg-[#1a2128] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-300 text-sm focus:outline-none focus:border-[#98E7D2] transition-colors" value="" style="flex: 1 1 0%; min-width: 0px;">
    </div>
    <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity" style="align-self: flex-start;">Confirm</button>
    </div>
    <div class="w-full mb-6 hidden md:flex flex-wrap gap-3 items-center">
    <input type="date" class="bg-[#1a2128] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-300 text-sm focus:outline-none focus:border-[#98E7D2] transition-colors" value="">
    <span class="text-gray-500 font-light">—</span>
    <input type="date" class="bg-[#1a2128] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-300 text-sm focus:outline-none focus:border-[#98E7D2] transition-colors" value="">
    <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">Confirm</button>
    </div>
    <div class="w-full rounded-xl border border-gray-800 overflow-hidden">
    <div class="overflow-x-auto">
    <table class="w-full text-sm">
    <thead>
    <tr style="background: linear-gradient(90deg, rgb(203, 232, 228), rgb(152, 231, 210));">
    <th class="px-4 py-5 text-left text-gray-900 font-bold whitespace-nowrap tracking-wide">Order No</th>
    <th class="px-4 py-5 text-left text-gray-900 font-bold whitespace-nowrap tracking-wide">Game</th>
    <th class="px-4 py-5 text-left text-gray-900 font-bold whitespace-nowrap tracking-wide">Settlement Time</th>
    <th class="px-4 py-5 text-right text-gray-900 font-bold whitespace-nowrap tracking-wide">Bet Amount</th>
    <th class="px-4 py-5 text-right text-gray-900 font-bold whitespace-nowrap tracking-wide">Valid Bet</th>
    <th class="px-4 py-5 text-right text-gray-900 font-bold whitespace-nowrap tracking-wide">Winnings</th>
    <th class="px-4 py-5 text-right text-gray-900 font-bold whitespace-nowrap tracking-wide">Bet P&amp;L</th>
    </tr>
    </thead>
    <tbody>
    <tr class="border-b border-gray-800/60 bg-[#1a2128] hover:bg-[#1e2730] transition-colors">
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap font-mono text-xs">202508120001</td>
    <td class="px-4 py-4 text-white whitespace-nowrap">Sports</td>
    <td class="px-4 py-4 text-gray-400 whitespace-nowrap">2025-08-12 15:48</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">50,000</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">50,000</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">92,500</td>
    <td class="px-5 py-4 text-right whitespace-nowrap font-bold" style="color: rgb(34, 197, 94);">+42,500</td>
    </tr>
    <tr class="border-b border-gray-800/60 bg-[#0f1419] hover:bg-[#1e2730] transition-colors">
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap font-mono text-xs">202508120002</td>
    <td class="px-4 py-4 text-white whitespace-nowrap">Slots</td>
    <td class="px-4 py-4 text-gray-400 whitespace-nowrap">2025-08-12 14:30</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">20,000</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">20,000</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">0</td>
    <td class="px-5 py-4 text-right whitespace-nowrap font-bold" style="color: rgb(239, 68, 68);">-20,000</td>
    </tr>
    <tr class="border-b border-gray-800/60 bg-[#1a2128] hover:bg-[#1e2730] transition-colors">
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap font-mono text-xs">202508110007</td>
    <td class="px-4 py-4 text-white whitespace-nowrap">Live Casino</td>
    <td class="px-4 py-4 text-gray-400 whitespace-nowrap">2025-08-11 18:20</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">35,000</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">35,000</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">78,000</td>
    <td class="px-5 py-4 text-right whitespace-nowrap font-bold" style="color: rgb(34, 197, 94);">+43,000</td>
    </tr>
    <tr class="bg-[#0f1419] hover:bg-[#1e2730] transition-colors">
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap font-mono text-xs">202508110003</td>
    <td class="px-4 py-4 text-white whitespace-nowrap">Sports</td>
    <td class="px-4 py-4 text-gray-400 whitespace-nowrap">2025-08-11 12:15</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">10,000</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">10,000</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">8,500</td>
    <td class="px-5 py-4 text-right whitespace-nowrap font-bold" style="color: rgb(239, 68, 68);">-1,500</td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    </main>
    </div>
    <MobileBottomNav />
  </div>
</template>
