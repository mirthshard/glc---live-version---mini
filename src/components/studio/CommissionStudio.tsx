/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { GoldDivider } from '../common/GoldDivider';
import { SmartImage } from '../common/SmartImage';
import { TGLC_CONTACT } from '../../data/tglcData';
import {
  Shield,
  ArrowRight,
  Check,
  Calendar,
  MapPin,
  Users,
  Copy,
  Printer,
  Lock,
  Send,
  CheckCircle2,
  Clock,
  Compass,
  Info,
  Download,
  CheckSquare,
  Square,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type PlanCategory =
  | 'All'
  | 'Nightlife & Music'
  | 'Historic London'
  | 'Sport & Motoring'
  | 'Travel & Sea'
  | 'Country & Dining'
  | 'Culture & Wellness';

interface StudioPlan {
  id: string;
  category: Exclude<PlanCategory, 'All'>;
  title: string;
  tagline: string;
  image: string;
  location: string;
  duration: string;
  defaultHours: number;
  guidanceNote: string;
  deliverables: string[];
}

interface SampleBrief {
  id: string;
  title: string;
  badge: string;
  summary: string;
  rationale: string;
  image: string;
  planId: string;
  transportId: string;
  privacyId: string;
  vehicleStyleId: string;
  arrivalId: string;
  hospitalityId: string;
  supportId: string;
  hours: number;
  referenceLabel: string;
  departurePoint: string;
  guestCount: string;
  targetDate: string;
  notes: string;
}

const PLAN_CATEGORIES: PlanCategory[] = [
  'All',
  'Nightlife & Music',
  'Historic London',
  'Sport & Motoring',
  'Travel & Sea',
  'Country & Dining',
  'Culture & Wellness',
];

const STUDIO_PLANS: StudioPlan[] = [
  // 1. Nightlife & Music
  {
    id: 'late-night-sound-room',
    category: 'Nightlife & Music',
    title: 'Late-Night Vinyl Club & Private Booth',
    tagline: 'Private tables at a licensed London sound room with waiting cars home.',
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    location: 'Central & South London',
    duration: 'Late Evening',
    defaultHours: 6,
    guidanceNote: 'We coordinate table hosting, arrival timing and waiting cars, subject to availability.',
    deliverables: [
      'Reserved booth inside a licensed late-night music room',
      'Pre-arranged drinks list waiting at your table',
      'Dedicated chauffeur waiting outside for a calm return',
    ],
  },
  {
    id: 'shoreditch-loft-gathering',
    category: 'Nightlife & Music',
    title: 'Shoreditch Loft Supper & Vinyl Night',
    tagline: 'A hired East London loft with private catering and guest DJs.',
    image: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
    location: 'Shoreditch, London E2',
    duration: 'Evening',
    defaultHours: 6,
    guidanceNote: 'Ideal for birthdays or private launches where you want control over music and guests.',
    deliverables: [
      'Private loft hire with licensed sound setup and host',
      'Tailored late-night menu and bar service for your party',
      'Coordinated chauffeur pick-ups and drop-offs across London',
    ],
  },
  {
    id: 'soho-fashion-listening-evening',
    category: 'Nightlife & Music',
    title: 'Soho Private Styling & Listening Bar',
    tagline: 'Private showroom appointments followed by a quiet Mayfair listening lounge.',
    image: '/assets/aistudio/luxury_streetwear_salon_1794391693258.jpg',
    location: 'Soho & Mayfair, London W1',
    duration: 'Afternoon & Evening',
    defaultHours: 6,
    guidanceNote: 'Great for visiting guests who want quiet shopping followed by unhurried drinks.',
    deliverables: [
      'Private showroom viewing with independent menswear or fashion stylists',
      'Chauffeur link between Soho boutiques and Mayfair bars',
      'Reserved corner booth for late-evening music and drinks',
    ],
  },

  // 2. Historic London
  {
    id: 'thames-cruise-vault-dinner',
    category: 'Historic London',
    title: 'Evening Thames Cruise & Cellar Dinner',
    tagline: 'A licensed river cruise followed by dinner inside a historic City cellar.',
    image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
    location: 'Thames Pier to City of London',
    duration: 'Evening',
    defaultHours: 6,
    guidanceNote: 'Combining river travel with a City cellar keeps evening transit calm and memorable.',
    deliverables: [
      'Licensed private boat cruise with skipper along floodlit bridges',
      'Private candlelit dinner inside a hired historic vault',
      'Waiting chauffeur cars arranged for the journey home',
    ],
  },
  {
    id: 'heritage-underground-evening',
    category: 'Historic London',
    title: 'Heritage Underground Tour & Private Supper',
    tagline: 'A guided visit to historic London spaces followed by dinner in Mayfair.',
    image: '/assets/aistudio/down_street_station_1794391687146.jpg',
    location: 'Mayfair & Central London',
    duration: 'Evening',
    defaultHours: 5,
    guidanceNote: 'Private heritage visits run through official venue programmes and are subject to availability.',
    deliverables: [
      'Private group tour with an official London heritage guide',
      'Reserved private dining room nearby with set wine pairings',
      'Direct chauffeur transfers between your hotel and each stop',
    ],
  },
  {
    id: 'landmark-recital-terrace',
    category: 'Historic London',
    title: 'River Landmark Hire & Private Recital',
    tagline: 'An evening drinks reception and acoustic performance at a hired London landmark.',
    image: '/assets/aistudio/tower_bascule_vault_1794391687426.jpg',
    location: 'Central London Riverside',
    duration: 'Evening',
    defaultHours: 6,
    guidanceNote: 'Historic London landmarks need advance planning so venue approvals stay smooth.',
    deliverables: [
      'Private event hire coordinated directly with the venue team',
      'Live chamber musicians booked for your private reception',
      'Riverside boat or chauffeur departures after the final toast',
    ],
  },

  // 3. Sport & Motoring
  {
    id: 'arena-fight-night-hospitality',
    category: 'Sport & Motoring',
    title: 'London Fight Night Ringside & Dinner',
    tagline: 'Prime seats at a licensed London bout with dinner and waiting cars.',
    image: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
    location: 'London Arenas',
    duration: 'Evening',
    defaultHours: 6,
    guidanceNote: 'We arrange hospitality tickets, nearby dining and waiting drivers, subject to availability.',
    deliverables: [
      'Ringside seats and official arena hospitality lounge entry',
      'Early dinner table booked close to the venue',
      'Dedicated driver waiting for straightforward post-fight departure',
    ],
  },
  {
    id: 'championship-sport-suite',
    category: 'Sport & Motoring',
    title: 'Major Arena Suite & Private Transfers',
    tagline: 'Hosted hospitality at major London sporting events with smooth arrivals.',
    image: '/assets/aistudio/ufc_arena_ringside.jpg',
    location: 'Greenwich & Wembley',
    duration: 'Evening',
    defaultHours: 6,
    guidanceNote: 'Booking dinner and transport early takes the crowd stress out of big arena nights.',
    deliverables: [
      'Official suite or hospitality seating arranged subject to availability',
      'Tailored food and drinks service for your guests',
      'Chauffeur staging for direct departure after the event',
    ],
  },
  {
    id: 'track-day-driving-tour',
    category: 'Sport & Motoring',
    title: 'Private Track Day & Grand Touring Weekend',
    tagline: 'UK circuit sessions or European driving weekends with full support.',
    image: '/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg',
    location: 'UK Circuits & European Passes',
    duration: 'Weekend',
    defaultHours: 16,
    guidanceNote: 'We coordinate circuit bookings, luggage vans, hotels and secure overnight parking.',
    deliverables: [
      'Private circuit day or driving club booking with qualified instructors',
      'Support vehicle for luggage along your chosen route',
      'Country hotels and secure garages booked along the way',
    ],
  },

  // 4. Travel & Sea
  {
    id: 'london-tuscany-villa-escape',
    category: 'Travel & Sea',
    title: 'London to Tuscany Flight & Villa Stay',
    tagline: 'Private flights arranged via licensed operators with a staffed Tuscan villa.',
    image: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
    location: 'London to Florence & Tuscany',
    duration: 'Long Weekend',
    defaultHours: 24,
    guidanceNote: 'Flights are operated by licensed independent operators. We align cars, villas and dining.',
    deliverables: [
      'Private flight arranged through a licensed independent operator',
      'Chauffeur transfers from your London door and in Italy',
      'Private villa prepared ahead of arrival with local chef options',
    ],
  },
  {
    id: 'riviera-yacht-stay',
    category: 'Travel & Sea',
    title: 'Riviera Yacht Holiday & Coastal Dining',
    tagline: 'Mediterranean yacht hire arranged via licensed brokers with coastal tables.',
    image: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
    location: 'French Riviera & Monaco',
    duration: 'Long Weekend',
    defaultHours: 24,
    guidanceNote: 'Yacht bookings are handled through licensed brokers, while we coordinate shore plans.',
    deliverables: [
      'Introduction to licensed yacht brokers for suitable vessels',
      'Airport transfers and local helicopter hops where helpful',
      'Harbour restaurants and beach club tables reserved ahead',
    ],
  },
  {
    id: 'long-haul-private-flight-support',
    category: 'Travel & Sea',
    title: 'International Flight & Ground Logistics',
    tagline: 'End-to-end trip coordination for business or family travel overseas.',
    image: '/assets/aistudio/6a5e4f29ca98c820c85071cd_file_l7dpoy6z_91be91a5.png',
    location: 'London & Worldwide',
    duration: 'Multi-Day Trip',
    defaultHours: 12,
    guidanceNote: 'Flights are operated by licensed independent operators. One itinerary covers every leg.',
    deliverables: [
      'Private or commercial flight coordination with airport meet-and-assist',
      'Hotel suites, connecting rooms and in-room check-in arranged',
      'Trusted local chauffeurs ready at every destination',
    ],
  },

  // 5. Country & Dining
  {
    id: 'cotswolds-house-weekend',
    category: 'Country & Dining',
    title: 'Cotswolds Country House & Private Chef',
    tagline: 'A staffed rural house in Oxfordshire or Gloucestershire for family weekends.',
    image: '/assets/aistudio/cotswolds_manor_estate.jpg',
    location: 'Oxfordshire & Cotswolds',
    duration: 'Weekend',
    defaultHours: 16,
    guidanceNote: 'We stock the house ahead of arrival and arrange local chefs and outdoor guides.',
    deliverables: [
      'Private country house prepared with groceries, flowers and lit fires',
      'Private chef booked for a seasonal weekend feast',
      'Guided country walks or clay shooting with qualified instructors',
    ],
  },
  {
    id: 'scottish-highlands-retreat',
    category: 'Country & Dining',
    title: 'Perthshire Estate & Distillery Visits',
    tagline: 'A quiet Highland lodge with river fishing, local guides and whisky tastings.',
    image: '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
    location: 'Perthshire, Scotland',
    duration: 'Long Weekend',
    defaultHours: 24,
    guidanceNote: 'We coordinate flights, estate transfers, local ghillies and distillery appointments.',
    deliverables: [
      'Private stone lodge stay arranged with full household prep',
      'River fishing days with experienced local estate ghillies',
      'Private distillery tastings booked across Speyside or Perthshire',
    ],
  },
  {
    id: 'intimate-chef-counter-dinner',
    category: 'Country & Dining',
    title: 'Private Chef Counter & Wine Pairing',
    tagline: 'Seats or a full buyout at an intimate London chef counter.',
    image: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg',
    location: 'Mayfair & Marylebone',
    duration: 'Evening',
    defaultHours: 4,
    guidanceNote: 'Early notice helps us secure counter buyouts and note every dietary preference.',
    deliverables: [
      'Private chef counter reservation or full seating buyout',
      'Tailored wine, sake or non-alcoholic pairing list',
      'Discreet waiting car for door-to-door evening travel',
    ],
  },

  // 6. Culture & Wellness
  {
    id: 'savile-row-watches-day',
    category: 'Culture & Wellness',
    title: 'Savile Row Fitting & Watch Viewing',
    tagline: 'Private Mayfair tailoring appointments paired with quiet dealer watch viewings.',
    image: '/assets/aistudio/savile_row_bespoke.jpg',
    location: 'Mayfair & St James’s',
    duration: 'Half Day',
    defaultHours: 4,
    guidanceNote: 'Ideal for a relaxed Mayfair afternoon built around your personal taste.',
    deliverables: [
      'Private appointment arranged with a Savile Row tailoring house',
      'Quiet watch viewing with a reputable London specialist dealer',
      'Lunch booked nearby at a classic St James’s dining room',
    ],
  },
  {
    id: 'opera-gallery-evening',
    category: 'Culture & Wellness',
    title: 'Covent Garden Opera & Gallery Preview',
    tagline: 'Private art viewings in Mayfair followed by an evening at the opera.',
    image: '/assets/aistudio/royal_opera_box_1794391694654.jpg',
    location: 'Mayfair & Covent Garden',
    duration: 'Afternoon & Evening',
    defaultHours: 8,
    guidanceNote: 'We align gallery appointments, pre-theatre drinks and interval hospitality cleanly.',
    deliverables: [
      'Private afternoon appointments with London galleries or art advisers',
      'Opera seats or box hospitality arranged subject to availability',
      'Chauffeur transfers timed cleanly for curtain-up and departure',
    ],
  },
  {
    id: 'wellness-recovery-day',
    category: 'Culture & Wellness',
    title: 'London Wellness Appointments & Spa Day',
    tagline: 'Private clinic scheduling, physiotherapy and restorative spa stays in London.',
    image: '/assets/aistudio/harley_medical_suite_1794391696088.jpg',
    location: 'Marylebone & Mayfair',
    duration: 'Half Day',
    defaultHours: 4,
    guidanceNote: 'We do not give medical advice; we help arrange appointments with qualified professionals.',
    deliverables: [
      'Private appointment scheduling with qualified clinics or therapists',
      'Quiet hotel spa suite booked for afternoon rest',
      'Chauffeur transfers timed gently around your diary',
    ],
  },
];

const SAMPLE_BRIEFS: SampleBrief[] = [
  {
    id: 'brief-late-music',
    title: 'Mayfair Dinner & Late Vinyl Club',
    badge: 'Nightlife & Music',
    summary: 'Quiet dinner in Mayfair followed by a private booth and waiting chauffeur.',
    rationale: 'Designed for guests who want great late-night music in London without door stress or hurried travel.',
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    planId: 'late-night-sound-room',
    transportId: 'mercedes-maybach',
    privacyId: 'discreet-coordination',
    vehicleStyleId: 'saloon-privacy',
    arrivalId: 'door-to-door',
    hospitalityId: 'fine-wine-champagne',
    supportId: 'lifestyle-manager',
    hours: 6,
    referenceLabel: 'MAYFAIR-LATE',
    departurePoint: 'Mayfair, London W1',
    guestCount: '4 guests',
    targetDate: 'Saturday evening',
    notes: 'Quiet dinner table first, then late music booth and waiting car.',
  },
  {
    id: 'brief-thames-cellar',
    title: 'Thames Evening Cruise & Vault Dinner',
    badge: 'Historic London',
    summary: 'A licensed evening boat cruise followed by candlelit dining in the City.',
    rationale: 'Pairs a calm river journey past floodlit bridges with private dining in a historic London cellar.',
    image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
    planId: 'thames-cruise-vault-dinner',
    transportId: 'river-launch',
    privacyId: 'private-hosting',
    vehicleStyleId: 'saloon-privacy',
    arrivalId: 'thames-pier',
    hospitalityId: 'fine-wine-champagne',
    supportId: 'private-chef-team',
    hours: 6,
    referenceLabel: 'THAMES-EVENING',
    departurePoint: 'Chelsea or Westminster Pier',
    guestCount: '6 guests',
    targetDate: 'Thursday evening',
    notes: 'Seasonal tasting menu, classic Burgundy pairings and return chauffeurs.',
  },
  {
    id: 'brief-fight-night',
    title: 'London Fight Night & Late Supper',
    badge: 'Sport & Motoring',
    summary: 'Ringside seats at a licensed arena bout with dinner and return cars.',
    rationale: 'Keeps a busy arena evening smooth with early dining, hosted seating and a driver ready outside.',
    image: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
    planId: 'arena-fight-night-hospitality',
    transportId: 'range-rover-chauffeur',
    privacyId: 'licensed-security-referral',
    vehicleStyleId: 'suv-comfort',
    arrivalId: 'door-to-door',
    hospitalityId: 'sommelier-selection',
    supportId: 'lifestyle-manager',
    hours: 6,
    referenceLabel: 'LONDON-RINGSIDE',
    departurePoint: 'Belgravia, London SW1',
    guestCount: '4 guests',
    targetDate: 'Friday evening',
    notes: 'Pre-fight dinner nearby and calm departure after the main event.',
  },
  {
    id: 'brief-riviera-escape',
    title: 'London to Riviera Yacht Weekend',
    badge: 'Travel & Sea',
    summary: 'Private flight via licensed operators paired with coastal yacht cruising.',
    rationale: 'Connects flight timings, airport transfers and harbour tables into one simple family itinerary.',
    image: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
    planId: 'riviera-yacht-stay',
    transportId: 'private-jet-operator',
    privacyId: 'discreet-coordination',
    vehicleStyleId: 'saloon-privacy',
    arrivalId: 'private-terminal',
    hospitalityId: 'fine-wine-champagne',
    supportId: 'household-support',
    hours: 24,
    referenceLabel: 'RIVIERA-SEA',
    departurePoint: 'London to Nice',
    guestCount: '6 family guests',
    targetDate: 'Summer long weekend',
    notes: 'Balanced guest cabins, light Mediterranean menus and tender transfers.',
  },
  {
    id: 'brief-highland-stay',
    title: 'Perthshire Estate & Country Break',
    badge: 'Country & Dining',
    summary: 'A quiet Highland lodge weekend with fishing, walks and distillery visits.',
    rationale: 'Prepares the house before you arrive so the entire trip feels calm from the first evening.',
    image: '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
    planId: 'scottish-highlands-retreat',
    transportId: 'helicopter-operator',
    privacyId: 'discreet-coordination',
    vehicleStyleId: 'suv-comfort',
    arrivalId: 'regional-heliport',
    hospitalityId: 'sommelier-selection',
    supportId: 'household-support',
    hours: 24,
    referenceLabel: 'HIGHLAND-STAY',
    departurePoint: 'London to Perthshire',
    guestCount: '4 guests',
    targetDate: 'Autumn weekend',
    notes: 'Estate kitchen stocked ahead, local ghillie booked and fires lit.',
  },
  {
    id: 'brief-opera-gallery',
    title: 'Mayfair Galleries & Covent Garden Opera',
    badge: 'Culture & Wellness',
    summary: 'Afternoon gallery viewings followed by an evening box at Covent Garden.',
    rationale: 'Combines quiet Bond Street appointments with unhurried interval hospitality and chauffeur transfers.',
    image: '/assets/aistudio/royal_opera_box_1794391694654.jpg',
    planId: 'opera-gallery-evening',
    transportId: 'rolls-royce-phantom',
    privacyId: 'discreet-coordination',
    vehicleStyleId: 'saloon-privacy',
    arrivalId: 'door-to-door',
    hospitalityId: 'fine-wine-champagne',
    supportId: 'lifestyle-manager',
    hours: 8,
    referenceLabel: 'COVENT-GARDEN',
    departurePoint: 'Mayfair, London W1',
    guestCount: '4 guests',
    targetDate: 'Thursday evening',
    notes: 'Afternoon art viewing, chilled champagne at the interval and late supper.',
  },
];

const TRANSPORT_OPTIONS = [
  {
    id: 'mercedes-maybach',
    name: 'Mercedes-Maybach S-Class Chauffeur',
    type: 'City Chauffeur',
    category: 'Road',
    desc: 'Quiet saloon with rear privacy glass for smooth Mayfair and West End evenings.',
    image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
  },
  {
    id: 'rolls-royce-cullinan',
    name: 'Rolls-Royce Cullinan Chauffeur',
    type: 'Luxury SUV',
    category: 'Road',
    desc: 'Spacious high-riding comfort suited to both central London and country drives.',
    image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
  },
  {
    id: 'rolls-royce-phantom',
    name: 'Rolls-Royce Phantom Chauffeur',
    type: 'Formal Saloon',
    category: 'Road',
    desc: 'Unhurried comfort for opera nights, formal dinners and gallery evenings.',
    image: '/assets/aistudio/rolls-royce-cullinan-chauffeur-service-events_d3e6e421.webp',
  },
  {
    id: 'range-rover-chauffeur',
    name: 'Range Rover Long Wheelbase',
    type: 'Executive SUV',
    category: 'Road',
    desc: 'Understated British comfort for busy London venues, airports and country weekends.',
    image: '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp',
  },
  {
    id: 'mercedes-v-class-sprinter',
    name: 'Executive VIP Sprinter',
    type: 'Group Lounge Vehicle',
    category: 'Road',
    desc: 'Spacious cabin seating for families, luggage and small teams travelling together.',
    image: '/assets/aistudio/luxury_sprinter_jetvan.jpg',
  },
  {
    id: 'river-launch',
    name: 'Private Thames River Launch',
    type: 'Licensed River Boat',
    category: 'River',
    desc: 'Private evening boat crossings along the Thames with a licensed local skipper.',
    image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
  },
  {
    id: 'helicopter-operator',
    name: 'Helicopter Transfer (Licensed Operator)',
    type: 'Rotorcraft',
    category: 'Air',
    desc: 'Countryside and coastal transfers arranged through licensed independent operators.',
    image: '/assets/aistudio/6a5e4f29ca98c820c85071cd_file_l7dpoy6z_91be91a5.png',
  },
  {
    id: 'private-jet-operator',
    name: 'Private Jet (Licensed Operator)',
    type: 'Private Aviation',
    category: 'Air',
    desc: 'European and international flights arranged through licensed independent operators.',
    image: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
  },
];

const PRIVACY_OPTIONS = [
  {
    id: 'discreet-coordination',
    name: 'Standard Discreet Coordination',
    desc: 'Bookings handled privately through our Mayfair office, sharing only necessary guest details.',
    level: 'Standard',
  },
  {
    id: 'private-hosting',
    name: 'Private Room & Quiet Arrivals',
    desc: 'Side entrances, private dining rooms and timed chauffeur pick-ups arranged with venues.',
    level: 'Enhanced Privacy',
  },
  {
    id: 'licensed-security-referral',
    name: 'Licensed Security Specialist Introduction',
    desc: 'Security services are provided by licensed independent specialists for high-profile events.',
    level: 'Specialist Support',
  },
  {
    id: 'assistant-liaison',
    name: 'Private Office & Assistant Coordination',
    desc: 'We work directly alongside your PA or family office with one clear written summary.',
    level: 'Family Office',
  },
];

const PREFERENCE_OPTIONS = {
  vehicleStyles: [
    { id: 'saloon-privacy', name: 'Quiet Saloon with Privacy Glass' },
    { id: 'suv-comfort', name: 'Long-Wheelbase SUV Comfort' },
    { id: 'group-mpv', name: 'Spacious Group & Luggage Vehicle' },
  ],
  arrivalPoints: [
    { id: 'door-to-door', name: 'Door-to-Door London Chauffeur' },
    { id: 'private-terminal', name: 'Private Aviation Terminal Transfer' },
    { id: 'regional-heliport', name: 'London Heliport Coordination' },
    { id: 'thames-pier', name: 'Central London River Pier' },
  ],
  hospitalityStyles: [
    { id: 'fine-wine-champagne', name: 'Fine Wine & Champagne Selection' },
    { id: 'sommelier-selection', name: 'Sommelier-Guided Pairing List' },
    { id: 'non-alcoholic', name: 'Zero-Proof & Botanical Pairings' },
    { id: 'own-cellar', name: 'Bring Your Own Bottles (Corkage Agreed)' },
  ],
  supportLevels: [
    { id: 'lifestyle-manager', name: 'Dedicated Lifestyle Manager' },
    { id: 'private-chef-team', name: 'Private Chef & Waiting Staff' },
    { id: 'household-support', name: 'Pre-Arrival House Preparation' },
  ],
};

const OPTIONAL_ENHANCEMENTS = [
  {
    id: 'advance-venue-check',
    title: 'Advance Venue & Seating Check',
    detail: 'We confirm table placement, quiet entrances and timing with each venue ahead.',
  },
  {
    id: 'luggage-transfer',
    title: 'Separate Luggage Transfer',
    detail: 'Bags are collected early and placed in your hotel or country house before arrival.',
  },
  {
    id: 'assistant-itinerary',
    title: 'Shared Family or PA Itinerary',
    detail: 'One clear schedule with addresses, timings and driver details for everyone involved.',
  },
  {
    id: 'wine-pre-order',
    title: 'Advance Wine & Menu Pre-Order',
    detail: 'Dietary notes and chosen bottles are shared with the kitchen before your evening.',
  },
];

const PLANNING_STAGES = [
  { phase: 'Stage 1', title: 'Initial Brief', desc: 'Share dates, group size, preferences and any must-have stops.' },
  { phase: 'Stage 2', title: 'Options & Availability', desc: 'We check venues, operators and timings and send honest options.' },
  { phase: 'Stage 3', title: 'Confirmations', desc: 'Once you approve, we lock in bookings and supplier details.' },
  { phase: 'Stage 4', title: 'Final Schedule', desc: 'You receive one tidy itinerary with driver and venue contacts.' },
  { phase: 'Stage 5', title: 'On-the-Day Support', desc: 'Your lifestyle manager stays on hand if timings shift.' },
];

export const CommissionStudio: React.FC = () => {
  const { openIntroductionModal } = useNavigation();

  const [currentStep, setCurrentStep] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<PlanCategory>('All');
  const [activeBriefId, setActiveBriefId] = useState<string | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<StudioPlan>(STUDIO_PLANS[0]);
  const [selectedTransport, setSelectedTransport] = useState(TRANSPORT_OPTIONS[0]);
  const [selectedPrivacy, setSelectedPrivacy] = useState(PRIVACY_OPTIONS[0]);

  // Practical preferences
  const [vehicleStyle, setVehicleStyle] = useState(PREFERENCE_OPTIONS.vehicleStyles[0]);
  const [arrivalPoint, setArrivalPoint] = useState(PREFERENCE_OPTIONS.arrivalPoints[0]);
  const [hospitalityStyle, setHospitalityStyle] = useState(PREFERENCE_OPTIONS.hospitalityStyles[0]);
  const [supportLevel, setSupportLevel] = useState(PREFERENCE_OPTIONS.supportLevels[0]);

  // Enhancements & planning checklist
  const [selectedEnhancements, setSelectedEnhancements] = useState<string[]>([
    'advance-venue-check',
    'assistant-itinerary',
  ]);
  const [checkedStages, setCheckedStages] = useState<string[]>(['Stage 1', 'Stage 2']);

  // Schedule & details
  const [departurePoint, setDeparturePoint] = useState('Mayfair, London W1');
  const [guestCount, setGuestCount] = useState('2 to 4 guests');
  const [targetDate, setTargetDate] = useState('Next month (flexible)');
  const [notes, setNotes] = useState('Quiet table away from the door, waiting car after dinner.');
  const [referenceLabel, setReferenceLabel] = useState('LONDON-PLAN');

  const [estimatedHours, setEstimatedHours] = useState(selectedPlan.defaultHours);
  const [briefSerial, setBriefSerial] = useState<number>(4821);

  useEffect(() => {
    setBriefSerial(Math.floor(1000 + Math.random() * 9000));
  }, []);

  const [isCopied, setIsCopied] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isPrepared, setIsPrepared] = useState(false);
  const [generatedBriefId, setGeneratedBriefId] = useState('');

  const activeSampleBrief = SAMPLE_BRIEFS.find((b) => b.id === activeBriefId) || null;

  const toggleEnhancement = (id: string) => {
    setSelectedEnhancements((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleStageCheck = (phase: string) => {
    setCheckedStages((prev) =>
      prev.includes(phase) ? prev.filter((p) => p !== phase) : [...prev, phase]
    );
  };

  const filteredPlans =
    categoryFilter === 'All'
      ? STUDIO_PLANS
      : STUDIO_PLANS.filter((p) => p.category === categoryFilter);

  const applySampleBrief = (bp: SampleBrief) => {
    const pl = STUDIO_PLANS.find((p) => p.id === bp.planId) || STUDIO_PLANS[0];
    const tr = TRANSPORT_OPTIONS.find((t) => t.id === bp.transportId) || TRANSPORT_OPTIONS[0];
    const pr = PRIVACY_OPTIONS.find((p) => p.id === bp.privacyId) || PRIVACY_OPTIONS[0];
    const vs = PREFERENCE_OPTIONS.vehicleStyles.find((v) => v.id === bp.vehicleStyleId) || PREFERENCE_OPTIONS.vehicleStyles[0];
    const ap = PREFERENCE_OPTIONS.arrivalPoints.find((a) => a.id === bp.arrivalId) || PREFERENCE_OPTIONS.arrivalPoints[0];
    const hs = PREFERENCE_OPTIONS.hospitalityStyles.find((h) => h.id === bp.hospitalityId) || PREFERENCE_OPTIONS.hospitalityStyles[0];
    const sl = PREFERENCE_OPTIONS.supportLevels.find((s) => s.id === bp.supportId) || PREFERENCE_OPTIONS.supportLevels[0];

    setSelectedPlan(pl);
    setSelectedTransport(tr);
    setSelectedPrivacy(pr);
    setVehicleStyle(vs);
    setArrivalPoint(ap);
    setHospitalityStyle(hs);
    setSupportLevel(sl);
    setEstimatedHours(bp.hours);
    setReferenceLabel(bp.referenceLabel);
    setDeparturePoint(bp.departurePoint);
    setGuestCount(bp.guestCount);
    setTargetDate(bp.targetDate);
    setNotes(bp.notes);
    setActiveBriefId(bp.id);
    setCategoryFilter('All');
  };

  const activeEnhancementItems = OPTIONAL_ENHANCEMENTS.filter((a) =>
    selectedEnhancements.includes(a.id)
  );

  const briefRef = `TGLC-${selectedPlan.id.substring(0, 3).toUpperCase()}-${briefSerial}`;

  const buildBriefText = () => {
    const enhancementLines =
      activeEnhancementItems.length > 0
        ? activeEnhancementItems.map((a) => `  - ${a.title}`).join('\n')
        : '  - Standard planning only';
    return `=== THE GLOBAL LUXURY CONSORTIUM · PRIVATE BRIEF ===
Brief Reference: ${briefRef}
Label: ${referenceLabel}
Focus: ${selectedPlan.title}
Area: ${selectedPlan.location}
Duration: ${selectedPlan.duration} (approx. ${estimatedHours} hours)
Travel Preference: ${selectedTransport.name} (${selectedTransport.type})
Privacy Approach: ${selectedPrivacy.name} (${selectedPrivacy.level})
Vehicle Style: ${vehicleStyle.name}
Arrival & Transfer: ${arrivalPoint.name}
Dining & Drinks: ${hospitalityStyle.name}
Support Preference: ${supportLevel.name}
Optional Extras:
${enhancementLines}
Starting Point: ${departurePoint}
Party Size: ${guestCount}
Preferred Dates: ${targetDate}
Notes: ${notes}
Availability: All arrangements are subject to availability.
Mayfair Office: 3rd Floor, 45 Albemarle Street, Mayfair, London W1S 4JL
Telephone: ${TGLC_CONTACT.telephone}
Email: ${TGLC_CONTACT.email}
=====================================================`;
  };

  const handleCopyBrief = () => {
    navigator.clipboard?.writeText(buildBriefText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleDownloadBrief = () => {
    try {
      const blob = new Blob([buildBriefText()], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TGLC-Brief-${referenceLabel || briefRef}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(false), 2500);
    } catch {
      handleCopyBrief();
    }
  };

  const handlePrepareBrief = async () => {
    setIsPreparing(true);
    const id = `TGLC-${Date.now().toString().slice(-4)}`;
    setGeneratedBriefId(id);
    setIsPreparing(false);
    setIsPrepared(true);
  };

  return (
    <div className="bg-[#07080B] text-[#D4D8E2] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-3 border-b border-[#232736] pb-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
            <Compass className="w-3.5 h-3.5 text-[#E2BA6B]" />
            <span className="text-[#E2BA6B]">The Commission Studio</span>
            <span className="text-[#8B672B]">/</span>
            <span className="text-[#8F98AA]">London &amp; International Trip Planner</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0] text-balance">
                Outline Your Ideal Plan
              </h1>
              <p className="text-xs sm:text-sm text-[#D4D8E2] max-w-2xl mt-2 leading-[1.7]">
                Sketch out a London evening, countryside break or overseas trip in five clear steps. Load an example below or build your own brief to share with our Mayfair team.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openIntroductionModal(`Commission Studio: ${selectedPlan.title}`)}
                className="btn-outline-gold px-5 py-3 text-xs cursor-pointer"
              >
                Speak with Mayfair
              </button>
            </div>
          </div>
        </div>

        {/* Worked Examples Strip */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#E2BA6B] block mb-1">
                Worked Examples &amp; Ideas
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
                Starting Points
              </h2>
            </div>
            <p className="text-xs text-[#8F98AA] max-w-md font-mono">
              Pick an example to fill in travel, privacy and dining notes, then adjust any step below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_BRIEFS.map((bp) => {
              const isApplied = activeBriefId === bp.id;
              return (
                <motion.button
                  key={bp.id}
                  type="button"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => applySampleBrief(bp)}
                  className={`text-left border transition-colors overflow-hidden flex flex-col justify-between cursor-pointer group ${
                    isApplied
                      ? 'bg-[#131722] border-[#E2BA6B]'
                      : 'bg-[#0D1017] border-[#232736] hover:border-[#8B672B]'
                  }`}
                >
                  <div>
                    <div className="aspect-[16/9] w-full overflow-hidden bg-black relative">
                      <SmartImage
                        src={bp.image}
                        alt={bp.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-transparent to-transparent" />
                      {isApplied && (
                        <div className="absolute top-2.5 right-2.5 bg-[#E2BA6B] text-[#07080B] px-2.5 py-0.5 font-mono text-[10px] font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Loaded</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#E2BA6B] block">
                        {bp.badge}
                      </span>
                      <h3 className="font-serif text-lg text-[#FAF7F0] group-hover:text-[#F0CC83] transition-colors leading-snug">
                        {bp.title}
                      </h3>
                      <p className="text-xs text-[#D4D8E2] line-clamp-2 leading-relaxed">
                        {bp.summary}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2.5 border-t border-[#1D212F] flex items-center justify-between font-mono text-[11px] text-[#E2BA6B]">
                    <span>{isApplied ? 'Active in Planner' : 'Load Example'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Active Guidance Callout */}
        <div className="p-4 sm:p-5 bg-[#0D1017] border border-[#232736] flex items-start gap-3.5">
          <Info className="w-4 h-4 text-[#E2BA6B] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E2BA6B] block">
              {activeSampleBrief
                ? `Planning Note · ${activeSampleBrief.title}`
                : `Planning Note · ${selectedPlan.title}`}
            </span>
            <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">
              {activeSampleBrief ? activeSampleBrief.rationale : selectedPlan.guidanceNote}
            </p>
          </div>
        </div>

        {/* 5-Step Progress Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {[
            { num: '01', label: '1. Occasion & Idea' },
            { num: '02', label: '2. Travel & Transfers' },
            { num: '03', label: '3. Privacy & Support' },
            { num: '04', label: '4. Preferences' },
            { num: '05', label: '5. Dates & Notes' },
          ].map((step, idx) => {
            const isActive = currentStep === idx;
            const isCompleted = currentStep > idx;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`p-3 text-left border transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#131722] border-[#E2BA6B] text-[#E2BA6B]'
                    : isCompleted
                    ? 'bg-[#0D1017] border-[#2C3144] text-[#FAF7F0]'
                    : 'bg-[#090B10] border-[#1B1E2A] text-[#8F98AA] hover:text-[#FAF7F0]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1 font-mono tabular-nums">
                  <span>{step.num}</span>
                  {isCompleted && <Check className="w-3.5 h-3.5 text-[#E2BA6B]" />}
                </div>
                <span className="text-xs font-serif block truncate">{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Split Layout: Left Visual Editor / Right Live Brief Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Configuration Area */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Plan Selection with Category Filter */}
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0.9, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E2BA6B] font-medium">
                    Step 1 · Choose an Occasion ({filteredPlans.length})
                  </span>
                  <span className="font-mono text-[11px] text-[#8F98AA] tabular-nums">
                    All ideas subject to availability
                  </span>
                </div>

                {/* Category Filter Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                  {PLAN_CATEGORIES.map((cat) => {
                    const isActive = categoryFilter === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategoryFilter(cat)}
                        className={`h-8 px-3 text-[11px] font-mono whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#E2BA6B] text-[#07080B] border-[#F0CC83] font-semibold'
                            : 'bg-[#0D1017] text-[#D4D8E2] border-[#232736] hover:border-[#8B672B] hover:text-[#FAF7F0]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredPlans.map((plan) => {
                    const isSelected = selectedPlan.id === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => {
                          setSelectedPlan(plan);
                          setEstimatedHours(plan.defaultHours);
                          setActiveBriefId(null);
                        }}
                        className={`p-4 border transition-colors cursor-pointer flex flex-col justify-between group ${
                          isSelected
                            ? 'bg-[#131722] border-[#E2BA6B] shadow-xl'
                            : 'bg-[#0D1017] border-[#232736] hover:border-[#8B672B]'
                        }`}
                      >
                        <div>
                          <div className="aspect-[16/10] w-full overflow-hidden mb-3 bg-black relative">
                            <SmartImage
                              src={plan.image}
                              alt={plan.title}
                              sizes="(max-width: 640px) 100vw, 30vw"
                              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 brightness-105"
                            />
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-[#E2BA6B] text-[#07080B] p-1">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <span className="font-mono text-[10px] tracking-wider uppercase text-[#E2BA6B] block">
                            {plan.category}
                          </span>
                          <h3 className="font-serif text-lg text-[#FAF7F0] mt-1 mb-1 leading-snug">
                            {plan.title}
                          </h3>
                          <p className="text-xs text-[#D4D8E2] line-clamp-2 leading-relaxed">
                            {plan.tagline}
                          </p>
                        </div>

                        <div className="mt-4 pt-2.5 border-t border-[#1D212F] flex items-center justify-between text-[11px]">
                          <span className="text-[#8F98AA] truncate mr-2">{plan.location}</span>
                          <span className="font-mono text-[#E2BA6B] shrink-0">
                            {plan.duration}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="btn-gold px-7 py-3 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Travel &amp; Transfers</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#07080B]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Travel & Transfers */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0.9, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E2BA6B] font-medium">
                    Step 2 · Travel &amp; Transfers ({TRANSPORT_OPTIONS.length} Options)
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(0)}
                    className="text-xs text-[#8F98AA] hover:text-[#E2BA6B] cursor-pointer"
                  >
                    ← Back to Occasion
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TRANSPORT_OPTIONS.map((transport) => {
                    const isSelected = selectedTransport.id === transport.id;
                    return (
                      <div
                        key={transport.id}
                        onClick={() => {
                          setSelectedTransport(transport);
                          setActiveBriefId(null);
                        }}
                        className={`p-4 border transition-colors cursor-pointer flex flex-col justify-between group ${
                          isSelected
                            ? 'bg-[#131722] border-[#E2BA6B] shadow-xl'
                            : 'bg-[#0D1017] border-[#232736] hover:border-[#8B672B]'
                        }`}
                      >
                        <div>
                          <div className="aspect-[16/10] w-full overflow-hidden mb-3 bg-black relative">
                            <SmartImage
                              src={transport.image}
                              alt={transport.name}
                              sizes="(max-width: 640px) 100vw, 30vw"
                              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 brightness-105"
                            />
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-[#E2BA6B] text-[#07080B] p-1">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <span className="font-mono text-[10px] tracking-wider uppercase text-[#E2BA6B] block truncate">
                            {transport.category} · {transport.type}
                          </span>
                          <h3 className="font-serif text-lg text-[#FAF7F0] mt-1 mb-1">
                            {transport.name}
                          </h3>
                          <p className="text-xs text-[#D4D8E2] leading-relaxed">
                            {transport.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(0)}
                    className="text-xs uppercase tracking-wider text-[#8F98AA] hover:text-[#FAF7F0] cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="btn-gold px-7 py-3 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Privacy &amp; Support</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#07080B]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Privacy & Support */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0.9, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E2BA6B] font-medium">
                    Step 3 · Privacy &amp; Support Style
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-[#8F98AA] hover:text-[#E2BA6B] cursor-pointer"
                  >
                    ← Back to Travel
                  </button>
                </div>

                <div className="space-y-3">
                  {PRIVACY_OPTIONS.map((option) => {
                    const isSelected = selectedPrivacy.id === option.id;
                    return (
                      <div
                        key={option.id}
                        onClick={() => setSelectedPrivacy(option)}
                        className={`p-4 border transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                          isSelected
                            ? 'bg-[#131722] border-[#E2BA6B] shadow-xl'
                            : 'bg-[#0D1017] border-[#232736] hover:border-[#8B672B]'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Shield className={`w-4 h-4 ${isSelected ? 'text-[#E2BA6B]' : 'text-[#8F98AA]'}`} />
                            <h3 className="font-serif text-lg text-[#FAF7F0]">{option.name}</h3>
                            <span className="text-[#8B672B]">·</span>
                            <span className="text-[11px] uppercase font-mono text-[#E2BA6B]">
                              {option.level}
                            </span>
                          </div>
                          <p className="text-xs text-[#D4D8E2] pl-6 leading-relaxed">{option.desc}</p>
                        </div>

                        {isSelected && (
                          <div className="bg-[#E2BA6B] text-[#07080B] p-1 shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs uppercase tracking-wider text-[#8F98AA] hover:text-[#FAF7F0] cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="btn-gold px-7 py-3 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Preferences</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#07080B]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Practical Preferences */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0.9, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E2BA6B] font-medium">
                    Step 4 · Practical Preferences
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-[#8F98AA] hover:text-[#E2BA6B] cursor-pointer"
                  >
                    ← Back to Privacy
                  </button>
                </div>

                <div className="bg-[#0D1017] border border-[#232736] p-5 space-y-5 text-xs">
                  {/* Vehicle Style */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-2 block font-mono">
                      Vehicle Style
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {PREFERENCE_OPTIONS.vehicleStyles.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setVehicleStyle(item)}
                          className={`p-2.5 text-left border cursor-pointer transition-colors ${
                            vehicleStyle.id === item.id
                              ? 'bg-[#131722] border-[#E2BA6B] text-[#FAF7F0]'
                              : 'bg-[#090B10] border-[#232736] text-[#D4D8E2] hover:text-[#FAF7F0]'
                          }`}
                        >
                          <span className="block font-medium">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Arrival & Transfer */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-2 block font-mono">
                      Arrival &amp; Transfer Point
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PREFERENCE_OPTIONS.arrivalPoints.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setArrivalPoint(item)}
                          className={`p-2.5 text-left border cursor-pointer transition-colors ${
                            arrivalPoint.id === item.id
                              ? 'bg-[#131722] border-[#E2BA6B] text-[#FAF7F0]'
                              : 'bg-[#090B10] border-[#232736] text-[#D4D8E2] hover:text-[#FAF7F0]'
                          }`}
                        >
                          <span className="block font-medium">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dining & Drinks */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-2 block font-mono">
                      Wine &amp; Drinks Preference
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PREFERENCE_OPTIONS.hospitalityStyles.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setHospitalityStyle(item)}
                          className={`p-2.5 text-left border cursor-pointer transition-colors ${
                            hospitalityStyle.id === item.id
                              ? 'bg-[#131722] border-[#E2BA6B] text-[#FAF7F0]'
                              : 'bg-[#090B10] border-[#232736] text-[#D4D8E2] hover:text-[#FAF7F0]'
                          }`}
                        >
                          <span className="block font-medium">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Support Level */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-2 block font-mono">
                      Support Preference
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {PREFERENCE_OPTIONS.supportLevels.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSupportLevel(item)}
                          className={`p-2.5 text-left border cursor-pointer transition-colors ${
                            supportLevel.id === item.id
                              ? 'bg-[#131722] border-[#E2BA6B] text-[#FAF7F0]'
                              : 'bg-[#090B10] border-[#232736] text-[#D4D8E2] hover:text-[#FAF7F0]'
                          }`}
                        >
                          <span className="block font-medium">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs uppercase tracking-wider text-[#8F98AA] hover:text-[#FAF7F0] cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="btn-gold px-7 py-3 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Dates &amp; Notes</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#07080B]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Dates, Notes & Prepare Brief */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0.9, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E2BA6B] font-medium">
                    Step 5 · Dates, Party &amp; Notes
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-xs text-[#8F98AA] hover:text-[#E2BA6B] cursor-pointer"
                  >
                    ← Back to Preferences
                  </button>
                </div>

                {/* Estimated Time Slider */}
                <div className="bg-[#0D1017] border border-[#232736] p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono uppercase tracking-wider text-[#FAF7F0] flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#E2BA6B]" />
                      <span>Approximate Duration</span>
                    </span>
                    <span className="font-mono text-sm text-[#E2BA6B] font-bold tabular-nums">
                      {estimatedHours} Hours
                    </span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={48}
                    step={2}
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(Number(e.target.value))}
                    className="w-full accent-[#E2BA6B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8F98AA] font-mono tabular-nums">
                    <span>Half Day</span>
                    <span>Full Day</span>
                    <span>Weekend / Multi-Day</span>
                  </div>
                </div>

                <div className="bg-[#0D1017] border border-[#232736] p-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-1">
                      Starting Point
                    </label>
                    <input
                      type="text"
                      value={departurePoint}
                      onChange={(e) => setDeparturePoint(e.target.value)}
                      className="w-full bg-[#131722] border border-[#2A2D38] px-3.5 py-2.5 text-[#FAF7F0] focus:outline-none focus:border-[#E2BA6B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-1">
                        Party Size
                      </label>
                      <input
                        type="text"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full bg-[#131722] border border-[#2A2D38] px-3.5 py-2.5 text-[#FAF7F0] focus:outline-none focus:border-[#E2BA6B]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-1">
                        Preferred Dates
                      </label>
                      <input
                        type="text"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full bg-[#131722] border border-[#2A2D38] px-3.5 py-2.5 text-[#FAF7F0] focus:outline-none focus:border-[#E2BA6B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-1">
                      Dining, Dietary or Timing Notes
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#131722] border border-[#2A2D38] px-3.5 py-2.5 text-[#FAF7F0] focus:outline-none focus:border-[#E2BA6B] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#FAF7F0] mb-1">
                      Brief Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={referenceLabel}
                      onChange={(e) => setReferenceLabel(e.target.value.toUpperCase())}
                      className="w-full bg-[#131722] border border-[#2A2D38] px-3.5 py-2.5 font-mono text-[#E2BA6B] tracking-wider focus:outline-none focus:border-[#E2BA6B]"
                    />
                  </div>
                </div>

                {/* Planning Stages Preview */}
                <div className="bg-[#0D1017] border border-[#232736] p-5 space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2BA6B] font-medium block">
                    How We Plan Your Brief
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                    {PLANNING_STAGES.map((step) => (
                      <div key={step.phase} className="p-2.5 bg-[#131722] border border-[#232736] space-y-1">
                        <span className="text-[10px] font-mono text-[#E2BA6B] block">{step.phase}</span>
                        <strong className="text-[11px] text-[#FAF7F0] block">{step.title}</strong>
                        <p className="text-[10px] text-[#D4D8E2] leading-snug">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-xs uppercase tracking-wider text-[#8F98AA] hover:text-[#FAF7F0] cursor-pointer"
                  >
                    ← Back to Preferences
                  </button>

                  <button
                    type="button"
                    onClick={handlePrepareBrief}
                    disabled={isPreparing}
                    className="btn-gold px-8 py-3.5 text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-[#07080B]" />
                    <span>{isPreparing ? 'Preparing Brief...' : 'Prepare Brief for Mayfair'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Live Brief Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0D1017] border border-[#232736] p-6 shadow-2xl relative overflow-hidden">
              {/* Gold watermark crest */}
              <div className="absolute top-0 right-0 w-36 h-36 opacity-5 pointer-events-none">
                <SmartImage
                  src="/assets/aistudio/tglc_crest_transparent.png"
                  alt=""
                  sizes="144px"
                  className="w-full h-full object-contain filter invert"
                />
              </div>

              {/* Brief Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#232736]">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#E2BA6B]" />
                  <span className="text-[11px] font-mono tracking-wider text-[#E2BA6B] tabular-nums">
                    {briefRef}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#8F98AA]">
                  PRIVATE BRIEF
                </span>
              </div>

              {/* Visual Dyad Strip */}
              <div className="grid grid-cols-2 gap-2.5 pt-4">
                <div className="space-y-1">
                  <div className="aspect-[16/10] overflow-hidden border border-[#232736] bg-black">
                    <SmartImage
                      src={selectedPlan.image}
                      alt={selectedPlan.title}
                      sizes="(max-width: 1024px) 50vw, 20vw"
                      className="w-full h-full object-cover brightness-105"
                    />
                  </div>
                  <span className="font-mono text-[9px] uppercase text-[#8F98AA] block truncate">
                    Focus · {selectedPlan.category}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="aspect-[16/10] overflow-hidden border border-[#232736] bg-black">
                    <SmartImage
                      src={selectedTransport.image}
                      alt={selectedTransport.name}
                      sizes="(max-width: 1024px) 50vw, 20vw"
                      className="w-full h-full object-cover brightness-105"
                    />
                  </div>
                  <span className="font-mono text-[9px] uppercase text-[#8F98AA] block truncate">
                    Travel · {selectedTransport.category}
                  </span>
                </div>
              </div>

              {/* Summary Body */}
              <div className="py-4 space-y-4 text-xs">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8F98AA] block">
                    Brief Label
                  </span>
                  <span className="font-mono text-sm text-[#FAF7F0] font-semibold tracking-wider">
                    {referenceLabel || 'LONDON-PLAN'}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8F98AA] block">
                    Selected Idea
                  </span>
                  <h4 className="font-serif text-lg text-[#FAF7F0] mt-0.5 leading-snug">
                    {selectedPlan.title}
                  </h4>
                  <p className="text-[11px] text-[#E2BA6B] mt-0.5">
                    {selectedPlan.location} · {selectedPlan.duration}
                  </p>
                </div>

                {/* Live Outline */}
                <div className="p-3 bg-[#090B10] border border-[#1D212F] space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#E2BA6B] block">
                    Plan Outline
                  </span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between gap-2 text-[#D4D8E2]">
                      <span className="font-mono text-[#8F98AA]">01 · Start</span>
                      <span className="text-[#FAF7F0] truncate text-right">{departurePoint.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-[#D4D8E2]">
                      <span className="font-mono text-[#8F98AA]">02 · Travel</span>
                      <span className="text-[#FAF7F0] truncate text-right">{selectedTransport.name}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-[#D4D8E2]">
                      <span className="font-mono text-[#8F98AA]">03 · Privacy</span>
                      <span className="text-[#FAF7F0] truncate text-right">{selectedPrivacy.level}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-[#D4D8E2]">
                      <span className="font-mono text-[#8F98AA]">04 · Area</span>
                      <span className="text-[#E2BA6B] truncate text-right">{selectedPlan.location}</span>
                    </div>
                  </div>
                </div>

                {/* Preferences Summary */}
                <div className="p-3 bg-[#131722] border border-[#232736] space-y-1.5 text-[11px]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#E2BA6B] block">
                    Selected Preferences
                  </span>
                  <div className="flex justify-between gap-2 text-[#8F98AA]">
                    <span>Vehicle Style:</span>
                    <span className="text-[#FAF7F0] text-right truncate">{vehicleStyle.name}</span>
                  </div>
                  <div className="flex justify-between gap-2 text-[#8F98AA]">
                    <span>Arrival Point:</span>
                    <span className="text-[#FAF7F0] text-right truncate">{arrivalPoint.name}</span>
                  </div>
                  <div className="flex justify-between gap-2 text-[#8F98AA]">
                    <span>Wine &amp; Drinks:</span>
                    <span className="text-[#FAF7F0] text-right truncate">{hospitalityStyle.name}</span>
                  </div>
                  <div className="flex justify-between gap-2 text-[#8F98AA]">
                    <span>Support:</span>
                    <span className="text-[#FAF7F0] text-right truncate">{supportLevel.name}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#232736] space-y-2 text-[11px]">
                  <div className="flex items-start gap-2 text-[#D4D8E2]">
                    <MapPin className="w-3.5 h-3.5 text-[#E2BA6B] shrink-0 mt-0.5" />
                    <span>
                      Start: <strong className="text-[#FAF7F0] font-normal">{departurePoint}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#D4D8E2]">
                    <Calendar className="w-3.5 h-3.5 text-[#E2BA6B] shrink-0" />
                    <span>
                      Dates: <strong className="text-[#FAF7F0] font-normal">{targetDate}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#D4D8E2]">
                    <Users className="w-3.5 h-3.5 text-[#E2BA6B] shrink-0" />
                    <span>
                      Party: <strong className="text-[#FAF7F0] font-normal">{guestCount}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Brief Actions */}
              <div className="pt-3 border-t border-[#232736] flex flex-wrap items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="flex-1 py-2 px-3 bg-[#131722] hover:bg-[#1A2030] border border-[#2C3144] text-xs text-[#D4D8E2] hover:text-[#FAF7F0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Copy className="w-3.5 h-3.5 text-[#E2BA6B]" />
                  <span>{isCopied ? 'Copied' : 'Copy Brief'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadBrief}
                  className="py-2 px-3 bg-[#131722] hover:bg-[#1A2030] border border-[#2C3144] text-xs text-[#D4D8E2] hover:text-[#FAF7F0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title="Download Brief (.txt)"
                >
                  <Download className="w-3.5 h-3.5 text-[#E2BA6B]" />
                  <span>{isDownloaded ? 'Saved' : 'Download .TXT'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="py-2 px-3 bg-[#131722] hover:bg-[#1A2030] border border-[#2C3144] text-xs text-[#D4D8E2] hover:text-[#FAF7F0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title="Print Brief"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1D212F] font-mono text-[10px] text-[#8F98AA] flex items-center justify-between tabular-nums">
                <span>Direct Telephone: {TGLC_CONTACT.telephone}</span>
                <span>London W1S 4JL</span>
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <div className="p-5 bg-[#0D1017] border border-[#232736] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-serif text-[#FAF7F0] block">Prefer to talk it through?</span>
                <span className="text-[11px] text-[#8F98AA]">Our Mayfair office meets prospective members by appointment.</span>
              </div>
              <button
                type="button"
                onClick={() => openIntroductionModal('Commission Studio Enquiry')}
                className="btn-outline-gold px-4 py-2 text-xs shrink-0 whitespace-nowrap cursor-pointer"
              >
                Enquire
              </button>
            </div>
          </div>
        </div>

        <GoldDivider />

        {/* Interactive Bottom Planning Desk */}
        <section className="space-y-6 pt-2">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#232736] pb-5">
            <div className="space-y-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#E2BA6B] block">
                Extras &amp; Preparation Checklist
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF7F0]">
                Finishing Touches &amp; Next Steps
              </h2>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs text-[#E2BA6B] tabular-nums shrink-0">
              <span>Checklist: {checkedStages.length} of {PLANNING_STAGES.length} noted</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Columns: Optional Enhancements + Interactive Checklist */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#0D1017] border border-[#232736] p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#FAF7F0] font-medium">
                    Optional Finishing Touches
                  </span>
                  <span className="font-mono text-[11px] text-[#E2BA6B] tabular-nums">
                    {activeEnhancementItems.length} Selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {OPTIONAL_ENHANCEMENTS.map((addon) => {
                    const isChecked = selectedEnhancements.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleEnhancement(addon.id)}
                        className={`p-4 text-left border transition-colors cursor-pointer space-y-1.5 ${
                          isChecked
                            ? 'bg-[#131722] border-[#E2BA6B]'
                            : 'bg-[#090B10] border-[#232736] hover:border-[#8B672B]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-[#E2BA6B] shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-[#8F98AA] shrink-0" />
                          )}
                          <span className="text-xs font-serif text-[#FAF7F0] font-medium leading-snug">
                            {addon.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#D4D8E2] leading-relaxed pl-6">
                          {addon.detail}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#0D1017] border border-[#232736] p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#FAF7F0] font-medium block">
                      Planning Checklist
                    </span>
                    <span className="text-[11px] text-[#8F98AA]">
                      Track each step from initial note to final schedule with your lifestyle manager.
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#E2BA6B] tabular-nums">
                    {checkedStages.length} of {PLANNING_STAGES.length} confirmed
                  </span>
                </div>

                <div className="space-y-2.5">
                  {PLANNING_STAGES.map((step) => {
                    const isDone = checkedStages.includes(step.phase);
                    return (
                      <button
                        key={step.phase}
                        type="button"
                        onClick={() => toggleStageCheck(step.phase)}
                        className={`w-full p-3.5 text-left border transition-colors flex items-start gap-3 cursor-pointer ${
                          isDone
                            ? 'bg-[#131722] border-[#8B672B]/80'
                            : 'bg-[#090B10] border-[#232736] hover:border-[#2C3144]'
                        }`}
                      >
                        <div className="pt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-[#E2BA6B]" />
                          ) : (
                            <Square className="w-4 h-4 text-[#8F98AA]" />
                          )}
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-serif text-sm text-[#FAF7F0]">{step.title}</span>
                            <span className="font-mono text-[11px] text-[#E2BA6B] tabular-nums shrink-0">{step.phase}</span>
                          </div>
                          <p className="text-xs text-[#D4D8E2] leading-relaxed">{step.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Brief Summary & Share Controls */}
            <div className="lg:col-span-5 bg-[#0D1017] border border-[#232736] p-6 space-y-5">
              <div className="pb-3 border-b border-[#232736] flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#E2BA6B] font-medium">
                  Brief Summary
                </span>
                <span className="font-mono text-[11px] text-[#8F98AA] tabular-nums">{briefRef}</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between gap-4 py-1 border-b border-[#1D212F]">
                  <span className="text-[#8F98AA]">Occasion</span>
                  <span className="text-[#FAF7F0] text-right">{selectedPlan.title}</span>
                </div>
                <div className="flex justify-between gap-4 py-1 border-b border-[#1D212F]">
                  <span className="text-[#8F98AA]">Travel</span>
                  <span className="text-[#FAF7F0] text-right">{selectedTransport.name}</span>
                </div>
                <div className="flex justify-between gap-4 py-1 border-b border-[#1D212F]">
                  <span className="text-[#8F98AA]">Privacy</span>
                  <span className="text-[#FAF7F0] text-right">{selectedPrivacy.level}</span>
                </div>
                <div className="flex justify-between gap-4 py-1 border-b border-[#1D212F]">
                  <span className="text-[#8F98AA]">Duration</span>
                  <span className="font-mono text-[#FAF7F0] tabular-nums">{estimatedHours} hours</span>
                </div>
                <div className="flex justify-between gap-4 py-1 border-b border-[#1D212F]">
                  <span className="text-[#8F98AA]">Finishing Touches</span>
                  <span className="font-mono text-[#FAF7F0] tabular-nums">{activeEnhancementItems.length} selected</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#090B10] border border-[#232736] space-y-1 text-[11px] text-[#D4D8E2] leading-relaxed">
                <strong className="font-mono text-[10px] uppercase tracking-wider text-[#E2BA6B] block">
                  What We Coordinate
                </strong>
                {selectedPlan.deliverables.slice(0, 3).map((d, idx) => (
                  <p key={idx}>· {d}</p>
                ))}
              </div>

              <p className="text-[11px] text-[#8F98AA] leading-relaxed">
                Pricing depends on dates, suppliers and availability. We share clear options and costs before anything is booked.
              </p>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handlePrepareBrief}
                  disabled={isPreparing}
                  className="btn-gold w-full py-3.5 px-6 text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 text-[#07080B]" />
                  <span>{isPreparing ? 'Preparing Brief...' : 'Prepare Brief for Our Mayfair Office'}</span>
                </button>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleDownloadBrief}
                    className="btn-outline-gold py-2.5 px-3 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isDownloaded ? 'Brief Saved' : 'Download Brief'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="py-2.5 px-3 bg-[#131722] hover:bg-[#1A2030] border border-[#2C3144] text-xs text-[#D4D8E2] hover:text-[#FAF7F0] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#E2BA6B]" />
                    <span>{isCopied ? 'Copied' : 'Copy Text'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Confirmation Modal when brief is prepared */}
      <AnimatePresence>
        {isPrepared && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg bg-[#0D1017] border border-[#8B672B] p-8 shadow-2xl relative text-center space-y-5"
            >
              <div className="w-12 h-12 border border-[#E2BA6B] bg-[#131722] flex items-center justify-center mx-auto text-[#E2BA6B]">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#E2BA6B] font-medium block tabular-nums">
                Brief Ready · Reference {generatedBriefId || briefRef}
              </span>

              <h3 className="font-serif text-3xl text-[#FAF7F0]">
                Ready for Our Mayfair Team
              </h3>

              <p className="text-xs text-[#D4D8E2] leading-relaxed max-w-md mx-auto">
                Your outline for <strong className="text-[#FAF7F0] font-normal">{selectedPlan.title}</strong> with <strong className="text-[#FAF7F0] font-normal">{selectedTransport.name}</strong> is ready to send.
              </p>

              <div className="p-4 bg-[#131722] border border-[#232736] text-left text-xs space-y-1.5">
                <div className="flex justify-between text-[#8F98AA]">
                  <span>Reference:</span>
                  <span className="font-mono text-[#E2BA6B] tabular-nums">{generatedBriefId || briefRef}</span>
                </div>
                <div className="flex justify-between text-[#8F98AA]">
                  <span>Label:</span>
                  <span className="font-mono text-[#FAF7F0]">{referenceLabel}</span>
                </div>
                <div className="flex justify-between text-[#8F98AA]">
                  <span>Preferred Dates:</span>
                  <span className="text-[#FAF7F0]">{targetDate}</span>
                </div>
                <div className="flex justify-between text-[#8F98AA]">
                  <span>Mayfair Office:</span>
                  <span className="text-[#FAF7F0]">{TGLC_CONTACT.telephone}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsPrepared(false)}
                  className="btn-gold px-7 py-3 text-xs cursor-pointer"
                >
                  Return to Studio
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPrepared(false);
                    openIntroductionModal(`Commission Brief (${generatedBriefId || briefRef}): ${selectedPlan.title}`);
                  }}
                  className="btn-outline-gold px-6 py-3 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-[#E2BA6B]" />
                  <span>Send via Enquiry Form</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
