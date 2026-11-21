import type { ServiceCategory, SubService } from '../types';

export interface CarouselSlide {
  image: string;
  alt: string;
  title?: string;
  caption?: string;
}

/**
 * Deduplicates slides by image URL while preserving order, then tops up from
 * fallbackPool until at least `minCount` unique slides are present.
 */
export function buildUniqueSlides<T extends { image: string }>(
  primary: T[],
  fallbackPool: T[],
  minCount = 5
): T[] {
  const seen = new Set<string>();
  const result: T[] = [];

  const pushUnique = (item: T) => {
    const key = item.image?.trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    result.push(item);
  };

  for (const item of primary) {
    pushUnique(item);
  }

  for (const item of fallbackPool) {
    if (result.length >= minCount) break;
    pushUnique(item);
  }

  return result;
}

/**
 * Curated 5-slide hero sets for every Consortium page (all unique & strictly topic-matched).
 */
export const CONSORTIUM_SUBPAGE_SLIDES: Record<
  'overview' | 'concierge' | 'about' | 'ethos' | 'approach' | 'network' | 'our-london' | 'privacy',
  CarouselSlide[]
> = {
  overview: [
    {
      image: '/assets/aistudio/consortium_overview_head.jpg',
      title: '45 Albemarle Street',
      alt: 'TGLC Mayfair office reception at 45 Albemarle Street, London',
    },
    {
      image: '/assets/aistudio/tglc_st_james_salon.jpg',
      title: 'Mayfair Meeting Room',
      alt: 'Quiet private salon for conversations in Mayfair, London',
    },
    {
      image: '/assets/aistudio/consortium_ethos_sanctuary.jpg',
      title: 'Quiet Reading Room',
      alt: 'Calm wood-panelled study away from the rush of central London',
    },
    {
      image: '/assets/aistudio/consortium_approach_board.jpg',
      title: 'London Desk',
      alt: 'Mayfair planning room for travel, homes and events',
    },
    {
      image: '/assets/aistudio/consortium_privacy_vault.jpg',
      title: 'Private Consultation Space',
      alt: 'Private room designed for confidential discussions in Mayfair',
    },
  ],
  concierge: [
    {
      image: '/assets/aistudio/private_jet_interior_suite.jpg',
      title: '24/7 Private Aviation',
      alt: 'Long-range private jet suite coordinated around the clock by TGLC',
    },
    {
      image: '/assets/aistudio/membership_sovereign_desk.jpg',
      title: 'Dedicated Principal Desk',
      alt: 'Senior Mayfair concierge desk serving ultra-high-net-worth individuals 24/7',
    },
    {
      image: '/assets/aistudio/five_star_mayfair_suite.jpg',
      title: 'Private Residences & Suites',
      alt: 'Five-star Mayfair penthouse suite prepared prior to arrival',
    },
    {
      image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
      title: 'Chauffeur & Airside Arrivals',
      alt: 'Bespoke chauffeur-driven Rolls-Royce awaiting guests in central London',
    },
    {
      image: '/assets/aistudio/mayfair_fine_dining.jpg',
      title: 'Closed-Door Hospitality',
      alt: 'Candlelit private dining salon reserved in Mayfair',
    },
  ],
  about: [
    {
      image: '/assets/aistudio/consortium_overview_head.jpg',
      title: 'Our Mayfair House',
      alt: 'The Global Luxury Consortium office on Albemarle Street, Mayfair',
    },
    {
      image: '/assets/aistudio/membership_sanctum_suite.jpg',
      title: 'Personal Hospitality',
      alt: 'Warm private hospitality lounge in central London',
    },
    {
      image: '/assets/aistudio/corporate_ea_boardroom.jpg',
      title: 'Dedicated Lifestyle Desk',
      alt: 'Quiet private office suite prepared for member planning',
    },
    {
      image: '/assets/aistudio/savile_row_bespoke.jpg',
      title: 'British Craft Roots',
      alt: 'Traditional Mayfair and Savile Row craftsmanship',
    },
    {
      image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
      title: 'Mayfair Architecture',
      alt: 'Georgian London street architecture near Albemarle Street',
    },
  ],
  ethos: [
    {
      image: '/assets/aistudio/consortium_ethos_sanctuary.jpg',
      title: 'Quiet Judgement',
      alt: 'Calm, understated library room reflecting the TGLC ethos',
    },
    {
      image: '/assets/aistudio/savile_row_shears.jpg',
      title: 'Attention to Detail',
      alt: 'Tailoring shears resting on fine suiting cloth in Mayfair',
    },
    {
      image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg',
      title: 'Traditional Standards',
      alt: 'Artisan leatherworking bench in a quiet London workshop',
    },
    {
      image: '/assets/aistudio/mayfair_fine_dining.jpg',
      title: 'Personal Continuity',
      alt: 'Intimate candlelit table set in a Mayfair dining room',
    },
    {
      image: '/assets/aistudio/tglc_st_james_salon.jpg',
      title: 'Long-Term Trust',
      alt: 'Private drawing room in St James’s and Mayfair',
    },
  ],
  approach: [
    {
      image: '/assets/aistudio/consortium_approach_board.jpg',
      title: 'Clear Planning',
      alt: 'Private consultation table arranged for itinerary planning',
    },
    {
      image: '/assets/aistudio/membership_sovereign_desk.jpg',
      title: 'One Point of Contact',
      alt: 'Dedicated lifestyle manager desk in Mayfair',
    },
    {
      image: '/assets/aistudio/private_jet_interior_suite.jpg',
      title: 'Joined-Up Logistics',
      alt: 'Private jet cabin coordinated seamlessly with ground transfers',
    },
    {
      image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
      title: 'Door-to-Door Care',
      alt: 'Chauffeur-driven car waiting quietly in Mayfair',
    },
    {
      image: '/assets/aistudio/five_star_mayfair_suite.jpg',
      title: 'Prepared Ahead',
      alt: 'Five-star Mayfair hotel suite prepared ahead of arrival',
    },
  ],
  network: [
    {
      image: '/assets/aistudio/consortium_network_global.jpg',
      title: 'London to Global Hubs',
      alt: 'International connections spanning London, Europe, the US and Asia',
    },
    {
      image: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
      title: 'Monaco & The Riviera',
      alt: 'Monaco harbour illuminated at twilight',
    },
    {
      image: '/assets/aistudio/florence_palazzo_courtyard.jpg',
      title: 'Milan & Florence',
      alt: 'Historic Italian palazzo courtyard in warm evening light',
    },
    {
      image: '/assets/aistudio/swiss_alpine_chalet.jpg',
      title: 'Geneva & The Alps',
      alt: 'Private alpine timber chalet overlooking snow-covered peaks',
    },
    {
      image: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg',
      title: 'Tokyo & Singapore',
      alt: 'Intimate hinoki wood omakase counter prepared for evening service',
    },
  ],
  'our-london': [
    {
      image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
      title: 'Mayfair & St James’s',
      alt: 'Classic white-stucco London residences in Mayfair and Belgravia',
    },
    {
      image: '/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg',
      title: 'Central London Skyline',
      alt: 'Dusk view across central London landmarks and the River Thames',
    },
    {
      image: '/assets/aistudio/tower_bascule_vault_1794391687426.jpg',
      title: 'The City & River',
      alt: 'Historic Thames architecture lit against the night sky',
    },
    {
      image: '/assets/aistudio/bond_street_jewellery.jpg',
      title: 'Bond Street & Burlington',
      alt: 'Private jewellery showroom in Mayfair, London',
    },
    {
      image: '/assets/aistudio/royal_opera_gallery.jpg',
      title: 'Covent Garden & Culture',
      alt: 'Grand cultural hall in central London prepared for an evening performance',
    },
  ],
  privacy: [
    {
      image: '/assets/aistudio/consortium_privacy_vault.jpg',
      title: 'Strict Confidentiality',
      alt: 'Quiet private vault consultation space in central London',
    },
    {
      image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
      title: 'Discreet Arrivals',
      alt: 'Quiet cobbled Mayfair mews entrance at dusk',
    },
    {
      image: '/assets/aistudio/close_protection_security.jpg',
      title: 'Quiet Protection',
      alt: 'Low-profile executive arrival coordination in London',
    },
    {
      image: '/assets/aistudio/mayfair_security_convoy.jpg',
      title: 'Private Movement',
      alt: 'Chauffeur vehicle waiting on a quiet Mayfair street',
    },
    {
      image: '/assets/aistudio/consortium_ethos_sanctuary.jpg',
      title: 'Unpublished Client Care',
      alt: 'Private wood-panelled study where client details remain confidential',
    },
  ],
};

