import { computed, onMounted, watch } from 'vue';
import type {
  Banner,
  HotGame,
  MiniGamesTab,
  PromoCard,
  SportsMatch,
  TickerWin,
} from '~/config/mock/home';
import type { GameCategory } from '~/stores/content';

export type AppLocale = 'zh' | 'en' | 'ko' | 'th';

export const APP_LOCALES: { code: AppLocale; short: string; label: string }[] = [
  { code: 'zh', short: '中文', label: '中文' },
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'ko', short: '한국어', label: '한국어' },
  { code: 'th', short: 'ไทย', label: 'ภาษาไทย' },
];

const LOCALE_KEY = 'win100-locale';

const legacyLocaleMap: Record<string, AppLocale> = {
  zh: 'zh',
  '中文': 'zh',
  CN: 'zh',
  en: 'en',
  EN: 'en',
  English: 'en',
  ko: 'ko',
  KR: 'ko',
  '한국어': 'ko',
  Korean: 'ko',
  th: 'th',
  TH: 'th',
  Thai: 'th',
  'ไทย': 'th',
  'ภาษาไทย': 'th',
};

const normalizeLocale = (value: unknown): AppLocale =>
  typeof value === 'string' && legacyLocaleMap[value] ? legacyLocaleMap[value] : 'zh';

