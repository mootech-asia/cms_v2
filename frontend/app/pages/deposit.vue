<script setup lang="ts">
import { computed, ref } from 'vue';

type Method = 'bank' | 'crypto';
const method = ref<Method>('bank');
const amount = ref('10,000');
const promotion = ref<number | null>(null);
const cryptoAmount = ref('');
const cryptoPromotion = ref<number | null>(null);

const quickAmounts = ['10,000', '50,000', '100,000', '500,000', '1,000,000'];
const promos = [
  {
    title: 'New Sign-up First Deposit 50%',
    notes: [
      'This event is not applicable to Evolution Gaming and Pragmatic Play casino games.',
      'Rollover Requirement: all funds are calculated as 300% of Deposit Amount + Bonus.',
      'Bets with odds less than 1.7 will not count towards the rollover requirement.',
    ],
  },
  {
    title: 'Exclusive to Evolution Gaming, Pragmatic Play Casinos Unlimited Deposit',
    notes: [
      'Maximum Bonus Amount: ₩200,000.',
      'Withdrawal Rollover Condition: 10 times (1,000%).',
      'Example: Deposit ₩1,000,000 and receive a ₩200,000 bonus.',
    ],
  },
];
const cryptoPromos = [
  '[USDT only] Slot Daily First Deposit 5%',
  '[USDT only] Casino Reload 5%',
  '[USDT only] Slot Reload 5%',
];
const converted = computed(() => {
  const value = Number(cryptoAmount.value.replace(/[^\d]/g, ''));
  return value > 0 ? (value / 1516.98).toFixed(2) : '0.00';
});
const bankReady = computed(() => Number(amount.value.replace(/[^\d]/g, '')) > 0 && promotion.value !== null);
const cryptoReady = computed(() => Number(cryptoAmount.value.replace(/[^\d]/g, '')) > 0 && cryptoPromotion.value !== null);
</script>

<template>
  <div class="min-h-screen bg-[#0f1419] overflow-x-hidden">
    <MemberHeader />
    <div class="flex min-h-screen">
      <MemberSidebar />
      <main class="flex-1 min-w-0 p-4 md:p-8 pb-24">
        <h1 class="text-white text-2xl md:text-3xl mb-6 md:mb-8">Deposit</h1>
        <div class="payment-tabs">
          <button :class="{ active: method === 'bank' }" @click="method = 'bank'">
            <AppIcon name="card" /><span>Bank Card</span>
          </button>
          <button :class="{ active: method === 'crypto' }" @click="method = 'crypto'">
            <AppIcon name="bitcoin" /><span>Crypto Wallet</span>
          </button>
        </div>

        <section v-if="method === 'bank'" class="payment-card">
          <h2 class="section-title">Deposit Amount</h2>
          <div class="amount-grid">
            <button
              v-for="item in quickAmounts"
              :key="item"
              :class="{ selected: amount === item }"
              @click="amount = item"
            >{{ item }}</button>
          </div>
          <input v-model="amount" class="field" aria-label="Deposit amount">
          <p class="note">* Minimum Amount: ₩ 10,000; Maximum Amount: ₩ 9,000,000 *</p>

          <h2 class="section-title mt-8">Choose promotion</h2>
          <button
            v-for="(promo, index) in promos"
            :key="promo.title"
            class="promo-card"
            :class="{ selected: promotion === index }"
            @click="promotion = index"
          >
            <span class="radio"><span v-if="promotion === index" /></span>
            <span class="min-w-0 text-left">
              <strong>{{ promo.title }}</strong>
              <span v-for="line in promo.notes" :key="line" class="block mt-1 text-xs md:text-sm text-gray-300">• {{ line }}</span>
            </span>
          </button>
          <button class="action" :class="{ ready: bankReady }" :disabled="!bankReady">Next</button>
          <NuxtLink class="back" to="/account">Back</NuxtLink>
        </section>

        <section v-else class="payment-card">
          <h2 class="section-title">Deposit Info</h2>
          <div class="crypto-method"><span>₮</span> USDT TRC20</div>
          <div class="form-grid">
            <label>Deposit Amounts:</label>
            <div>
              <input v-model="cryptoAmount" class="field" inputmode="numeric" placeholder="Deposit Amounts">
              <p class="note">Deposit Limit: ₩ 50,000 (32.96 USDT) - ₩ 8,999,999 (5,932.83 USDT)</p>
            </div>
            <label>Converted Crypto Amount:</label>
            <div class="converted"><input class="field" :value="converted" disabled><strong>USDT</strong></div>
          </div>
          <p class="rate">Exchange rate: <strong>1 USDT = ₩ 1,516.98</strong></p>

          <h2 class="section-title">Choose promotion</h2>
          <button
            v-for="(promo, index) in cryptoPromos"
            :key="promo"
            class="crypto-promo"
            :class="{ selected: cryptoPromotion === index }"
            @click="cryptoPromotion = index"
          >
            <span class="radio"><span v-if="cryptoPromotion === index" /></span>
            <strong>{{ promo }}</strong>
            <span class="amount">≥₩ 10,000.00</span>
          </button>
          <button class="action" :class="{ ready: cryptoReady }" :disabled="!cryptoReady">Apply for Deposit</button>
          <button class="back" @click="method = 'bank'">Back</button>
        </section>
      </main>
    </div>
    <MobileBottomNav />
  </div>
