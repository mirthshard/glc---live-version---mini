import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { SERVICES_DATA, TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { Link } from '../common/Link';
import { SmartImage } from '../common/SmartImage';
import { Reveal } from '../common/Reveal';
import {
  ArrowUpRight,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Phone,
  MapPin,
} from 'lucide-react';

const PILLAR_SHORT_LABELS: Record<string, string> = {
  'travel-aviation': 'Travel & Aviation',
  'dining-nightlife': 'Dining & Nightlife',
  'experiences-culture': 'Experiences & Culture',
  'residences-relocation': 'Residences & Relocation',
  'transport-security': 'Transport & Security',
  'personal-private-office': 'Personal & Private Office',
  'luxury-sourcing': 'Luxury Sourcing',
};

const HOW_WE_WORK = [
  {
    step: '01',
    title: 'One brief conversation',
    description:
      'Share your dates, guests and preferences by phone, WhatsApp, email or in person on Albemarle Street.',
  },
  {
    step: '02',
    title: 'Curated options, clear costs',
    description:
      'We check live availability through trusted partners and agree every supplier term and cost upfront.',
  },
  {
    step: '03',
    title: 'Everything moving in step',
    description:
      'Flights, chauffeurs, suites, dining and tickets stay aligned under one manager — adjusting smoothly if plans shift.',
  },
] as const;

export const ServicesHub: React.FC = () => {
  const { openIntroductionModal, t } = useNavigation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasAdvanced, setHasAdvanced] = useState(false);
  const [expandedPillarId, setExpandedPillarId] = useState<string | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setHasAdvanced(true);
      setCurrentSlide((prev) => (prev + 1) % SERVICES_DATA.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activePillar = SERVICES_DATA[currentSlide];
  const nextPillar = SERVICES_DATA[(currentSlide + 1) % SERVICES_DATA.length];

  const scrollToService = (id: string) => {
    const el = document.getElementById(`service-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#07080B] text-[#FAF7F0] selection:bg-[#B98633]/30 selection:text-[#FAF7F0] overflow-x-clip">
      {/* 1. Full-Width Moving Hero Carousel */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative min-h-[54vh] sm:min-h-[62vh] flex items-center justify-center border-b border-[#20222B] pt-24 sm:pt-28 pb-16 overflow-hidden select-none"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={activePillar.id}
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
                src={activePillar.heroImage}
                alt={activePillar.title}
                sizes="100vw"
                priority={currentSlide === 0 && !hasAdvanced}
                className="w-full h-full object-cover object-center brightness-105 contrast-105"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/50 to-[#07080B]/65" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/85 via-[#07080B]/35 to-[#07080B]/75 hidden sm:block" />
          </motion.div>
        </AnimatePresence>
        {hasAdvanced && nextPillar && (
          <div className="sr-only pointer-events-none" aria-hidden="true">
            <SmartImage src={nextPillar.heroImage} alt="" sizes="100vw" priority={false} className="w-px h-px" />
          </div>
        )}

        {/* Carousel Slide Indicators & Controls */}
        <div className="absolute bottom-5 right-4 sm:right-6 z-20 flex items-center gap-3 bg-[#07080B]/85 backdrop-blur-md px-3.5 py-1.5 border border-[#8B672B]/45">
          <div className="flex items-center gap-1.5">
            {SERVICES_DATA.map((service, idx) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-[3px] transition-all duration-300 cursor-pointer ${
                  idx === currentSlide ? 'w-6 bg-[#E2BA6B]' : 'w-2 bg-[#444] hover:bg-[#888]'
                }`}
                aria-label={`Show ${service.title}`}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono text-[#E2BA6B] tabular-nums pl-0.5">
            {String(currentSlide + 1).padStart(2, '0')} / {String(SERVICES_DATA.length).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1 ml-1 border-l border-[#2B2D3A] pl-2">
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + SERVICES_DATA.length) % SERVICES_DATA.length)}
              className="p-1.5 text-[#9C968A] hover:text-[#E2BA6B] transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % SERVICES_DATA.length)}
              className="p-1.5 text-[#9C968A] hover:text-[#E2BA6B] transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-5">
          <motion.span
            initial={{ opacity: 0.9, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="tglc-kicker text-xs block"
          >
            {t('servicesHub.kicker')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.05] text-[#FFFDF7] text-balance"
          >
            {t('servicesHub.heading')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0.9, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-xl sm:text-3xl text-[#E2BA6B] max-w-3xl mx-auto"
          >
            “{t('hero.headline1')}”
          </motion.p>

          <motion.p
            initial={{ opacity: 0.92, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-sm sm:text-base text-[#B4BCCB] max-w-2xl mx-auto leading-relaxed font-normal"
          >
            From private flights and Mayfair dining rooms to residences, chauffeurs and rare commissions, one dedicated team on Albemarle Street keeps every detail moving quietly together.
          </motion.p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openIntroductionModal('Services enquiry')}
              className="btn-gold min-h-[44px] px-8 py-3.5 text-xs inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{t('cta.requestIntroduction')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToService(SERVICES_DATA[0].id)}
              className="btn-outline-gold min-h-[44px] px-6 py-3.5 text-xs inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{t('servicesHub.browseSeven')}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Quick-Jump Pillar Index Strip */}
      <nav
        aria-label="Service categories"
        className="bg-[#0B0D14] border-b border-[#20222B]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center lg:flex-wrap lg:justify-center gap-2 overflow-x-auto lg:overflow-visible py-3.5 scrollbar-none">
            {SERVICES_DATA.map((service, idx) => (
              <button
                key={service.id}
                type="button"
                onClick={() => scrollToService(service.id)}
                className="min-h-[42px] px-3 py-2 bg-[#0F121B] hover:bg-[#161A26] border border-[#222532] hover:border-[#CFA85E]/70 text-xs text-[#D4D8E2] hover:text-[#FAF7F0] transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span className="font-mono text-[10px] text-[#CFA85E] tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span>{PILLAR_SHORT_LABELS[service.id] ?? service.title}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 3. How Working With Us Works — 3-Step Editorial Overview */}
      <section className="py-12 sm:py-16 px-5 sm:px-8 lg:px-12 bg-[#090B10] border-b border-[#20222B]">
        <div className="max-w-7xl mx-auto space-y-8">
          <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-[#1E212E]">
            <div className="space-y-1.5">
              <span className="tglc-kicker text-[11px] block">
                One Point of Contact
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0]">
                How our Mayfair desk works
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#B5B0A6] max-w-xl leading-relaxed font-light">
              Whether you need a quiet dinner table tonight or a multi-country family itinerary next summer, every request is handled personally from our Albemarle Street desk.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_WE_WORK.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="p-6 bg-[#0D1017] border border-[#222532] space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#CFA85E] tracking-[0.2em] block tabular-nums">
                    STEP {item.step}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F0] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B8BECC] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 4. Alternating Showcase Panels for All Seven Categories */}
      <div className="divide-y divide-[#20222B]">
        {SERVICES_DATA.map((service, index) => {
          const isEven = index % 2 === 0;
          const isPreviewExpanded = expandedPillarId === service.id;
          const pillarNum = String(index + 1).padStart(2, '0');

          return (
            <motion.section
              key={service.id}
              id={`service-${service.id}`}
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.55 }}
              className="relative py-12 sm:py-16 scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#07080B] via-[#0D1017] to-[#07080B]"
            >
              <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-8">
                {/* Alternating Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                  {/* Large Image */}
                  <motion.div
                    initial={{ opacity: 0.92, x: isEven ? -14 : 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.01 }}
                    transition={{ duration: 0.55 }}
                    className={`lg:col-span-6 flex flex-col ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    <Link
                      page="service-detail"
                      params={{ serviceId: service.id }}
                      className="block group cursor-pointer relative aspect-[16/10] lg:aspect-auto lg:min-h-[440px] lg:flex-1 w-full overflow-hidden border border-[#242630] shadow-2xl bg-[#12141A]"
                    >
                      <SmartImage
                        src={service.heroImage}
                        alt={service.title}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/85 via-transparent to-[#07080B]/20 group-hover:from-[#07080B]/65 transition-colors" />

                      <div className="absolute top-4 left-4 bg-[#07080B]/85 backdrop-blur-md px-3 py-1.5 border border-[#8B672B]/50 font-mono text-[11px] tracking-[0.18em] text-[#E2BA6B] tabular-nums">
                        {pillarNum} / {String(SERVICES_DATA.length).padStart(2, '0')}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 bg-[#07080B]/90 backdrop-blur-md p-4 border border-[#2A2D38] flex items-center justify-between gap-4">
                        <div className="space-y-0.5 min-w-0">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] block">
                            {service.subServices.length} Areas Covered
                          </span>
                          <span className="font-serif text-base sm:text-lg text-[#FAF7F0] block truncate">
                            Explore {service.title}
                          </span>
                        </div>
                        <div className="w-9 h-9 border border-[#8B672B] bg-[#141620] flex items-center justify-center text-[#E2BA6B] group-hover:translate-x-1 transition-transform shrink-0">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>

                  {/* Category Details */}
                  <motion.div
                    initial={{ opacity: 0.92, x: isEven ? 14 : -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.01 }}
                    transition={{ duration: 0.55 }}
                    className={`lg:col-span-6 space-y-6 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                    <div className="space-y-5">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#CFA85E] block mb-2 tabular-nums">
                          Practice Area {pillarNum}
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FAF7F0] leading-tight text-balance">
                          {service.title}
                        </h2>
                        <p className="font-serif italic text-lg sm:text-xl text-[#E2BA6B] mt-2">
                          {service.tagline}
                        </p>
                      </div>

                      <p className="text-sm text-[#D4D8E2] leading-relaxed font-light">
                        {service.shortDesc}
                      </p>

                      {/* 4 Key Highlights in 2x2 Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-[#20232E]">
                        {service.highlights.map((highlight) => (
                          <div key={highlight} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#D4D8E2]">
                            <CheckCircle2 className="w-4 h-4 text-[#E2BA6B] shrink-0 mt-0.5" />
                            <span className="leading-snug">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Structured 2-Column Sub-Services Index */}
                      <div className="pt-4 border-t border-[#20232E] space-y-2.5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8F98AA] block">
                          What this includes
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.subServices.map((sub) => (
                            <Link
                              key={sub.id}
                              page="subservice-detail"
                              params={{ serviceId: service.id, subServiceId: sub.id }}
                              className="min-h-[44px] px-3.5 py-2.5 bg-[#0F121B] hover:bg-[#161A26] border border-[#222532] hover:border-[#CFA85E]/70 text-xs text-[#E8E4DC] hover:text-[#E2BA6B] transition-colors flex items-center justify-between gap-2 group/sub"
                            >
                              <span className="font-medium leading-snug">{sub.title}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#CFA85E] shrink-0 opacity-75 group-hover/sub:opacity-100 group-hover/sub:translate-x-0.5 group-hover/sub:-translate-y-0.5 transition-all" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#20232E] flex flex-wrap items-center gap-3">
                      <Link
                        page="service-detail"
                        params={{ serviceId: service.id }}
                        className="btn-gold min-h-[44px] px-6 py-3 text-xs inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                      >
                        <span>Explore {service.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        aria-expanded={isPreviewExpanded}
                        onClick={() => setExpandedPillarId(isPreviewExpanded ? null : service.id)}
                        className="btn-outline-gold min-h-[44px] px-4 py-3 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>{isPreviewExpanded ? 'Hide summary' : 'Preview all details'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isPreviewExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Inline Expandable Sub-Service Quick Preview */}
                <AnimatePresence>
                  {isPreviewExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="bg-[#0D1017] border border-[#242630] p-6 sm:p-8 space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E2332] pb-3">
                          <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F0]">
                            In {service.title}
                          </h3>
                          <button
                            type="button"
                            onClick={() => openIntroductionModal(service.title)}
                            className="min-h-[40px] text-xs font-mono uppercase tracking-wider text-[#E2BA6B] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Talk to us →
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {service.subServices.map((sub) => (
                            <Link
                              key={sub.id}
                              page="subservice-detail"
                              params={{ serviceId: service.id, subServiceId: sub.id }}
                              className="cursor-pointer p-5 bg-[#07080B] border border-[#1E2332] hover:border-[#8B672B] transition-colors flex flex-col justify-between space-y-3 group"
                            >
                              <div className="space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="font-serif text-lg text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                                    {sub.title}
                                  </h4>
                                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E2BA6B] opacity-70 group-hover:opacity-100 shrink-0 mt-1" />
                                </div>
                                <p className="text-xs text-[#D4D8E2] leading-relaxed font-light">
                                  {sub.shortDesc}
                                </p>
                              </div>
                              <ul className="space-y-1.5 pt-2.5 border-t border-[#181C26]">
                                {sub.detailedPoints.slice(0, 2).map((pt) => (
                                  <li key={pt} className="text-[11px] text-[#9C968A] flex items-start gap-2">
                                    <span className="w-1 h-1 bg-[#CFA85E] mt-1.5 shrink-0" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          );
        })}
      </div>

      <GoldDivider />

      {/* 5. Closing CTA Banner */}
      <section className="py-14 sm:py-18 px-5 sm:px-8 bg-gradient-to-b from-[#07080B] via-[#0D1017] to-[#07080B] border-t border-[#20222B]">
        <Reveal className="max-w-4xl mx-auto p-7 sm:p-10 bg-[#0C0E14] border border-[#242630] text-center space-y-5">
          <span className="tglc-kicker text-[11px] block">
            Mayfair Concierge Desk
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0] leading-tight text-balance">
            Life rarely fits neatly into one box.
          </h2>

          <p className="text-sm sm:text-base text-[#D4D8E2] max-w-xl mx-auto leading-relaxed font-light">
            Tell us what your week or season looks like. We weave travel, dining, homes, transport and private sourcing together under one clear relationship agreed upfront.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#E2BA6B] tabular-nums">
            <a
              href={`tel:${TGLC_CONTACT.internationalPhone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{TGLC_CONTACT.telephone}</span>
            </a>
            <span className="text-[#3C4152] hidden sm:inline" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5 text-[#D4D8E2]">
              <MapPin className="w-3.5 h-3.5 text-[#CFA85E]" />
              <span>{TGLC_CONTACT.address.toString()}</span>
            </span>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openIntroductionModal('Multi-area enquiry')}
              className="btn-gold min-h-[44px] px-8 py-3.5 text-xs inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{t('cta.requestIntroduction')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <Link
              page="commission-studio"
              className="btn-outline-gold min-h-[44px] px-6 py-3.5 text-xs inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <span>{t('nav.commissionStudio')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
