import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { getAllRoutes, getHeadTags, renderSitemapXml } from '../seo/head';
import { CANONICAL_ORIGIN, getPageMeta } from '../seo/meta';
import { parsePath } from '../routing/routes';
import { FAQS_DATA, JOURNAL_ARTICLES, SERVICES_DATA } from '../data/tglcData';
import type { ImageManifest } from './smartImage';

const manifest: ImageManifest = JSON.parse(
  fs.readFileSync('src/data/imageManifest.json', 'utf8')
);

test('getAllRoutes includes every static route, service, sub-service, article, and /404', () => {
  const routes = getAllRoutes();
  assert.ok(routes.includes('/'));
  assert.ok(routes.includes('/services/'));
  assert.ok(routes.includes('/members/'));
  assert.ok(routes.includes('/faq/'));
  assert.ok(routes.includes('/404'));

  for (const cat of SERVICES_DATA) {
    assert.ok(routes.includes(`/services/${cat.id}/`), `Missing /services/${cat.id}/`);
    for (const sub of cat.subServices) {
      assert.ok(
        routes.includes(`/services/${cat.id}/${sub.id}/`),
        `Missing /services/${cat.id}/${sub.id}/`
      );
    }
  }

  for (const article of JOURNAL_ARTICLES) {
    assert.ok(routes.includes(`/journal/${article.slug}/`), `Missing /journal/${article.slug}/`);
  }

  assert.equal(routes.length, new Set(routes).size, 'Routes must be unique');
});

test('every route has concise title (<= 60 chars), 140-155 char description, and valid JSON-LD', () => {
  for (const url of getAllRoutes()) {
    const route = parsePath(url);
    const meta = getPageMeta(route, manifest);

    assert.ok(
      meta.title.length > 0 && meta.title.length <= 60,
      `Title too long (${meta.title.length}) for ${url}: "${meta.title}"`
    );
    assert.ok(
      meta.description.length >= 140 && meta.description.length <= 155,
      `Description out of range (${meta.description.length}) for ${url}: "${meta.description}"`
    );
    assert.ok(meta.canonical.startsWith(CANONICAL_ORIGIN), `Invalid canonical for ${url}`);

    const jsonText = JSON.stringify(meta.jsonLd);
    assert.ok(!jsonText.includes('AggregateRating'), `AggregateRating forbidden on ${url}`);
    assert.ok(!jsonText.includes('"@type":"Review"'), `Review schema forbidden on ${url}`);

    if (url === '/') {
      const types = meta.jsonLd.flatMap((s) => (Array.isArray(s['@type']) ? s['@type'] : [s['@type']]));
      assert.ok(types.includes('Organization'));
      assert.ok(types.includes('ProfessionalService'));
      assert.ok(types.includes('WebSite'));
      assert.ok(!types.includes('BreadcrumbList'), 'Home must not emit BreadcrumbList');
    } else if (url === '/404') {
      assert.equal(meta.noindex, true);
    } else {
      const types = meta.jsonLd.flatMap((s) => (Array.isArray(s['@type']) ? s['@type'] : [s['@type']]));
      assert.ok(types.includes('BreadcrumbList'), `Missing BreadcrumbList on ${url}`);
    }

    if (url === '/members/') {
      assert.equal(meta.noindex, true);
    }

    if (route.page === 'service-detail' || route.page === 'subservice-detail') {
      const types = meta.jsonLd.map((s) => s['@type']);
      assert.ok(types.includes('Service'), `Missing Service schema on ${url}`);
    }

    if (route.page === 'journal-article') {
      const types = meta.jsonLd.map((s) => s['@type']);
      assert.ok(types.includes('Article'), `Missing Article schema on ${url}`);
    }

    if (url === '/faq/') {
      const faqSchema = meta.jsonLd.find((s) => s['@type'] === 'FAQPage') as
        | { mainEntity: unknown[] }
        | undefined;
      assert.ok(faqSchema, 'Missing FAQPage schema on /faq/');
      assert.equal(faqSchema.mainEntity.length, FAQS_DATA.length);
    }
  }
});

test('getHeadTags emits OG, Twitter, robots, JSON-LD, and hero preload on /', () => {
  const homeHead = getHeadTags('/', manifest);
  assert.ok(homeHead.includes('<title>Luxury Concierge &amp; Lifestyle Management in London | TGLC</title>'));
  assert.ok(homeHead.includes('<link rel="canonical" href="https://thegloballuxuryconsortium.co.uk/" />'));
  assert.ok(homeHead.includes('<meta property="og:locale" content="en_GB" />'));
  assert.ok(homeHead.includes('<meta name="twitter:card" content="summary_large_image" />'));
  assert.ok(homeHead.includes('<link rel="preload" as="image"'));
  assert.ok(homeHead.includes('imagesrcset="/img/rolls-cullian-featured-'));
  assert.ok(homeHead.includes('fetchpriority="high"'));
  assert.ok(homeHead.includes('<script type="application/ld+json">'));

  const membersHead = getHeadTags('/members/', manifest);
  assert.ok(membersHead.includes('<meta name="robots" content="noindex, follow" />'));

  const notFoundHead = getHeadTags('/404', manifest);
  assert.ok(notFoundHead.includes('<title>Page not found | TGLC</title>'));
  assert.ok(notFoundHead.includes('<meta name="robots" content="noindex, follow" />'));
});

test('renderSitemapXml includes indexable routes and excludes /members/ and /404', () => {
  const xml = renderSitemapXml('2026-11-20');
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes('<loc>https://thegloballuxuryconsortium.co.uk/</loc>'));
  assert.ok(xml.includes('<lastmod>2026-11-20</lastmod>'));
  assert.ok(xml.includes('<loc>https://thegloballuxuryconsortium.co.uk/services/travel-aviation/private-aviation/</loc>'));
  assert.ok(!xml.includes('/members/</loc>'));
  assert.ok(!xml.includes('/404</loc>'));
});
