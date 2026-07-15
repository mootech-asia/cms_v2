import { defineStore } from 'pinia';

/**
 * 五張紀錄頁(投注/存款/提款/帳變/損益)的占位資料與欄位定義。
 * 純 UI:rows 為 mock,實站接 API 後由 action 取數。
 */
export type RecordColumn = {
  field: string;
  header: string;
  /** 儲存格對齊,預設靠左 */
  align?: 'left' | 'right' | 'center';
  /** 呈現變體:mono 單號 / strong 主要文字 / dim 次要時間 / signed 正負色金額 / status 狀態膠囊 */
  variant?: 'mono' | 'strong' | 'dim' | 'signed' | 'status';
};

export type RecordRow = Record<string, string>;

export type RecordConfig = {
  title: string;
  columns: RecordColumn[];
  rows: RecordRow[];
  statusOptions?: string[];
  total?: { label: string; value: string };
  autoRefresh?: boolean;
};

const STATUS_OPTIONS = ['All', 'Pending', 'Approved', 'Rejected'];

export type RecordKey = 'betting' | 'deposit' | 'withdrawal' | 'account' | 'profitLoss';

export const useRecordsStore = defineStore('records', {
  state: () => ({
    betting: {
      title: 'Betting Record',
      columns: [
        { field: 'orderNo', header: 'Order No', variant: 'mono' },
        { field: 'game', header: 'Game', variant: 'strong' },
        { field: 'time', header: 'Settlement Time', variant: 'dim' },
        { field: 'bet', header: 'Bet Amount', align: 'right' },
        { field: 'valid', header: 'Valid Bet', align: 'right' },
        { field: 'win', header: 'Winnings', align: 'right' },
        { field: 'pl', header: 'Bet P&L', align: 'right', variant: 'signed' },
      ],
      rows: [
        { orderNo: '202508120001', game: 'Sports', time: '2025-08-12 15:48', bet: '50,000', valid: '50,000', win: '92,500', pl: '+42,500' },
        { orderNo: '202508120002', game: 'Slots', time: '2025-08-12 14:30', bet: '20,000', valid: '20,000', win: '0', pl: '-20,000' },
        { orderNo: '202508110007', game: 'Live Casino', time: '2025-08-11 18:20', bet: '35,000', valid: '35,000', win: '78,000', pl: '+43,000' },
        { orderNo: '202508110003', game: 'Sports', time: '2025-08-11 12:15', bet: '10,000', valid: '10,000', win: '8,500', pl: '-1,500' },
      ],
    } as RecordConfig,

    deposit: {
      title: 'Deposit Record',
      statusOptions: STATUS_OPTIONS,
      autoRefresh: true,
      total: { label: 'Total Deposit Amount', value: '350,000' },
      columns: [
        { field: 'no', header: 'Transaction No.', variant: 'mono' },
        { field: 'time', header: 'Date Time', variant: 'dim' },
        { field: 'amount', header: 'Deposit Amount', align: 'right' },
        { field: 'status', header: 'Status', align: 'center', variant: 'status' },
        { field: 'request', header: 'Request Amount', align: 'right' },
        { field: 'bonus', header: 'Bonus', align: 'right' },
        { field: 'method', header: 'Method' },
        { field: 'bankRef', header: 'Bank Reference' },
        { field: 'depositTime', header: 'Deposit Time', variant: 'dim' },
        { field: 'charge', header: 'Bank Charge', align: 'right' },
        { field: 'promotion', header: 'Promotion' },
        { field: 'remark', header: 'Remark' },
      ],
      rows: [
        { no: 'DP25081201', time: '2025-08-12 09:14', amount: '100,000', status: 'Approved', request: '100,000', bonus: '10,000', method: 'Bank', bankRef: 'KB-8841', depositTime: '2025-08-12 09:18', charge: '0', promotion: '100% Bonus', remark: '-' },
        { no: 'DP25081105', time: '2025-08-11 21:02', amount: '50,000', status: 'Approved', request: '50,000', bonus: '0', method: 'Bank', bankRef: 'SH-2210', depositTime: '2025-08-11 21:05', charge: '0', promotion: '-', remark: '-' },
        { no: 'DP25081008', time: '2025-08-10 13:48', amount: '200,000', status: 'Pending', request: '200,000', bonus: '20,000', method: 'Crypto', bankRef: 'USDT-4f1', depositTime: '-', charge: '0', promotion: 'VIP Reload', remark: '-' },
        { no: 'DP25080902', time: '2025-08-09 18:33', amount: '30,000', status: 'Rejected', request: '30,000', bonus: '0', method: 'Bank', bankRef: 'WR-0093', depositTime: '-', charge: '0', promotion: '-', remark: 'Name mis' },
      ],
    } as RecordConfig,

    withdrawal: {
      title: 'Withdrawal Record',
      statusOptions: STATUS_OPTIONS,
      autoRefresh: true,
      total: { label: 'Total Withdrawal Amount', value: '270,000' },
      columns: [
        { field: 'no', header: 'Transaction No.', variant: 'mono' },
        { field: 'time', header: 'Request Time', variant: 'dim' },
        { field: 'paid', header: 'Paid Amount', align: 'right' },
        { field: 'status', header: 'Status', align: 'center', variant: 'status' },
        { field: 'request', header: 'Request Amount', align: 'right' },
        { field: 'bank', header: 'Bank Name' },
        { field: 'paidDate', header: 'Paid Date', variant: 'dim' },
        { field: 'remark', header: 'Remark' },
      ],
      rows: [
        { no: 'WD25081201', time: '2025-08-12 10:20', paid: '80,000', status: 'Approved', request: '80,000', bank: 'KB Bank', paidDate: '2025-08-12 10:45', remark: '-' },
        { no: 'WD25081104', time: '2025-08-11 16:50', paid: '150,000', status: 'Approved', request: '150,000', bank: 'Shinhan', paidDate: '2025-08-11 17:10', remark: '-' },
        { no: 'WD25081006', time: '2025-08-10 11:05', paid: '40,000', status: 'Pending', request: '40,000', bank: 'Woori', paidDate: '-', remark: '-' },
        { no: 'WD25080903', time: '2025-08-09 22:14', paid: '25,000', status: 'Rejected', request: '25,000', bank: 'KB Bank', paidDate: '-', remark: 'Rollover left' },
      ],
    } as RecordConfig,

    account: {
      title: 'Account Record',
      statusOptions: STATUS_OPTIONS,
      columns: [
        { field: 'type', header: 'Transaction Type', variant: 'strong' },
        { field: 'time', header: 'Time', variant: 'dim' },
        { field: 'amount', header: 'Transaction Amount', align: 'right', variant: 'signed' },
        { field: 'balance', header: 'Current Balance', align: 'right' },
        { field: 'no', header: 'Transaction No.', variant: 'mono' },
        { field: 'content', header: 'Content' },
      ],
      rows: [
        { type: 'Deposit', time: '2025-08-12 09:18', amount: '+100,000', balance: '1,284,320', no: 'DP25081201', content: 'Bank deposit approved' },
        { type: 'Bet', time: '2025-08-12 15:48', amount: '-50,000', balance: '1,234,320', no: 'BT25081201', content: 'Sports — Champions League' },
        { type: 'Win', time: '2025-08-12 15:52', amount: '+92,500', balance: '1,326,820', no: 'WN25081201', content: 'Sports settlement' },
        { type: 'Withdrawal', time: '2025-08-12 10:45', amount: '-80,000', balance: '1,246,820', no: 'WD25081201', content: 'Bank withdrawal paid' },
      ],
    } as RecordConfig,

    profitLoss: {
      title: 'Profit And Loss',
      autoRefresh: true,
      total: { label: 'Total P&L', value: '0.00' },
      columns: [
        { field: 'game', header: 'Game Type', variant: 'strong' },
        { field: 'pl', header: 'Total P&L', align: 'right', variant: 'signed' },
        { field: 'betting', header: 'Betting', align: 'right' },
        { field: 'valid', header: 'Valid Bet', align: 'right' },
        { field: 'win', header: 'Win Amount', align: 'right' },
        { field: 'rebate', header: 'Rebate', align: 'right' },
      ],
      rows: [
        { game: 'Sports', pl: '+128,500', betting: '420,000', valid: '420,000', win: '548,500', rebate: '4,200' },
        { game: 'Slots', pl: '-65,000', betting: '310,000', valid: '310,000', win: '245,000', rebate: '3,100' },
        { game: 'Live Casino', pl: '+92,000', betting: '180,000', valid: '180,000', win: '272,000', rebate: '1,800' },
        { game: 'Mini Games', pl: '-12,000', betting: '60,000', valid: '60,000', win: '48,000', rebate: '600' },
        { game: 'Originals', pl: '+33,500', betting: '95,000', valid: '95,000', win: '128,500', rebate: '950' },
        { game: 'Fish', pl: '0', betting: '0', valid: '0', win: '0', rebate: '0' },
      ],
    } as RecordConfig,
  }),
  actions: {
    /** 篩選列 Confirm / 自動更新倒數歸零共用的佔位取數;實站接 API 後在這裡打 GET 換頁 */
    refresh(_page: RecordKey) {
      // 佔位:目前 rows 皆為 mock,不做任何事。
    },
  },
});
