export type PageRoute =
  | 'home'
  | 'consortium'
  | 'consortium-concierge'
  | 'about'
  | 'ethos'
  | 'approach'
  | 'network'
  | 'our-london'
  | 'privacy-discretion'
  | 'cultural-traditions'
  | 'services'
  | 'service-detail' // requires serviceId
  | 'subservice-detail' // requires serviceId & subServiceId
  | 'membership'
  | 'commission-studio' // Interactive Lifestyle Commission & Itinerary Studio
  | 'case-studies' // Curated Portfolio of 20+ Signature Itineraries & Case Studies
  | 'calendar'
  | 'journal'
  | 'journal-article' // requires articleSlug
  | 'member-portal'
  | 'contact'
  | 'faq'
  | 'hidden-london'
  | 'hidden-london-subterranean'
  | 'hidden-london-industrial'
  | 'hidden-london-combat'
  | 'hidden-london-gaming'
  | 'hidden-london-maritime'
  | 'hidden-london-gastronomy'
  | 'hidden-london-exploration'
  | 'hidden-london-after-hours'
  | 'hidden-london-urban-clubs'
  | 'hidden-london-itinerary'
  | 'privacy-policy'
  | 'terms'
  | 'cookie-policy'
  | 'accessibility'
  | 'image-credits'
  | 'sitemap'
  | 'not-found';

export type SearchCategoryType = 'all' | 'services' | 'journal' | 'calendar' | 'consortium';

export interface GlobalSearchResult {
  id: string;
  category: 'services' | 'journal' | 'calendar' | 'consortium';
  categoryLabel: string;
  title: string;
  subtitle: string;
  snippet: string;
  meta: string;
  targetRoute: PageRoute;
  routeParams?: {
    serviceId?: string;
    subServiceId?: string;
    articleSlug?: string;
  };
}

export interface RouteState {
  page: PageRoute;
  serviceId?: string;
  subServiceId?: string;
  articleSlug?: string;
  categoryFilter?: string;
  subSection?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  title: string;
  bio: string;
  specialism: string;
  location: string;
  origin?: string;
  initials?: string;
  image?: string;
}

export interface SubService {
  id: string;
  title: string;
  shortDesc: string;
  leadParagraph: string;
  detailedPoints: string[];
  example?: string;
  image: string;
  galleryImages?: { image: string; caption: string }[];
  faqs?: { q: string; a: string }[];
  regulatoryNote?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  tagline: string;
  shortDesc: string;
  highlights: string[];
  heroImage: string;
  galleryImages: string[];
  galleryCaptions?: string[];
  subServices: SubService[];
  faqs: { question: string; answer: string }[];
  regulatoryNote?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  month: string;
  category: 'Art & Culture' | 'Dining' | 'Fashion' | 'Music' | 'Sport' | 'Seasonal';
  description: string;
  image: string;
}

export interface JournalArticle {
  slug: string;
  title: string;
  subtitle: string;
  category:
    | 'London Intelligence'
    | 'Travel Notes'
    | 'The Cultural Edit'
    | 'Dining & Entertaining'
    | 'Private Residences'
    | 'Objects of Desire';
  author: string;
  excerpt: string;
  metaDescription: string;
  relatedServiceId: string;
  relatedServiceLabel: string;
  heroImage: string;
  contentParagraphs: string[];
  editorialImages?: string[];
  editorialCaptions?: string[];
  subheadings?: { title: string; paragraphs: string[] }[];
}

export interface FAQItem {
  id: string;
  category:
    | 'General'
    | 'Membership'
    | 'Services & Scope'
    | 'Discretion & Privacy'
    | 'International'
    | 'Family & Private Office'
    | 'Admissions';
  question: string;
  answer: string;
}