export const MEMBERSHIP_HERO_SLIDES: CarouselSlide[] = [
  {
    image: '/assets/aistudio/membership_sanctum_suite.jpg',
    title: 'Private Hospitality',
    alt: 'TGLC Mayfair member reception suite',
  },
  {
    image: '/assets/aistudio/membership_sovereign_desk.jpg',
    title: 'Dedicated Lifestyle Manager',
    alt: 'Personal lifestyle management desk at our Mayfair office',
  },
  {
    image: '/assets/aistudio/five_star_mayfair_suite.jpg',
    title: 'Mayfair Stays',
    alt: 'Quiet Mayfair hotel suite prepared for members',
  },
  {
    image: '/assets/aistudio/private_jet_interior_suite.jpg',
    title: 'Global Travel',
    alt: 'Private aircraft cabin prepared for international travel',
  },
  {
    image: '/assets/aistudio/cotswolds_manor_estate.jpg',
    title: 'Country & Family Homes',
    alt: 'English country manor estate surrounded by manicured gardens',
  },
];

export const SIGNATURE_EXPERIENCES_HERO_SLIDES: CarouselSlide[] = [
  {
    image: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
    title: 'Monaco Grand Prix Weekend',
    alt: 'Monaco harbour illuminated at twilight ahead of race weekend',
  },
  {
    image: '/assets/aistudio/royal_opera_box_1794391694654.jpg',
    title: 'Evening at the Royal Opera House',
    alt: 'Private crimson velvet box overlooking the Royal Opera House stage',
  },
  {
    image: '/assets/aistudio/cotswolds_manor_estate.jpg',
    title: 'Cotswolds Country House Retreat',
    alt: 'Historic Cotswolds manor house framed by quiet English gardens',
  },
  {
    image: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
    title: 'Frieze Art Week in London',
    alt: 'Contemporary art gallery pavilion during London art week',
  },
  {
    image: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg',
    title: 'Historic City Vault Dinner',
    alt: 'Candlelit private dining table inside a historic stone vault',
  },
];

