import { readFileSync, writeFileSync } from 'node:fs';

const MANIFEST_PATH = 'product/seo/generated/programmatic-pages-v2.json';
const SITEMAP_PATH = 'public/sitemap.xml';
const BASE_URL = 'https://flowdockr.com';
const LASTMOD = '2026-03-04T00:00:00+00:00';

const STATIC_ROUTES = [
  '/',
  '/scope',
  '/deal',
  '/pricing',
  '/guides',
  '/negotiation',
  '/pricing/playbooks',
  '/client-communication',
  '/proposals',
  '/objections-handling',
  '/email-scripts',
  '/tools',
  '/rate-increase',
];

function escapeXml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function toUrlNode(route) {
  const url = `${BASE_URL}${route}`;
  return `  <url>\n    <loc>${escapeXml(url)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n  </url>`;
}

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
const dynamicRoutes = (manifest.pages || []).map((item) => item.route);
const routes = [...new Set([...STATIC_ROUTES, ...dynamicRoutes])].sort();

const xml = [
  "<?xml version='1.0' encoding='utf-8' standalone='yes'?>",
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(toUrlNode),
  '</urlset>',
  '',
].join('\n');

writeFileSync(SITEMAP_PATH, xml);
console.log(`Generated v2 sitemap with ${routes.length} URLs.`);