const messages = {
  zh: {
    'nav.home': '首頁',
    'nav.hotGames': '熱門遊戲',
    'nav.sports': '體育',
    'nav.live': '真人娛樂',
    'nav.slots': '老虎機',
    'nav.fish': '捕魚',
    'nav.miniGames': '迷你遊戲',
    'nav.promotion': '優惠活動',
    'nav.browse': '瀏覽',
    'nav.deposit': '儲值',
    'nav.member': '會員',
    'account.id': '帳號',
    'account.balance': '餘額',
    'account.points': '點數',
    'account.view': '查看會員中心',
    'auth.login': '登入',
    'auth.register': '註冊',
    'auth.logout': '登出',
    'action.showAll': '查看全部',
    'action.playNow': '立即遊玩',
    'action.detail': '查看詳情',
    'action.viewAllLive': '查看全部直播',
    'action.placeBet': '立即投注',
    'action.back': '返回',
    'action.search': '搜尋',
    'action.loadMore': '載入更多',
    'search.vendorName': '廠商名稱',
    'search.game': '搜尋遊戲',
    'label.liveStudio': '真人館',
    'label.liveDealer': '真人荷官',
    'game.placeholder': '遊戲名稱',
    'section.hotGames': '熱門遊戲',
    'section.liveSport': '體育直播',
    'section.promotion': '優惠活動',
    'ticker.congratulations': '恭喜',
    'ticker.winning': '贏得',
    'ticker.in': '於',
    'sport.eventTag': '全球最大賽事',
    'sport.worldCup': 'FIFA 世界盃',
    'sport.prizePool': '總獎池',
    'footer.tagline': '理性遊玩，安心娛樂。',
    'footer.responsible': '博彩可能造成成癮，請理性遊玩。如需支援資訊，請前往責任博彩協助頁面。',
    'footer.cookies': '當您存取、繼續使用或瀏覽本站，即表示您同意我們使用部分瀏覽器 Cookie，以改善您的使用體驗。',
    'footer.rights': 'win10069 © 版權所有，受法律保護',
    'studio.previewLanguage': '預覽語言',
  },
  en: {
    'nav.home': 'Home',
    'nav.hotGames': 'Hot Games',
    'nav.sports': 'Sports',
    'nav.live': 'Live',
    'nav.slots': 'Slots',
    'nav.fish': 'Fish',
    'nav.miniGames': 'Mini Games',
    'nav.promotion': 'Promotion',
    'nav.browse': 'Browse',
    'nav.deposit': 'Deposit',
    'nav.member': 'Member',
    'account.id': 'ID',
    'account.balance': 'Balance',
    'account.points': 'Points',
    'account.view': 'View Account',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.logout': 'Logout',
    'action.showAll': 'Show all',
    'action.playNow': 'Play Now',
    'action.detail': 'Detail',
    'action.viewAllLive': 'View All Live',
    'action.placeBet': 'Place Bet',
    'action.back': 'Back',
    'action.search': 'Search',
    'action.loadMore': 'Load More',
    'search.vendorName': 'Vendor Name',
    'search.game': 'Search Game',
    'label.liveStudio': 'LIVE STUDIO',
    'label.liveDealer': 'LIVE DEALER',
    'game.placeholder': 'Game Name',
    'section.hotGames': 'Hot Games',
    'section.liveSport': 'Live Sport',
    'section.promotion': 'Promotion',
    'ticker.congratulations': 'Congratulations',
    'ticker.winning': 'winning',
    'ticker.in': 'in',
    'sport.eventTag': "The World's Biggest Event",
    'sport.worldCup': 'FIFA WORLD CUP',
    'sport.prizePool': 'Prize Pool',
    'footer.tagline': 'Play responsibly, play with us.',
    'footer.responsible': 'Gambling can be addictive, please play responsibly. For information on support measures, please visit our Responsible Gambling Help page.',
    'footer.cookies': 'By accessing, continuing to use or navigating throughout this site you accept that we will use certain browser cookies to improve your customer experience with us.',
    'footer.rights': 'win10069 © All rights reserved and protected by law',
    'studio.previewLanguage': 'Preview language',
  },
  ko: {
    'nav.home': '홈',
    'nav.hotGames': '인기 게임',
    'nav.sports': '스포츠',
    'nav.live': '라이브',
    'nav.slots': '슬롯',
    'nav.fish': '피싱',
    'nav.miniGames': '미니게임',
    'nav.promotion': '프로모션',
    'nav.browse': '둘러보기',
    'nav.deposit': '입금',
    'nav.member': '회원',
    'account.id': '아이디',
    'account.balance': '잔액',
    'account.points': '포인트',
    'account.view': '계정 보기',
    'auth.login': '로그인',
    'auth.register': '회원가입',
    'auth.logout': '로그아웃',
    'action.showAll': '전체 보기',
    'action.playNow': '바로 플레이',
    'action.detail': '상세 보기',
    'action.viewAllLive': '라이브 전체 보기',
    'action.placeBet': '베팅하기',
    'action.back': '뒤로',
    'action.search': '검색',
    'action.loadMore': '더 보기',
    'search.vendorName': '벤더 이름',
    'search.game': '게임 검색',
    'label.liveStudio': '라이브 스튜디오',
    'label.liveDealer': '라이브 딜러',
    'game.placeholder': '게임명',
    'section.hotGames': '인기 게임',
    'section.liveSport': '스포츠 라이브',
    'section.promotion': '프로모션',
    'ticker.congratulations': '축하합니다',
    'ticker.winning': '당첨',
    'ticker.in': '게임',
    'sport.eventTag': '세계 최대 이벤트',
    'sport.worldCup': 'FIFA 월드컵',
    'sport.prizePool': '총 상금',
    'footer.tagline': '책임감 있게 즐겨 주세요.',
    'footer.responsible': '도박은 중독될 수 있으니 책임감 있게 이용해 주세요. 지원 정보는 책임 도박 도움말 페이지에서 확인할 수 있습니다.',
    'footer.cookies': '본 사이트에 접속하거나 계속 이용하면 더 나은 고객 경험을 위해 일부 브라우저 쿠키 사용에 동의하는 것으로 간주됩니다.',
    'footer.rights': 'win10069 © 모든 권리 보유 및 법적 보호',
    'studio.previewLanguage': '미리보기 언어',
  },
  th: {
    'nav.home': 'หน้าแรก',
    'nav.hotGames': 'เกมยอดนิยม',
    'nav.sports': 'กีฬา',
    'nav.live': 'คาสิโนสด',
    'nav.slots': 'สล็อต',
    'nav.fish': 'เกมยิงปลา',
    'nav.miniGames': 'มินิเกม',
    'nav.promotion': 'โปรโมชั่น',
    'nav.browse': 'เลือกดู',
    'nav.deposit': 'ฝากเงิน',
    'nav.member': 'สมาชิก',
    'account.id': 'บัญชี',
    'account.balance': 'ยอดเงิน',
    'account.points': 'แต้ม',
    'account.view': 'ดูศูนย์สมาชิก',
    'auth.login': 'เข้าสู่ระบบ',
    'auth.register': 'สมัครสมาชิก',
    'auth.logout': 'ออกจากระบบ',
    'action.showAll': 'ดูทั้งหมด',
    'action.playNow': 'เล่นเลย',
    'action.detail': 'ดูรายละเอียด',
    'action.viewAllLive': 'ดูไลฟ์ทั้งหมด',
    'action.placeBet': 'เดิมพันเลย',
    'action.back': 'กลับ',
    'action.search': 'ค้นหา',
    'action.loadMore': 'โหลดเพิ่ม',
    'search.vendorName': 'ชื่อผู้ให้บริการ',
    'search.game': 'ค้นหาเกม',
    'label.liveStudio': 'สตูดิโอสด',
    'label.liveDealer': 'ดีลเลอร์สด',
    'game.placeholder': 'ชื่อเกม',
    'section.hotGames': 'เกมยอดนิยม',
    'section.liveSport': 'กีฬาสด',
    'section.promotion': 'โปรโมชั่น',
    'ticker.congratulations': 'ยินดีด้วย',
    'ticker.winning': 'ชนะ',
    'ticker.in': 'ใน',
    'sport.eventTag': 'อีเวนต์ใหญ่ที่สุดของโลก',
    'sport.worldCup': 'ฟุตบอลโลก FIFA',
    'sport.prizePool': 'เงินรางวัลรวม',
    'footer.tagline': 'เล่นอย่างรับผิดชอบ สนุกอย่างมั่นใจ',
    'footer.responsible': 'การพนันอาจทำให้เกิดการเสพติด โปรดเล่นอย่างรับผิดชอบ หากต้องการข้อมูลช่วยเหลือ โปรดไปที่หน้าความช่วยเหลือด้านการพนันอย่างรับผิดชอบ',
    'footer.cookies': 'เมื่อคุณเข้าถึง ใช้งานต่อ หรือเรียกดูเว็บไซต์นี้ แสดงว่าคุณยอมรับการใช้คุกกี้บางส่วนเพื่อปรับปรุงประสบการณ์ของคุณ',
    'footer.rights': 'win10069 © สงวนลิขสิทธิ์และได้รับการคุ้มครองตามกฎหมาย',
    'studio.previewLanguage': 'ภาษาตัวอย่าง',
  },
} satisfies Record<AppLocale, Record<string, string>>;

