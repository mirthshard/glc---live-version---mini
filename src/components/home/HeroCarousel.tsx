import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Link } from '../common/Link';
import { SmartImage } from '../common/SmartImage';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getImageManifest } from '../../utils/imageManifest';
import { resolveSmartImage } from '../../utils/smartImage';

const HERO_MANIFEST = getImageManifest();

interface Slide {
  id: number;
  image: string;
  alt: string;
  tag: string;
  headline: string;
  supporting: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
    alt: 'Black Rolls-Royce Cullinan arriving in Mayfair, London',
    tag: 'Mayfair, London',
    headline: 'Opening doors that don’t usually exist.',
    supporting: 'A private Mayfair concierge desk for people who value their time, their privacy and the quiet comfort of things simply working.',
  },
  {
    id: 2,
    image: '/assets/aistudio/savile_row_bespoke.jpg',
    alt: 'Tailor fitting a bespoke suit on Savile Row',
    tag: 'Savile Row',
    headline: 'Unhurried fittings, trusted makers.',
    supporting: 'Personal introductions to London’s finest tailors, cutters and craftspeople — arranged quietly around your diary.',
  },
  {
    id: 3,
    image: '/assets/aistudio/bond_street_jewellery.jpg',
    alt: 'Fine jewellery display inside a Bond Street salon',
    tag: 'Bond Street',
    headline: 'Private viewing rooms, never the crowds.',
    supporting: 'Closed-door salon appointments, rare timepieces and personal shopping prepared before you step inside.',
  },
  {
    id: 4,
    image: '/assets/aistudio/mayfair_fine_dining.jpg',
    alt: 'Candlelit fine dining room in Mayfair, London',
    tag: 'Mayfair & St James’s',
    headline: 'The right table, for the right company.',
    supporting: 'Sought-after dining rooms, tucked-away private vaults and members’ club introductions shaped around your evening.',
  },
  {
    id: 5,
    image: '/assets/aistudio/private_jet_interior_suite.jpg',
    alt: 'Quiet private jet cabin prepared for international travel',
    tag: 'Global Travel',
    headline: 'Every mile handled from one conversation.',
    supporting: 'Private aviation, flagship suites, villas and waiting chauffeurs coordinated together so you travel without friction.',
  },
  {
    id: 6,
    image: '/assets/aistudio/cotswolds_manor_estate.jpg',
    alt: 'Stone manor house surrounded by English countryside gardens',
    tag: 'Homes & Escapes',
    headline: 'London townhouses and quiet country weekends.',
    supporting: 'Your residences kept ready before you arrive, and unhurried countryside stays prepared down to the last detail.',
  },
  {
    id: 7,
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    alt: 'Late-night London music room with warm lighting',
    tag: 'Hidden London',
    headline: 'London after dark, quietly curated.',
    supporting: 'Intimate music rooms, candlelit cellars and late tables — with your driver waiting outside whenever you are ready.',
  },
];

