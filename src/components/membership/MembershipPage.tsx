import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { APPROACH_STEPS, FAQS_DATA, TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { Link } from '../common/Link';
import { SmartImage } from '../common/SmartImage';
import { Reveal } from '../common/Reveal';
import { CollapsibleFaqSection } from '../common/CollapsibleFaqSection';
import { MEMBERSHIP_HERO_SLIDES } from '../../utils/carouselSlides';
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MembershipTierConfig {
  id: 'london' | 'global' | 'family-office';
  title: string;
  featured?: boolean;
  summary: string;
  features: string[];
  modalTopic: string;
}

const MEMBERSHIP_TIERS: MembershipTierConfig[] = [
  {
    id: 'london',
    title: 'The London Membership',
    summary: 'For individuals and families whose week centres on London — Mayfair dining, culture and keeping a London home running smoothly.',
    features: [
      'A dedicated lifestyle manager on Albemarle Street',
      'Sought-after dining tables, private rooms and London evenings',
      'London residence preparation, trusted trades and household support',
      'Personal introductions across our Mayfair and St James’s network',
    ],
    modalTopic: 'The London Membership',
  },
  {
    id: 'global',
    title: 'The Global Membership',
    featured: true,
    summary: 'For people whose life moves between cities and seasons — keeping flights, stays, dining and homes coordinated under one roof.',
    features: [
      'Everything included in the London Membership',
      'Private aviation, yacht charters and bespoke international travel',
      'Ongoing coordination across London and overseas homes',
      'Support extended across your partner and immediate household',
    ],
    modalTopic: 'The Global Membership',
  },
  {
    id: 'family-office',
    title: 'The Family Office Membership',
    summary: 'For multi-generational families and the chiefs of staff, private assistants and advisers who support their principals every day.',
    features: [
      'Works seamlessly alongside your family office and executive assistants',
      'Coordinated lifestyle support across multiple generations and households',
      'Consolidated written approvals and transparent supplier reporting',
      'Dedicated London ground presence whenever principals are in town',
    ],
    modalTopic: 'The Family Office Membership',
  },
];

export const MembershipPage: React.FC = () => {
  const { openIntroductionModal, t } = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasAdvanced, setHasAdvanced] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setHasAdvanced(true);
      setCurrentSlide((prev) => (prev + 1) % MEMBERSHIP_HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeSlide = MEMBERSHIP_HERO_SLIDES[currentSlide];
  const nextSlideSrc = hasAdvanced
    ? MEMBERSHIP_HERO_SLIDES[(currentSlide + 1) % MEMBERSHIP_HERO_SLIDES.length].image
    : null;

  const membershipFaqs = FAQS_DATA;

  return (
    <div className="bg-[#07080B] text-[#FAF7F0] pb-16 overflow-x-clip">
      {/* 1. Full-Width Cinematic Moving Membership Hero */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative min-h-[50vh] sm:min-h-[58vh] flex items-center justify-center border-b border-[#1D1F28] pt-14 sm:pt-18 pb-16 overflow-hidden select-none"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0"
          >
            <motion.div
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: 'easeOut' }}
              className="w-full h-full"
            >
              <SmartImage
                src={activeSlide.image}
                alt={activeSlide.alt}
                sizes="100vw"
                priority={currentSlide === 0}
                className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/45 to-[#07080B]/65" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/80 via-transparent to-[#07080B]/65" />
          </motion.div>
        </AnimatePresence>
        {nextSlideSrc && (
          <div aria-hidden="true" className="hidden">
            <SmartImage src={nextSlideSrc} alt="" sizes="100vw" />
          </div>
        )}

        {/* Carousel Slide Indicators & Controls */}
        <div className="absolute bottom-5 right-4 sm:right-6 z-20 flex items-center gap-3 bg-[#08090C]/85 backdrop-blur-md px-3.5 py-1.5 border border-[#8B672B]/45">
          <div className="flex items-center gap-1.5">
            {MEMBERSHIP_HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => {
                  setHasAdvanced(true);
                  setCurrentSlide(idx);
                }}
                className={`h-[3px] transition-all duration-300 cursor-pointer ${
                  idx === currentSlide ? 'w-6 bg-[#CFA85E]' : 'w-2 bg-[#444] hover:bg-[#888]'
                }`}
                aria-label={`Go to slide ${idx + 1}${slide.title ? `: ${slide.title}` : ''}`}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono text-[#E2BA6B] tabular-nums pl-1">
            {String(currentSlide + 1).padStart(2, '0')} / {String(MEMBERSHIP_HERO_SLIDES.length).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1 ml-1 border-l border-[#2B2D3A] pl-2">
            <button
              type="button"
              onClick={() => {
                setHasAdvanced(true);
                setCurrentSlide((prev) => (prev - 1 + MEMBERSHIP_HERO_SLIDES.length) % MEMBERSHIP_HERO_SLIDES.length);
              }}
              className="p-1.5 text-[#B8BECC] hover:text-[#E2BA6B] transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setHasAdvanced(true);
                setCurrentSlide((prev) => (prev + 1) % MEMBERSHIP_HERO_SLIDES.length);
              }}
              className="p-1.5 text-[#B8BECC] hover:text-[#E2BA6B] transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-5">
          <motion.span
            initial={{ opacity: 0.9, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="tglc-kicker text-xs block"
          >
            {t('join.kicker')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#FFFDF7] leading-tight text-balance"
          >
            {t('join.heading')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0.9, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-xl sm:text-3xl text-[#E2BA6B] max-w-3xl mx-auto"
          >
            {t('join.tagline')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0.92, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="tglc-prose text-xs sm:text-base max-w-2xl mx-auto"
          >
            We welcome members by personal introduction so our Mayfair team can give every household genuine attention. Tell us how you live and travel, and we will shape a clear membership around your rhythm.
          </motion.p>

          <div className="pt-2 flex items-center justify-center">
            <button
              onClick={() => openIntroductionModal('Membership Enquiry')}
              className="btn-gold px-8 py-3.5 text-xs flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{t('cta.requestIntroduction')}</span>
              <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 pt-8 sm:pt-10">
        {/* 2. The Three Membership Options */}
        <section className="space-y-8">
          <Reveal className="border-b border-[#1D1F28] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block mb-2">
                {t('join.threeWays')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F2D8A0]">
                {t('join.builtAround')}
              </h2>
            </div>
            <p className="text-xs text-[#B4BCCB] max-w-md font-light">
              Simple, transparent billing, agreed with you before anything is booked.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {MEMBERSHIP_TIERS.map((tier, idx) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`p-8 sm:p-9 flex flex-col justify-between transition-all ${
                  tier.featured
                    ? 'bg-[#12141D] border border-[#B98633]/75 shadow-2xl hover:border-[#CFA85E]'
                    : 'bg-[#0F1117] border border-[#20222E] hover:border-[#8B672B]'
                }`}
              >
                <div className="flex flex-col flex-1">
                  <h3 className="font-serif text-3xl text-[#F4F1EA] mb-2">
                    {tier.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed mb-6 font-light ${
                      tier.featured ? 'text-[#E2BA6B]' : 'text-[#9C968A]'
                    }`}
                  >
                    {tier.summary}
                  </p>

                  <div className="space-y-3 text-xs sm:text-sm text-[#D9D4CA] border-t border-[#242632] pt-6 mb-6 flex-1">
                    {tier.features.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#CFA85E] shrink-0 mt-0.5" />
                        <span className="font-light leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] text-[#CFA85E] italic mb-4 font-serif">
                    Terms are shared after an introduction.
                  </p>
                  <button
                    onClick={() => openIntroductionModal(tier.modalTopic)}
                    className={`${tier.featured ? 'btn-gold py-3.5' : 'btn-outline-gold py-3.5'} w-full text-xs whitespace-nowrap cursor-pointer`}
                  >
                    {t('cta.requestIntroduction')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <GoldDivider />

        {/* 3. Life With TGLC — Levelled Pictorial Diptych */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0.9, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 space-y-5"
          >
            <span className="tglc-kicker text-xs block">
              One Point of Contact
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0] leading-tight text-balance">
              Never explain your preferences twice.
            </h2>
            <div className="space-y-4 text-xs sm:text-sm tglc-prose">
              <p>
                Nothing undermines luxury service faster than having to repeat yourself to a stranger on a headset. At TGLC, you deal with a named lifestyle manager at our Albemarle Street office who genuinely gets to know your taste, your family and how you like your days paced.
              </p>
              <p>
                Whether you prefer a quiet banquette away from the door, particular cabin catering or a house stocked before you touch down in London, those details stay quietly on file — and every supplier cost is always agreed clearly with you before anything is confirmed.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0.9, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch"
          >
            <figure className="flex flex-col bg-[#0D1017] border border-[#242632] overflow-hidden group">
              <div className="aspect-[4/5] overflow-hidden bg-black">
                <SmartImage
                  src="/assets/aistudio/cotswolds_manor_estate.jpg"
                  alt="Country house in the Cotswolds"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 filter brightness-105 contrast-105"
                />
              </div>
              <figcaption className="p-4 text-xs font-serif italic text-[#E2BA6B] leading-relaxed border-t border-[#1D1F28] flex-1">
                Country homes and weekend stays prepared before you arrive.
              </figcaption>
            </figure>

            <figure className="flex flex-col bg-[#0D1017] border border-[#242632] overflow-hidden group">
              <div className="aspect-[4/5] overflow-hidden bg-black">
                <SmartImage
                  src="/assets/aistudio/mayfair_fine_dining.jpg"
                  alt="Mayfair dining room"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 filter brightness-105 contrast-105"
                />
              </div>
              <figcaption className="p-4 text-xs font-serif italic text-[#E2BA6B] leading-relaxed border-t border-[#1D1F28] flex-1">
                Quiet tables and private dining rooms arranged across London.
              </figcaption>
            </figure>
          </motion.div>
        </section>

        {/* 4. Through the Year 3-Photo Strip */}
        <section className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-4 border-b border-[#1D1F28]">
            <div className="lg:col-span-6 space-y-1.5">
              <span className="tglc-kicker text-xs block">
                Year-Round Support
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF7F0]">
                Through every season
              </h2>
            </div>
            <p className="lg:col-span-6 text-xs sm:text-sm tglc-prose">
              From summer events in London to winter travel abroad, we help you plan ahead calmly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                img: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
                season: 'Spring & Coast',
                caption: 'Boats, coastal stays and spring travel planned around your calendar.',
              },
              {
                img: '/assets/aistudio/royal_opera_gallery.jpg',
                season: 'Summer & Culture',
                caption: 'Theatre evenings, exhibitions and summer events in London, subject to availability.',
              },
              {
                img: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
                season: 'Autumn & Winter Travel',
                caption: 'Flights, cars and chalets lined up cleanly for winter breaks.',
              },
            ].map((card, i) => (
              <motion.figure
                key={card.season}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-[#0D1017] border border-[#20222E] overflow-hidden group flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-black">
                  <SmartImage
                    src={card.img}
                    alt={card.season}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                  />
                </div>
                <figcaption className="p-5 space-y-1.5 flex-1 border-t border-[#1D1F28]">
                  <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B] block">{card.season}</span>
                  <p className="text-xs tglc-prose">{card.caption}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        <GoldDivider />

        {/* 5. The 4-Step Induction Journey */}
        <section>
          <div className="border-b border-[#1D1F28] pb-4 mb-6">
            <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block mb-1.5">
              Getting Started
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              How membership begins
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {APPROACH_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="p-6 bg-[#0F1117] border border-[#20222E] hover:border-[#8B672B]/70 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-2xl text-[#CFA85E] block mb-3 tabular-nums">{step.step}</span>
                  <h3 className="font-serif text-lg text-[#F4F1EA] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#9C968A] leading-relaxed font-light">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <GoldDivider />

        {/* 6. Compact Collapsible Membership FAQs */}
        <CollapsibleFaqSection
          items={membershipFaqs}
          kicker="Common Questions"
          heading="Questions about membership"
          previewCount={3}
          viewAllRoute="faq"
          viewAllLabel="View all questions"
          maxWidthClass="max-w-7xl"
          sectionClassName="py-2"
        />

        <GoldDivider />

        {/* 7. Bottom Invitation */}
        <motion.div
          initial={{ opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          className="p-8 sm:p-11 bg-[#101219] border border-[#242632] text-center space-y-5 max-w-3xl mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.24em] text-[#C4933F] block">Get in Touch</span>
          <h3 className="font-serif text-3xl text-[#F4F1EA]">
            Start with a private conversation
          </h3>
          <p className="text-xs sm:text-sm text-[#9C968A] max-w-lg mx-auto leading-relaxed font-light">
            Visit us at 3rd Floor, 45 Albemarle Street, London W1S 4JL, or call us on{' '}
            <span className="text-[#CFA85E] tabular-nums">{TGLC_CONTACT.telephone}</span>.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openIntroductionModal('Membership Enquiry')}
              className="btn-gold px-8 py-3.5 text-xs cursor-pointer"
            >
              {t('cta.requestIntroduction')}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
