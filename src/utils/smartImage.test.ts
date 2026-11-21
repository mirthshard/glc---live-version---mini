import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveSmartImage, resolveThumbnailUrl, ImageManifest } from './smartImage';

const SAMPLE_MANIFEST: ImageManifest = {
  '/assets/aistudio/hero.jpg': {
    w: 1600,
    h: 900,
    color: 'rgb(18,22,30)',
    variants: [
      { url: '/img/hero-abc12345-480.webp', w: 480 },
      { url: '/img/hero-abc12345-960.webp', w: 960 },
      { url: '/img/hero-abc12345-1440.webp', w: 1440 },
    ],
  },
  '/assets/aistudio/tglc_crest_transparent.png': {
    w: 512,
    h: 512,
    color: 'rgb(180,140,60)',
    variants: [{ url: '/img/tglc-crest-transparent-11223344-480.webp', w: 480 }],
  },
};

test('resolveSmartImage returns largest variant, srcSet, dimensions and dominant colour', () => {
  const resolved = resolveSmartImage('/assets/aistudio/hero.jpg', SAMPLE_MANIFEST);
  assert.equal(resolved.src, '/img/hero-abc12345-1440.webp');
  assert.equal(
    resolved.srcSet,
    '/img/hero-abc12345-480.webp 480w, /img/hero-abc12345-960.webp 960w, /img/hero-abc12345-1440.webp 1440w'
  );
  assert.equal(resolved.width, 1600);
  assert.equal(resolved.height, 900);
  assert.equal(resolved.backgroundColor, 'rgb(18,22,30)');
});

test('resolveSmartImage caps variants with maxWidth for fast mega-menu thumbnails', () => {
  const resolved = resolveSmartImage('/assets/aistudio/hero.jpg', SAMPLE_MANIFEST, 640);
  assert.equal(resolved.src, '/img/hero-abc12345-480.webp');
  assert.equal(resolved.srcSet, '/img/hero-abc12345-480.webp 480w');
});

test('resolveThumbnailUrl returns compact <= 640w variant URL for preloading', () => {
  assert.equal(
    resolveThumbnailUrl('/assets/aistudio/hero.jpg', SAMPLE_MANIFEST, 640),
    '/img/hero-abc12345-480.webp'
  );
  assert.equal(
    resolveThumbnailUrl('/assets/aistudio/unknown.jpg', SAMPLE_MANIFEST, 640),
    '/assets/aistudio/unknown.jpg'
  );
});

test('resolveSmartImage omits opaque background colour for transparent crest assets', () => {
  const resolved = resolveSmartImage('/assets/aistudio/tglc_crest_transparent.png', SAMPLE_MANIFEST);
  assert.equal(resolved.src, '/img/tglc-crest-transparent-11223344-480.webp');
  assert.equal(resolved.backgroundColor, undefined);
});

test('resolveSmartImage falls back cleanly when manifest is missing or key is absent', () => {
  const missingManifest = resolveSmartImage('/assets/aistudio/hero.jpg', undefined);
  assert.deepEqual(missingManifest, { src: '/assets/aistudio/hero.jpg' });

  const unknownKey = resolveSmartImage('/assets/aistudio/unknown.jpg', SAMPLE_MANIFEST);
  assert.deepEqual(unknownKey, { src: '/assets/aistudio/unknown.jpg' });
});
