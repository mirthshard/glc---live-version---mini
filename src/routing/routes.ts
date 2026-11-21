import { PageRoute, RouteState } from '../types';
import { SERVICES_DATA, JOURNAL_ARTICLES } from '../data/tglcData';

export const STATIC_ROUTE_PATHS: Partial<Record<PageRoute, string>> = {
  home: '/',
  consortium: '/the-consortium/',
  'consortium-concierge': '/the-consortium/concierge/',
  about: '/the-consortium/about/',
  ethos: '/the-consortium/ethos/',
  approach: '/the-consortium/approach/',
  network: '/the-consortium/network/',
  'our-london': '/the-consortium/london/',
  'privacy-discretion': '/the-consortium/discretion/',
  'cultural-traditions': '/cultural-traditions/',
  services: '/services/',
  membership: '/membership/',
  'commission-studio': '/commission-studio/',
  'case-studies': '/signature-experiences/',
  'member-portal': '/members/',
  calendar: '/calendar/',
  journal: '/journal/',
  contact: '/contact/',
  faq: '/faq/',
  'hidden-london': '/hidden-london/',
  'hidden-london-subterranean': '/hidden-london/underground/',
  'hidden-london-industrial': '/hidden-london/architecture/',
  'hidden-london-combat': '/hidden-london/fight-nights/',
  'hidden-london-gaming': '/hidden-london/casino-nights/',
  'hidden-london-maritime': '/hidden-london/thames-after-dark/',
  'hidden-london-gastronomy': '/hidden-london/supper-clubs/',
  'hidden-london-exploration': '/hidden-london/rooftops/',
  'hidden-london-after-hours': '/hidden-london/jazz/',
  'hidden-london-urban-clubs': '/hidden-london/club-nights/',
  'hidden-london-itinerary': '/hidden-london/24-hours/',
  'privacy-policy': '/privacy-policy/',
  terms: '/terms/',
  'cookie-policy': '/cookie-policy/',
  accessibility: '/accessibility/',
  'image-credits': '/image-credits/',
  sitemap: '/sitemap/',
};

const PATH_TO_STATIC_ROUTE: Record<string, PageRoute> = Object.entries(STATIC_ROUTE_PATHS).reduce(
  (acc, [page, path]) => {
    if (path) {
      acc[path] = page as PageRoute;
    }
    return acc;
  },
  {} as Record<string, PageRoute>
);

export const LEGACY_HASH_MAP: Record<string, string> = {
  home: '/',
  'the-consortium': '/the-consortium/',
  consortium: '/the-consortium/',
  concierge: '/the-consortium/concierge/',
  'consortium-concierge': '/the-consortium/concierge/',
  about: '/the-consortium/about/',
  ethos: '/the-consortium/ethos/',
  approach: '/the-consortium/approach/',
  network: '/the-consortium/network/',
  'our-london': '/the-consortium/london/',
  'privacy-discretion': '/the-consortium/discretion/',
  privacy: '/the-consortium/discretion/',
  'cultural-traditions': '/cultural-traditions/',
  culture: '/cultural-traditions/',
  'islamic-hospitality': '/cultural-traditions/',
  halal: '/cultural-traditions/',
  traditions: '/cultural-traditions/',
  services: '/services/',
  membership: '/membership/',
  'commission-studio': '/commission-studio/',
  studio: '/commission-studio/',
  'case-studies': '/signature-experiences/',
  itineraries: '/signature-experiences/',
  portfolio: '/signature-experiences/',
  calendar: '/calendar/',
  journal: '/journal/',
  'member-portal': '/members/',
  portal: '/members/',
  members: '/members/',
  'hidden-london': '/hidden-london/',
  'sub-rosa': '/hidden-london/',
  'hidden-london-subterranean': '/hidden-london/underground/',
  'sub-rosa/subterranean': '/hidden-london/underground/',
  'hidden-london-industrial': '/hidden-london/architecture/',
  'sub-rosa/industrial': '/hidden-london/architecture/',
  'hidden-london-combat': '/hidden-london/fight-nights/',
  'sub-rosa/combat': '/hidden-london/fight-nights/',
  'hidden-london-gaming': '/hidden-london/casino-nights/',
  'sub-rosa/gaming': '/hidden-london/casino-nights/',
  'hidden-london-maritime': '/hidden-london/thames-after-dark/',
  'sub-rosa/maritime': '/hidden-london/thames-after-dark/',
  'hidden-london-gastronomy': '/hidden-london/supper-clubs/',
  'sub-rosa/gastronomy': '/hidden-london/supper-clubs/',
  'hidden-london-exploration': '/hidden-london/rooftops/',
  'sub-rosa/exploration': '/hidden-london/rooftops/',
  'hidden-london-after-hours': '/hidden-london/jazz/',
  'sub-rosa/after-hours': '/hidden-london/jazz/',
  'hidden-london-urban-clubs': '/hidden-london/club-nights/',
  'sub-rosa/urban-clubs': '/hidden-london/club-nights/',
  'hidden-london-itinerary': '/hidden-london/24-hours/',
  'sub-rosa/itinerary': '/hidden-london/24-hours/',
  contact: '/contact/',
  faq: '/faq/',
  'privacy-policy': '/privacy-policy/',
  terms: '/terms/',
  'cookie-policy': '/cookie-policy/',
  accessibility: '/accessibility/',
  'image-credits': '/image-credits/',
  sitemap: '/sitemap/',
};

