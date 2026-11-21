import { PageRoute, RouteState } from '../types';
import { FAQS_DATA, JOURNAL_ARTICLES, SERVICES_DATA, TGLC_CONTACT } from '../data/tglcData';
import { pathFor } from '../routing/routes';
import { ImageManifest, resolveSmartImage } from '../utils/smartImage';
import { getImageManifest } from '../utils/imageManifest';

export const CANONICAL_ORIGIN = 'https://thegloballuxuryconsortium.co.uk';
export const ORG_ID = `${CANONICAL_ORIGIN}/#organization`;
export const WEBSITE_ID = `${CANONICAL_ORIGIN}/#website`;
export const DEFAULT_OG_IMAGE = '/img/og-default.jpg';
export const HOME_HERO_IMAGE = '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp';
const CREST_SOURCE_IMAGE = '/assets/aistudio/tglc_crest_transparent.png';
const INSTAGRAM_URL = 'https://www.instagram.com/thegloballuxuryconsortium/';

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  canonical: string;
  image?: string;
  noindex?: boolean;
  ogType?: 'website' | 'article';
  jsonLd: Record<string, unknown>[];
}

const SHORT_CATEGORY_TITLE: Record<string, string> = {
  'travel-aviation': 'Travel & Aviation',
  'dining-nightlife': 'Dining & Nightlife',
  'experiences-culture': 'Experiences & Culture',
  'residences-relocation': 'Residences & Relocation',
  'transport-security': 'Transport & Security',
  'personal-private-office': 'Personal & Private Office',
  'luxury-sourcing': 'Luxury Sourcing',
};

const COMPACT_CATEGORY_TITLE: Record<string, string> = {
  'travel-aviation': 'Travel',
  'dining-nightlife': 'Dining',
  'experiences-culture': 'Culture',
  'residences-relocation': 'Residences',
  'transport-security': 'Transport',
  'personal-private-office': 'Private Office',
  'luxury-sourcing': 'Sourcing',
};

interface StaticPageMetaEntry {
  title: string;
  description: string;
  breadcrumbLabel: string;
  parent?: { label: string; route: PageRoute };
  image?: string;
  noindex?: boolean;
}

