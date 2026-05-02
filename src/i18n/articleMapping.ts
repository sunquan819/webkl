export const articleMapping: Record<string, Record<string, string>> = {
  'ai-agent-explained': {
    en: 'ai-agent-explained',
    zh: 'ai-agent-explained',
    ja: 'ai-agent-explained',
    ko: 'ai-agent-explained',
    de: 'ai-agent-explained',
  },
  'ai-models-beginners': {
    en: 'ai-models-beginners',
    zh: 'ai-models-beginners',
    ja: 'ai-models-beginners',
    ko: 'ai-models-beginners',
    de: 'ai-models-beginners',
  },
  'chatgpt-vs-claude': {
    en: 'chatgpt-vs-claude',
    zh: 'chatgpt-vs-claude',
    ja: 'chatgpt-vs-claude',
    ko: 'chatgpt-vs-claude',
    de: 'chatgpt-vs-claude',
  },
  'etf-investment-mistakes': {
    en: 'etf-investment-mistakes',
    zh: 'etf-investment-mistakes',
    ja: 'etf-investment-mistakes',
    ko: 'etf-investment-mistakes',
    de: 'etf-investment-mistakes',
  },
  'side-income-guide': {
    en: 'side-income-guide',
    zh: 'side-income-guide',
    ja: 'side-income-guide',
    ko: 'side-income-guide',
    de: 'side-income-guide',
  },
  'weight-loss-3-months': {
    en: 'weight-loss-3-months',
    zh: 'weight-loss-3-months',
    ja: 'weight-loss-3-months',
    ko: 'weight-loss-3-months',
    de: 'weight-loss-3-months',
  },
};

export function getArticleSlugInTargetLang(
  currentSlug: string,
  currentLang: string,
  targetLang: string
): string | null {
  for (const [baseSlug, translations] of Object.entries(articleMapping)) {
    if (translations[currentLang] === currentSlug || baseSlug === currentSlug) {
      return translations[targetLang] || null;
    }
  }
  return null;
}