function normalisePathname(rawPath: string): string {
  const withoutHash = rawPath.split('#')[0] || '';
  const withoutQuery = withoutHash.split('?')[0] || '';
  let clean = withoutQuery.trim().toLowerCase();
  if (!clean.startsWith('/')) {
    clean = `/${clean}`;
  }
  clean = clean.replace(/\/+/g, '/');
  if (clean !== '/' && !clean.endsWith('/')) {
    clean = `${clean}/`;
  }
  return clean;
}

export function parsePath(pathname: string): RouteState {
  const normalised = normalisePathname(pathname);

  const staticPage = PATH_TO_STATIC_ROUTE[normalised];
  if (staticPage) {
    return { page: staticPage };
  }

  // Dynamic service routes: /services/{serviceId}/ and /services/{serviceId}/{subServiceId}/
  if (normalised.startsWith('/services/')) {
    const segments = normalised.slice('/services/'.length, -1).split('/').filter(Boolean);
    if (segments.length === 1) {
      const [serviceId] = segments;
      const service = SERVICES_DATA.find((s) => s.id.toLowerCase() === serviceId);
      if (service) {
        return { page: 'service-detail', serviceId: service.id };
      }
      return { page: 'not-found' };
    }
    if (segments.length === 2) {
      const [serviceId, subServiceId] = segments;
      const service = SERVICES_DATA.find((s) => s.id.toLowerCase() === serviceId);
      const subService = service?.subServices.find((sub) => sub.id.toLowerCase() === subServiceId);
      if (service && subService) {
        return { page: 'subservice-detail', serviceId: service.id, subServiceId: subService.id };
      }
      return { page: 'not-found' };
    }
    return { page: 'not-found' };
  }

  // Dynamic journal article route: /journal/{articleSlug}/
  if (normalised.startsWith('/journal/')) {
    const segments = normalised.slice('/journal/'.length, -1).split('/').filter(Boolean);
    if (segments.length === 1) {
      const [slug] = segments;
      const article = JOURNAL_ARTICLES.find((a) => a.slug.toLowerCase() === slug);
      if (article) {
        return { page: 'journal-article', articleSlug: article.slug };
      }
    }
    return { page: 'not-found' };
  }

  return { page: 'not-found' };
}

export function pathFor(page: PageRoute, params?: Partial<Omit<RouteState, 'page'>>): string {
  if (page === 'service-detail') {
    if (params?.serviceId) {
      return `/services/${params.serviceId.toLowerCase()}/`;
    }
    return '/services/';
  }

  if (page === 'subservice-detail') {
    if (params?.serviceId && params?.subServiceId) {
      return `/services/${params.serviceId.toLowerCase()}/${params.subServiceId.toLowerCase()}/`;
    }
    if (params?.serviceId) {
      return `/services/${params.serviceId.toLowerCase()}/`;
    }
    return '/services/';
  }

  if (page === 'journal-article') {
    if (params?.articleSlug) {
      return `/journal/${params.articleSlug.toLowerCase()}/`;
    }
    return '/journal/';
  }

  if (page === 'not-found') {
    return '/not-found/';
  }

  return STATIC_ROUTE_PATHS[page] ?? '/';
}

/**
 * Resolves a legacy hash (e.g. "#service/travel-aviation", "#studio", "#portal")
 * to its new canonical path. Returns null for plain in-page anchors (e.g. "#section-services").
 */
export function resolveLegacyHash(rawHash: string): string | null {
  const clean = rawHash.replace(/^#/, '').replace(/^\/+/, '').replace(/\/+$/, '').trim().toLowerCase();
  if (!clean) {
    return null;
  }

  if (LEGACY_HASH_MAP[clean]) {
    return LEGACY_HASH_MAP[clean];
  }

  if (clean.startsWith('service/')) {
    const parts = clean.slice('service/'.length).split('/').filter(Boolean);
    if (parts.length === 1) {
      const candidate = `/services/${parts[0]}/`;
      return parsePath(candidate).page === 'service-detail' ? candidate : null;
    }
    if (parts.length === 2) {
      const candidate = `/services/${parts[0]}/${parts[1]}/`;
      return parsePath(candidate).page === 'subservice-detail' ? candidate : null;
    }
    return null;
  }

  if (clean.startsWith('article/')) {
    const slug = clean.slice('article/'.length).replace(/\/+$/, '');
    if (slug && !slug.includes('/')) {
      const candidate = `/journal/${slug}/`;
      return parsePath(candidate).page === 'journal-article' ? candidate : null;
    }
    return null;
  }

  return null;
}
