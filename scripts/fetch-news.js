import fs from 'fs';
import path from 'path';
import https from 'https';
import { HttpsProxyAgent } from 'https-proxy-agent';

const NEWS_DIR = './src/content';
const LANGUAGES = ['zh', 'en', 'ja', 'ko', 'de'];

const PROXY_URL = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || null;
const agent = PROXY_URL ? new HttpsProxyAgent(PROXY_URL) : null;

const NEWS_SOURCES = [
  { url: 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en', lang: 'en' },
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', lang: 'en' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', lang: 'en' },
  { url: 'https://news.google.com/rss?hl=zh-CN&gl=CN&ceid=CN:zh-Hans', lang: 'zh' },
  { url: 'https://www.chinanews.com.cn/rss/splb.xml', lang: 'zh' },
  { url: 'https://news.google.com/rss?hl=ja&gl=JP&ceid=JP:ja', lang: 'ja' },
  { url: 'https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko', lang: 'ko' },
  { url: 'https://news.google.com/rss?hl=de&gl=DE&ceid=DE:de', lang: 'de' },
  { url: 'https://rss.dw.com/rss/rss-en-all', lang: 'de' },
];

async function fetchRSS(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
      agent: agent,
    };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseRSS(xml, maxItems = 100) {
  const items = [];
  const itemRegex = /<item>(.*?)<\/item>/gs;
  const matches = xml.matchAll(itemRegex);
  
  for (const match of matches) {
    if (items.length >= maxItems) break;
    const itemXml = match[1];
    
    const titleMatch = itemXml.match(/<title>(.*?)<\/title>/);
    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
    const descMatch = itemXml.match(/<description>(.*?)<\/description>/);
    
    if (titleMatch) {
      let title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
      let description = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '';
      description = description.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      description = description.replace(/<[^>]+>/g, '').trim();
      
      items.push({
        title,
        link: linkMatch ? linkMatch[1].trim() : '',
        description: description.substring(0, 150),
      });
    }
  }
  
  return items;
}

async function fetchNews() {
  console.log('Fetching news from Google News RSS...');
  if (PROXY_URL) console.log('Using proxy:', PROXY_URL);
  
  const newsByLang = {};
  
  for (const source of NEWS_SOURCES) {
    try {
      console.log(`Fetching: ${source.url}`);
      const xml = await fetchRSS(source.url);
      const items = parseRSS(xml, 100);
      
      if (!newsByLang[source.lang]) {
        newsByLang[source.lang] = [];
      }
      
      for (const item of items) {
        newsByLang[source.lang].push({
          title: item.title,
          link: item.link,
          summary: item.description.substring(0, 150),
        });
      }
      
      console.log(`  Found ${items.length} items for ${source.lang}`);
    } catch (err) {
      console.error(`  Error fetching ${source.url}:`, err.message);
    }
  }
  
  const total = Object.values(newsByLang).reduce((sum, arr) => sum + arr.length, 0);
  console.log(`Total: ${total} news items`);
  return newsByLang;
}

function generateMarkdown(newsItems, lang) {
  const date = new Date().toISOString().split('T')[0];
  
  const titles = {
    zh: `${date}全球大事`,
    en: `Major Global Events on ${date}`,
    ja: `${date}世界重要ニュース`,
    ko: `${date} 세계 중요 뉴스`,
    de: `Wichtige globale Ereignisse am ${date}`,
  };
  
  let content = `---
date: "${date}"
title: "${titles[lang]}"
description: "Daily global events summary - ${newsItems.length} news items"
source: "Google News RSS"
---

`;
  
  for (let i = 0; i < newsItems.length; i++) {
    const item = newsItems[i];
    content += `${i + 1}. **${item.title}**\n`;
    if (item.summary) {
      content += `   ${item.summary}\n`;
    }
    content += '\n';
  }
  
  return content;
}

async function main() {
  const newsByLang = await fetchNews();
  
  for (const lang of LANGUAGES) {
    const dir = path.join(NEWS_DIR, `news-${lang}`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const date = new Date().toISOString().split('T')[0];
    const filePath = path.join(dir, `${date}.md`);
    
    const items = newsByLang[lang] || [];
    if (items.length > 0) {
      const content = generateMarkdown(items, lang);
      fs.writeFileSync(filePath, content);
      console.log(`Created: ${filePath} (${items.length} items)`);
    } else {
      console.log(`No items for ${lang}, skipping`);
    }
  }
  
  console.log('Done!');
}

main().catch(console.error);