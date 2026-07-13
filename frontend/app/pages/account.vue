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
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 font-semibold" href="/account">
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
    <InnerBack />
    <h1 class="text-white text-2xl md:text-3xl mb-6 md:mb-8 w-full">Account Overview</h1>
    <div id="rk-bar">
      <div class="rk-id">
        <div class="rk-av">
          <div class="rk-ring"><span>ME</span></div>
          <svg class="rk-hex" viewBox="0 0 24 24" fill="#98E7D2" stroke="#1a2128" stroke-width="1.5" stroke-linejoin="round"><path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" /></svg>
        </div>
        <div><div class="rk-name">meqomcao</div><div class="rk-sub">Rewards · Day 27, 03:26 UTC</div></div>
      </div>
      <div class="rk-prog">
        <div class="rk-track"><div class="rk-fill"></div></div>
        <div class="rk-meta">
          <span class="rk-cur">Current: <b>Unranked</b><i class="rk-dot rk-dot-gray"></i></span>
          <span class="rk-pts">6,200 / 10K</span>
        </div>
      </div>
      <div class="rk-next">Next: <b>Bronze</b><i class="rk-dot rk-dot-bronze"></i></div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 w-full">
    <div class="lg:col-span-2 relative overflow-hidden rounded-2xl p-4 md:p-6" style="background: linear-gradient(105deg, rgb(22, 63, 52) 0%, rgb(15, 42, 35) 28%, rgb(11, 24, 21) 55%, rgb(10, 14, 18) 100%);">
    <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 320" preserveAspectRatio="none" fill="none">
    <path d="M0,305 C300,255 620,365 1200,150 L1200,320 L0,320 Z" fill="rgba(152,231,210,0.045)">
    </path>
    <path d="M0,255 C340,185 740,325 1200,120 L1200,320 L0,320 Z" fill="rgba(152,231,210,0.06)">
    </path>
    <path d="M0,232 C380,162 780,300 1200,92 L1200,150 C780,332 380,205 0,278 Z" fill="rgba(152,231,210,0.07)">
    </path>
    <path d="M0,232 C380,162 780,300 1200,92" stroke="rgba(190,245,225,0.32)" stroke-width="1.2">
    </path>
    </svg>
    <div class="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
    <div class="w-20 h-20 rounded-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] flex items-center justify-center flex-shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user w-10 h-10 text-gray-900">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2">
    </path>
    <circle cx="12" cy="7" r="4">
    </circle>
    </svg>
    </div>
    <div class="flex-1 text-center md:text-left w-full">
    <div class="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 mb-2">
    <h2 class="text-white text-xl md:text-2xl font-semibold">meqomcao</h2>
    <span class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">VIP1</span>
    </div>
    <div class="grid grid-cols-1 gap-4 mt-4">
    <div>
    <p class="text-gray-400 text-sm mb-1">Current Balance</p>
    <p class="text-[#98E7D2] text-xl md:text-2xl font-bold">₩1,000,000,000</p>
    </div>
    <div>
    <p class="text-gray-400 text-sm mb-1">Member Since</p>
    <p class="text-white text-base md:text-lg">August 2025</p>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div class="bg-[#1a2128] border border-gray-800 rounded-lg p-4 md:p-6">
    <h3 class="text-white text-lg font-semibold mb-4">Quick Actions</h3>
    <div class="space-y-3">
    <a class="block w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold text-center text-sm md:text-base" href="/deposit">Deposit Now</a>
    <a class="block w-full bg-[#2a3138] text-white py-3 rounded-lg hover:opacity-90 transition-opacity text-center text-sm md:text-base" href="/withdrawal">Withdraw</a>
    </div>
    </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 w-full">
    <div class="bg-[#1a2128] border border-gray-800 rounded-lg p-4 md:p-6">
    <h3 class="text-white text-lg font-semibold mb-4">Personal Info</h3>
    <div class="space-y-3">
    <div class="flex items-center gap-3 text-gray-300 text-sm md:text-base">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail w-5 h-5 text-gray-500 flex-shrink-0">
    <rect width="20" height="16" x="2" y="4" rx="2">
    </rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7">
    </path>
    </svg>
    <span class="break-all">user@example.com</span>
    </div>
    <div class="flex items-center gap-3 text-gray-300 text-sm md:text-base">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone w-5 h-5 text-gray-500 flex-shrink-0">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
    </path>
    </svg>
    <span>+1 234 567 8900</span>
    </div>
    <div class="flex items-center gap-3 text-gray-300 text-sm md:text-base">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar w-5 h-5 text-gray-500 flex-shrink-0">
    <path d="M8 2v4">
    </path>
    <path d="M16 2v4">
    </path>
    <rect width="18" height="18" x="3" y="4" rx="2">
    </rect>
    <path d="M3 10h18">
    </path>
    </svg>
    <span>1990-01-01</span>
    </div>
    <div class="flex items-center gap-3 text-gray-300 text-sm md:text-base">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-5 h-5 text-gray-500 flex-shrink-0">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0">
    </path>
    <circle cx="12" cy="10" r="3">
    </circle>
    </svg>
    <span>Seoul, South Korea</span>
    </div>
    </div>
    </div>
    <div class="bg-[#1a2128] border border-gray-800 rounded-lg p-4 md:p-6">
    <h3 class="text-white text-lg font-semibold mb-4">Banking Details</h3>
    <div class="space-y-3">
    <div class="flex items-center gap-3 text-gray-300 text-sm md:text-base">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card w-5 h-5 text-gray-500 flex-shrink-0">
    <rect width="20" height="14" x="2" y="5" rx="2">
    </rect>
    <line x1="2" x2="22" y1="10" y2="10">
    </line>
    </svg>
    <span>**** **** **** 1234</span>
    </div>
    <div class="flex items-center gap-3 text-gray-300 text-sm md:text-base">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building w-5 h-5 text-gray-500 flex-shrink-0">
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
    <span>KB Bank</span>
    </div>
    <button class="text-[#98E7D2] hover:text-[#CBE8E4] text-sm transition-colors">+ Add New Bank Account</button>
    </div>
    </div>
    </div>
    <div class="bg-[#1a2128] border border-gray-800 rounded-lg p-4 md:p-6 w-full">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
    <h3 class="text-white text-lg font-semibold">Recent Transactions</h3>
    <button class="text-[#98E7D2] hover:text-[#CBE8E4] text-sm transition-colors text-left md:text-right">View More Records →</button>
    </div>
    <div class="md:hidden space-y-4">
    <div class="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
    <div class="flex justify-between items-start mb-2">
    <div>
    <p class="text-white font-semibold">SABA Bet Started</p>
    <p class="text-gray-400 text-sm">2025-08-12 15:48</p>
    </div>
    <span class="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </div>
    <p class="text-lg font-semibold text-green-400">+₩ 1,000</p>
    </div>
    <div class="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
    <div class="flex justify-between items-start mb-2">
    <div>
    <p class="text-white font-semibold">SABA Bet Started</p>
    <p class="text-gray-400 text-sm">2025-08-12 14:30</p>
    </div>
    <span class="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </div>
    <p class="text-lg font-semibold text-red-400">-₩ 500</p>
    </div>
    <div class="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
    <div class="flex justify-between items-start mb-2">
    <div>
    <p class="text-white font-semibold">SABA Bet Started</p>
    <p class="text-gray-400 text-sm">2025-08-11 18:20</p>
    </div>
    <span class="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </div>
    <p class="text-lg font-semibold text-green-400">+₩ 2,500</p>
    </div>
    <div class="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
    <div class="flex justify-between items-start mb-2">
    <div>
    <p class="text-white font-semibold">SABA Bet Started</p>
    <p class="text-gray-400 text-sm">2025-08-11 12:15</p>
    </div>
    <span class="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </div>
    <p class="text-lg font-semibold text-red-400">-₩ 1,000</p>
    </div>
    <div class="bg-[#0f1419] border border-gray-800 rounded-lg p-4">
    <div class="flex justify-between items-start mb-2">
    <div>
    <p class="text-white font-semibold">SABA Bet Started</p>
    <p class="text-gray-400 text-sm">2025-08-10 16:45</p>
    </div>
    <span class="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </div>
    <p class="text-lg font-semibold text-green-400">+₩ 750</p>
    </div>
    </div>
    <div class="hidden md:block overflow-x-auto">
    <table class="w-full">
    <thead>
    <tr class="border-b border-gray-800">
    <th class="text-left text-gray-400 text-sm py-3 px-4">Type</th>
    <th class="text-left text-gray-400 text-sm py-3 px-4">Amount</th>
    <th class="text-left text-gray-400 text-sm py-3 px-4">Date</th>
    <th class="text-left text-gray-400 text-sm py-3 px-4">Time</th>
    <th class="text-left text-gray-400 text-sm py-3 px-4">Status</th>
    </tr>
    </thead>
    <tbody>
    <tr class="border-b border-gray-800 hover:bg-[#0f1419] transition-colors">
    <td class="text-white py-4 px-4">SABA Bet Started</td>
    <td class="py-4 px-4 font-semibold text-green-400">+₩ 1,000</td>
    <td class="text-gray-300 py-4 px-4">2025-08-12</td>
    <td class="text-gray-300 py-4 px-4">15:48</td>
    <td class="py-4 px-4">
    <span class="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </td>
    </tr>
    <tr class="border-b border-gray-800 hover:bg-[#0f1419] transition-colors">
    <td class="text-white py-4 px-4">SABA Bet Started</td>
    <td class="py-4 px-4 font-semibold text-red-400">-₩ 500</td>
    <td class="text-gray-300 py-4 px-4">2025-08-12</td>
    <td class="text-gray-300 py-4 px-4">14:30</td>
    <td class="py-4 px-4">
    <span class="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </td>
    </tr>
    <tr class="border-b border-gray-800 hover:bg-[#0f1419] transition-colors">
    <td class="text-white py-4 px-4">SABA Bet Started</td>
    <td class="py-4 px-4 font-semibold text-green-400">+₩ 2,500</td>
    <td class="text-gray-300 py-4 px-4">2025-08-11</td>
    <td class="text-gray-300 py-4 px-4">18:20</td>
    <td class="py-4 px-4">
    <span class="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </td>
    </tr>
    <tr class="border-b border-gray-800 hover:bg-[#0f1419] transition-colors">
    <td class="text-white py-4 px-4">SABA Bet Started</td>
    <td class="py-4 px-4 font-semibold text-red-400">-₩ 1,000</td>
    <td class="text-gray-300 py-4 px-4">2025-08-11</td>
    <td class="text-gray-300 py-4 px-4">12:15</td>
    <td class="py-4 px-4">
    <span class="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </td>
    </tr>
    <tr class="border-b border-gray-800 hover:bg-[#0f1419] transition-colors">
    <td class="text-white py-4 px-4">SABA Bet Started</td>
    <td class="py-4 px-4 font-semibold text-green-400">+₩ 750</td>
    <td class="text-gray-300 py-4 px-4">2025-08-10</td>
    <td class="text-gray-300 py-4 px-4">16:45</td>
    <td class="py-4 px-4">
    <span class="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
    </td>
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

