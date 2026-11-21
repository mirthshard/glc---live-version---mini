import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_LAZY_ROOT_MARGIN,
  DEFAULT_LAZY_THRESHOLD,
  TRANSPARENT_PLACEHOLDER_SRC,
  createLazyObserverOptions,
  resolveActiveImageSources,
  resolveLazyImageState,
  shouldLoadImmediately,
} from './lazyImage';

test('shouldLoadImmediately bypasses observer for priority images and unsupported environments', () => {
  assert.equal(shouldLoadImmediately({ priority: true, supportsIntersectionObserver: true }), true);
  assert.equal(shouldLoadImmediately({ priority: false, supportsIntersectionObserver: true }), false);
  assert.equal(shouldLoadImmediately({ priority: false, supportsIntersectionObserver: false }), true);
});

test('resolveLazyImageState transitions cleanly from deferred -> loading -> loaded', () => {
  assert.equal(resolveLazyImageState({ isInView: false, isLoaded: false, priority: false }), 'deferred');
  assert.equal(resolveLazyImageState({ isInView: true, isLoaded: false, priority: false }), 'loading');
  assert.equal(resolveLazyImageState({ isInView: true, isLoaded: true, priority: false }), 'loaded');
  assert.equal(resolveLazyImageState({ isInView: false, isLoaded: false, priority: true }), 'loaded');
});

test('createLazyObserverOptions clamps invalid thresholds and preserves custom rootMargin', () => {
  assert.deepEqual(createLazyObserverOptions(), {
    root: null,
    rootMargin: DEFAULT_LAZY_ROOT_MARGIN,
    threshold: DEFAULT_LAZY_THRESHOLD,
  });

  assert.deepEqual(createLazyObserverOptions('320px 0px', 0.25), {
    root: null,
    rootMargin: '320px 0px',
    threshold: 0.25,
  });

  assert.deepEqual(createLazyObserverOptions('   ', 5), {
    root: null,
    rootMargin: DEFAULT_LAZY_ROOT_MARGIN,
    threshold: 1,
  });

  assert.deepEqual(createLazyObserverOptions('100px', -2), {
    root: null,
    rootMargin: '100px',
    threshold: 0,
  });
});

test('resolveActiveImageSources withholds real src/srcSet until shouldLoad is true', () => {
  const deferred = resolveActiveImageSources({
    shouldLoad: false,
    src: '/img/sample-1440.webp',
    srcSet: '/img/sample-480.webp 480w, /img/sample-1440.webp 1440w',
    sizes: '100vw',
  });
  assert.equal(deferred.src, TRANSPARENT_PLACEHOLDER_SRC);
  assert.equal(deferred.srcSet, undefined);
  assert.equal(deferred.sizes, undefined);

  const active = resolveActiveImageSources({
    shouldLoad: true,
    src: '/img/sample-1440.webp',
    srcSet: '/img/sample-480.webp 480w, /img/sample-1440.webp 1440w',
    sizes: '(max-width: 768px) 100vw, 50vw',
  });
  assert.equal(active.src, '/img/sample-1440.webp');
  assert.equal(active.srcSet, '/img/sample-480.webp 480w, /img/sample-1440.webp 1440w');
  assert.equal(active.sizes, '(max-width: 768px) 100vw, 50vw');

  const noSrcSet = resolveActiveImageSources({
    shouldLoad: true,
    src: '/assets/aistudio/photo.jpg',
    sizes: '100vw',
  });
  assert.equal(noSrcSet.src, '/assets/aistudio/photo.jpg');
  assert.equal(noSrcSet.sizes, undefined);
});
