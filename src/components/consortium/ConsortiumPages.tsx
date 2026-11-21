import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { TEAM_MEMBERS, ETHOS_PRINCIPLES, APPROACH_STEPS, LONDON_NEIGHBOURHOODS } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { Link } from '../common/Link';
import { SmartImage } from '../common/SmartImage';
import { Reveal, RevealItem } from '../common/Reveal';
import { EditorialHeroCarousel } from '../common/EditorialHeroCarousel';
import { CONSORTIUM_SUBPAGE_SLIDES } from '../../utils/carouselSlides';
import { PageRoute } from '../../types';
import {
  ArrowUpRight,
  Shield,
  Lock,
  Check,
  Compass,
  ChevronLeft,
  ChevronRight,
  EyeOff,
} from 'lucide-react';
import { ConsortiumLocationsMap } from './ConsortiumLocationsMap';
import { ConsortiumConciergeSection } from './ConsortiumConciergeSection';

const CONSORTIUM_HERO_SLIDES = [
  {
    image: '/assets/aistudio/consortium_overview_head.jpg',
    title: '45 Albemarle Street',
    caption: 'Our Mayfair office at 45 Albemarle Street, London',
  },
  {
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
    title: 'Mayfair Meeting Room',
    caption: 'Quiet space for private conversations in London',
  },
  {
    image: '/assets/aistudio/consortium_ethos_sanctuary.jpg',
    title: 'Quiet Reading Room',
    caption: 'A calm space away from the rush of central London',
  },
  {
    image: '/assets/aistudio/consortium_approach_board.jpg',
    title: 'London Office',
    caption: 'Personal planning for travel, homes and events',
  },
  {
    image: '/assets/aistudio/consortium_privacy_vault.jpg',
    title: 'Private Consultation Space',
    caption: 'Discretion and care built into every conversation',
  },
];

interface ConsortiumPagesProps {
  subPage?: 'overview' | 'concierge' | 'about' | 'ethos' | 'approach' | 'network' | 'our-london' | 'privacy';
}

