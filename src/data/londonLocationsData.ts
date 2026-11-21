import { LondonVenue } from '../utils/londonLocations';

export const LONDON_DISTRICTS = [
  {
    key: 'all',
    name: 'All Areas',
    shortName: 'All',
    vibe: 'Across London'
  },
  {
    key: 'mayfair-stjames',
    name: 'Mayfair & St James’s',
    shortName: 'Mayfair & St James’s',
    vibe: 'Art, tailoring and classic dining'
  },
  {
    key: 'knightsbridge-belgravia',
    name: 'Knightsbridge & Belgravia',
    shortName: 'Knightsbridge & Belgravia',
    vibe: 'Garden squares, shopping and quiet streets'
  },
  {
    key: 'marylebone-oxford',
    name: 'Marylebone & Oxford Street',
    shortName: 'Marylebone',
    vibe: 'Village streets, shopping and galleries'
  },
  {
    key: 'chelsea-southken',
    name: 'Chelsea & South Kensington',
    shortName: 'Chelsea & South Ken',
    vibe: 'Fashion, museums and leafy streets'
  },
  {
    key: 'soho-fitzrovia',
    name: 'Soho & Fitzrovia',
    shortName: 'Soho & Fitzrovia',
    vibe: 'Dining, music and late-night rooms'
  },
  {
    key: 'city-shoreditch',
    name: 'The City & Shoreditch',
    shortName: 'City & Shoreditch',
    vibe: 'Historic streets and creative spaces'
  },
  {
    key: 'wimbledon-richmond',
    name: 'Wimbledon & Richmond',
    shortName: 'Wimbledon & Richmond',
    vibe: 'Parks, sport and riverside walks'
  }
];