const bannerCopy: Record<number, Record<AppLocale, Partial<Banner>>> = {
  2: {
    zh: { badge: '首存禮遇', title: '儲值狂熱', sub: '迎新加碼 · 快速出款 · 限時開放', cta: '立即儲值' },
    en: { badge: 'FIRST DEPOSIT', title: 'Deposit Fever', sub: 'WELCOME BONUS · FAST PAYOUT · LIMITED TIME', cta: 'Deposit Now' },
    ko: { badge: '첫 입금 혜택', title: '입금 피버', sub: '웰컴 보너스 · 빠른 출금 · 한정 혜택', cta: '입금하기' },
    th: { badge: 'ฝากครั้งแรก', title: 'Deposit Fever', sub: 'โบนัสต้อนรับ · ถอนเร็ว · จำกัดเวลา', cta: 'ฝากเงินเลย' },
  },
  4: {
    zh: { badge: '2026 世界足球', title: '榮耀之路', sub: '即時賠率 · 賽事中心 · 每球必爭', cta: '查看賽事' },
    en: { badge: 'WORLD FOOTBALL 2026', title: 'Road to Glory', sub: 'LIVE ODDS · MATCH CENTRE · EVERY KICK', cta: 'View Matches' },
    ko: { badge: '2026 월드 풋볼', title: '영광의 길', sub: '실시간 배당 · 매치 센터 · 모든 순간', cta: '경기 보기' },
    th: { badge: 'ฟุตบอลโลก 2026', title: 'เส้นทางสู่ชัยชนะ', sub: 'ราคาสด · ศูนย์การแข่งขัน · ลุ้นทุกลูก', cta: 'ดูการแข่งขัน' },
  },
  1: {
    zh: { badge: '電競週', title: '戰力升級', sub: '每週遊戲返水 · 限時開放', cta: '進入競技場' },
    en: { badge: 'E-SPORTS WEEK', title: 'Level Up', sub: 'WEEKLY GAMEPLAY CASHBACK · LIMITED TIME', cta: 'Enter Arena' },
    ko: { badge: 'E-스포츠 위크', title: '레벨 업', sub: '주간 캐시백 · 한정 이벤트', cta: '아레나 입장' },
    th: { badge: 'สัปดาห์อีสปอร์ต', title: 'อัปเลเวล', sub: 'คืนยอดเล่นรายสัปดาห์ · จำกัดเวลา', cta: 'เข้าสู่อารีนา' },
  },
  3: {
    zh: { badge: '智慧錢包', title: 'USDT', sub: '快速入金 · 安全結算 · 24/7 存取', cta: '立即儲值' },
    en: { badge: 'SMART WALLET', title: 'USDT', sub: 'FAST DEPOSIT · SECURE SETTLEMENT · 24/7 ACCESS', cta: 'Deposit Now' },
    ko: { badge: '스마트 월렛', title: 'USDT', sub: '빠른 입금 · 안전 정산 · 24/7 이용', cta: '입금하기' },
    th: { badge: 'สมาร์ตวอลเล็ต', title: 'USDT', sub: 'ฝากเร็ว · ชำระปลอดภัย · ใช้งาน 24/7', cta: 'ฝากเงินเลย' },
  },
};

