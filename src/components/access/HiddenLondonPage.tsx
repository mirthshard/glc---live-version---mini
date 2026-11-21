import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { GoldDivider } from '../common/GoldDivider';
import { Link } from '../common/Link';
import { SmartImage } from '../common/SmartImage';
import { Reveal } from '../common/Reveal';
import { PageRoute } from '../../types';
import {
  buildUniqueSlides,
  HIDDEN_LONDON_HUB_SLIDES,
  HIDDEN_LONDON_SECTION_EXTRA_SLIDES,
} from '../../utils/carouselSlides';
import {
  ArrowUpRight,
  Compass,
  Flame,
  Lock,
  Clock,
  Radio,
  ChevronLeft,
  ChevronRight,
  Eye,
  Dice5,
  Anchor,
  Zap,
  Disc3,
} from 'lucide-react';

export type HiddenLondonCategory =
  | 'all'
  | 'underground'
  | 'architecture'
  | 'fight-nights'
  | 'casino-nights'
  | 'thames-after-dark'
  | 'supper-clubs'
  | 'rooftops'
  | 'jazz'
  | 'club-nights'
  | '24-hours';

export interface HiddenLondonIdea {
  id: string;
  title: string;
  summary: string;
  image: string;
}

export interface HiddenLondonSection {
  id: Exclude<HiddenLondonCategory, 'all'>;
  route: PageRoute;
  title: string;
  shortLabel: string;
  intro: string;
  heroImage: string;
  ideas: HiddenLondonIdea[];
}

