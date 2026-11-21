import { JOURNAL_ARTICLES, SERVICES_DATA } from '../data/tglcData';
import { STATIC_ROUTE_PATHS, parsePath, pathFor } from '../routing/routes';
import { ImageManifest, resolveSmartImage } from '../utils/smartImage';
import { getImageManifest } from '../utils/imageManifest';
import {
  CANONICAL_ORIGIN,
  HOME_HERO_IMAGE,
  getPageMeta,
  resolveAbsoluteImageUrl,
} from './meta';

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function getAllRoutes(): string[] {
  const routes = new Set<string>();

  for (const staticPath of Object.values(STATIC_ROUTE_PATHS)) {
    if (staticPath) {
      routes.add(staticPath);
    }
  }

  for (const category of SERVICES_DATA) {
    routes.add(pathFor('service-detail', { serviceId: category.id }));
    for (const sub of category.subServices) {
      routes.add(pathFor('subservice-detail', { serviceId: category.id, subServiceId: sub.id }));
    }
  }

  for (const article of JOURNAL_ARTICLES) {
    routes.add(pathFor('journal-article', { articleSlug: article.slug }));
  }

  routes.add('/404');

  return Array.from(routes);
}

export function getHeadTags(rawPath: string, manifest?: ImageManifest): string {
  const activeManifest = manifest ?? getImageManifest();
  const route = parsePath(rawPath);
  const meta = getPageMeta(route, activeManifest);
  const ogImage = resolveAbsoluteImageUrl(meta.image, activeManifest);
  const ogType = meta.ogType ?? 'website';
  const robots = meta.noindex ? 'noindex, follow' : 'index, follow';

  const lines: string[] = [
    `<title>${escapeHtmlText(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtmlAttr(meta.description)}" />`,
    `<link rel="canonical" href="${escapeHtmlAttr(meta.canonical)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:title" content="${escapeHtmlAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtmlAttr(meta.description)}" />`,
    `<meta property="og:url" content="${escapeHtmlAttr(meta.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtmlAttr(ogImage)}" />`,
    `<meta property="og:site_name" content="The Global Luxury Consortium" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtmlAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtmlAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtmlAttr(ogImage)}" />`,
  ];

  if (route.page === 'home') {
    const heroResolved = resolveSmartImage(HOME_HERO_IMAGE, activeManifest);
    if (heroResolved.srcSet) {
      lines.push(
        `<link rel="preload" as="image" href="${escapeHtmlAttr(heroResolved.src)}" imagesrcset="${escapeHtmlAttr(heroResolved.srcSet)}" imagesizes="100vw" fetchpriority="high" />`
      );
    } else {
      lines.push(
        `<link rel="preload" as="image" href="${escapeHtmlAttr(heroResolved.src)}" fetchpriority="high" />`
      );
    }
  }

  for (const schema of meta.jsonLd) {
    const json = JSON.stringify(schema).replace(/</g, '\\u003c');
    lines.push(`<script type="application/ld+json">${json}</script>`);
  }

  return lines.join('\n    ');
}

export function renderSitemapXml(lastmod?: string): string {
  const date = lastmod ?? new Date().toISOString().slice(0, 10);
  const indexable = getAllRoutes().filter((url) => url !== '/members/' && url !== '/404');

  const urlEntries = indexable
    .map(
      (url) =>
        `  <url>\n    <loc>${escapeHtmlText(`${CANONICAL_ORIGIN}${url}`)}</loc>\n    <lastmod>${escapeHtmlText(date)}</lastmod>\n  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
}
