import fs from 'fs';
import path from 'path';

const NEWS_DIR = './src/content';
const LANGUAGES = ['zh', 'en', 'ja', 'ko', 'de'];

async function fetchNews() {
  console.log('Fetching news from various sources...');
  
  const newsItems = [];
  
  const sources = [
    { name: 'World Politics', count: 20 },
    { name: 'Economy & Finance', count: 20 },
    { name: 'Technology', count: 20 },
    { name: 'Science & Environment', count: 15 },
    { name: 'Sports', count: 10 },
    { name: 'Culture & Arts', count: 15 },
  ];
  
  let index = 1;
  for (const source of sources) {
    for (let i = 0; i < source.count; i++) {
      newsItems.push({
        index,
        category: source.name,
        title: `[Sample] ${source.name} headline ${i + 1}`,
        summary: 'Brief summary of this news item...',
      });
      index++;
    }
  }
  
  return newsItems;
}

function generateMarkdown(newsItems, lang) {
  const date = new Date().toISOString().split('T')[0];
  
  const titles = {
    zh: `${date}全球大事100条`,
    en: `100 Major Global Events on ${date}`,
    ja: `${date}世界重要ニュース100選`,
    ko: `${date} 세계 중요 뉴스 100선`,
    de: `100 Wichtige globale Ereignisse am ${date}`,
  };
  
  const categoryHeaders = {
    zh: {
      'World Politics': '政治要闻',
      'Economy & Finance': '经济金融',
      'Technology': '科技',
      'Science & Environment': '科学与环境',
      'Sports': '体育',
      'Culture & Arts': '文化与艺术',
    },
    en: {
      'World Politics': 'World Politics',
      'Economy & Finance': 'Economy & Finance',
      'Technology': 'Technology',
      'Science & Environment': 'Science & Environment',
      'Sports': 'Sports',
      'Culture & Arts': 'Culture & Arts',
    },
    ja: {
      'World Politics': '政治ニュース',
      'Economy & Finance': '経済・金融',
      'Technology': '技術',
      'Science & Environment': '科学・環境',
      'Sports': 'スポーツ',
      'Culture & Arts': '文化・芸術',
    },
    ko: {
      'World Politics': '정치 뉴스',
      'Economy & Finance': '경제/금융',
      'Technology': '기술',
      'Science & Environment': '과학/환경',
      'Sports': '스포츠',
      'Culture & Arts': '문화/예술',
    },
    de: {
      'World Politics': 'Weltpolitik',
      'Economy & Finance': 'Wirtschaft & Finanzen',
      'Technology': 'Technologie',
      'Science & Environment': 'Wissenschaft & Umwelt',
      'Sports': 'Sport',
      'Culture & Arts': 'Kultur & Kunst',
    },
  };
  
  let content = `---
date: "${date}"
title: "${titles[lang]}"
description: "Daily global events summary"
source: "Various news sources"
---

`;
  
  const categories = [...new Set(newsItems.map(item => item.category))];
  
  for (const category of categories) {
    const header = categoryHeaders[lang][category] || category;
    content += `## ${header}\n\n`;
    
    const categoryItems = newsItems.filter(item => item.category === category);
    for (const item of categoryItems) {
      content += `${item.index}. **${item.title}** - ${item.summary}\n`;
    }
    content += '\n';
  }
  
  return content;
}

async function main() {
  const newsItems = await fetchNews();
  
  for (const lang of LANGUAGES) {
    const dir = path.join(NEWS_DIR, `news-${lang}`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const date = new Date().toISOString().split('T')[0];
    const filePath = path.join(dir, `${date}.md`);
    
    if (!fs.existsSync(filePath)) {
      const content = generateMarkdown(newsItems, lang);
      fs.writeFileSync(filePath, content);
      console.log(`Created: ${filePath}`);
    } else {
      console.log(`Already exists: ${filePath}`);
    }
  }
  
  console.log('Done!');
}

main().catch(console.error);