<style scoped>
#rk-bar{position:relative;background:#1a2128;border:1px solid #1f2937;border-radius:16px;padding:18px 22px;margin-bottom:24px;display:flex;align-items:center;gap:24px;flex-wrap:wrap}
#rk-bar .rk-id{display:flex;align-items:center;gap:14px}
#rk-bar .rk-av{position:relative;width:52px;height:52px;flex:0 0 auto}
#rk-bar .rk-ring{width:52px;height:52px;border-radius:50%;padding:2px;background:linear-gradient(135deg,#CBE8E4,#98E7D2)}
#rk-bar .rk-ring>span{display:flex;width:100%;height:100%;align-items:center;justify-content:center;border-radius:50%;background:#1a2128;color:#CBE8E4;font-weight:800;font-size:14px}
#rk-bar .rk-hex{position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);width:18px;height:18px}
#rk-bar .rk-name{color:#fff;font-size:18px;font-weight:800;line-height:1.15}
#rk-bar .rk-sub{color:#9ca3af;font-size:12.5px;margin-top:2px}
#rk-bar .rk-prog{flex:1 1 300px;min-width:220px}
#rk-bar .rk-track{height:8px;border-radius:99px;background:#0f1419;overflow:hidden}
#rk-bar .rk-fill{height:100%;width:62%;border-radius:99px;background:linear-gradient(90deg,#CBE8E4,#98E7D2)}
#rk-bar .rk-meta{display:flex;justify-content:space-between;align-items:center;margin-top:9px;font-size:13px;color:#9ca3af}
#rk-bar .rk-cur b{color:#98E7D2;font-weight:700}
#rk-bar .rk-dot{display:inline-block;width:8px;height:8px;border-radius:50%;vertical-align:middle;margin-left:4px}
#rk-bar .rk-dot-gray{background:#6b7688}
#rk-bar .rk-dot-bronze{background:#f59e0b}
#rk-bar .rk-next{color:#9ca3af;font-size:14px;white-space:nowrap}
#rk-bar .rk-next b{color:#f59e0b;font-weight:800}
@media(max-width:768px){#rk-bar{flex-direction:column;align-items:stretch;gap:16px}#rk-bar .rk-next{align-self:flex-start}}
</style>
