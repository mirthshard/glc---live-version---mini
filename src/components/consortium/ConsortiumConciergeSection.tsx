import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Clock, Globe, Phone, ShieldCheck } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { TGLC_CONTACT } from '../../data/tglcData';
import { PageRoute } from '../../types';
import { Link } from '../common/Link';
import { SmartImage } from '../common/SmartImage';
import { GoldDivider } from '../common/GoldDivider';
import { EditorialHeroCarousel } from '../common/EditorialHeroCarousel';
import { CONSORTIUM_SUBPAGE_SLIDES } from '../../utils/carouselSlides';

interface ConciergePillar {
  number: string;
  kicker: string;
  title: string;
  description: string;
  serviceId: string;
  actionLabel: string;
}

const UHNW_CONCIERGE_PILLARS: ConciergePillar[] = [
  {
    number: '01',
    kicker: 'Aviation & Maritime',
    title: 'Private Aviation & Yacht Charters',
    description:
      'Short-notice heavy-jet departures, private FBO tarmac transfers, diplomatic overflight coordination, and crewed Mediterranean or Arabian Gulf superyacht charters.',
    serviceId: 'travel-aviation',
    actionLabel: 'Explore Travel & Aviation',
  },
  {
    number: '02',
    kicker: 'Property & Household',
    title: 'Off-Market Residences & Estates',
    description:
      'Quiet introductions to private Mayfair and Belgravia residences, vetted household staffing, seasonal home preparation, and multi-property management across Europe.',
    serviceId: 'residences-relocation',
    actionLabel: 'Explore Residences',
  },
  {
    number: '03',
    kicker: 'Hospitality & Access',
    title: 'Closed-Door Dining & Global Events',
    description:
      'Last-minute Michelin tables, private chef salons, hospitality suites at Wimbledon, Monaco and Art Basel, and culturally attentive arrangements for visiting families.',
    serviceId: 'dining-nightlife',
    actionLabel: 'Explore Dining & Access',
  },
  {
    number: '04',
    kicker: 'Private Office & Acquisition',
    title: 'Rare Sourcing & Family Office Desk',
    description:
      'Off-catalogue timepieces, bespoke Savile Row commissions, private medical appointments, licensed security introductions, and seamless executive logistics.',
    serviceId: 'luxury-sourcing',
    actionLabel: 'Explore Luxury Sourcing',
  },
];

const GLOBAL_DESK_HUBS = [
  {
    city: 'London',
    window: 'Mayfair Flagship · Albemarle St',
    focus: 'Principal desk, UK residences, private aviation & London Season.',
  },
  {
    city: 'Geneva & Zurich',
    window: 'Central European Desk',
    focus: 'Alpine chalets, private banking travel & Swiss horology sourcing.',
  },
  {
    city: 'Dubai & Riyadh',
    window: 'Gulf & MENA Coverage',
    focus: 'Halal private hospitality, royal-standard family travel & charter.',
  },
  {
    city: 'New York & Singapore',
    window: 'Americas & Asia-Pacific',
    focus: 'Overnight dispatch continuity across every international time zone.',
  },
];

