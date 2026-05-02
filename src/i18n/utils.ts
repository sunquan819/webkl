export const languages = {
  en: { name: 'English', flag: '🇺🇸', code: 'en-US' },
  zh: { name: '中文', flag: '🇨🇳', code: 'zh-CN' },
  ja: { name: '日本語', flag: '🇯🇵', code: 'ja-JP' },
  ko: { name: '한국어', flag: '🇰🇷', code: 'ko-KR' },
  de: { name: 'Deutsch', flag: '🇩🇪', code: 'de-DE' },
};

export const defaultLang = 'en';

export const translations: Record<string, Record<string, string>> = {
  en: {
    siteName: 'LifeTips',
    siteDesc: 'Practical guides for a better life',
    home: 'Home',
    blog: 'All Posts',
    news: 'Daily News',
    about: 'About',
    latestPosts: 'Latest Posts',
    viewAll: 'View All',
    subscribe: 'Subscribe',
    emailPlaceholder: 'Enter your email',
    copyright: 'All rights reserved',
    disclaimer: 'Content is for reference only',
  },
  zh: {
    siteName: 'LifeTips',
    siteDesc: '生活妙招与品质生活指南',
    home: '首页',
    blog: '全部文章',
    news: '每日大事',
    about: '关于',
    latestPosts: '最新文章',
    viewAll: '查看全部',
    subscribe: '订阅',
    emailPlaceholder: '输入邮箱地址',
    copyright: '版权所有',
    disclaimer: '内容仅供参考',
  },
  ja: {
    siteName: 'LifeTips',
    siteDesc: '生活のヒントと質の高い生活ガイド',
    home: 'ホーム',
    blog: 'すべての記事',
    news: '毎日ニュース',
    about: '概要',
    latestPosts: '最新記事',
    viewAll: 'すべて見る',
    subscribe: '購読',
    emailPlaceholder: 'メールアドレスを入力',
    copyright: '全著作権所有',
    disclaimer: '内容は参考のみ',
  },
  ko: {
    siteName: 'LifeTips',
    siteDesc: '생활 꿀팁과 품질 라이프 가이드',
    home: '홈',
    blog: '모든 글',
    news: '매일 뉴스',
    about: '소개',
    latestPosts: '최신 글',
    viewAll: '모두 보기',
    subscribe: '구독',
    emailPlaceholder: '이메일 입력',
    copyright: '모든 권리 보유',
    disclaimer: '내용은 참고용입니다',
  },
  de: {
    siteName: 'LifeTips',
    siteDesc: 'Life Hacks & Leitfaden für qualitatives Leben',
    home: 'Home',
    blog: 'Alle Beiträge',
    news: 'Tagesnachrichten',
    about: 'Über uns',
    latestPosts: 'Neueste Beiträge',
    viewAll: 'Alle anzeigen',
    subscribe: 'Abonnieren',
    emailPlaceholder: 'E-Mail eingeben',
    copyright: 'Alle Rechte vorbehalten',
    disclaimer: 'Inhalt nur als Referenz',
  },
};

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof translations) {
  return translations[lang];
}

export function getLocalizedPath(path: string, lang: keyof typeof languages) {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}