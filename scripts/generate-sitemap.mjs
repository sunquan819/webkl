import { writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';

const SITE = 'https://webkl.gitlab.io';
const distDir = resolve('dist');

function walkDir(dir) {
  let results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = walkDir(distDir);

const urls = htmlFiles
  .map(f => {
    let path = f.replace(distDir, '').replace(/\\/g, '/').replace('/index.html', '/').replace('.html', '/');
    if (!path.endsWith('/')) path += '/';
    return { loc: `${SITE}${path}`, lastmod: new Date().toISOString().split('T')[0] };
  })
  .filter(u => !u.loc.includes('/404/'));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync(resolve(distDir, 'sitemap.xml'), xml);
console.log(`Sitemap generated with ${urls.length} URLs`);
