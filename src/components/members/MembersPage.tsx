import React from 'react';
import { motion } from 'motion/react';
import { Phone, ArrowUpRight, MapPin, Mail, Clock, Compass } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { Link } from '../common/Link';
import { EditorialHeroCarousel } from '../common/EditorialHeroCarousel';
import { MEMBERS_HERO_SLIDES } from '../../utils/carouselSlides';
import { ConsortiumConciergeSection } from '../consortium/ConsortiumConciergeSection';

export const MembersPage: React.FC = () => {
  const { openIntroductionModal } = useNavigation();

  return (
    <div className="bg-[#08090C] text-[#F4F1EA] pt-24 sm:pt-28 pb-16 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
        {/* 5-Slide Hero Carousel */}
        <EditorialHeroCarousel
          slides={MEMBERS_HERO_SLIDES}
          className="min-h-[380px] sm:min-h-[440px] flex items-end border border-[#242630]"
          sizes="(max-width: 1280px) 100vw, 1280px"
          scrimVariant="bottom-left"
          controlsPosition="bottom-right"
        >
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 p-6 sm:p-10 pb-16 sm:pb-12 max-w-3xl space-y-5"
          >
            <span className="tglc-kicker text-[11px] block">
              Mayfair Direct Desk
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F4F1EA] leading-[1.06]">
              Members
            </h1>
            <p className="text-sm sm:text-base text-[#D9D4CA] leading-relaxed font-light max-w-xl">
              Already a member? Contact your lifestyle manager directly, or reach our Mayfair office on {TGLC_CONTACT.telephone}.
            </p>
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a
                href={`tel:${TGLC_CONTACT.internationalPhone.replace(/\s+/g, '')}`}
                className="btn-gold min-h-[44px] px-6 py-3.5 text-xs inline-flex items-center gap-2 whitespace-nowrap tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#08090C]" />
                <span>Call {TGLC_CONTACT.telephone}</span>
              </a>
              <button
                type="button"
                onClick={() => openIntroductionModal('Membership Introduction')}
                className="min-h-[44px] text-xs sm:text-sm text-[#E2BA6B] hover:text-[#FAF7F0] transition-colors inline-flex items-center gap-1.5 underline underline-offset-4 decoration-[#8B672B] hover:decoration-[#E2BA6B] cursor-pointer"
              >
                <span>Not a member yet? Request an introduction</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </EditorialHeroCarousel>

        {/* Direct Desk Contact Details */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-7 bg-[#0D1017] border border-[#242630] flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#CFA85E] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>Direct Telephone</span>
              </span>
              <h2 className="font-serif text-2xl text-[#FAF7F0] tabular-nums">
                {TGLC_CONTACT.telephone}
              </h2>
              <p className="text-xs sm:text-sm text-[#B8BECC] leading-relaxed font-light">
                Speak directly with our Mayfair office for bookings, travel changes or urgent arrangements.
              </p>
            </div>
            <a
              href={`tel:${TGLC_CONTACT.internationalPhone.replace(/\s+/g, '')}`}
              className="min-h-[40px] text-xs text-[#E2BA6B] hover:text-white inline-flex items-center gap-1.5 font-medium transition-colors"
            >
              <span>Call the desk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-6 sm:p-7 bg-[#0D1017] border border-[#242630] flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#CFA85E] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Mayfair Office</span>
              </span>
              <h2 className="font-serif text-2xl text-[#FAF7F0]">
                45 Albemarle Street
              </h2>
              <p className="text-xs sm:text-sm text-[#B8BECC] leading-relaxed font-light">
                3rd Floor, 45 Albemarle Street, London W1S 4JL. Visits by appointment during office hours.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#9C968A]">
              <Clock className="w-3.5 h-3.5 text-[#CFA85E] shrink-0" />
              <span>{TGLC_CONTACT.hours}</span>
            </div>
          </div>

          <div className="p-6 sm:p-7 bg-[#0D1017] border border-[#242630] flex flex-col justify-between space-y-4">
            <div className="space-y-2 min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#CFA85E] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>Email & Briefs</span>
              </span>
              <h2 className="font-serif text-2xl text-[#FAF7F0]">
                Written requests
              </h2>
              <p className="text-xs sm:text-sm text-[#B8BECC] leading-relaxed font-light">
                Send itineraries or brief notes straight to your manager, or outline a new plan in the Commission Studio.
              </p>
            </div>
            <a
              href={`mailto:${TGLC_CONTACT.email}`}
              className="min-h-[40px] text-xs text-[#E2BA6B] hover:text-white inline-flex items-center gap-1.5 font-medium transition-colors break-words"
            >
              <span>{TGLC_CONTACT.email}</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </section>

        <GoldDivider />

        {/* 24/7 Bespoke Concierge Section */}
        <div className="-mx-5 sm:-mx-8">
          <ConsortiumConciergeSection variant="embedded" />
        </div>

        <GoldDivider />

        {/* Quick Links for Members */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              page: 'services' as const,
              kicker: 'Practice Areas',
              title: 'All Services',
              desc: 'Browse travel, dining, homes, transport, culture and sourcing.',
            },
            {
              page: 'commission-studio' as const,
              kicker: 'Plan Ahead',
              title: 'Commission Studio',
              desc: 'Outline a trip, dinner or evening for your manager to coordinate.',
            },
            {
              page: 'calendar' as const,
              kicker: 'The Season',
              title: 'London Calendar',
              desc: 'Key sporting, cultural and seasonal dates across the year.',
            },
            {
              page: 'membership' as const,
              kicker: 'Membership',
              title: 'Membership Overview',
              desc: 'Learn about London, Global and Family Office arrangements.',
            },
          ].map((item) => (
            <Link
              key={item.page}
              page={item.page}
              className="group p-5 bg-[#0D1017] border border-[#222532] hover:border-[#CFA85E]/70 transition-colors flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] flex items-center gap-1.5">
                  <Compass className="w-3 h-3" />
                  <span>{item.kicker}</span>
                </span>
                <h3 className="font-serif text-xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9C968A] leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
              <span className="text-xs text-[#E2BA6B] inline-flex items-center gap-1 font-medium">
                <span>Explore</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};
