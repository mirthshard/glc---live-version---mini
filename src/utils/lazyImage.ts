export type LazyImageState = 'deferred' | 'loading' | 'loaded';

export const DEFAULT_LAZY_ROOT_MARGIN = '200px 0px';
export const DEFAULT_LAZY_THRESHOLD = 0.01;

/**
 * 1x1 transparent GIF placeholder used while an image is deferred outside the viewport.
 * Prevents broken-image icons and network fetches while preserving layout dimensions.
 */
export const TRANSPARENT_PLACEHOLDER_SRC =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export interface LazyActivationOptions {
  priority?: boolean;
  supportsIntersectionObserver: boolean;
}

/**
 * Determines whether an image should bypass IntersectionObserver deferral
 * and activate its real source immediately.
 */
export function shouldLoadImmediately({
  priority = false,
  supportsIntersectionObserver,
}: LazyActivationOptions): boolean {
  if (priority) return true;
  return !supportsIntersectionObserver;
}

/**
 * Computes the deterministic lifecycle state of a lazy-loaded image.
 */
export function resolveLazyImageState(params: {
  isInView: boolean;
  isLoaded: boolean;
  priority?: boolean;
}): LazyImageState {
  if (params.priority || params.isLoaded) return 'loaded';
  if (params.isInView) return 'loading';
  return 'deferred';
}

/**
 * Normalizes IntersectionObserver options with safe bounds for smooth pre-fetching.
 */
export function createLazyObserverOptions(
  rootMargin: string = DEFAULT_LAZY_ROOT_MARGIN,
  threshold: number = DEFAULT_LAZY_THRESHOLD
): IntersectionObserverInit {
  const safeMargin = rootMargin.trim() || DEFAULT_LAZY_ROOT_MARGIN;
  const clampedThreshold = Number.isFinite(threshold)
    ? Math.min(1, Math.max(0, threshold))
    : DEFAULT_LAZY_THRESHOLD;

  return {
    root: null,
    rootMargin: safeMargin,
    threshold: clampedThreshold,
  };
}

/**
 * Selects the active `src` and `srcSet` attributes based on whether the image has entered the viewport.
 */
export function resolveActiveImageSources(params: {
  shouldLoad: boolean;
  src: string;
  srcSet?: string;
  sizes?: string;
}): {
  src: string;
  srcSet?: string;
  sizes?: string;
} {
  if (!params.shouldLoad) {
    return {
      src: TRANSPARENT_PLACEHOLDER_SRC,
      srcSet: undefined,
      sizes: undefined,
    };
  }

  return {
    src: params.src,
    srcSet: params.srcSet,
    sizes: params.srcSet ? params.sizes : undefined,
  };
}
