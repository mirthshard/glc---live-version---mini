import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { searchTGLC } from '../../utils/searchEngine';
import { SearchCategoryType, GlobalSearchResult } from '../../types';
import { TGLC_CONTACT } from '../../data/tglcData';
import { Link } from '../common/Link';
import { SmartImage } from '../common/SmartImage';
import {
  Search,
  X,
  ArrowUpRight,
  Compass,
  Calendar,
  BookOpen,
  Building2,
  CornerDownLeft,
  Send,
  Ticket,
  Car,
  Bed,
  Plane,
  Phone,
  Shield,
  Key,
  Keyboard,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const HighlightMatch: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  const tokens = useMemo(
    () =>
      query
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter((t) => t.length >= 2),
    [query]
  );

  if (tokens.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${tokens.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, idx) =>
        tokens.some((t) => part.toLowerCase() === t) ? (
          <mark
            key={idx}
            className="bg-[#B98633]/30 text-[#FAF7F0] underline decoration-[#B98633] underline-offset-2 px-0.5 rounded-none"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, navigateTo, openIntroductionModal } = useNavigation();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategoryType>('all');
  const [titleOnlyFilter, setTitleOnlyFilter] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setCategory('all');
      setTitleOnlyFilter(false);
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 70);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Real-time search evaluation + optional real-time title precision filtering
  const rawAllResults = useMemo(() => searchTGLC(query, 'all'), [query]);

  const applyRealTimeFilters = (items: GlobalSearchResult[]): GlobalSearchResult[] => {
    const trimmed = query.trim().toLowerCase();
    if (!titleOnlyFilter || !trimmed) return items;
    const tokens = trimmed.split(/\s+/).filter(Boolean);
    return items.filter((item) => {
      const hay = `${item.title} ${item.categoryLabel}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  };

  const filteredAllResults = useMemo(
    () => applyRealTimeFilters(rawAllResults),
    [rawAllResults, query, titleOnlyFilter]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<SearchCategoryType, number> = {
      all: filteredAllResults.length,
      services: 0,
      journal: 0,
      calendar: 0,
      consortium: 0,
    };
    for (const item of filteredAllResults) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, [filteredAllResults]);

  const results = useMemo(() => {
    if (category === 'all') return filteredAllResults;
    return applyRealTimeFilters(searchTGLC(query, category));
  }, [query, category, filteredAllResults, titleOnlyFilter]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results, category, titleOnlyFilter]);

  const activeResult = results[selectedIndex] ?? null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeSearch();
      return;
    }

    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSelectedIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSelectedIndex(results.length - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (selected) {
        navigateTo(selected.targetRoute, selected.routeParams);
      }
    }
  };

  useEffect(() => {
    if (!resultsContainerRef.current) return;
    const activeEl = resultsContainerRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const getCategoryIcon = (cat: GlobalSearchResult['category']) => {
    switch (cat) {
      case 'services':
        return <Compass className="w-4 h-4 text-[#E2BA6B]" />;
      case 'journal':
        return <BookOpen className="w-4 h-4 text-[#E2BA6B]" />;
      case 'calendar':
        return <Calendar className="w-4 h-4 text-[#E2BA6B]" />;
      case 'consortium':
      default:
        return <Building2 className="w-4 h-4 text-[#E2BA6B]" />;
    }
  };

  const getFolioVisual = (result: GlobalSearchResult | null): string => {
    if (!result) return '/assets/aistudio/consortium_overview_head.jpg';
    if (result.category === 'calendar') return '/assets/aistudio/wembley_vip_hospitality.jpg';
    if (result.category === 'journal') return '/assets/aistudio/journal_editorial_brief.jpg';
    if (result.category === 'consortium') return '/assets/aistudio/tglc_st_james_salon.jpg';
    const lower = result.title.toLowerCase();
    if (lower.includes('aviation') || lower.includes('jet')) {
      return '/assets/aistudio/private_jet_interior_suite.jpg';
    }
    if (lower.includes('chauffeur') || lower.includes('transport')) {
      return '/assets/aistudio/images_6534f5fb.jpg';
    }
    if (lower.includes('residence') || lower.includes('suite') || lower.includes('hotel')) {
      return '/assets/aistudio/five_star_mayfair_suite.jpg';
    }
    if (lower.includes('dining') || lower.includes('club')) {
      return '/assets/aistudio/mayfair_fine_dining.jpg';
    }
    return '/assets/aistudio/consortium_overview_head.jpg';
  };

  const HOUSE_MANDATES = [
    { label: 'VIP Ticketing & Boxes', icon: <Ticket className="w-3.5 h-3.5 text-[#E2BA6B]" />, query: 'VIP ticketing' },
    { label: 'Luxury Suites & Estates', icon: <Bed className="w-3.5 h-3.5 text-[#E2BA6B]" />, query: 'hotel suite' },
    { label: 'Executive Chauffeurs', icon: <Car className="w-3.5 h-3.5 text-[#E2BA6B]" />, query: 'chauffeur' },
    { label: 'Private Aviation', icon: <Plane className="w-3.5 h-3.5 text-[#E2BA6B]" />, query: 'private aviation' },
    { label: 'Hidden London', icon: <Key className="w-3.5 h-3.5 text-[#E2BA6B]" />, query: 'hidden london' },
  ];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          role="dialog"
          aria-modal="true"
          aria-label="Mayfair House Directory & Search"
          className="fixed inset-0 z-50 bg-[#050609]/92 backdrop-blur-md flex items-start justify-center pt-4 sm:pt-8 px-3 sm:px-6 overflow-y-auto pb-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeSearch();
          }}
          onKeyDown={handleKeyDown}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-6xl bg-[#0B0E15] border border-[#B98633]/85 ring-1 ring-[#B98633]/35 shadow-[0_0_52px_rgba(185,134,51,0.24),0_0_18px_rgba(185,134,51,0.16),0_26px_80px_rgba(0,0,0,0.9)] text-[#FAF7F0] flex flex-col max-h-[92vh] relative overflow-hidden"
          >
            {/* Top Header */}
            <div className="px-4 sm:px-6 py-3.5 bg-[#121622] border-b border-[#2A3142] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <SmartImage
                  src="/assets/aistudio/tglc_crest_transparent.png"
                  alt="The Global Luxury Consortium crest"
                  sizes="20px"
                  className="w-5 h-7 object-contain brightness-110 shrink-0"
                />
                <div className="min-w-0">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#E2BA6B] block font-semibold truncate">
                    TGLC Mayfair Index · Real-Time Directory Search
                  </span>
                  <span className="text-xs sm:text-sm text-[#D0D7E5] font-serif italic block truncate">
                    Opening doors that don’t usually exist · 45 Albemarle Street, W1S 4JL
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={closeSearch}
                className="min-h-[44px] px-3.5 flex items-center justify-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#D0D7E5] hover:text-[#FAF7F0] bg-[#181D2B] border border-[#2F374A] hover:border-[#B98633] transition-colors shrink-0"
                aria-label="Close search directory"
              >
                <span className="hidden sm:inline">Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Real-Time Search Input Bar */}
            <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-[#262D3E] bg-[#0E121C]">
              <Search className="w-5 h-5 text-[#B98633] shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to filter live across practices, journal essays, and London fixtures..."
                aria-label="Real-time search across TGLC practices, journal essays, and calendar"
                className="w-full bg-transparent font-serif text-lg sm:text-2xl text-[#FAF7F0] placeholder-[#94A3B8] focus:outline-none min-h-[42px]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setTitleOnlyFilter(false);
                    inputRef.current?.focus();
                  }}
                  className="min-h-[44px] px-3 flex items-center justify-center gap-1 text-xs font-mono uppercase tracking-wider text-[#D0D7E5] hover:text-[#FAF7F0] bg-[#181D2B] border border-[#2C3344] hover:border-[#B98633] transition-colors shrink-0"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Quick Topics + Real-Time Match Scope Toggle */}
            <div className="px-4 sm:px-6 py-2.5 bg-[#090C13] border-b border-[#202636] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 overflow-x-auto pb-0.5 max-w-full">
                <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#CBD5E1] mr-1 shrink-0">
                  Quick Topics:
                </span>
                {HOUSE_MANDATES.map((qm) => {
                  const isActive = query.trim().toLowerCase() === qm.query.toLowerCase();
                  return (
                    <button
                      key={qm.label}
                      type="button"
                      onClick={() => {
                        setQuery(qm.query);
                        setCategory('all');
                      }}
                      className={`min-h-[40px] px-3.5 py-1.5 border text-xs transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-[#1D2333] border-[#B98633] text-[#FAF7F0] font-medium'
                          : 'bg-[#131824] hover:bg-[#1A2030] border-[#2C3448] hover:border-[#B98633] text-[#E2E8F0]'
                      }`}
                    >
                      {qm.icon}
                      <span>{qm.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setTitleOnlyFilter((prev) => !prev)}
                aria-pressed={titleOnlyFilter}
                className={`min-h-[40px] px-3.5 py-1.5 border text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  titleOnlyFilter
                    ? 'bg-[#1D2333] border-[#B98633] text-[#E2BA6B]'
                    : 'bg-[#111520] border-[#283044] text-[#CBD5E1] hover:border-[#B98633]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#E2BA6B]" />
                <span>{titleOnlyFilter ? 'Filtering: Titles Only' : 'Filtering: Full Index'}</span>
              </button>
            </div>

            {/* Real-Time Category Filter Rail with Live Match Counts */}
            <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 border-b border-[#202636] bg-[#10141F] overflow-x-auto text-xs font-mono">
              {[
                { id: 'all', label: 'All Results' },
                { id: 'services', label: 'Practices' },
                { id: 'journal', label: 'Journal' },
                { id: 'calendar', label: 'Calendar' },
                { id: 'consortium', label: 'Consortium' },
              ].map((tab) => {
                const tabId = tab.id as SearchCategoryType;
                const count = categoryCounts[tabId] || 0;
                const active = category === tabId;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCategory(tabId)}
                    className={`min-h-[40px] px-3.5 py-1.5 whitespace-nowrap shrink-0 transition-colors border-b-2 text-xs uppercase tracking-wider flex items-center gap-2 ${
                      active
                        ? 'text-[#E2BA6B] border-[#B98633] font-semibold bg-[#161B2A]'
                        : 'text-[#B5C0D2] border-transparent hover:text-[#FAF7F0] hover:bg-[#141825]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="tabular-nums text-[11px] opacity-90">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Main Split View: Large Readable Cards Left + Desktop Folio Inspector Right */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0">
              {/* Left Index */}
              <div
                ref={resultsContainerRef}
                className="lg:col-span-7 overflow-y-auto max-h-[52vh] lg:max-h-[55vh] bg-[#090C13]"
              >
                <div className="sticky top-0 z-10 px-4 sm:px-6 py-2.5 bg-[#121723] text-xs font-mono tracking-wider uppercase text-[#E2BA6B] font-medium flex items-center justify-between border-b border-[#22293A] tabular-nums">
                  <span>
                    {query.trim()
                      ? `Live Results · ${results.length} matching “${query.trim()}”`
                      : `Featured TGLC Directory · ${results.length} Entries`}
                  </span>
                  <span className="text-[#CBD5E1] normal-case tracking-normal text-xs font-sans hidden sm:inline">
                    Arrow keys or hover to highlight · Enter to open
                  </span>
                </div>

                {results.length > 0 ? (
                  <div className="p-3.5 sm:p-5 space-y-3.5">
                    {results.map((result, idx) => {
                      const isSelected = idx === selectedIndex;
                      const isEvenRow = idx % 2 === 0;
                      return (
                        <Link
                          key={result.id}
                          page={result.targetRoute}
                          params={result.routeParams}
                          data-index={idx}
                          onClick={closeSearch}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          onFocus={() => setSelectedIndex(idx)}
                          className={`w-full text-left group p-5 sm:p-6 cursor-pointer transition-all duration-150 flex items-start justify-between gap-4 outline-none ${
                            isSelected
                              ? 'bg-[#192133] text-white border-2 border-[#B98633] shadow-[0_0_26px_rgba(185,134,51,0.22)]'
                              : isEvenRow
                                ? 'bg-[#0C0F18] hover:bg-[#141A28] border border-[#232A3C] hover:border-[#B98633]/80'
                                : 'bg-[#121725] hover:bg-[#182032] border border-[#283044] hover:border-[#B98633]/80'
                          }`}
                        >
                          <div className="flex-1 min-w-0 space-y-2.5">
                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] font-mono tracking-wider leading-[1.6]">
                              <span className="inline-flex items-center gap-1.5 text-[#E2BA6B] font-semibold uppercase">
                                {getCategoryIcon(result.category)}
                                <span>{result.categoryLabel}</span>
                              </span>
                              <span aria-hidden="true" className="text-[#4B556B]">·</span>
                              <span className="text-[#C2CCE0]">{result.meta}</span>
                              {isSelected && (
                                <>
                                  <span aria-hidden="true" className="text-[#4B556B]">·</span>
                                  <span className="text-[#B98633] font-semibold uppercase">Active Selection</span>
                                </>
                              )}
                            </div>

                            <h4 className="font-serif text-[1.35rem] sm:text-[1.6rem] text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-[1.4] tracking-[0.005em]">
                              <HighlightMatch text={result.title} query={query} />
                            </h4>

                            <p className="text-[15px] sm:text-[16.5px] text-[#E1E6F0] line-clamp-3 leading-[1.75] font-normal tracking-[0.01em]">
                              <HighlightMatch text={result.snippet} query={query} />
                            </p>
                          </div>

                          <div className="flex flex-col items-end justify-center gap-1.5 shrink-0 pt-1 text-[#E2BA6B]">
                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-3.5 py-2 border transition-colors ${
                                isSelected
                                  ? 'border-[#B98633] bg-[#B98633] text-[#08090C] font-semibold'
                                  : 'border-[#2D3548] bg-[#111520] text-[#E2BA6B] group-hover:border-[#B98633]'
                              }`}
                            >
                              <span className="hidden sm:inline">Open</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </span>
                            {isSelected && (
                              <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-mono text-[#D0D7E5]">
                                <CornerDownLeft className="w-3 h-3 text-[#B98633]" />
                                <span>Enter</span>
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-6 py-12 text-center space-y-4">
                    <div className="w-12 h-12 border border-[#B98633]/70 bg-[#141924] flex items-center justify-center mx-auto text-[#E2BA6B]">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-2xl text-[#FAF7F0]">
                      Not Listed Publicly — Ask Our Stewards Directly
                    </h4>
                    <p className="text-sm sm:text-base text-[#D6DCE6] max-w-md mx-auto leading-relaxed font-light">
                      “{query}” sits outside public archive listings. Because we work relationship-by-relationship from Mayfair, send the requirement straight to our directors—whether £100 or £100,000 in scale.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          closeSearch();
                          openIntroductionModal(`Direct Mandate Inquiry: "${query}"`);
                        }}
                        className="btn-gold min-h-[44px] px-6 py-3 text-xs flex items-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5 text-[#07080B]" />
                        <span>Send Request to Albemarle Desk</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQuery('');
                          setTitleOnlyFilter(false);
                        }}
                        className="btn-outline-gold min-h-[44px] px-5 py-3 text-xs"
                      >
                        Reset Search
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Preview Pane (Desktop) */}
              <div className="hidden lg:flex lg:col-span-5 flex-col justify-between bg-[#0F131D] border-l border-[#22293A] p-6">
                {activeResult ? (
                  <motion.div
                    key={activeResult.id}
                    initial={{ opacity: 0.85, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden border border-[#B98633]/60 bg-[#141925] relative">
                      <SmartImage
                        src={getFolioVisual(activeResult)}
                        alt={activeResult.title}
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="w-full h-full object-cover brightness-105 contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F131D] via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 font-mono text-xs uppercase tracking-[0.18em] text-[#E2BA6B] bg-[#0B0E15]/90 px-3 py-1 border border-[#B98633]/50">
                        {activeResult.categoryLabel}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="text-xs sm:text-[13px] font-mono text-[#E2BA6B]">{activeResult.meta}</div>
                      <h3 className="font-serif text-2xl sm:text-[1.8rem] text-[#FAF7F0] leading-[1.35]">
                        {activeResult.title}
                      </h3>
                      {activeResult.subtitle && (
                        <p className="font-serif italic text-base sm:text-[17px] text-[#E2E8F0] leading-[1.6]">
                          {activeResult.subtitle}
                        </p>
                      )}
                      <p className="text-[15px] sm:text-base text-[#DDE3EE] font-normal leading-[1.75]">
                        {activeResult.snippet}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#202636] space-y-2.5">
                      <Link
                        page={activeResult.targetRoute}
                        params={activeResult.routeParams}
                        onClick={closeSearch}
                        className="btn-gold w-full min-h-[44px] text-xs flex items-center justify-center gap-2"
                      >
                        <span>Open Full Page</span>
                        <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          closeSearch();
                          openIntroductionModal(`Arrangement Inquiry: ${activeResult.title}`);
                        }}
                        className="btn-outline-gold w-full min-h-[44px] text-xs flex items-center justify-center gap-2"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Speak With Our Mayfair Desk</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="m-auto text-center space-y-3 p-4">
                    <Shield className="w-6 h-6 text-[#E2BA6B] mx-auto" />
                    <p className="font-serif text-xl text-[#FAF7F0]">
                      Bespoke Relationship Sourcing
                    </p>
                    <p className="text-sm sm:text-base text-[#CBD5E1] font-light leading-relaxed">
                      If a request sits outside public pages, our stewards coordinate directly on your behalf from 45 Albemarle Street.
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-[#202636] text-xs text-[#A9B4C7] leading-relaxed">
                  Human representation without agency markups · Response in confidence
                </div>
              </div>
            </div>

            {/* Direct Bespoke Callout */}
            {query.trim() && results.length > 0 && (
              <div className="px-4 sm:px-6 py-3 bg-[#141925] border-t border-[#283044] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs sm:text-sm text-[#E2E8F0] font-normal">
                  Prefer a human steward to verify availability on “{query.trim()}” directly?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    closeSearch();
                    openIntroductionModal(`Inquiry from Directory Search: "${query}"`);
                  }}
                  className="min-h-[44px] px-5 py-2 bg-[#E2BA6B] hover:bg-[#F0C97B] text-[#090C12] text-xs font-serif font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Ask Our Mayfair Desk</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Keyboard Shortcuts Indicator Strip & Direct Line */}
            <div className="px-4 sm:px-6 py-3 border-t border-[#22293A] bg-[#0A0D14] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#CBD5E1]">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="inline-flex items-center gap-1.5 text-[#E2BA6B] font-semibold uppercase tracking-wider">
                  <Keyboard className="w-4 h-4 text-[#B98633]" />
                  <span>Keyboard Shortcuts:</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="px-2 py-0.5 bg-[#141925] border border-[#B98633]/60 text-[11px] text-[#FAF7F0]">↑</kbd>
                  <kbd className="px-2 py-0.5 bg-[#141925] border border-[#B98633]/60 text-[11px] text-[#FAF7F0]">↓</kbd>
                  <span>Highlight</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="px-2 py-0.5 bg-[#141925] border border-[#B98633]/60 text-[11px] text-[#FAF7F0]">↵</kbd>
                  <span>Open</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="px-2 py-0.5 bg-[#141925] border border-[#2D3548] text-[11px] text-[#FAF7F0]">ESC</kbd>
                  <span>Close</span>
                </span>
                <span className="hidden md:inline-flex items-center gap-1.5">
                  <kbd className="px-2 py-0.5 bg-[#141925] border border-[#2D3548] text-[11px] text-[#FAF7F0]">⌘K</kbd>
                  <span>or</span>
                  <kbd className="px-2 py-0.5 bg-[#141925] border border-[#2D3548] text-[11px] text-[#FAF7F0]">/</kbd>
                  <span>Toggle</span>
                </span>
              </div>

              <div className="text-left sm:text-right tabular-nums flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E2BA6B]" />
                <span>Direct Line: <strong className="text-[#FAF7F0]">{TGLC_CONTACT.telephone}</strong></span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
