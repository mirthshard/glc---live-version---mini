import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { SERVICES_DATA, TGLC_CONTACT } from '../../data/tglcData';
import { PageRoute } from '../../types';
import { Link } from './Link';
import { SmartImage } from './SmartImage';
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Lock,
  Search,
  ChevronRight,
  Phone,
  MapPin,
  Compass,
  Globe,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SUPPORTED_LANGUAGES, LANGUAGE_MAP } from '../../data/translations';
import { getImageManifest } from '../../utils/imageManifest';
import { resolveThumbnailUrl } from '../../utils/smartImage';

type MegaMenuType = 'none' | 'consortium' | 'services' | 'hidden-london';

const MENU_IMAGE_MANIFEST = getImageManifest();
const preloadedMenuUrls = new Set<string>();

function preloadMenuThumbnails(srcs: readonly string[], maxWidth = 480): void {
  if (typeof window === 'undefined') return;
  for (const src of srcs) {
    const thumbUrl = resolveThumbnailUrl(src, MENU_IMAGE_MANIFEST, maxWidth);
    if (!thumbUrl || preloadedMenuUrls.has(thumbUrl)) continue;
    preloadedMenuUrls.add(thumbUrl);
    const img = new window.Image();
    img.decoding = 'async';
    img.src = thumbUrl;
  }
}

const SERVICE_SHORT_DESC: Record<string, string> = {
  'travel-aviation': 'Flights, stays and global travel.',
  'dining-nightlife': 'Tables, private rooms and clubs.',
  'experiences-culture': 'Art, sport, events and access.',
  'residences-relocation': 'Homes, estates and UK moves.',
  'transport-security': 'Chauffeurs, transfers and quiet protection.',
  'personal-private-office': 'Everyday life and executive support.',
  'luxury-sourcing': 'Tailoring, watches, jewellery and gifts.',
};

const CONSORTIUM_PILLARS = [
  {
    page: 'consortium',
    kicker: 'Overview',
    label: 'Consortium Overview',
    image: '/assets/aistudio/consortium_overview_head.jpg',
    focalTop: false,
    desc: 'Who we are and how we work.',
    actionLabel: 'Explore →',
  },
  {
    page: 'consortium-concierge',
    kicker: '24/7 Desk',
    label: 'Bespoke Concierge',
    image: '/assets/aistudio/private_jet_interior_suite.jpg',
    focalTop: false,
    desc: '24/7 bespoke services for ultra-high-net-worth individuals.',
    actionLabel: 'Explore →',
  },
  {
    page: 'about',
    kicker: 'Team',
    label: 'About TGLC',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-11_at_21.17.07_2194679c.jpeg',
    focalTop: true,
    desc: 'Meet the people behind TGLC.',
    actionLabel: 'Meet the team →',
  },
  {
    page: 'ethos',
    kicker: 'Values',
    label: 'Our Ethos',
    image: '/assets/aistudio/consortium_ethos_sanctuary.jpg',
    focalTop: false,
    desc: 'Five principles guiding everything we do.',
    actionLabel: 'Read more →',
  },
  {
    page: 'approach',
    kicker: 'Process',
    label: 'Our Approach',
    image: '/assets/aistudio/consortium_approach_board.jpg',
    focalTop: false,
    desc: 'Four simple steps to get started.',
    actionLabel: 'See how it works →',
  },
  {
    page: 'network',
    kicker: 'Global',
    label: 'Our Network',
    image: '/assets/aistudio/consortium_network_global.jpg',
    focalTop: false,
    desc: 'Trusted relationships across major cities.',
    actionLabel: 'Explore →',
  },
  {
    page: 'our-london',
    kicker: 'London',
    label: 'Our London',
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
    focalTop: false,
    desc: 'The London neighbourhoods we know best.',
    actionLabel: 'View map →',
  },
  {
    page: 'privacy-discretion',
    kicker: 'Privacy',
    label: 'Privacy & Discretion',
    image: '/assets/aistudio/consortium_privacy_vault.jpg',
    focalTop: false,
    desc: 'How we protect your personal information.',
    actionLabel: 'Read more →',
  },
  {
    page: 'cultural-traditions',
    kicker: 'Traditions',
    label: 'Cultural & Islamic Hospitality',
    image: '/assets/aistudio/cultural_iftar_mayfair_salon.jpg',
    focalTop: false,
    desc: 'Halal dining, Ramadan, family privacy & all world cultures.',
    actionLabel: 'Explore →',
  },
] as const;

