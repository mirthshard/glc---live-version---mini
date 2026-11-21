import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePath, pathFor, LEGACY_HASH_MAP, resolveLegacyHash, STATIC_ROUTE_PATHS } from '../routing/routes';
import { SERVICES_DATA, JOURNAL_ARTICLES } from '../data/tglcData';
import { PageRoute } from '../types';

test('pathFor and parsePath round-trip every static route', () => {
  for (const [page, expectedPath] of Object.entries(STATIC_ROUTE_PATHS)) {
    const computed = pathFor(page as PageRoute);
    assert.equal(computed, expectedPath, `pathFor(${page}) should match ${expectedPath}`);
    assert.ok(computed.endsWith('/'), `pathFor(${page}) must end with trailing slash`);

    const parsed = parsePath(computed);
    assert.equal(parsed.page, page, `parsePath(${computed}) should return ${page}`);

    // Also normalise without trailing slash and mixed case
    if (computed !== '/') {
      const noSlash = computed.slice(0, -1).toUpperCase();
      assert.equal(parsePath(noSlash).page, page, `parsePath(${noSlash}) should normalise to ${page}`);
    }
  }
});

test('pathFor and parsePath round-trip every service and sub-service', () => {
  for (const service of SERVICES_DATA) {
    const servicePath = pathFor('service-detail', { serviceId: service.id });
    assert.equal(servicePath, `/services/${service.id}/`);
    assert.deepEqual(parsePath(servicePath), { page: 'service-detail', serviceId: service.id });
    assert.deepEqual(parsePath(`/services/${service.id}`), { page: 'service-detail', serviceId: service.id });

    for (const sub of service.subServices) {
      const subPath = pathFor('subservice-detail', { serviceId: service.id, subServiceId: sub.id });
      assert.equal(subPath, `/services/${service.id}/${sub.id}/`);
      assert.deepEqual(parsePath(subPath), {
        page: 'subservice-detail',
        serviceId: service.id,
        subServiceId: sub.id,
      });
    }
  }
});

test('pathFor and parsePath round-trip every journal article', () => {
  for (const article of JOURNAL_ARTICLES) {
    const articlePath = pathFor('journal-article', { articleSlug: article.slug });
    assert.equal(articlePath, `/journal/${article.slug}/`);
    assert.deepEqual(parsePath(articlePath), { page: 'journal-article', articleSlug: article.slug });
  }
});

test('parsePath returns not-found for unknown paths and invalid dynamic IDs', () => {
  assert.deepEqual(parsePath('/does-not-exist/'), { page: 'not-found' });
  assert.deepEqual(parsePath('/services/unknown-service/'), { page: 'not-found' });
  assert.deepEqual(parsePath('/services/travel-aviation/unknown-sub/'), { page: 'not-found' });
  assert.deepEqual(parsePath('/journal/nonexistent-slug/'), { page: 'not-found' });
  assert.deepEqual(parsePath('/services/travel-aviation/private-aviation/extra/'), { page: 'not-found' });
});

test('LEGACY_HASH_MAP and resolveLegacyHash map old hashes to canonical paths', () => {
  assert.equal(LEGACY_HASH_MAP['the-consortium'], '/the-consortium/');
  assert.equal(LEGACY_HASH_MAP['privacy'], '/the-consortium/discretion/');
  assert.equal(LEGACY_HASH_MAP['studio'], '/commission-studio/');
  assert.equal(LEGACY_HASH_MAP['itineraries'], '/signature-experiences/');
  assert.equal(LEGACY_HASH_MAP['portfolio'], '/signature-experiences/');
  assert.equal(LEGACY_HASH_MAP['portal'], '/members/');
  assert.equal(LEGACY_HASH_MAP['sub-rosa'], '/hidden-london/');
  assert.equal(LEGACY_HASH_MAP['sub-rosa/combat'], '/hidden-london/fight-nights/');

  assert.equal(resolveLegacyHash('#portal'), '/members/');
  assert.equal(resolveLegacyHash('#sub-rosa/combat'), '/hidden-london/fight-nights/');
  assert.equal(resolveLegacyHash('#service/travel-aviation'), '/services/travel-aviation/');
  assert.equal(
    resolveLegacyHash('#service/travel-aviation/private-aviation'),
    '/services/travel-aviation/private-aviation/'
  );

  const firstArticle = JOURNAL_ARTICLES[0];
  assert.equal(resolveLegacyHash(`#article/${firstArticle.slug}`), `/journal/${firstArticle.slug}/`);
});

test('resolveLegacyHash ignores plain in-page section anchors', () => {
  assert.equal(resolveLegacyHash('#section-services'), null);
  assert.equal(resolveLegacyHash('#section-pillars'), null);
  assert.equal(resolveLegacyHash('#top'), null);
  assert.equal(resolveLegacyHash(''), null);
});
