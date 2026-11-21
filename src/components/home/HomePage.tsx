import React, { useState } from 'react';
import { HeroCarousel } from './HeroCarousel';
import { useNavigation } from '../../context/NavigationContext';
import { SERVICES_DATA, LONDON_NEIGHBOURHOODS, TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { Link } from '../common/Link';
import { SmartImage } from '../common/SmartImage';
import { Reveal } from '../common/Reveal';
import { ArrowUpRight, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const sectionStaggerVariants = {
  hidden: { opacity: 0.9 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const blockItemVariants = {
  hidden: { opacity: 0.88, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const imagePlateVariants = {
  hidden: { opacity: 0.86, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const HOME_SECTION_JUMPS = [
  { id: 'section-pillars', labelKey: 'jump.overview' as const },
  { id: 'section-sub-rosa', labelKey: 'jump.hiddenLondon' as const },
  { id: 'section-commission', labelKey: 'jump.planning' as const },
  { id: 'section-showcase', labelKey: 'jump.yourDay' as const },
  { id: 'section-services', labelKey: 'jump.services' as const },
  { id: 'section-cases', labelKey: 'jump.experiences' as const },
  { id: 'section-difference', labelKey: 'jump.difference' as const },
  { id: 'section-traditions', labelKey: 'jump.traditions' as const },
  { id: 'section-enclaves', labelKey: 'jump.ourLondon' as const },
] as const;

const HOME_PILLAR_CARDS = [
  {
    num: 'I.',
    titleKey: 'home.pillar1.title' as const,
    descKey: 'home.pillar1.desc' as const,
    image: '/assets/aistudio/royal_opera_gallery.jpg',
    route: 'service-detail' as const,
    params: { serviceId: 'experiences-culture' },
  },
  {
    num: 'II.',
    titleKey: 'home.pillar2.title' as const,
    descKey: 'home.pillar2.desc' as const,
    image: '/assets/aistudio/property-category-highlight-82_3dc00e71.jpg',
    route: 'service-detail' as const,
    params: { serviceId: 'residences-relocation' },
  },
  {
    num: 'III.',
    titleKey: 'home.pillar3.title' as const,
    descKey: 'home.pillar3.desc' as const,
    image: '/assets/aistudio/rolls-royce-cullinan-chauffeur-service-events_d3e6e421.webp',
    route: 'service-detail' as const,
    params: { serviceId: 'transport-security' },
  },
  {
    num: 'IV.',
    titleKey: 'home.pillar4.title' as const,
    descKey: 'home.pillar4.desc' as const,
    image: '/assets/aistudio/mediterranean_superyacht_deck.jpg',
    route: 'service-detail' as const,
    params: { serviceId: 'travel-aviation' },
  },
  {
    num: 'V.',
    titleKey: 'home.pillar5.title' as const,
    descKey: 'home.pillar5.desc' as const,
    image: '/assets/aistudio/fitzrovia_absinthe_salon_1794391690208.jpg',
    route: 'service-detail' as const,
    params: { serviceId: 'dining-nightlife' },
  },
  {
    num: 'VI.',
    titleKey: 'home.pillar6.title' as const,
    descKey: 'home.pillar6.desc' as const,
    image: '/assets/aistudio/leather_saddlery_bench_1794391695162.jpg',
    route: 'service-detail' as const,
    params: { serviceId: 'luxury-sourcing' },
  },
];

const HIDDEN_LONDON_HIGHLIGHTS = [
  {
    index: '01',
    text: 'Candlelit wine vaults and private dining rooms tucked beneath Mayfair and the City',
  },
  {
    index: '02',
    text: 'Private evening Thames crossings paired with discreet riverside arrivals',
  },
  {
    index: '03',
    text: 'Late-night Soho jazz rooms, intimate listening bars and quiet tables away from the crowds',
  },
];

const COMMISSION_PREVIEWS = [
  {
    index: '01',
    kicker: 'Savile Row & Craft',
    image: '/assets/aistudio/images__2__92f11072.jpg',
    alt: 'Savile Row tailoring',
    title: 'Tailoring & Watches',
    summary: 'Unhurried Savile Row fittings, master makers and private watch viewings.',
  },
  {
    index: '02',
    kicker: 'After Dark',
    image: '/assets/aistudio/shoreditch_street_couture.jpg',
    alt: 'London nightlife and music',
    title: 'Dining & Nightlife',
    summary: 'Sought-after dining rooms, candlelit vaults and late evenings across London.',
  },
  {
    index: '03',
    kicker: 'Air & Ground',
    image: '/assets/aistudio/images__3__7bd6ae28.jpg',
    alt: 'Travel and chauffeur cars',
    title: 'Travel & Chauffeurs',
    summary: 'Private flights, countryside stays and standby chauffeurs arranged door to door.',
  },
];

const LIFESTYLE_PILLARS = [
  {
    id: 'chauffeur-fleet',
    label: 'Chauffeurs',
    kicker: 'Transport & Privacy',
    title: 'London chauffeurs.',
    image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
    secondaryImage: '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp',
    detailCaption: 'Flagship saloons and spacious MPVs lined up for flights, meetings and late finishes.',
    summary:
      'Quiet drivers who know London’s routes, entrances and timings. Every airport transfer, business day and evening pickup runs without rush.',
    points: [
      'Airport meet-and-greet with live flight tracking',
      'Full-day standby drivers for multi-stop London schedules',
      'Low-profile routing and security specialists on request',
    ],
    ctaLabel: 'Transport & Security',
    targetService: 'transport-security',
  },
  {
    id: 'savile-row-horology',
    label: 'Tailoring',
    kicker: 'Sourcing & Craft',
    title: 'Tailoring & watches.',
    image: '/assets/aistudio/savile_row_bespoke.jpg',
    secondaryImage: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
    detailCaption: 'Private appointments with Mayfair tailors, independent jewellers and watch specialists.',
    summary:
      'Unhurried fittings on Savile Row and quiet introductions to trusted specialists. We handle appointments, follow-ups and delivery to your home or hotel.',
    points: [
      'Private tailoring fittings at the house or your residence',
      'Watch and jewellery sourcing through trusted dealers',
      'Thoughtful gifting and bespoke commissions managed discreetly',
    ],
    ctaLabel: 'Luxury Sourcing',
    targetService: 'luxury-sourcing',
  },
  {
    id: 'sub-rosa-london',
    label: 'Hidden London',
    kicker: 'After Hours',
    title: 'London after hours.',
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    secondaryImage: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
    detailCaption: 'Intimate music rooms, late dining tables and private spaces away from the crowds.',
    summary:
      'London reveals a quieter, richer side once the usual rooms close. We arrange understated evenings shaped around the music, company and pace you enjoy.',
    points: [
      'Late-night tables and private dining rooms across central London',
      'Live music, vinyl rooms and members’ club introductions',
      'Drivers waiting outside so the evening ends smoothly',
    ],
    ctaLabel: 'Hidden London',
    targetPage: 'hidden-london' as const,
  },
  {
    id: 'harrods-liberty',
    label: 'Shopping',
    kicker: 'Culture & Retail',
    title: 'Private shopping.',
    image: '/assets/aistudio/bond_street_jewellery.jpg',
    secondaryImage: '/assets/aistudio/liberty-department-store-640x360_44860915.jpg',
    detailCaption: 'Bond Street boutiques, department store suites and quiet private viewings.',
    summary:
      'Private rooms booked ahead on Bond Street, Mount Street and Knightsbridge. Enjoy calm styling, gallery visits and direct delivery to your door.',
    points: [
      'Private boutique appointments arranged around your diary',
      'Personal stylists and seasonal wardrobe preparation',
      'Parcel collection and delivery straight to your residence',
    ],
    ctaLabel: 'Experiences & Culture',
    targetService: 'experiences-culture',
  },
  {
    id: 'aviation-estates',
    label: 'Travel',
    kicker: 'Flights & Stays',
    title: 'Flights & stays.',
    image: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
    secondaryImage: '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
    detailCaption: 'Private aircraft, European villas and quiet British countryside estates.',
    summary:
      'Private aviation, city suites and countryside houses coordinated as one clear plan. Every connection, preference and arrival note is sorted before you depart.',
    points: [
      'Private jets and helicopters through licensed operators',
      'Hotels, alpine chalets and coastal yachts arranged together',
      'Ground transport lined up on both sides of the flight',
    ],
    ctaLabel: 'Travel & Aviation',
    targetService: 'travel-aviation',
  },
];

const SIGNATURE_EXPERIENCE_CARDS = [
  {
    kicker: 'Dining & Evenings',
    title: 'River & Dinner',
    summary: 'An evening Thames crossing paired with a private central London dining room, subject to availability.',
    image: '/assets/aistudio/lombard_bullion_vault.jpg',
  },
  {
    kicker: 'Travel & Stays',
    title: 'London to Tuscany',
    summary: 'Private flights, waiting chauffeurs and a restored Tuscan villa arranged for an unhurried week.',
    image: '/assets/aistudio/images_6534f5fb.jpg',
  },
  {
    kicker: 'Culture & Sport',
    title: 'Music & Cars',
    summary: 'Live music, classic driving days and London hospitality coordinated cleanly around your guests.',
    image: '/assets/aistudio/bermondsey_boxing_vault.jpg',
  },
  {
    kicker: 'Estates & Weekends',
    title: 'Countryside Retreat',
    summary: 'A quiet Cotswolds manor weekend with private dining, chauffeurs and country walks ready.',
    image: '/assets/aistudio/cotswolds_manor_estate.jpg',
  },
];

const DIFFERENCE_TILES = [
  {
    number: '01',
    title: 'Discreet',
    summary:
      'Your plans, guests and private life stay strictly between us. We work quietly behind the scenes with total discretion.',
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
  },
  {
    number: '02',
    title: 'Personal',
    summary:
      'You speak directly with a named lifestyle manager who remembers how you travel, dine and unwind — never a call centre.',
    image: '/assets/aistudio/wembley_vip_hospitality.jpg',
  },
  {
    number: '03',
    title: 'Connected',
    summary:
      'Real access grows from trusted relationships with maitre d’s, house directors and independent specialists across London and abroad.',
    image: '/assets/aistudio/five_star_mayfair_suite.jpg',
  },
  {
    number: '04',
    title: 'Thoughtful',
    summary:
      'Flight timings, seating notes, quiet entrances and backup plans are checked before you step outside so every day flows.',
    image: '/assets/aistudio/corporate_ea_boardroom.jpg',
  },
  {
    number: '05',
    title: 'Effortless',
    summary:
      'Tell us the outcome you want and hand over the chasing. The finest service leaves life feeling calm and unhurried.',
    image: '/assets/aistudio/Main-5_c9bf5214.png',
  },
];

export const HomePage: React.FC = () => {
  const { openIntroductionModal, t } = useNavigation();
  const [activeTab, setActiveTab] = useState(0);

  const currentPillar = LIFESTYLE_PILLARS[activeTab];

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#08090C] text-[#F4F1EA] selection:bg-[#B98633]/30 selection:text-[#F4F1EA]">
      {/* 1. Full-Screen Cinematic Hero Carousel */}
      <HeroCarousel />

      <GoldDivider />

      {/* 2. Introduction with Unified Crest Emblem on Seamless Pure Black */}
      <section id="section-pillars" className="relative overflow-hidden border-b border-[#1A1C24] bg-[#08090C] scroll-mt-20">
        <div className="bg-black pt-10 sm:pt-14 pb-6 px-6 sm:px-12 relative z-10">
          <motion.div
            variants={sectionStaggerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-5"
          >
            <motion.div variants={imagePlateVariants} className="flex justify-center">
              <SmartImage
                src="/assets/aistudio/tglc_lockup_transparent.png"
                alt="The Global Luxury Consortium crest and wordmark"
                sizes="208px"
                className="w-44 sm:w-52 h-auto object-contain block"
              />
            </motion.div>

            <motion.h2
              variants={blockItemVariants}
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-[#F2D8A0] max-w-5xl mx-auto text-balance"
            >
              {t('home.introHeadline')}
            </motion.h2>

            <motion.p
              variants={blockItemVariants}
              className="text-xs sm:text-sm text-[#B4BCCB] max-w-2xl mx-auto leading-relaxed font-light"
            >
              {t('home.introLead')}
            </motion.p>

            <motion.div
              variants={blockItemVariants}
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#B98633] to-transparent mx-auto my-1"
            />
          </motion.div>
        </div>

        <div className="h-6 bg-gradient-to-b from-black to-[#08090C]" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-5 sm:px-12 pb-10 sm:pb-14 relative z-10 space-y-8">
          <motion.div
            key="home-pillars-loaded"
            variants={sectionStaggerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          >
            {HOME_PILLAR_CARDS.map((pillar) => (
              <motion.div
                key={pillar.num}
                variants={blockItemVariants}
                whileHover={{ y: -4 }}
                className="h-full"
              >
                <Link
                  page={pillar.route}
                  params={pillar.params}
                  className="group relative cursor-pointer min-h-[260px] sm:min-h-[295px] p-5 sm:p-6 bg-[#0C0D12] border border-[#222533] hover:border-[#CFA85E]/80 transition-colors flex flex-col justify-between overflow-hidden h-full shadow-xl"
                >
                  <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <SmartImage
                      src={pillar.image}
                      alt=""
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="w-full h-full object-cover brightness-100 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/92 via-[#07080B]/28 to-transparent group-hover:via-[#07080B]/18 transition-colors duration-500" />
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#E2BA6B] opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 pointer-events-none z-20"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#E2BA6B] opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 pointer-events-none z-20"
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-serif text-xl sm:text-2xl text-[#E2BA6B] font-light tabular-nums drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                      {pillar.num}
                    </span>
                    <span className="w-7 h-7 flex items-center justify-center bg-[#07080B]/55 backdrop-blur-sm border border-[#CFA85E]/35 group-hover:border-[#E2BA6B] transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E2BA6B] group-hover:text-[#FFF3D1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </span>
                  </div>

                  <div className="relative z-10 space-y-1.5 pt-16">
                    <span
                      aria-hidden="true"
                      className="block h-[1px] w-6 group-hover:w-12 bg-[#CFA85E] transition-all duration-500"
                    />
                    <h3 className="font-serif text-2xl sm:text-[1.7rem] leading-tight text-[#F2D8A0] group-hover:text-[#FFE7B3] transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                      {t(pillar.titleKey)}
                    </h3>
                    <p className="text-xs text-[#D2D8E4] leading-snug font-light line-clamp-1 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                      {t(pillar.descKey)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Architectural In-Page Quick-Jump Navigator */}
          <motion.nav
            aria-label="Home page sections"
            variants={blockItemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="pt-4 border-t border-[#171922] flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto pb-1"
          >
            {HOME_SECTION_JUMPS.map((jump) => (
              <a
                key={jump.id}
                href={`#${jump.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(jump.id);
                }}
                className="min-h-[44px] px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-[#9C968A] hover:text-[#CFA85E] hover:bg-[#101219] border border-transparent hover:border-[#242632] transition-colors whitespace-nowrap shrink-0 flex items-center"
              >
                <span>{t(jump.labelKey)}</span>
              </a>
            ))}
          </motion.nav>
        </div>
      </section>

      <GoldDivider />

      {/* 3. Hidden London Spotlight */}
      <section id="section-sub-rosa" className="py-12 sm:py-16 border-b border-[#1A1C24] bg-[#07080B] relative overflow-hidden scroll-mt-20">
        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-7xl mx-auto px-6 sm:px-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              variants={imagePlateVariants}
              className="lg:col-span-7 relative"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0D1017] border border-[#242632] shadow-2xl group">
                <motion.div
                  animate={{ scale: [1.03, 1, 1.02] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full"
                >
                  <SmartImage
                    src="/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg"
                    alt="Evening boat gliding along the Thames past illuminated London bridges"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="w-full h-full object-cover filter brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/90 via-[#07080B]/15 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 space-y-1">
                  <span className="tglc-kicker block">After Hours</span>
                  <p className="text-xs sm:text-sm text-[#E6E2D8] font-light leading-relaxed max-w-md">
                    Private river crossings, quiet dining vaults and late-night rooms across London.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={sectionStaggerVariants}
              className="lg:col-span-5 space-y-5"
            >
              <motion.span variants={blockItemVariants} className="tglc-kicker block">
                {t('home.hidden.kicker')}
              </motion.span>

              <motion.h2 variants={blockItemVariants} className="font-serif text-3xl sm:text-5xl text-[#F2D8A0] leading-tight">
                {t('home.hidden.heading')}
              </motion.h2>

              <motion.p variants={blockItemVariants} className="text-xs sm:text-sm text-[#B4BCCB] leading-relaxed font-light">
                The London our members love most rarely appears on public lists. It lives behind unmarked Mayfair doors, inside candlelit City cellars and along quiet evening piers. Through trusted local hosts, we shape low-key nights that feel unmistakably yours.
              </motion.p>

              <motion.ul variants={blockItemVariants} className="border-t border-[#1C1F2B] pt-4 space-y-2.5">
                {HIDDEN_LONDON_HIGHLIGHTS.map((item) => (
                  <li key={item.index} className="flex items-start gap-3 text-xs sm:text-sm text-[#B5AFA3] font-light leading-relaxed">
                    <span className="font-mono text-[11px] text-[#CFA85E] pt-0.5 shrink-0 tabular-nums">{item.index}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.p variants={blockItemVariants} className="text-[11px] font-mono text-[#8F98AA]">
                All venues and introductions are subject to availability.
              </motion.p>

              <motion.div variants={blockItemVariants} className="pt-1">
                <Link
                  page="hidden-london"
                  className="btn-gold px-7 py-3.5 text-xs inline-flex items-center gap-2 min-h-[44px]"
                >
                  <span>{t('cta.discoverHiddenLondon')}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 3.5 Experience Planning Spotlight */}
      <section id="section-commission" className="py-12 sm:py-16 px-6 sm:px-12 bg-[#0C0D13] border-b border-[#1A1C24] relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(185,134,51,0.06)_0%,_transparent_70%)] pointer-events-none" />

        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-7xl mx-auto space-y-8 relative z-10"
        >
          <motion.div variants={blockItemVariants} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#1E202B]">
            <div className="space-y-2">
              <span className="tglc-kicker block">{t('home.planning.kicker')}</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F2D8A0]">
                {t('home.planning.heading')}
              </h2>
            </div>
            <p className="tglc-prose text-xs sm:text-sm max-w-md font-light">
              Tell us what you are in the mood for — a long weekend away, an understated celebration or a Savile Row introduction — and our Mayfair desk will build tailored ideas around your dates.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Preview Grid */}
            <div className="lg:col-span-7 flex">
              <motion.div variants={sectionStaggerVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {COMMISSION_PREVIEWS.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={blockItemVariants}
                    whileHover={{ y: -4 }}
                    className="h-full"
                  >
                    <Link
                      page="commission-studio"
                      className="group cursor-pointer p-4 bg-[#0D1017] border border-[#222430] hover:border-[#E2BA6B] transition-all flex flex-col justify-between h-full"
                    >
                      <div className="space-y-3.5">
                        <motion.div variants={imagePlateVariants} className="aspect-[4/3] overflow-hidden bg-[#131722]">
                          <SmartImage
                            src={item.image}
                            alt={item.alt}
                            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw"
                            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 filter brightness-105"
                          />
                        </motion.div>
                        <div className="space-y-1.5">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] block">
                            {item.index} · {item.kicker}
                          </span>
                          <h3 className="font-serif text-lg text-[#F2D8A0] group-hover:text-[#FFE7B3] transition-colors leading-snug">
                            <span className="card-title-underline">{item.title}</span>
                          </h3>
                          <p className="text-xs text-[#B4BCCB] leading-relaxed font-light">
                            {item.summary}
                          </p>
                        </div>
                      </div>
                      <div className="pt-4 mt-2 border-t border-[#191C26] flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#8F98AA] group-hover:text-[#E2BA6B] transition-colors">
                        <span>{t('cta.selectInterest')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Office Card */}
            <motion.div variants={blockItemVariants} className="lg:col-span-5 bg-[#07080B] border border-[#262835] p-6 sm:p-7 shadow-2xl relative flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="pb-4 border-b border-[#1E202B] space-y-1">
                  <span className="tglc-kicker block">Direct Mayfair Desk</span>
                  <h3 className="font-serif text-2xl text-[#FAF7F0]">{TGLC_CONTACT.houseName}</h3>
                </div>

                <p className="text-xs sm:text-sm text-[#C4BEB2] leading-relaxed font-light">
                  Prefer a real conversation to filling in a form? Speak directly with our team on Albemarle Street — every enquiry is answered personally, in complete confidence.
                </p>

                <dl className="divide-y divide-[#1A1D28] border-y border-[#1A1D28] text-xs">
                  <div className="py-2.5 flex items-baseline justify-between gap-4">
                    <dt className="font-mono uppercase tracking-wider text-[#8F98AA] text-[10px] shrink-0">Address</dt>
                    <dd className="text-[#D9D4CA] text-right">3rd Floor, 45 Albemarle Street, W1S 4JL</dd>
                  </div>
                  <div className="py-2.5 flex items-baseline justify-between gap-4">
                    <dt className="font-mono uppercase tracking-wider text-[#8F98AA] text-[10px] shrink-0">Hours</dt>
                    <dd className="text-[#D9D4CA] text-right tabular-nums">{TGLC_CONTACT.hours}</dd>
                  </div>
                  <div className="py-2.5 flex items-baseline justify-between gap-4">
                    <dt className="font-mono uppercase tracking-wider text-[#8F98AA] text-[10px] shrink-0">Telephone</dt>
                    <dd className="text-right">
                      <a
                        href={`tel:${TGLC_CONTACT.telephone.replace(/\s+/g, '')}`}
                        className="text-[#E2BA6B] hover:text-[#F0CC83] transition-colors tabular-nums"
                      >
                        {TGLC_CONTACT.telephone}
                      </a>
                    </dd>
                  </div>
                  <div className="py-2.5 flex items-baseline justify-between gap-4">
                    <dt className="font-mono uppercase tracking-wider text-[#8F98AA] text-[10px] shrink-0">Email</dt>
                    <dd className="text-right truncate">
                      <a
                        href={`mailto:${TGLC_CONTACT.email}`}
                        className="text-[#D9D4CA] hover:text-[#E2BA6B] transition-colors"
                      >
                        {TGLC_CONTACT.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <Link
                page="commission-studio"
                className="btn-gold w-full py-3.5 text-xs flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Sliders className="w-3.5 h-3.5 text-[#08090C]" />
                <span>{t('cta.startPlanning')}</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 4. Interactive Lifestyle Showcase */}
      <section id="section-showcase" className="py-12 sm:py-16 px-6 sm:px-12 bg-[#08090C] border-b border-[#1A1C24] relative scroll-mt-20">
        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          <motion.div variants={blockItemVariants} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-5 border-b border-[#1D1F28]">
            <div className="space-y-2">
              <span className="tglc-kicker block">{t('home.live.kicker')}</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F2D8A0]">
                {t('home.live.heading')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#B4BCCB] max-w-md leading-relaxed font-light">
              From early morning private arrivals to late dinners in Mayfair, one trusted voice keeps every moving part calm and connected.
            </p>
          </motion.div>

          <motion.div variants={blockItemVariants} className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-[#181A22]">
            {LIFESTYLE_PILLARS.map((pillar, idx) => (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(idx)}
                className={`relative min-h-[44px] px-5 py-3 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-300 flex items-center gap-2.5 cursor-pointer ${
                  activeTab === idx
                    ? 'text-[#CFA85E] bg-[#12141C]'
                    : 'text-[#8E8A83] hover:text-[#D9D4CA] hover:bg-[#0D0F15]'
                }`}
              >
                <span className="font-mono text-[10px] opacity-70 tabular-nums">0{idx + 1}</span>
                <span>{pillar.label}</span>
                {activeTab === idx && (
                  <motion.span
                    layoutId="homeShowcaseTab"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B98633]"
                  />
                )}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPillar.id}
              initial={{ opacity: 0.85, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.85, y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-stretch bg-[#0C0D12] border border-[#20222E] p-5 sm:p-7 lg:p-8 shadow-2xl"
            >
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div className="relative aspect-[16/9] overflow-hidden tglc-shimmer-soft border border-[#242632] group">
                  <motion.div
                    initial={{ scale: 1.04 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <SmartImage
                      src={currentPillar.image}
                      alt={`${currentPillar.title} — ${currentPillar.summary}`}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-104 filter brightness-105 contrast-105"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12]/70 via-transparent to-transparent" />
                </div>

                {currentPillar.secondaryImage && (
                  <div className="grid grid-cols-12 gap-4 items-center pt-3 border-t border-[#1B1D27]">
                    <div className="col-span-4 sm:col-span-3 aspect-[16/10] overflow-hidden border border-[#8B672B]/50 bg-black">
                      <SmartImage
                        src={currentPillar.secondaryImage}
                        alt={`${currentPillar.label} detail view`}
                        sizes="180px"
                        className="w-full h-full object-cover filter brightness-105 hover:scale-104 transition-transform duration-700"
                      />
                    </div>
                    <div className="col-span-8 sm:col-span-9 space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] block">
                        In Detail
                      </span>
                      <p className="text-xs text-[#A5A096] font-light leading-relaxed">
                        {currentPillar.detailCaption}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:border-l lg:border-[#1B1D27] lg:pl-10">
                <div className="space-y-4">
                  <span className="tglc-kicker block">
                    0{activeTab + 1} / 0{LIFESTYLE_PILLARS.length} · {currentPillar.kicker}
                  </span>

                  <h3 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] leading-snug">
                    {currentPillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#D9D4CA] font-light leading-relaxed">
                    {currentPillar.summary}
                  </p>

                  <ul className="border-t border-[#1C1F2B] pt-4 space-y-2.5">
                    {currentPillar.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-xs sm:text-sm text-[#B5AFA3] font-light leading-relaxed">
                        <span aria-hidden="true" className="w-3 h-[1px] bg-[#B98633] mt-2.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    page={currentPillar.targetPage === 'hidden-london' ? 'hidden-london' : 'service-detail'}
                    params={currentPillar.targetPage === 'hidden-london' ? undefined : { serviceId: currentPillar.targetService }}
                    className="btn-gold px-6 py-3.5 text-xs inline-flex items-center gap-2 min-h-[44px]"
                  >
                    <span>Explore {currentPillar.ctaLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#08090C]" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 5. Services Gallery — Refined Multi-Column Editorial Grid */}
      <section id="section-services" className="py-12 sm:py-16 px-5 sm:px-10 lg:px-12 bg-[#090A0E] border-b border-[#1A1C24] scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-9">
          <motion.div
            variants={blockItemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-5 border-b border-[#1D1F28]"
          >
            <div className="space-y-2">
              <span className="tglc-kicker block">{t('home.services.kicker')}</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F2D8A0]">
                {t('home.services.heading')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#B4BCCB] max-w-md leading-relaxed font-light">
              Seven connected practice areas under one dedicated Mayfair desk — so your flights, dining rooms, residences, chauffeurs and rare commissions all move in step.
            </p>
          </motion.div>

          {/* Balanced Architectural Multi-Column Grid (Desktop 3-col: 2+1 / 1+1+1 / 1+2; Tablet 2-col: 2 / 1+1 / 1+1 / 1+1 — zero orphans) */}
          <motion.div
            variants={sectionStaggerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.02 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch"
          >
            {SERVICES_DATA.map((service, index) => {
              const numLabel = String(index + 1).padStart(2, '0');
              const totalLabel = String(SERVICES_DATA.length).padStart(2, '0');
              const isLeadFeature = index === 0;
              const isClosingFeature = index === SERVICES_DATA.length - 1;
              const isWideDesktop = isLeadFeature || isClosingFeature;

              const spanClasses = isLeadFeature
                ? 'md:col-span-2 lg:col-span-2'
                : isClosingFeature
                  ? 'lg:col-span-2'
                  : '';

              return (
                <motion.article
                  key={service.id}
                  variants={blockItemVariants}
                  whileHover={{ y: -3 }}
                  className={`relative group cursor-pointer bg-[#0D0F15] border border-[#1E212D] hover:border-[#CFA85E]/75 transition-all duration-300 shadow-2xl overflow-hidden flex flex-col h-full ${spanClasses}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#E2BA6B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#E2BA6B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
                  />

                  <div
                    className={
                      isWideDesktop
                        ? 'grid grid-cols-1 lg:grid-cols-12 items-stretch flex-1'
                        : 'flex flex-col flex-1'
                    }
                  >
                    {/* Framed Editorial Photograph */}
                    <motion.div
                      variants={imagePlateVariants}
                      className={
                        isWideDesktop
                          ? `lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:min-h-[300px] overflow-hidden bg-[#131722] ${
                              isClosingFeature ? 'lg:order-2' : 'lg:order-1'
                            }`
                          : 'relative aspect-[16/10] w-full overflow-hidden bg-[#131722]'
                      }
                    >
                      <SmartImage
                        src={service.heroImage}
                        alt={service.title}
                        sizes={
                          isWideDesktop
                            ? '(min-width: 1024px) 34vw, 100vw'
                            : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                        }
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 filter brightness-105 contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/75 via-[#07080B]/15 to-transparent" />
                      <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-[#07080B]/85 backdrop-blur-sm border border-[#8B672B]/50 font-mono text-[10px] tracking-[0.2em] text-[#E2BA6B] tabular-nums">
                        {numLabel} / {totalLabel}
                      </div>
                      <span className="absolute bottom-3 right-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#D4D8E2]/90 bg-[#07080B]/75 px-2.5 py-1 border border-[#242736] tabular-nums">
                        {service.subServices.length} areas
                      </span>
                    </motion.div>

                    {/* Editorial Content Column */}
                    <div
                      className={
                        isWideDesktop
                          ? `lg:col-span-6 p-6 sm:p-7 flex flex-col justify-between space-y-5 ${
                              isClosingFeature ? 'lg:order-1' : 'lg:order-2'
                            }`
                          : 'p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5'
                      }
                    >
                      <div className="space-y-2.5">
                        <h3 className="font-serif text-2xl sm:text-[1.65rem] text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-tight">
                          <Link
                            page="service-detail"
                            params={{ serviceId: service.id }}
                            className="after:absolute after:inset-0 after:z-10"
                          >
                            <span className="card-title-underline">{service.title}</span>
                          </Link>
                        </h3>

                        <p className="font-serif italic text-sm sm:text-base text-[#E2BA6B] leading-snug">
                          {service.tagline}
                        </p>

                        <p className="text-xs sm:text-[13px] text-[#CFD4DF] leading-relaxed font-light">
                          {service.shortDesc}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <ul className="border-t border-[#1A1D29] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                          {service.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex items-start gap-2 text-[11.5px] text-[#B5AFA3] font-light leading-snug"
                            >
                              <span aria-hidden="true" className="w-2 h-[1px] bg-[#CFA85E] mt-2 shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-3 border-t border-[#181B25] flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-[#CFA85E] group-hover:text-[#F0CC83] transition-colors">
                          <span>Explore {service.title.split(/[,&]/)[0].trim()}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          <div className="text-center pt-2">
            <Link
              page="services"
              className="btn-outline-gold inline-block px-8 py-3.5 text-xs cursor-pointer"
            >
              {t('cta.viewAllPractices')}
            </Link>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 5.5 Signature Experiences Showcase */}
      <section id="section-cases" className="py-12 sm:py-16 px-6 sm:px-12 bg-gradient-to-b from-[#07080B] via-[#0D1017] to-[#07080B] border-b border-[#1A1C24] relative overflow-hidden scroll-mt-20">
        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-7xl mx-auto space-y-10 relative z-10"
        >
          <motion.div variants={blockItemVariants} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#1E202B]">
            <div className="space-y-2">
              <span className="tglc-kicker block">{t('home.cases.kicker')}</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F2D8A0]">
                {t('home.cases.heading')}
              </h2>
            </div>
            <p className="tglc-prose text-xs sm:text-sm max-w-md font-light">
              A few examples of how members combine travel, dining, culture and countryside stays. Everything is adapted to your dates.
            </p>
          </motion.div>

          {/* 4 Featured Experience Cards */}
          <motion.div variants={sectionStaggerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SIGNATURE_EXPERIENCE_CARDS.map((card) => (
              <motion.div
                key={card.title}
                variants={blockItemVariants}
                whileHover={{ y: -4 }}
                className="h-full"
              >
                <Link
                  page="case-studies"
                  className="bg-[#0D1017] border border-[#222430] hover:border-[#E2BA6B] transition-all cursor-pointer overflow-hidden group flex flex-col justify-between h-full"
                >
                  <div>
                    <motion.div variants={imagePlateVariants} className="aspect-[16/10] overflow-hidden bg-[#131722] relative">
                      <SmartImage
                        src={card.image}
                        alt={card.title}
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 filter brightness-105 contrast-105"
                      />
                    </motion.div>
                    <div className="p-5 space-y-2.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] block">
                        {card.kicker}
                      </span>
                      <h3 className="font-serif text-xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                        <span className="card-title-underline">{card.title}</span>
                      </h3>
                      <p className="text-xs text-[#A5A096] leading-relaxed font-light">
                        {card.summary}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-3 border-t border-[#181B25] flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#8F98AA] group-hover:text-[#E2BA6B] transition-colors">
                    <span>{t('cta.viewExample')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#E2BA6B]" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={blockItemVariants} className="pt-2 flex justify-center">
            <Link
              page="case-studies"
              className="btn-gold px-8 py-3.5 text-xs flex items-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>{t('nav.signatureExperiences')}</span>
              <ArrowUpRight className="w-4 h-4 text-[#07080B]" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 6. "The TGLC Difference" — Pictorial Bento Editorial Grid */}
      <section id="section-difference" className="py-12 sm:py-16 px-6 sm:px-12 border-b border-[#1A1C24] bg-[#08090C] scroll-mt-20">
        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-7xl mx-auto space-y-10"
        >
          <motion.div variants={blockItemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1D1F28] pb-6">
            <div className="space-y-2">
              <span className="tglc-kicker block">{t('home.difference.kicker')}</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F2D8A0]">
                {t('home.difference.heading')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#B4BCCB] max-w-md leading-relaxed font-light">
              Built on quiet judgement, personal continuity and genuine relationships in London and abroad.
            </p>
          </motion.div>

          {/* Illustrated 5-Tile Mosaic Grid */}
          <motion.div variants={sectionStaggerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFERENCE_TILES.map((tile, idx) => (
              <motion.div
                key={tile.number}
                variants={blockItemVariants}
                whileHover={{ y: -3 }}
                className={idx === 0 ? 'md:col-span-2 lg:col-span-2 h-full' : 'h-full'}
              >
                <Link
                  page="ethos"
                  className="group cursor-pointer bg-[#0E1016] border border-[#20222E] hover:border-[#B98633]/65 transition-all duration-300 flex flex-col justify-between overflow-hidden h-full"
                >
                  <motion.div
                    variants={imagePlateVariants}
                    className={`w-full overflow-hidden tglc-shimmer-soft relative ${
                      idx === 0 ? 'aspect-[16/10] lg:aspect-auto lg:h-[300px]' : idx === 1 ? 'aspect-[16/10] lg:aspect-auto lg:h-[300px]' : 'aspect-[16/10]'
                    }`}
                  >
                    <SmartImage
                      src={tile.image}
                      alt={`${tile.title} — ${tile.summary}`}
                      sizes={idx === 0 ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 filter brightness-105 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1016] via-[#0E1016]/25 to-transparent" />
                    <span className="absolute bottom-3 left-5 font-serif text-2xl sm:text-3xl text-[#CFA85E] tabular-nums">
                      {tile.number}
                    </span>
                  </motion.div>

                  <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <h3 className="font-serif text-2xl text-[#F4F1EA] group-hover:text-[#CFA85E] transition-colors">
                        <span className="card-title-underline">{tile.title}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-[#C8C3B8] leading-relaxed font-light">
                        {tile.summary}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#1A1D28] flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#8F98AA] group-hover:text-[#CFA85E] transition-colors">
                      <span>{t('cta.ourEthos')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 6.5 Cultural, Islamic & Global Traditions Spotlight */}
      <section id="section-traditions" className="py-12 sm:py-16 px-6 sm:px-12 border-b border-[#1A1C24] bg-[#08090C] scroll-mt-20">
        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center bg-[#0C0E14] border border-[#222532] p-6 sm:p-8 lg:p-10 shadow-2xl">
            <motion.div variants={sectionStaggerVariants} className="lg:col-span-6 space-y-5">
              <motion.span variants={blockItemVariants} className="tglc-kicker block">
                {t('home.traditions.kicker')}
              </motion.span>
              <motion.h2 variants={blockItemVariants} className="font-serif text-3xl sm:text-5xl text-[#F2D8A0] leading-tight">
                {t('home.traditions.heading')}
              </motion.h2>
              <motion.p variants={blockItemVariants} className="text-xs sm:text-sm text-[#B4BCCB] leading-relaxed font-light">
                We warmly cater to Islamic and Muslim traditions — from certified halal fine dining, Ramadan Iftar and Suhoor hospitality, alcohol-free suites and prayer-space preparation to private family residences and female chauffeurs on request.
              </motion.p>
              <motion.p variants={blockItemVariants} className="text-xs sm:text-sm text-[#B4BCCB] leading-relaxed font-light">
                We respect every culture, faith and family custom equally — welcoming Jewish, Hindu, Jain, Sikh, East Asian and European households across twenty global languages.
              </motion.p>
              <motion.div variants={blockItemVariants} className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  page="cultural-traditions"
                  className="btn-gold px-6 py-3.5 text-xs inline-flex items-center gap-2 min-h-[44px]"
                >
                  <span>{t('cta.exploreTraditions')}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
                </Link>
                <button
                  type="button"
                  onClick={() => openIntroductionModal('Cultural & Islamic Hospitality')}
                  className="btn-outline-gold px-6 py-3.5 text-xs min-h-[44px] cursor-pointer"
                >
                  {t('cta.requestIntroduction')}
                </button>
              </motion.div>
            </motion.div>

            <motion.div variants={imagePlateVariants} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                page="cultural-traditions"
                className="group relative aspect-[4/5] overflow-hidden border border-[#242632] hover:border-[#CFA85E]/70 transition-colors bg-[#0D1017] sm:col-span-2 lg:col-span-1"
              >
                <SmartImage
                  src="/assets/aistudio/cultural_iftar_mayfair_salon.jpg"
                  alt="Candlelit Mayfair private dining room prepared for Ramadan Iftar hospitality"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/90 via-[#07080B]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] block">
                    Islamic & Halal
                  </span>
                  <p className="font-serif text-lg text-[#F2D8A0] leading-snug">
                    Ramadan, Halal Dining & Family Privacy
                  </p>
                </div>
              </Link>

              <Link
                page="cultural-traditions"
                className="group relative aspect-[4/5] overflow-hidden border border-[#242632] hover:border-[#CFA85E]/70 transition-colors bg-[#0D1017] sm:col-span-2 lg:col-span-1"
              >
                <SmartImage
                  src="/assets/aistudio/cultural_global_tea_salon.jpg"
                  alt="Private Mayfair hospitality lounge honouring global cultural traditions"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/90 via-[#07080B]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] block">
                    All Cultures
                  </span>
                  <p className="font-serif text-lg text-[#F2D8A0] leading-snug">
                    Global Faiths & Family Customs
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 6.5 Cultural, Islamic & Global Traditions Spotlight */}
      <section id="section-traditions" className="py-12 sm:py-16 px-6 sm:px-12 border-b border-[#1A1C24] bg-[#08090C] scroll-mt-20">
        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center bg-[#0C0E14] border border-[#222532] p-6 sm:p-8 lg:p-10 shadow-2xl">
            <motion.div variants={sectionStaggerVariants} className="lg:col-span-6 space-y-5">
              <motion.span variants={blockItemVariants} className="tglc-kicker block">
                {t('home.traditions.kicker')}
              </motion.span>
              <motion.h2 variants={blockItemVariants} className="font-serif text-3xl sm:text-5xl text-[#F2D8A0] leading-tight">
                {t('home.traditions.heading')}
              </motion.h2>
              <motion.p variants={blockItemVariants} className="text-xs sm:text-sm text-[#B4BCCB] leading-relaxed font-light">
                We warmly cater to Islamic and Muslim traditions — from certified halal fine dining, Ramadan Iftar and Suhoor hospitality, alcohol-free suites and prayer-space preparation to private family residences and female chauffeurs on request.
              </motion.p>
              <motion.p variants={blockItemVariants} className="text-xs sm:text-sm text-[#B4BCCB] leading-relaxed font-light">
                We respect every culture, faith and family custom equally — welcoming Jewish, Hindu, Jain, Sikh, East Asian and European households across twenty global languages.
              </motion.p>
              <motion.div variants={blockItemVariants} className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  page="cultural-traditions"
                  className="btn-gold px-6 py-3.5 text-xs inline-flex items-center gap-2 min-h-[44px]"
                >
                  <span>{t('cta.exploreTraditions')}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
                </Link>
                <button
                  type="button"
                  onClick={() => openIntroductionModal('Cultural & Islamic Hospitality')}
                  className="btn-outline-gold px-6 py-3.5 text-xs min-h-[44px] cursor-pointer"
                >
                  {t('cta.requestIntroduction')}
                </button>
              </motion.div>
            </motion.div>

            <motion.div variants={imagePlateVariants} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                page="cultural-traditions"
                className="group relative aspect-[4/5] overflow-hidden border border-[#242632] hover:border-[#CFA85E]/70 transition-colors bg-[#0D1017] sm:col-span-2 lg:col-span-1"
              >
                <SmartImage
                  src="/assets/aistudio/cultural_iftar_mayfair_salon.jpg"
                  alt="Candlelit Mayfair private dining room prepared for Ramadan Iftar hospitality"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/90 via-[#07080B]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] block">
                    Islamic & Halal
                  </span>
                  <p className="font-serif text-lg text-[#F2D8A0] leading-snug">
                    Ramadan, Halal Dining & Family Privacy
                  </p>
                </div>
              </Link>

              <Link
                page="cultural-traditions"
                className="group relative aspect-[4/5] overflow-hidden border border-[#242632] hover:border-[#CFA85E]/70 transition-colors bg-[#0D1017] sm:col-span-2 lg:col-span-1"
              >
                <SmartImage
                  src="/assets/aistudio/cultural_global_tea_salon.jpg"
                  alt="Private Mayfair hospitality lounge honouring global cultural traditions"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/90 via-[#07080B]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] block">
                    All Cultures
                  </span>
                  <p className="font-serif text-lg text-[#F2D8A0] leading-snug">
                    Global Faiths & Family Customs
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 7. Our London */}
      <section id="section-enclaves" className="py-12 sm:py-16 px-6 sm:px-12 border-b border-[#1A1C24] bg-[#0A0B0F] scroll-mt-20">
        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          <motion.div variants={blockItemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-5 border-b border-[#1D1F28]">
            <div className="space-y-2">
              <span className="tglc-kicker block">{t('home.london.kicker')}</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F2D8A0]">
                {t('home.london.heading')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#B4BCCB] max-w-md leading-relaxed font-light">
              From our office on Albemarle Street, we know the streets, dining rooms and makers across central London.
            </p>
          </motion.div>

          <motion.div variants={sectionStaggerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LONDON_NEIGHBOURHOODS.slice(0, 4).map((enclave) => (
              <motion.div
                key={enclave.name}
                variants={blockItemVariants}
                whileHover={{ y: -3 }}
              >
                <Link
                  page="our-london"
                  className="block group cursor-pointer relative aspect-[3/4] overflow-hidden bg-black border border-[#20222E] hover:border-[#B98633]/65 transition-all"
                >
                  <motion.div variants={imagePlateVariants} className="w-full h-full">
                    <SmartImage
                      src={enclave.image}
                      alt={`${enclave.name} neighbourhood in London`}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 filter brightness-105 contrast-105"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/55 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 space-y-1.5">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#CFA85E] block">
                      {enclave.vibe}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#F2D8A0] group-hover:text-[#FFE7B3] transition-colors leading-snug">
                      <span className="card-title-underline">{enclave.name}</span>
                    </h3>
                    <p className="text-xs text-[#C6CDD9] font-light leading-relaxed line-clamp-2">
                      {enclave.summary}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center pt-2">
            <Link
              page="our-london"
              className="btn-outline-gold inline-block px-8 py-3.5 text-xs cursor-pointer"
            >
              {t('cta.exploreOurLondon')}
            </Link>
          </div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 8. Introduction Finale */}
      <section className="py-14 sm:py-20 px-6 sm:px-12 bg-black text-center">
        <Reveal className="max-w-3xl mx-auto space-y-6">
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#B98633] to-transparent mx-auto" />

          <span className="tglc-kicker block">{t('home.closing.kicker')}</span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2D8A0] leading-tight">
            {t('home.closing.heading')}
          </h2>

          <p className="text-xs sm:text-sm text-[#B4BCCB] font-light max-w-xl mx-auto leading-relaxed">
            Every membership starts person to person — over coffee at our Albemarle Street office or by phone. Tell us how you live, travel and spend your time, and we will show you how much lighter your calendar can feel.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openIntroductionModal('General enquiry')}
              className="btn-gold px-8 py-3.5 text-xs flex items-center gap-2 min-h-[44px] cursor-pointer"
            >
              <span>{t('cta.requestIntroduction')}</span>
              <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
            </button>
            <Link
              page="contact"
              className="btn-outline-gold px-8 py-3.5 text-xs inline-flex items-center justify-center min-h-[44px]"
            >
              {t('cta.contactOffice')}
            </Link>
          </div>

          <div className="pt-6 border-t border-[#181A22] flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] font-mono text-[#8F98AA] tabular-nums">
            <span>3rd Floor, 45 Albemarle Street, Mayfair, W1S 4JL</span>
            <span aria-hidden="true" className="text-[#4B3A1D]">·</span>
            <a
              href={`tel:${TGLC_CONTACT.telephone.replace(/\s+/g, '')}`}
              className="text-[#CFA85E] hover:text-[#E2BA6B] transition-colors"
            >
              {TGLC_CONTACT.telephone}
            </a>
            <span aria-hidden="true" className="text-[#4B3A1D]">·</span>
            <span>{TGLC_CONTACT.hours}</span>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