export const FAQ_HERO_SLIDES: CarouselSlide[] = [
  {
    image: '/assets/aistudio/savile_row_bespoke.jpg',
    title: 'Personal Attention',
    alt: 'Bespoke tailoring craft and quiet attention to detail in Mayfair',
  },
  {
    image: '/assets/aistudio/consortium_overview_head.jpg',
    title: '45 Albemarle Street',
    alt: 'Our Mayfair office reception on Albemarle Street',
  },
  {
    image: '/assets/aistudio/mayfair_fine_dining.jpg',
    title: 'Dining & Hospitality',
    alt: 'Quiet candlelit dining room in Mayfair',
  },
  {
    image: '/assets/aistudio/private_jet_interior_suite.jpg',
    title: 'Travel & Transfers',
    alt: 'Private aircraft interior ready for seamless departure',
  },
  {
    image: '/assets/aistudio/cotswolds_manor_estate.jpg',
    title: 'Homes & Escapes',
    alt: 'Private English countryside residence surrounded by gardens',
  },
];

export const CONTACT_HERO_SLIDES: CarouselSlide[] = [
  {
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
    title: 'Mayfair Consultation Room',
    alt: 'TGLC Mayfair office consultation room for private meetings',
  },
  {
    image: '/assets/aistudio/consortium_overview_head.jpg',
    title: '45 Albemarle Street',
    alt: 'Reception lounge at our Albemarle Street Mayfair office',
  },
  {
    image: '/assets/aistudio/consortium_approach_board.jpg',
    title: 'Personal Introductions',
    alt: 'Quiet meeting table for personal concierge introductions',
  },
  {
    image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
    title: 'Mayfair, London W1S',
    alt: 'Classic Georgian streetscape in Mayfair, London',
  },
  {
    image: '/assets/aistudio/membership_sovereign_desk.jpg',
    title: 'Direct Mayfair Desk',
    alt: 'Dedicated lifestyle management desk during office hours',
  },
];

