import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { FAQS_DATA, TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { SmartImage } from '../common/SmartImage';
import { Reveal } from '../common/Reveal';
import { EditorialHeroCarousel } from '../common/EditorialHeroCarousel';
import { FAQ_HERO_SLIDES } from '../../utils/carouselSlides';
import { Search, ChevronDown, ArrowUpRight } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { openIntroductionModal } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const filteredFaqs = FAQS_DATA.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
  });

  return (
    <div className="bg-[#07080B] text-[#FAF7F0] pt-24 sm:pt-28 pb-14 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-10">
        {/* Cinematic 5-Slide Photographic Hero */}
        <EditorialHeroCarousel
          slides={FAQ_HERO_SLIDES}
          className="min-h-[340px] sm:min-h-[410px] flex items-end border border-[#242630]"
          sizes="(max-width: 1152px) 100vw, 1152px"
          scrimVariant="bottom-left"
          controlsPosition="bottom-right"
        >
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10 p-6 sm:p-10 pb-16 sm:pb-12 max-w-4xl space-y-3"
          >
            <span className="tglc-kicker text-[11px] block">
              Questions & Answers
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] leading-[1.06] text-balance">
              Frequently asked questions
            </h1>
            <p className="tglc-prose text-xs sm:text-base max-w-2xl">
              Clear, candid answers about how membership works, how our Mayfair desk protects your privacy and what daily life with TGLC actually feels like.
            </p>
          </motion.div>
        </EditorialHeroCarousel>

        {/* Search & Expand All Toolbar */}
        <div className="border-y border-[#20232E] py-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E2BA6B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full h-11 bg-[#0D1017] border border-[#242630] focus:border-[#E2BA6B] pl-11 pr-4 text-xs sm:text-sm text-[#FAF7F0] placeholder-[#8E95A5] focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                const allVisibleIds = filteredFaqs.map((f) => f.id);
                const allExpanded =
                  allVisibleIds.length > 0 &&
                  allVisibleIds.every((id) => expandedIds.includes(id));
                setExpandedIds(allExpanded ? [] : allVisibleIds);
              }}
              className="h-11 px-5 text-xs tracking-wide border border-[#2A2D38] hover:border-[#E2BA6B] bg-[#0D1017] text-[#E2BA6B] hover:text-[#FAF7F0] transition-colors whitespace-nowrap shrink-0"
            >
              {filteredFaqs.length > 0 &&
              filteredFaqs.every((f) => expandedIds.includes(f.id))
                ? 'Collapse all'
                : 'Expand all'}
            </button>
          </div>
        </div>

        {/* Compact Collapsible Hairline Accordion */}
        {filteredFaqs.length === 0 ? (
          <div className="py-10 text-center text-xs text-[#D4D8E2] bg-[#0D1017] border border-[#242630]">
            No questions matched your search. Email us at {TGLC_CONTACT.email} or call {TGLC_CONTACT.telephone}.
          </div>
        ) : (
          <div className="bg-[#0D1017] border border-[#242630] divide-y divide-[#1D202B]">
            <div className="px-5 py-3 bg-[#0A0C12] flex items-center justify-between text-[11px] font-mono text-[#8F98AA] tabular-nums">
              <span>{filteredFaqs.length} questions · Select any question to read</span>
              <span>{expandedIds.length} open</span>
            </div>
            {filteredFaqs.map((faq) => {
              const isOpen = expandedIds.includes(faq.id);
              const qNum = String(FAQS_DATA.findIndex((item) => item.id === faq.id) + 1).padStart(2, '0');
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setExpandedIds((prev) =>
                        prev.includes(faq.id)
                          ? prev.filter((id) => id !== faq.id)
                          : [...prev, faq.id]
                      )
                    }
                    className="w-full min-h-[50px] text-left px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-[#11151F]/70 transition-colors cursor-pointer"
                  >
                    <div className="flex items-baseline gap-3.5 min-w-0">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#CFA85E] tabular-nums shrink-0">
                        Q{qNum}
                      </span>
                      <h3
                        className={`font-serif text-lg sm:text-xl leading-snug text-balance transition-colors ${
                          isOpen ? 'text-[#E2BA6B]' : 'text-[#FAF7F0]'
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#E2BA6B] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                      >
                        <div className="px-5 pb-4 pt-3 pl-11 sm:pl-14 border-t border-[#181B24] bg-[#090B10]">
                          <p className="border-l border-[#CFA85E]/45 pl-3.5 text-[13px] sm:text-sm text-[#D2D6E0] leading-[1.75] font-light max-w-3xl">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        <GoldDivider />

        {/* Four Photography Panels in Two Balanced Diptychs */}
        <section className="space-y-6">
          <Reveal className="max-w-3xl space-y-1.5">
            <span className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] block">
              How We Help
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              Across London and abroad
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                img: '/assets/aistudio/cotswolds_manor_estate.jpg',
                alt: 'English country house',
                tag: 'Homes & Stays',
                title: 'Townhouses and country stays',
                desc: 'We help arrange London stays, country weekends and household support from one point of contact.',
              },
              {
                img: '/assets/aistudio/bond_street_jewellery.jpg',
                alt: 'Fine jewellery on Bond Street',
                tag: 'Sourcing & Gifts',
                title: 'Hard-to-find pieces and gifts',
                desc: 'Tell us what you are looking for. We track it down and agree every cost before anything is ordered.',
              },
              {
                img: '/assets/aistudio/6a194620490b49214619b628_file_8wpx83o3_8d7f9f53.png',
                alt: 'Private aircraft cabin',
                tag: 'Travel & Aviation',
                title: 'Flights, transfers and itineraries',
                desc: 'We coordinate flights, chauffeurs and hotels together so every trip runs smoothly.',
              },
              {
                img: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
                alt: 'Mechanical watches',
                tag: 'Private Appointments',
                title: 'Watches, tailoring and viewings',
                desc: 'We arrange private appointments with makers, tailors and specialists, subject to availability.',
              },
            ].map((panel, idx) => (
              <motion.div
                key={panel.title}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-[#0D1017] border border-[#242630] hover:border-[#8B672B] transition-colors overflow-hidden group"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src={panel.img}
                    alt={panel.alt}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] uppercase tracking-widest text-[#E2BA6B]">{panel.tag}</span>
                  <h3 className="font-serif text-2xl text-[#FAF7F0]">
                    <span className="card-title-underline">{panel.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm tglc-prose">{panel.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <GoldDivider />

        {/* Still Have Questions Banner */}
        <motion.div
          initial={{ opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.55 }}
          className="p-8 sm:p-10 bg-[#0D1017] border border-[#242630] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
              Still have a question?
            </h3>
            <p className="text-xs sm:text-sm text-[#D4D8E2] mt-1.5 max-w-xl font-light tabular-nums">
              {TGLC_CONTACT.address.toString()} · {TGLC_CONTACT.telephone} · {TGLC_CONTACT.email} · {TGLC_CONTACT.hours}
            </p>
          </div>
          <button
            onClick={() => openIntroductionModal('General Question')}
            className="btn-gold px-7 py-3.5 text-xs whitespace-nowrap shrink-0 inline-flex items-center gap-2"
          >
            <span>Request an introduction</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
