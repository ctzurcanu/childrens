const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const config = require('../docusaurus.config')();
const root = path.resolve(__dirname, '../build');
const origin = new URL(config.baseUrl, config.url).href;
const decode = value => value.replace(/&amp;/g, '&');
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));
const tags = (head, name) => [...head.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(([tag]) => attrs(tag));
const pages = new Map();
function inspect(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { inspect(file); continue; }
    if (!file.endsWith('.html')) continue;
    const html = fs.readFileSync(file, 'utf8');
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    const relative = path.relative(root, file).split(path.sep).join('/');
    const url = origin + relative.replace(/index\.html$/, '');
    const meta = tags(head, 'meta');
    const getMeta = name => meta.filter(m => m.name === name || m.property === name);
    const links = tags(head, 'link');
    const noindex = getMeta('robots').some(m => m.content.includes('noindex'));
    if (relative.endsWith('404.html')) {
      assert(noindex, `${relative}: 404 must not be indexed`);
      continue;
    }
    assert.equal(tags(head, 'title').length, 1, `${relative}: one title`);
    const canonical = links.filter(l => l.rel === 'canonical');
    assert.equal(canonical.length, 1, `${relative}: one canonical`);
    assert.equal(canonical[0].href, url, `${relative}: production canonical`);
    assert.equal(getMeta('description').length, 1, `${relative}: one description`);
    assert(getMeta('description')[0].content.length >= 70, `${relative}: descriptive snippet`);
    assert.equal(getMeta('robots').length, 1, `${relative}: unambiguous robots`);
    for (const name of ['og:image', 'twitter:image']) {
      const image = getMeta(name)[0]?.content;
      assert(image?.startsWith(origin), `${relative}: absolute image with base path`);
      assert(fs.existsSync(path.join(root, image.slice(origin.length))), `${relative}: image exists`);
    }
    for (const [, json] of head.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      const data = JSON.parse(json);
      assert.equal(data['@context'], 'https://schema.org');
      if (data['@type'] === 'WebSite') assert.equal(data.url, url);
    }
    pages.set(url, {noindex, links, description: getMeta('description')[0].content});
  }
}
inspect(root);
const listed = new Set();
for (const prefix of ['', 'fr/']) {
  const sitemap = fs.readFileSync(path.join(root, prefix, 'sitemap.xml'), 'utf8');
  for (const [, loc] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
    const url = decode(loc);
    assert(pages.has(url), `Sitemap URL has a generated page: ${url}`);
    assert(!pages.get(url).noindex, `Sitemap excludes noindex: ${url}`);
    listed.add(url);
  }
}
const descriptions = new Set();
for (const [url, page] of pages) {
  assert.equal(listed.has(url), !page.noindex, `${url}: sitemap matches indexability`);
  if (!page.noindex) {
    assert(!descriptions.has(page.description), `${url}: unique description`);
    descriptions.add(page.description);
  }
  for (const link of page.links.filter(l => l.rel === 'alternate' && l.hreflang)) {
    assert(pages.has(link.href), `${url}: language alternate exists`);
    assert(!pages.get(link.href).noindex, `${url}: language alternate is indexable`);
    if (!page.noindex) assert(pages.get(link.href).links.some(l => l.rel === 'alternate' && l.href === url), `${url}: reciprocal language links`);
  }
}
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
for (const prefix of ['', 'fr/']) assert(robots.includes(`Sitemap: ${origin}${prefix}sitemap.xml`));
console.log(`SEO checks passed: ${pages.size} pages, ${listed.size} indexable URLs; canonical URLs, descriptions, language links, structured data, images, robots, and sitemaps.`);