export const MEMBERS_HERO_SLIDES: CarouselSlide[] = [
  {
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
    title: 'Mayfair Direct Desk',
    alt: 'Private members lounge in Mayfair, London',
  },
  {
    image: '/assets/aistudio/membership_sanctum_suite.jpg',
    title: 'Member Reception',
    alt: 'Quiet Mayfair reception suite for visiting members',
  },
  {
    image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
    title: 'London Chauffeurs',
    alt: 'Chauffeur vehicle prepared for immediate London departure',
  },
  {
    image: '/assets/aistudio/mayfair_fine_dining.jpg',
    title: 'Evening Reservations',
    alt: 'Candlelit Mayfair dining table arranged for members',
  },
  {
    image: '/assets/aistudio/6a194620490b49214619b628_file_8wpx83o3_8d7f9f53.png',
    title: 'On-Demand Travel',
    alt: 'Private jet cabin arranged through the Mayfair desk',
  },
];

export const JOURNAL_HERO_SLIDES = [
  {
    id: 'after-dark',
    slug: 'a-private-guide-to-london-after-dark',
    image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
    category: 'London Intelligence',
    title: 'A Private Guide to London After Dark',
  },
  {
    id: 'london-weekend',
    slug: 'the-art-of-the-perfect-london-weekend',
    image: '/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg',
    category: 'London Intelligence',
    title: 'The Art of the Perfect London Weekend',
  },
  {
    id: 'savile-row',
    slug: 'the-art-of-bespoke-tailoring-savile-row',
    image: '/assets/aistudio/savile_row_shears.jpg',
    category: 'Objects of Desire',
    title: 'Savile Row Tailoring: What to Know Before Your First Fitting',
  },
  {
    id: 'discreet-travel',
    slug: 'the-new-rules-of-discreet-travel',
    image: '/assets/aistudio/MAIN-IMAGE-Shangri-La-The-Shard-London-Illuminate-Yacht-_571087f0.jpg',
    category: 'Travel Notes',
    title: 'The New Rules of Discreet Travel',
  },
  {
    id: 'quiet-home',
    slug: 'the-quiet-luxury-of-a-beautifully-managed-home',
    image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
    category: 'Private Residences',
    title: 'The Quiet Luxury of a Beautifully Managed Home',
  },
  {
    id: 'private-dinner',
    slug: 'the-private-dinner-why-the-table-still-matters',
    image: '/assets/aistudio/rare_cellar_vault.jpg',
    category: 'Dining & Entertaining',
    title: 'The Private Dinner: Why the Table Still Matters',
  },
];

export const CALENDAR_HERO_SLIDES = [
  {
    id: 'wimbledon',
    image: '/assets/aistudio/wimbledon_centre_court_1794391696846.jpg',
    title: 'Wimbledon',
    month: 'Jul',
  },
  {
    id: 'ascot',
    image: '/assets/aistudio/calendar_ascot_lawn.jpg',
    title: 'Royal Ascot',
    month: 'Jun',
  },
  {
    id: 'monaco',
    image: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
    title: 'Monaco Grand Prix',
    month: 'May',
  },
  {
    id: 'royal-opera',
    image: '/assets/aistudio/royal_opera_box_1794391694654.jpg',
    title: 'Royal Opera House Season',
    month: 'Autumn',
  },
  {
    id: 'frieze',
    image: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
    title: 'Frieze London & Frieze Masters',
    month: 'Oct',
  },
];

export const HIDDEN_LONDON_HUB_SLIDES = [
  {
    id: 'underground',
    image: '/assets/aistudio/brunel_brick_shaft_1794391688745.jpg',
    title: 'Underground Rooms',
  },
  {
    id: 'rooftops',
    image: '/assets/aistudio/tower_bascule_vault_1794391687426.jpg',
    title: 'Rooftops & Rare Views',
  },
  {
    id: 'thames',
    image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
    title: 'Thames After Dark',
  },
  {
    id: 'jazz',
    image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
    title: 'Jazz & Cocktail Bars',
  },
  {
    id: 'supper-clubs',
    image: '/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg',
    title: 'Supper Clubs & Late Dining',
  },
  {
    id: 'club-nights',
    image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
    title: '24 Hours in London',
  },
];