const STATIC_META: Partial<Record<PageRoute, StaticPageMetaEntry>> = {
  home: {
    title: 'Luxury Concierge & Lifestyle Management in London | TGLC',
    description:
      'Private concierge and lifestyle management from Mayfair, London. Travel, dining, events, homes and hard-to-find requests, handled discreetly.',
    breadcrumbLabel: 'Home',
    image: DEFAULT_OG_IMAGE,
  },
  consortium: {
    title: 'About The Global Luxury Consortium | Mayfair Concierge',
    description:
      'Meet The Global Luxury Consortium in Mayfair, London. Discover how our private concierge team looks after travel, dining, events and daily life.',
    breadcrumbLabel: 'The Consortium',
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
  },
  'consortium-concierge': {
    title: '24/7 Bespoke Concierge for UHNW Clients | TGLC',
    description:
      'Round-the-clock bespoke concierge from Mayfair for ultra-high-net-worth individuals: private aviation, estates, rare sourcing and global family support.',
    breadcrumbLabel: '24/7 Concierge',
    parent: { label: 'The Consortium', route: 'consortium' },
    image: '/assets/aistudio/private_jet_interior_suite.jpg',
  },
  about: {
    title: 'About Our Mayfair Concierge Team | TGLC',
    description:
      'Meet the team behind The Global Luxury Consortium at 45 Albemarle Street, Mayfair. Personal concierge and lifestyle support for London and abroad.',
    breadcrumbLabel: 'About TGLC',
    parent: { label: 'The Consortium', route: 'consortium' },
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
  },
  ethos: {
    title: 'Our Ethos: Discreet Personal Concierge | TGLC',
    description:
      'How The Global Luxury Consortium works: discretion first, honest guidance and long-term relationships built from our Mayfair office in London.',
    breadcrumbLabel: 'Our Ethos',
    parent: { label: 'The Consortium', route: 'consortium' },
    image: '/assets/aistudio/bond_street_jewellery.jpg',
  },
  approach: {
    title: 'How Our Concierge Service Works | TGLC',
    description:
      'One dedicated lifestyle manager from first conversation to finished plan. See how our Mayfair concierge team arranges travel, dining and events.',
    breadcrumbLabel: 'Our Approach',
    parent: { label: 'The Consortium', route: 'consortium' },
    image: '/assets/aistudio/corporate_ea_boardroom.jpg',
  },
  network: {
    title: 'Our London & Global Network | TGLC',
    description:
      'Built on personal relationships across Mayfair, London and key international destinations. Ask how our concierge team can help with your plans.',
    breadcrumbLabel: 'Our Network',
    parent: { label: 'The Consortium', route: 'consortium' },
    image: '/assets/aistudio/private_jet_interior_suite.jpg',
  },
  'our-london': {
    title: 'Our London: Mayfair, St James’s & Belgravia | TGLC',
    description:
      'Explore the London neighbourhoods we know best — Mayfair, St James’s, Knightsbridge and Belgravia — guided from our office on Albemarle Street.',
    breadcrumbLabel: 'Our London',
    parent: { label: 'The Consortium', route: 'consortium' },
    image: '/assets/aistudio/five_star_mayfair_suite.jpg',
  },
  'privacy-discretion': {
    title: 'Privacy & Discretion Standards | TGLC',
    description:
      'Your plans stay private with TGLC. We share only what is needed to make bookings happen and never use client names or stories for publicity.',
    breadcrumbLabel: 'Privacy & Discretion',
    parent: { label: 'The Consortium', route: 'consortium' },
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
  },
  'cultural-traditions': {
    title: 'Islamic, Halal & Cultural Hospitality in London | TGLC',
    description:
      'Private Mayfair concierge catering thoughtfully to Islamic and Muslim traditions, halal dining, Ramadan, family privacy and all global cultures.',
    breadcrumbLabel: 'Cultural & Global Traditions',
    parent: { label: 'The Consortium', route: 'consortium' },
    image: '/assets/aistudio/cultural_iftar_mayfair_salon.jpg',
  },
  services: {
    title: 'Concierge Services in London: Travel, Dining & More | TGLC',
    description:
      'Explore seven private concierge services from our Mayfair team: travel, dining, events, residences, chauffeurs, private office and sourcing.',
    breadcrumbLabel: 'Services',
    image: '/assets/aistudio/private_jet_interior_suite.jpg',
  },
  membership: {
    title: 'Private Concierge Membership in London | TGLC',
    description:
      'Private concierge membership by introduction from our Mayfair office. One dedicated lifestyle manager for your household, with terms shared privately.',
    breadcrumbLabel: 'Membership',
    image: '/assets/aistudio/five_star_mayfair_suite.jpg',
  },
  'hidden-london': {
    title: 'Hidden London Experiences & Nights Out | TGLC',
    description:
      'Discover the side of London most visitors never see. Private dining rooms, historic cellars, Thames evenings and live music, subject to availability.',
    breadcrumbLabel: 'Hidden London',
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
  },
  'hidden-london-subterranean': {
    title: 'Underground Rooms in London | Hidden London | TGLC',
    description:
      'Historic stone vaults, wine cellars and quiet underground rooms across London that TGLC can help arrange for private dinners, subject to availability.',
    breadcrumbLabel: 'Underground Rooms',
    parent: { label: 'Hidden London', route: 'hidden-london' },
    image: '/assets/aistudio/subterranean_vault_dining.jpg',
  },
  'hidden-london-industrial': {
    title: 'Architecture Spaces in London | Hidden London | TGLC',
    description:
      'Modernist flats, gallery lofts and private studios across London that TGLC can help arrange for viewings and gatherings, subject to availability.',
    breadcrumbLabel: 'Architecture & Design Spaces',
    parent: { label: 'Hidden London', route: 'hidden-london' },
    image: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
  },
  'hidden-london-combat': {
    title: 'Fight Nights in London | Hidden London | TGLC',
    description:
      'Ringside seats at licensed boxing and MMA nights plus private training sessions with qualified coaches in London, arranged subject to availability.',
    breadcrumbLabel: 'Fight Nights',
    parent: { label: 'Hidden London', route: 'hidden-london' },
    image: '/assets/aistudio/wembley_vip_hospitality.jpg',
  },
  'hidden-london-gaming': {
    title: 'Casino Nights in London | Hidden London | TGLC',
    description:
      'Private tables and quiet salons at licensed London casinos and card rooms, arranged discreetly by our Mayfair team, subject to availability.',
    breadcrumbLabel: 'Casino Nights',
    parent: { label: 'Hidden London', route: 'hidden-london' },
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
  },
  'hidden-london-maritime': {
    title: 'Thames After Dark | Hidden London | TGLC',
    description:
      'Private evening boat cruises along the Thames with licensed skippers, riverside dining and return cars arranged by TGLC, subject to availability.',
    breadcrumbLabel: 'Thames After Dark',
    parent: { label: 'Hidden London', route: 'hidden-london' },
    image: '/assets/aistudio/thames_night_charter.jpg',
  },
  'hidden-london-gastronomy': {
    title: 'Supper Clubs in London | Hidden London | TGLC',
    description:
      'Private chef counters, quiet dining rooms and late-night cocktail bars across London that our Mayfair team can help arrange, subject to availability.',
    breadcrumbLabel: 'Supper Clubs & Late-Night Dining',
    parent: { label: 'Hidden London', route: 'hidden-london' },
    image: '/assets/aistudio/mayfair_fine_dining.jpg',
  },
  'hidden-london-exploration': {
    title: 'Rooftop Views in London | Hidden London | TGLC',
    description:
      'Private skyline terraces, heritage landmarks and licensed architectural visits across London arranged by our Mayfair team, subject to availability.',
    breadcrumbLabel: 'Rooftops & Rare Views',
    parent: { label: 'Hidden London', route: 'hidden-london' },
    image: '/assets/aistudio/five_star_mayfair_suite.jpg',
  },
  'hidden-london-after-hours': {
    title: 'Jazz & Cocktail Bars in London | Hidden London | TGLC',
    description:
      'Intimate Soho jazz cellars, listening rooms and late-night cocktail bars across London arranged by our Mayfair team, subject to availability.',
    breadcrumbLabel: 'Jazz & Cocktail Bars',
    parent: { label: 'Hidden London', route: 'hidden-london' },
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
  },
  'hidden-london-urban-clubs': {
    title: 'Late-Night Clubs in London | Hidden London | TGLC',
    description:
      'Vinyl listening rooms, private loft gatherings and late-night DJ nights across London arranged with licensed venues, subject to availability.',
    breadcrumbLabel: 'Club Nights',
    parent: { label: 'Hidden London', route: 'hidden-london' },
    image: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
  },
  'hidden-london-itinerary': {
    title: '24 Hours in London | Hidden London | TGLC',
    description:
      'A full day and night in London planned around your tastes, from quiet morning appointments to dinner, music and riverside views, subject to availability.',
    breadcrumbLabel: '24 Hours in London',
    parent: { label: 'Hidden London', route: 'hidden-london' },
    image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
  },
  'case-studies': {
    title: 'Signature Luxury Experiences in London & Beyond | TGLC',
    description:
      'Examples of what our Mayfair concierge team can help arrange across travel, culture, sport, dining and celebrations, subject to availability.',
    breadcrumbLabel: 'Signature Experiences',
    image: '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
  },
  calendar: {
    title: 'London Social Season Calendar & Hospitality | TGLC',
    description:
      'Key dates in the London and international social calendar. Ask our Mayfair team to help arrange tickets, hospitality and travel, subject to availability.',
    breadcrumbLabel: 'The Season',
    image: '/assets/aistudio/wembley_vip_hospitality.jpg',
  },
  journal: {
    title: 'The Journal: London Living, Travel & Culture | TGLC',
    description:
      'Practical guides and notes from our Mayfair team on London neighbourhoods, private dining, travel planning, residences, tailoring and fine watches.',
    breadcrumbLabel: 'Journal',
    image: '/assets/aistudio/savile_row_bespoke.jpg',
  },
  'commission-studio': {
    title: 'Plan Your Experience | TGLC Commission Studio',
    description:
      'Outline your London visit, celebration or international trip in our Commission Studio and send your brief directly to our Mayfair concierge team.',
    breadcrumbLabel: 'Commission Studio',
    image: '/assets/aistudio/corporate_ea_boardroom.jpg',
  },
  contact: {
    title: 'Contact Our Mayfair Concierge Team | TGLC',
    description:
      'Contact The Global Luxury Consortium at 45 Albemarle Street, Mayfair, London. Call 020 3951 6369 or send a private enquiry to arrange an introduction.',
    breadcrumbLabel: 'Contact',
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
  },
  faq: {
    title: 'Concierge Membership FAQs | TGLC',
    description:
      'Straightforward answers about TGLC concierge membership, how our Mayfair team works, household coverage, international travel and client privacy.',
    breadcrumbLabel: 'FAQ',
    image: '/assets/aistudio/savile_row_bespoke.jpg',
  },
  'member-portal': {
    title: 'Members | TGLC',
    description:
      'Direct contact details for existing members of The Global Luxury Consortium in Mayfair, London. Reach your lifestyle manager by phone or email.',
    breadcrumbLabel: 'Members',
    noindex: true,
  },
  'privacy-policy': {
    title: 'Privacy Policy | TGLC',
    description:
      'Read the Privacy Policy for The Global Luxury Consortium Ltd in Mayfair, London, explaining how we handle personal details under UK data protection law.',
    breadcrumbLabel: 'Privacy Policy',
  },
  terms: {
    title: 'Terms & Conditions | TGLC',
    description:
      'Read the Terms and Conditions for The Global Luxury Consortium Ltd, registered in England and Wales at 45 Albemarle Street, Mayfair, London.',
    breadcrumbLabel: 'Terms & Conditions',
  },
  'cookie-policy': {
    title: 'Cookie Policy | TGLC',
    description:
      'Details of the essential cookies used on The Global Luxury Consortium website to keep pages and forms working cleanly without intrusive tracking.',
    breadcrumbLabel: 'Cookie Policy',
  },
  accessibility: {
    title: 'Accessibility Statement | TGLC',
    description:
      'Accessibility information for The Global Luxury Consortium website, including contrast, keyboard navigation, reduced motion and how to report issues.',
    breadcrumbLabel: 'Accessibility',
  },
  'image-credits': {
    title: 'Image Credits & Disclaimers | TGLC',
    description:
      'Photography attribution and non-endorsement disclaimers for imagery shown across The Global Luxury Consortium website and editorial journal.',
    breadcrumbLabel: 'Image Credits',
  },
  sitemap: {
    title: 'Sitemap | TGLC',
    description:
      'Complete directory of pages across The Global Luxury Consortium website, including Mayfair concierge services, Hidden London guides and the Journal.',
    breadcrumbLabel: 'Sitemap',
  },
  'not-found': {
    title: 'Page not found | TGLC',
    description:
      'The page you were looking for could not be found. Return to The Global Luxury Consortium homepage or explore our Mayfair concierge services.',
    breadcrumbLabel: 'Page Not Found',
    noindex: true,
  },
};