const tabLabels: Record<string, Record<AppLocale, string>> = {
  mini: { zh: '迷你遊戲', en: 'Mini Game', ko: '미니게임', th: 'มินิเกม' },
  slot: { zh: '老虎機', en: 'Slot Game', ko: '슬롯 게임', th: 'สล็อต' },
  live: { zh: '真人遊戲', en: 'Live Game', ko: '라이브 게임', th: 'คาสิโนสด' },
};

const bonusPrefix: Record<AppLocale, string> = {
  zh: '加碼',
  en: 'BONUS',
  ko: '보너스',
  th: 'โบนัส',
};

const localizeBonus = (bonus: string, locale: AppLocale) => {
  const value = bonus
    .replace(/^BONUS\s*/i, '')
    .replace(/^加碼\s*/i, '')
    .replace(/^보너스\s*/i, '')
    .replace(/^โบนัส\s*/i, '');
  return `${bonusPrefix[locale]} ${value}`.trim();
};

const copyBanner = (banner: Banner, locale: AppLocale): Banner => ({
  ...banner,
  ...(bannerCopy[banner.id]?.[locale] ?? {}),
});

const copyMiniTab = <T extends MiniGamesTab | GameCategory>(tab: T, locale: AppLocale): T => ({
  ...tab,
  label: tabLabels[tab.key]?.[locale] ?? tab.label,
});

const copyHotGame = (game: HotGame, locale: AppLocale): HotGame => ({
  ...game,
  bonus: localizeBonus(game.bonus, locale),
});

export function useLocale() {
  const locale = useState<AppLocale>('ui:locale', () => 'zh');
  const listenerReady = useState<boolean>('ui:locale-listener-ready', () => false);

  if (locale.value !== normalizeLocale(locale.value)) locale.value = normalizeLocale(locale.value);

  const setLocale = (next: AppLocale | string) => {
    locale.value = normalizeLocale(next);
  };

  onMounted(() => {
    setLocale(window.localStorage.getItem(LOCALE_KEY) ?? locale.value);
    window.localStorage.setItem(LOCALE_KEY, locale.value);

    if (!listenerReady.value) {
      listenerReady.value = true;
      window.addEventListener('storage', (event) => {
        if (event.key === LOCALE_KEY && event.newValue) setLocale(event.newValue);
      });
    }
  });

  watch(locale, (value) => {
    if (import.meta.client) window.localStorage.setItem(LOCALE_KEY, value);
  });

  const currentLocale = computed(() =>
    APP_LOCALES.find((item) => item.code === locale.value) ?? APP_LOCALES[0]!,
  );

  const t = (key: keyof typeof messages.zh) =>
    messages[locale.value][key] ?? messages.zh[key] ?? key;

  return {
    locale,
    locales: APP_LOCALES,
    currentLocale,
    setLocale,
    t,
    localizeBanner: (banner: Banner) => copyBanner(banner, locale.value),
    localizeBanners: (banners: Banner[]) => banners.map((banner) => copyBanner(banner, locale.value)),
    localizeHotGames: (games: HotGame[]) => games.map((game) => copyHotGame(game, locale.value)),
    localizeMiniTabs: <T extends MiniGamesTab | GameCategory>(tabs: T[]) =>
      tabs.map((tab) => copyMiniTab(tab, locale.value)),
    localizePromoCards: (cards: PromoCard[]) => cards,
    localizeSportsMatches: (matches: SportsMatch[]) => matches,
    localizeTickerWins: (wins: TickerWin[]) => wins,
  };
}
