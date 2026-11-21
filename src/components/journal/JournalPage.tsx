import React, { useState, useEffect, useMemo } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { CALENDAR_EVENTS, JOURNAL_ARTICLES } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { Link } from '../common/Link';
import { SmartImage } from '../common/SmartImage';
import { Reveal } from '../common/Reveal';
import { JOURNAL_HERO_SLIDES as HERO_SLIDES } from '../../utils/carouselSlides';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar as CalendarIcon,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const JOURNAL_CATEGORIES = [
  'All',
  'London Intelligence',
  'Travel Notes',
  'The Cultural Edit',
  'Dining & Entertaining',
  'Private Residences',
  'Objects of Desire',
];

export const JournalPage: React.FC = () => {
  const { openIntroductionModal } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [hasAdvanced, setHasAdvanced] = useState(false);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  useEffect(() => {
    if (isHeroPaused) return;
    const timer = setInterval(() => {
      setHasAdvanced(true);
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [isHeroPaused]);

  const nextHeroSlideSrc = hasAdvanced
    ? HERO_SLIDES[(currentHeroSlide + 1) % HERO_SLIDES.length].image
    : null;

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return JOURNAL_ARTICLES.filter((art) => {
      const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
      const matchesQuery =
        !query ||
        art.title.toLowerCase().includes(query) ||
        art.subtitle.toLowerCase().includes(query) ||
        art.excerpt.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = filteredArticles[0] || null;
  const gridArticles = featuredArticle ? filteredArticles.slice(1) : [];
  const seasonalHighlights = CALENDAR_EVENTS.slice(0, 3);

  return (
    <div className="bg-[#07080B] text-[#FAF7F0] min-h-screen pb-16">
      {/* 1. Hero Carousel */}
      <section
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
        className="relative min-h-[50vh] sm:min-h-[58vh] flex items-center justify-center overflow-hidden border-b border-[#232736] pt-14 sm:pt-18 pb-16"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentHeroSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <motion.div
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: 'easeOut' }}
                className="w-full h-full"
              >
                <SmartImage
                  src={HERO_SLIDES[currentHeroSlide].image}
                  alt={HERO_SLIDES[currentHeroSlide].title}
                  sizes="100vw"
                  priority={currentHeroSlide === 0}
                  className="w-full h-full object-cover object-center brightness-105 contrast-105"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {nextHeroSlideSrc && (
            <div aria-hidden="true" className="hidden">
              <SmartImage src={nextHeroSlideSrc} alt="" sizes="100vw" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/55 to-[#07080B]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/80 via-transparent to-[#07080B]/70 hidden sm:block" />

          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
            <button
              type="button"
              onClick={() => {
                setHasAdvanced(true);
                setCurrentHeroSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
              }}
              className="pointer-events-auto p-2.5 bg-[#07080B]/80 hover:bg-[#E2BA6B] text-[#E2BA6B] hover:text-[#07080B] border border-[#8B672B]/50 transition-all backdrop-blur-md cursor-pointer"
              aria-label="Previous featured article"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setHasAdvanced(true);
                setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
              }}
              className="pointer-events-auto p-2.5 bg-[#07080B]/80 hover:bg-[#E2BA6B] text-[#E2BA6B] hover:text-[#07080B] border border-[#8B672B]/50 transition-all backdrop-blur-md cursor-pointer"
              aria-label="Next featured article"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-4 inset-x-0 z-20 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 px-4">
            <Link
              page="journal-article"
              params={{ articleSlug: HERO_SLIDES[currentHeroSlide].slug }}
              className="font-mono text-[11px] tracking-wider text-[#E2BA6B] hover:text-[#FAF7F0] bg-[#07080B]/85 px-3 py-1 border border-[#232736] backdrop-blur-md transition-colors max-w-[260px] sm:max-w-none truncate"
            >
              {HERO_SLIDES[currentHeroSlide].category} · {HERO_SLIDES[currentHeroSlide].title}
            </Link>
            <span className="font-mono text-[10px] tracking-[0.18em] text-[#D4D8E2] bg-[#07080B]/80 px-2 py-1 border border-[#232736] tabular-nums">
              {String(currentHeroSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
            </span>
            <div className="flex gap-1.5">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => {
                    setHasAdvanced(true);
                    setCurrentHeroSlide(idx);
                  }}
                  aria-label={`View ${slide.title}`}
                  className={`h-1.5 transition-all cursor-pointer ${
                    idx === currentHeroSlide
                      ? 'w-8 bg-[#E2BA6B]'
                      : 'w-2.5 bg-[#FAF7F0]/35 hover:bg-[#FAF7F0]/65'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0.9, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[#E2BA6B]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The TGLC Journal</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#FAF7F0] font-normal leading-tight">
            Notes from London
          </h1>

          <p className="text-sm sm:text-lg text-[#D4D8E2] max-w-2xl mx-auto leading-relaxed">
            Practical guides on London neighbourhoods, dining, travel, residences and craft from the TGLC team.
          </p>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 2. Filter Bar */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 space-y-10">
        <div className="bg-[#0D1017] border border-[#232736] p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {JOURNAL_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[40px] px-3.5 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap border shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#E2BA6B] text-[#07080B] border-[#F0CC83] font-semibold'
                      : 'bg-[#111520] text-[#D4D8E2] border-[#232736] hover:border-[#8B672B] hover:text-[#FAF7F0]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8F98AA]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides..."
              className="w-full pl-8.5 pr-3 py-2 bg-[#131722] border border-[#252D3C] text-xs font-mono text-[#FAF7F0] focus:outline-none focus:border-[#E2BA6B]"
            />
          </div>
        </div>

        {/* 3. Featured Lead Article */}
        {featuredArticle ? (
          <motion.article
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-[#0D1017] border border-[#232736] hover:border-[#8B672B] transition-colors overflow-hidden group"
          >
            <Link
              page="journal-article"
              params={{ articleSlug: featuredArticle.slug }}
              className="grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[380px] overflow-hidden bg-[#12151E]">
                <SmartImage
                  src={featuredArticle.heroImage}
                  alt={featuredArticle.title}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0D1017]/60" />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E2BA6B] block">
                    {featuredArticle.category}
                  </span>

                  <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                    <span className="card-title-underline">{featuredArticle.title}</span>
                  </h2>

                  <p className="text-sm text-[#D4D8E2] leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-5 border-t border-[#1E2230] flex items-center justify-between text-xs">
                  <span className="text-[#8F98AA]">By {featuredArticle.author}</span>
                  <span className="text-[#E2BA6B] font-medium inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform">
                    <span>Read guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ) : (
          <div className="py-16 text-center bg-[#0D1017] border border-[#232736] space-y-4">
            <p className="font-serif text-xl text-[#FAF7F0]">No articles match your search.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="btn-outline-gold px-5 py-2.5 text-xs cursor-pointer"
            >
              Show all articles
            </button>
          </div>
        )}

        {/* 4. Remaining Articles Grid */}
        {gridArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridArticles.map((art, idx) => (
              <motion.article
                key={art.slug}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                whileHover={{ y: -4 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(idx * 0.04, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-[#0D1017] border border-[#232736] hover:border-[#8B672B] transition-colors overflow-hidden flex flex-col justify-between group"
              >
                <Link
                  page="journal-article"
                  params={{ articleSlug: art.slug }}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#12151E]">
                      <SmartImage
                        src={art.heroImage}
                        alt={art.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-transparent to-transparent" />
                    </div>

                    <div className="p-6 space-y-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E2BA6B] block">
                        {art.category}
                      </span>

                      <h3 className="font-serif text-xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                        <span className="card-title-underline">{art.title}</span>
                      </h3>

                      <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-5 pt-3 border-t border-[#1A1E2A] flex items-center justify-between text-xs">
                    <span className="text-[#8F98AA]">{art.author}</span>
                    <span className="text-[#E2BA6B] inline-flex items-center gap-1 font-medium">
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* 5. Compact Season Strip */}
        <div className="pt-4">
          <GoldDivider />
        </div>
        <div className="bg-[#0D1017] border border-[#232736] p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <Reveal>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E2BA6B] flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>The Season</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] mt-1">
                Key dates ahead
              </h2>
            </Reveal>
            <Link
              page="calendar"
              className="text-xs text-[#E2BA6B] hover:text-[#FAF7F0] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View full calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {seasonalHighlights.map((ev) => (
              <div
                key={ev.id}
                className="p-4 bg-[#111520] border border-[#232736] flex flex-col justify-between gap-3"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#E2BA6B]">
                    {ev.month} · {ev.category}
                  </span>
                  <h3 className="font-serif text-lg text-[#FAF7F0] mt-1">{ev.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => openIntroductionModal(`Ask about ${ev.title}`)}
                  className="text-xs text-[#E2BA6B] hover:text-[#FAF7F0] inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Ask about this event</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