function trimToMaxLength(text: string, maxLen: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  const sliced = clean.slice(0, maxLen - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  const base = (lastSpace > maxLen * 0.6 ? sliced.slice(0, lastSpace) : sliced).replace(/[,;:\-—\s]+$/, '');
  return base.endsWith('.') ? base : `${base}.`;
}

function fitDescription(raw: string, minLen = 140, maxLen = 155): string {
  const clean = raw.replace(/\s+/g, ' ').trim();
  if (clean.length >= minLen && clean.length <= maxLen) {
    return clean;
  }
  if (clean.length > maxLen) {
    return trimToMaxLength(clean, maxLen);
  }
  const suffix = clean.endsWith('.')
    ? ' Arranged discreetly by our Mayfair private concierge team for members across London and worldwide.'
    : '. Arranged discreetly by our Mayfair private concierge team for members across London and worldwide.';
  return trimToMaxLength(`${clean}${suffix}`, maxLen);
}

function fitTitle(main: string, suffix: string, maxLen = 60): string {
  const candidate = `${main}${suffix}`;
  if (candidate.length <= maxLen) return candidate;
  const budget = maxLen - suffix.length;
  if (budget <= 12) return trimToMaxLength(main, maxLen);
  const sliced = main.slice(0, budget);
  const lastSpace = sliced.lastIndexOf(' ');
  const trimmedMain = (lastSpace > budget * 0.55 ? sliced.slice(0, lastSpace) : sliced).replace(/[:;,\-—\s]+$/, '');
  return `${trimmedMain}${suffix}`;
}

export function resolveAbsoluteImageUrl(src: string | undefined, manifest?: ImageManifest): string {
  const activeManifest = manifest ?? getImageManifest();
  if (!src) {
    return `${CANONICAL_ORIGIN}${DEFAULT_OG_IMAGE}`;
  }
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  if (src.startsWith('/img/')) {
    return `${CANONICAL_ORIGIN}${src}`;
  }
  const resolved = resolveSmartImage(src, activeManifest);
  if (resolved.src.startsWith('/img/')) {
    return `${CANONICAL_ORIGIN}${resolved.src}`;
  }
  return `${CANONICAL_ORIGIN}${DEFAULT_OG_IMAGE}`;
}

function buildBreadcrumbSchema(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${CANONICAL_ORIGIN}${item.path}`,
    })),
  };
}

function buildHomeJsonLd(manifest?: ImageManifest): Record<string, unknown>[] {
  const logoUrl = resolveAbsoluteImageUrl(CREST_SOURCE_IMAGE, manifest);
  const imageUrl = `${CANONICAL_ORIGIN}${DEFAULT_OG_IMAGE}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'ProfessionalService'],
      '@id': ORG_ID,
      name: 'The Global Luxury Consortium',
      alternateName: 'TGLC',
      url: `${CANONICAL_ORIGIN}/`,
      logo: logoUrl,
      image: imageUrl,
      telephone: '+44 20 3951 6369',
      email: TGLC_CONTACT.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3rd Floor, 45 Albemarle Street',
        addressLocality: 'London',
        postalCode: 'W1S 4JL',
        addressCountry: 'GB',
      },
      areaServed: 'London',
      sameAs: [INSTAGRAM_URL],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: 'The Global Luxury Consortium',
      url: `${CANONICAL_ORIGIN}/`,
      publisher: { '@id': ORG_ID },
    },
  ];
}