export const HIDDEN_LONDON_SECTIONS: HiddenLondonSection[] = [
  {
    id: 'underground',
    route: 'hidden-london-subterranean',
    title: 'Underground Rooms',
    shortLabel: 'Underground',
    intro: 'Historic vaults, stone cellars and quiet underground rooms across London, available for private hire.',
    heroImage: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg',
    ideas: [
      {
        id: 'historic-vault-dinner',
        title: 'Historic Vault Private Dinner',
        summary: 'We can help arrange a candlelit dinner inside a licensed City vault, subject to availability.',
        image: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg',
      },
      {
        id: 'private-cellar-tasting',
        title: 'Private Cellar Wine Tasting',
        summary: 'We can help arrange a guided tasting in a historic London cellar, subject to availability.',
        image: '/assets/aistudio/lombard_bullion_vault.jpg',
      },
      {
        id: 'chamber-music-below-ground',
        title: 'Chamber Music Below Ground',
        summary: 'We can help arrange a private acoustic recital inside a heritage underground venue, subject to availability.',
        image: '/assets/aistudio/brunel_brick_shaft_1794391688745.jpg',
      },
    ],
  },
  {
    id: 'architecture',
    route: 'hidden-london-industrial',
    title: 'Architecture & Design Spaces',
    shortLabel: 'Architecture',
    intro: 'Modernist flats, gallery lofts and private studios across the city.',
    heroImage: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg',
    ideas: [
      {
        id: 'barbican-architecture-walk',
        title: 'Barbican Private Architecture Walk',
        summary: 'We can help arrange a guided modernist tour and private loft visit, subject to availability.',
        image: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg',
      },
      {
        id: 'southwark-craft-studio',
        title: 'Southwark Craft Studio Visit',
        summary: 'We can help arrange a private appointment with British leatherworkers under the arches, subject to availability.',
        image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg',
      },
      {
        id: 'watchmaker-workshop-visit',
        title: 'Independent Watchmaker Studio Visit',
        summary: 'We can help arrange a quiet studio visit with independent London watchmakers, subject to availability.',
        image: '/assets/aistudio/private_horology_cleanroom.jpg',
      },
    ],
  },
  {
    id: 'fight-nights',
    route: 'hidden-london-combat',
    title: 'Fight Nights',
    shortLabel: 'Fight Nights',
    intro: 'Ringside seats at licensed arena fights and private sessions with qualified coaches.',
    heroImage: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
    ideas: [
      {
        id: 'arena-fight-ringside',
        title: 'Arena Fight Night Ringside',
        summary: 'We can help arrange ringside seats and hospitality at major London bouts, subject to availability.',
        image: '/assets/aistudio/ufc_arena_ringside.jpg',
      },
      {
        id: 'private-boxing-coaching',
        title: 'Private Boxing Coaching Session',
        summary: 'We can help arrange one-to-one training with qualified coaches at a private gym, subject to availability.',
        image: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
      },
      {
        id: 'fight-night-hospitality',
        title: 'Pre-Fight Dining & Transfers',
        summary: 'We can help arrange dinner nearby and waiting return cars for fight nights, subject to availability.',
        image: '/assets/aistudio/bermondsey_boxing_vault.jpg',
      },
    ],
  },
  {
    id: 'casino-nights',
    route: 'hidden-london-gaming',
    title: 'Casino Nights',
    shortLabel: 'Casino Nights',
    intro: 'Private rooms and quiet tables at licensed Mayfair and Soho casinos.',
    heroImage: '/assets/aistudio/meard_poker_sanctum.jpg',
    ideas: [
      {
        id: 'licensed-mayfair-salon',
        title: 'Licensed Mayfair Private Salon',
        summary: 'We can help arrange a private table at a licensed London casino, subject to availability.',
        image: '/assets/aistudio/meard_poker_sanctum.jpg',
      },
      {
        id: 'evening-backgammon-spirits',
        title: 'Evening Backgammon & Spirits',
        summary: 'We can help arrange a quiet table at a classic St James’s lounge, subject to availability.',
        image: '/assets/aistudio/tglc_st_james_salon.jpg',
      },
      {
        id: 'hosted-card-night-transfers',
        title: 'Dinner & Discreet Chauffeur',
        summary: 'We can help arrange dinner beforehand and a waiting driver for your evening, subject to availability.',
        image: '/assets/aistudio/Copper-Club_b58a00e9.jpg',
      },
    ],
  },
  {
    id: 'thames-after-dark',
    route: 'hidden-london-maritime',
    title: 'Thames After Dark',
    shortLabel: 'Thames After Dark',
    intro: 'Private evening cruises along the river with licensed skippers and riverside dining.',
    heroImage: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
    ideas: [
      {
        id: 'private-evening-river-cruise',
        title: 'Private Evening River Cruise',
        summary: 'We can help arrange a licensed boat cruise past floodlit London bridges, subject to availability.',
        image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
      },
      {
        id: 'riverside-supper-launch',
        title: 'Riverside Supper & Launch',
        summary: 'We can help arrange pier pick-up, onboard drinks and a Thameside dinner, subject to availability.',
        image: '/assets/aistudio/thames_drydock_supper.jpg',
      },
      {
        id: 'direct-river-transfer',
        title: 'Direct River Evening Transfer',
        summary: 'We can help arrange a calm river crossing between central London piers, subject to availability.',
        image: '/assets/aistudio/pt3_6ef34e91.jpg',
      },
    ],
  },
  {
    id: 'supper-clubs',
    route: 'hidden-london-gastronomy',
    title: 'Supper Clubs & Late-Night Dining',
    shortLabel: 'Supper Clubs',
    intro: 'Intimate chef counters, quiet dining rooms and hidden cocktail bars.',
    heroImage: '/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg',
    ideas: [
      {
        id: 'intimate-counter-omakase',
        title: 'Intimate Counter Omakase Night',
        summary: 'We can help arrange seats or a private buyout at an omakase counter, subject to availability.',
        image: '/assets/aistudio/ginza_hinoki_omakase_1794391697612.jpg',
      },
      {
        id: 'hidden-soho-cocktail-room',
        title: 'Hidden Soho Cocktail Room',
        summary: 'We can help arrange late booths at London’s tucked-away cocktail bars, subject to availability.',
        image: '/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg',
      },
      {
        id: 'private-chef-supper-club',
        title: 'Private Chef Supper Club',
        summary: 'We can help arrange a private hearth dinner in a hired Clerkenwell room, subject to availability.',
        image: '/assets/aistudio/subrosa_catacomb_dinner.jpg',
      },
    ],
  },
  {
    id: 'rooftops',
    route: 'hidden-london-exploration',
    title: 'Rooftops & Rare Views',
    shortLabel: 'Rooftops',
    intro: 'Private skyline terraces, heritage landmarks and licensed visits across the capital.',
    heroImage: '/assets/aistudio/down_street_station_1794391687146.jpg',
    ideas: [
      {
        id: 'private-skyline-terrace',
        title: 'Private Skyline Terrace Drinks',
        summary: 'We can help arrange a hired rooftop terrace overlooking central London, subject to availability.',
        image: '/assets/aistudio/sky_gantry_night_1794391688194.jpg',
      },
      {
        id: 'tower-bridge-private-hire',
        title: 'Tower Bridge Private Hire',
        summary: 'We can help arrange private event bookings at London’s famous river landmarks, subject to availability.',
        image: '/assets/aistudio/tower_bascule_vault_1794391687426.jpg',
      },
      {
        id: 'underground-heritage-tour',
        title: 'Licensed Underground Heritage Tour',
        summary: 'We can help arrange private group tours with official London transport heritage guides, subject to availability.',
        image: '/assets/aistudio/down_street_station_1794391687146.jpg',
      },
    ],
  },
  {
    id: 'jazz',
    route: 'hidden-london-after-hours',
    title: 'Jazz & Cocktail Bars',
    shortLabel: 'Jazz & Bars',
    intro: 'Late-night live music, candlelit Soho cellars and quiet listening lounges.',
    heroImage: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
    ideas: [
      {
        id: 'late-soho-jazz-table',
        title: 'Late Soho Jazz Table',
        summary: 'We can help arrange prime tables at London’s best late-night jazz rooms, subject to availability.',
        image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
      },
      {
        id: 'fitzrovia-cocktail-salon',
        title: 'Fitzrovia Quiet Cocktail Salon',
        summary: 'We can help arrange a corner booth for unhurried post-dinner drinks, subject to availability.',
        image: '/assets/aistudio/fitzrovia_absinthe_salon_1794391690208.jpg',
      },
      {
        id: 'spitalfields-tasting-room',
        title: 'Spitalfields Evening Tasting Room',
        summary: 'We can help arrange a private spirits tasting in a historic East London room, subject to availability.',
        image: '/assets/aistudio/spitalfields_crypt_exchange_1794391691802.jpg',
      },
    ],
  },
  {
    id: 'club-nights',
    route: 'hidden-london-urban-clubs',
    title: 'Late-Night Clubs & Vinyl Rooms',
    shortLabel: 'Club Nights',
    intro: 'Vinyl listening bars, private loft parties and late-night music rooms.',
    heroImage: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    ideas: [
      {
        id: 'late-sound-room-booth',
        title: 'Late-Night Sound Room Booth',
        summary: 'We can help arrange tables at London’s best vinyl and DJ venues, subject to availability.',
        image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
      },
      {
        id: 'shoreditch-loft-party',
        title: 'Private Shoreditch Loft Party',
        summary: 'We can help arrange a hired East London loft with licensed DJs and catering, subject to availability.',
        image: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
      },
      {
        id: 'mayfair-late-listening-bar',
        title: 'Mayfair Late Listening Bar',
        summary: 'We can help arrange quiet booths and waiting cars for late-night finishes, subject to availability.',
        image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
      },
    ],
  },
  {
    id: '24-hours',
    route: 'hidden-london-itinerary',
    title: '24 Hours in London',
    shortLabel: '24 Hours',
    intro: 'A full day and night built around your tastes, from morning appointments to late-night music.',
    heroImage: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
    ideas: [
      {
        id: 'morning-tailoring-galleries',
        title: 'Morning Tailoring & Galleries',
        summary: 'We can help arrange private Mayfair fittings, gallery visits and a calm lunch, subject to availability.',
        image: '/assets/aistudio/savile_row_bespoke.jpg',
      },
      {
        id: 'evening-river-supper',
        title: 'Evening River & Supper',
        summary: 'We can help arrange a Thames cruise followed by a private dining room, subject to availability.',
        image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
      },
      {
        id: 'late-music-nightcap',
        title: 'Late Music & Nightcap',
        summary: 'We can help arrange live jazz, a cocktail booth and a waiting car home, subject to availability.',
        image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
      },
    ],
  },
];