/**
 * Two topic-matched companion hero images for each of the 10 Hidden London
 * category pages so every section carousel has 5 distinct, relevant slides.
 */
export const HIDDEN_LONDON_SECTION_EXTRA_SLIDES: Record<
  string,
  { id: string; image: string; title: string }[]
> = {
  underground: [
    {
      id: 'underground-tunnels',
      image: '/assets/aistudio/kingsway_coldwar_tunnels.jpg',
      title: 'Historic Subterranean Passages',
    },
    {
      id: 'underground-catacomb',
      image: '/assets/aistudio/subrosa_catacomb_dinner.jpg',
      title: 'Candlelit Stone Vaults',
    },
  ],
  architecture: [
    {
      id: 'architecture-silo',
      image: '/assets/aistudio/silvertown_silo_art.jpg',
      title: 'Industrial Gallery Spaces',
    },
    {
      id: 'architecture-sky',
      image: '/assets/aistudio/sky_gantry_night_1794391688194.jpg',
      title: 'Elevated Architectural Views',
    },
  ],
  'fight-nights': [
    {
      id: 'fight-wembley',
      image: '/assets/aistudio/wembley_vip_hospitality.jpg',
      title: 'Major Stadium Fight Hospitality',
    },
    {
      id: 'fight-arrival',
      image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
      title: 'Discreet Post-Fight Return',
    },
  ],
  'casino-nights': [
    {
      id: 'casino-fitzrovia',
      image: '/assets/aistudio/fitzrovia_absinthe_salon_1794391690208.jpg',
      title: 'Late-Night Spirits Salon',
    },
    {
      id: 'casino-arrival',
      image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
      title: 'Waiting Mayfair Chauffeur',
    },
  ],
  'thames-after-dark': [
    {
      id: 'thames-shard',
      image: '/assets/aistudio/MAIN-IMAGE-Shangri-La-The-Shard-London-Illuminate-Yacht-_571087f0.jpg',
      title: 'Illuminated River Landmarks',
    },
    {
      id: 'thames-tower',
      image: '/assets/aistudio/tower_bascule_vault_1794391687426.jpg',
      title: 'Tower Bridge at Night',
    },
  ],
  'supper-clubs': [
    {
      id: 'supper-cellar',
      image: '/assets/aistudio/dining_bespoke_cellar.jpg',
      title: 'Private Wine Cellar Supper',
    },
    {
      id: 'supper-mayfair',
      image: '/assets/aistudio/mayfair_fine_dining.jpg',
      title: 'Candlelit Mayfair Dining Room',
    },
  ],
  rooftops: [
    {
      id: 'rooftops-london',
      image: '/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg',
      title: 'Central London Skyline at Dusk',
    },
    {
      id: 'rooftops-penthouse',
      image: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg',
      title: 'High-Floor Terrace Overlooking London',
    },
  ],
  jazz: [
    {
      id: 'jazz-vinyl',
      image: '/assets/aistudio/urban_vinyl_booth_deep.jpg',
      title: 'Warm Vinyl Listening Room',
    },
    {
      id: 'jazz-club',
      image: '/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg',
      title: 'Candlelit Late-Night Booth',
    },
  ],
  'club-nights': [
    {
      id: 'club-vinyl',
      image: '/assets/aistudio/urban_vinyl_booth_deep.jpg',
      title: 'Acoustic Vinyl Console & Booth',
    },
    {
      id: 'club-fashion',
      image: '/assets/aistudio/luxury_streetwear_salon_1794391693258.jpg',
      title: 'East & West End Late Culture',
    },
  ],
  '24-hours': [
    {
      id: '24h-dining',
      image: '/assets/aistudio/mayfair_fine_dining.jpg',
      title: 'Unhurried Mayfair Lunch & Dinner',
    },
    {
      id: '24h-chauffeur',
      image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
      title: 'Dedicated Chauffeur All Day',
    },
  ],
};

/**
 * Topic-matched companion images for service categories that need a 5th slide
 * (e.g. dining-nightlife and residences-relocation).
 */
