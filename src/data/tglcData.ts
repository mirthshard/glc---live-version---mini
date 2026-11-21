import { TeamMember, ServiceCategory, CalendarEvent, JournalArticle, FAQItem } from '../types';

export const TGLC_CONTACT = {
  houseName: 'TGLC House',
  companyNumber: '16831098',
  address: Object.assign(
    '3rd Floor, 45 Albemarle Street, London W1S 4JL',
    {
      street: '3rd Floor, 45 Albemarle Street',
      area: 'Mayfair',
      postcode: 'W1S 4JL',
      city: 'London',
      country: 'United Kingdom',
      toString: () => '3rd Floor, 45 Albemarle Street, London W1S 4JL'
    }
  ),
  phone: '020 3951 6369',
  telephone: '020 3951 6369',
  privateMemberLine: '020 3951 6369',
  internationalPhone: '+44 (0)20 3951 6369',
  email: 'info@thegloballuxuryconsortium.com',
  memberSupport: 'info@thegloballuxuryconsortium.com',
  instagram: '@thegloballuxuryconsortium',
  linkedIn: 'The Global Luxury Consortium',
  domain: 'thegloballuxuryconsortium.com',
  hours: 'Monday – Friday, 08:30 – 19:30'
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Mickell Washington',
    role: 'Founder & Managing Director',
    title: 'Founder & Managing Director',
    initials: 'MW',
    bio: 'Founder of TGLC. Mickell leads client relationships and our partner network, with a focus on hospitality and private requests.',
    specialism: 'Client relationships, hospitality and private requests',
    location: 'Mayfair, London',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-11_at_21.17.07_2194679c.jpeg'
  },
  {
    name: 'Leance Djedje',
    role: 'International Client Liaison',
    title: 'International Client Liaison',
    initials: 'LD',
    bio: 'Looks after international clients, sporting hospitality and events. Known for warmth and close attention to detail.',
    specialism: 'International clients, sporting hospitality and events',
    location: 'London',
    image: ''
  },
  {
    name: 'Melize Nastaasia',
    role: 'Executive Coordination & Corporate Clients',
    title: 'Executive Coordination & Corporate Clients',
    initials: 'MN',
    bio: 'Leads corporate clients, executive travel and accommodation. Specialises in connecting London and Southeast Asia.',
    specialism: 'Corporate clients, executive travel and accommodation',
    location: 'London',
    image: ''
  }
];

export const TGLC_TEAM = TEAM_MEMBERS;

export const ETHOS_PRINCIPLES = [
  {
    number: '01',
    title: 'Discretion comes first.',
    summary: 'Everything you share stays strictly within the small team looking after you. We never name members, never seek publicity and never share more than a supplier genuinely needs.'
  },
  {
    number: '02',
    title: 'Relationships open doors.',
    summary: 'Meaningful access is never bought from a directory — it comes from years of quiet trust with restaurant directors, hoteliers, makers and private hosts who pick up our calls.'
  },
  {
    number: '03',
    title: 'Taste is deeply personal.',
    summary: 'No two members share the same idea of a great evening or holiday. We listen carefully to what genuinely delights you and build every recommendation from scratch around your rhythm.'
  },
  {
    number: '04',
    title: 'Small details keep life calm.',
    summary: 'Checking room locations, flight timings, dietary notes and quiet venue entrances before you ever step outside is what separates an ordinary booking from an effortless day.'
  },
  {
    number: '05',
    title: 'The finest service feels weightless.',
    summary: 'Our job is to absorb the chasing, follow-ups and sudden changes quietly behind the scenes — so you notice only how smoothly your time unfolds.'
  }
];

export const APPROACH_STEPS = [
  {
    step: '01',
    title: 'Start with a brief note or call',
    description: 'Send a short enquiry online or call our Mayfair desk directly on Albemarle Street — no lengthy forms, just a straightforward first hello.'
  },
  {
    step: '02',
    title: 'A quiet, private conversation',
    description: 'We meet in person at our Mayfair office or on a brief call to understand how you travel, who is in your household and where we can take pressure off your week.'
  },
  {
    step: '03',
    title: 'A clear, tailored proposal',
    description: 'We recommend the membership structure that genuinely fits your lifestyle and set out every term and fee plainly in writing — with zero pressure.'
  },
  {
    step: '04',
    title: 'Your dedicated lifestyle manager begins',
    description: 'Once welcomed, you have a named point of contact who learns your preferences from day one and takes the friction out of every plan ahead.'
  }
];

