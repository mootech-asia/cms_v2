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
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-300 hover:bg-[#0f1419] hover:text-white" href="/betting-record">
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
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 font-semibold" href="/withdrawal-record">
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
    <h1 class="text-white text-3xl mb-8 w-full">Withdrawal Record</h1>
    <div class="w-full mb-4 flex md:hidden flex-col gap-2">
    <div style="display: flex; flex-wrap: nowrap; gap: 8px; align-items: center; width: 100%;">
    <div class="relative" style="flex-shrink: 0;">
    <button class="bg-[#1a2128] border border-gray-700 text-gray-300 px-3 py-2 rounded-lg text-sm whitespace-nowrap">Status: All</button>
    </div>
    <input type="date" class="bg-[#1a2128] border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm" value="" style="flex: 1 1 0%; min-width: 0px;">
    <span class="text-gray-400" style="flex-shrink: 0;">~</span>
    <input type="date" class="bg-[#1a2128] border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm" value="" style="flex: 1 1 0%; min-width: 0px;">
    </div>
    <div class="flex items-center justify-between">
    <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">Confirm</button>
    <div class="flex items-center gap-1 text-gray-400 text-sm" style="white-space: nowrap;">
    <span>Auto refresh in 4 s</span>
    <span class="cursor-pointer text-blue-400 ml-1">↺</span>
    </div>
    </div>
    </div>
    <div class="w-full mb-4 hidden md:flex flex-wrap gap-2 items-center justify-between">
    <div class="flex flex-wrap gap-2 items-center">
    <div class="relative" style="flex-shrink: 0;">
    <button class="bg-[#1a2128] border border-gray-700 text-gray-300 px-3 py-2 rounded-lg text-sm whitespace-nowrap">Status: All</button>
    </div>
    <input type="date" class="bg-[#1a2128] border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm" value="">
    <span class="text-gray-400">~</span>
    <input type="date" class="bg-[#1a2128] border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm" value="">
    <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">Confirm</button>
    </div>
    <div class="flex items-center gap-1 text-gray-400 text-sm">
    <span>Auto refresh in 4 s</span>
    <span class="cursor-pointer text-blue-400 ml-1">↺</span>
    </div>
    </div>
    <div class="w-full rounded-xl border border-gray-800 overflow-hidden">
    <div class="overflow-x-auto">
    <table class="w-full text-sm">
    <thead>
    <tr style="background: linear-gradient(90deg, rgb(203, 232, 228), rgb(152, 231, 210));">
    <th class="px-4 py-5 text-left text-gray-900 font-bold whitespace-nowrap tracking-wide">Transaction No.</th>
    <th class="px-4 py-5 text-left text-gray-900 font-bold whitespace-nowrap tracking-wide">Request Time</th>
    <th class="px-4 py-5 text-right text-gray-900 font-bold whitespace-nowrap tracking-wide">Paid Amount</th>
    <th class="px-4 py-5 text-left text-gray-900 font-bold whitespace-nowrap tracking-wide">Status</th>
    <th class="px-4 py-5 text-right text-gray-900 font-bold whitespace-nowrap tracking-wide">Request Amount</th>
    <th class="px-4 py-5 text-left text-gray-900 font-bold whitespace-nowrap tracking-wide">Bank Name</th>
    <th class="px-4 py-5 text-left text-gray-900 font-bold whitespace-nowrap tracking-wide">Paid Date</th>
    <th class="px-4 py-5 text-left text-gray-900 font-bold whitespace-nowrap tracking-wide">Remark</th>
    </tr>
    </thead>
    <tbody>
    <tr class="border-b border-gray-800/60 bg-[#1a2128] hover:bg-[#1e2730] transition-colors">
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">WD25081201</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">2025-08-12 10:20</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">80,000</td>
    <td class="px-5 py-4 whitespace-nowrap">
    <span class="bg-green-900 text-green-400 text-xs px-2 py-1 rounded-full">Approved</span>
    </td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">80,000</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">KB Bank</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">2025-08-12 10:45</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">-</td>
    </tr>
    <tr class="border-b border-gray-800/60 bg-[#1a2128] hover:bg-[#1e2730] transition-colors">
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">WD25081104</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">2025-08-11 16:50</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">150,000</td>
    <td class="px-5 py-4 whitespace-nowrap">
    <span class="bg-green-900 text-green-400 text-xs px-2 py-1 rounded-full">Approved</span>
    </td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">150,000</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">Shinhan</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">2025-08-11 17:10</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">-</td>
    </tr>
    <tr class="border-b border-gray-800/60 bg-[#1a2128] hover:bg-[#1e2730] transition-colors">
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">WD25081006</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">2025-08-10 11:05</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">40,000</td>
    <td class="px-5 py-4 whitespace-nowrap">
    <span class="text-xs px-2 py-1 rounded-full" style="background-color: rgba(161, 112, 34, 0.2); color: rgb(245, 158, 11);">Pending</span>
    </td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">40,000</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">Woori</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">-</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">-</td>
    </tr>
    <tr class="border-b border-gray-800/60 bg-[#1a2128] hover:bg-[#1e2730] transition-colors">
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">WD25080903</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">2025-08-09 22:14</td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">25,000</td>
    <td class="px-5 py-4 whitespace-nowrap">
    <span class="bg-red-900 text-red-400 text-xs px-2 py-1 rounded-full">Rejected</span>
    </td>
    <td class="px-4 py-4 text-gray-300 text-right whitespace-nowrap">25,000</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">KB Bank</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">-</td>
    <td class="px-4 py-4 text-gray-300 whitespace-nowrap">Rollover left</td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    </main>
    </div>
    <div class="total-bar" style="position: fixed; right: 0px; z-index: 100; background: rgb(13, 27, 42); padding: 12px 24px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(245, 158, 11, 0.3);">
    <span style="color: rgb(245, 158, 11); font-weight: 600;">Total Withdrawal Amount</span>
    <span style="color: rgb(245, 158, 11); font-weight: 600;">270,000</span>
    </div>
    <MobileBottomNav />
  </div>
</template>