const CATEGORY_ICONS: Record<Exclude<HiddenLondonCategory, 'all'>, React.ElementType> = {
  underground: Lock,
  architecture: Compass,
  'fight-nights': Zap,
  'casino-nights': Dice5,
  'thames-after-dark': Anchor,
  'supper-clubs': Flame,
  rooftops: Eye,
  jazz: Radio,
  'club-nights': Disc3,
  '24-hours': Clock,
};

export const HiddenLondonPage: React.FC<{ initialSubPage?: HiddenLondonCategory }> = ({
  initialSubPage = 'all',
}) => {
  const { openIntroductionModal, navigateTo } = useNavigation();
  const [activeCategory, setActiveCategory] = useState<HiddenLondonCategory>(initialSubPage);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasAdvanced, setHasAdvanced] = useState(false);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  useEffect(() => {
    setActiveCategory(initialSubPage);
    setCurrentSlide(0);
    setHasAdvanced(false);
  }, [initialSubPage]);

  const activeSection =
    activeCategory === 'all'
      ? null
      : HIDDEN_LONDON_SECTIONS.find((s) => s.id === activeCategory) || null;

  const heroSlides = activeSection
    ? buildUniqueSlides(
        activeSection.ideas.map((idea) => ({
          id: idea.id,
          image: idea.image,
          title: idea.title,
        })),
        [
          ...(HIDDEN_LONDON_SECTION_EXTRA_SLIDES[activeSection.id] || []),
          ...HIDDEN_LONDON_HUB_SLIDES,
        ],
        5
      )
    : HIDDEN_LONDON_HUB_SLIDES;

  useEffect(() => {
    if (isHeroPaused || heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setHasAdvanced(true);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5200);
    return () => clearInterval(interval);
  }, [isHeroPaused, heroSlides.length]);

  const nextSlideSrc =
    hasAdvanced && heroSlides.length > 1
      ? heroSlides[(currentSlide + 1) % heroSlides.length].image
      : null;

  const visibleSections = activeSection ? [activeSection] : HIDDEN_LONDON_SECTIONS;

  return (
    <div className="bg-[#07080B] text-[#D4D8E2] min-h-screen selection:bg-[#B98633]/30 selection:text-[#FAF7F0] pb-14">
      {/* 1. Hero Carousel */}
      <section
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
        className="relative min-h-[52vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-[#20222B] pt-14 sm:pt-18 pb-16"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={`${activeCategory}-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <motion.div
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: 'easeOut' }}
                className="w-full h-full"
              >
                <SmartImage
                  src={heroSlides[currentSlide % heroSlides.length].image}
                  alt={heroSlides[currentSlide % heroSlides.length].title}
                  sizes="100vw"
                  priority={currentSlide === 0}
                  className="w-full h-full object-cover object-center brightness-105 contrast-105"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {nextSlideSrc && (
            <div aria-hidden="true" className="hidden">
              <SmartImage src={nextSlideSrc} alt="" sizes="100vw" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/55 to-[#07080B]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/80 via-transparent to-[#07080B]/70 hidden sm:block" />

          {heroSlides.length > 1 && (
            <>
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={() => {
                    setHasAdvanced(true);
                    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
                  }}
                  className="pointer-events-auto p-2.5 bg-[#07080B]/80 hover:bg-[#E2BA6B] text-[#E2BA6B] hover:text-[#07080B] border border-[#8B672B]/50 transition-all backdrop-blur-md cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasAdvanced(true);
                    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
                  }}
                  className="pointer-events-auto p-2.5 bg-[#07080B]/80 hover:bg-[#E2BA6B] text-[#E2BA6B] hover:text-[#07080B] border border-[#8B672B]/50 transition-all backdrop-blur-md cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-4 inset-x-0 z-20 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 px-4">
                <span className="font-mono text-[11px] tracking-wider text-[#E2BA6B] bg-[#07080B]/85 px-3 py-1 border border-[#232736] backdrop-blur-md max-w-[260px] sm:max-w-none truncate">
                  {heroSlides[currentSlide % heroSlides.length].title}
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-[#D4D8E2] bg-[#07080B]/80 px-2 py-1 border border-[#232736] tabular-nums">
                  {String((currentSlide % heroSlides.length) + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
                </span>
                <div className="flex gap-1.5">
                  {heroSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => {
                        setHasAdvanced(true);
                        setCurrentSlide(idx);
                      }}
                      aria-label={`View slide ${slide.title}`}
                      className={`h-1.5 transition-all cursor-pointer ${
                        idx === currentSlide % heroSlides.length
                          ? 'w-8 bg-[#E2BA6B]'
                          : 'w-2.5 bg-[#FAF7F0]/35 hover:bg-[#FAF7F0]/65'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0.9, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 space-y-5 text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#E2BA6B] block">
            {activeSection ? 'Hidden London' : 'The Other Side of London'}
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] text-[#FAF7F0] text-balance">
            {activeSection ? activeSection.title : 'Hidden London'}
          </h1>

          <p className="text-sm sm:text-lg text-[#D4D8E2] max-w-2xl mx-auto leading-relaxed">
            {activeSection ? activeSection.intro : 'The side of London most visitors never see.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() =>
                openIntroductionModal(
                  activeSection ? `Ask about ${activeSection.title}` : 'Hidden London enquiry'
                )
              }
              className="btn-gold px-7 py-3.5 text-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{activeSection ? `Ask about ${activeSection.title}` : 'Ask about Hidden London'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 2. Sticky Section Filter Bar */}
      <nav aria-label="Hidden London sections" className="sticky top-[64px] sm:top-[76px] z-30 bg-[#0A0C12]/95 backdrop-blur-md border-b border-[#232736] shadow-xl py-3 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto flex items-center justify-start xl:justify-center gap-1.5 overflow-x-auto scrollbar-none">
          <Link
            page="hidden-london"
            onClick={() => {
              setActiveCategory('all');
              setCurrentSlide(0);
              setHasAdvanced(false);
            }}
            className={`relative h-9 px-2.5 text-[11px] tracking-wide transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 border cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#E2BA6B] text-[#07080B] border-[#F0CC83] font-semibold'
                : 'text-[#D4D8E2] hover:text-[#FAF7F0] bg-[#0D1017] border-[#232736] hover:border-[#8B672B]'
            }`}
          >
            <span>All Sections</span>
          </Link>

          {HIDDEN_LONDON_SECTIONS.map((sec) => {
            const Icon = CATEGORY_ICONS[sec.id];
            const isActive = activeCategory === sec.id;
            return (
              <Link
                key={sec.id}
                page={sec.route}
                onClick={() => {
                  setActiveCategory(sec.id);
                  setCurrentSlide(0);
                  setHasAdvanced(false);
                }}
                className={`relative h-9 px-2.5 text-[11px] tracking-wide transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 border cursor-pointer ${
                  isActive
                    ? 'bg-[#E2BA6B] text-[#07080B] border-[#F0CC83] font-semibold'
                    : 'text-[#D4D8E2] hover:text-[#FAF7F0] bg-[#0D1017] border-[#232736] hover:border-[#8B672B]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#07080B]' : 'text-[#E2BA6B]'}`} />
                <span>{sec.shortLabel}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 3. Sections & 3 Ideas Per Section */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14 space-y-14">
        {visibleSections.map((section, sectionIdx) => (
          <section key={section.id} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#20232E]">
              <Reveal className="space-y-2 max-w-2xl">
                <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF7F0] font-normal">
                  {section.title}
                </h2>
                <p className="text-sm text-[#D4D8E2] leading-relaxed">{section.intro}</p>
              </Reveal>
              <div className="flex items-center gap-3 shrink-0">
                {!activeSection && (
                  <Link
                    page={section.route}
                    className="btn-outline-gold px-4 py-2.5 text-xs inline-flex items-center gap-1.5"
                  >
                    <span>Explore section</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => openIntroductionModal(`Ask about ${section.title}`)}
                  className="btn-gold px-5 py-2.5 text-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Ask about {section.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {section.ideas.map((idea, idx) => (
                <motion.article
                  key={idea.id}
                  initial={{ opacity: 0.9, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#0D1017] border border-[#232736] hover:border-[#8B672B] transition-colors overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#12151E]">
                      <SmartImage
                        src={idea.image}
                        alt={idea.title}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017]/80 via-transparent to-transparent" />
                    </div>
                    <div className="p-6 space-y-2.5">
                      <h3 className="font-serif text-xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                        <span className="card-title-underline">{idea.title}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">
                        {idea.summary}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-5 pt-3 border-t border-[#1A1E2A]">
                    <button
                      type="button"
                      onClick={() => openIntroductionModal(`Ask about ${idea.title}`)}
                      className="text-xs text-[#E2BA6B] hover:text-[#FAF7F0] inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
                    >
                      <span>Ask about this idea</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>

            {sectionIdx < visibleSections.length - 1 && (
              <div className="pt-4">
                <GoldDivider />
              </div>
            )}
          </section>
        ))}
      </div>

      {/* 4. Closing Callout */}
      <div className="mt-14">
        <GoldDivider />
      </div>
      <section className="py-12 px-5 sm:px-8 bg-gradient-to-b from-[#07080B] via-[#0D1017] to-[#07080B]">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0]">
            Tell us what kind of evening you want.
          </h2>
          <p className="text-sm text-[#D4D8E2] max-w-xl mx-auto leading-relaxed">
            Every plan is built around your group, timing and taste. Everything we arrange is subject to availability.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() =>
                openIntroductionModal(
                  activeSection ? `Ask about ${activeSection.title}` : 'Hidden London enquiry'
                )
              }
              className="btn-gold px-7 py-3.5 text-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{activeSection ? `Ask about ${activeSection.title}` : 'Request an introduction'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