export const LONDON_NEIGHBOURHOODS = [
  {
    name: 'Mayfair & St James’s',
    vibe: 'Heritage, Art & Tailoring',
    summary: 'Our home neighbourhood, known for Georgian streets, art galleries and traditional tailoring.',
    highlights: [
      'Historic streets around Albemarle Street and Pall Mall',
      'Independent galleries and auction rooms nearby',
      'Quiet garden squares and classic dining rooms'
    ],
    image: '/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg'
  },
  {
    name: 'Belgravia & Knightsbridge',
    vibe: 'Garden Squares & Quiet Streets',
    summary: 'White-stucco squares, peaceful mews houses and leafy streets beside Hyde Park.',
    highlights: [
      'Quiet residential squares and mews lanes',
      'Independent boutiques and village cafes',
      'Tree-lined walks beside Hyde Park'
    ],
    image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp'
  },
  {
    name: 'The City, Southwark & Bankside',
    vibe: 'Skyline Views & Riverside Life',
    summary: 'Historic City streets meet riverside galleries, modern architecture and Thames views.',
    highlights: [
      'Views across the Thames and Tower Bridge',
      'Modern skyline restaurants and riverside walks',
      'Historic lanes and cultural landmarks'
    ],
    image: '/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg'
  },
  {
    name: 'Regent’s Park & Marylebone',
    vibe: 'Classical Terraces & Village Calm',
    summary: 'Grand terraces, a relaxed high street and quiet green spaces north of Oxford Street.',
    highlights: [
      'Tree-lined paths across Regent’s Park',
      'Independent bookshops and cafes on Marylebone High Street',
      'Classical architecture and calm residential streets'
    ],
    image: '/assets/aistudio/01-Lethbridge-House-20-Cornwall-Terrace-Marylebone-London-UK-640x360_b59e806c.jpg'
  },
  {
    name: 'Soho & Covent Garden',
    vibe: 'Theatre, Music & Late Nights',
    summary: 'Lively central streets filled with theatres, live music, dining and late-night rooms.',
    highlights: [
      'West End theatres and live performance venues',
      'Independent dining rooms and jazz cellars',
      'Historic squares and vibrant evening streets'
    ],
    image: '/assets/aistudio/liberty-department-store-640x360_44860915.jpg'
  },
  {
    name: 'The English Countryside',
    vibe: 'Cotswolds, Sussex & Hampshire',
    summary: 'Rolling hills, stone villages and peaceful country retreats within easy reach of London.',
    highlights: [
      'Georgian country houses and stone villages',
      'Quiet rural walks and traditional country inns',
      'Historic gardens and riverside weekends'
    ],
    image: '/assets/aistudio/cotswolds_manor_estate.jpg'
  }
];

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'travel-aviation',
    title: 'Travel & Aviation',
    tagline: 'Every mile thoughtfully connected.',
    shortDesc: 'Private aviation, flagship hotel suites, staffed coastal villas and yacht charters coordinated seamlessly from your front door to your destination.',
    highlights: [
      'Private jets and helicopters',
      'Hotels, villas and private homes',
      'Yacht holidays',
      'Airport and ground transfers'
    ],
    heroImage: '/assets/aistudio/private_jet_interior_suite.jpg',
    galleryImages: [
      '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
      '/assets/aistudio/6a5e4f29ca98c820c85071cd_file_l7dpoy6z_91be91a5.png',
      '/assets/aistudio/swiss_alpine_chalet.jpg',
      '/assets/aistudio/mediterranean_superyacht_deck.jpg'
    ],
    galleryCaptions: [
      'Private aircraft prepared for departure',
      'Quiet boarding ahead of a European flight',
      'Alpine chalet ready for winter arrival',
      'Sunlit yacht deck on calm coastal waters'
    ],
    subServices: [
      {
        id: 'private-aviation',
        title: 'Private Aviation',
        shortDesc: 'Private jets and helicopters arranged around your schedule.',
        leadParagraph: 'We arrange private jets and helicopters for business trips, family holidays and short-notice travel. You tell us where and when, and we coordinate the flight and ground transfers.',
        detailedPoints: [
          'Private jet and helicopter bookings',
          'Flexible departure times and routing',
          'Airport transfers at both ends',
          'Onboard catering to your taste'
        ],
        example: 'For example, we can arrange a morning flight to Europe with cars waiting at both ends.',
        image: '/assets/aistudio/6a194620490b49214619b628_file_8wpx83o3_8d7f9f53.png',
        galleryImages: [
          {
            image: '/assets/aistudio/6a5e4f29ca98c820c85071cd_file_l7dpoy6z_91be91a5.png',
            caption: 'Aircraft ready on a quiet ramp'
          },
          {
            image: '/assets/aistudio/luxury_sprinter_jetvan.jpg',
            caption: 'Chauffeur vehicle waiting for arrival'
          }
        ],
        faqs: [
          {
            q: 'Can you help with short-notice flights?',
            a: 'Yes, we check available aircraft quickly and share clear options. Availability depends on routing and timing.'
          },
          {
            q: 'Do you arrange airport transfers too?',
            a: 'Yes. We line up drivers on both sides so your journey runs smoothly.'
          }
        ],
        regulatoryNote: 'Flights are operated by licensed independent operators.'
      },
      {
        id: 'bespoke-travel-design',
        title: 'Bespoke Travel Design',
        shortDesc: 'Tailored holidays and multi-stop trips planned around how you travel.',
        leadParagraph: 'We plan holidays, city breaks and multi-stop journeys shaped around your pace and interests. One team manages flights, stays, tables and local guides so you can relax.',
        detailedPoints: [
          'Multi-stop holiday planning',
          'Local guides and private visits',
          'Dining and activity bookings',
          'Clear day-by-day travel notes'
        ],
        example: 'For example, we can plan a relaxed family trip across Italy with stays and drivers sorted.',
        image: '/assets/aistudio/florence_palazzo_courtyard.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/swiss_alpine_chalet.jpg',
            caption: 'Quiet mountain stay in winter'
          },
          {
            image: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg',
            caption: 'Intimate counter dining on the road'
          }
        ],
        faqs: [
          {
            q: 'Can we change plans during a trip?',
            a: 'Of course. Tell us what changed and we adjust bookings for you.'
          },
          {
            q: 'Do you plan family trips as well?',
            a: 'Yes. We design trips that work comfortably for adults and children alike.'
          }
        ]
      },
      {
        id: 'hotels-villas-residences',
        title: 'Hotels, Villas & Private Homes',
        shortDesc: 'Trusted hotels, villas, chalets and private stays around the world.',
        leadParagraph: 'We find and book hotels, villas, chalets and private homes that fit how you like to stay. We pass on your preferences ahead of arrival so everything feels ready.',
        detailedPoints: [
          'Hotel rooms and private suites',
          'Seasonal villas and ski chalets',
          'Pre-arrival room and pantry requests',
          'Private check-in where available'
        ],
        example: 'For example, we can find a quiet villa for summer with kitchen supplies ready on arrival.',
        image: '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/cotswolds_manor_estate.jpg',
            caption: 'Countryside house set in quiet grounds'
          },
          {
            image: '/assets/aistudio/florence_palazzo_courtyard.jpg',
            caption: 'Historic courtyard stay in Europe'
          }
        ],
        faqs: [
          {
            q: 'Can you request specific rooms or views?',
            a: 'Yes. We share your preferences directly with the property, subject to availability.'
          },
          {
            q: 'Do you arrange private chefs for villas?',
            a: 'Yes, we can introduce local chefs and household staff for your stay.'
          }
        ]
      },
      {
        id: 'yachts-coastal-escapes',
        title: 'Yachts & Coastal Escapes',
        shortDesc: 'Yacht holidays, day boats and coastal trips planned with care.',
        leadParagraph: 'We help arrange yacht holidays and coastal day trips across warm-water and island destinations. We handle the itinerary, moorings and onboard preferences so your time at sea stays simple.',
        detailedPoints: [
          'Weekly yacht holidays and day boats',
          'Route and anchorage planning',
          'Food and drink preferences onboard',
          'Port transfers and coastal dining'
        ],
        example: 'For example, we can arrange a week cruising between islands with lunch spots booked ashore.',
        image: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/mediterranean_superyacht_deck.jpg',
            caption: 'Open deck overlooking calm blue water'
          },
          {
            image: '/assets/aistudio/mayfair_fine_dining.jpg',
            caption: 'Evening table booked near the harbour'
          }
        ],
        faqs: [
          {
            q: 'When should we enquire about summer boats?',
            a: 'Earlier gives you wider choice, though we also help with shorter-notice requests.'
          },
          {
            q: 'Can you organise day boats only?',
            a: 'Yes. We arrange single-day outings as well as longer trips.'
          }
        ]
      },
      {
        id: 'global-mobility-logistics',
        title: 'Global Travel Logistics',
        shortDesc: 'Smooth airport assistance, luggage handling and multi-leg travel support.',
        leadParagraph: 'We coordinate the practical parts of travel, from airport meet-and-greet to luggage forwarding and complex schedules. Everything sits under one point of contact so nothing slips through.',
        detailedPoints: [
          'Airport meet-and-greet assistance',
          'Luggage shipping ahead of arrival',
          'Coordinated flights and ground cars',
          'Support when schedules shift'
        ],
        example: 'For example, we can send luggage ahead and have a driver waiting when your flight lands.',
        image: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
        galleryImages: [
          {
            image: '/assets/aistudio/luxury_sprinter_jetvan.jpg',
            caption: 'Spacious vehicle for group airport transfers'
          },
          {
            image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg',
            caption: 'Careful handling for travel luggage'
          }
        ],
        faqs: [
          {
            q: 'Can you help with commercial flights too?',
            a: 'Yes. We arrange commercial bookings alongside meet-and-greet and car transfers.'
          },
          {
            q: 'Do you coordinate travel for assistants or family?',
            a: 'Yes. We can manage linked itineraries for everyone travelling together.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Can you manage an entire trip from one message?',
        answer: 'Yes. Share your dates and preferences, and we put together flights, stays, transfers and dining in one place.'
      },
      {
        question: 'Do you work with both private and commercial flights?',
        answer: 'Yes. We arrange private aircraft through licensed operators as well as commercial flights and airport assistance.'
      },
      {
        question: 'What happens if my travel plans change?',
        answer: 'Let your lifestyle manager know and we will update your flights, cars and hotels for you.'
      },
      {
        question: 'Do you arrange hotels, villas and private homes abroad?',
        answer: 'Yes. We source city suites, alpine chalets and coastal villas through trusted international partners, subject to availability.'
      },
      {
        question: 'Can you coordinate airport assistance and ground transfers?',
        answer: 'Yes. We line up meet-and-greet support and private drivers at both departure and arrival airports.'
      },
      {
        question: 'How do yacht bookings work through TGLC?',
        answer: 'We introduce licensed brokers, compare suitable vessels and handle cruising itineraries, provisioning and shore transfers.'
      },
      {
        question: 'Can you plan multi-stop trips for families or groups?',
        answer: 'Yes. We build clear day-by-day itineraries covering connecting rooms, family activities and private guides.'
      },
      {
        question: 'Can you help with short-notice flights or stays?',
        answer: 'Often, yes. Tell us your dates and route, and we will share honest options quickly, subject to availability.'
      },
      {
        question: 'Do you remember seat, aircraft and hotel preferences?',
        answer: 'Yes. Once you share how you like to travel, we keep those details on file for future bookings.'
      },
      {
        question: 'Can my personal assistant coordinate travel directly with you?',
        answer: 'Yes. We regularly work alongside personal assistants and family offices to keep travel notes accurate.'
      }
    ]
  },
  {
    id: 'dining-nightlife',
    title: 'Dining, Nightlife & Social Access',
    tagline: 'The right table, for the right company.',
    shortDesc: 'Sought-after London restaurants, candlelit private dining rooms, members’ club guidance and late-night rooms shaped around your evening.',
    highlights: [
      'Restaurant reservations',
      'Private dining and celebrations',
      "Members' club introductions",
      'London after dark'
    ],
    heroImage: '/assets/aistudio/dining_bespoke_cellar.jpg',
    galleryImages: [
      '/assets/aistudio/rare_cellar_vault.jpg',
      '/assets/aistudio/fitzrovia_absinthe_salon_1794391690208.jpg',
      '/assets/aistudio/Copper-Club_b58a00e9.jpg'
    ],
    galleryCaptions: [
      'Quiet cellar table set for private dining',
      'Intimate late-evening cocktail room in London',
      'Warm restaurant dining room in central London'
    ],
    subServices: [
      {
        id: 'london-dining',
        title: 'London Dining',
        shortDesc: 'Tables across Mayfair, Soho and central London.',
        leadParagraph: 'We help secure tables at sought-after restaurants across Mayfair, St James’s and wider London, subject to availability. Tell us the mood and dietary notes, and we handle the booking.',
        detailedPoints: [
          'Lunch and dinner table bookings',
          'Mayfair and central London focus',
          'Dietary needs shared in advance',
          'Quiet tables for business lunches'
        ],
        example: 'For example, we can recommend and book a quiet Mayfair table for an unhurried client lunch.',
        image: '/assets/aistudio/Copper-Club_b58a00e9.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/mayfair_fine_dining.jpg',
            caption: 'Warm dining room in Mayfair'
          },
          {
            image: '/assets/aistudio/rare_cellar_vault.jpg',
            caption: 'Private wine room for small dinners'
          }
        ],
        faqs: [
          {
            q: 'Can you help with last-minute dinner plans?',
            a: 'Yes, we check what is open right away and suggest strong alternatives, subject to availability.'
          },
          {
            q: 'Can you recommend places to match a mood?',
            a: 'Yes. Tell us who you are hosting and we will suggest fitting rooms.'
          }
        ]
      },
      {
        id: 'private-dining-celebrations',
        title: 'Private Dining & Celebrations',
        shortDesc: 'Private rooms, menus and hosting for dinners and milestones.',
        leadParagraph: 'We find private dining rooms and coordinate menus, wine and seating for dinners and celebrations. You focus on your guests while we manage the venue details.',
        detailedPoints: [
          'Private dining room searches',
          'Set menus and wine guidance',
          'Table layout and flowers arranged',
          'Discreet hosting and billing setup'
        ],
        example: 'For example, we can arrange a private room in Mayfair with a tailored menu for a birthday.',
        image: '/assets/aistudio/tglc_st_james_salon.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/subrosa_catacomb_dinner.jpg',
            caption: 'Candlelit room set for private dinner'
          },
          {
            image: '/assets/aistudio/rare_cellar_vault.jpg',
            caption: 'Intimate table surrounded by wine racks'
          }
        ],
        faqs: [
          {
            q: 'Can you arrange private chefs at home?',
            a: 'Yes. We can introduce private chefs and waiting staff for dinners at home.'
          },
          {
            q: 'Can bills be settled discreetly?',
            a: 'Where venues allow, we arrange payment in advance so no bill reaches the table.'
          }
        ]
      },
      {
        id: 'members-clubs-introductions',
        title: 'Members’ Clubs & Introductions',
        shortDesc: 'Guidance on London members’ clubs where rules allow.',
        leadParagraph: 'We guide you on London’s private members’ clubs and help with guest access or applications where possible. Every visit follows each club’s own rules and availability.',
        detailedPoints: [
          'Advice on clubs that suit you',
          'Guest bookings where rules allow',
          'Guidance on membership applications',
          'Evening hosting and dining support'
        ],
        example: 'For example, we can suggest clubs that match your interests and guide you on joining.',
        image: '/assets/aistudio/meard_poker_sanctum.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/tglc_st_james_salon.jpg',
            caption: 'Quiet sitting room in central London'
          },
          {
            image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
            caption: 'Late-evening music room in Soho'
          }
        ],
        faqs: [
          {
            q: 'Can you get me into any club?',
            a: 'No. Every club sets its own membership and guest rules, and access is always subject to availability.'
          },
          {
            q: 'Do you help with club applications?',
            a: 'We explain how different clubs work and help you prepare where appropriate.'
          }
        ]
      },
      {
        id: 'nightlife-after-dark',
        title: 'Nightlife & After Dark',
        shortDesc: 'Bars, lounges, live music and late tables in London.',
        leadParagraph: 'We arrange late tables, cocktail bars, lounges and live music spots across central and east London. We plan the flow of the night and your car home.',
        detailedPoints: [
          'Cocktail bars and late lounges',
          'Live music and DJ venues',
          'Table reservations subject to availability',
          'Chauffeur waiting for the journey home'
        ],
        example: 'For example, we can line up dinner, a late music bar and a car home.',
        image: '/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
            caption: 'Late-night club atmosphere in London'
          },
          {
            image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
            caption: 'Intimate live jazz performance at night'
          }
        ],
        faqs: [
          {
            q: 'Can you plan a whole evening out?',
            a: 'Yes. We can link dinner, drinks, music and cars into one smooth plan.'
          },
          {
            q: 'Do you cover east London as well as Mayfair?',
            a: 'Yes. We know venues across Mayfair, Soho, Shoreditch and wider London.'
          }
        ]
      },
      {
        id: 'global-dining-culinary',
        title: 'Global Dining Travel',
        shortDesc: 'Memorable restaurants and food trips when travelling abroad.',
        leadParagraph: 'We book standout restaurants and local food experiences when you travel for work or leisure. You receive trusted recommendations without spending hours researching.',
        detailedPoints: [
          'International restaurant bookings',
          'Food-focused weekend planning',
          'Vineyard and tasting visits',
          'Local neighbourhood dining tips'
        ],
        example: 'For example, we can build a short dining list for a weekend in Paris or Tokyo.',
        image: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/florence_palazzo_courtyard.jpg',
            caption: 'Long lunch in a European courtyard'
          },
          {
            image: '/assets/aistudio/rare_cellar_vault.jpg',
            caption: 'Private tasting in a wine cellar'
          }
        ],
        faqs: [
          {
            q: 'Which cities do you cover?',
            a: 'We help across major European, American and Asian cities through our network.'
          },
          {
            q: 'How far ahead should I ask?',
            a: 'The earlier the better for sought-after restaurants, as reservations are subject to availability.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Can you always get a table at fully booked restaurants?',
        answer: 'We cannot promise any specific table, as bookings are always subject to availability. We use our contacts to give you the best chance and suggest great alternatives.'
      },
      {
        question: 'Can you plan private dinners for work or family?',
        answer: 'Yes. We find the right room, coordinate menus and handle timing so hosting feels effortless.'
      },
      {
        question: 'Do you remember dietary needs and seating preferences?',
        answer: 'Yes. Once you share your preferences, we keep them in mind for future bookings.'
      },
      {
        question: 'Can you help with members’ club introductions?',
        answer: 'We can advise on suitable clubs and help with guest access where permitted. Full membership is always decided by each club.'
      },
      {
        question: 'Do you arrange dining outside London as well?',
        answer: 'Yes. We book restaurants, wine tastings and private dining rooms across Europe and major international cities.'
      },
      {
        question: 'Can you suggest places when I am unsure where to go?',
        answer: 'Yes. Tell us the neighbourhood, mood and guest count, and we will suggest a shortlist that fits.'
      },
      {
        question: 'How do late-night venues and music rooms work?',
        answer: 'We arrange tables at trusted London bars, jazz cellars and late-night rooms, subject to venue policy and availability.'
      },
      {
        question: 'Can you arrange private chefs at home or in a villa?',
        answer: 'Yes. We introduce experienced private chefs and service staff for dinners at your London residence or abroad.'
      },
      {
        question: 'Can you coordinate cars and discreet arrivals for the evening?',
        answer: 'Yes. We can pair your reservation with a chauffeur so arrivals and late pickups run calmly.'
      },
      {
        question: 'How much notice should I give for busy London weekends?',
        answer: 'A few days helps for popular dining rooms, though we always check late availability whenever plans arise.'
      }
    ]
  },
  {
    id: 'experiences-culture',
    title: 'Experiences, Culture & Entertainment',
    tagline: 'Access that feels unhurried and personal.',
    shortDesc: 'Official hospitality at flagship sporting fixtures, private gallery viewings, West End nights and unhurried Savile Row shopping.',
    highlights: [
      'Major sporting events',
      'Concerts, theatre and opera',
      'Art and private shopping',
      'Birthdays and family trips'
    ],
    heroImage: '/assets/aistudio/royal_opera_box_1794391694654.jpg',
    galleryImages: [
      '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
      '/assets/aistudio/ufc_arena_ringside.jpg',
      '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
      '/assets/aistudio/royal_opera_gallery.jpg'
    ],
    galleryCaptions: [
      'Contemporary art fair pavilion in London',
      'Live arena sport with close-up views',
      'Evening music space in east London',
      'Grand gallery hall before an evening performance'
    ],
    subServices: [
      {
        id: 'art-design-collecting',
        title: 'Art, Design & Collecting',
        shortDesc: 'Gallery visits, art fairs and specialist introductions.',
        leadParagraph: 'We arrange gallery visits, art fair trips like Frieze and introductions to independent art advisers. Whether you are browsing or collecting, we plan your day cleanly.',
        detailedPoints: [
          'Art fair tickets subject to availability',
          'Private gallery viewings arranged',
          'Introductions to independent art advisers',
          'Studio visits where open to guests'
        ],
        example: 'For example, we can plan a day around Frieze with gallery stops and lunch nearby.',
        image: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/royal_opera_gallery.jpg',
            caption: 'Quiet viewing inside a London gallery'
          },
          {
            image: '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg',
            caption: 'Collectible design in a private interior'
          }
        ],
        faqs: [
          {
            q: 'Do I need to be an experienced collector?',
            a: 'Not at all. We help both first-time buyers and seasoned collectors.'
          },
          {
            q: 'Can you arrange art shipping and framing?',
            a: 'Yes. We introduce specialist art handlers and framers.'
          }
        ]
      },
      {
        id: 'music-theatre-performance',
        title: 'Music, Theatre & Performance',
        shortDesc: 'Seats and hospitality for concerts, theatre and opera.',
        leadParagraph: 'We help source seats and hospitality for concerts, theatre, opera and ballet, subject to availability. We also pair your tickets with pre-show dinner and cars.',
        detailedPoints: [
          'Concert and arena seat sourcing',
          'West End theatre and opera bookings',
          'Pre-theatre dining arranged nearby',
          'Chauffeur drop-off and collection'
        ],
        example: 'For example, we can arrange opera seats, an early supper nearby and a car home.',
        image: '/assets/aistudio/royal_opera_box_1794391694654.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
            caption: 'Intimate live music performance'
          },
          {
            image: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
            caption: 'Private music set in east London'
          }
        ],
        faqs: [
          {
            q: 'Can you help with sold-out concerts?',
            a: 'We check trusted ticket and hospitality channels, always subject to availability.'
          },
          {
            q: 'Can you organise group hospitality suites?',
            a: 'Yes. We can arrange private boxes or suites for family or clients, subject to availability.'
          }
        ]
      },
      {
        id: 'fashion-private-shopping',
        title: 'Fashion & Private Shopping',
        shortDesc: 'Private styling, tailoring fittings and unhurried shopping.',
        leadParagraph: 'We arrange private shopping appointments, Savile Row tailoring fittings and personal stylists around your calendar. Everything is prepared in advance so you avoid crowds.',
        detailedPoints: [
          'Private store and showroom appointments',
          'Tailoring and dressmaking fittings',
          'Personal stylist introductions',
          'Home delivery of your purchases'
        ],
        example: 'For example, we can arrange a quiet morning fitting on Savile Row followed by lunch.',
        image: '/assets/aistudio/savile_row_bespoke.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/liberty-department-store-640x360_44860915.jpg',
            caption: 'Historic London shopping landmark'
          },
          {
            image: '/assets/aistudio/luxury_streetwear_salon_1794391693258.jpg',
            caption: 'Private appointment styling space'
          }
        ],
        faqs: [
          {
            q: 'Can items be brought to my hotel or home?',
            a: 'Yes, where stores offer private home or hotel viewings we arrange them.'
          },
          {
            q: 'Do you help with event outfits?',
            a: 'Yes. We can connect you with stylists for black-tie dinners, Royal Ascot and weddings.'
          }
        ]
      },
      {
        id: 'sport-motorsport',
        title: 'Sport & Motorsport',
        shortDesc: 'Seats and hospitality for tennis, racing and motorsport.',
        leadParagraph: 'We help arrange tickets, hospitality and travel for major sporting events like Wimbledon, Royal Ascot and Goodwood, subject to availability. We handle the whole day from doors to dinner.',
        detailedPoints: [
          'Tennis, racing and football hospitality',
          'Motorsport weekends and travel plans',
          'Chauffeurs and helicopter transfers',
          'Dining booked before or after play'
        ],
        example: 'For example, we can plan a full day at Royal Ascot with hospitality and a driver.',
        image: '/assets/aistudio/ufc_arena_ringside.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/wimbledon_centre_court_1794391696846.jpg',
            caption: 'Summer tennis afternoon in London'
          },
          {
            image: '/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg',
            caption: 'Performance cars at a motorsport gathering'
          }
        ],
        faqs: [
          {
            q: 'Are you an official ticket partner for these events?',
            a: 'No. We arrange hospitality and tickets through independent channels, subject to availability.'
          },
          {
            q: 'Can you organise travel and hotels for away fixtures?',
            a: 'Yes. We manage flights, hotels and transfers alongside event attendance.'
          }
        ]
      },
      {
        id: 'private-celebrations-milestones',
        title: 'Private Celebrations & Milestones',
        shortDesc: 'Birthdays, anniversaries and private gatherings without stress.',
        leadParagraph: 'We help plan birthdays, anniversaries and family gatherings in London, the countryside or abroad. We coordinate venues, food, music and guest logistics calmly behind the scenes.',
        detailedPoints: [
          'Venue finding and bookings',
          'Catering, flowers and music coordination',
          'Guest travel and hotel rooms',
          'Quiet on-the-day support'
        ],
        example: 'For example, we can organise an anniversary weekend in the countryside for close friends.',
        image: '/assets/aistudio/MAIN-IMAGE-Shangri-La-The-Shard-London-Illuminate-Yacht-_571087f0.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/cotswolds_manor_estate.jpg',
            caption: 'Country house ready for a family gathering'
          },
          {
            image: '/assets/aistudio/mayfair_fine_dining.jpg',
            caption: 'Candlelit celebration dinner in London'
          }
        ],
        faqs: [
          {
            q: 'Do you plan small gatherings as well as big ones?',
            a: 'Yes. We help with everything from intimate dinners to full weekend celebrations.'
          },
          {
            q: 'Can you work with my own event planner?',
            a: 'Yes. We happily support your chosen planner with travel, stays and guest care.'
          }
        ]
      },
      {
        id: 'family-next-generation',
        title: 'Family Experiences',
        shortDesc: 'Thoughtful days out and trips for all ages.',
        leadParagraph: 'We plan family days out, school-holiday trips and memorable experiences that work for children and adults alike. We handle timing, guides and practical details so everyone enjoys the day.',
        detailedPoints: [
          'Family-friendly cultural visits',
          'School-holiday trip planning',
          'Private guides suited to children',
          'Countryside and outdoor weekends'
        ],
        example: 'For example, we can plan a weekend mixing museum visits with a countryside stay.',
        image: '/assets/aistudio/calendar_concours_blenheim.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
            caption: 'Outdoor countryside escape for families'
          },
          {
            image: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
            caption: 'Guided art visit tailored for young guests'
          }
        ],
        faqs: [
          {
            q: 'Can you adapt plans for young children or teenagers?',
            a: 'Yes. We tailor pace, guides and venues to suit the ages travelling.'
          },
          {
            q: 'Can you arrange childcare introductions?',
            a: 'Yes. We can introduce trusted agencies for nannies and babysitters.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Can you always get tickets to sold-out events?',
        answer: 'Tickets and hospitality are always subject to availability. We use our contacts to source strong options wherever possible.'
      },
      {
        question: 'Do you handle transport and dinner around an event?',
        answer: 'Yes. We can arrange your seats, restaurant table and chauffeur together.'
      },
      {
        question: 'How early should we enquire for major summer events?',
        answer: 'Enquiring early gives the best choice for events like Wimbledon, Royal Ascot and Goodwood.'
      },
      {
        question: 'Can you arrange private gallery or museum visits?',
        answer: 'Yes. We coordinate private viewings, art fair visits and specialist guides in London and Europe, subject to availability.'
      },
      {
        question: 'Do you help with opera, ballet and West End theatre?',
        answer: 'Yes. We source strong seating and pair performances with pre-theatre dining or interval hospitality.'
      },
      {
        question: 'How does private shopping work in London?',
        answer: 'We arrange private boutique appointments, personal stylists and direct parcel delivery to your hotel or home.'
      },
      {
        question: 'Can you organise private celebrations and milestone birthdays?',
        answer: 'Yes. We coordinate venues, catering, music, florals and guest logistics for intimate or larger gatherings.'
      },
      {
        question: 'Do you plan experiences suitable for children and families?',
        answer: 'Yes. We design relaxed family days, school-holiday itineraries and private museum sessions tailored to all ages.'
      },
      {
        question: 'Can you arrange motorsport and international sporting hospitality?',
        answer: 'Yes. We source hospitality and travel around major tennis, racing, golf and football fixtures, subject to availability.'
      },
      {
        question: 'Are event prices confirmed before you book?',
        answer: 'Yes. We always confirm exact seating options, terms and total costs before making any commitment.'
      }
    ]
  },
  {
    id: 'residences-relocation',
    title: 'Residences & Relocation',
    tagline: 'Step through the door into calm.',
    shortDesc: 'Discreet introductions for London property searches, smooth family relocations, residence preparation and weekend countryside estates.',
    highlights: [
      'Rental and property searches',
      'Moving and settling in',
      'Household management',
      'Interiors and maintenance'
    ],
    heroImage: '/assets/aistudio/01-Lethbridge-House-20-Cornwall-Terrace-Marylebone-London-UK-640x360_b59e806c.jpg',
    galleryImages: [
      '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg',
      '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
      '/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg'
    ],
    galleryCaptions: [
      'Light-filled living room in central London',
      'Stone country house set in quiet grounds',
      'Modern London apartment with river views'
    ],
    subServices: [
      {
        id: 'london-residences',
        title: 'London Residences',
        shortDesc: 'Help finding short-term and long-term London homes through trusted specialists.',
        leadParagraph: 'We help you explore London neighbourhoods and introduce you to regulated buying and letting specialists. We coordinate viewings around your diary so your search stays focused.',
        detailedPoints: [
          'Neighbourhood advice across central London',
          'Introductions to regulated property specialists',
          'Viewing schedules arranged for you',
          'Short-term and long-term stay options'
        ],
        example: 'For example, we can line up private viewings in Mayfair and Marylebone across one afternoon.',
        image: '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
            caption: 'Georgian townhouse frontage in central London'
          },
          {
            image: '/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg',
            caption: 'Contemporary London apartment interior'
          }
        ],
        faqs: [
          {
            q: 'Are you an estate agent?',
            a: 'No. We introduce you to regulated buying agents, letting agents and property solicitors.'
          },
          {
            q: 'Can you help find a short-term London base?',
            a: 'Yes. We can help source serviced residences and seasonal rentals.'
          }
        ],
        regulatoryNote: "We're not estate agents; we introduce you to regulated professionals."
      },
      {
        id: 'off-market-property',
        title: 'Off-Market Property Introductions',
        shortDesc: 'Discreet introductions to independent buying agents and private sellers.',
        leadParagraph: 'We connect you with regulated buying agents and property advisers who handle discreet London and country searches. Your requirements stay private while we coordinate introductions.',
        detailedPoints: [
          'Introductions to independent buying agents',
          'Private viewing coordination',
          'Surveyor and legal team referrals',
          'Discreet communication throughout'
        ],
        example: 'For example, we can introduce a buying agent suited to quiet townhouse searches in Belgravia.',
        image: '/assets/aistudio/01-Lethbridge-House-20-Cornwall-Terrace-Marylebone-London-UK-640x360_b59e806c.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
            caption: 'Quiet residential square in London'
          },
          {
            image: '/assets/aistudio/cotswolds_manor_estate.jpg',
            caption: 'Private stone manor in the countryside'
          }
        ],
        faqs: [
          {
            q: 'Do you negotiate property purchases directly?',
            a: 'No. Regulated buying agents and solicitors handle negotiations and legal work.'
          },
          {
            q: 'Do you cover homes outside London?',
            a: 'Yes. We introduce specialists covering both London and the British countryside.'
          }
        ],
        regulatoryNote: "We're not estate agents; we introduce you to regulated professionals."
      },
      {
        id: 'relocation-settling-in',
        title: 'Relocation & Settling In',
        shortDesc: 'Practical help moving to London and setting up everyday life.',
        leadParagraph: 'Moving to a new city involves dozens of small tasks that eat into your week. We coordinate utilities, movers, local orientation and introductions so you settle in faster.',
        detailedPoints: [
          'Removal and shipping coordination',
          'Utilities, broadband and home setup',
          'Local neighbourhood orientation',
          'Introductions to local advisers'
        ],
        example: 'For example, we can have broadband, utilities and groceries ready before your family arrives.',
        image: '/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
            caption: 'London home prepared for arrival'
          },
          {
            image: '/assets/aistudio/harley_medical_suite_1794391696088.jpg',
            caption: 'Local clinic registrations arranged smoothly'
          }
        ],
        faqs: [
          {
            q: 'Can you help before we land in the UK?',
            a: 'Yes. We can coordinate setup tasks remotely so your home is ready when you arrive.'
          },
          {
            q: 'Do you handle immigration or tax advice?',
            a: 'No, though we can introduce regulated lawyers and advisers.'
          }
        ]
      },
      {
        id: 'household-management',
        title: 'Household Management',
        shortDesc: 'Day-to-day oversight to keep your London home running smoothly.',
        leadParagraph: 'We look after the routine upkeep of your home, whether you live in London full time or visit occasionally. One contact handles trades, deliveries and arrival prep.',
        detailedPoints: [
          'Keyholding and regular home checks',
          'Pre-arrival cleaning and fresh flowers',
          'Contractor and delivery supervision',
          'Seasonal maintenance scheduling'
        ],
        example: 'For example, we can inspect your flat between visits and stock the kitchen before you return.',
        image: '/assets/aistudio/tglc_st_james_salon.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
            caption: 'Well-kept town residence in London'
          },
          {
            image: '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg',
            caption: 'Living space prepared for arrival'
          }
        ],
        faqs: [
          {
            q: 'Can you look after a home while we are abroad?',
            a: 'Yes. We arrange regular checks, mail handling and arrival preparation.'
          },
          {
            q: 'Do you supervise tradespeople on site?',
            a: 'Yes. We coordinate access and check completed work on your behalf.'
          }
        ]
      },
      {
        id: 'interior-home-services',
        title: 'Interiors & Home Services',
        shortDesc: 'Trusted interior designers, craftspeople and reliable home maintenance.',
        leadParagraph: 'We connect you with interior designers, decorators, audio-visual installers and skilled tradespeople. We help schedule work cleanly around your calendar so projects stay on track.',
        detailedPoints: [
          'Interior designer introductions',
          'Furniture sourcing and placement',
          'Lighting and home technology setup',
          'Reliable plumbing, electrical and repairs'
        ],
        example: 'For example, we can introduce an interior studio and coordinate deliveries while you travel.',
        image: '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg',
            caption: 'Architectural interior design in London'
          },
          {
            image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
            caption: 'Classic interior finishes and styling'
          }
        ],
        faqs: [
          {
            q: 'Can you help with small home repairs too?',
            a: 'Yes. We arrange both everyday maintenance and larger interior projects.'
          },
          {
            q: 'Do you introduce lighting and sound specialists?',
            a: 'Yes. We work with trusted home technology and lighting installers.'
          }
        ]
      },
      {
        id: 'country-estates-weekend-homes',
        title: 'Country & Weekend Homes',
        shortDesc: 'Finding and preparing countryside houses for relaxed weekends away.',
        leadParagraph: 'We help source countryside retreats through regulated specialists and prepare your home ahead of weekend visits. From grounds care to kitchen stocking, everything is ready when you arrive.',
        detailedPoints: [
          'Introductions to rural property specialists',
          'Pre-weekend house and pantry prep',
          'Garden and grounds maintenance coordination',
          'Weekend chef and driver support'
        ],
        example: 'For example, we can warm up a Cotswolds house and stock the pantry before Friday evening.',
        image: '/assets/aistudio/cotswolds_manor_estate.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
            caption: 'Quiet country estate surrounded by hills'
          },
          {
            image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
            caption: 'Comfortable car ready for the drive'
          }
        ],
        faqs: [
          {
            q: 'Can you find a country house just for a weekend?',
            a: 'Yes. We help source private country rentals as well as supporting homes you own.'
          },
          {
            q: 'Do you act as a country estate agent?',
            a: 'No. We introduce regulated rural buying and letting specialists.'
          }
        ],
        regulatoryNote: "We're not estate agents; we introduce you to regulated professionals."
      }
    ],
    faqs: [
      {
        question: 'Are you an estate agency?',
        answer: "No. We're not estate agents; we introduce you to regulated property professionals and help coordinate the practical side."
      },
      {
        question: 'Can you prepare a London home before we arrive?',
        answer: 'Yes. We handle cleaning, flowers, groceries and maintenance checks ahead of your stay.'
      },
      {
        question: 'Do you help families relocating to London from abroad?',
        answer: 'Yes. We help coordinate movers, utilities, neighbourhood guidance and introductions to local specialists.'
      },
      {
        question: 'Which London neighbourhoods do you know best?',
        answer: 'We work most closely across Mayfair, St James’s, Belgravia, Knightsbridge, Marylebone, Chelsea and Kensington.'
      },
      {
        question: 'Can you help with short-term or seasonal London rentals?',
        answer: 'Yes. We introduce trusted letting agents and coordinate viewings, furnishings and move-in logistics.'
      },
      {
        question: 'Do you introduce interior designers and architects?',
        answer: 'Yes. We connect you with designers, builders and craftspeople suited to your taste and property.'
      },
      {
        question: 'Can you look after an unoccupied home while we travel?',
        answer: 'Yes. We can coordinate routine checks, mail handling, maintenance visits and seasonal preparation.'
      },
      {
        question: 'Do you also support countryside homes outside London?',
        answer: 'Yes. We assist with weekend estates and country houses across the Cotswolds, Sussex, Surrey and beyond.'
      },
      {
        question: 'Can you help find housekeepers, chefs or estate staff?',
        answer: 'Yes. We introduce specialist domestic recruitment agencies and help coordinate interviews and onboarding.'
      },
      {
        question: 'Do you give legal or tax advice on buying property?',
        answer: 'No. We introduce qualified solicitors, surveyors and advisers for all legal, tax and financial matters.'
      }
    ]
  },
  {
    id: 'transport-security',
    title: 'Transport, Security & Privacy',
    tagline: 'Move across London quietly and on time.',
    shortDesc: 'Seasoned chauffeurs, prestige vehicle sourcing, low-profile arrival planning and SIA-licensed independent protection specialists.',
    highlights: [
      'Chauffeur services',
      'Car sourcing',
      'Personal security specialists',
      'Low-profile travel planning'
    ],
    heroImage: '/assets/aistudio/luxury_sprinter_jetvan.jpg',
    galleryImages: [
      '/assets/aistudio/close_protection_security.jpg',
      '/assets/aistudio/rolls-royce-cullinan-chauffeur-service-events_d3e6e421.webp',
      '/assets/aistudio/mayfair_security_convoy.jpg',
      '/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg'
    ],
    galleryCaptions: [
      'Licensed security specialist supporting a quiet arrival',
      'Chauffeur car prepared for an evening out',
      'Coordinated vehicles moving smoothly through central London',
      'Rare sports car sourced for a collector'
    ],
    regulatoryNote: 'Security services are provided by licensed independent specialists.',
    subServices: [
      {
        id: 'chauffeur-luxury-vehicles',
        title: 'Chauffeurs & Luxury Vehicles',
        shortDesc: 'Reliable chauffeurs and comfortable vehicles for city and airport journeys.',
        leadParagraph: 'We arrange experienced chauffeurs and executive vehicles for airport pickups, meetings and evenings in London. Your driver tracks timing quietly so you never wait on the kerb.',
        detailedPoints: [
          'Airport and station collections',
          'Full-day and evening chauffeur standby',
          'Group vehicles for families or teams',
          'Countryside and regional journeys'
        ],
        example: 'For example, we can arrange a chauffeur on standby for a full day of London meetings.',
        image: '/assets/aistudio/luxury_sprinter_jetvan.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/rolls-royce-cullinan-chauffeur-service-events_d3e6e421.webp',
            caption: 'Chauffeur vehicle ready outside a venue'
          },
          {
            image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
            caption: 'Quiet evening arrival in central London'
          }
        ],
        faqs: [
          {
            q: 'Can I request the same driver each visit?',
            a: 'Yes, we request preferred drivers whenever they are available.'
          },
          {
            q: 'Do you arrange cars outside London?',
            a: 'Yes. We coordinate chauffeurs across the UK and major international cities.'
          }
        ]
      },
      {
        id: 'private-car-sourcing',
        title: 'Private Car Sourcing',
        shortDesc: 'Short-term luxury rentals and introductions to trusted car specialists.',
        leadParagraph: 'We arrange short-term self-drive vehicles and connect you with trusted dealers for long-term purchases. We also coordinate delivery, storage and routine servicing.',
        detailedPoints: [
          'Short-term luxury car hire',
          'Dealer introductions for rare models',
          'Enclosed delivery and collection',
          'Servicing and storage coordination'
        ],
        example: 'For example, we can have a weekend touring car delivered to your hotel on Friday morning.',
        image: '/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/25_Koenigsegg_CCXR_Trevita_30-Most-Expensive-Cars-in-the-World_Tyroola_0c18f9f0.jpg',
            caption: 'Collector car prepared for viewing'
          },
          {
            image: '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp',
            caption: 'Luxury touring cars lined up cleanly'
          }
        ],
        faqs: [
          {
            q: 'Can you deliver a hire car to my home?',
            a: 'Yes. We arrange handover and collection at your home, hotel or airport.'
          },
          {
            q: 'Do you help with car storage in London?',
            a: 'Yes. We can introduce specialist secure storage facilities.'
          }
        ]
      },
      {
        id: 'executive-protection',
        title: 'Personal Security & Protection',
        shortDesc: 'Discreet personal protection arranged through licensed independent specialists.',
        leadParagraph: 'We introduce licensed independent security specialists for business trips, public appearances and family travel. Protection stays calm and low-profile so your day feels normal.',
        detailedPoints: [
          'Licensed personal protection introductions',
          'Low-profile family travel support',
          'Event arrival and departure planning',
          'Residential security specialist referrals'
        ],
        example: 'For example, we can introduce a licensed protection specialist to accompany a busy London week.',
        image: '/assets/aistudio/close_protection_security.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/mayfair_security_convoy.jpg',
            caption: 'Calm arrival coordination in Mayfair'
          },
          {
            image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
            caption: 'Discreet side-street drop-off in London'
          }
        ],
        faqs: [
          {
            q: 'Does TGLC provide security guards directly?',
            a: 'No. Security services are provided by licensed independent specialists.'
          },
          {
            q: 'Can security work alongside my chauffeur?',
            a: 'Yes. We coordinate timing between your driver and security specialist.'
          }
        ],
        regulatoryNote: 'Security services are provided by licensed independent specialists.'
      },
      {
        id: 'secure-travel-event-logistics',
        title: 'Secure Travel & Events',
        shortDesc: 'Careful route planning and calm arrivals for busy schedules.',
        leadParagraph: 'We coordinate drivers, venues and licensed security specialists so busy event days run calmly. Every timing detail is checked ahead of time to avoid unnecessary delays.',
        detailedPoints: [
          'Advance route and venue checks',
          'Quiet drop-off and pickup points',
          'Coordinated multi-vehicle movements',
          'Clear timing notes for your team'
        ],
        example: 'For example, we can plan quiet venue drop-offs for a packed evening schedule in central London.',
        image: '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp',
        galleryImages: [
          {
            image: '/assets/aistudio/mayfair_security_convoy.jpg',
            caption: 'Coordinated vehicles moving through Mayfair'
          },
          {
            image: '/assets/aistudio/down_street_station_1794391687146.jpg',
            caption: 'Quiet central London arrival planning'
          }
        ],
        faqs: [
          {
            q: 'Can you coordinate with an existing security team?',
            a: 'Yes. We work smoothly alongside your own advisers or security lead.'
          },
          {
            q: 'Do you cover events outside London?',
            a: 'Yes. We help plan travel logistics for events across the UK and abroad.'
          }
        ],
        regulatoryNote: 'Security services are provided by licensed independent specialists.'
      },
      {
        id: 'privacy-first-lifestyle-support',
        title: 'Privacy-First Lifestyle Support',
        shortDesc: 'Quiet bookings and careful handling of your personal details.',
        leadParagraph: 'We plan travel, dining and daily requests with privacy in mind from the start. We only share the details a venue or supplier genuinely needs.',
        detailedPoints: [
          'Private rooms and quiet tables',
          'Minimal personal details shared',
          'Direct single-contact communication',
          'Discreet arrival and departure timing'
        ],
        example: 'For example, we can book a private dining room and quiet hotel check-in for visiting guests.',
        image: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/tglc_st_james_salon.jpg',
            caption: 'Private room away from busy spaces'
          },
          {
            image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
            caption: 'Quiet arrival off a side street'
          }
        ],
        faqs: [
          {
            q: 'Who sees my personal information?',
            a: 'Only the people looking after your request, and we never use client names for publicity.'
          },
          {
            q: 'Can you communicate through my assistant?',
            a: 'Yes. We can work directly with you or with your personal assistant.'
          }
        ],
        regulatoryNote: 'Security services are provided by licensed independent specialists.'
      }
    ],
    faqs: [
      {
        question: 'Who provides personal security services?',
        answer: 'Security services are provided by licensed independent specialists. We make the introduction and coordinate logistics.'
      },
      {
        question: 'Can you arrange a chauffeur at short notice?',
        answer: 'Yes, we check our trusted drivers right away and confirm availability quickly.'
      },
      {
        question: 'Do you work with family offices and personal assistants?',
        answer: 'Yes. We regularly coordinate schedules directly with assistants and security leads.'
      },
      {
        question: 'What types of chauffeur vehicles can you arrange?',
        answer: 'We arrange flagship saloons, luxury SUVs and spacious executive MPVs for individuals, families and luggage.'
      },
      {
        question: 'Do your drivers track commercial and private flight arrivals?',
        answer: 'Yes. Drivers monitor live flight timings so pickups adjust calmly if a flight lands early or late.'
      },
      {
        question: 'Can you book a driver on standby for a full day?',
        answer: 'Yes. Full-day standby lets you move between meetings, shopping and dinner without waiting.'
      },
      {
        question: 'Can you arrange chauffeurs when we travel abroad?',
        answer: 'Yes. We coordinate trusted chauffeur partners across major European and international destinations.'
      },
      {
        question: 'How do you handle privacy for low-profile visits?',
        answer: 'We limit details shared with venues and coordinate quiet entrances and timings wherever possible.'
      },
      {
        question: 'Can you help source a vehicle for personal purchase or hire?',
        answer: 'Yes. We introduce reputable dealerships and specialists for luxury car sourcing, hire and delivery.'
      },
      {
        question: 'Do you coordinate multi-vehicle plans for events or delegations?',
        answer: 'Yes. We plan routes, drop-off timings and driver briefings for family groups or visiting executives.'
      }
    ]
  },
  {
    id: 'personal-private-office',
    title: 'Personal & Private Office',
    tagline: 'Your time, quietly protected.',
    shortDesc: 'Day-to-day lifestyle management, vetted household staff introductions, family support and discreet liaison alongside your private office.',
    highlights: [
      'Everyday errands and bookings',
      'Household staff introductions',
      'Schools and family support',
      'Wellness and gifting'
    ],
    heroImage: '/assets/aistudio/tglc_st_james_salon.jpg',
    galleryImages: [
      '/assets/aistudio/harley_medical_suite_1794391696088.jpg',
      '/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg',
      '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
      '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg'
    ],
    galleryCaptions: [
      'Calm private wellness clinic room in London',
      'Quiet study space in a London home',
      'Central London residence managed with care',
      'Organised living room ready for the week'
    ],
    subServices: [
      {
        id: 'everyday-lifestyle-management',
        title: 'Everyday Lifestyle Management',
        shortDesc: 'Bookings, errands and weekly organisation.',
        leadParagraph: 'We take everyday tasks off your list, from appointments and deliveries to research and diary support. One trusted contact handles the small jobs that steal your time.',
        detailedPoints: [
          'Appointments and everyday bookings',
          'Trusted courier and errand support',
          'Dry cleaning, tailoring and repairs',
          'Practical research and supplier quotes'
        ],
        example: 'For example, we can collect alterations, book appointments and arrange flowers in one afternoon.',
        image: '/assets/aistudio/tglc_st_james_salon.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/savile_row_bespoke.jpg',
            caption: 'Tailoring alterations collected and delivered'
          },
          {
            image: '/assets/aistudio/mayfair_fine_dining.jpg',
            caption: 'Weekly lunch and dinner plans sorted'
          }
        ],
        faqs: [
          {
            q: 'Is any request too small?',
            a: 'Not at all. Often the smallest weekly tasks save you the most headspace.'
          },
          {
            q: 'How do I send requests?',
            a: 'Call, email or message your lifestyle manager—whichever is easiest for you.'
          }
        ]
      },
      {
        id: 'household-staffing-recruitment',
        title: 'Household Staffing & Recruitment',
        shortDesc: 'Agency introductions for housekeepers, chefs and nannies.',
        leadParagraph: 'Finding the right people for your home takes care and time. We introduce you to reputable domestic staffing agencies and help coordinate interviews around your schedule.',
        detailedPoints: [
          'Introductions to specialist staffing agencies',
          'Housekeepers, chefs and private drivers',
          'Nanny and childcare agency referrals',
          'Interview scheduling and coordination'
        ],
        example: 'For example, we can introduce a reputable agency to help find a part-time housekeeper.',
        image: '/assets/aistudio/01-Lethbridge-House-20-Cornwall-Terrace-Marylebone-London-UK-640x360_b59e806c.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
            caption: 'London household supported smoothly'
          },
          {
            image: '/assets/aistudio/mayfair_fine_dining.jpg',
            caption: 'Private chef support for home dining'
          }
        ],
        faqs: [
          {
            q: 'Do you employ household staff directly?',
            a: 'No. We introduce specialist agencies who handle recruitment and checks.'
          },
          {
            q: 'Can you help with temporary holiday staff?',
            a: 'Yes. We can introduce agencies that provide short-term chefs, drivers and childcare.'
          }
        ]
      },
      {
        id: 'education-family-support',
        title: 'Education & Family Support',
        shortDesc: 'Education consultants, tutors and family support.',
        leadParagraph: 'We connect families with independent school consultants, private tutors and enrichment activities in London. We also coordinate campus visits and travel around open days.',
        detailedPoints: [
          'Independent school consultant introductions',
          'Private tutor agency referrals',
          'School visit and travel planning',
          'Summer camp and activity ideas'
        ],
        example: 'For example, we can introduce an education adviser and plan a day of school visits.',
        image: '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/royal_opera_gallery.jpg',
            caption: 'Cultural visits arranged for students'
          },
          {
            image: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
            caption: 'Art and learning days in London'
          }
        ],
        faqs: [
          {
            q: 'Can you secure a school place directly?',
            a: 'No. Admissions decisions always sit with each school; we introduce independent advisers who guide you.'
          },
          {
            q: 'Do you help with university tours too?',
            a: 'Yes. We can plan travel, stays and visit schedules across the UK.'
          }
        ]
      },
      {
        id: 'health-wellness-recovery',
        title: 'Health, Wellness & Recovery',
        shortDesc: 'Clinic appointments, trainers and wellness stays.',
        leadParagraph: 'We help arrange appointments with private clinics, personal trainers, physiotherapists and wellness retreats. We handle scheduling and travel so looking after yourself fits into busy weeks.',
        detailedPoints: [
          'Private clinic appointment scheduling',
          'Personal trainers and physiotherapists',
          'Spa days and wellness retreats',
          'Discreet transport to appointments'
        ],
        example: 'For example, we can arrange a private dental or physiotherapy appointment around your work week.',
        image: '/assets/aistudio/harley_medical_suite_1794391696088.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/swiss_alpine_chalet.jpg',
            caption: 'Restorative mountain wellness retreat'
          },
          {
            image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
            caption: 'Calm home recovery support in London'
          }
        ],
        faqs: [
          {
            q: 'Do you give medical advice?',
            a: "No. We don't give medical advice; we help arrange appointments with qualified professionals."
          },
          {
            q: 'Can you book wellness retreats abroad?',
            a: 'Yes. We can research and arrange stays at trusted retreats in Europe and beyond.'
          }
        ],
        regulatoryNote: "We don't give medical advice; we help arrange appointments with qualified professionals."
      },
      {
        id: 'gifting-personal-milestones',
        title: 'Gifting & Personal Milestones',
        shortDesc: 'Gifts, flowers and milestone reminders on time.',
        leadParagraph: 'We help you find thoughtful gifts for birthdays, anniversaries and thank-yous without last-minute rushing. We source, wrap and deliver so important dates are always remembered.',
        detailedPoints: [
          'Thoughtful gift ideas and sourcing',
          'Seasonal flowers and personal notes',
          'Wrapping and hand delivery in London',
          'Helpful reminders for key dates'
        ],
        example: 'For example, we can source, wrap and deliver an anniversary gift with a handwritten card.',
        image: '/assets/aistudio/bond_street_jewellery.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg',
            caption: 'Hand-crafted leather gift made to order'
          },
          {
            image: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
            caption: 'Classic timepiece chosen for a milestone'
          }
        ],
        faqs: [
          {
            q: 'Can you deliver gifts the same day in London?',
            a: 'Often yes, depending on the item and timing.'
          },
          {
            q: 'Can you keep track of family birthdays for me?',
            a: 'Yes. We can note key dates and prompt you well in advance.'
          }
        ]
      },
      {
        id: 'private-office-adviser-liaison',
        title: 'Private Office & Advisers',
        shortDesc: 'Lifestyle support alongside your assistants and advisers.',
        leadParagraph: 'We support personal assistants, family offices and busy executives with travel, hosting and household logistics. We fit quietly into your existing workflow without adding admin.',
        detailedPoints: [
          'Support for personal assistants and EAs',
          'Visiting executive and board hosting',
          'Clear summaries and organised billing',
          'Coordination with your existing advisers'
        ],
        example: 'For example, we can work with your assistant to host visiting partners in London.',
        image: '/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/tglc_st_james_salon.jpg',
            caption: 'Quiet London room for private meetings'
          },
          {
            image: '/assets/aistudio/private_jet_interior_suite.jpg',
            caption: 'Coordinated executive travel support'
          }
        ],
        faqs: [
          {
            q: 'Do you replace a personal assistant?',
            a: 'No. We work alongside your assistant or family office to handle specialist and time-heavy tasks.'
          },
          {
            q: 'Do you provide legal or financial advice?',
            a: 'No. We handle lifestyle coordination and work with your chosen advisers.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Can my personal assistant contact you directly?',
        answer: 'Yes. Many members ask us to work directly alongside their assistant or family office.'
      },
      {
        question: 'Do you give medical, legal or financial advice?',
        answer: 'No. We coordinate logistics and introduce qualified independent professionals where helpful.'
      },
      {
        question: 'Can you help with one-off tasks as well as ongoing support?',
        answer: 'We focus on ongoing member relationships, so we get to know how you like things done.'
      },
      {
        question: 'What everyday errands and admin can you take off my plate?',
        answer: 'We handle bookings, deliveries, repairs, gifting, flowers, dry cleaning and diary coordination.'
      },
      {
        question: 'Can you help families with London schools and tutoring?',
        answer: 'Yes. We introduce independent education consultants and private tutors to guide applications and visits.'
      },
      {
        question: 'How do you support health and wellness appointments?',
        answer: 'We arrange private clinic appointments, personal trainers and wellness retreats. We never provide medical advice.'
      },
      {
        question: 'Can you keep track of family birthdays and gifting?',
        answer: 'Yes. We maintain a quiet calendar of key dates, suggest thoughtful gifts and arrange wrapping and delivery.'
      },
      {
        question: 'How can I reach my lifestyle manager day to day?',
        answer: 'By phone, email or WhatsApp — whichever channel fits naturally into your day.'
      },
      {
        question: 'Can other members of my household use the service?',
        answer: 'Yes. Membership can be structured to support your partner, children and household staff.'
      },
      {
        question: 'How do you keep my household details confidential?',
        answer: 'We share only what is strictly necessary to complete each booking and never publicise client relationships.'
      }
    ]
  },
  {
    id: 'luxury-sourcing',
    title: 'Luxury Sourcing & Acquisitions',
    tagline: 'Rare pieces, sourced with quiet discernment.',
    shortDesc: 'Elusive timepieces, fine jewellery, collectible art, provenance-checked wine cellars and bespoke commissions tracked down through trusted houses.',
    highlights: [
      'Watches and jewellery',
      'Art and collectibles',
      'Fine wine and spirits',
      'Cars and special commissions'
    ],
    heroImage: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
    galleryImages: [
      '/assets/aistudio/25_Koenigsegg_CCXR_Trevita_30-Most-Expensive-Cars-in-the-World_Tyroola_0c18f9f0.jpg',
      '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg',
      '/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg',
      '/assets/aistudio/bond_street_jewellery.jpg'
    ],
    galleryCaptions: [
      'Rare collector car shown by private appointment',
      'Hand-stitched leather craft on a London workbench',
      'Limited-run performance car prepared for viewing',
      'Fine jewellery pieces presented in central London'
    ],
    subServices: [
      {
        id: 'fine-jewellery-watches',
        title: 'Fine Jewellery & Watches',
        shortDesc: 'Watches and jewellery found through trusted specialists.',
        leadParagraph: 'We help track down specific watches and fine jewellery through reputable dealers and boutiques. We arrange quiet viewings so you can inspect pieces properly.',
        detailedPoints: [
          'Watch and jewellery sourcing searches',
          'Private boutique and dealer viewings',
          'Servicing and valuation introductions',
          'Careful delivery and insurance referrals'
        ],
        example: 'For example, we can arrange a private viewing of vintage watches with a trusted London dealer.',
        image: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/bond_street_jewellery.jpg',
            caption: 'Fine jewellery displayed for private viewing'
          },
          {
            image: '/assets/aistudio/liberty-department-store-640x360_44860915.jpg',
            caption: 'Central London heritage shopping setting'
          }
        ],
        faqs: [
          {
            q: 'Are rare watch allocations always possible?',
            a: 'No. Rare pieces are always subject to availability, and we search trusted channels for you.'
          },
          {
            q: 'Can pieces be checked before purchase?',
            a: 'Yes. We encourage independent checks and introduce qualified specialists.'
          }
        ]
      },
      {
        id: 'art-collectible-design',
        title: 'Art & Collectible Design',
        shortDesc: 'Artworks and design pieces with specialist guidance.',
        leadParagraph: 'We help source contemporary art, prints and collectible furniture through reputable galleries and dealers. We coordinate viewings, framing and specialist shipping cleanly.',
        detailedPoints: [
          'Gallery and dealer searches',
          'Introductions to independent art advisers',
          'Framing and installation coordination',
          'Specialist art shipping arranged'
        ],
        example: 'For example, we can help track down a specific print and arrange framing and hanging.',
        image: '/assets/aistudio/royal_opera_gallery.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg',
            caption: 'Collectible design piece inside a London home'
          },
          {
            image: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
            caption: 'Contemporary artwork viewed at a fair'
          }
        ],
        faqs: [
          {
            q: 'Do you help with hanging and lighting artwork?',
            a: 'Yes. We arrange experienced art installers and lighting specialists.'
          },
          {
            q: 'Can you help source pieces for a new home?',
            a: 'Yes. We work alongside you or your interior designer.'
          }
        ]
      },
      {
        id: 'rare-wines-spirits',
        title: 'Fine Wine & Spirits',
        shortDesc: 'Special bottles and home cellars via trusted merchants.',
        leadParagraph: 'We work with established wine merchants to source specific vintages, celebration bottles and cellar selections. We also help arrange storage and private tastings.',
        detailedPoints: [
          'Birth-year and anniversary bottle searches',
          'Established wine merchant introductions',
          'Cellar storage and delivery coordination',
          'Private tastings arranged with sommeliers'
        ],
        example: 'For example, we can track down a birth-year bottle through a reputable London wine merchant.',
        image: '/assets/aistudio/mayfair_fine_dining.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/rare_cellar_vault.jpg',
            caption: 'Temperature-controlled cellar of fine bottles'
          },
          {
            image: '/assets/aistudio/fitzrovia_absinthe_salon_1794391690208.jpg',
            caption: 'Quiet room for a private spirits tasting'
          }
        ],
        faqs: [
          {
            q: 'Can you help stock a home wine fridge?',
            a: 'Yes. Tell us what you enjoy drinking and we coordinate a balanced selection.'
          },
          {
            q: 'Do you arrange bonded storage?',
            a: 'We can introduce established merchants who offer professional wine storage.'
          }
        ]
      },
      {
        id: 'automobiles-motoring',
        title: 'Automobiles & Motoring',
        shortDesc: 'Classic and modern cars via specialist dealers.',
        leadParagraph: 'We help locate classic, modern and limited-run cars through established dealers and specialists. We coordinate inspections, delivery and ongoing care so buying stays straightforward.',
        detailedPoints: [
          'Specialist dealer searches and viewings',
          'Independent mechanical inspection referrals',
          'Covered transport and registration support',
          'Storage and detailing coordination'
        ],
        example: 'For example, we can locate a classic touring car and arrange an independent inspection.',
        image: '/assets/aistudio/25_Koenigsegg_CCXR_Trevita_30-Most-Expensive-Cars-in-the-World_Tyroola_0c18f9f0.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg',
            caption: 'Rare performance car prepared for inspection'
          },
          {
            image: '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp',
            caption: 'Modern grand tourers ready for delivery'
          }
        ],
        faqs: [
          {
            q: 'Do you sell cars yourselves?',
            a: 'No. We search on your behalf and introduce established specialist dealers.'
          },
          {
            q: 'Can you arrange covered transport across Europe?',
            a: 'Yes. We coordinate specialist enclosed vehicle carriers.'
          }
        ]
      },
      {
        id: 'bespoke-gifts-commissions',
        title: 'Bespoke Gifts & Commissions',
        shortDesc: 'One-off commissions with British and European makers.',
        leadParagraph: 'We connect you with independent makers for leather goods, stationery, jewellery and furniture made to order. We help manage design notes, timelines and delivery.',
        detailedPoints: [
          'Introductions to skilled craftspeople',
          'Custom luggage and leather commissions',
          'One-off jewellery and home pieces',
          'Progress updates and safe delivery'
        ],
        example: 'For example, we can commission hand-stitched travel luggage monogrammed to your specification.',
        image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/savile_row_bespoke.jpg',
            caption: 'Traditional handcraft in a London workshop'
          },
          {
            image: '/assets/aistudio/bond_street_jewellery.jpg',
            caption: 'One-off jewellery commission prepared'
          }
        ],
        faqs: [
          {
            q: 'How long does a custom piece take?',
            a: 'Timelines vary by maker; we share clear lead times before you commit.'
          },
          {
            q: 'Can you help shape an idea from scratch?',
            a: 'Yes. Share the occasion and we suggest suitable makers and concepts.'
          }
        ]
      },
      {
        id: 'special-requests',
        title: 'Special Requests',
        shortDesc: 'Hard-to-find requests handled with patience and care.',
        leadParagraph: 'Some requests do not fit neatly into a single category. Tell us what you are looking for, and we will search honestly and tell you what is possible.',
        detailedPoints: [
          'Hard-to-find collectibles and items',
          'Unusual travel or hosting ideas',
          'Discreet research across trusted contacts',
          'Clear answers on what is possible'
        ],
        example: 'For example, we can track down an out-of-print first edition for a milestone birthday.',
        image: '/assets/aistudio/savile_row_bespoke.jpg',
        galleryImages: [
          {
            image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg',
            caption: 'Specialist craftwork prepared to brief'
          },
          {
            image: '/assets/aistudio/sky_gantry_night_1794391688194.jpg',
            caption: 'Thoughtful planning across London'
          }
        ],
        faqs: [
          {
            q: 'What if I am not sure whether something is possible?',
            a: 'Ask us anyway. We will look into it honestly and come back with clear options.'
          },
          {
            q: 'Are there things you will not arrange?',
            a: 'Yes. Everything we do is lawful, ethical and transparent.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Are rare watches and collectibles easy to find?',
        answer: 'No. Rare pieces are always subject to availability, though we use trusted dealers and contacts to search thoroughly.'
      },
      {
        question: 'How does pricing work when you source an item?',
        answer: 'We share clear pricing and terms upfront before you agree to buy anything.'
      },
      {
        question: 'Can you arrange independent checks or valuations?',
        answer: 'Yes. We can introduce qualified specialists to inspect items before purchase.'
      },
      {
        question: 'Can you arrange private watch or jewellery boutique appointments?',
        answer: 'Yes. We coordinate quiet appointments in Mayfair, Bond Street and international flagship boutiques.'
      },
      {
        question: 'Do you help source fine wine and rare spirits?',
        answer: 'Yes. We work with established London wine merchants to locate specific vintages, cases and cellar advice.'
      },
      {
        question: 'Can you help commission bespoke tailoring or custom gifts?',
        answer: 'Yes. We arrange Savile Row fittings, leather craft, monogrammed pieces and personal commissions.'
      },
      {
        question: 'Do you assist with sourcing contemporary or classic art?',
        answer: 'Yes. We introduce galleries, auction specialists and independent art advisers to help you explore works.'
      },
      {
        question: 'How are high-value items delivered once sourced?',
        answer: 'We coordinate insured specialist couriers or personal hand delivery, depending on the piece and destination.'
      },
      {
        question: 'Can you help locate a specific collector car?',
        answer: 'Yes. We connect with established specialist dealers and coordinate viewings, inspections and transport.'
      },
      {
        question: 'Do you advise on investments or financial returns?',
        answer: 'No. We help you find and acquire pieces you wish to own, and never provide financial advice.'
      }
    ]
  }
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    "id": "cal-01",
    "title": "London Fashion Week",
    "month": "Feb",
    "category": "Fashion",
    "description": "We can help arrange show hospitality, showroom appointments, drivers and dinner tables across London, subject to availability.",
    "image": "/assets/aistudio/liberty-department-store-640x360_44860915.jpg"
  },
  {
    "id": "cal-02",
    "title": "Monaco Grand Prix",
    "month": "May",
    "category": "Sport",
    "description": "We can help arrange race viewing, hotel stays, transfers and restaurant tables for the weekend, subject to availability.",
    "image": "/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg"
  },
  {
    "id": "cal-03",
    "title": "Glyndebourne Festival Opera",
    "month": "May–Aug",
    "category": "Music",
    "description": "We can help arrange tickets, interval picnics and chauffeur transfers to Sussex, subject to availability.",
    "image": "/assets/aistudio/royal_opera_gallery.jpg"
  },
  {
    "id": "cal-04",
    "title": "Royal Ascot",
    "month": "Jun",
    "category": "Sport",
    "description": "We can help arrange hospitality, enclosure passes, tailoring fittings and return travel, subject to availability.",
    "image": "/assets/aistudio/calendar_ascot_lawn.jpg"
  },
  {
    "id": "cal-05",
    "title": "Serpentine Pavilion opening",
    "month": "Jun",
    "category": "Art & Culture",
    "description": "We can help arrange summer visits, nearby dining and wider gallery plans in Kensington, subject to availability.",
    "image": "/assets/aistudio/Main-5_c9bf5214.png"
  },
  {
    "id": "cal-06",
    "title": "Wimbledon",
    "month": "Jul",
    "category": "Sport",
    "description": "We can help arrange hospitality packages, return chauffeurs and post-match dinners in London, subject to availability.",
    "image": "/assets/aistudio/wimbledon_centre_court_1794391696846.jpg"
  },
  {
    "id": "cal-07",
    "title": "Goodwood Festival of Speed",
    "month": "Jul",
    "category": "Sport",
    "description": "We can help arrange hospitality passes, country stays and return transport to West Sussex, subject to availability.",
    "image": "/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg"
  },
  {
    "id": "cal-08",
    "title": "Cowdray Gold Cup polo",
    "month": "Jul",
    "category": "Sport",
    "description": "We can help arrange pitchside hospitality, picnic hampers and chauffeur transfers, subject to availability.",
    "image": "/assets/aistudio/leather_saddlery_bench_1794391695162.jpg"
  },
  {
    "id": "cal-09",
    "title": "Goodwood Revival",
    "month": "Sep",
    "category": "Sport",
    "description": "We can help arrange weekend hospitality, period dress sourcing and return travel to Sussex, subject to availability.",
    "image": "/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp"
  },
  {
    "id": "cal-10",
    "title": "Frieze London & Frieze Masters",
    "month": "Oct",
    "category": "Art & Culture",
    "description": "We can help arrange fair passes, gallery schedules, drivers and evening dining across London, subject to availability.",
    "image": "/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg"
  },
  {
    "id": "cal-11",
    "title": "Royal Opera House season",
    "month": "Autumn",
    "category": "Music",
    "description": "We can help arrange seats, boxes, pre-theatre suppers and return cars in Covent Garden, subject to availability.",
    "image": "/assets/aistudio/royal_opera_box_1794391694654.jpg"
  },
  {
    "id": "cal-12",
    "title": "Christmas in London",
    "month": "Dec",
    "category": "Seasonal",
    "description": "We can help arrange festive stays, private dining, personal shopping and seasonal gatherings across London, subject to availability.",
    "image": "/assets/aistudio/five_star_mayfair_suite.jpg"
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    "slug": "a-private-guide-to-london-after-dark",
    "title": "A Private Guide to London After Dark",
    "subtitle": "How to plan a calm, memorable evening across Mayfair, Soho and East London.",
    "category": "London Intelligence",
    "author": "The TGLC Team",
    "excerpt": "London rewards people who know where to go once the dinner rush fades.",
    "metaDescription": "Plan a calm, well-paced evening in London across Mayfair, Soho and East London, from quiet cocktail rooms to live jazz and late-night dining.",
    "relatedServiceId": "dining-nightlife",
    "relatedServiceLabel": "Dining, Nightlife & Social Access",
    "heroImage": "/assets/aistudio/soho_jazz_cellar_1794391689109.jpg",
    "editorialImages": [
      "/assets/aistudio/fitzrovia_absinthe_salon_1794391690208.jpg",
      "/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg",
      "/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg",
      "/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg"
    ],
    "editorialCaptions": [
      "Quiet cocktail salons in Fitzrovia suit unhurried conversation after dinner.",
      "East London listening spaces bring vinyl sound and late-night energy together.",
      "An evening cruise on the Thames shows London from a calmer angle.",
      "A waiting car turns a late finish in central London into an easy trip home."
    ],
    "contentParagraphs": [
      "London changes once the offices empty and the streetlights come on. The loudest rooms grab the headlines, yet the best evenings rarely feel rushed or crowded. Good planning lets you move across neighbourhoods at your own pace.",
      "Most people try to pack too much into a single night. A strong plan focuses on the rhythm of the evening instead. Start somewhere relaxed for drinks, move to a great table, and finish somewhere with real atmosphere.",
      "Knowing which streets stay calm and which venues come alive late makes every decision easier. A little local judgement turns a standard dinner into an evening your guests actually remember."
    ],
    "subheadings": [
      {
        "title": "Choose the right neighbourhood for your mood",
        "paragraphs": [
          "Mayfair and St James’s suit quiet conversation, classic cocktails and attentive dining rooms. The streets feel calm even on busy nights, and hotels sit close to top restaurants. West End streets work well for unhurried dinners with guests or friends.",
          "Soho and Fitzrovia bring sharper energy after dark. Small basement jazz rooms, late wine bars and intimate counters sit tucked down quiet side streets. The mood feels livelier without losing warmth or charm.",
          "Head east to Shoreditch or Clerkenwell if you prefer vinyl listening bars and creative crowds. Converted warehouses and tucked-away rooms offer a different side of the city. Pairing dinner in one district with drinks nearby keeps travel simple."
        ]
      },
      {
        "title": "Build breathing room into your timings",
        "paragraphs": [
          "Central London traffic slows down on rainy evenings and theatre nights. Leaving a generous gap between drinks, dinner and a show keeps the night relaxed. Nobody enjoys watching the clock halfway through a main course.",
          "Think about how you will travel between stops before you head out. A booked driver waiting nearby removes the hassle of finding cabs late at night. It also keeps the route simple if plans shift at short notice.",
          "Late bookings work better when kitchens are not about to close. Checking last-order times ahead of arrival saves awkward rushes over dessert. A calm pace lets the evening unfold naturally."
        ]
      },
      {
        "title": "Pick rooms built for real conversation",
        "paragraphs": [
          "Lighting, seating and acoustics matter far more than a flashy door policy. A good corner booth lets you relax without feeling on display. When we help plan an evening, we ask whether you want lively music or a quiet table.",
          "Late-night venues across London have their own dress codes and entry rules. Checking those details ahead of time prevents awkward moments on the pavement. Tell us what night you have in mind, and we can help arrange it, subject to availability.",
          "Great evenings finish on your own terms rather than when the crowd leaves. Keep your route simple, choose attentive rooms and enjoy the city once the rush fades."
        ]
      }
    ]
  },
  {
    "slug": "the-art-of-the-perfect-london-weekend",
    "title": "The Art of the Perfect London Weekend",
    "subtitle": "Balancing culture, good food and quiet corners across a short stay in the capital.",
    "category": "London Intelligence",
    "author": "The TGLC Team",
    "excerpt": "A memorable London weekend leaves room for quiet walks as well as standout bookings.",
    "metaDescription": "Make the most of a London weekend with practical advice on choosing your neighbourhood, pacing galleries, dining well and leaving room to wander.",
    "relatedServiceId": "travel-aviation",
    "relatedServiceLabel": "Travel & Aviation",
    "heroImage": "/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg",
    "editorialImages": [
      "/assets/aistudio/tglc_st_james_salon.jpg",
      "/assets/aistudio/royal_opera_box_1794391694654.jpg",
      "/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg",
      "/assets/aistudio/cotswolds_manor_estate.jpg"
    ],
    "editorialCaptions": [
      "A calm base in Mayfair or St James’s keeps the whole weekend walkable.",
      "An evening at the opera or theatre anchors a London trip cleanly.",
      "Small counter restaurants reward booking ahead for Friday or Saturday night.",
      "When you have extra time, the English countryside sits within easy reach."
    ],
    "contentParagraphs": [
      "London can easily overwhelm a short trip if every hour is booked solid. Visitors often spend half their weekend in traffic between distant landmarks. A better approach is to group your plans by neighbourhood.",
      "Start by choosing a hotel or residence that fits your mornings. Stay in Mayfair or Marylebone for galleries, boutiques and quiet cafes. Choose Chelsea or Kensington for leafy streets, parks and museums.",
      "When your base sits close to the places you love, walking becomes part of the pleasure. You see more of the city and arrive everywhere feeling fresh."
    ],
    "subheadings": [
      {
        "title": "Anchor each day with one main highlight",
        "paragraphs": [
          "Pick one fixed highlight for Saturday and another for Sunday. That might be a major exhibition, a Covent Garden matinee, or a long lunch with friends. Build the rest of the day loosely around that anchor.",
          "Leaving afternoons partly open gives London space to surprise you. You might browse a bookshop off Mount Street, stroll through Green Park, or find a quiet courtyard cafe. Those unplanned hours often become your favourite memory.",
          "If you travel with family, balance adult stops with park time or lively markets. Nobody enjoys a rigid timetable on a weekend away. A lighter plan keeps everyone in good spirits."
        ]
      },
      {
        "title": "Book key dining tables early",
        "paragraphs": [
          "London’s favourite dining rooms fill up quickly on Friday and Saturday evenings. Securing your main dinner tables before arrival takes stress out of the trip. Keep lunches lighter and flexible so you never feel tied down.",
          "Sunday lunch remains one of the city’s great pleasures. Whether you prefer a pub roast in Belgravia or a quiet hotel dining room, Sunday sets a slower pace. It is a calm way to round off a busy week.",
          "Think about breakfast as well as dinner. A quiet corner table with good coffee starts the morning properly before the streets grow busy. Simple details elevate the whole trip."
        ]
      },
      {
        "title": "Think about arrival and departure details",
        "paragraphs": [
          "The tone of a weekend starts the moment you land. Arranging airport transfers and early check-in requests in advance saves energy after a flight. Smooth luggage handling lets you head straight out into the city.",
          "Before departure day, allow time for a relaxed final morning rather than rushing straight to the airport. A late check-out request or quiet luggage drop gives you space for one last walk or lunch.",
          "If you want to pair London with a country night, plan the rail or road link early. We can help coordinate stays, tables, tickets and drivers across the weekend, subject to availability."
        ]
      }
    ]
  },
  {
    "slug": "beyond-mayfair-londons-most-compelling-cultural-addresses",
    "title": "Beyond Mayfair: London’s Most Compelling Cultural Addresses",
    "subtitle": "Where to look for art, architecture and design across the wider city.",
    "category": "The Cultural Edit",
    "author": "The TGLC Team",
    "excerpt": "Stepping outside Mayfair opens up some of London’s most rewarding galleries, studios and buildings.",
    "metaDescription": "Explore London’s art, architecture and design beyond Mayfair, from Bermondsey and Bankside to Fitzrovia, the Barbican and East London studios.",
    "relatedServiceId": "experiences-culture",
    "relatedServiceLabel": "Experiences, Culture & Entertainment",
    "heroImage": "/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg",
    "editorialImages": [
      "/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg",
      "/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg",
      "/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg",
      "/assets/aistudio/shoreditch_street_couture.jpg"
    ],
    "editorialCaptions": [
      "October brings galleries and collectors together across Regent’s Park and central London.",
      "Bankside pairs river views with major contemporary art institutions.",
      "East London studios and lofts host independent music and design events.",
      "Independent fashion showrooms thrive along Shoreditch and Soho side streets."
    ],
    "contentParagraphs": [
      "Mayfair has long been home to classic galleries, auction houses and bookshops. Yet much of London’s most exciting cultural life sits well beyond the West End. Crossing the river or heading east reveals a completely different creative energy.",
      "Exploring these districts takes a little local knowledge. Galleries and studios sit inside converted warehouses, railway arches and quiet squares. Planning a focused route helps you see more without tiring yourself out.",
      "A thoughtful cultural day pairs big public institutions with smaller independent spaces. That contrast shows why London stays so creatively restless."
    ],
    "subheadings": [
      {
        "title": "South of the river: Bankside and Bermondsey",
        "paragraphs": [
          "The South Bank and Bankside offer major public museums alongside bold modern architecture. Walk east from Tate Modern toward Bermondsey Street and the streets grow quieter. Independent galleries, design shops and neighbourhood bistros line the route.",
          "Bermondsey is also home to craftspeople and studio spaces tucked under Victorian railway arches. Visiting in the late morning gives you quiet galleries followed by an easy lunch nearby. It feels miles away from central shopping crowds.",
          "If you enjoy photography or sculpture, check seasonal openings along the riverfront. Many spaces stay calm on weekday mornings before weekend crowds arrive."
        ]
      },
      {
        "title": "Modernist landmarks in the City and Clerkenwell",
        "paragraphs": [
          "If you love architecture, the Barbican Estate is essential viewing. Its concrete walkways, conservatory and concert halls form one of Britain’s boldest post-war designs. Nearby Clerkenwell adds design showrooms, historic squares and standout dining rooms.",
          "The area works well for a relaxed weekday afternoon. You can pair an architectural walk with a gallery visit and stay on for dinner. Many design showrooms welcome visitors by appointment to view furniture or lighting.",
          "Walk south toward the river and you pass historic churches tucked beside glass towers. Few districts capture London’s mix of old and new so clearly."
        ]
      },
      {
        "title": "Fitzrovia, Marylebone and East London studios",
        "paragraphs": [
          "Just north of Oxford Street, Fitzrovia has become a lively hub for contemporary art galleries. Spaces sit close together, so you can visit several shows on foot. East London adds artist studios, photography spaces and bookshops across Hackney and Shoreditch.",
          "Check exhibition opening days before you set off, as many independent galleries close early in the week. Grouping visits by neighbourhood leaves room for coffee, bookshops and a relaxed lunch between shows.",
          "Whether you collect seriously or simply feel curious, a local guide brings these neighbourhoods to life. We can help arrange gallery routes, tickets and art adviser introductions, subject to availability."
        ]
      }
    ]
  },
  {
    "slug": "the-private-dinner-why-the-table-still-matters",
    "title": "The Private Dinner: Why the Table Still Matters",
    "subtitle": "How thoughtful hosting turns a simple meal into a lasting memory.",
    "category": "Dining & Entertaining",
    "author": "The TGLC Team",
    "excerpt": "The best private dinners focus on comfort, pacing and genuine conversation rather than spectacle.",
    "metaDescription": "Learn what makes a private dinner in London work, from choosing the right room and menu pacing to managing dietary needs and calm, warm hosting.",
    "relatedServiceId": "dining-nightlife",
    "relatedServiceLabel": "Dining, Nightlife & Social Access",
    "heroImage": "/assets/aistudio/rare_cellar_vault.jpg",
    "editorialImages": [
      "/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg",
      "/assets/aistudio/tglc_st_james_salon.jpg",
      "/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg",
      "/assets/aistudio/subrosa_catacomb_dinner.jpg"
    ],
    "editorialCaptions": [
      "Counter dining creates a natural sense of occasion for small groups.",
      "Warm lighting and comfortable chairs keep guests relaxed through the evening.",
      "A short pre-dinner drink helps everyone settle in before sitting down.",
      "Historic cellars and private dining rooms suit milestone family celebrations."
    ],
    "contentParagraphs": [
      "In a busy week filled with quick calls and noisy restaurants, a private table feels rare. A well-hosted dinner gives people space to talk properly without background interruptions. Whether you gather family or business guests, the setting shapes the evening.",
      "Great hosting does not need to feel stiff or theatrical. The best dinners feel warm, well-paced and effortless for everyone around the table. Almost all of that ease comes from quiet preparation done before guests arrive.",
      "When the room, menu and timing work together, hosts can finally relax and enjoy their guests. That is always the real goal."
    ],
    "subheadings": [
      {
        "title": "Match the room to the guest list",
        "paragraphs": [
          "Room size is the most common mistake when booking private dining. A room that is too large feels cold, while a tight table leaves people crowded. Aim for a space that fits your group comfortably with space for drinks beforehand.",
          "Decide early whether a restaurant private room or dining at home makes more sense. A restaurant room brings built-in atmosphere and kitchen energy. Hosting at home with a private chef gives you full control over music and privacy.",
          "Check seating shape as well as capacity. Round tables encourage group conversation, while long tables work best with thoughtful seating plans. Small layout choices make a big difference."
        ]
      },
      {
        "title": "Keep the menu clear and well-paced",
        "paragraphs": [
          "Long tasting menus can stall conversation if dishes arrive constantly with long speeches. A clear, seasonal menu lets guests focus on each other instead of the plate. Sharing starters or classic main courses often relax the table.",
          "Collect dietary notes and drink preferences well ahead of the night. Handling those details quietly means nobody has to explain allergies at the table. Thoughtful alcohol-free pairings alongside wine ensure every guest feels looked after.",
          "Agree the serving rhythm with the kitchen or chef before guests sit down. Steady pacing keeps energy high without making anyone feel hurried out."
        ]
      },
      {
        "title": "Think through arrival and finish",
        "paragraphs": [
          "The first few minutes set the mood. Have coats taken smoothly and offer a drink straight away so early arrivals feel at ease. Warm, gentle lighting keeps the room welcoming from aperitifs through coffee.",
          "Keep sound levels balanced throughout the meal. Soft background music fills early quiet moments without competing with conversation once everyone sits down. Small touches like fresh water and warm plates show quiet care.",
          "At the end of the evening, make sure departures feel just as calm. Waiting cars outside prevent long delays on the pavement. Tell us who you are hosting, and we can help arrange the room, chef and travel, subject to availability."
        ]
      }
    ]
  },
  {
    "slug": "the-new-rules-of-discreet-travel",
    "title": "The New Rules of Discreet Travel",
    "subtitle": "Practical ways to keep international journeys calm, private and well-organised.",
    "category": "Travel Notes",
    "author": "The TGLC Team",
    "excerpt": "Calm travel is built on simple logistics, reliable transfers and thoughtful planning before you leave.",
    "metaDescription": "Practical advice on discreet international travel, covering airport transfers, hotel privacy, flexible schedules and calm itinerary planning today.",
    "relatedServiceId": "travel-aviation",
    "relatedServiceLabel": "Travel & Aviation",
    "heroImage": "/assets/aistudio/MAIN-IMAGE-Shangri-La-The-Shard-London-Illuminate-Yacht-_571087f0.jpg",
    "editorialImages": [
      "/assets/aistudio/6a194620490b49214619b628_file_8wpx83o3_8d7f9f53.png",
      "/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg",
      "/assets/aistudio/luxury_sprinter_jetvan.jpg",
      "/assets/aistudio/swiss_alpine_chalet.jpg"
    ],
    "editorialCaptions": [
      "Private flights are arranged through licensed independent operators.",
      "Coastal stops work best when ground transfers and berths are aligned early.",
      "Spacious chauffeur vehicles keep airport journeys calm for families and teams.",
      "Seasonal mountain stays benefit from advance arrival prep and local drivers."
    ],
    "contentParagraphs": [
      "Modern travel can feel noisy and tiring, even when you fly in comfort. Delays, busy terminals and scattered bookings quickly drain your energy. Discreet travel is not about grand gestures; it is about removing small hassles early.",
      "Good travel planning starts with clarity. Plan each step from your front door to your hotel. That simple rhythm makes every trip feel shorter. Quiet preparation lets you arrive rested for work or family time.",
      "The smoothest journeys rarely look complicated from the outside. They simply reflect careful choices made well before departure day, supported by people who stay ahead of every detail."
    ],
    "subheadings": [
      {
        "title": "Smooth out the edges of every journey",
        "paragraphs": [
          "Most travel stress happens on the ground rather than in the air. Waiting for bags, queueing in crowded lobbies or chasing drivers slows everyone down. Airport meet-and-assist services and pre-booked chauffeurs keep those handovers calm.",
          "When flying privately, flights are operated by licensed independent operators who manage routing and airfield slots. Pairing flight timings closely with ground transport means you move straight from car to cabin without unnecessary waiting.",
          "Pack for ease as well as style. Sending heavy luggage ahead on longer seasonal trips frees your hands and speeds up every connection."
        ]
      },
      {
        "title": "Choose hotels that respect privacy",
        "paragraphs": [
          "Not every famous hotel suits a quiet stay. Busy lobbies and high-profile bars can make it hard to unwind after a flight. Look for properties with discreet entrances, quiet suites and in-room check-in.",
          "Share your preferences before you travel so the room feels right straight away. Simple details like pillow choices, room temperature, quiet floors and breakfast timings matter far more than flashy welcome gifts.",
          "For longer stays with children or security teams, connecting suites or a private residence often work better than standard rooms. Extra space keeps everyone comfortable and well rested throughout the trip."
        ]
      },
      {
        "title": "Keep one clear itinerary and a backup plan",
        "paragraphs": [
          "Complex trips involving families or colleagues work best with one shared schedule. Keep flight numbers, driver contacts and hotel details in one place so nobody hunts through emails.",
          "Double-check passport dates, entry rules and local holiday closures before leaving home. Those quiet checks prevent surprise delays at borders or closed offices once you land.",
          "Weather and schedules change, so build flexible options into the plan. Having one contact who can adjust transfers or dinner times while you fly saves hours of calls. We can help coordinate flights, stays and ground travel, subject to availability."
        ]
      }
    ]
  },
  {
    "slug": "the-english-countryside-reconsidered",
    "title": "The English Countryside, Reconsidered",
    "subtitle": "How to plan a restorative stay in the Cotswolds, Sussex or the Scottish Highlands.",
    "category": "Travel Notes",
    "author": "The TGLC Team",
    "excerpt": "Britain’s countryside offers quiet estates, seasonal cooking and crisp air just a short trip from London.",
    "metaDescription": "Plan a restorative British countryside break across the Cotswolds, Sussex or Scotland with clear advice on choosing estates, dining and travel.",
    "relatedServiceId": "residences-relocation",
    "relatedServiceLabel": "Residences & Relocation",
    "heroImage": "/assets/aistudio/highland_stone_estate_1794391698042.jpg",
    "editorialImages": [
      "/assets/aistudio/cotswolds_manor_estate.jpg",
      "/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg",
      "/assets/aistudio/property-category-highlight-82_3dc00e71.jpg",
      "/assets/aistudio/rare_cellar_vault.jpg"
    ],
    "editorialCaptions": [
      "Cotswolds stone houses make welcoming bases for multi-generational weekends.",
      "Well-prepared homes let you unwind the moment you step through the door.",
      "Quiet gardens and country walks reset the pace after a week in London.",
      "Stocking the kitchen and cellar ahead of arrival keeps evenings effortless."
    ],
    "contentParagraphs": [
      "The English countryside has moved far beyond stiff country hotels and predictable menus. Across the Cotswolds, Oxfordshire, Sussex and Scotland, rural stays now combine deep quiet with great cooking and warm hospitality. A country break resets your pace faster than most flights.",
      "The key to a great rural weekend is matching the setting to the season. Long summer evenings suit garden suppers and polo matches in Sussex. Crisp autumn weekends call for woodland walks, log fires and hearty pub lunches.",
      "Whether you leave London for a weekend or a full school holiday, simple preparation makes rural life feel genuinely relaxing."
    ],
    "subheadings": [
      {
        "title": "Private house or country hotel?",
        "paragraphs": [
          "If you travel as a couple, a small country house hotel gives you great food and zero hosting duties. For families or groups of friends, renting a private house works much better. Everyone gets space to spread out on their own timetable.",
          "When staying in a private house, preparation makes all the difference. Having rooms warmed, fires laid and groceries stocked before arrival means the weekend starts straight away. You can also bring in a local chef for one main dinner.",
          "Check practical details before booking a rural property. Good heating, reliable internet, muddy-boot space and nearby walking trails matter more than formal reception rooms."
        ]
      },
      {
        "title": "Plan around the seasons and local food",
        "paragraphs": [
          "Some of Britain’s best kitchens now sit in quiet villages rather than central London. Farm shops, small bakeries and village pubs have raised standards everywhere. Booking standout country restaurants ahead of time is just as important as in Mayfair.",
          "Think about what everyone in your group wants to do outdoors. Guided walks, horse riding, clay shooting with qualified instructors, or garden visits give the weekend shape. Keep afternoons open for reading by the fire or exploring local markets.",
          "Local produce makes country catering effortless. Ordering seasonal fruit, cheeses and artisan bread ahead of time keeps breakfasts and lunches relaxed."
        ]
      },
      {
        "title": "Keep the journey out of London easy",
        "paragraphs": [
          "Leaving London on a Friday afternoon can test anyone’s patience in heavy traffic. Travel earlier, take a fast train with a waiting driver, or book a licensed helicopter flight.",
          "Pack sturdy boots and a warm coat whatever the forecast says, as British weather changes quickly. Having proper wet-weather gear keeps country walks enjoyable all year round.",
          "A calm arrival sets up the whole weekend. Tell us who is travelling and what pace you want. We can help arrange the stay, travel and local plans, subject to availability."
        ]
      }
    ]
  },
  {
    "slug": "what-to-ask-before-chartering-a-yacht",
    "title": "What to Ask Before Hiring a Yacht",
    "subtitle": "Clear questions that help you choose the right vessel, crew and route.",
    "category": "Travel Notes",
    "author": "The TGLC Team",
    "excerpt": "Choosing the right yacht starts with how your group actually likes to spend time on the water.",
    "metaDescription": "Essential questions to ask before hiring a private yacht, covering cabin layouts, crew style, realistic cruising routes and clear onboard terms.",
    "relatedServiceId": "travel-aviation",
    "relatedServiceLabel": "Travel & Aviation",
    "heroImage": "/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg",
    "editorialImages": [
      "/assets/aistudio/MAIN-IMAGE-Shangri-La-The-Shard-London-Illuminate-Yacht-_571087f0.jpg",
      "/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg",
      "/assets/aistudio/florence_palazzo_courtyard.jpg",
      "/assets/aistudio/mediterranean_superyacht_deck.jpg"
    ],
    "editorialCaptions": [
      "A well-matched deck layout matters more than raw yacht length.",
      "Tender boats make quiet coves and harbour dinners easy to reach.",
      "Pairing coastal cruising with shore visits adds variety to a summer trip.",
      "Clear provisioning notes help the onboard chef tailor every meal."
    ],
    "contentParagraphs": [
      "Hiring a yacht for the first time can feel confusing because listings focus heavily on length and glossy photos. In practice, a great week at sea depends on far more practical details. Asking clear questions early saves disappointment once you step aboard.",
      "Start by thinking honestly about your group. A family with young children needs safe decks, shade and water toys. Friends celebrating a milestone might care more about spacious dining decks, music and easy tender rides ashore.",
      "Good preparation turns a yacht holiday into the easiest break of the year. Everything begins with choosing a vessel that suits your daily rhythm."
    ],
    "subheadings": [
      {
        "title": "Look closely at cabin layout and deck space",
        "paragraphs": [
          "Two yachts of the same length can feel completely different inside. Check whether the cabins have equal comfort or if one master suite dominates the layout. If several couples share the trip, balanced guest cabins keep everyone happy.",
          "Outdoor space matters just as much as the interior. Look at shaded dining areas, swim platforms and easy water access. Most summer days are spent outside on deck rather than inside the main saloon.",
          "Ask about stabilisers at anchor as well as underway. Good stabilisation makes sleeping in quiet bays far more restful for light sleepers and younger guests."
        ]
      },
      {
        "title": "Ask about the crew and onboard style",
        "paragraphs": [
          "The crew shapes the entire atmosphere of a yacht trip. A good captain knows calm anchorages when winds shift and handles harbour logistics smoothly. A thoughtful chef adapts easily to light lunches, children’s meals and celebratory dinners.",
          "Be clear about how formal or relaxed you want service to feel. Filling out your preference sheet thoroughly gives the crew everything they need. Share favourite foods, drinks, allergies and daily routines well before boarding.",
          "If you want water sports instructors, yoga sessions or shore guides along the route, mention those early. Advance notice lets the crew arrange everything cleanly."
        ]
      },
      {
        "title": "Keep your cruising route realistic",
        "paragraphs": [
          "First-time guests often try to cover too many ports in one week. Long stretches at sea eat into swimming time and raise fuel use. Picking one compact coastline, such as the Amalfi Coast, Balearics or Greek islands, delivers a calmer trip.",
          "Book popular beach clubs and harbour dinners ahead during peak summer weeks. Having shore tables lined up lets the captain time anchorages and tender rides effortlessly.",
          "Review what the booking agreement covers and what counts as extra, such as fuel, berths and provisions. Yacht bookings are arranged through licensed brokers, and we can help coordinate routes, dining and transfers, subject to availability."
        ]
      }
    ]
  },
  {
    "slug": "the-quiet-luxury-of-a-beautifully-managed-home",
    "title": "The Quiet Luxury of a Beautifully Managed Home",
    "subtitle": "How simple routines keep a London residence ready whenever you walk through the door.",
    "category": "Private Residences",
    "author": "The TGLC Team",
    "excerpt": "A well-managed home removes everyday chores so you can enjoy your time in London.",
    "metaDescription": "Discover how practical home management keeps a London residence running smoothly, from seasonal upkeep and arrival prep to trusted local support.",
    "relatedServiceId": "residences-relocation",
    "relatedServiceLabel": "Residences & Relocation",
    "heroImage": "/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg",
    "editorialImages": [
      "/assets/aistudio/01-Lethbridge-House-20-Cornwall-Terrace-Marylebone-London-UK-640x360_b59e806c.jpg",
      "/assets/aistudio/property-category-highlight-82_3dc00e71.jpg",
      "/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg",
      "/assets/aistudio/harley_medical_suite_1794391696088.jpg"
    ],
    "editorialCaptions": [
      "Period London townhouses benefit from regular, preventative upkeep.",
      "Calm interiors stay welcoming when lighting, heating and linen are prepared ahead of time.",
      "Modern apartments require clear coordination with building management and concierges.",
      "Everyday household admin works best when handled quietly in the background."
    ],
    "contentParagraphs": [
      "Owning a home in London is a joy when it runs smoothly, and a constant distraction when it does not. Boiler checks, deliveries, tradespeople and seasonal upkeep pile up quickly if you split time between cities. True comfort comes from quiet reliability.",
      "Walking into your residence after a long flight should feel restorative. Fresh linen, comfortable heating, working lighting and a stocked kitchen turn a house back into a home straight away. None of that happens by chance; it comes from clear systems.",
      "Good home management stays invisible until you need it. Everything works simply because someone checks the small things before they break."
    ],
    "subheadings": [
      {
        "title": "Stay ahead of routine maintenance",
        "paragraphs": [
          "Period London townhouses and modern apartments both need regular care. Small issues like a slow drain, a flickering dimmer or a sticking window are easier to fix early. A simple seasonal checklist keeps everything working quietly.",
          "Keeping a clear log of servicing dates, manuals and reliable tradespeople saves endless time. When someone checks the house while you are away, routine inspections catch leaks or damp early. Preventative care protects comfort and value.",
          "Good buildings also rely on smooth communication with managing agents, neighbours and porters. Handling notices and deliveries promptly stops small annoyances from growing."
        ]
      },
      {
        "title": "Prepare the house before every arrival",
        "paragraphs": [
          "If you visit London periodically, pre-arrival preparation changes how the home feels. Airing rooms, setting the heating, placing flowers and stocking groceries make the first evening effortless. You can unpack and relax instead of visiting shops.",
          "The same care applies when you leave. Closing down a property properly gives you peace of mind while you travel. Clearing fresh food, checking locks, managing post and scheduling regular visits keep the residence secure and ready.",
          "Keep a simple preference sheet covering coffee, water, flowers and linen choices. Every arrival then feels familiar without repeating instructions."
        ]
      },
      {
        "title": "Keep household support clear and discreet",
        "paragraphs": [
          "Whether you need occasional housekeeping, keyholding, or help coordinating decorators, clear communication matters most. Agreeing house rules, access schedules and privacy standards upfront avoids misunderstandings.",
          "Keep one trusted local point of contact who knows your property well. Having a single person coordinate deliveries, utilities and repairs spares you constant phone calls across time zones.",
          "Buying, letting or relocating to London? We are not estate agents, so we introduce you to regulated professionals. Once you have the keys, we can help coordinate ongoing home support and trades, subject to availability. That steady continuity keeps your residence calm all year."
        ]
      }
    ]
  },
  {
    "slug": "the-art-of-bespoke-tailoring-savile-row",
    "title": "Savile Row Tailoring: What to Know Before Your First Fitting",
    "subtitle": "A plain-English guide to commissioning a handmade suit in Mayfair.",
    "category": "Objects of Desire",
    "author": "The TGLC Team",
    "excerpt": "Commissioning a suit on Savile Row is rewarding once you understand cloth, cut and fittings.",
    "metaDescription": "A plain-English guide to your first Savile Row tailoring appointment, covering house styles, cloth choices, fittings and realistic expectations.",
    "relatedServiceId": "luxury-sourcing",
    "relatedServiceLabel": "Luxury Sourcing & Acquisitions",
    "heroImage": "/assets/aistudio/savile_row_shears.jpg",
    "editorialImages": [
      "/assets/aistudio/luxury_streetwear_salon_1794391693258.jpg",
      "/assets/aistudio/tglc_st_james_salon.jpg",
      "/assets/aistudio/leather_saddlery_bench_1794391695162.jpg",
      "/assets/aistudio/shoreditch_street_couture.jpg"
    ],
    "editorialCaptions": [
      "A good wardrobe balances classic tailoring with relaxed modern pieces.",
      "Mayfair fitting rooms sit just minutes from Albemarle Street and Burlington Gardens.",
      "Handmade leather goods and shoes pair naturally with tailored clothing.",
      "Thoughtful cloth selection ensures garments work across different climates."
    ],
    "contentParagraphs": [
      "Stepping into a Savile Row house for the first time can feel daunting. Yet the best cutters are warm, practical people. Their job is not to lecture you on rules; it is to make clothes that fit your body and life. Knowing a few basics beforehand helps every conversation.",
      "Before your first appointment, think about where you will actually wear the garment. A suit for summer travel needs a very different cloth from one meant for London winters. Being honest about how you dress guides every choice that follows.",
      "Good tailoring is a calm partnership between client and cutter. The clearer you are about comfort and lifestyle, the better the finished garment feels."
    ],
    "subheadings": [
      {
        "title": "Understand house style before choosing a tailor",
        "paragraphs": [
          "Every tailoring house has its own silhouette. Some favour a sharper, structured shoulder with a defined waist, while others cut a softer, lighter drape. Looking at finished garments in the fitting room quickly shows what each house does best.",
          "Pick a tailor whose natural house style already appeals to you. Asking a structured house to cut an unlined Italian jacket rarely works well. Choosing a cutter whose eye matches yours leads to a far happier result.",
          "Do not hesitate to ask questions about lapel width, trouser rise and pocket style. Experienced cutters welcome thoughtful clients who know what feels comfortable."
        ]
      },
      {
        "title": "Choose cloth for comfort and longevity",
        "paragraphs": [
          "Swatches can feel overwhelming when shelves of cloth books sit on the table. Heavier wool cloths often drape cleanly and crease less during travel than ultra-fine fabrics. High-twist wools breathe well in warm climates while holding a crisp line.",
          "Listen closely to your cutter’s advice on weight and weave. A classic navy worsted, mid-grey flannel or textured blazer earns its keep for years. Save bolder checks and rare cloths for later once your pattern is settled.",
          "Remember to bring the shoes and shirt style you plan to wear with the suit. Those details help set trouser length and collar fit accurately."
        ]
      },
      {
        "title": "Allow patience for the fittings",
        "paragraphs": [
          "True bespoke tailoring takes time and involves several fittings from basted canvas to finished cloth. Stand naturally during fittings rather than pulling your shoulders back stiffly. Tell your cutter if anything feels tight when you sit or reach.",
          "Once your paper pattern is refined, future orders become much quicker and simpler. Good care—proper wooden hangers, gentle brushing and light steaming—keeps a handmade suit looking sharp for years.",
          "We can help arrange private introductions and fitting schedules on Savile Row and across Mayfair, subject to availability."
        ]
      }
    ]
  },
  {
    "slug": "the-horological-renaissance-closed-door-watch-salons",
    "title": "Collecting Fine Watches in London: Where to Begin",
    "subtitle": "A calm guide to exploring boutiques, independent makers and vintage dealers.",
    "category": "Objects of Desire",
    "author": "The TGLC Team",
    "excerpt": "Building a watch collection is more enjoyable when you focus on craft, condition and personal taste.",
    "metaDescription": "Start collecting fine watches in London with clear advice on exploring Mayfair boutiques, independent watchmakers, condition checks and care.",
    "relatedServiceId": "luxury-sourcing",
    "relatedServiceLabel": "Luxury Sourcing & Acquisitions",
    "heroImage": "/assets/aistudio/About-Luxury-Watches_77cb4520.jpg",
    "editorialImages": [
      "/assets/aistudio/bond_street_jewellery.jpg",
      "/assets/aistudio/tglc_st_james_salon.jpg",
      "/assets/aistudio/spitalfields_crypt_exchange_1794391691802.jpg",
      "/assets/aistudio/leather_saddlery_bench_1794391695162.jpg"
    ],
    "editorialCaptions": [
      "Bond Street and Burlington Arcade bring flagship boutiques and vintage specialists together.",
      "Private appointments give you quiet time to compare pieces on the wrist.",
      "Taking time to study dial details helps you recognise genuine condition.",
      "Custom watch rolls and cases protect pieces when you travel."
    ],
    "contentParagraphs": [
      "London is one of the best cities in the world for anyone interested in fine watches. Within a short walk of Bond Street and Burlington Arcade sit Swiss maisons, independent watchmakers, auction houses and vintage dealers. The challenge is cutting through market hype.",
      "The best collections are built slowly around watches you genuinely enjoy wearing. Chasing waiting lists purely for headlines rarely brings lasting pleasure. Spending quiet time handling pieces on your wrist teaches you far more than online forums.",
      "A little patience and honest advice save costly mistakes early on. Focus on what speaks to you rather than what trends this month."
    ],
    "subheadings": [
      {
        "title": "Try pieces in person before deciding",
        "paragraphs": [
          "Case size numbers on a spec sheet rarely tell the full story. Lug shape, thickness and bracelet weight all change how a watch feels on your wrist. A well-proportioned dress watch can feel natural even if you usually wear sports models.",
          "Book quiet boutique or showroom appointments when you want to compare options properly. Sitting down without a rush lets you inspect dial finishing, movement details and clasp comfort in natural light.",
          "Notice how easily a piece fits under a shirt cuff and how clear the dial feels at a glance. Practical comfort determines which watches you actually wear."
        ]
      },
      {
        "title": "Look closely at condition and provenance",
        "paragraphs": [
          "If you explore vintage or pre-owned watches, condition matters above almost everything else. Check whether case edges remain crisp, whether the dial is original and whether service history is documented. Honest specialists explain both strengths and flaws clearly.",
          "Always ask about authenticity checks, servicing needs and warranty terms before buying. Mechanical watches need periodic maintenance by skilled watchmakers, so factoring in aftercare protects your piece over time.",
          "Keep original boxes, papers and service receipts together from day one. Good records make insurance and future valuations much simpler."
        ]
      },
      {
        "title": "Explore independent makers alongside classic houses",
        "paragraphs": [
          "Major Swiss brands offer deep heritage and easy global servicing, yet independent watchmakers bring remarkable hand finishing and character. Seeing both side by side sharpens your eye quickly. Many collectors pair one dependable daily watch with a quieter dress piece.",
          "Remember storage and travel care once your collection grows. A good travel roll and sensible home security keep valuable pieces protected whether you are in London or abroad.",
          "Take your time, ask direct questions and buy from reputable dealers. If you want help sourcing a reference or arranging boutique appointments in London, our team can help, subject to availability."
        ]
      }
    ]
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'General',
    question: 'Who is TGLC for?',
    answer: 'We look after individuals, families and senior business leaders whose time is genuinely scarce — people who care deeply about how a trip, dinner or home feels, but have no desire to spend their own evenings chasing bookings, comparing operators or managing logistics. Whether you live in London full-time, divide your year between several countries or simply want one dependable Mayfair desk who already knows your taste, TGLC is built to take the background friction out of life.'
  },
  {
    id: 'faq-02',
    category: 'General',
    question: 'How do I join?',
    answer: 'Membership begins with a brief, private conversation — never a cold checkout screen. Send a short enquiry online or telephone our office on Albemarle Street, and we will arrange an unhurried chat in person or by video call to hear how you live and travel. If we both feel it is a natural fit, we put forward a clear written proposal tailored around your household.'
  },
  {
    id: 'faq-03',
    category: 'General',
    question: 'How much does membership cost?',
    answer: 'Because no two households use a concierge the same way, we do not push members into a rigid off-the-shelf tier. After an introductory conversation, we share transparent membership terms shaped around your rhythm — whether you need focused London support, year-round global travel coordination or multi-generational family office coverage. Every fee and third-party supplier cost is always agreed in writing before anything is booked.'
  },
  {
    id: 'faq-04',
    category: 'General',
    question: 'How do I reach my lifestyle manager?',
    answer: 'Whichever way feels most natural in the moment — direct telephone, WhatsApp, email or stepping into our Mayfair office on Albemarle Street. You are never routed through a script or a rotating call centre; you deal with a named lifestyle manager who already knows your preferences, your family and what you have coming up.'
  },
  {
    id: 'faq-05',
    category: 'General',
    question: 'Can you help at short notice?',
    answer: 'Often, yes — last-minute changes are one of the main reasons members rely on us. Whether a diary opens unexpectedly for dinner in Mayfair, a flight needs re-timing or you decide to slip out to the countryside for the weekend, message us straight away. We speak directly with our contacts, work fast and give you an honest picture of what can realistically be secured.'
  },
  {
    id: 'faq-06',
    category: 'General',
    question: 'Can you promise a sold-out table or event?',
    answer: 'No concierge can honestly guarantee a genuinely sold-out room or championship final, and we believe you deserve straight talking rather than empty promises. What we do is draw on real relationships with restaurant directors, hosts and official hospitality channels to give you the strongest possible chance — keeping you updated candidly and always securing a thoughtful back-up plan if a venue is completely full.'
  },
  {
    id: 'faq-07',
    category: 'General',
    question: 'Do you work outside the UK?',
    answer: 'Yes. While our home desk sits in the heart of Mayfair, our members’ lives rarely stop at the M25. We coordinate private aviation, flagship hotels, coastal villas, alpine chalets, local chauffeurs and standout dining tables across Europe, North America, the Middle East and beyond through trusted local partners.'
  },
  {
    id: 'faq-08',
    category: 'General',
    question: 'Can my family or personal assistant use the service?',
    answer: 'Yes — and many members find that is where TGLC saves the most time. Depending on how you set up your membership, your partner, immediate household, personal assistant or family office can reach our desk directly within clear guidelines you approve, keeping family plans, travel itineraries and billing smoothly aligned.'
  },
  {
    id: 'faq-09',
    category: 'General',
    question: 'How do you protect my privacy?',
    answer: 'Discretion sits at the centre of everything we do. Only the small team directly looking after your account has access to your preferences, we share strictly the minimum details a supplier requires to honour a booking, and we never publish member names, client stories or photographs for publicity.'
  },
  {
    id: 'faq-10',
    category: 'General',
    question: 'Do you give legal, financial, property or medical advice?',
    answer: 'No — we stay strictly within our expertise as lifestyle and concierge managers. Whenever a request touches regulated territory such as estate agency, private banking, immigration law, tax or clinical care, we gladly introduce established, properly regulated independent professionals and coordinate all practical scheduling around their advice.'
  }
];
