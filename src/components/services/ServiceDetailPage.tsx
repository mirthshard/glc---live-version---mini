import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { SERVICES_DATA, TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { Link } from '../common/Link';
import { SmartImage } from '../common/SmartImage';
import { Reveal } from '../common/Reveal';
import { CollapsibleFaqSection } from '../common/CollapsibleFaqSection';
import { getServiceCategoryHeroSlides } from '../../utils/carouselSlides';
import { getServiceCategoryFaqs } from '../../utils/faqHelpers';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Phone,
  Clock,
  MapPin,
} from 'lucide-react';

interface ServiceDetailPageProps {
  serviceId?: string;
}

const SERVICE_CONTEXT_NOTES: Record<string, { overview: string; coordination: string }> = {
  'travel-aviation': {
    overview:
      'Great travel should feel restorative from the moment you leave your front door, not only once you reach the hotel. We start with how you genuinely prefer to move — favourite aircraft cabins, quiet suites away from lifts, thoughtful pacing and seamless tarmac or terminal handovers.',
    coordination:
      'Whether you are slipping away to Europe for a long weekend or moving an entire family across three time zones, your dedicated Mayfair lifestyle manager handles flights, stays, drivers and sudden changes from a single calm conversation.',
  },
  'dining-nightlife': {
    overview:
      'London’s finest evenings are rarely the loudest ones — they are built on the right room, genuine warmth at the door and tables that match the people you are with. From spontaneous Mayfair lunches to candlelit private dining vaults and late-night Soho music rooms, we know where you will feel genuinely at home.',
    coordination:
      'When dinner leads on to theatre, a private club or a late-night lounge, we weave every timing, dietary note and waiting chauffeur together so the night unfolds effortlessly.',
  },
  'experiences-culture': {
    overview:
      'The moments people remember years later are the ones shaped around genuine curiosity rather than tick-box tourism. We arrange official hospitality at flagship sporting fixtures, curator-led gallery visits and private viewings across London and Europe — always subject to venue availability.',
    coordination:
      'Tell us the dates, passions or family milestones ahead of you. We advise early on where the finest hospitality sits and tie in chauffeurs, dining and nearby stays so nothing feels pieced together.',
  },
  'residences-relocation': {
    overview:
      'A London residence should feel like a sanctuary the second your key turns in the lock — never another item on your to-do list. Alongside regulated buying agents and your own advisers, our Mayfair desk looks after the practical reality of finding, preparing and running a home quietly.',
    coordination:
      'From pre-arrival housekeeping, fresh flowers and larder stocking to vetted tradespeople, relocation logistics and weekend country houses, everything stays in one pair of safe hands.',
  },
  'transport-security': {
    overview:
      'Moving between airports, meetings and late finishes should give you breathing space back — not add friction to your day. We arrange seasoned London chauffeurs, flagship vehicles and, where required, vetted SIA-licensed independent protection specialists who keep a reassuringly low profile.',
    coordination:
      'Live flight tracking, private aviation terminal clearances and quiet venue side entrances are confirmed ahead of time so your car is waiting before you step onto the pavement.',
  },
  'personal-private-office': {
    overview:
      'Even with a capable assistant or family office, personal errands, household admin and family logistics quietly absorb hours every week. Our Mayfair team steps in discreetly alongside your existing team so the background noise of daily life simply disappears.',
    coordination:
      'We remember how your household runs, keep important family dates on our radar and coordinate trusted specialists quietly — giving you back the time and headspace you actually want.',
  },
  'luxury-sourcing': {
    overview:
      'Finding a rare timepiece, commissioning a Savile Row suit or tracking down a birth-year vintage should feel like a pleasure, not an endless trail of dead ends. We search quietly through established Mayfair houses, independent dealers and master craftspeople without putting your name on display.',
    coordination:
      'Every detail — provenance, condition, independent certification and exact cost — is confirmed with you clearly in writing before a single deposit or purchase is authorised.',
  },
};

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'One brief conversation',
    desc: 'Tell us what you have in mind by phone, WhatsApp, email or over coffee on Albemarle Street — even if it is still just a rough idea.',
  },
  {
    step: '02',
    title: 'Thoughtful options, zero guesswork',
    desc: 'We check live availability with trusted contacts, curate genuinely fitting choices and confirm every supplier term and cost upfront.',
  },
  {
    step: '03',
    title: 'Quietly handled from start to finish',
    desc: 'Bookings, timings, preferences and drivers are lined up cleanly — and if your plans shift mid-week, one message updates everything.',
  },
] as const;

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId = 'travel-aviation' }) => {
  const { openIntroductionModal } = useNavigation();

  const serviceIndex = Math.max(
    0,
    SERVICES_DATA.findIndex((s) => s.id === serviceId)
  );
  const service = SERVICES_DATA[serviceIndex] || SERVICES_DATA[0];
  const otherServices = SERVICES_DATA.filter((s) => s.id !== service.id);
  const serviceFaqs = getServiceCategoryFaqs(service);
  const contextNote = SERVICE_CONTEXT_NOTES[service.id] ?? {
    overview:
      'Every request is handled personally by our Mayfair office with warm, straight-talking advice and clear availability guidance.',
    coordination:
      'We confirm every detail and supplier cost upfront in writing so your plans unfold calmly from start to finish.',
  };

  const heroSlides = getServiceCategoryHeroSlides(service);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasAdvanced, setHasAdvanced] = useState(false);

  useEffect(() => {
    setCurrentSlide(0);
    setHasAdvanced(false);
  }, [service.id]);

  useEffect(() => {
    if (isPaused || heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setHasAdvanced(true);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  const nextSlideImg = heroSlides.length > 1 ? heroSlides[(currentSlide + 1) % heroSlides.length] : null;

  const scrollToCoverage = () => {
    const el = document.getElementById('service-coverage');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#08090C] text-[#F4F1EA] selection:bg-[#B98633]/30 selection:text-[#F4F1EA] overflow-x-clip pb-14">
      {/* 1. Hero: Image + Breadcrumb + Title + Tagline + Quick Actions */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative min-h-[52vh] sm:min-h-[60vh] flex items-center justify-center border-b border-[#20222B] pt-24 sm:pt-28 pb-20 overflow-hidden select-none"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={heroSlides[currentSlide] || service.heroImage}
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
                src={heroSlides[currentSlide] || service.heroImage}
                alt={service.title}
                sizes="100vw"
                priority={currentSlide === 0 && !hasAdvanced}
                className="w-full h-full object-cover object-center brightness-105 contrast-105"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/50 to-[#08090C]/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08090C]/85 via-[#08090C]/35 to-[#08090C]/75 hidden sm:block" />
          </motion.div>
        </AnimatePresence>
        {hasAdvanced && nextSlideImg && (
          <div className="sr-only pointer-events-none" aria-hidden="true">
            <SmartImage src={nextSlideImg} alt="" sizes="100vw" priority={false} className="w-px h-px" />
          </div>
        )}

        {/* Carousel Slide Controls */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-5 right-4 sm:right-6 z-20 flex items-center gap-3 bg-[#08090C]/85 backdrop-blur-md px-3.5 py-1.5 border border-[#8B672B]/45">
            <div className="flex items-center gap-1.5">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setHasAdvanced(true);
                    setCurrentSlide(idx);
                  }}
                  className={`h-[3px] transition-all duration-300 cursor-pointer ${
                    idx === currentSlide ? 'w-6 bg-[#CFA85E]' : 'w-2 bg-[#444] hover:bg-[#888]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-[#E2BA6B] tabular-nums pl-0.5">
              {String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1 ml-1 border-l border-[#2B2D3A] pl-2">
              <button
                type="button"
                onClick={() => {
                  setHasAdvanced(true);
                  setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
                }}
                className="p-1.5 text-[#9C968A] hover:text-[#CFA85E] transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setHasAdvanced(true);
                  setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
                }}
                className="p-1.5 text-[#9C968A] hover:text-[#CFA85E] transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-5">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#CFA85E]">
            <Link page="services" className="hover:text-[#FAF7F0] transition-colors">
              Services
            </Link>
            <span className="text-[#6E5629]" aria-hidden="true">/</span>
            <span className="tabular-nums">
              {String(serviceIndex + 1).padStart(2, '0')} of {String(SERVICES_DATA.length).padStart(2, '0')}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.06] text-[#FAF7F0] text-balance"
          >
            {service.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0.9, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-xl sm:text-3xl text-[#E2BA6B] max-w-3xl mx-auto"
          >
            {service.tagline}
          </motion.p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openIntroductionModal(service.title)}
              className="btn-gold min-h-[44px] px-7 py-3 text-xs inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Request an introduction</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={scrollToCoverage}
              className="btn-outline-gold min-h-[44px] px-5 py-3 text-xs inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>What we cover</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Balanced 12-Column Overview & Key Highlights */}
      <section className="py-12 sm:py-16 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Editorial Overview */}
          <motion.div
            initial={{ opacity: 0.9, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <span className="tglc-kicker text-[11px] block">
                Overview & Scope
              </span>
              <p className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] leading-snug">
                {service.shortDesc}
              </p>
              <div className="space-y-3.5 text-sm text-[#C8C2B7] leading-relaxed font-light pt-1">
                <p>{contextNote.overview}</p>
                <p>{contextNote.coordination}</p>
              </div>
            </div>

            <div className="pt-5 border-t border-[#20232E] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8F98AA] flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#CFA85E]" />
                  <span>Direct Desk</span>
                </span>
                <a
                  href={`tel:${TGLC_CONTACT.internationalPhone.replace(/\s+/g, '')}`}
                  className="text-[#E2BA6B] hover:text-white transition-colors font-medium tabular-nums block"
                >
                  {TGLC_CONTACT.telephone}
                </a>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8F98AA] flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#CFA85E]" />
                  <span>Office Hours</span>
                </span>
                <p className="text-[#D4D8E2]">{TGLC_CONTACT.hours}</p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8F98AA] flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#CFA85E]" />
                  <span>Location</span>
                </span>
                <p className="text-[#D4D8E2]">45 Albemarle Street, W1S 4JL</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Structured Key Highlights Panel */}
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-5 bg-[#0D1017] border border-[#242630] p-6 sm:p-8 flex flex-col justify-between space-y-6 relative"
          >
            <span aria-hidden="true" className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#8B672B]" />
            <span aria-hidden="true" className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#8B672B]" />

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#1E222E]">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#CFA85E]">
                  At a Glance
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#8F98AA] tabular-nums">
                  {service.subServices.length} Areas Covered
                </span>
              </div>

              <div className="divide-y divide-[#1B1E29]">
                {service.highlights.map((item, idx) => (
                  <div key={item} className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-3.5">
                    <span className="font-mono text-[11px] text-[#CFA85E] tabular-nums mt-0.5 shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm text-[#FAF7F0] leading-snug flex-1">{item}</p>
                    <Check className="w-4 h-4 text-[#E2BA6B] shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E222E] space-y-3">
              {service.regulatoryNote && (
                <p className="text-[11px] text-[#9C968A] leading-relaxed font-light">
                  {service.regulatoryNote}
                </p>
              )}
              <button
                type="button"
                onClick={() => openIntroductionModal(service.title)}
                className="btn-outline-gold w-full min-h-[44px] px-5 py-3 text-xs inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request an introduction</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <GoldDivider />
      </div>

      {/* 3. Enriched Sub-Service Cards (title + shortDesc + real detailedPoints preview + image) */}
      <section id="service-coverage" className="py-12 sm:py-16 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8 scroll-mt-24">
        <div className="pb-5 border-b border-[#20232E] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="tglc-kicker text-[11px] block">
              Areas of Support
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0]">
              What we cover in {service.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#9C968A] max-w-md font-light">
            Select any area below for full details, practical examples and answers to common questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.subServices.map((sub, idx) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0.9, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.45, delay: idx * 0.04 }}
              className="h-full"
            >
              <Link
                page="subservice-detail"
                params={{ serviceId: service.id, subServiceId: sub.id }}
                className="group bg-[#12141A] border border-[#242630] hover:border-[#CFA85E]/70 transition-all duration-300 shadow-2xl overflow-hidden flex flex-col h-full"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#08090C] relative">
                  <SmartImage
                    src={sub.image}
                    alt={sub.title}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141A]/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#07080B]/85 border border-[#8B672B]/50 font-mono text-[10px] tracking-widest text-[#E2BA6B] tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                        <span className="card-title-underline">{sub.title}</span>
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-[#E2BA6B] shrink-0 mt-1 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed font-light">
                      {sub.shortDesc}
                    </p>

                    {sub.detailedPoints && sub.detailedPoints.length > 0 && (
                      <ul className="pt-3 border-t border-[#1E222E] space-y-1.5">
                        {sub.detailedPoints.slice(0, 3).map((point) => (
                          <li key={point} className="text-xs text-[#A9B0C0] flex items-start gap-2 leading-snug">
                            <span className="w-1.5 h-1.5 bg-[#CFA85E]/80 rotate-45 mt-1.5 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#1E222E] flex items-center justify-between text-xs text-[#E2BA6B] font-medium">
                    <span>View full details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Compact How It Works Strip */}
      <section className="py-10 sm:py-12 px-5 sm:px-8 lg:px-12 bg-[#0B0D14] border-y border-[#1E222E]">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#CFA85E] block">
                How It Works
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] mt-1">
                From first message to confirmed plans
              </h2>
            </div>
            <Link
              page="approach"
              className="text-xs text-[#E2BA6B] hover:text-white inline-flex items-center gap-1 transition-colors"
            >
              <span>Read our full approach</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((item) => (
              <div key={item.step} className="p-5 bg-[#0D1017] border border-[#222532] space-y-1.5">
                <span className="font-mono text-[11px] text-[#CFA85E] tabular-nums block">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl text-[#FAF7F0]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#A9B0C0] leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Gallery */}
      {service.galleryImages && service.galleryImages.length > 0 && (
        <section className="py-12 sm:py-14 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-6">
          <div className="border-b border-[#20232E] pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#CFA85E] block mb-1">
              Visual Reference
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
              In pictures
            </h2>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 ${service.galleryImages.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-5`}>
            {service.galleryImages.slice(0, 4).map((imgUrl, idx) => (
              <motion.div
                key={imgUrl}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-[#0D1017] border border-[#242630] overflow-hidden group flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-black">
                  <SmartImage
                    src={imgUrl}
                    alt={service.galleryCaptions?.[idx] || `${service.title} photograph ${idx + 1}`}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                  />
                </div>
                {service.galleryCaptions?.[idx] && (
                  <div className="p-4 border-t border-[#1E2332] flex-1">
                    <p className="text-xs text-[#D4D8E2] leading-relaxed">
                      {service.galleryCaptions[idx]}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Compact Collapsible FAQ Accordion (Exactly 10 rich questions) */}
      {serviceFaqs.length > 0 && (
        <>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <GoldDivider />
          </div>
          <CollapsibleFaqSection
            items={serviceFaqs}
            kicker="Questions & Answers"
            heading="Common questions"
            previewCount={3}
            resetKey={service.id}
            maxWidthClass="max-w-5xl"
            sectionClassName="py-10 sm:py-12 px-5 sm:px-8 bg-[#0B0C10]"
          />
        </>
      )}

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <GoldDivider />
      </div>

      {/* 7. Explore Other Services Cross-Link Strip */}
      <section className="py-12 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#20232E]">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#CFA85E] block mb-1">
              Continue Exploring
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
              Other areas we handle
            </h2>
          </div>
          <Link
            page="services"
            className="text-xs text-[#E2BA6B] hover:text-white inline-flex items-center gap-1 transition-colors"
          >
            <span>All seven services</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherServices.map((other) => (
            <Link
              key={other.id}
              page="service-detail"
              params={{ serviceId: other.id }}
              className="group p-5 bg-[#0D1017] border border-[#222532] hover:border-[#CFA85E]/70 transition-colors flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors">
                    {other.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#CFA85E] shrink-0 mt-1 opacity-70 group-hover:opacity-100" />
                </div>
                <p className="text-xs text-[#9C968A] leading-relaxed font-light line-clamp-2">
                  {other.shortDesc}
                </p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#CFA85E]">
                {other.subServices.length} specialties →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <GoldDivider />
      </div>

      {/* 8. Regulatory Note (if relevant) & Framed Closing CTA */}
      <section className="py-10 sm:py-14 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto p-7 sm:p-10 bg-[#0D1017] border border-[#242630] text-center space-y-5">
          {service.regulatoryNote && (
            <p className="text-xs text-[#9C968A] leading-relaxed max-w-2xl mx-auto">
              {service.regulatoryNote}
            </p>
          )}

          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0] leading-tight">
            Tell us what you have in mind.
          </h2>

          <p className="text-xs sm:text-base text-[#D4D8E2] max-w-xl mx-auto leading-relaxed font-light">
            Whether you are planning well ahead or solving something this week, our Mayfair desk will reply personally and talk you through clear, honest options.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openIntroductionModal(service.title)}
              className="btn-gold min-h-[44px] px-8 py-3.5 text-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Talk to us about {service.title}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${TGLC_CONTACT.internationalPhone.replace(/\s+/g, '')}`}
              className="btn-outline-gold min-h-[44px] px-6 py-3.5 text-xs inline-flex items-center gap-2 tabular-nums"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {TGLC_CONTACT.telephone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