const SUB_ROSA_SECTORS = [
  {
    page: 'hidden-london-subterranean',
    sector: '01',
    title: 'Subterranean Sanctums',
    mobileTitle: '1. Subterranean Sanctums',
    image: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg',
    desc: 'Historic vaults, stone cellars and quiet underground rooms.',
    highlight: false,
  },
  {
    page: 'hidden-london-industrial',
    sector: '02',
    title: 'Architecture & Design Spaces',
    mobileTitle: '2. Architecture & Design Spaces',
    image: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg',
    desc: 'Modernist flats, gallery lofts and private studios.',
    highlight: false,
  },
  {
    page: 'hidden-london-combat',
    sector: '03',
    title: 'Fight Nights',
    mobileTitle: '3. Fight Nights',
    image: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
    desc: 'Ringside arena seats and private coaching sessions.',
    highlight: false,
  },
  {
    page: 'hidden-london-gaming',
    sector: '04',
    title: 'Casino Nights',
    mobileTitle: '4. Casino Nights',
    image: '/assets/aistudio/meard_poker_sanctum.jpg',
    desc: 'Private rooms at licensed Mayfair and Soho casinos.',
    highlight: false,
  },
  {
    page: 'hidden-london-maritime',
    sector: '05',
    title: 'Thames After Dark',
    mobileTitle: '5. Thames After Dark',
    image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
    desc: 'Private evening boat cruises and riverside dining.',
    highlight: false,
  },
  {
    page: 'hidden-london-gastronomy',
    sector: '06',
    title: 'Supper Clubs & Late-Night Dining',
    mobileTitle: '6. Supper Clubs & Late-Night Dining',
    image: '/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg',
    desc: 'Intimate chef counters and hidden cocktail bars.',
    highlight: false,
  },
  {
    page: 'hidden-london-exploration',
    sector: '07',
    title: 'Rooftops & Rare Views',
    mobileTitle: '7. Rooftops & Rare Views',
    image: '/assets/aistudio/down_street_station_1794391687146.jpg',
    desc: 'Private skyline terraces and licensed landmark visits.',
    highlight: false,
  },
  {
    page: 'hidden-london-after-hours',
    sector: '08',
    title: 'Jazz & Cocktail Bars',
    mobileTitle: '8. Jazz & Cocktail Bars',
    image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
    desc: 'Late-night live music and candlelit Soho cellars.',
    highlight: false,
  },
  {
    page: 'hidden-london-urban-clubs',
    sector: '09',
    title: 'Urban DJ & Hip-Hop Sanctums',
    mobileTitle: '9. Urban DJ & Hip-Hop Sanctums',
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    desc: 'Vinyl listening bars, loft parties and DJ rooms.',
    highlight: false,
  },
  {
    page: 'hidden-london-itinerary',
    sector: '10',
    title: '24 Hours in London',
    mobileTitle: '10. 24 Hours in London',
    image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
    desc: 'A full day and night built around your tastes.',
    highlight: true,
  },
] as const;