export function getPageMeta(route: RouteState, manifest?: ImageManifest): PageMeta {
  const activeManifest = manifest ?? getImageManifest();

  if (route.page === 'not-found') {
    const entry = STATIC_META['not-found']!;
    return {
      title: entry.title,
      description: entry.description,
      path: '/404',
      canonical: `${CANONICAL_ORIGIN}/404`,
      image: DEFAULT_OG_IMAGE,
      noindex: true,
      ogType: 'website',
      jsonLd: [],
    };
  }

  const path = pathFor(route.page, {
    serviceId: route.serviceId,
    subServiceId: route.subServiceId,
    articleSlug: route.articleSlug,
  });
  const canonical = `${CANONICAL_ORIGIN}${path}`;

  if (route.page === 'home') {
    const entry = STATIC_META.home!;
    return {
      title: entry.title,
      description: entry.description,
      path,
      canonical,
      image: DEFAULT_OG_IMAGE,
      ogType: 'website',
      jsonLd: buildHomeJsonLd(activeManifest),
    };
  }

  if (route.page === 'service-detail' && route.serviceId) {
    const cat = SERVICES_DATA.find((c) => c.id === route.serviceId);
    if (cat) {
      const shortCat = SHORT_CATEGORY_TITLE[cat.id] ?? cat.title;
      const title = fitTitle(`${shortCat} Concierge in London`, ' | TGLC', 60);
      const description = fitDescription(cat.shortDesc, 140, 155);
      const breadcrumb = buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services/' },
        { name: cat.title, path },
      ]);
      const serviceSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: cat.title,
        description,
        url: canonical,
        provider: { '@id': ORG_ID },
        areaServed: 'London',
      };
      return {
        title,
        description,
        path,
        canonical,
        image: cat.heroImage,
        ogType: 'website',
        jsonLd: [breadcrumb, serviceSchema],
      };
    }
  }

  if (route.page === 'subservice-detail' && route.serviceId && route.subServiceId) {
    const cat = SERVICES_DATA.find((c) => c.id === route.serviceId);
    const sub = cat?.subServices.find((s) => s.id === route.subServiceId);
    if (cat && sub) {
      const shortCat = SHORT_CATEGORY_TITLE[cat.id] ?? cat.title;
      const compactCat = COMPACT_CATEGORY_TITLE[cat.id] ?? shortCat;
      const fullCandidate = `${sub.title} | ${shortCat} | TGLC`;
      const compactCandidate = `${sub.title} | ${compactCat} | TGLC`;
      const title =
        fullCandidate.length <= 60
          ? fullCandidate
          : compactCandidate.length <= 60
            ? compactCandidate
            : fitTitle(sub.title, ' | TGLC', 60);
      const description = fitDescription(sub.leadParagraph, 140, 155);
      const parentPath = pathFor('service-detail', { serviceId: cat.id });
      const breadcrumb = buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services/' },
        { name: cat.title, path: parentPath },
        { name: sub.title, path },
      ]);
      const serviceSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: sub.title,
        serviceType: cat.title,
        description,
        url: canonical,
        provider: { '@id': ORG_ID },
        areaServed: 'London',
      };
      return {
        title,
        description,
        path,
        canonical,
        image: sub.image,
        ogType: 'website',
        jsonLd: [breadcrumb, serviceSchema],
      };
    }
  }

  if (route.page === 'journal-article' && route.articleSlug) {
    const article = JOURNAL_ARTICLES.find((a) => a.slug === route.articleSlug);
    if (article) {
      const title = fitTitle(article.title, ' | TGLC Journal', 60);
      const description = fitDescription(article.metaDescription, 140, 155);
      const articleImageUrl = resolveAbsoluteImageUrl(article.heroImage, activeManifest);
      const logoUrl = resolveAbsoluteImageUrl(CREST_SOURCE_IMAGE, activeManifest);
      const breadcrumb = buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Journal', path: '/journal/' },
        { name: article.title, path },
      ]);
      const articleSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description,
        image: articleImageUrl,
        mainEntityOfPage: canonical,
        author: {
          '@type': 'Organization',
          '@id': ORG_ID,
          name: 'The Global Luxury Consortium',
          url: `${CANONICAL_ORIGIN}/`,
        },
        publisher: {
          '@type': 'Organization',
          '@id': ORG_ID,
          name: 'The Global Luxury Consortium',
          url: `${CANONICAL_ORIGIN}/`,
          logo: {
            '@type': 'ImageObject',
            url: logoUrl,
          },
        },
      };
      return {
        title,
        description,
        path,
        canonical,
        image: article.heroImage,
        ogType: 'article',
        jsonLd: [breadcrumb, articleSchema],
      };
    }
  }

  const staticEntry = STATIC_META[route.page] ?? STATIC_META.home!;
  const breadcrumbItems: { name: string; path: string }[] = [{ name: 'Home', path: '/' }];
  if (staticEntry.parent) {
    breadcrumbItems.push({
      name: staticEntry.parent.label,
      path: pathFor(staticEntry.parent.route),
    });
  }
  breadcrumbItems.push({ name: staticEntry.breadcrumbLabel, path });

  const jsonLd: Record<string, unknown>[] = [buildBreadcrumbSchema(breadcrumbItems)];

  if (route.page === 'faq') {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS_DATA.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return {
    title: staticEntry.title,
    description: staticEntry.description,
    path,
    canonical,
    image: staticEntry.image ?? DEFAULT_OG_IMAGE,
    noindex: staticEntry.noindex,
    ogType: 'website',
    jsonLd,
  };
}
