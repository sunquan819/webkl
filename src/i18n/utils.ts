export const languages = {
  en: { name: 'English', flag: '🇺🇸', code: 'en-US' },
  zh: { name: '中文', flag: '🇨🇳', code: 'zh-CN' },
};

export const defaultLang = 'en';

export const translations: Record<string, Record<string, string>> = {
  en: {
    siteName: 'LifeTips',
    siteDesc: 'Practical guides for a better life',
    home: 'Home',
    blog: 'All Posts',
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
    about: '关于',
    latestPosts: '最新文章',
    viewAll: '查看全部',
    subscribe: '订阅',
    emailPlaceholder: '输入邮箱地址',
    copyright: '版权所有',
    disclaimer: '内容仅供参考',
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