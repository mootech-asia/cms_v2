import { defineStore } from 'pinia';

export type BankAccount = { bank: string; num: string; holder: string; bindDate: string };

export const useBankStore = defineStore('bank', {
  state: () => ({
    accounts: [
      { bank: 'KB Bank', num: '**** **** **** 1234', holder: 'M＊＊＊＊＊＊＊', bindDate: '2025-08-14' },
      { bank: 'Shinhan Bank', num: '**** **** **** 5678', holder: 'M＊＊＊＊＊＊＊', bindDate: '2025-09-05' },
      { bank: 'Woori Bank', num: '**** **** **** 9012', holder: 'M＊＊＊＊＊＊＊', bindDate: '2025-10-02' },
    ] as BankAccount[],
  }),
  actions: {
    /** banking-details.vue 綁定新帳戶;佔位邏輯,實站接 API 後改為送出綁卡請求再重新取數 */
    addAccount(account: Omit<BankAccount, 'holder' | 'bindDate'> & Partial<Pick<BankAccount, 'holder' | 'bindDate'>>) {
      this.accounts.push({
        holder: 'M＊＊＊＊＊＊＊',
        bindDate: new Date().toISOString().slice(0, 10),
        ...account,
      });
    },
    /** 佔位:解除綁定,實站接 API 後改為送出解綁請求 */
    removeAccount(index: number) {
      this.accounts.splice(index, 1);
    },
  },
});