export const SERVICE_CATEGORY_EXTRA_IMAGES: Record<string, string[]> = {
  'travel-aviation': [
    '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
    '/assets/aistudio/florence_palazzo_courtyard.jpg',
  ],
  'dining-nightlife': [
    '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
    '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg',
  ],
  'experiences-culture': [
    '/assets/aistudio/royal_opera_box_1794391694654.jpg',
    '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
  ],
  'residences-relocation': [
    '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
    '/assets/aistudio/swiss_alpine_chalet.jpg',
  ],
  'transport-security': [
    '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
    '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
  ],
  'personal-private-office': [
    '/assets/aistudio/membership_sovereign_desk.jpg',
    '/assets/aistudio/tglc_st_james_salon.jpg',
  ],
  'luxury-sourcing': [
    '/assets/aistudio/savile_row_bespoke.jpg',
    '/assets/aistudio/high_jewellery_vault.jpg',
  ],
};

/**
 * Strictly topic-relevant companion photography for every one of the 39
 * sub-services so every SubServiceDetailPage carousel has >= 5 unique slides.
 */
export const SUB_SERVICE_COMPANION_IMAGES: Record<string, string[]> = {
  // 1. Travel & Aviation
  'private-aviation': [
    '/assets/aistudio/private_jet_interior_suite.jpg',
    '/assets/aistudio/6a5e4f29ca98c820c85071cd_file_l7dpoy6z_91be91a5.png',
    '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
    '/assets/aistudio/swiss_alpine_chalet.jpg',
  ],
  'bespoke-travel-design': [
    '/assets/aistudio/florence_palazzo_courtyard.jpg',
    '/assets/aistudio/swiss_alpine_chalet.jpg',
    '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
    '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
  ],
  'hotels-villas-residences': [
    '/assets/aistudio/five_star_mayfair_suite.jpg',
    '/assets/aistudio/cotswolds_manor_estate.jpg',
    '/assets/aistudio/florence_palazzo_courtyard.jpg',
    '/assets/aistudio/swiss_alpine_chalet.jpg',
  ],
  'yachts-coastal-escapes': [
    '/assets/aistudio/mediterranean_superyacht_deck.jpg',
    '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
    '/assets/aistudio/MAIN-IMAGE-Shangri-La-The-Shard-London-Illuminate-Yacht-_571087f0.jpg',
    '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
  ],
  'global-mobility-logistics': [
    '/assets/aistudio/luxury_sprinter_jetvan.jpg',
    '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
    '/assets/aistudio/private_jet_interior_suite.jpg',
    '/assets/aistudio/five_star_mayfair_suite.jpg',
  ],

  // 2. Dining, Nightlife & Social Access
  'london-dining': [
    '/assets/aistudio/mayfair_fine_dining.jpg',
    '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg',
    '/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg',
    '/assets/aistudio/dining_bespoke_cellar.jpg',
  ],
  'private-dining-celebrations': [
    '/assets/aistudio/dining_bespoke_cellar.jpg',
    '/assets/aistudio/subrosa_catacomb_dinner.jpg',
    '/assets/aistudio/thames_drydock_supper.jpg',
    '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg',
  ],
  'members-clubs-introductions': [
    '/assets/aistudio/tglc_st_james_salon.jpg',
    '/assets/aistudio/membership_sanctum_suite.jpg',
    '/assets/aistudio/fitzrovia_absinthe_salon_1794391690208.jpg',
    '/assets/aistudio/consortium_ethos_sanctuary.jpg',
  ],
  'nightlife-after-dark': [
    '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
    '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    '/assets/aistudio/urban_vinyl_booth_deep.jpg',
    '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
  ],
  'global-dining-culinary': [
    '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg',
    '/assets/aistudio/florence_palazzo_courtyard.jpg',
    '/assets/aistudio/rare_cellar_vault.jpg',
    '/assets/aistudio/mayfair_fine_dining.jpg',
  ],

  // 3. Experiences, Culture & Entertainment
  'art-design-collecting': [
    '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
    '/assets/aistudio/silvertown_silo_art.jpg',
    '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg',
    '/assets/aistudio/florence_palazzo_courtyard.jpg',
  ],
  'music-theatre-performance': [
    '/assets/aistudio/royal_opera_box_1794391694654.jpg',
    '/assets/aistudio/royal_opera_gallery.jpg',
    '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
    '/assets/aistudio/brunel_brick_shaft_1794391688745.jpg',
  ],
  'fashion-private-shopping': [
    '/assets/aistudio/savile_row_bespoke.jpg',
    '/assets/aistudio/bond_street_jewellery.jpg',
    '/assets/aistudio/luxury_streetwear_salon_1794391693258.jpg',
    '/assets/aistudio/shoreditch_street_couture.jpg',
  ],
  'sport-motorsport': [
    '/assets/aistudio/wimbledon_centre_court_1794391696846.jpg',
    '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
    '/assets/aistudio/calendar_ascot_lawn.jpg',
    '/assets/aistudio/wembley_vip_hospitality.jpg',
  ],
  'private-celebrations-milestones': [
    '/assets/aistudio/tower_bascule_vault_1794391687426.jpg',
    '/assets/aistudio/cotswolds_manor_estate.jpg',
    '/assets/aistudio/dining_bespoke_cellar.jpg',
    '/assets/aistudio/thames_drydock_supper.jpg',
  ],
  'family-next-generation': [
    '/assets/aistudio/cotswolds_manor_estate.jpg',
    '/assets/aistudio/swiss_alpine_chalet.jpg',
    '/assets/aistudio/mediterranean_superyacht_deck.jpg',
    '/assets/aistudio/wimbledon_centre_court_1794391696846.jpg',
  ],

  // 4. Residences & Relocation
  'london-residences': [
    '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
    '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg',
    '/assets/aistudio/five_star_mayfair_suite.jpg',
    '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg',
  ],
  'off-market-property': [
    '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
    '/assets/aistudio/cotswolds_manor_estate.jpg',
    '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
    '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg',
  ],
  'relocation-settling-in': [
    '/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg',
    '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
    '/assets/aistudio/five_star_mayfair_suite.jpg',
    '/assets/aistudio/consortium_overview_head.jpg',
  ],
  'household-management': [
    '/assets/aistudio/five_star_mayfair_suite.jpg',
    '/assets/aistudio/cotswolds_manor_estate.jpg',
    '/assets/aistudio/consortium_ethos_sanctuary.jpg',
    '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg',
  ],
  'interior-home-services': [
    '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg',
    '/assets/aistudio/membership_sanctum_suite.jpg',
    '/assets/aistudio/tglc_st_james_salon.jpg',
    '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
  ],
  'country-estates-weekend-homes': [
    '/assets/aistudio/cotswolds_manor_estate.jpg',
    '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
    '/assets/aistudio/swiss_alpine_chalet.jpg',
    '/assets/aistudio/calendar_concours_blenheim.jpg',
  ],

  // 5. Transport, Security & Privacy
  'chauffeur-luxury-vehicles': [
    '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
    '/assets/aistudio/luxury_sprinter_jetvan.jpg',
    '/assets/aistudio/mayfair_security_convoy.jpg',
    '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
  ],
  'private-car-sourcing': [
    '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp',
    '/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg',
    '/assets/aistudio/calendar_concours_blenheim.jpg',
    '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
  ],
  'executive-protection': [
    '/assets/aistudio/close_protection_security.jpg',
    '/assets/aistudio/mayfair_security_convoy.jpg',
    '/assets/aistudio/consortium_privacy_vault.jpg',
    '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
  ],
  'secure-travel-event-logistics': [
    '/assets/aistudio/mayfair_security_convoy.jpg',
    '/assets/aistudio/luxury_sprinter_jetvan.jpg',
    '/assets/aistudio/private_jet_interior_suite.jpg',
    '/assets/aistudio/wembley_vip_hospitality.jpg',
  ],
  'privacy-first-lifestyle-support': [
    '/assets/aistudio/consortium_privacy_vault.jpg',
    '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
    '/assets/aistudio/consortium_ethos_sanctuary.jpg',
    '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
  ],

  // 6. Personal & Private Office
  'everyday-lifestyle-management': [
    '/assets/aistudio/membership_sovereign_desk.jpg',
    '/assets/aistudio/consortium_overview_head.jpg',
    '/assets/aistudio/mayfair_fine_dining.jpg',
    '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
  ],
  'household-staffing-recruitment': [
    '/assets/aistudio/five_star_mayfair_suite.jpg',
    '/assets/aistudio/cotswolds_manor_estate.jpg',
    '/assets/aistudio/consortium_approach_board.jpg',
    '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
  ],
  'education-family-support': [
    '/assets/aistudio/consortium_ethos_sanctuary.jpg',
    '/assets/aistudio/consortium_approach_board.jpg',
    '/assets/aistudio/royal_opera_gallery.jpg',
    '/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg',
  ],
  'health-wellness-recovery': [
    '/assets/aistudio/harley_medical_suite_1794391696088.jpg',
    '/assets/aistudio/swiss_alpine_chalet.jpg',
    '/assets/aistudio/cotswolds_manor_estate.jpg',
    '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
  ],
  'gifting-personal-milestones': [
    '/assets/aistudio/bond_street_jewellery.jpg',
    '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
    '/assets/aistudio/rare_cellar_vault.jpg',
    '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg',
  ],
  'private-office-adviser-liaison': [
    '/assets/aistudio/corporate_ea_boardroom.jpg',
    '/assets/aistudio/consortium_approach_board.jpg',
    '/assets/aistudio/consortium_privacy_vault.jpg',
    '/assets/aistudio/tglc_st_james_salon.jpg',
  ],

  // 7. Luxury Sourcing
  'fine-jewellery-watches': [
    '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
    '/assets/aistudio/private_horology_cleanroom.jpg',
    '/assets/aistudio/bond_street_jewellery.jpg',
    '/assets/aistudio/high_jewellery_vault.jpg',
  ],
  'art-collectible-design': [
    '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
    '/assets/aistudio/silvertown_silo_art.jpg',
    '/assets/aistudio/florence_palazzo_courtyard.jpg',
    '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg',
  ],
  'rare-wines-spirits': [
    '/assets/aistudio/rare_cellar_vault.jpg',
    '/assets/aistudio/dining_bespoke_cellar.jpg',
    '/assets/aistudio/spitalfields_crypt_exchange_1794391691802.jpg',
    '/assets/aistudio/lombard_bullion_vault.jpg',
  ],
  'automobiles-motoring': [
    '/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg',
    '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp',
    '/assets/aistudio/calendar_concours_blenheim.jpg',
    '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
  ],
  'bespoke-gifts-commissions': [
    '/assets/aistudio/savile_row_bespoke.jpg',
    '/assets/aistudio/savile_row_shears.jpg',
    '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg',
    '/assets/aistudio/high_jewellery_vault.jpg',
  ],
  'special-requests': [
    '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg',
    '/assets/aistudio/private_horology_cleanroom.jpg',
    '/assets/aistudio/bond_street_jewellery.jpg',
    '/assets/aistudio/consortium_network_global.jpg',
  ],
};

