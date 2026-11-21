import React, { useEffect, useRef, useState } from 'react';
import {
  DEFAULT_LAZY_ROOT_MARGIN,
  DEFAULT_LAZY_THRESHOLD,
  TRANSPARENT_PLACEHOLDER_SRC,
  createLazyObserverOptions,
  resolveActiveImageSources,
  resolveLazyImageState,
  shouldLoadImmediately,
} from '../../utils/lazyImage';

export interface UseLazyInViewOptions {
  priority?: boolean;
  rootMargin?: string;
  threshold?: number;
}

/**
 * Observes a DOM element with IntersectionObserver and flips to `true` once
 * the element enters (or approaches within `rootMargin` of) the viewport.
 * SSR- and hydration-safe: initial state depends solely on `priority`.
 */
export function useLazyInView<T extends Element>(
  ref: React.RefObject<T | null>,
  {
    priority = false,
    rootMargin = DEFAULT_LAZY_ROOT_MARGIN,
    threshold = DEFAULT_LAZY_THRESHOLD,
  }: UseLazyInViewOptions = {}
): boolean {
  const [isInView, setIsInView] = useState<boolean>(priority);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const supportsIO =
      typeof window !== 'undefined' && typeof window.IntersectionObserver === 'function';

    if (shouldLoadImmediately({ priority, supportsIntersectionObserver: supportsIO })) {
      setIsInView(true);
      return;
    }

    const target = ref.current;
    if (!target) return;

    const observer = new window.IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setIsInView(true);
          observer.disconnect();
          break;
        }
      }
    }, createLazyObserverOptions(rootMargin, threshold));

    observer.observe(target);
    return () => observer.disconnect();
  }, [ref, priority, rootMargin, threshold]);

  return isInView;
}

export interface LazyImageWrapperProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'loading' | 'decoding'> {
  src: string;
  fallbackSrc?: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  priority?: boolean;
  rootMargin?: string;
  threshold?: number;
  placeholderColor?: string;
}

/**
 * Site-wide IntersectionObserver-based lazy-loading image wrapper.
 * Withholds high-resolution `src` and `srcSet` until the image nears the viewport,
 * preserving exact layout dimensions and dominant-colour backing for zero CLS.
 */
export const LazyImageWrapper: React.FC<LazyImageWrapperProps> = ({
  src,
  fallbackSrc,
  srcSet,
  sizes = '100vw',
  alt,
  priority = false,
  rootMargin = DEFAULT_LAZY_ROOT_MARGIN,
  threshold = DEFAULT_LAZY_THRESHOLD,
  placeholderColor,
  className = '',
  style,
  onLoad,
  onError,
  referrerPolicy = 'no-referrer',
  ...rest
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const isInView = useLazyInView(imgRef, { priority, rootMargin, threshold });
  const [loaded, setLoaded] = useState<boolean>(priority);
  const [useFallback, setUseFallback] = useState<boolean>(false);

  const effectiveSrc = useFallback && fallbackSrc ? fallbackSrc : src;
  const effectiveSrcSet = useFallback ? undefined : srcSet;
  const shouldLoad = priority || isInView;

  useEffect(() => {
    setUseFallback(false);
    if (priority) {
      setLoaded(true);
      return;
    }
    if (!isInView) {
      setLoaded(false);
      return;
    }
    const el = imgRef.current;
    if (
      el &&
      el.complete &&
      el.naturalWidth > 0 &&
      el.currentSrc !== TRANSPARENT_PLACEHOLDER_SRC &&
      el.getAttribute('src') !== TRANSPARENT_PLACEHOLDER_SRC
    ) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [effectiveSrc, priority, isInView]);

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    if (!shouldLoad) return;
    if (!priority) {
      setLoaded(true);
    }
    onLoad?.(e);
  };

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    if (!shouldLoad) return;
    if (!useFallback && fallbackSrc && fallbackSrc !== src) {
      setUseFallback(true);
      return;
    }
    setLoaded(true);
    onError?.(e);
  };

  const activeSources = resolveActiveImageSources({
    shouldLoad,
    src: effectiveSrc,
    srcSet: effectiveSrcSet,
    sizes,
  });

  const lazyState = resolveLazyImageState({
    isInView: shouldLoad,
    isLoaded: loaded,
    priority,
  });

  const mergedStyle: React.CSSProperties | undefined =
    placeholderColor || style
      ? {
          ...(placeholderColor ? { backgroundColor: placeholderColor } : {}),
          ...style,
        }
      : undefined;

  const fadeClasses = priority ? '' : `smart-img-fade ${loaded ? 'smart-img-loaded' : ''}`;

  return (
    <img
      ref={imgRef}
      src={activeSources.src}
      srcSet={activeSources.srcSet}
      sizes={activeSources.sizes}
      data-lazy-state={lazyState}
      data-src={shouldLoad ? undefined : effectiveSrc}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      referrerPolicy={referrerPolicy}
      onLoad={handleLoad}
      onError={handleError}
      style={mergedStyle}
      className={`${fadeClasses} ${className}`.trim()}
      {...rest}
    />
  );
};