export const LONDON_LOCATIONS: LondonVenue[] = [
  {
    id: 'tglc-house',
    slug: 'tglc-house-albemarle-street',
    name: 'TGLC House — Albemarle Street',
    neighborhood: 'Mayfair',
    districtKey: 'mayfair-stjames',
    districtName: 'Mayfair & St James’s',
    category: 'Dining & Private Clubs',
    address: '3rd Floor, 45 Albemarle Street, Mayfair',
    postcode: 'W1S 4JL',
    coordinates: { x: 476, y: 274 },
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
    galleryImages: [
      '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
      '/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg'
    ],
    tagline: 'Our Mayfair office, by appointment',
    summary: 'Our office on Albemarle Street sits in the heart of Mayfair, close to Piccadilly and Bond Street.',
    curatorNotes: 'We welcome prospective members and clients for quiet meetings during office hours, Monday to Friday.',
    tglcPrivileges: [
      'Private meetings arranged in advance',
      'Central Mayfair location near Green Park',
      'Direct contact with your lifestyle manager'
    ],
    recommendedSeason: 'Year-round',
    insiderTip: 'Let us know before you visit so we can welcome you on arrival.',
    closestSanctuary: 'Green Park & Burlington Gardens'
  },
  {
    id: 'marylebone-shopping',
    slug: 'marylebone-private-shopping-district',
    name: 'Marylebone & Oxford Street Quarter',
    neighborhood: 'Marylebone',
    districtKey: 'marylebone-oxford',
    districtName: 'Marylebone & Oxford Street',
    category: 'Horology & Jewellery',
    address: 'Marylebone & Duke Street, London',
    postcode: 'W1U 1AA',
    coordinates: { x: 472, y: 216 },
    image: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
    galleryImages: [
      '/assets/aistudio/bond_street_jewellery.jpg',
      '/assets/aistudio/liberty-department-store-640x360_44860915.jpg'
    ],
    tagline: 'Independent boutiques, watches and relaxed streets',
    summary: 'Marylebone blends well-known department stores with calm village streets, independent shops and quiet cafes.',
    curatorNotes: 'We arrange personal shopping appointments and car transfers around your schedule, subject to availability.',
    tglcPrivileges: [
      'Private shopping appointments arranged in advance',
      'Quiet coffee stops and lunch tables nearby',
      'Door-to-door chauffeur support for your day'
    ],
    recommendedSeason: 'Spring and Autumn',
    insiderTip: 'Marylebone High Street is a calm contrast to busy Oxford Street.',
    closestSanctuary: 'Manchester Square'
  },
  {
    id: 'knightsbridge-quarter',
    slug: 'knightsbridge-shopping-and-stays',
    name: 'Knightsbridge & Brompton Road',
    neighborhood: 'Knightsbridge',
    districtKey: 'knightsbridge-belgravia',
    districtName: 'Knightsbridge & Belgravia',
    category: 'Department Stores & Penthouse Salons',
    address: 'Brompton Road, Knightsbridge',
    postcode: 'SW1X 7XL',
    coordinates: { x: 395, y: 352 },
    image: '/assets/aistudio/liberty-department-store-640x360_44860915.jpg',
    galleryImages: [
      '/assets/aistudio/bond_street_jewellery.jpg',
      '/assets/aistudio/savile_row_bespoke.jpg'
    ],
    tagline: 'Flagship shopping and quiet streets beside Hyde Park',
    summary: 'Knightsbridge brings together landmark shopping, international hotels and calm residential streets bordering Hyde Park.',
    curatorNotes: 'We help plan private appointments, hotel stays and dining across the area, subject to availability.',
    tglcPrivileges: [
      'Shopping appointments planned around your timing',
      'Hotel stays and dinner tables arranged together',
      'Chauffeur drop-offs away from main road traffic'
    ],
    recommendedSeason: 'Year-round',
    insiderTip: 'Step a few streets south for quieter cafes and leafy squares.',
    closestSanctuary: 'Hyde Park'
  },
  {
    id: 'wimbledon-village',
    slug: 'wimbledon-village-and-summer-tennis',
    name: 'Wimbledon Village & Summer Tennis',
    neighborhood: 'Wimbledon Village',
    districtKey: 'wimbledon-richmond',
    districtName: 'Wimbledon & Richmond',
    category: 'Sporting Heritage',
    address: 'Wimbledon Village, London',
    postcode: 'SW19 5AE',
    coordinates: { x: 232, y: 512 },
    image: '/assets/aistudio/wimbledon_centre_court_1794391696846.jpg',
    galleryImages: [
      '/assets/aistudio/mayfair_fine_dining.jpg',
      '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp'
    ],
    tagline: 'Summer tennis, village dining and open common land',
    summary: 'Wimbledon Village sits beside open parkland and hosts London’s most famous summer tennis tournament.',
    curatorNotes: 'We arrange hospitality, village dining and return cars during the tennis fortnight, subject to availability.',
    tglcPrivileges: [
      'Hospitality enquiries handled early in the season',
      'Chauffeur pick-up and drop-off planned around match times',
      'Village lunch and dinner bookings nearby'
    ],
    recommendedSeason: 'Summer',
    insiderTip: 'Book hospitality and travel well ahead of the tournament dates.',
    closestSanctuary: 'Wimbledon Common'
  },
  {
    id: 'burlington-arcade',
    slug: 'burlington-arcade-piccadilly',
    name: 'Burlington Arcade & Piccadilly',
    neighborhood: 'Mayfair',
    districtKey: 'mayfair-stjames',
    districtName: 'Mayfair & St James’s',
    category: 'Horology & Jewellery',
    address: 'Piccadilly, Mayfair',
    postcode: 'W1J 0QJ',
    coordinates: { x: 488, y: 288 },
    image: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
    galleryImages: [
      '/assets/aistudio/bond_street_jewellery.jpg',
      '/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg'
    ],
    tagline: 'Covered Georgian promenade for watches, leather and gifts',
    summary: 'This historic covered walkway links Piccadilly to Burlington Gardens and is known for vintage watches and classic gifts.',
    curatorNotes: 'We can arrange quiet visits with specialist dealers and watchmakers along the arcade, subject to availability.',
    tglcPrivileges: [
      'Introductions to vintage watch and leather specialists',
      'Gift sourcing and personal delivery arranged',
      'Easy walking distance from our Albemarle Street office'
    ],
    recommendedSeason: 'Year-round',
    insiderTip: 'Weekday mornings are the calmest time to browse the arcade.',
    closestSanctuary: 'Burlington Gardens'
  },
  {
    id: 'bond-street',
    slug: 'bond-street-mayfair',
    name: 'Old & New Bond Street',
    neighborhood: 'Mayfair',
    districtKey: 'mayfair-stjames',
    districtName: 'Mayfair & St James’s',
    category: 'Horology & Jewellery',
    address: 'Old & New Bond Street, Mayfair',
    postcode: 'W1S 2TE',
    coordinates: { x: 480, y: 248 },
    image: '/assets/aistudio/bond_street_jewellery.jpg',
    galleryImages: [
      '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
      '/assets/aistudio/tglc_st_james_salon.jpg'
    ],
    tagline: 'Jewellery houses, art galleries and fine watches',
    summary: 'Bond Street is London’s best-known address for fine jewellery, watches and international art galleries.',
    curatorNotes: 'We arrange private viewing appointments and coordinate deliveries cleanly, subject to availability.',
    tglcPrivileges: [
      'Private boutique appointments arranged ahead of time',
      'Gallery visits and exhibition planning',
      'Quiet lunch bookings on neighbouring Mayfair streets'
    ],
    recommendedSeason: 'Autumn and Winter',
    insiderTip: 'Side streets off Bond Street hold some of Mayfair’s best galleries.',
    closestSanctuary: 'Mount Street Gardens'
  },
  {
    id: 'savile-row',
    slug: 'savile-row-mayfair',
    name: 'Savile Row',
    neighborhood: 'Mayfair',
    districtKey: 'mayfair-stjames',
    districtName: 'Mayfair & St James’s',
    category: 'Arts & Antiquities',
    address: 'Savile Row, Mayfair',
    postcode: 'W1S 3PR',
    coordinates: { x: 494, y: 260 },
    image: '/assets/aistudio/savile_row_bespoke.jpg',
    galleryImages: [
      '/assets/aistudio/tglc_st_james_salon.jpg'
    ],
    tagline: 'London’s historic street of master tailors',
    summary: 'Savile Row is known around the world for hand-cut tailoring, fine British cloth and traditional craft.',
    curatorNotes: 'We introduce you to tailors that suit your style and arrange fittings at the shop or your home, subject to availability.',
    tglcPrivileges: [
      'Personal introductions to Savile Row houses',
      'Fitting schedules coordinated around your travel',
      'Eveningwear and seasonal wardrobe planning'
    ],
    recommendedSeason: 'Spring and Autumn',
    insiderTip: 'Allow time for multiple fittings when commissioning a new suit.',
    closestSanctuary: 'Burlington Gardens'
  },
  {
    id: 'mount-street',
    slug: 'mount-street-mayfair',
    name: 'Mount Street',
    neighborhood: 'Mayfair',
    districtKey: 'mayfair-stjames',
    districtName: 'Mayfair & St James’s',
    category: 'Dining & Private Clubs',
    address: 'Mount Street, Mayfair',
    postcode: 'W1K 2ST',
    coordinates: { x: 440, y: 254 },
    image: '/assets/aistudio/mayfair_fine_dining.jpg',
    galleryImages: [
      '/assets/aistudio/rare_cellar_vault.jpg'
    ],
    tagline: 'Mayfair dining, art and calm village streets',
    summary: 'Mount Street connects Berkeley Square and Grosvenor Square with classic architecture, dining rooms and independent shops.',
    curatorNotes: 'We arrange lunch, dinner and private rooms along Mount Street and nearby streets, subject to availability.',
    tglcPrivileges: [
      'Restaurant and private dining requests handled for you',
      'Quiet garden walks just behind the main street',
      'Evening car pick-up arranged smoothly'
    ],
    recommendedSeason: 'Year-round',
    insiderTip: 'Mount Street Gardens behind the church is one of Mayfair’s quietest spots.',
    closestSanctuary: 'Mount Street Gardens'
  },
  {
    id: 'belgravia-squares',
    slug: 'belgravia-squares-and-mews',
    name: 'Belgravia Squares & Mews',
    neighborhood: 'Belgravia',
    districtKey: 'knightsbridge-belgravia',
    districtName: 'Knightsbridge & Belgravia',
    category: 'Private Residences & Mews',
    address: 'Belgravia, London',
    postcode: 'SW1X 7RL',
    coordinates: { x: 410, y: 334 },
    image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
    galleryImages: [
      '/assets/aistudio/01-Lethbridge-House-20-Cornwall-Terrace-Marylebone-London-UK-640x360_b59e806c.jpg'
    ],
    tagline: 'White-stucco crescents and quiet residential mews',
    summary: 'Belgravia is prized for its calm garden squares, cobbled mews houses and village-like pace in central London.',
    curatorNotes: 'We help with property searches, household support and stays across Belgravia, subject to availability.',
    tglcPrivileges: [
      'Introductions to trusted property search agents',
      'Home preparation and household support',
      'Quiet local dining on Elizabeth Street'
    ],
    recommendedSeason: 'Spring and Summer',
    insiderTip: 'Elizabeth Street offers a relaxed neighbourhood feel minutes from Victoria.',
    closestSanctuary: 'Belgrave Square'
  },
  {
    id: 'manchester-square',
    slug: 'manchester-square-marylebone',
    name: 'Manchester Square & Marylebone',
    neighborhood: 'Marylebone',
    districtKey: 'marylebone-oxford',
    districtName: 'Marylebone & Oxford Street',
    category: 'Arts & Antiquities',
    address: 'Manchester Square, Marylebone',
    postcode: 'W1U 3BN',
    coordinates: { x: 454, y: 194 },
    image: '/assets/aistudio/royal_opera_gallery.jpg',
    galleryImages: [
      '/assets/aistudio/01-Lethbridge-House-20-Cornwall-Terrace-Marylebone-London-UK-640x360_b59e806c.jpg'
    ],
    tagline: 'Historic Georgian square and fine art collections',
    summary: 'Manchester Square is a peaceful Georgian square in Marylebone, home to historic architecture and renowned public art collections.',
    curatorNotes: 'We arrange guided cultural visits and nearby dining for quiet afternoons in Marylebone, subject to availability.',
    tglcPrivileges: [
      'Private guided visits arranged with art specialists',
      'Relaxed lunch and tea bookings nearby',
      'Easy access to Marylebone High Street'
    ],
    recommendedSeason: 'Year-round',
    insiderTip: 'Pair a morning gallery visit with lunch on nearby Chiltern Street.',
    closestSanctuary: 'Manchester Square Gardens'
  },
  {
    id: 'sloane-street',
    slug: 'sloane-street-chelsea',
    name: 'Sloane Street & Chelsea',
    neighborhood: 'Chelsea',
    districtKey: 'chelsea-southken',
    districtName: 'Chelsea & South Kensington',
    category: 'Department Stores & Penthouse Salons',
    address: 'Sloane Street, Chelsea',
    postcode: 'SW1X 9LA',
    coordinates: { x: 345, y: 390 },
    image: '/assets/aistudio/savile_row_bespoke.jpg',
    galleryImages: [
      '/assets/aistudio/bond_street_jewellery.jpg'
    ],
    tagline: 'International fashion houses and leafy Chelsea streets',
    summary: 'Linking Knightsbridge to Sloane Square, Sloane Street combines major fashion houses with quiet residential gardens.',
    curatorNotes: 'We coordinate private boutique appointments and Chelsea dining around your day, subject to availability.',
    tglcPrivileges: [
      'Fashion appointments arranged ahead of your visit',
      'Personal shopping and home delivery support',
      'Local cafes and restaurants near Sloane Square'
    ],
    recommendedSeason: 'Spring and Autumn',
    insiderTip: 'Pavilion Road just behind Sloane Street is full of independent food shops.',
    closestSanctuary: 'Cadogan Place Gardens'
  },
  {
    id: 'south-kensington',
    slug: 'south-kensington-museum-quarter',
    name: 'South Kensington Museum Quarter',
    neighborhood: 'South Kensington',
    districtKey: 'chelsea-southken',
    districtName: 'Chelsea & South Kensington',
    category: 'Arts & Antiquities',
    address: 'Cromwell Road, South Kensington',
    postcode: 'SW7 2RL',
    coordinates: { x: 305, y: 375 },
    image: '/assets/aistudio/royal_opera_gallery.jpg',
    galleryImages: [
      '/assets/aistudio/florence_palazzo_courtyard.jpg'
    ],
    tagline: 'Major museums, design exhibitions and family culture',
    summary: 'South Kensington brings together London’s major art, design and science museums alongside leafy residential streets.',
    curatorNotes: 'We organise exhibition tickets, guided tours and family-friendly dining nearby, subject to availability.',
    tglcPrivileges: [
      'Exhibition planning and private guide introductions',
      'Family itineraries arranged from start to finish',
      'Nearby hotel and restaurant recommendations'
    ],
    recommendedSeason: 'Autumn and Winter',
    insiderTip: 'Early weekday mornings offer the quietest gallery visits.',
    closestSanctuary: 'Kensington Gardens'
  },
  {
    id: 'soho-salons',
    slug: 'soho-dining-and-music',
    name: 'Dean Street & Soho',
    neighborhood: 'Soho',
    districtKey: 'soho-fitzrovia',
    districtName: 'Soho & Fitzrovia',
    category: 'Dining & Private Clubs',
    address: 'Dean Street & Greek Street, Soho',
    postcode: 'W1D 4QJ',
    coordinates: { x: 535, y: 242 },
    image: '/assets/aistudio/meard_poker_sanctum.jpg',
    galleryImages: [
      '/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg',
      '/assets/aistudio/urban_vinyl_booth_deep.jpg'
    ],
    tagline: 'Late-night dining, live jazz and creative clubs',
    summary: 'Soho’s Georgian streets are home to independent restaurants, live jazz rooms, screening venues and late-night bars.',
    curatorNotes: 'We arrange tables, private dining rooms and late cars across Soho, subject to availability.',
    tglcPrivileges: [
      'Dinner tables and private rooms arranged for you',
      'Live music and late-night venue recommendations',
      'Chauffeur collection planned for the end of your night'
    ],
    recommendedSeason: 'Year-round',
    insiderTip: 'Soho comes alive after theatre curtain-down.',
    closestSanctuary: 'Soho Square'
  },
  {
    id: 'city-bank',
    slug: 'the-city-and-royal-exchange',
    name: 'The City & Bank',
    neighborhood: 'The City',
    districtKey: 'city-shoreditch',
    districtName: 'The City & Shoreditch',
    category: 'Horology & Jewellery',
    address: 'Bank, City of London',
    postcode: 'EC3V 3LR',
    coordinates: { x: 720, y: 268 },
    image: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg',
    galleryImages: [
      '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg'
    ],
    tagline: 'Historic architecture, business lunches and skyline dining',
    summary: 'The City pairs centuries-old stone landmarks with modern skyline dining and quiet private meeting rooms.',
    curatorNotes: 'We arrange executive dining, private rooms and airport transfers across the City, subject to availability.',
    tglcPrivileges: [
      'Business breakfast and private lunch bookings',
      'Executive car transfers to and from London airports',
      'Evening dining with views over the skyline'
    ],
    recommendedSeason: 'Year-round',
    insiderTip: 'Weekend mornings offer peaceful walks through historic City lanes.',
    closestSanctuary: 'St Paul’s Churchyard'
  },
  {
    id: 'richmond-park',
    slug: 'richmond-park-and-petersham',
    name: 'Richmond & Petersham',
    neighborhood: 'Richmond',
    districtKey: 'wimbledon-richmond',
    districtName: 'Wimbledon & Richmond',
    category: 'Sporting Heritage',
    address: 'Richmond-upon-Thames, London',
    postcode: 'TW10 7AA',
    coordinates: { x: 140, y: 470 },
    image: '/assets/aistudio/cotswolds_manor_estate.jpg',
    galleryImages: [
      '/assets/aistudio/highland_stone_estate_1794391698042.jpg'
    ],
    tagline: 'Open deer park, riverside meadows and relaxed weekend dining',
    summary: 'Richmond brings country calm to southwest London, with ancient woodland, deer parks and peaceful Thameside walks.',
    curatorNotes: 'We arrange weekend lunches, river boat trips and outdoor days out in Richmond, subject to availability.',
    tglcPrivileges: [
      'Relaxed riverside lunch and garden dining bookings',
      'Private river boat trips arranged from Richmond',
      'Easy chauffeur day trips from central London'
    ],
    recommendedSeason: 'Spring to Autumn',
    insiderTip: 'Richmond Hill offers one of the finest river views in London.',
    closestSanctuary: 'Isabella Plantation'
  }
];
