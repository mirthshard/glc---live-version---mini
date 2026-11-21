import { SERVICES_DATA, CALENDAR_EVENTS, JOURNAL_ARTICLES, LONDON_NEIGHBOURHOODS, TEAM_MEMBERS } from '../data/tglcData';
import { HIDDEN_LONDON_SECTIONS } from '../components/access/HiddenLondonPage';
import { SIGNATURE_EXPERIENCES } from '../components/casestudies/CaseStudiesPage';
import { GlobalSearchResult, SearchCategoryType, PageRoute } from '../types';

interface IndexItem {
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
  keywords: string[];
  searchableContent: string;
}

// Build index once
const buildSearchIndex = (): IndexItem[] => {
  const items: IndexItem[] = [];

  // 1. Service Categories
  for (const cat of SERVICES_DATA) {
    items.push({
      id: `service-cat-${cat.id}`,
      category: 'services',
      categoryLabel: 'Service',
      title: cat.title,
      subtitle: cat.tagline,
      snippet: cat.shortDesc,
      meta: `Services · ${cat.title}`,
      targetRoute: 'service-detail',
      routeParams: { serviceId: cat.id },
      keywords: [cat.title, cat.tagline, ...cat.highlights],
      searchableContent: `${cat.title} ${cat.tagline} ${cat.shortDesc} ${cat.highlights.join(' ')}`
    });

    // Sub-services
    for (const sub of cat.subServices) {
      items.push({
        id: `subservice-${cat.id}-${sub.id}`,
        category: 'services',
        categoryLabel: 'Service',
        title: sub.title,
        subtitle: cat.title,
        snippet: sub.shortDesc,
        meta: `Services · ${cat.title}`,
        targetRoute: 'subservice-detail',
        routeParams: { serviceId: cat.id, subServiceId: sub.id },
        keywords: [sub.title, cat.title, ...sub.detailedPoints],
        searchableContent: `${sub.title} ${sub.shortDesc} ${sub.leadParagraph} ${sub.detailedPoints.join(' ')} ${sub.example || ''} ${cat.title}`
      });
    }
  }

  // 2. Journal Articles
  for (const article of JOURNAL_ARTICLES) {
    items.push({
      id: `journal-${article.slug}`,
      category: 'journal',
      categoryLabel: 'Journal',
      title: article.title,
      subtitle: article.subtitle,
      snippet: article.excerpt,
      meta: `Journal · ${article.category}`,
      targetRoute: 'journal-article',
      routeParams: { articleSlug: article.slug },
      keywords: [article.title, article.subtitle, article.author, article.category, article.slug],
      searchableContent: `${article.title} ${article.subtitle} ${article.excerpt} ${article.metaDescription} ${article.author} ${article.category} ${(article.subheadings || []).map(s => `${s.title} ${s.paragraphs.join(' ')}`).join(' ')} ${article.contentParagraphs.join(' ')}`
    });
  }

  // 3. Calendar Events
  for (const event of CALENDAR_EVENTS) {
    items.push({
      id: `calendar-${event.id}`,
      category: 'calendar',
      categoryLabel: 'The Season',
      title: event.title,
      subtitle: `${event.month} · ${event.category}`,
      snippet: event.description,
      meta: `Calendar · ${event.month} · ${event.category}`,
      targetRoute: 'calendar',
      keywords: [event.title, event.month, event.category],
      searchableContent: `${event.title} ${event.month} ${event.category} ${event.description}`
    });
  }

  // 4. Hidden London Hub & 10 Sections
  items.push({
    id: 'hidden-london-hub',
    category: 'services',
    categoryLabel: 'Hidden London',
    title: 'Hidden London',
    subtitle: 'The side of London most visitors never see.',
    snippet: 'Explore ten sides of London, from subterranean vaults and architecture spaces to fight nights, supper clubs, jazz bars and rooftops.',
    meta: 'Hidden London · Overview',
    targetRoute: 'hidden-london',
    keywords: ['hidden london', 'london', 'vaults', 'architecture', 'fight nights', 'casino nights', 'thames', 'supper clubs', 'rooftops', 'jazz', 'club nights', '24 hours'],
    searchableContent: 'Hidden London subterranean sanctums architecture design spaces fight nights casino nights thames after dark supper clubs rooftops jazz cocktail bars urban dj hip-hop 24 hours in london'
  });

  for (const section of HIDDEN_LONDON_SECTIONS) {
    items.push({
      id: `hidden-london-${section.id}`,
      category: 'services',
      categoryLabel: 'Hidden London',
      title: section.title,
      subtitle: 'Hidden London',
      snippet: section.intro,
      meta: `Hidden London · ${section.shortLabel}`,
      targetRoute: section.route,
      keywords: ['hidden london', section.title, section.shortLabel, ...section.ideas.map(i => i.title)],
      searchableContent: `Hidden London ${section.title} ${section.shortLabel} ${section.intro} ${section.ideas.map(i => `${i.title} ${i.summary}`).join(' ')}`
    });
  }

  // 5. Signature Experiences Hub & 12 Examples
  items.push({
    id: 'signature-experiences-hub',
    category: 'services',
    categoryLabel: 'Signature Experiences',
    title: 'Signature Experiences',
    subtitle: "Examples of what's possible.",
    snippet: 'Examples of tailored trips, cultural evenings, sporting weekends, dining and private celebrations arranged to suit you.',
    meta: 'Signature Experiences · Overview',
    targetRoute: 'case-studies',
    keywords: ['signature experiences', 'examples', 'travel', 'culture', 'sport', 'dining', 'celebrations'],
    searchableContent: 'Signature Experiences travel culture sport dining celebrations monaco grand prix royal opera house goodwood revival cotswolds savile row frieze'
  });

  for (const exp of SIGNATURE_EXPERIENCES) {
    items.push({
      id: `experience-${exp.id}`,
      category: 'services',
      categoryLabel: 'Signature Experience',
      title: exp.title,
      subtitle: `Signature Experiences · ${exp.tag}`,
      snippet: exp.summary,
      meta: `Signature Experiences · ${exp.tag}`,
      targetRoute: 'case-studies',
      keywords: ['signature experiences', exp.title, exp.tag],
      searchableContent: `Signature Experiences ${exp.title} ${exp.tag} ${exp.summary}`
    });
  }

  // 6. Consortium & Enclaves Pages
  items.push(
    {
      id: 'consortium-overview',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'The Consortium Overview',
      subtitle: 'Mayfair-based private lifestyle management',
      snippet: 'A London concierge house helping members plan travel, dining, homes and experiences with quiet care.',
      meta: 'Consortium · Overview',
      targetRoute: 'consortium',
      keywords: ['consortium', 'overview', 'mayfair', 'london', 'concierge'],
      searchableContent: 'The Consortium Overview private concierge lifestyle management Mayfair London discretion'
    },
    {
      id: 'consortium-leadership',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Leadership & Team',
      subtitle: TEAM_MEMBERS.map(m => m.name).join(', '),
      snippet: 'Meet the directors leading The Global Luxury Consortium from Mayfair, London.',
      meta: 'Consortium · Team',
      targetRoute: 'about',
      keywords: ['leadership', 'team', 'directors', ...TEAM_MEMBERS.map(m => m.name.toLowerCase())],
      searchableContent: `Leadership Team Directors ${TEAM_MEMBERS.map(m => `${m.name} ${m.role} ${m.specialism} ${m.bio}`).join(' ')}`
    },
    {
      id: 'consortium-ethos',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Our Ethos & Principles',
      subtitle: 'How we work with every member',
      snippet: 'Discretion, honest advice and practical help tailored to how you live and travel.',
      meta: 'Consortium · Ethos',
      targetRoute: 'ethos',
      keywords: ['ethos', 'principles', 'discretion', 'values'],
      searchableContent: 'Our Ethos Principles discretion honest advice practical help Mayfair London'
    },
    {
      id: 'consortium-approach',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Our Approach',
      subtitle: 'How a request moves from first note to plan',
      snippet: 'We listen carefully, research practical options, confirm details clearly and stay close until everything runs smoothly.',
      meta: 'Consortium · Approach',
      targetRoute: 'approach',
      keywords: ['approach', 'process', 'planning', 'how we work'],
      searchableContent: 'Our Approach process planning discovery research confirmation Mayfair desk'
    },
    {
      id: 'consortium-network',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'The TGLC Network',
      subtitle: 'Rooted in London with international reach',
      snippet: 'Strong local relationships in Mayfair and London alongside trusted contacts when you travel abroad.',
      meta: 'Consortium · Network',
      targetRoute: 'network',
      keywords: ['network', 'global', 'london', 'international', 'travel'],
      searchableContent: 'The TGLC Network London Mayfair international travel contacts'
    },
    {
      id: 'consortium-privacy',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Privacy & Discretion',
      subtitle: 'How we look after your personal details',
      snippet: 'Quiet handling of every enquiry, personal preference and introduction from our Mayfair office.',
      meta: 'Consortium · Privacy',
      targetRoute: 'privacy-discretion',
      keywords: ['privacy', 'discretion', 'confidentiality', 'trust'],
      searchableContent: 'Privacy Discretion confidentiality personal details quiet handling Mayfair'
    },
    {
      id: 'consortium-cultural-traditions',
      category: 'consortium',
      categoryLabel: 'Cultural Hospitality',
      title: 'Cultural, Islamic & Global Traditions',
      subtitle: 'Islamic, Muslim & all global faiths thoughtfully honoured',
      snippet: 'Certified halal fine dining, Ramadan Iftar and Suhoor hospitality, private family suites, prayer spaces, and respectful care for every world culture.',
      meta: 'Consortium · Cultural Traditions',
      targetRoute: 'cultural-traditions',
      keywords: ['islamic', 'muslim', 'halal', 'ramadan', 'iftar', 'suhoor', 'eid', 'prayer', 'qibla', 'alcohol-free', 'modest', 'kosher', 'shabbat', 'hindu', 'jain', 'sikh', 'cultural', 'traditions', 'faith'],
      searchableContent: 'Islamic Muslim traditions halal fine dining Ramadan Iftar Suhoor Eid family privacy female chauffeurs prayer space Qibla alcohol-free hospitality Kosher Shabbat Hindu Jain vegetarian Sikh East Asian Orthodox global cultures Mayfair London'
    },
    {
      id: 'consortium-membership',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Membership',
      subtitle: 'London, Global and Private Office options',
      snippet: 'Ways to work with our Mayfair team for personal, travel, home and lifestyle support.',
      meta: 'Consortium · Membership',
      targetRoute: 'membership',
      keywords: ['membership', 'tiers', 'london', 'global', 'private office', 'join'],
      searchableContent: 'Membership London Global Private Office Mayfair concierge join'
    },
    {
      id: 'consortium-commission-studio',
      category: 'services',
      categoryLabel: 'Commission Studio',
      title: 'Commission Studio',
      subtitle: 'Build a tailored brief for our Mayfair desk',
      snippet: 'Outline your dates, interests and priorities so our team can start planning your trip or occasion.',
      meta: 'Studio · Brief Builder',
      targetRoute: 'commission-studio',
      keywords: ['studio', 'commission', 'itinerary', 'builder', 'planner', 'brief'],
      searchableContent: 'Commission Studio brief builder itinerary planner Mayfair desk tailored trip occasion'
    },
    {
      id: 'consortium-contact',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Contact & Enquiries',
      subtitle: '3rd Floor, 45 Albemarle Street, London W1S 4JL',
      snippet: 'Reach our Mayfair office Monday – Friday, 08:30 – 19:30 on 020 3951 6369 or info@thegloballuxuryconsortium.com.',
      meta: 'Contact · Mayfair London W1S 4JL',
      targetRoute: 'contact',
      keywords: ['contact', 'address', 'telephone', 'albemarle street', 'mayfair', 'w1s 4jl', 'enquiries', 'phone', '020 3951 6369', '16831098'],
      searchableContent: 'Contact 3rd Floor 45 Albemarle Street Mayfair London W1S 4JL telephone 020 3951 6369 company number 16831098 info@thegloballuxuryconsortium.com enquiries'
    },
    {
      id: 'consortium-faqs',
      category: 'consortium',
      categoryLabel: 'Consortium',
      title: 'Frequently Asked Questions',
      subtitle: 'Membership, services, privacy and how we work',
      snippet: 'Plain answers on how to join, what we can help arrange and how to reach our Mayfair office.',
      meta: 'Consortium · FAQs',
      targetRoute: 'faq',
      keywords: ['faq', 'questions', 'answers', 'membership', 'scope'],
      searchableContent: 'Frequently Asked Questions membership services privacy how we work Mayfair'
    }
  );

  // Add individual London enclaves / neighbourhoods
  for (const enclave of LONDON_NEIGHBOURHOODS) {
    items.push({
      id: `enclave-${enclave.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      category: 'consortium',
      categoryLabel: 'London Neighbourhood',
      title: enclave.name,
      subtitle: enclave.vibe,
      snippet: enclave.summary,
      meta: `Our London · ${enclave.name}`,
      targetRoute: 'our-london',
      keywords: [enclave.name, enclave.vibe, ...enclave.highlights],
      searchableContent: `${enclave.name} ${enclave.vibe} ${enclave.summary} ${enclave.highlights.join(' ')}`
    });
  }

  return items;
};

const SEARCH_INDEX = buildSearchIndex();

// Clean string for matching
const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();

/**
 * Searches the TGLC global index with relevance scoring.
 */
export function searchTGLC(query: string, category: SearchCategoryType = 'all'): GlobalSearchResult[] {
  const trimmed = query.trim();

  // If empty query, return curated highlights
  if (!trimmed) {
    return getCuratedEditorialSuggestions(category);
  }

  const normalizedQuery = normalize(trimmed);
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  if (queryTokens.length === 0) {
    return getCuratedEditorialSuggestions(category);
  }

  const results: { item: IndexItem; score: number }[] = [];

  for (const item of SEARCH_INDEX) {
    if (category !== 'all' && item.category !== category) {
      continue;
    }

    const normTitle = normalize(item.title);
    const normSubtitle = normalize(item.subtitle);
    const normContent = normalize(item.searchableContent);

    let score = 0;

    // Exact title phrase match
    if (normTitle === normalizedQuery) {
      score += 150;
    } else if (normTitle.startsWith(normalizedQuery)) {
      score += 100;
    } else if (normTitle.includes(normalizedQuery)) {
      score += 70;
    }

    // Subtitle phrase match
    if (normSubtitle.includes(normalizedQuery)) {
      score += 40;
    }

    // Token matching across title, keywords, and content
    let allTokensFound = true;
    for (const token of queryTokens) {
      const inTitle = normTitle.includes(token);
      const inSubtitle = normSubtitle.includes(token);
      const inKeywords = item.keywords.some(k => normalize(k).includes(token));
      const inContent = normContent.includes(token);

      if (inTitle) {
        score += 35;
      } else if (inKeywords) {
        score += 25;
      } else if (inSubtitle) {
        score += 15;
      } else if (inContent) {
        score += 8;
      } else {
        allTokensFound = false;
      }
    }

    // Boost if all multi-word tokens are present
    if (queryTokens.length > 1 && allTokensFound) {
      score += 50;
    }

    if (score > 0) {
      results.push({ item, score });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, 16).map(({ item }) => ({
    id: item.id,
    category: item.category,
    categoryLabel: item.categoryLabel,
    title: item.title,
    subtitle: item.subtitle,
    snippet: item.snippet,
    meta: item.meta,
    targetRoute: item.targetRoute,
    routeParams: item.routeParams
  }));
}

/**
 * Returns curated editorial suggestions when query is empty.
 */
export function getCuratedEditorialSuggestions(category: SearchCategoryType = 'all'): GlobalSearchResult[] {
  const curatedIds: string[] = [
    'subservice-travel-aviation-private-aviation',
    'subservice-dining-nightlife-london-dining',
    'journal-the-new-rules-of-discreet-travel',
    'journal-a-private-guide-to-london-after-dark',
    'journal-the-art-of-the-perfect-london-weekend',
    'calendar-cal-01',
    'calendar-cal-02',
    'enclave-mayfair-st-james-s',
    'consortium-overview',
    'consortium-leadership'
  ];

  const matched = SEARCH_INDEX.filter(item => {
    if (category !== 'all' && item.category !== category) return false;
    return curatedIds.includes(item.id);
  });

  return matched.map(item => ({
    id: item.id,
    category: item.category,
    categoryLabel: item.categoryLabel,
    title: item.title,
    subtitle: item.subtitle,
    snippet: item.snippet,
    meta: item.meta,
    targetRoute: item.targetRoute,
    routeParams: item.routeParams
  }));
}