const REVEAL_SECTION = {
  initial: { opacity: 0.9, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.01 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

const HERO_KEN_BURNS = {
  initial: { scale: 1.08 },
  animate: { scale: 1 },
  transition: { duration: 8, ease: 'easeOut' as const },
};

const SUB_TABS: {
  key: NonNullable<ConsortiumPagesProps['subPage']> | 'cultural-traditions';
  route: PageRoute;
  label: string;
}[] = [
  { key: 'overview', route: 'consortium', label: 'Overview' },
  { key: 'concierge', route: 'consortium-concierge', label: 'Concierge' },
  { key: 'about', route: 'about', label: 'About TGLC' },
  { key: 'ethos', route: 'ethos', label: 'Our Ethos' },
  { key: 'approach', route: 'approach', label: 'Our Approach' },
  { key: 'network', route: 'network', label: 'Our Network' },
  { key: 'our-london', route: 'our-london', label: 'Our London' },
  { key: 'privacy', route: 'privacy-discretion', label: 'Privacy & Discretion' },
  { key: 'cultural-traditions', route: 'cultural-traditions', label: 'Cultural Traditions' },
];

const OVERVIEW_LINKS: {
  route: PageRoute;
  kicker: string;
  title: string;
  description: string;
}[] = [
  {
    route: 'about',
    kicker: 'Who We Are',
    title: 'About TGLC',
    description: 'Meet the people running our Mayfair office and learn why we started.',
  },
  {
    route: 'ethos',
    kicker: 'What Guides Us',
    title: 'Our Ethos',
    description: 'The five clear principles that shape every conversation and booking.',
  },
  {
    route: 'approach',
    kicker: 'How We Work',
    title: 'Our Approach',
    description: 'See how membership begins and how we look after your requests.',
  },
];

const NETWORK_CITIES = [
  'London',
  'Paris',
  'Geneva',
  'Milan',
  'Monaco',
  'New York',
  'Tokyo',
  'Singapore',
];

const PRIVACY_COMMITMENTS = [
  {
    icon: Lock,
    title: 'Only what is needed',
    line: "We only share what's needed to make your plans happen.",
  },
  {
    icon: EyeOff,
    title: 'Never used for publicity',
    line: 'We never use your name or photos for publicity.',
  },
  {
    icon: Shield,
    title: 'Kept within your team',
    line: 'Your details stay with the people looking after you.',
  },
  {
    icon: Check,
    title: 'Full control of your data',
    line: 'You can ask us to delete your information at any time.',
  },
];

export const ConsortiumPages: React.FC<ConsortiumPagesProps> = ({ subPage = 'overview' }) => {
  const { openIntroductionModal } = useNavigation();
  const [selectedLondonArea, setSelectedLondonArea] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [hasHeroAdvanced, setHasHeroAdvanced] = useState(false);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  const activeTabLabel = SUB_TABS.find((t) => t.key === subPage)?.label ?? 'Overview';

  useEffect(() => {
    if (isHeroPaused) return;
    const timer = setInterval(() => {
      setHasHeroAdvanced(true);
      setHeroSlide((prev) => (prev + 1) % CONSORTIUM_HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHeroPaused]);

  const nextHeroSlideSrc = hasHeroAdvanced
    ? CONSORTIUM_HERO_SLIDES[(heroSlide + 1) % CONSORTIUM_HERO_SLIDES.length].image
    : null;

  return (
    <div className="bg-[#07080B] text-[#FAF7F0] pt-24 sm:pt-28 pb-14 overflow-hidden">
      {/* Compact Sub-Navigation Rail */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#1A1C24]">
          <div className="flex items-center gap-2 text-xs tracking-wide text-[#CFA85E]">
            <Link page="home" className="hover:text-[#F4F1EA] transition-colors">
              Home
            </Link>
            <span className="text-[#8B672B]">/</span>
            <Link page="consortium" className="text-[#D9D4CA] hover:text-[#F4F1EA] transition-colors">
              The Consortium
            </Link>
            {subPage !== 'overview' && (
              <>
                <span className="text-[#8B672B]">/</span>
                <span className="text-[#F4F1EA] font-medium">{activeTabLabel}</span>
              </>
            )}
          </div>
          <span className="text-[11px] text-[#9C968A] hidden sm:inline tabular-nums">
            3rd Floor, 45 Albemarle Street, London W1S 4JL
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto border-b border-[#222530] pb-3 text-xs sm:text-[13px] tracking-wide scrollbar-none">
          {SUB_TABS.map((tab) => {
            const active = subPage === tab.key;
            return (
              <Link
                key={tab.key}
                page={tab.route}
                className={`relative px-3.5 py-2 whitespace-nowrap transition-colors ${
                  active ? 'text-[#F4F1EA] font-medium' : 'text-[#9C968A] hover:text-[#F4F1EA]'
                }`}
              >
                <span>{tab.label}</span>
                {active && (
                  <motion.span
                    layoutId="consortiumActiveTab"
                    className="absolute inset-x-3 -bottom-3 h-[2px] bg-[#CFA85E]"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. Consortium Overview Subpage */}
      {/* ========================================================= */}
      {subPage === 'overview' && (
        <div className="space-y-10 sm:space-y-12">
          {/* Full-Width Matching Photographic Hero with Moving Carousel */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8">
            <div
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
              className="relative min-h-[420px] sm:min-h-[500px] flex items-end overflow-hidden border border-[#242630] bg-[#12141A]"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={heroSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.0, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <motion.div {...HERO_KEN_BURNS} className="w-full h-full">
                    <SmartImage
                      src={CONSORTIUM_HERO_SLIDES[heroSlide].image}
                      alt={CONSORTIUM_HERO_SLIDES[heroSlide].title}
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      priority={heroSlide === 0}
                      className="w-full h-full object-cover brightness-105 contrast-105"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
              {nextHeroSlideSrc && (
                <div aria-hidden="true" className="hidden">
                  <SmartImage src={nextHeroSlideSrc} alt="" sizes="(max-width: 1280px) 100vw, 1280px" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/45 to-[#07080B]/25" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/90 via-[#07080B]/45 to-transparent hidden sm:block" />

              {/* Prev / Next controls */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setHasHeroAdvanced(true);
                    setHeroSlide((prev) => (prev - 1 + CONSORTIUM_HERO_SLIDES.length) % CONSORTIUM_HERO_SLIDES.length);
                  }}
                  className="p-2 bg-[#07080B]/75 hover:bg-[#B98633] text-[#E2BA6B] hover:text-[#07080B] border border-[#B98633]/30 backdrop-blur-md transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="px-2 py-1 bg-[#07080B]/80 border border-[#B98633]/30 text-[10px] tracking-widest text-[#E2BA6B] font-mono tabular-nums">
                  {String(heroSlide + 1).padStart(2, '0')} / {String(CONSORTIUM_HERO_SLIDES.length).padStart(2, '0')}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setHasHeroAdvanced(true);
                    setHeroSlide((prev) => (prev + 1) % CONSORTIUM_HERO_SLIDES.length);
                  }}
                  className="p-2 bg-[#07080B]/75 hover:bg-[#B98633] text-[#E2BA6B] hover:text-[#07080B] border border-[#B98633]/30 backdrop-blur-md transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Progress Line Indicator */}
              <div className="absolute top-0 inset-x-0 z-20 grid grid-cols-5 gap-1 p-1 bg-[#07080B]/40">
                {CONSORTIUM_HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.title}
                    onClick={() => {
                      setHasHeroAdvanced(true);
                      setHeroSlide(idx);
                    }}
                    className={`h-0.5 transition-all ${
                      idx === heroSlide ? 'bg-[#E2BA6B]' : 'bg-[#FAF7F0]/25 hover:bg-[#FAF7F0]/60'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0.01, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-3.5"
              >
                <span className="tglc-kicker text-[11px] block">
                  Mayfair, London
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
                  The Global Luxury Consortium
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                  “Opening doors that don’t usually exist.”
                </p>
                <p className="tglc-prose text-sm sm:text-base max-w-2xl">
                  A private concierge in Mayfair, helping people live, travel and celebrate well.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Three Short Link Cards to About, Ethos, and Approach */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
            <motion.div {...REVEAL_SECTION} className="border-b border-[#1D1F28] pb-4">
              <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block mb-1">
                Inside TGLC
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
                Who we are and how we work
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OVERVIEW_LINKS.map((card, i) => (
                <motion.div
                  key={card.route}
                  initial={{ opacity: 0.9, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  transition={{ duration: 0.48, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="h-full"
                >
                  <Link
                    page={card.route}
                    className="group relative p-7 bg-[#12141A] border border-[#242630] hover:border-[#CFA85E]/80 transition-colors flex flex-col justify-between space-y-6 overflow-hidden h-full"
                  >
                    <div className="space-y-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#CFA85E] block">
                        {card.kicker}
                      </span>
                      <h3 className="font-serif text-2xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed font-light">
                        {card.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#1D202A] flex items-center justify-between text-xs text-[#E2BA6B]">
                      <span>Read more</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#E2BA6B] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          <GoldDivider />

          {/* Flagship 24/7 Bespoke Concierge Section */}
          <ConsortiumConciergeSection variant="embedded" />

          <GoldDivider />

          {/* Paired Editorial Photographs */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <motion.div {...REVEAL_SECTION} className="overflow-hidden border border-[#242630] bg-[#12141A] group">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <SmartImage
                  src="/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg"
                  alt="London townhouse interior in Mayfair"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2 border-t border-[#222530]">
                <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B] block">Mayfair Base</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">
                  <span className="card-title-underline">Personal support in London</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#C8C2B7] font-light leading-relaxed">
                  You deal with real people at our Albemarle Street office, never an automated queue.
                </p>
              </div>
            </motion.div>

            <motion.div {...REVEAL_SECTION} className="overflow-hidden border border-[#242630] bg-[#12141A] group">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <SmartImage
                  src="/assets/aistudio/florence_palazzo_courtyard.jpg"
                  alt="European courtyard architecture"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2 border-t border-[#222530]">
                <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B] block">Around the World</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">
                  <span className="card-title-underline">One team wherever you travel</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#C8C2B7] font-light leading-relaxed">
                  We coordinate travel, stays and events across Europe and beyond from one point of contact.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Introduction CTA */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8">
            <motion.div
              {...REVEAL_SECTION}
              className="p-8 sm:p-10 bg-[#12141A] border border-[#2A2D38] flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            >
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#CFA85E]">Membership</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA]">
                  Start with a private conversation
                </h3>
                <p className="text-xs sm:text-sm text-[#9C968A] max-w-2xl font-light leading-relaxed">
                  Membership is by introduction. Tell us how we can help, and we will arrange a time to talk.
                </p>
              </div>
              <button
                onClick={() => openIntroductionModal('Consortium Overview')}
                className="btn-gold px-7 py-3.5 text-xs whitespace-nowrap shrink-0"
              >
                Request an introduction
              </button>
            </motion.div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1B. Dedicated 24/7 Bespoke Concierge Subpage */}
      {/* ========================================================= */}
      {subPage === 'concierge' && <ConsortiumConciergeSection variant="full" />}

      {/* ========================================================= */}
      {/* 2. About TGLC Subpage */}
      {/* ========================================================= */}
      {subPage === 'about' && (
        <div className="space-y-10 sm:space-y-12">
          {/* Cinematic 5-Slide Hero Carousel */}
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <EditorialHeroCarousel
              slides={CONSORTIUM_SUBPAGE_SLIDES.about}
              className="min-h-[400px] sm:min-h-[460px] flex items-end border border-[#242630]"
              sizes="(max-width: 1280px) 100vw, 1280px"
              scrimVariant="bottom-left"
              controlsPosition="bottom-right"
            >
              <motion.div
                initial={{ opacity: 0.01, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="relative z-10 p-6 sm:p-10 pb-16 sm:pb-12 max-w-4xl space-y-3.5"
              >
                <span className="tglc-kicker text-[11px] block tabular-nums">
                  Mayfair, London · 45 Albemarle Street
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
                  About TGLC
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                  “Opening doors that don’t usually exist.”
                </p>
                <p className="tglc-prose text-sm max-w-2xl">
                  We help individuals, families and busy professionals with travel, dining, events, homes and hard-to-find requests.
                </p>
              </motion.div>
            </EditorialHeroCarousel>
          </div>

          {/* Story + Two Photographs */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
            <motion.div {...REVEAL_SECTION} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-5 space-y-4 text-sm sm:text-base text-[#C8C2B7] leading-relaxed font-light">
                <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block">
                  Why We Started
                </span>
                <h2 className="font-serif text-3xl text-[#F4F1EA]">
                  Built around care, not volume.
                </h2>
                <p>
                  TGLC was founded on a simple idea: luxury is about how you’re looked after, not how much you spend.
                </p>
                <p>
                  We work from our third-floor office on Albemarle Street in Mayfair. Every request is handled by real people who take the time to know you.
                </p>

                <div className="pt-2 border-t border-[#1E202B] grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-[#12141A] border border-[#242630]">
                    <span className="font-serif text-xl text-[#CFA85E] tabular-nums block">Mon – Fri</span>
                    <span className="text-[#9C968A]">08:30 – 19:30</span>
                  </div>
                  <div className="p-3 bg-[#12141A] border border-[#242630]">
                    <span className="font-serif text-xl text-[#CFA85E] block">Mayfair</span>
                    <span className="text-[#9C968A]">45 Albemarle Street</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="overflow-hidden border border-[#242630] bg-[#12141A] group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <SmartImage
                      src="/assets/aistudio/tglc_st_james_salon.jpg"
                      alt="Meeting room in Mayfair"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                      className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5 border-t border-[#222530]">
                    <span className="text-[11px] text-[#CFA85E] block uppercase tracking-wider">Mayfair Office</span>
                    <p className="text-xs text-[#9C968A] mt-1 font-light leading-relaxed">
                      A quiet place to sit down, talk through your plans and get to know us.
                    </p>
                  </div>
                </div>
                <div className="overflow-hidden border border-[#242630] bg-[#12141A] group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <SmartImage
                      src="/assets/aistudio/savile_row_bespoke.jpg"
                      alt="London tailoring craftsmanship"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                      className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5 border-t border-[#222530]">
                    <span className="text-[11px] text-[#CFA85E] block uppercase tracking-wider">Personal Approach</span>
                    <p className="text-xs text-[#9C968A] mt-1 font-light leading-relaxed">
                      No two people live the same way, so we shape our work around your routine.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <GoldDivider />

          {/* Team Section */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
            <motion.div {...REVEAL_SECTION} className="border-b border-[#222530] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#CFA85E] font-medium block mb-1.5">
                  Our Team
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
                  The people looking after you
                </h2>
              </div>
              <p className="text-xs text-[#9C968A] max-w-md font-light">
                You speak directly with the people who plan and coordinate your requests.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {TEAM_MEMBERS.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0.9, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`bg-[#12141A] border p-6 flex flex-col justify-between transition-all duration-300 group ${
                    member.image
                      ? 'border-[#CFA85E]/50 hover:border-[#E2BA6B] shadow-[0_4px_24px_-4px_rgba(185,134,51,0.15)]'
                      : 'border-[#242630] hover:border-[#CFA85E]/60'
                  }`}
                >
                  <div>
                    {member.image ? (
                      <div className="aspect-[3/4] w-full overflow-hidden mb-6 bg-[#181A22] border border-[#2A2D38] relative">
                        <SmartImage
                          src={member.image}
                          alt={member.name}
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="w-full h-full object-cover object-top brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14]/80 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#0A0D14]/90 border border-[#E2BA6B]/40 font-mono text-[9px] uppercase tracking-widest text-[#E2BA6B]">
                          {member.role}
                        </span>
                      </div>
                    ) : (
                      <div className="aspect-[3/4] w-full mb-6 bg-gradient-to-br from-[#151922] via-[#0E121A] to-[#080A0F] border border-[#242C3C] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group-hover:border-[#E2BA6B]/50 transition-colors">
                        <div className="w-20 h-20 border border-[#E2BA6B]/55 bg-[#171D2A] flex items-center justify-center mb-4 shadow-[0_0_24px_rgba(226,186,107,0.12)] group-hover:border-[#E2BA6B] transition-colors">
                          <span className="font-serif text-3xl text-[#E2BA6B] font-medium tracking-widest">
                            {member.initials}
                          </span>
                        </div>
                        <span className="font-serif text-lg text-[#FAF7F0] font-light">
                          {member.title}
                        </span>
                      </div>
                    )}

                    <span className="text-[11px] tracking-wider text-[#E2BA6B] font-medium font-mono block mb-1">
                      {member.title}
                    </span>

                    <h3 className="font-serif text-2xl text-[#FAF7F0] mb-1 group-hover:text-[#E2BA6B] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#E2BA6B]/85 italic mb-3">{member.role}</p>
                    <p className="text-xs text-[#D4D8E2] leading-relaxed mb-4 font-light">{member.bio}</p>
                  </div>

                  <div className="pt-3 border-t border-[#20232E] text-xs text-[#FAF7F0] space-y-1">
                    <span className="text-[#E2BA6B] block text-[10px] uppercase tracking-wider font-mono">
                      Focus
                    </span>
                    <p className="text-[#A2ACBD] font-light text-[11px] leading-relaxed">
                      {member.specialism}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Visual Diptych */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div {...REVEAL_SECTION} className="bg-[#12141A] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src="/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg"
                  alt="Mayfair hospitality and dining"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] tracking-widest text-[#CFA85E] uppercase">Relationships</span>
                <h3 className="font-serif text-2xl text-[#F4F1EA]">Built on personal trust</h3>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                  We work directly with people we know across London and abroad so your plans run smoothly.
                </p>
              </div>
            </motion.div>

            <motion.div {...REVEAL_SECTION} className="bg-[#12141A] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src="/assets/aistudio/About-Luxury-Watches_77cb4520.jpg"
                  alt="Fine watches and sourcing"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] tracking-widest text-[#CFA85E] uppercase">Clear Advice</span>
                <h3 className="font-serif text-2xl text-[#F4F1EA]">Always on your side</h3>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                  We give honest recommendations and agree every cost with you before anything is booked.
                </p>
              </div>
            </motion.div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. Our Ethos Subpage */}
      {/* ========================================================= */}
      {subPage === 'ethos' && (
        <div className="space-y-10 sm:space-y-12">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <EditorialHeroCarousel
              slides={CONSORTIUM_SUBPAGE_SLIDES.ethos}
              className="min-h-[390px] sm:min-h-[450px] flex items-end border border-[#242630]"
              sizes="(max-width: 1280px) 100vw, 1280px"
              scrimVariant="bottom-left"
              controlsPosition="bottom-right"
            >
              <motion.div
                initial={{ opacity: 0.01, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="relative z-10 p-6 sm:p-10 pb-16 sm:pb-12 max-w-4xl space-y-3.5"
              >
                <span className="tglc-kicker text-[11px] block">
                  What Guides Us
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
                  Our Ethos
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                  “Simple standards that guide everything we do.”
                </p>
                <p className="tglc-prose text-sm max-w-2xl">
                  We put your interests first. We keep things private, clear and personal.
                </p>
              </motion.div>
            </EditorialHeroCarousel>
          </div>

          {/* Two Editorial Plates */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src="/assets/aistudio/bond_street_jewellery.jpg"
                  alt="Fine jewellery on Bond Street"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] tracking-widest text-[#E2BA6B] uppercase">Honest Guidance</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">Advice you can trust</h3>
                <p className="text-xs sm:text-sm tglc-prose">
                  We recommend places and makers because they are right for you, with clear terms agreed upfront.
                </p>
              </div>
            </motion.div>

            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src="/assets/aistudio/highland_stone_estate_1794391698042.jpg"
                  alt="Country house in the British countryside"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] tracking-widest text-[#E2BA6B] uppercase">Long-Term Care</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">Relationships that last</h3>
                <p className="text-xs sm:text-sm tglc-prose">
                  We learn how you like to travel, dine and host so every plan feels natural over time.
                </p>
              </div>
            </motion.div>
          </section>

          {/* The Five Ethos Principles */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8">
            <Reveal stagger className="space-y-5">
              {ETHOS_PRINCIPLES.map((principle) => (
                <RevealItem
                  key={principle.number}
                  className="p-6 sm:p-8 bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-colors grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                >
                  <div className="lg:col-span-5 space-y-1.5">
                    <span className="font-serif italic text-3xl sm:text-4xl text-[#CFA85E] tabular-nums block">
                      {principle.number}
                    </span>
                    <h3 className="font-serif text-2xl text-[#F4F1EA] leading-snug">
                      {principle.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-7">
                    <p className="font-serif text-lg sm:text-xl text-[#D9D4CA] leading-relaxed">
                      {principle.summary}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </section>

          {/* Ethos in Action Diptych */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div {...REVEAL_SECTION} className="bg-[#12141A] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src="/assets/aistudio/royal_opera_gallery.jpg"
                  alt="Covent Garden theatre architecture"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-1.5">
                <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B]">Culture & Events</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">Respect for every venue</h3>
                <p className="text-xs tglc-prose">
                  We build lasting relationships with hosts and venues through good manners and discretion.
                </p>
              </div>
            </motion.div>

            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src="/assets/aistudio/6a194620490b49214619b628_file_8wpx83o3_8d7f9f53.png"
                  alt="Private aircraft cabin"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-1.5">
                <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B]">Quiet Preparation</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">Details handled ahead of time</h3>
                <p className="text-xs text-[#D4D8E2] tglc-prose">
                  We check the small details before you arrive so your day runs calmly.
                </p>
              </div>
            </motion.div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. Our Approach Subpage */}
      {/* ========================================================= */}
      {subPage === 'approach' && (
        <div className="space-y-10 sm:space-y-12">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <EditorialHeroCarousel
              slides={CONSORTIUM_SUBPAGE_SLIDES.approach}
              className="min-h-[390px] sm:min-h-[450px] flex items-end border border-[#242630]"
              sizes="(max-width: 1280px) 100vw, 1280px"
              scrimVariant="bottom-left"
              controlsPosition="bottom-right"
            >
              <motion.div
                initial={{ opacity: 0.01, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="relative z-10 p-6 sm:p-10 pb-16 sm:pb-12 max-w-4xl space-y-3.5"
              >
                <span className="tglc-kicker text-[11px] block">
                  How We Work
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
                  Our Approach
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                  “Clear, personal and calm from the first call.”
                </p>
                <p className="tglc-prose text-sm max-w-2xl">
                  We start by listening. Once we know what matters to you, we handle the details quietly.
                </p>
              </motion.div>
            </EditorialHeroCarousel>
          </div>

          {/* 4-Step Track */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
            <div className="border-b border-[#222530] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block mb-1">
                  Step by Step
                </span>
                <h2 className="font-serif text-3xl text-[#F4F1EA]">How membership works</h2>
              </div>
              <p className="text-xs text-[#9C968A] max-w-md font-light">
                A straightforward four-step process built around one dedicated point of contact.
              </p>
            </div>

            <Reveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {APPROACH_STEPS.map((item) => (
                <RevealItem
                  key={item.step}
                  className="p-6 bg-[#12141A] border border-[#242630] hover:border-[#CFA85E]/80 transition-colors flex flex-col justify-between relative overflow-hidden group"
                >
                  <div>
                    <span className="font-serif italic text-3xl text-[#CFA85E] tabular-nums block mb-2.5">
                      {item.step}
                    </span>
                    <h3 className="font-serif text-xl text-[#F4F1EA] mb-2.5 leading-snug group-hover:text-[#E2BA6B] transition-colors">
                      <span className="card-title-underline">{item.title}</span>
                    </h3>
                    <p className="text-xs text-[#9C968A] leading-relaxed font-light">{item.description}</p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-[#20232E] text-[10px] text-[#CFA85E] uppercase tracking-widest">
                    Step {item.step}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#E2BA6B] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </RevealItem>
              ))}
            </Reveal>

            {/* Two Visual Chapters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src="/assets/aistudio/mayfair_fine_dining.jpg"
                    alt="Mayfair dining room"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] tracking-widest text-[#E2BA6B] uppercase">Personal First</span>
                  <h3 className="font-serif text-2xl text-[#FAF7F0]">A real conversation first</h3>
                  <p className="text-xs sm:text-sm tglc-prose">
                    We start by talking through your plans so we understand your taste and what matters most.
                  </p>
                </div>
              </motion.div>

              <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src="/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png"
                    alt="Private aircraft travel"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] tracking-widest text-[#CFA85E] uppercase">Joined-Up Planning</span>
                  <h3 className="font-serif text-2xl text-[#F4F1EA]">Travel, stays and cars aligned</h3>
                  <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                    We line up flights, transfers and check-in together so every stage connects cleanly.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Second Visual Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-[#12141A] border border-[#242630] overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src="/assets/aistudio/rolls-royce-cullinan-chauffeur-service-events_d3e6e421.webp"
                    alt="Chauffeur car in London"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B]">On Time</span>
                  <h4 className="font-serif text-xl text-[#FAF7F0]">Calm arrivals and departures</h4>
                  <p className="text-xs tglc-prose">
                    Drivers and schedules are confirmed ahead of time so you are never kept waiting.
                  </p>
                </div>
              </div>

              <div className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src="/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg"
                    alt="London apartment interior"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B]">Ready Before You Arrive</span>
                  <h4 className="font-serif text-xl text-[#FAF7F0]">Homes kept ready for your stay</h4>
                  <p className="text-xs tglc-prose">
                    We remember your preferences so your home or suite is prepared before you step through the door.
                  </p>
                </div>
              </div>
            </div>

            {/* Clean Introduction CTA Card */}
            <motion.div
              {...REVEAL_SECTION}
              className="bg-[#0D1017] border border-[#2A2D38] grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
            >
              <div className="lg:col-span-4 min-h-[220px] bg-black overflow-hidden group">
                <SmartImage
                  src="/assets/aistudio/tglc_st_james_salon.jpg"
                  alt="TGLC consultation room in Mayfair"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="lg:col-span-8 p-7 sm:p-9 space-y-3 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-widest text-[#E2BA6B]">Get Started</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
                  Tell us what you need
                </h3>
                <p className="text-xs sm:text-sm tglc-prose text-[#D4D8E2]">
                  We can meet at our Mayfair office or speak by phone. Everything stays private from your first message.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => openIntroductionModal('Our Approach Enquiry')}
                    className="btn-gold px-7 py-3 text-xs"
                  >
                    Request an introduction
                  </button>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. Our Network Subpage */}
      {/* ========================================================= */}
      {subPage === 'network' && (
        <div className="space-y-10 sm:space-y-12">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <EditorialHeroCarousel
              slides={CONSORTIUM_SUBPAGE_SLIDES.network}
              className="min-h-[390px] sm:min-h-[450px] flex items-end border border-[#242630]"
              sizes="(max-width: 1280px) 100vw, 1280px"
              scrimVariant="bottom-left"
              controlsPosition="bottom-right"
            >
              <motion.div
                initial={{ opacity: 0.01, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="relative z-10 p-6 sm:p-10 pb-16 sm:pb-12 max-w-4xl space-y-3.5"
              >
                <span className="tglc-kicker text-[11px] block">
                  London & Worldwide
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
                  Our network.
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                  “Trusted people in London and around the world.”
                </p>
                <p className="tglc-prose text-sm max-w-2xl">
                  We work with trusted hotels, venues, makers and specialists in London and around the world. We choose partners for quality and discretion.
                </p>
              </motion.div>
            </EditorialHeroCarousel>
          </div>

          {/* Two Pictorial Highlights */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src="/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg"
                  alt="Harbour yachts at twilight"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] tracking-widest text-[#E2BA6B] uppercase">Travel & Maritime</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">Trusted travel specialists</h3>
                <p className="text-xs sm:text-sm tglc-prose">
                  We work with licensed aviation, maritime and ground transport providers chosen for safety and care.
                </p>
              </div>
            </motion.div>

            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src="/assets/aistudio/royal_opera_gallery.jpg"
                  alt="London cultural venue"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] tracking-widest text-[#CFA85E] uppercase">Hospitality & Culture</span>
                <h3 className="font-serif text-2xl text-[#F4F1EA]">Hotels, dining and arts</h3>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                  We arrange dining, stays, tickets and private appointments across leading cultural cities, subject to availability.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Regional Imagery Triptych */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-5">
            <div className="border-b border-[#222530] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] block mb-1">Global Reach</span>
                <h2 className="font-serif text-3xl text-[#F4F1EA]">Where we help</h2>
              </div>
              <p className="text-xs text-[#9C968A] max-w-md font-light">
                Every trip links back to your Mayfair team, so you only deal with one point of contact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  img: '/assets/aistudio/five_star_mayfair_suite.jpg',
                  region: 'United Kingdom',
                  title: 'London & the Countryside',
                  text: 'Hotels, dining, events, homes and travel across London and the UK.',
                },
                {
                  img: '/assets/aistudio/9a35e56e-8aec-463b-a39b-a06bbfb6ad06_ac512cac.jpg',
                  region: 'Europe',
                  title: 'Cities, Coast & Alps',
                  text: 'Support for stays, dining and travel across Europe’s capitals, resorts and ski towns.',
                },
                {
                  img: '/assets/aistudio/imagereader_3bfec03a.webp',
                  region: 'Worldwide',
                  title: 'North America & Asia',
                  text: 'Coordinated itineraries and local contacts when business or family takes you further afield.',
                },
              ].map((cor, idx) => (
                <motion.div
                  key={cor.title}
                  initial={{ opacity: 0.9, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  whileHover={{ y: -3 }}
                  className="bg-[#12141A] border border-[#242630] hover:border-[#CFA85E]/70 transition-colors overflow-hidden group relative"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <SmartImage
                      src={cor.img}
                      alt={cor.title}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 space-y-1.5">
                    <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B]">{cor.region}</span>
                    <h4 className="font-serif text-xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors">
                      <span className="card-title-underline">{cor.title}</span>
                    </h4>
                    <p className="text-xs text-[#D4D8E2] tglc-prose">{cor.text}</p>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#E2BA6B] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </motion.div>
              ))}
            </div>

            {/* Clean Cities Grid */}
            <div className="bg-[#0D1017] border border-[#242630] p-6 sm:p-8 space-y-5 mt-6">
              <div className="border-b border-[#20232E] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <span className="tglc-kicker text-[11px] block mb-1">Key Cities</span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
                    Cities we regularly arrange
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#E2BA6B]">All coordinated from Mayfair</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {NETWORK_CITIES.map((city, dIdx) => (
                  <motion.div
                    key={city}
                    initial={{ opacity: 0.9, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.01 }}
                    transition={{ duration: 0.4, delay: dIdx * 0.04 }}
                    whileHover={{ y: -2 }}
                    className="p-5 bg-[#12151E] border border-[#222633] hover:border-[#CFA85E]/70 transition-colors relative overflow-hidden group"
                  >
                    <span className="font-serif text-xl text-[#FAF7F0] block group-hover:text-[#E2BA6B] transition-colors">
                      {city}
                    </span>
                    <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#E2BA6B] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. Our London & Interactive Map Subpage */}
      {/* ========================================================= */}
      {subPage === 'our-london' && (
        <div className="space-y-10 sm:space-y-12">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <EditorialHeroCarousel
              slides={CONSORTIUM_SUBPAGE_SLIDES['our-london']}
              className="min-h-[390px] sm:min-h-[450px] flex items-end border border-[#242630]"
              sizes="(max-width: 1280px) 100vw, 1280px"
              scrimVariant="bottom-left"
              controlsPosition="bottom-right"
            >
              <motion.div
                initial={{ opacity: 0.01, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="relative z-10 p-6 sm:p-10 pb-16 sm:pb-12 max-w-4xl space-y-3.5"
              >
                <span className="tglc-kicker text-[11px] block">
                  London Neighbourhoods
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
                  Our London
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                  “The neighbourhoods we know best.”
                </p>
                <p className="tglc-prose text-sm max-w-2xl">
                  We are based in Mayfair and work across central London every day. Explore the areas below.
                </p>
              </motion.div>
            </EditorialHeroCarousel>
          </div>

          {/* Interactive Map Section */}
          <ConsortiumLocationsMap />

          {/* Two London Vignettes */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src="/assets/aistudio/liberty-department-store-640x360_44860915.jpg"
                  alt="Historic Regent Street architecture in London"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B]">Regent Street & Soho</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">Shopping and dining in the West End</h3>
                <p className="text-xs sm:text-sm tglc-prose">
                  We help you plan personal shopping, dining and theatre evenings across central London.
                </p>
              </div>
            </motion.div>

            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src="/assets/aistudio/01-Lethbridge-House-20-Cornwall-Terrace-Marylebone-London-UK-640x360_b59e806c.jpg"
                  alt="Regency terrace near Regent's Park in Marylebone"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] uppercase tracking-widest text-[#CFA85E]">Marylebone & Regent’s Park</span>
                <h3 className="font-serif text-2xl text-[#F4F1EA]">Quiet terraces and village streets</h3>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                  Leafy streets, independent shops and calm residential squares a short walk from Mayfair.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Neighbourhood Profiles */}
          <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
            <motion.div {...REVEAL_SECTION} className="border-b border-[#222530] pb-5">
              <span className="text-xs uppercase tracking-[0.2em] text-[#CFA85E] font-medium block mb-1.5">
                London Areas
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
                Neighbourhoods we know well
              </h2>
              <p className="text-xs sm:text-sm text-[#9C968A] mt-2 max-w-2xl font-light leading-relaxed">
                Select an area below to see how we can help during your time in London.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-3">
                {LONDON_NEIGHBOURHOODS.map((area, idx) => (
                  <button
                    key={area.name}
                    onClick={() => setSelectedLondonArea(idx)}
                    className={`w-full text-left p-5 border transition-all ${
                      selectedLondonArea === idx
                        ? 'bg-[#181A22] border-[#CFA85E] text-[#F4F1EA] shadow-lg'
                        : 'bg-[#12141A] border-[#242630] text-[#9C968A] hover:border-[#8B672B] hover:text-[#F4F1EA]'
                    }`}
                  >
                    <span className="text-[11px] uppercase tracking-wider text-[#CFA85E] block mb-1">
                      {area.vibe}
                    </span>
                    <h3 className="font-serif text-xl text-[#F4F1EA]">{area.name}</h3>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-7 bg-[#12141A] border border-[#242630] p-6 sm:p-8">
                {(() => {
                  const active = LONDON_NEIGHBOURHOODS[selectedLondonArea];
                  return (
                    <motion.div
                      key={active.name}
                      initial={{ opacity: 0.85, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28 }}
                      className="space-y-6"
                    >
                      <div className="aspect-[16/9] w-full overflow-hidden bg-[#181A22] border border-[#242630]">
                        <SmartImage
                          src={active.image}
                          alt={active.name}
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="w-full h-full object-cover brightness-105 contrast-105"
                        />
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-widest text-[#E2BA6B]">{active.vibe}</span>
                        <h2 className="font-serif text-3xl text-[#FAF7F0] mt-1 mb-2.5">{active.name}</h2>
                        <p className="tglc-prose text-sm">{active.summary}</p>
                      </div>

                      <div className="border-t border-[#222530] pt-5 space-y-3">
                        <h4 className="text-xs uppercase tracking-widest text-[#E2BA6B]">
                          How we can help here
                        </h4>
                        <ul className="space-y-2.5">
                          {active.highlights.map((h, i) => (
                            <li key={i} className="text-xs sm:text-sm text-[#D4D8E2] flex items-start gap-2.5 font-light">
                              <span className="w-1.5 h-1.5 bg-[#E2BA6B] rotate-45 mt-2 shrink-0" />
                              <span className="leading-relaxed">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-5 border-t border-[#222530] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <button
                          onClick={() => openIntroductionModal(`Enquiry about ${active.name}`)}
                          className="btn-gold px-7 py-3 text-xs inline-flex items-center gap-1.5"
                        >
                          <span>Request an introduction</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href="#consortium-locations"
                          className="text-xs text-[#E2BA6B] hover:text-[#FAF7F0] flex items-center gap-1.5 transition-colors"
                        >
                          <span>View on map</span>
                          <Compass className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. Privacy & Discretion Subpage */}
      {/* ========================================================= */}
      {subPage === 'privacy' && (
        <div className="space-y-10 sm:space-y-12">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <EditorialHeroCarousel
              slides={CONSORTIUM_SUBPAGE_SLIDES.privacy}
              className="min-h-[390px] sm:min-h-[450px] flex items-end border border-[#242630]"
              sizes="(max-width: 1280px) 100vw, 1280px"
              scrimVariant="bottom-left"
              controlsPosition="bottom-right"
            >
              <motion.div
                initial={{ opacity: 0.01, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="relative z-10 p-6 sm:p-10 pb-16 sm:pb-12 max-w-4xl space-y-3.5"
              >
                <span className="tglc-kicker text-[11px] block">
                  Privacy & Discretion
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
                  Your privacy, protected.
                </h1>
                <p className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
                  “Discretion comes first in everything we do.”
                </p>
                <p className="tglc-prose text-sm max-w-2xl">
                  We keep your plans and personal details private. You stay in control of what is shared.
                </p>
              </motion.div>
            </EditorialHeroCarousel>
          </div>

          {/* Four Clear Privacy Commitments */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRIVACY_COMMITMENTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0.9, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  whileHover={{ y: -2 }}
                  className="p-7 bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-colors space-y-3"
                >
                  <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-[#E2BA6B]">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="font-serif text-xl sm:text-2xl text-[#FAF7F0] leading-snug">{item.line}</p>
                </motion.div>
              );
            })}
          </section>

          {/* Two Editorial Plates */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src="/assets/aistudio/01-Neo-Bankside-Luxury-Penthouse-London-England-UK-640x360_c8f27abb.jpg"
                  alt="Private residence in London"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] tracking-widest text-[#E2BA6B] uppercase">Quiet Handling</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0]">Private by default</h3>
                <p className="text-xs sm:text-sm tglc-prose">
                  We keep your details between you and the people arranging your plans.
                </p>
              </div>
            </motion.div>

            <motion.div {...REVEAL_SECTION} className="bg-[#0D1017] border border-[#242630] overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src="/assets/aistudio/tglc_st_james_salon.jpg"
                  alt="Meeting room at 45 Albemarle Street"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] tracking-widest text-[#CFA85E] uppercase">Mayfair Office</span>
                <h3 className="font-serif text-2xl text-[#F4F1EA]">Private conversations</h3>
                <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                  Meet us in person at 45 Albemarle Street or speak with us by phone whenever you prefer.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Direct Inquiry CTA */}
          <section className="max-w-5xl mx-auto px-5 sm:px-8">
            <motion.div
              {...REVEAL_SECTION}
              className="p-8 sm:p-10 bg-[#12141A] border border-[#2A2D38] flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="w-16 h-16 bg-[#08090C] border border-[#8B672B] flex items-center justify-center shrink-0 text-[#CFA85E]">
                <Shield className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs uppercase tracking-widest text-[#E2BA6B]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Private Enquiry</span>
                </div>
                <p className="text-sm text-[#D4D8E2] font-light leading-relaxed">
                  Have a question about how we handle your information? Speak with us in confidence.
                </p>
              </div>
              <button
                onClick={() => openIntroductionModal('Privacy & Discretion')}
                className="btn-outline-gold px-6 py-3 text-xs whitespace-nowrap shrink-0"
              >
                Request an introduction
              </button>
            </motion.div>
          </section>
        </div>
      )}
    </div>
  );
};
