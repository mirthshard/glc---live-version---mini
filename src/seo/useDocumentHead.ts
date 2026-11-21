import { useEffect } from 'react';
import { RouteState } from '../types';
import { getPageMeta, resolveAbsoluteImageUrl } from './meta';

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string): void {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useDocumentHead(route: RouteState): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const meta = getPageMeta(route);
    const ogImage = resolveAbsoluteImageUrl(meta.image);
    const ogType = meta.ogType ?? 'website';
    const robots = meta.noindex ? 'noindex, follow' : 'index, follow';

    document.title = meta.title;

    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'robots', robots);

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', meta.canonical);

    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', meta.canonical);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:site_name', 'The Global Luxury Consortium');
    upsertMeta('property', 'og:locale', 'en_GB');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', ogImage);
  }, [route.page, route.serviceId, route.subServiceId, route.articleSlug]);
}