export const Header: React.FC = () => {
  const { route, openIntroductionModal, openSearch, language, setLanguage, t } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaMenuType>('none');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [mobileConsortiumExpanded, setMobileConsortiumExpanded] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const [mobileHiddenLondonExpanded, setMobileHiddenLondonExpanded] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const currentLang = LANGUAGE_MAP[language] ?? LANGUAGE_MAP.en;

  // Idle-preload compact WebP thumbnails for all mega-menus so dropdowns open instantaneously
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const allMenuSrcs = [
      ...CONSORTIUM_PILLARS.map((p) => p.image),
      ...SERVICES_DATA.map((s) => s.heroImage),
      ...SUB_ROSA_SECTORS.map((s) => s.image),
    ];

    const runPreload = () => preloadMenuThumbnails(allMenuSrcs, 480);
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof w.requestIdleCallback === 'function') {
      const idleId = w.requestIdleCallback(runPreload, { timeout: 1500 });
      return () => w.cancelIdleCallback?.(idleId);
    }

    const timer = window.setTimeout(runPreload, 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 25);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMega('none');
        setIsLangMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMega('none');
        setIsLangMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isCurrent = (p: string) => {
    if (p === 'consortium' && ['consortium', 'consortium-concierge', 'about', 'ethos', 'approach', 'network', 'our-london', 'privacy-discretion', 'cultural-traditions'].includes(route.page)) return true;
    if (p === 'services' && ['services', 'service-detail', 'subservice-detail'].includes(route.page)) return true;
    if (
      p === 'hidden-london' &&
      [
        'hidden-london',
        'hidden-london-subterranean',
        'hidden-london-industrial',
        'hidden-london-combat',
        'hidden-london-gaming',
        'hidden-london-maritime',
        'hidden-london-gastronomy',
        'hidden-london-exploration',
        'hidden-london-after-hours',
        'hidden-london-urban-clubs',
        'hidden-london-itinerary',
      ].includes(route.page)
    )
      return true;
    if (p === 'journal' && ['journal', 'journal-article'].includes(route.page)) return true;
    return route.page === p;
  };

  const closeAll = () => {
    setActiveMega('none');
    setIsLangMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -8, opacity: 0.92 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onMouseLeave={() => setActiveMega('none')}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || activeMega !== 'none'
            ? 'bg-[#08090C]/95 backdrop-blur-md border-b border-[#242632] py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#08090C]/90 via-[#08090C]/60 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-2 xl:gap-4">
            {/* Zone 1: TGLC Crest & Single-Line Wordmark */}
            <Link
              page="home"
              onClick={closeAll}
              className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B98633] group shrink-0"
              aria-label="The Global Luxury Consortium Home"
            >
              <div className="w-8 h-10 sm:w-9 sm:h-11 flex items-center justify-center shrink-0">
                <SmartImage
                  src="/assets/aistudio/tglc_crest_transparent.png"
                  alt="The Global Luxury Consortium crest"
                  sizes="40px"
                  priority
                  className="w-full h-full object-contain filter brightness-105 contrast-105 drop-shadow-[0_2px_10px_rgba(185,134,51,0.35)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="hidden 2xl:inline font-serif text-base font-normal tracking-[0.12em] uppercase text-[#F4F1EA] group-hover:text-[#CFA85E] transition-colors whitespace-nowrap">
                The Global Luxury Consortium
              </span>
              <span className="2xl:hidden font-serif text-base tracking-[0.18em] uppercase text-[#F4F1EA] group-hover:text-[#CFA85E] transition-colors whitespace-nowrap">
                TGLC
              </span>
            </Link>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden xl:flex items-center gap-2.5 2xl:gap-4 text-[12px] font-medium text-[#D9D4CA]">
              <Link
                page="consortium"
                onClick={(e) => {
                  if (
                    !e.metaKey &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    !e.altKey &&
                    e.button === 0 &&
                    activeMega !== 'consortium'
                  ) {
                    e.preventDefault();
                    setIsLangMenuOpen(false);
                    setActiveMega('consortium');
                  } else {
                    closeAll();
                  }
                }}
                onMouseEnter={() => {
                  preloadMenuThumbnails(CONSORTIUM_PILLARS.map((p) => p.image), 480);
                  setIsLangMenuOpen(false);
                  setActiveMega('consortium');
                }}
                className={`relative flex items-center gap-1 py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isCurrent('consortium') || activeMega === 'consortium'
                    ? 'text-[#CFA85E]'
                    : 'text-[#D9D4CA]'
                }`}
              >
                <span>{t('nav.consortium')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMega === 'consortium' ? 'rotate-180 text-[#CFA85E]' : ''}`} />
                {(isCurrent('consortium') || activeMega === 'consortium') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </Link>

              <Link
                page="services"
                onClick={(e) => {
                  if (
                    !e.metaKey &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    !e.altKey &&
                    e.button === 0 &&
                    activeMega !== 'services'
                  ) {
                    e.preventDefault();
                    setIsLangMenuOpen(false);
                    setActiveMega('services');
                  } else {
                    closeAll();
                  }
                }}
                onMouseEnter={() => {
                  preloadMenuThumbnails(SERVICES_DATA.map((s) => s.heroImage), 480);
                  setIsLangMenuOpen(false);
                  setActiveMega('services');
                }}
                className={`relative flex items-center gap-1 py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isCurrent('services') || activeMega === 'services'
                    ? 'text-[#CFA85E]'
                    : 'text-[#D9D4CA]'
                }`}
              >
                <span>{t('nav.services')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMega === 'services' ? 'rotate-180 text-[#CFA85E]' : ''}`} />
                {(isCurrent('services') || activeMega === 'services') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </Link>

              <Link
                page="hidden-london"
                onClick={(e) => {
                  if (
                    !e.metaKey &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    !e.altKey &&
                    e.button === 0 &&
                    activeMega !== 'hidden-london'
                  ) {
                    e.preventDefault();
                    setIsLangMenuOpen(false);
                    setActiveMega('hidden-london');
                  } else {
                    closeAll();
                  }
                }}
                onMouseEnter={() => {
                  preloadMenuThumbnails(SUB_ROSA_SECTORS.map((s) => s.image), 480);
                  setIsLangMenuOpen(false);
                  setActiveMega('hidden-london');
                }}
                className={`relative flex items-center gap-1 py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isCurrent('hidden-london') || activeMega === 'hidden-london'
                    ? 'text-[#CFA85E]'
                    : 'text-[#DDB872]'
                }`}
              >
                <span>{t('nav.hiddenLondon')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMega === 'hidden-london' ? 'rotate-180 text-[#CFA85E]' : ''}`} />
                {(isCurrent('hidden-london') || activeMega === 'hidden-london') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </Link>

              <Link
                page="commission-studio"
                onClick={closeAll}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 hover:text-white ${
                  isCurrent('commission-studio') ? 'text-[#E2BA6B]' : 'text-[#D4D8E2]'
                }`}
              >
                <Compass className="w-3 h-3 text-[#C4933F]" />
                <span>{t('nav.commissionStudio')}</span>
                {isCurrent('commission-studio') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </Link>

              <Link
                page="case-studies"
                onClick={closeAll}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isCurrent('case-studies') ? 'text-[#CFA85E]' : 'text-[#D9D4CA]'
                }`}
              >
                {t('nav.signatureExperiences')}
                {isCurrent('case-studies') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </Link>

              <Link
                page="membership"
                onClick={closeAll}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isCurrent('membership') ? 'text-[#E2BA6B]' : 'text-[#D9D4CA]'
                }`}
              >
                {t('nav.join')}
                {isCurrent('membership') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </Link>

              <Link
                page="calendar"
                onClick={closeAll}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isCurrent('calendar') ? 'text-white' : 'text-[#D9D4CA]'
                }`}
              >
                {t('nav.calendar')}
                {isCurrent('calendar') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </Link>

              <Link
                page="journal"
                onClick={closeAll}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isCurrent('journal') ? 'text-white' : 'text-[#D9D4CA]'
                }`}
              >
                {t('nav.journal')}
                {isCurrent('journal') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </Link>

              <Link
                page="member-portal"
                onClick={closeAll}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 hover:text-white ${
                  isCurrent('member-portal') ? 'text-[#CFA85E]' : 'text-[#9C968A]'
                }`}
              >
                <Lock className="w-3 h-3 text-[#C4933F]" />
                <span>{t('nav.members')}</span>
                {isCurrent('member-portal') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </Link>
            </nav>

            {/* Zone 3: Language Switcher, Search & Primary CTA */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Multi-Language Switcher */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setActiveMega('none');
                    setIsLangMenuOpen((prev) => !prev);
                  }}
                  aria-label={`${t('nav.language')}: ${currentLang.nativeName}`}
                  aria-expanded={isLangMenuOpen}
                  aria-haspopup="listbox"
                  className={`min-h-[40px] px-2 sm:px-2.5 flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider border transition-colors cursor-pointer whitespace-nowrap ${
                    isLangMenuOpen
                      ? 'border-[#CFA85E] bg-[#131722] text-[#E2BA6B]'
                      : 'border-[#242632] bg-[#0D1017]/80 text-[#D9D4CA] hover:border-[#8B672B] hover:text-[#E2BA6B]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-[#CFA85E] shrink-0" />
                  <span data-no-translate="true">{currentLang.shortCode}</span>
                  <ChevronDown
                    className={`w-3 h-3 text-[#8F98AA] transition-transform duration-200 ${
                      isLangMenuOpen ? 'rotate-180 text-[#CFA85E]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      role="listbox"
                      aria-label={t('nav.language')}
                      className="absolute end-0 mt-2 w-[310px] sm:w-[440px] max-h-[75vh] overflow-y-auto bg-[#0B0C10]/98 border border-[#2A2D38] shadow-2xl backdrop-blur-xl p-2.5 z-[60]"
                    >
                      <div className="px-2.5 py-1.5 mb-1.5 border-b border-[#1E212E] flex items-center justify-between sticky top-0 bg-[#0B0C10]/98 z-10">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E]">
                          {t('nav.language')}
                        </span>
                        <span data-no-translate="true" className="font-mono text-[10px] text-[#8F98AA] tabular-nums">
                          {SUPPORTED_LANGUAGES.length}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1" data-no-translate="true">
                        {SUPPORTED_LANGUAGES.map((opt) => {
                          const selected = opt.code === language;
                          return (
                            <button
                              key={opt.code}
                              type="button"
                              role="option"
                              aria-selected={selected}
                              onClick={() => {
                                setLanguage(opt.code);
                                setIsLangMenuOpen(false);
                              }}
                              className={`min-h-[38px] px-2.5 py-1.5 text-start flex items-center justify-between gap-2 transition-colors cursor-pointer border ${
                                selected
                                  ? 'bg-[#161923] border-[#CFA85E]/80 text-[#F2D8A0]'
                                  : 'bg-transparent border-transparent hover:bg-[#131722] hover:border-[#252836] text-[#D4D8E2]'
                              }`}
                            >
                              <span className="flex flex-col min-w-0">
                                <span className="text-xs font-medium truncate leading-snug">
                                  {opt.nativeName}
                                </span>
                                <span className="font-mono text-[9px] uppercase tracking-wider text-[#8F98AA] truncate">
                                  {opt.englishName}
                                </span>
                              </span>
                              {selected ? (
                                <Check className="w-3.5 h-3.5 text-[#E2BA6B] shrink-0" />
                              ) : (
                                <span className="font-mono text-[10px] text-[#6E768A] shrink-0">
                                  {opt.shortCode}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={openSearch}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center gap-1.5 px-2 text-xs text-[#D9D4CA] hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8B672B] border border-transparent hover:border-[#242632] cursor-pointer"
                aria-label="Search services, articles, and calendar"
              >
                <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#C4933F]" />
                <span className="hidden 2xl:inline text-[11px] text-[#9C968A]">{t('nav.search')}</span>
              </button>

              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => openIntroductionModal('General enquiry')}
                className="btn-gold min-h-[40px] px-3 sm:px-3.5 py-2 text-[11px] whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span className="hidden sm:inline">{t('cta.requestIntroduction')}</span>
                <span className="sm:hidden">{t('cta.enquire')}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#08090C]" />
              </motion.button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-[#F4F1EA] hover:text-[#CFA85E] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B98633] transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6 text-[#CFA85E]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================================
            MEGA MENUS (AnimatePresence smooth reveal)
            ===================================================================== */}
        <AnimatePresence>
          {activeMega === 'consortium' && (
            <motion.div
              key="mega-consortium"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="hidden xl:block absolute top-full left-0 right-0 bg-[#0B0C10]/98 border-b border-[#242632] shadow-2xl py-8 px-6 sm:px-12 backdrop-blur-2xl"
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#1E202B]">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#C4933F] font-medium">
                      {t('nav.aboutTglc')}
                    </span>
                    <h3 className="font-serif text-2xl text-[#F2D8A0] mt-0.5">
                      The Global Luxury Consortium
                    </h3>
                  </div>
                  <Link
                    page="consortium"
                    onClick={closeAll}
                    className="text-xs text-[#CFA85E] hover:text-white flex items-center gap-1.5 font-medium transition-colors"
                  >
                    <span>{t('nav.exploreOverview')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Top 4 Visual Consortium Cards (Instant Preloaded WebP Thumbnails) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {CONSORTIUM_PILLARS.slice(0, 4).map((pillar, idx) => (
                    <motion.div
                      key={pillar.page}
                      initial={{ opacity: 0.85, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: idx * 0.025, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full"
                    >
                      <Link
                        page={pillar.page as PageRoute}
                        onClick={closeAll}
                        className="group cursor-pointer p-4 bg-[#12141C] hover:bg-[#171A24] border border-[#222430] hover:border-[#B98633]/60 transition-all duration-200 flex flex-col justify-between h-full"
                      >
                        <div>
                          <div className="aspect-[16/9] w-full overflow-hidden mb-3 bg-[#181A22]">
                            <SmartImage
                              src={pillar.image}
                              alt={`${pillar.label} — ${pillar.kicker}`}
                              sizes="280px"
                              maxWidth={480}
                              priority
                              className={`w-full h-full object-cover ${
                                pillar.focalTop ? 'object-top' : 'object-center'
                              } group-hover:scale-104 transition-transform duration-700 filter brightness-105 contrast-105`}
                            />
                          </div>
                          <span className="text-[10px] tracking-wider text-[#C4933F]">{pillar.kicker}</span>
                          <h4 className="font-serif text-base text-[#F2D8A0] group-hover:text-[#FFE7B3] mt-1 mb-1 flex items-center justify-between gap-2 transition-colors">
                            <span className="card-title-underline">{pillar.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#CFA85E]" />
                          </h4>
                          <p className="text-xs text-[#B4BCCB] line-clamp-2 leading-relaxed font-light">{pillar.desc}</p>
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-[#1E202B] text-[11px] text-[#C4933F] font-medium">
                          {pillar.actionLabel}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom 5 Visual Consortium Cards (Balanced 4 + 5 Two-Row Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
                  {CONSORTIUM_PILLARS.slice(4).map((pillar, idx) => (
                    <motion.div
                      key={pillar.page}
                      initial={{ opacity: 0.85, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: 0.08 + idx * 0.025, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full"
                    >
                      <Link
                        page={pillar.page as PageRoute}
                        onClick={closeAll}
                        className="group cursor-pointer p-4 bg-[#12141C] hover:bg-[#171A24] border border-[#222430] hover:border-[#B98633]/60 transition-all duration-200 flex flex-col justify-between h-full"
                      >
                        <div>
                          <div className="aspect-[16/9] w-full overflow-hidden mb-3 bg-[#181A22]">
                            <SmartImage
                              src={pillar.image}
                              alt={`${pillar.label} — ${pillar.kicker}`}
                              sizes="280px"
                              maxWidth={480}
                              priority
                              className={`w-full h-full object-cover ${
                                pillar.focalTop ? 'object-top' : 'object-center'
                              } group-hover:scale-104 transition-transform duration-700 filter brightness-105 contrast-105`}
                            />
                          </div>
                          <span className="text-[10px] tracking-wider text-[#C4933F]">{pillar.kicker}</span>
                          <h4 className="font-serif text-base text-[#F2D8A0] group-hover:text-[#FFE7B3] mt-1 mb-1 flex items-center justify-between gap-2 transition-colors">
                            <span className="card-title-underline">{pillar.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#CFA85E]" />
                          </h4>
                          <p className="text-xs text-[#B4BCCB] line-clamp-2 leading-relaxed font-light">{pillar.desc}</p>
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-[#1E202B] text-[11px] text-[#C4933F] font-medium">
                          {pillar.actionLabel}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Compact Team & Mayfair Direct Strip */}
                <div className="mt-5 pt-4 border-t border-[#1E202B] flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8A83]">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[#CFA85E] font-medium">Team:</span>
                    <span className="text-[#D9D4CA]">Mickell Washington · Leance Djedje · Melize Nastaasia</span>
                    <span aria-hidden="true" className="text-[#4A4E5E]">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C4933F]" />
                      <span>3rd Floor, 45 Albemarle Street, W1S 4JL</span>
                    </span>
                    <span aria-hidden="true" className="text-[#4A4E5E]">·</span>
                    <span className="inline-flex items-center gap-1 tabular-nums text-[#D9D4CA]">
                      <Phone className="w-3 h-3 text-[#C4933F]" />
                      <span>{TGLC_CONTACT.telephone}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => { openIntroductionModal('General enquiry'); closeAll(); }}
                    className="text-xs text-[#DDB872] hover:text-white flex items-center gap-1 font-medium transition-colors shrink-0 cursor-pointer"
                  >
                    <span>{t('cta.requestIntroduction')} →</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeMega === 'services' && (
            <motion.div
              key="mega-services"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="hidden xl:block absolute top-full left-0 right-0 bg-[#0B0C10]/98 border-b border-[#242632] shadow-2xl py-8 px-6 sm:px-12 backdrop-blur-2xl"
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#1E202B]">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#C4933F] font-medium">{t('nav.services')}</span>
                    <h3 className="font-serif text-2xl text-[#F2D8A0] mt-0.5">{t('nav.whatWeHandle')}</h3>
                  </div>
                  <Link
                    page="services"
                    onClick={closeAll}
                    className="text-xs text-[#CFA85E] hover:text-white flex items-center gap-1.5 font-medium transition-colors"
                  >
                    <span>{t('nav.exploreAllServices')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {SERVICES_DATA.slice(0, 4).map((cat, idx) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0.85, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: idx * 0.025, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full"
                    >
                      <Link
                        page="service-detail"
                        params={{ serviceId: cat.id }}
                        onClick={closeAll}
                        className="group cursor-pointer p-4 bg-[#12141C] hover:bg-[#171A24] border border-[#222430] hover:border-[#B98633]/60 transition-all duration-200 flex flex-col justify-between h-full"
                      >
                        <div>
                          <div className="aspect-[16/9] w-full overflow-hidden mb-3 bg-[#181A22]">
                            <SmartImage
                              src={cat.heroImage}
                              alt={cat.title}
                              sizes="280px"
                              maxWidth={480}
                              priority
                              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 filter brightness-105 contrast-105"
                            />
                          </div>
                          <h4 className="font-serif text-base text-[#F2D8A0] group-hover:text-[#FFE7B3] mt-1 mb-1 flex items-center justify-between transition-colors">
                            <span className="card-title-underline">{cat.title}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#CFA85E]" />
                          </h4>
                          <p className="text-xs text-[#B4BCCB] line-clamp-2 leading-relaxed font-light">
                            {SERVICE_SHORT_DESC[cat.id] || cat.title}
                          </p>
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-[#1E202B] text-[11px] text-[#C4933F] font-medium">
                          {t('nav.explore')} →
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {SERVICES_DATA.slice(4).map((cat, idx) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0.85, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: 0.08 + idx * 0.025, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full"
                    >
                      <Link
                        page="service-detail"
                        params={{ serviceId: cat.id }}
                        onClick={closeAll}
                        className="group cursor-pointer p-4 bg-[#12141C] hover:bg-[#171A24] border border-[#222430] hover:border-[#B98633]/60 transition-all duration-200 flex flex-col justify-between h-full"
                      >
                        <div>
                          <div className="aspect-[21/9] w-full overflow-hidden mb-2.5 bg-[#181A22]">
                            <SmartImage
                              src={cat.heroImage}
                              alt={cat.title}
                              sizes="320px"
                              maxWidth={480}
                              priority
                              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 filter brightness-105 contrast-105"
                            />
                          </div>
                          <h4 className="font-serif text-base text-[#F2D8A0] group-hover:text-[#FFE7B3] mt-1 mb-1 flex items-center justify-between transition-colors">
                            <span className="card-title-underline">{cat.title}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#CFA85E]" />
                          </h4>
                          <p className="text-xs text-[#B4BCCB] line-clamp-2 leading-relaxed font-light">
                            {SERVICE_SHORT_DESC[cat.id] || cat.title}
                          </p>
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-[#1E202B] text-[11px] text-[#C4933F] font-medium">
                          {t('nav.explore')} →
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeMega === 'hidden-london' && (
            <motion.div
              key="mega-hidden-london"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="hidden xl:block absolute top-full left-0 right-0 bg-[#0A0C10]/98 border-b border-[#242632] shadow-2xl py-8 px-6 sm:px-12 backdrop-blur-2xl"
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#1E202B]">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#C4933F] font-medium block">
                      {t('nav.hiddenLondonKicker')}
                    </span>
                    <h3 className="font-serif text-2xl text-[#F2D8A0] mt-0.5">
                      {t('nav.hiddenLondon')}
                    </h3>
                  </div>
                  <Link
                    page="hidden-london"
                    onClick={closeAll}
                    className="text-xs text-[#CFA85E] hover:text-white flex items-center gap-1.5 font-medium transition-colors"
                  >
                    <span>{t('nav.exploreHiddenLondon')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 max-h-[62vh] overflow-y-auto pr-1">
                  {SUB_ROSA_SECTORS.map((sec, idx) => (
                    <motion.div
                      key={sec.page}
                      initial={{ opacity: 0.85, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: idx * 0.02, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full"
                    >
                      <Link
                        page={sec.page as PageRoute}
                        onClick={closeAll}
                        className={`group cursor-pointer p-4 border transition-all duration-200 flex flex-col justify-between h-full ${
                          sec.highlight
                            ? 'bg-[#151218] hover:bg-[#1E1A22] border-[#8B672B] hover:border-[#CFA85E]'
                            : 'bg-[#11131B] hover:bg-[#171A24] border-[#222532] hover:border-[#B98633]/60'
                        }`}
                      >
                        <div>
                          <div className="aspect-[16/10] w-full overflow-hidden mb-3 bg-[#181A22]">
                            <SmartImage
                              src={sec.image}
                              alt={sec.title}
                              sizes="240px"
                              maxWidth={480}
                              priority
                              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 filter brightness-105 contrast-105"
                            />
                          </div>
                          <span className="text-[10px] tracking-wider text-[#CFA85E]">{sec.sector}</span>
                          <h4 className="font-serif text-base text-[#F2D8A0] group-hover:text-[#FFE7B3] mt-1 mb-1.5 transition-colors">
                            <span className="card-title-underline">{sec.title}</span>
                          </h4>
                          <p className="text-[11px] text-[#B4BCCB] line-clamp-2 leading-relaxed font-light">{sec.desc}</p>
                        </div>
                        <div className="mt-4 pt-2.5 border-t border-[#1E202B] text-[11px] text-[#CFA85E] font-medium flex items-center justify-between">
                          <span>{t('nav.explore')}</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#1E202B] flex flex-wrap items-center justify-between text-xs text-[#8E8A83]">
                  <span>
                    {t('footer.mayfairOffice')}:{' '}
                    <span className="text-[#CFA85E] font-medium tabular-nums">{TGLC_CONTACT.telephone}</span>
                  </span>
                  <button
                    onClick={() => { openIntroductionModal('Hidden London enquiry'); closeAll(); }}
                    className="text-xs text-[#DDB872] hover:text-white flex items-center gap-1 font-medium transition-colors cursor-pointer"
                  >
                    <span>{t('cta.requestIntroduction')} →</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* =====================================================================
          MOBILE FULL-VIEWPORT NAVIGATION DRAWER
          ===================================================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden fixed inset-0 z-[100] bg-[#08090C] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#20222C] bg-[#0D0F15]">
              <div className="flex items-center gap-3">
                <SmartImage
                  src="/assets/aistudio/tglc_crest_transparent.png"
                  alt="The Global Luxury Consortium crest"
                  sizes="32px"
                  className="w-8 h-10 object-contain filter brightness-105"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-base tracking-[0.16em] text-[#F4F1EA]">The Global Luxury Consortium</span>
                  <span className="text-[10px] text-[#C4933F]">Mayfair · London W1S 4JL</span>
                </div>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#D9D4CA] hover:text-[#CFA85E] focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openSearch();
                }}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-[#12141C] border border-[#242632] text-[#9C968A] hover:text-white transition-colors text-xs"
              >
                <span className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-[#CFA85E]" />
                  <span>{t('nav.searchPlaceholder')}</span>
                </span>
                <kbd className="text-[10px] text-[#8E8A83] border border-[#242632] px-1.5 py-0.5">⌘K</kbd>
              </button>

              {/* Mobile Language Selector Grid (Top 20 Languages) */}
              <div className="p-3.5 bg-[#0D1017] border border-[#222532] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{t('nav.language')}</span>
                  </span>
                  <span data-no-translate="true" className="font-mono text-[10px] text-[#8F98AA]">
                    {currentLang.nativeName} · {SUPPORTED_LANGUAGES.length}
                  </span>
                </div>
                <div data-no-translate="true" className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-h-[196px] overflow-y-auto pr-0.5">
                  {SUPPORTED_LANGUAGES.map((opt) => {
                    const selected = opt.code === language;
                    return (
                      <button
                        key={opt.code}
                        type="button"
                        onClick={() => setLanguage(opt.code)}
                        className={`min-h-[36px] px-2.5 py-1.5 text-xs border transition-colors text-center cursor-pointer truncate ${
                          selected
                            ? 'bg-[#161923] border-[#CFA85E] text-[#F2D8A0] font-medium'
                            : 'bg-[#08090C] border-[#20232E] text-[#B4BCCB] hover:border-[#8B672B]'
                        }`}
                      >
                        {opt.nativeName}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  page="member-portal"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-2 text-xs text-[#F4F1EA] border border-[#282B36] bg-[#12141C] flex items-center justify-center gap-2 font-medium"
                >
                  <Lock className="w-3.5 h-3.5 text-[#CFA85E]" />
                  <span>{t('nav.members')}</span>
                </Link>
                <button
                  onClick={() => { openIntroductionModal(); setIsMobileMenuOpen(false); }}
                  className="btn-gold py-3 px-2 text-xs flex items-center justify-center gap-1.5"
                >
                  <span>{t('cta.introduction')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#08090C]" />
                </button>
              </div>

              <div className="space-y-1 divide-y divide-[#1A1C24] pt-2">
                <Link
                  page="home"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-start py-3 min-h-[44px] text-sm font-medium text-[#F4F1EA] hover:text-[#CFA85E] transition-colors flex items-center justify-between"
                >
                  <span>{t('nav.home')}</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </Link>

                {/* Consortium Accordion */}
                <div className="py-1">
                  <button
                    onClick={() => setMobileConsortiumExpanded(!mobileConsortiumExpanded)}
                    className="w-full text-start py-2.5 min-h-[44px] text-sm font-medium text-[#F4F1EA] flex items-center justify-between"
                  >
                    <span>{t('nav.consortium')}</span>
                    <ChevronDown className={`w-4 h-4 text-[#888] transition-transform ${mobileConsortiumExpanded ? 'rotate-180 text-[#CFA85E]' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileConsortiumExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="ps-4 py-1.5 space-y-0.5 mt-1 overflow-hidden"
                      >
                        {CONSORTIUM_PILLARS.map((item) => (
                          <Link
                            key={item.page}
                            page={item.page as PageRoute}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center min-h-[44px] text-sm font-serif text-[#D9D4CA] hover:text-[#CFA85E] py-2 text-start w-full"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Services Accordion */}
                <div className="py-1">
                  <button
                    onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                    className="w-full text-start py-2.5 min-h-[44px] text-sm font-medium text-[#F4F1EA] flex items-center justify-between"
                  >
                    <span>{t('nav.services')}</span>
                    <ChevronDown className={`w-4 h-4 text-[#888] transition-transform ${mobileServicesExpanded ? 'rotate-180 text-[#CFA85E]' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileServicesExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="ps-4 py-1.5 space-y-0.5 mt-1 overflow-hidden"
                      >
                        <Link
                          page="services"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center min-h-[44px] text-sm font-serif text-[#CFA85E] py-2 font-medium text-start w-full"
                        >
                          {t('nav.allServices')}
                        </Link>
                        {SERVICES_DATA.map((s) => (
                          <Link
                            key={s.id}
                            page="service-detail"
                            params={{ serviceId: s.id }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center min-h-[44px] text-sm font-serif text-[#D9D4CA] hover:text-white py-2 text-start w-full"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hidden London Accordion */}
                <div className="py-1">
                  <button
                    onClick={() => setMobileHiddenLondonExpanded(!mobileHiddenLondonExpanded)}
                    className="w-full text-start py-2.5 min-h-[44px] text-sm font-medium text-[#DDB872] flex items-center justify-between"
                  >
                    <span>{t('nav.hiddenLondon')}</span>
                    <ChevronDown className={`w-4 h-4 text-[#CFA85E] transition-transform ${mobileHiddenLondonExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileHiddenLondonExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="ps-4 py-1.5 space-y-0.5 mt-1 overflow-hidden bg-[#12141C]/60"
                      >
                        <Link
                          page="hidden-london"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center min-h-[44px] text-sm font-serif text-[#CFA85E] py-2 font-medium text-start w-full"
                        >
                          {t('nav.hiddenLondonKicker')}
                        </Link>
                        {SUB_ROSA_SECTORS.map((sec) => (
                          <Link
                            key={sec.page}
                            page={sec.page as PageRoute}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center min-h-[44px] text-sm font-serif text-[#D9D4CA] hover:text-[#CFA85E] py-2 text-start w-full"
                          >
                            {sec.mobileTitle}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  page="commission-studio"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-start py-3 min-h-[44px] text-sm font-medium text-[#CFA85E] hover:text-white transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#C4933F]" />
                    <span>{t('nav.commissionStudio')}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#CFA85E]" />
                </Link>

                <Link
                  page="case-studies"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-start py-3 min-h-[44px] text-sm font-medium text-[#F4F1EA] hover:text-[#CFA85E] transition-colors flex items-center justify-between"
                >
                  <span>{t('nav.signatureExperiences')}</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </Link>

                <Link
                  page="membership"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-start py-3 min-h-[44px] text-sm font-medium text-[#F4F1EA] hover:text-[#CFA85E] transition-colors flex items-center justify-between"
                >
                  <span>{t('nav.join')}</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </Link>

                <Link
                  page="calendar"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-start py-3 min-h-[44px] text-sm font-medium text-[#F4F1EA] hover:text-[#CFA85E] transition-colors flex items-center justify-between"
                >
                  <span>{t('nav.londonCalendar')}</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </Link>

                <Link
                  page="journal"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-start py-3 min-h-[44px] text-sm font-medium text-[#F4F1EA] hover:text-[#CFA85E] transition-colors flex items-center justify-between"
                >
                  <span>{t('nav.journal')}</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </Link>

                <Link
                  page="faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-start py-3 min-h-[44px] text-sm font-medium text-[#F4F1EA] hover:text-[#CFA85E] transition-colors flex items-center justify-between"
                >
                  <span>{t('nav.faq')}</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </Link>

                <Link
                  page="contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-start py-3 min-h-[44px] text-sm font-medium text-[#F4F1EA] hover:text-[#CFA85E] transition-colors flex items-center justify-between"
                >
                  <span>{t('nav.contact')}</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </Link>
              </div>

              <div className="pt-4 border-t border-[#1E202B] text-xs text-[#8E8A83] space-y-1.5">
                <p className="font-serif text-[#F2D8A0] text-sm">{t('footer.mayfairOffice')}</p>
                <p>{TGLC_CONTACT.address.toString()}</p>
                <p className="text-[#CFA85E] pt-1 text-sm font-medium tabular-nums">
                  {TGLC_CONTACT.telephone}
                </p>
                <p className="text-[#9C968A]">{TGLC_CONTACT.email}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
