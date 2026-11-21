import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { CALENDAR_EVENTS } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { SmartImage } from '../common/SmartImage';
import { Reveal } from '../common/Reveal';
import { CALENDAR_HERO_SLIDES as HERO_SLIDES } from '../../utils/carouselSlides';
import {
  Calendar as CalendarIcon,
  ArrowUpRight,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = ['All', 'Sport', 'Art & Culture', 'Music', 'Fashion', 'Seasonal'];
const MONTHS = ['All', 'Feb', 'May', 'May–Aug', 'Jun', 'Jul', 'Sep', 'Oct', 'Autumn', 'Dec'];

export const CalendarPage: React.FC = () => {
  const { openIntroductionModal } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
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

  const filteredEvents = CALENDAR_EVENTS.filter((event) => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesMonth = selectedMonth === 'All' || event.month === selectedMonth;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      event.title.toLowerCase().includes(q) ||
      event.month.toLowerCase().includes(q) ||
      event.category.toLowerCase().includes(q) ||
      event.description.toLowerCase().includes(q);
    return matchesCategory && matchesMonth && matchesQuery;
  });

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedMonth('All');
    setSearchQuery('');
  };

  return (
    <div className="bg-[#07080B] text-[#FAF7F0] min-h-screen pb-16">
      {/* 1. Hero Carousel */}
      <section
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
        className="relative min-h-[50vh] sm:min-h-[58vh] flex items-center justify-center overflow-hidden border-b border-[#232736] pt-24 sm:pt-28 pb-16"
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
              aria-label="Previous calendar highlight"
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
              aria-label="Next calendar highlight"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-4 inset-x-0 z-20 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 px-4">
            <span className="font-mono text-[11px] tracking-wider text-[#E2BA6B] bg-[#07080B]/85 px-3 py-1 border border-[#232736] backdrop-blur-md max-w-[260px] sm:max-w-none truncate">
              {HERO_SLIDES[currentHeroSlide].month} · {HERO_SLIDES[currentHeroSlide].title}
            </span>
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
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Social Calendar</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#FAF7F0] font-normal leading-tight">
            The Season
          </h1>

          <p className="text-sm sm:text-lg text-[#D4D8E2] max-w-2xl mx-auto leading-relaxed">
            Key dates in the social calendar. We can help with tickets, hospitality and plans around them, subject to availability.
          </p>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 2. Filter Bar */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 space-y-8">
        <div className="bg-[#0D1017] border border-[#232736] p-4 sm:p-5 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
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
                placeholder="Search events or month..."
                className="w-full pl-8.5 pr-3 py-2 bg-[#131722] border border-[#252D3C] text-xs font-mono text-[#FAF7F0] focus:outline-none focus:border-[#E2BA6B]"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 border-t border-[#1D2230] scrollbar-none">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8F98AA] pr-2 shrink-0">
              Month
            </span>
            {MONTHS.map((m) => {
              const isActive = selectedMonth === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedMonth(m)}
                  className={`px-3 py-1.5 text-xs font-mono whitespace-nowrap border shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#171C29] text-[#E2BA6B] border-[#E2BA6B]/70'
                      : 'bg-transparent text-[#8F98AA] border-transparent hover:border-[#2C3140] hover:text-[#FAF7F0]'
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="py-16 text-center bg-[#0D1017] border border-[#232736] space-y-4">
            <p className="font-serif text-xl text-[#FAF7F0]">No events match that filter.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-outline-gold px-5 py-2.5 text-xs cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, idx) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                whileHover={{ y: -4 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(idx * 0.04, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-[#0D1017] border border-[#232736] hover:border-[#E2BA6B]/60 transition-colors flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#12151E]">
                    <SmartImage
                      src={event.image}
                      alt={event.title}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#07080B]/85 border border-[#8B672B]/60 font-mono text-[11px] uppercase tracking-wider text-[#E2BA6B] backdrop-blur-md">
                      {event.month}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8F98AA] block">
                      {event.category}
                    </span>

                    <h2 className="font-serif text-xl sm:text-2xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                      <span className="card-title-underline">{event.title}</span>
                    </h2>

                    <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-3 border-t border-[#1A1E2A]">
                  <button
                    type="button"
                    onClick={() => openIntroductionModal(`Ask about ${event.title}`)}
                    className="btn-outline-gold w-full py-2.5 px-4 text-xs inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Ask about this event</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* 4. Closing Note */}
      <div className="mt-14">
        <GoldDivider />
      </div>
      <section className="pt-12 px-5 sm:px-8 max-w-3xl mx-auto text-center space-y-4">
        <Reveal className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0]">
            Planning around another event?
          </h2>
          <p className="text-sm text-[#D4D8E2] max-w-xl mx-auto leading-relaxed">
            Tell us where you want to be and who is travelling. We can help coordinate tickets, stays, dining and transport, subject to availability.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => openIntroductionModal('Social calendar enquiry')}
              className="btn-gold px-7 py-3.5 text-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Request an introduction</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