/**
 * Returns >= 5 unique, content-relevant hero image paths for a service category page.
 */
export function getServiceCategoryHeroSlides(service: ServiceCategory): string[] {
  const primary = [
    service.heroImage,
    ...(service.galleryImages || []),
    ...service.subServices.map((sub) => sub.image),
  ]
    .filter(Boolean)
    .map((image) => ({ image }));

  const fallback = (SERVICE_CATEGORY_EXTRA_IMAGES[service.id] || []).map((image) => ({ image }));

  return buildUniqueSlides(primary, fallback, 5)
    .slice(0, 6)
    .map((s) => s.image);
}

/**
 * Returns >= 5 unique, content-relevant hero image paths for a sub-service detail page.
 */
export function getSubServiceHeroSlides(
  subService: SubService,
  parentService: ServiceCategory
): string[] {
  const primary = [
    subService.image,
    ...(subService.galleryImages || []).map((g) => g.image),
  ]
    .filter(Boolean)
    .map((image) => ({ image }));

  const companion = (SUB_SERVICE_COMPANION_IMAGES[subService.id] || []).map((image) => ({
    image,
  }));

  const parentFallback = [
    parentService.heroImage,
    ...(parentService.galleryImages || []),
    ...(SERVICE_CATEGORY_EXTRA_IMAGES[parentService.id] || []),
  ]
    .filter(Boolean)
    .map((image) => ({ image }));

  return buildUniqueSlides(primary, [...companion, ...parentFallback], 5)
    .slice(0, 5)
    .map((s) => s.image);
}