export const HeroCarousel: React.FC = () => {
  const { openIntroductionModal, language, t } = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasAdvanced, setHasAdvanced] = useState(false);

  // Immediately present the localized hero slide when the user switches language
  useEffect(() => {
    setCurrentSlide(0);
  }, [language]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setHasAdvanced(true);
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Quietly warm the upcoming slide after mount so slide transitions have zero wait
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const upcoming = HERO_SLIDES[(currentSlide + 1) % HERO_SLIDES.length];
    if (!upcoming) return;
    const timer = window.setTimeout(() => {
      const resolved = resolveSmartImage(upcoming.image, HERO_MANIFEST);
      const preloadImg = new window.Image();
      preloadImg.decoding = 'async';
      preloadImg.src = resolved.src;
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [currentSlide]);

  const slide = HERO_SLIDES[currentSlide];
  const displayTag = slide.id === 1 ? t('hero.tag1') : slide.tag;
  const displayHeadline = slide.id === 1 ? t('hero.headline1') : slide.headline;
  const displaySupporting = slide.id === 1 ? t('hero.supporting1') : slide.supporting;
  const nextIndex = (currentSlide + 1) % HERO_SLIDES.length;
  const nextSlide = HERO_SLIDES[nextIndex];

  return (
    <div
      className="relative w-full h-[94vh] min-h-[660px] max-h-[1080px] bg-[#08090C] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with smooth 8s Ken Burns on active slide (never blanks between slides) */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <SmartImage
              src={slide.image}
              alt={slide.alt}
              sizes="100vw"
              priority={currentSlide === 0 && !hasAdvanced}
              className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
            />
          </motion.div>
          {/* Balanced bright-friendly scrim so photography shines on mobile & desktop */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/35 to-[#07080B]/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/80 via-[#07080B]/25 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Preload only the upcoming slide lazily so off-screen slides wait until needed */}
      {hasAdvanced && nextSlide && (
        <div className="sr-only pointer-events-none" aria-hidden="true">
          <SmartImage
            src={nextSlide.image}
            alt=""
            sizes="100vw"
            priority={false}
            className="w-px h-px"
          />
        </div>
      )}

      {/* Top-End Medallion Crest Plaque (mirrors cleanly in RTL) */}
      <motion.div
        initial={{ opacity: 0.92, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="absolute top-24 end-8 sm:end-14 z-10 pointer-events-none hidden lg:flex flex-col items-center gap-2"
      >
        <div className="w-24 h-28 bg-black/90 backdrop-blur-sm border border-[#E2BA6B]/45 p-3 shadow-2xl flex items-center justify-center">
          <SmartImage
            src="/assets/aistudio/tglc_crest_transparent.png"
            alt="The Global Luxury Consortium crest"
            sizes="96px"
            className="w-full h-full object-contain block"
          />
        </div>
      </motion.div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-end pb-14 sm:pb-20">
        <motion.div
          key={`marker-${slide.id}-${language}`}
          initial={{ opacity: 0.88, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 flex flex-wrap items-center gap-3 text-xs text-[#E2BA6B]"
        >
          <span className="w-8 h-[1.5px] bg-[#E2BA6B]" />
          <span className="tglc-kicker" dir="auto">{displayTag}</span>
        </motion.div>

        <motion.h1
          key={`headline-${slide.id}-${language}`}
          dir="auto"
          initial={{ opacity: 0.9, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-normal text-[#FFFDF7] tracking-tight leading-[1.08] max-w-4xl text-balance"
        >
          {displayHeadline}
        </motion.h1>

        <motion.p
          key={`support-${slide.id}-${language}`}
          dir="auto"
          initial={{ opacity: 0.9, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-6 font-sans text-base sm:text-lg text-[#C2C9D6] max-w-2xl font-normal leading-relaxed"
        >
          {displaySupporting}
        </motion.p>

        {/* Action Controls & Slide Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-between gap-6 pt-5 border-t border-white/15"
        >
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <button
              type="button"
              onClick={() => openIntroductionModal('General enquiry')}
              className="btn-gold px-6 sm:px-7 py-3.5 text-xs flex items-center gap-2.5 group cursor-pointer"
            >
              <span>{t('cta.requestIntroduction')}</span>
              <ArrowUpRight className="w-4 h-4 text-[#08090C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <Link
              page="services"
              className="btn-outline-gold px-6 py-3.5 text-xs bg-[#0B0C10]/75 backdrop-blur-md"
            >
              {t('cta.exploreServices')}
            </Link>
          </div>

          <div className="flex items-center gap-5 sm:gap-7 text-xs text-[#D4D8E2]">
            <div className="hidden md:flex items-center gap-2">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-[3px] transition-all duration-500 cursor-pointer ${
                    idx === currentSlide
                      ? 'w-8 bg-[#E2BA6B]'
                      : 'w-2.5 bg-[#4A4E5E] hover:bg-[#8B672B]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div dir="ltr" className="flex items-center gap-2 font-mono tracking-widest text-xs tabular-nums">
              <span className="text-[#E2BA6B] font-semibold">{String(currentSlide + 1).padStart(2, '0')}</span>
              <span className="text-[#5C6476]">/</span>
              <span className="text-[#8F98AA]">{String(HERO_SLIDES.length).padStart(2, '0')}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                className="p-2.5 border border-[#8B672B]/60 hover:border-[#CFA85E] bg-[#0B0C10]/80 text-[#D9D4CA] hover:text-[#CFA85E] transition-all cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                className="p-2.5 border border-[#8B672B]/60 hover:border-[#CFA85E] bg-[#0B0C10]/80 text-[#D9D4CA] hover:text-[#CFA85E] transition-all cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
