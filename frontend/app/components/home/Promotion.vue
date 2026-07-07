<script setup lang="ts">
import { ref } from 'vue';
const tab = ref<'event' | 'news'>('event');
</script>

<template>
<section class="py-6 bg-[#1a2128]">
<div class="container mx-auto px-4">
<div class="flex items-center justify-between mb-4">
<div class="flex items-center gap-2 md:gap-4">
<h2 class="text-white flex items-center gap-1.5">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift w-4 h-4 md:w-5 md:h-5 text-[#98E7D2]">
<rect x="3" y="8" width="18" height="4" rx="1">
</rect>
<path d="M12 8v13">
</path>
<path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7">
</path>
<path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5">
</path>
</svg>
<span class="text-sm md:text-lg">Promotion</span>
</h2>
<div class="flex items-center gap-0.5 border border-gray-700 rounded overflow-hidden">
<button @click="tab='event'" class="px-2 py-0.5 md:px-3 md:py-1 text-xs transition-colors" :class="tab==='event' ? 'bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900' : 'text-gray-400 hover:text-white'">Event</button>
<button @click="tab='news'" class="px-2 py-0.5 md:px-3 md:py-1 text-xs transition-colors" :class="tab==='news' ? 'bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900' : 'text-gray-400 hover:text-white'">News</button>
</div>
</div>
<div class="flex items-center gap-1 md:gap-2">
<a class="text-gray-400 hover:text-white text-xs px-3 py-1.5 border border-gray-700 rounded transition-colors" href="/promotion">Show all</a>
<button class="text-gray-400 hover:text-white p-1 md:p-1.5 border border-gray-700 rounded transition-colors">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left w-3 h-3 md:w-4 md:h-4">
<path d="m15 18-6-6 6-6">
</path>
</svg>
</button>
<button class="text-gray-400 hover:text-white p-1 md:p-1.5 border border-gray-700 rounded transition-colors">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right w-3 h-3 md:w-4 md:h-4">
<path d="m9 18 6-6-6-6">
</path>
</svg>
</button>
</div>
</div>
<div class="hidden md:grid md:grid-cols-4 gap-3">
<div class="bg-[#0f1419] border border-gray-800 rounded-xl overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
<div class="relative h-28 overflow-hidden" style="background: linear-gradient(135deg, rgb(9, 29, 20) 0%, rgb(13, 42, 30) 50%, rgb(10, 26, 18) 100%);">
<div class="absolute inset-0 flex items-center justify-center">
<span class="font-black select-none" style="color: rgb(152, 231, 210); font-size: 54px; letter-spacing: 0.12em; opacity: 0.07;">PROMO!</span>
</div>
<div class="absolute top-2 right-3 flex flex-col items-end" style="gap: 3px;">
<div style="width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.85;">
</div>
<div style="width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, rgb(152, 231, 210), rgb(109, 213, 189)); opacity: 0.6; margin-right: 10px;">
</div>
<div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.45; margin-right: 2px;">
</div>
</div>
<div class="absolute inset-0 flex flex-col justify-center px-4">
<p class="text-xs mb-1.5" style="color: rgb(152, 231, 210); letter-spacing: 0.2em;">SPECIAL OFFER</p>
<p class="text-2xl font-black" style="background: linear-gradient(90deg, rgb(203, 232, 228), rgb(152, 231, 210)) text; -webkit-text-fill-color: transparent; letter-spacing: 0.06em;">PROMOTION</p>
</div>
</div>
<div class="p-4">
<h3 class="text-white text-sm mb-3 text-center">RioBet Casino</h3>
<div class="mb-4">
<p class="text-gray-500 text-[10px] text-center mb-1 uppercase tracking-wider">Safety Index:</p>
<div class="flex items-center justify-center gap-1 mb-1">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
</div>
<p class="text-center text-xs" style="color: rgb(152, 231, 210);">VERY HIGH</p>
</div>
<div class="space-y-2">
<button class="w-full px-3 py-2 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 flex items-center justify-center bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Detail</button>
</div>
</div>
</div>
<div class="bg-[#0f1419] border border-gray-800 rounded-xl overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
<div class="relative h-28 overflow-hidden" style="background: linear-gradient(135deg, rgb(9, 29, 20) 0%, rgb(13, 42, 30) 50%, rgb(10, 26, 18) 100%);">
<div class="absolute inset-0 flex items-center justify-center">
<span class="font-black select-none" style="color: rgb(152, 231, 210); font-size: 54px; letter-spacing: 0.12em; opacity: 0.07;">PROMO!</span>
</div>
<div class="absolute top-2 right-3 flex flex-col items-end" style="gap: 3px;">
<div style="width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.85;">
</div>
<div style="width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, rgb(152, 231, 210), rgb(109, 213, 189)); opacity: 0.6; margin-right: 10px;">
</div>
<div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.45; margin-right: 2px;">
</div>
</div>
<div class="absolute inset-0 flex flex-col justify-center px-4">
<p class="text-xs mb-1.5" style="color: rgb(152, 231, 210); letter-spacing: 0.2em;">SPECIAL OFFER</p>
<p class="text-2xl font-black" style="background: linear-gradient(90deg, rgb(203, 232, 228), rgb(152, 231, 210)) text; -webkit-text-fill-color: transparent; letter-spacing: 0.06em;">PROMOTION</p>
</div>
</div>
<div class="p-4">
<h3 class="text-white text-sm mb-3 text-center">BitStarz Casino</h3>
<div class="mb-4">
<p class="text-gray-500 text-[10px] text-center mb-1 uppercase tracking-wider">Safety Index:</p>
<div class="flex items-center justify-center gap-1 mb-1">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
</div>
<p class="text-center text-xs" style="color: rgb(152, 231, 210);">VERY HIGH</p>
</div>
<div class="space-y-2">
<button class="w-full px-3 py-2 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 flex items-center justify-center bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Detail</button>
</div>
</div>
</div>
<div class="bg-[#0f1419] border border-gray-800 rounded-xl overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
<div class="relative h-28 overflow-hidden" style="background: linear-gradient(135deg, rgb(9, 29, 20) 0%, rgb(13, 42, 30) 50%, rgb(10, 26, 18) 100%);">
<div class="absolute inset-0 flex items-center justify-center">
<span class="font-black select-none" style="color: rgb(152, 231, 210); font-size: 54px; letter-spacing: 0.12em; opacity: 0.07;">PROMO!</span>
</div>
<div class="absolute top-2 right-3 flex flex-col items-end" style="gap: 3px;">
<div style="width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.85;">
</div>
<div style="width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, rgb(152, 231, 210), rgb(109, 213, 189)); opacity: 0.6; margin-right: 10px;">
</div>
<div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.45; margin-right: 2px;">
</div>
</div>
<div class="absolute inset-0 flex flex-col justify-center px-4">
<p class="text-xs mb-1.5" style="color: rgb(152, 231, 210); letter-spacing: 0.2em;">SPECIAL OFFER</p>
<p class="text-2xl font-black" style="background: linear-gradient(90deg, rgb(203, 232, 228), rgb(152, 231, 210)) text; -webkit-text-fill-color: transparent; letter-spacing: 0.06em;">PROMOTION</p>
</div>
</div>
<div class="p-4">
<h3 class="text-white text-sm mb-3 text-center">IceCasino</h3>
<div class="mb-4">
<p class="text-gray-500 text-[10px] text-center mb-1 uppercase tracking-wider">Safety Index:</p>
<div class="flex items-center justify-center gap-1 mb-1">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
</div>
<p class="text-center text-xs" style="color: rgb(152, 231, 210);">VERY HIGH</p>
</div>
<div class="space-y-2">
<button class="w-full px-3 py-2 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 flex items-center justify-center bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Detail</button>
</div>
</div>
</div>
<div class="bg-[#0f1419] border border-gray-800 rounded-xl overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
<div class="relative h-28 overflow-hidden" style="background: linear-gradient(135deg, rgb(9, 29, 20) 0%, rgb(13, 42, 30) 50%, rgb(10, 26, 18) 100%);">
<div class="absolute inset-0 flex items-center justify-center">
<span class="font-black select-none" style="color: rgb(152, 231, 210); font-size: 54px; letter-spacing: 0.12em; opacity: 0.07;">PROMO!</span>
</div>
<div class="absolute top-2 right-3 flex flex-col items-end" style="gap: 3px;">
<div style="width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.85;">
</div>
<div style="width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, rgb(152, 231, 210), rgb(109, 213, 189)); opacity: 0.6; margin-right: 10px;">
</div>
<div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.45; margin-right: 2px;">
</div>
</div>
<div class="absolute inset-0 flex flex-col justify-center px-4">
<p class="text-xs mb-1.5" style="color: rgb(152, 231, 210); letter-spacing: 0.2em;">SPECIAL OFFER</p>
<p class="text-2xl font-black" style="background: linear-gradient(90deg, rgb(203, 232, 228), rgb(152, 231, 210)) text; -webkit-text-fill-color: transparent; letter-spacing: 0.06em;">PROMOTION</p>
</div>
</div>
<div class="p-4">
<h3 class="text-white text-sm mb-3 text-center">Gamdom Casino</h3>
<div class="mb-4">
<p class="text-gray-500 text-[10px] text-center mb-1 uppercase tracking-wider">Safety Index:</p>
<div class="flex items-center justify-center gap-1 mb-1">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(55, 65, 81);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
</div>
<p class="text-center text-xs" style="color: rgb(152, 231, 210);">HIGH</p>
</div>
<div class="space-y-2">
<button class="w-full px-3 py-2 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 flex items-center justify-center bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Detail</button>
</div>
</div>
</div>
</div>
<div class="flex md:hidden overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide pb-2">
<div class="flex-shrink-0 snap-start" style="width: 220px;">
<div class="bg-[#0f1419] border border-gray-800 rounded-xl overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
<div class="relative h-28 overflow-hidden" style="background: linear-gradient(135deg, rgb(9, 29, 20) 0%, rgb(13, 42, 30) 50%, rgb(10, 26, 18) 100%);">
<div class="absolute inset-0 flex items-center justify-center">
<span class="font-black select-none" style="color: rgb(152, 231, 210); font-size: 54px; letter-spacing: 0.12em; opacity: 0.07;">PROMO!</span>
</div>
<div class="absolute top-2 right-3 flex flex-col items-end" style="gap: 3px;">
<div style="width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.85;">
</div>
<div style="width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, rgb(152, 231, 210), rgb(109, 213, 189)); opacity: 0.6; margin-right: 10px;">
</div>
<div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.45; margin-right: 2px;">
</div>
</div>
<div class="absolute inset-0 flex flex-col justify-center px-4">
<p class="text-xs mb-1.5" style="color: rgb(152, 231, 210); letter-spacing: 0.2em;">SPECIAL OFFER</p>
<p class="text-2xl font-black" style="background: linear-gradient(90deg, rgb(203, 232, 228), rgb(152, 231, 210)) text; -webkit-text-fill-color: transparent; letter-spacing: 0.06em;">PROMOTION</p>
</div>
</div>
<div class="p-4">
<h3 class="text-white text-sm mb-3 text-center">RioBet Casino</h3>
<div class="mb-4">
<p class="text-gray-500 text-[10px] text-center mb-1 uppercase tracking-wider">Safety Index:</p>
<div class="flex items-center justify-center gap-1 mb-1">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
</div>
<p class="text-center text-xs" style="color: rgb(152, 231, 210);">VERY HIGH</p>
</div>
<div class="space-y-2">
<button class="w-full px-3 py-2 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 flex items-center justify-center bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Detail</button>
</div>
</div>
</div>
</div>
<div class="flex-shrink-0 snap-start" style="width: 220px;">
<div class="bg-[#0f1419] border border-gray-800 rounded-xl overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
<div class="relative h-28 overflow-hidden" style="background: linear-gradient(135deg, rgb(9, 29, 20) 0%, rgb(13, 42, 30) 50%, rgb(10, 26, 18) 100%);">
<div class="absolute inset-0 flex items-center justify-center">
<span class="font-black select-none" style="color: rgb(152, 231, 210); font-size: 54px; letter-spacing: 0.12em; opacity: 0.07;">PROMO!</span>
</div>
<div class="absolute top-2 right-3 flex flex-col items-end" style="gap: 3px;">
<div style="width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.85;">
</div>
<div style="width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, rgb(152, 231, 210), rgb(109, 213, 189)); opacity: 0.6; margin-right: 10px;">
</div>
<div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.45; margin-right: 2px;">
</div>
</div>
<div class="absolute inset-0 flex flex-col justify-center px-4">
<p class="text-xs mb-1.5" style="color: rgb(152, 231, 210); letter-spacing: 0.2em;">SPECIAL OFFER</p>
<p class="text-2xl font-black" style="background: linear-gradient(90deg, rgb(203, 232, 228), rgb(152, 231, 210)) text; -webkit-text-fill-color: transparent; letter-spacing: 0.06em;">PROMOTION</p>
</div>
</div>
<div class="p-4">
<h3 class="text-white text-sm mb-3 text-center">BitStarz Casino</h3>
<div class="mb-4">
<p class="text-gray-500 text-[10px] text-center mb-1 uppercase tracking-wider">Safety Index:</p>
<div class="flex items-center justify-center gap-1 mb-1">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
</div>
<p class="text-center text-xs" style="color: rgb(152, 231, 210);">VERY HIGH</p>
</div>
<div class="space-y-2">
<button class="w-full px-3 py-2 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 flex items-center justify-center bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Detail</button>
</div>
</div>
</div>
</div>
<div class="flex-shrink-0 snap-start" style="width: 220px;">
<div class="bg-[#0f1419] border border-gray-800 rounded-xl overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
<div class="relative h-28 overflow-hidden" style="background: linear-gradient(135deg, rgb(9, 29, 20) 0%, rgb(13, 42, 30) 50%, rgb(10, 26, 18) 100%);">
<div class="absolute inset-0 flex items-center justify-center">
<span class="font-black select-none" style="color: rgb(152, 231, 210); font-size: 54px; letter-spacing: 0.12em; opacity: 0.07;">PROMO!</span>
</div>
<div class="absolute top-2 right-3 flex flex-col items-end" style="gap: 3px;">
<div style="width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.85;">
</div>
<div style="width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, rgb(152, 231, 210), rgb(109, 213, 189)); opacity: 0.6; margin-right: 10px;">
</div>
<div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.45; margin-right: 2px;">
</div>
</div>
<div class="absolute inset-0 flex flex-col justify-center px-4">
<p class="text-xs mb-1.5" style="color: rgb(152, 231, 210); letter-spacing: 0.2em;">SPECIAL OFFER</p>
<p class="text-2xl font-black" style="background: linear-gradient(90deg, rgb(203, 232, 228), rgb(152, 231, 210)) text; -webkit-text-fill-color: transparent; letter-spacing: 0.06em;">PROMOTION</p>
</div>
</div>
<div class="p-4">
<h3 class="text-white text-sm mb-3 text-center">IceCasino</h3>
<div class="mb-4">
<p class="text-gray-500 text-[10px] text-center mb-1 uppercase tracking-wider">Safety Index:</p>
<div class="flex items-center justify-center gap-1 mb-1">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
</div>
<p class="text-center text-xs" style="color: rgb(152, 231, 210);">VERY HIGH</p>
</div>
<div class="space-y-2">
<button class="w-full px-3 py-2 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 flex items-center justify-center bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Detail</button>
</div>
</div>
</div>
</div>
<div class="flex-shrink-0 snap-start" style="width: 220px;">
<div class="bg-[#0f1419] border border-gray-800 rounded-xl overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
<div class="relative h-28 overflow-hidden" style="background: linear-gradient(135deg, rgb(9, 29, 20) 0%, rgb(13, 42, 30) 50%, rgb(10, 26, 18) 100%);">
<div class="absolute inset-0 flex items-center justify-center">
<span class="font-black select-none" style="color: rgb(152, 231, 210); font-size: 54px; letter-spacing: 0.12em; opacity: 0.07;">PROMO!</span>
</div>
<div class="absolute top-2 right-3 flex flex-col items-end" style="gap: 3px;">
<div style="width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.85;">
</div>
<div style="width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, rgb(152, 231, 210), rgb(109, 213, 189)); opacity: 0.6; margin-right: 10px;">
</div>
<div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.45; margin-right: 2px;">
</div>
</div>
<div class="absolute inset-0 flex flex-col justify-center px-4">
<p class="text-xs mb-1.5" style="color: rgb(152, 231, 210); letter-spacing: 0.2em;">SPECIAL OFFER</p>
<p class="text-2xl font-black" style="background: linear-gradient(90deg, rgb(203, 232, 228), rgb(152, 231, 210)) text; -webkit-text-fill-color: transparent; letter-spacing: 0.06em;">PROMOTION</p>
</div>
</div>
<div class="p-4">
<h3 class="text-white text-sm mb-3 text-center">Gamdom Casino</h3>
<div class="mb-4">
<p class="text-gray-500 text-[10px] text-center mb-1 uppercase tracking-wider">Safety Index:</p>
<div class="flex items-center justify-center gap-1 mb-1">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#98E7D2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(152, 231, 210);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3" style="color: rgb(55, 65, 81);">
<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
</path>
</svg>
</div>
<p class="text-center text-xs" style="color: rgb(152, 231, 210);">HIGH</p>
</div>
<div class="space-y-2">
<button class="w-full px-3 py-2 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 flex items-center justify-center bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]">Detail</button>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
</template>
