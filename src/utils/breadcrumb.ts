import { SERVICES_DATA, JOURNAL_ARTICLES } from '../data/tglcData';
import { RouteState, PageRoute } from '../types';

export interface BreadcrumbItem {
  label: string;
  route?: PageRoute;
  params?: {
    serviceId?: string;
    subServiceId?: string;
    articleSlug?: string;
  };
  isCurrent?: boolean;
}

export interface BackLinkInfo {
  label: string;
  route: PageRoute;
  params?: {
    serviceId?: string;
    subServiceId?: string;
    articleSlug?: string;
  };
}

/**
 * Returns breadcrumb items for a given route state.
 * Returns null if the page should not display breadcrumbs (e.g. home page).
 */
export function getBreadcrumbsForRoute(route: RouteState): BreadcrumbItem[] | null {
  const { page, serviceId, subServiceId, articleSlug } = route;

  // Home has no breadcrumbs
  if (page === 'home') {
    return null;
  }

  // 1. Services sub-pages
  if (page === 'subservice-detail' && serviceId && subServiceId) {
    const parent = SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0];
    const sub = parent.subServices.find((s) => s.id === subServiceId) || parent.subServices[0];
    return [
      { label: 'Home', route: 'home' },
      { label: 'Services', route: 'services' },
      { label: parent.title, route: 'service-detail', params: { serviceId: parent.id } },
      { label: sub.title, isCurrent: true }
    ];
  }

  if (page === 'service-detail' && serviceId) {
    const parent = SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0];
    return [
      { label: 'Home', route: 'home' },
      { label: 'Services', route: 'services' },
      { label: parent.title, isCurrent: true }
    ];
  }

  if (page === 'services') {
    return [
      { label: 'Home', route: 'home' },
      { label: 'Services Directory', isCurrent: true }
    ];
  }

  // 2. Journal sub-pages
  if (page === 'journal-article' && articleSlug) {
    const article = JOURNAL_ARTICLES.find((a) => a.slug === articleSlug) || JOURNAL_ARTICLES[0];
    return [
      { label: 'Home', route: 'home' },
      { label: 'Journal', route: 'journal' },
      { label: article.category, isCurrent: false, route: 'journal' },
      { label: article.title, isCurrent: true }
    ];
  }

  if (page === 'journal') {
    return [
      { label: 'Home', route: 'home' },
      { label: 'Journal', isCurrent: true }
    ];
  }

  if (page === 'commission-studio') {
    return [
      { label: 'Home', route: 'home' },
      { label: 'Commission Studio', isCurrent: true }
    ];
  }

  if (page === 'case-studies') {
    return [
      { label: 'Home', route: 'home' },
      { label: 'Signature Experiences', isCurrent: true }
    ];
  }

  if (page === 'cultural-traditions') {
    return [
      { label: 'Home', route: 'home' },
      { label: 'The Consortium', route: 'consortium' },
      { label: 'Cultural & Global Traditions', isCurrent: true }
    ];
  }

  if (page === 'hidden-london') {
    return [
      { label: 'Home', route: 'home' },
      { label: 'Hidden London', isCurrent: true }
    ];
  }

  const hiddenLondonMap: Partial<Record<PageRoute, string>> = {
    'hidden-london-subterranean': 'Underground Rooms',
    'hidden-london-industrial': 'Architecture & Design Spaces',
    'hidden-london-combat': 'Fight Nights',
    'hidden-london-gaming': 'Casino Nights',
    'hidden-london-maritime': 'Thames After Dark',
    'hidden-london-gastronomy': 'Supper Clubs & Late-Night Dining',
    'hidden-london-exploration': 'Rooftops & Rare Views',
    'hidden-london-after-hours': 'Jazz & Cocktail Bars',
    'hidden-london-urban-clubs': 'Late-Night Clubs & Vinyl Rooms',
    'hidden-london-itinerary': '24 Hours in London'
  };

  if (hiddenLondonMap[page]) {
    return [
      { label: 'Home', route: 'home' },
      { label: 'Hidden London', route: 'hidden-london' },
      { label: hiddenLondonMap[page]!, isCurrent: true }
    ];
  }

  // Fallback for other known pages if needed
  return null;
}

/**
 * Returns optional quick back link info for breadcrumb bar.
 */
export function getBackLinkForRoute(route: RouteState): BackLinkInfo | null {
  const { page, serviceId } = route;

  if (page === 'subservice-detail' && serviceId) {
    const parent = SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0];
    return {
      label: `Back to ${parent.title}`,
      route: 'service-detail',
      params: { serviceId: parent.id }
    };
  }

  if (page === 'service-detail') {
    return {
      label: 'Back to Services Directory',
      route: 'services'
    };
  }

  if (page === 'journal-article') {
    return {
      label: 'Return to Journal',
      route: 'journal'
    };
  }

  if (
    page === 'hidden-london-subterranean' ||
    page === 'hidden-london-industrial' ||
    page === 'hidden-london-combat' ||
    page === 'hidden-london-gaming' ||
    page === 'hidden-london-maritime' ||
    page === 'hidden-london-gastronomy' ||
    page === 'hidden-london-exploration' ||
    page === 'hidden-london-after-hours' ||
    page === 'hidden-london-urban-clubs' ||
    page === 'hidden-london-itinerary'
  ) {
    return {
      label: 'Return to Hidden London',
      route: 'hidden-london'
    };
  }

  if (page === 'cultural-traditions') {
    return {
      label: 'Back to The Consortium',
      route: 'consortium'
    };
  }

  if (page === 'services' || page === 'journal' || page === 'commission-studio') {
    return {
      label: 'Return to Home',
      route: 'home'
    };
  }

  return null;
}