const REVEAL_BLOCK = {
  initial: { opacity: 0.92, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.01 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

export interface ConsortiumConciergeSectionProps {
  variant?: 'embedded' | 'full';
  showPortalLink?: boolean;
}

export const ConsortiumConciergeSection: React.FC<ConsortiumConciergeSectionProps> = ({
  variant = 'embedded',
  showPortalLink = true,
}) => {
  const { openIntroductionModal } = useNavigation();

  const renderCoreBento = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Marquee 24/7 Bespoke Principal Desk Showcase */}
      <motion.div
        {...REVEAL_BLOCK}
        className="lg:col-span-7 bg-[#0D1017] border border-[#242630] overflow-hidden flex flex-col justify-between group"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <SmartImage
            src="/assets/aistudio/private_jet_interior_suite.jpg"
            alt="Private jet cabin arranged by the TGLC 24/7 bespoke concierge desk"
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-[#0D1017]/55 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#E2BA6B]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>24/7 Senior Principal Desk</span>
            </span>
            <span className="text-[#D4D8E2] tabular-nums">Direct Line · {TGLC_CONTACT.telephone}</span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="tglc-kicker text-[11px] block">
              Ultra-High-Net-Worth Lifestyle Management
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F2D8A0] leading-tight">
              One named director, available day and night across every time zone
            </h3>
            <p className="text-sm text-[#B4BCCB] leading-relaxed font-light">
              Complex international lives do not run on office hours. Whether repositioning a long-range jet at midnight,
              preparing a Mayfair townhouse before dawn, or securing an unannounced private viewing in Paris, your dedicated
              TGLC concierge director resolves every detail personally—never through call centres or ticket queues.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1D202A]">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] block">
                Availability
              </span>
              <p className="font-serif text-lg text-[#FAF7F0] tabular-nums">24 Hours / 365 Days</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] block">
                Account Model
              </span>
              <p className="font-serif text-lg text-[#FAF7F0]">1:1 Senior Director</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] block">
                Confidentiality
              </span>
              <p className="font-serif text-lg text-[#FAF7F0]">Private NDA Standard</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => openIntroductionModal('24/7 Bespoke Concierge')}
              className="btn-gold min-h-[44px] px-6 py-3.5 text-xs inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Speak with the Concierge Desk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#07080B]" />
            </button>

            {variant === 'embedded' && showPortalLink ? (
              <Link
                page={'consortium-concierge' as PageRoute}
                className="btn-outline-gold min-h-[44px] px-5 py-3.5 text-xs inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>Explore 24/7 Concierge</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <Link
                page="commission-studio"
                className="btn-outline-gold min-h-[44px] px-5 py-3.5 text-xs inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>Open Commission Studio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {/* Right Column: 4 Numbered Bespoke UHNW Service Pillars */}
      <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {UHNW_CONCIERGE_PILLARS.map((pillar, idx) => (
          <motion.div
            key={pillar.number}
            initial={{ opacity: 0.92, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.45, delay: idx * 0.05 }}
            className="h-full"
          >
            <Link
              page="service-detail"
              params={{ serviceId: pillar.serviceId }}
              className="group p-5 sm:p-6 bg-[#12141A] border border-[#242630] hover:border-[#CFA85E]/80 transition-colors flex flex-col justify-between gap-3 h-full"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#CFA85E]">
                    {pillar.kicker}
                  </span>
                  <span className="font-mono text-xs text-[#8B672B] group-hover:text-[#E2BA6B] transition-colors tabular-nums">
                    {pillar.number}
                  </span>
                </div>
                <h4 className="font-serif text-xl text-[#F2D8A0] group-hover:text-[#FFE7B3] transition-colors leading-snug">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-[13px] text-[#B4BCCB] leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
              <span className="text-xs text-[#E2BA6B] inline-flex items-center gap-1.5 font-medium pt-1">
                <span>{pillar.actionLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (variant === 'embedded') {
    return (
      <section
        id="consortium-concierge"
        aria-labelledby="consortium-concierge-heading"
        className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6"
      >
        <motion.div
          {...REVEAL_BLOCK}
          className="border-b border-[#1D1F28] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="space-y-1.5">
            <span className="tglc-kicker text-[11px] block">Consortium Concierge</span>
            <h2
              id="consortium-concierge-heading"
              className="font-serif text-3xl sm:text-4xl text-[#F2D8A0] leading-tight"
            >
              24/7 bespoke services for ultra-high-net-worth individuals
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#B4BCCB] max-w-md font-light leading-relaxed">
            Private aviation, off-market residences, closed-door hospitality and family office support coordinated
            around the clock from Mayfair.
          </p>
        </motion.div>

        {renderCoreBento()}
      </section>
    );
  }

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* 5-Slide Dedicated Concierge Hero */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <EditorialHeroCarousel
          slides={CONSORTIUM_SUBPAGE_SLIDES.concierge}
          className="min-h-[420px] sm:min-h-[500px] flex items-end border border-[#242630]"
          sizes="(max-width: 1280px) 100vw, 1280px"
          scrimVariant="bottom-left"
          controlsPosition="top-right"
        >
          <motion.div
            initial={{ opacity: 0.01, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-4"
          >
            <span className="tglc-kicker text-[11px] block">
              The Consortium · 24/7 Bespoke Concierge
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
              24/7 Bespoke Concierge for Ultra-High-Net-Worth Individuals
            </h1>
            <p className="tglc-prose text-sm sm:text-base max-w-2xl">
              Around-the-clock personal lifestyle management from 45 Albemarle Street, Mayfair—engineered for
              principals, international households and private family offices who expect precision without friction.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => openIntroductionModal('24/7 Bespoke Concierge')}
                className="btn-gold min-h-[44px] px-7 py-3.5 text-xs inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Request a Private Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#07080B]" />
              </button>
              <a
                href={`tel:${TGLC_CONTACT.internationalPhone.replace(/\s+/g, '')}`}
                className="btn-outline-gold min-h-[44px] px-5 py-3.5 text-xs inline-flex items-center gap-2 whitespace-nowrap tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#E2BA6B]" />
                <span>Call {TGLC_CONTACT.telephone}</span>
              </a>
            </div>
          </motion.div>
        </EditorialHeroCarousel>
      </section>

      {/* Core 24/7 UHNW Bespoke Bento Architecture */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
        <motion.div {...REVEAL_BLOCK} className="border-b border-[#1D1F28] pb-4">
          <span className="tglc-kicker text-[11px] block mb-1">Core Mandates</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F2D8A0]">
            What our 24/7 concierge desk executes
          </h2>
        </motion.div>
        {renderCoreBento()}
      </section>

      <GoldDivider />

      {/* Global Time-Zone Coverage & Protocol Standards */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
        <motion.div
          {...REVEAL_BLOCK}
          className="border-b border-[#1D1F28] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="space-y-1">
            <span className="tglc-kicker text-[11px] block">Continuous Global Coverage</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F2D8A0]">
              Synchronised across principal hubs
            </h2>
          </div>
          <span className="font-mono text-xs text-[#CFA85E] inline-flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>London · Geneva · Dubai · New York · Singapore</span>
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GLOBAL_DESK_HUBS.map((hub, idx) => (
            <motion.div
              key={hub.city}
              initial={{ opacity: 0.92, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="p-6 bg-[#0D1017] border border-[#242630] space-y-3"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] block">
                {hub.window}
              </span>
              <h3 className="font-serif text-2xl text-[#F2D8A0]">{hub.city}</h3>
              <p className="text-xs sm:text-sm text-[#B4BCCB] leading-relaxed font-light">{hub.focus}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Paired Editorial Photography: Private Office & Bespoke Arrival */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <motion.div {...REVEAL_BLOCK} className="overflow-hidden border border-[#242630] bg-[#12141A] group">
          <div className="aspect-[16/10] w-full overflow-hidden">
            <SmartImage
              src="/assets/aistudio/membership_sovereign_desk.jpg"
              alt="Private concierge desk in Mayfair prepared for principal consultations"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
            />
          </div>
          <div className="p-6 space-y-2 border-t border-[#222530]">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E2BA6B] block">
              Family Office Integration
            </span>
            <h3 className="font-serif text-2xl text-[#F2D8A0]">
              <span className="card-title-underline">Direct liaison with your chiefs of staff</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#B4BCCB] font-light leading-relaxed">
              We coordinate directly alongside personal assistants, estate managers, aviation flight departments and
              private bankers with consolidated monthly reporting.
            </p>
          </div>
        </motion.div>

        <motion.div {...REVEAL_BLOCK} className="overflow-hidden border border-[#242630] bg-[#12141A] group">
          <div className="aspect-[16/10] w-full overflow-hidden">
            <SmartImage
              src="/assets/aistudio/rolls-cullian-featured_a41abfa9.webp"
              alt="Chauffeur-driven Rolls-Royce awaiting arrival in Mayfair"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
            />
          </div>
          <div className="p-6 space-y-2 border-t border-[#222530]">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E2BA6B] block">
              Discreet Execution
            </span>
            <h3 className="font-serif text-2xl text-[#F2D8A0]">
              <span className="card-title-underline">Seamless door-to-door logistics</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#B4BCCB] font-light leading-relaxed">
              From airside arrivals at Farnborough to private security briefings and vetted chauffeurs, every movement
              is rehearsed ahead of schedule.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Bottom Conversion Banner with Existing Gold Button Design */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          {...REVEAL_BLOCK}
          className="p-8 sm:p-10 bg-[#12141A] border border-[#2A2D38] flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#CFA85E] inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Private Admissions · By Introduction</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F2D8A0]">
              Arrange a confidential briefing with our Mayfair desk
            </h3>
            <p className="text-xs sm:text-sm text-[#B4BCCB] font-light leading-relaxed">
              Share your household, travel or family office priorities. A senior TGLC director will respond privately
              to discuss how our 24/7 bespoke concierge membership can support you.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openIntroductionModal('24/7 Bespoke Concierge')}
            className="btn-gold min-h-[44px] px-7 py-3.5 text-xs inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Request an introduction</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#07080B]" />
          </button>
        </motion.div>
      </section>
    </div>
  );
};