</template>

<style scoped>
.payment-tabs{display:flex;gap:12px;width:100%;max-width:56rem;margin:0 auto 24px}.payment-tabs button{display:flex;align-items:center;justify-content:center;gap:10px;min-width:170px;padding:12px 18px;border:1px solid #374151;border-radius:10px;background:#0f1419;color:#d1d5db;font-weight:600}.payment-tabs svg{width:22px;height:22px}.payment-tabs button.active{border-color:#98e7d2;background:linear-gradient(90deg,#cbe8e4,#98e7d2);color:#0f1622}.payment-card{width:100%;max-width:56rem;margin:0 auto;padding:32px;background:#1a2128;border:1px solid #1f2937;border-radius:10px}.section-title{padding-left:12px;border-left:4px solid #aae5d3;color:#aae5d3;font-size:20px;font-weight:600}.amount-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin:24px 0}.amount-grid button{min-height:58px;border:1px solid #374151;border-radius:10px;background:#0f1419;color:white;font-weight:600}.amount-grid button.selected{border-color:transparent;background:#313e40;color:#aae5d3}.field{width:100%;min-height:50px;padding:12px 16px;border:1px solid #374151;border-radius:10px;background:#0f1419;color:#d1d5db;outline:none}.field:focus{border-color:#98e7d2}.note{margin-top:8px;color:#fb7185;font-size:14px}.promo-card,.crypto-promo{display:flex;width:100%;gap:14px;margin-top:16px;padding:20px;border:1px solid #374151;border-radius:10px;background:#0f1419;color:#d1d5db}.promo-card.selected,.crypto-promo.selected{border-color:#98e7d2}.radio{display:flex;align-items:center;justify-content:center;width:20px;height:20px;flex:0 0 auto;border:2px solid #6b7280;border-radius:50%}.radio span{width:10px;height:10px;border-radius:50%;background:#98e7d2}.promo-card.selected .radio,.crypto-promo.selected .radio{border-color:#98e7d2}.crypto-method{display:flex;align-items:center;gap:10px;width:max-content;margin:24px 0;padding:12px 18px;border:1px solid #98e7d2;border-radius:10px;color:#d1d5db}.crypto-method span{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#0d9488;color:white}.form-grid{display:grid;grid-template-columns:190px minmax(0,1fr);gap:16px 20px;align-items:center;color:#d1d5db}.converted{display:flex;align-items:center;gap:16px}.rate{margin:24px 0 32px;color:#d1d5db}.crypto-promo{align-items:center;text-align:left}.crypto-promo .amount{margin-left:auto;color:#98e7d2;font-weight:600}.action,.back{display:flex;align-items:center;justify-content:center;width:100%;height:56px;margin-top:24px;border-radius:10px;font-weight:600}.action{border:0;background:#4b5563;color:white;cursor:not-allowed}.action.ready{background:linear-gradient(90deg,#cbe8e4,#98e7d2);color:#0f1622;cursor:pointer}.back{border:1px solid #374151;background:#0f1419;color:white;text-decoration:none}.back:hover{border-color:#4b5563}@media(max-width:700px){.payment-tabs{gap:8px;margin-bottom:16px}.payment-tabs button{flex:1;min-width:0;padding:10px 12px;font-size:14px}.payment-card{padding:16px}.section-title{font-size:17px}.amount-grid{grid-template-columns:repeat(2,1fr);gap:10px;margin:16px 0}.amount-grid button{min-height:48px;font-size:14px}.form-grid{grid-template-columns:1fr;gap:8px}.form-grid label{font-size:14px}.field{min-height:48px;font-size:14px}.note{font-size:12px}.promo-card,.crypto-promo{padding:16px;font-size:14px;line-height:1.45}.crypto-promo{align-items:flex-start;flex-wrap:wrap}.crypto-promo .amount{width:100%;margin-left:34px}.rate{font-size:13px}.action,.back{height:48px;font-size:14px}}
</style>
