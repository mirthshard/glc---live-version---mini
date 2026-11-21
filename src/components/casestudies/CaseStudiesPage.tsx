import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { GoldDivider } from '../common/GoldDivider';
import { SmartImage } from '../common/SmartImage';
import { Reveal } from '../common/Reveal';
import { EditorialHeroCarousel } from '../common/EditorialHeroCarousel';
import { SIGNATURE_EXPERIENCES_HERO_SLIDES } from '../../utils/carouselSlides';
import { Compass, ArrowUpRight, Search } from 'lucide-react';

export type ExperienceTag = 'Travel' | 'Culture' | 'Sport' | 'Dining' | 'Celebrations';

export interface SignatureExperience {
  id: string;
  title: string;
  tag: ExperienceTag;
  summary: string;
  image: string;
}

export const SIGNATURE_EXPERIENCES: SignatureExperience[] = [
  {
    id: 'exp-01',
    title: 'Monaco Grand Prix Weekend',
    tag: 'Sport',
    summary:
      'We can help arrange race viewing, hotel stays, transfers and restaurant tables for the weekend, subject to availability.',
    image: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
  },
  {
    id: 'exp-02',
    title: 'Evening at the Royal Opera House',
    tag: 'Culture',
    summary:
      'We can help arrange seats or boxes, pre-theatre suppers and waiting cars in Covent Garden, subject to availability.',
    image: '/assets/aistudio/royal_opera_box_1794391694654.jpg',
  },
  {
    id: 'exp-03',
    title: 'Goodwood Revival Hospitality Weekend',
    tag: 'Sport',
    summary:
      'We can help arrange hospitality passes, period tailoring and return travel to Sussex, subject to availability.',
    image: '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp',
  },
  {
    id: 'exp-04',
    title: 'Cotswolds Country House Retreat',
    tag: 'Travel',
    summary:
      'We can help arrange a private estate stay, local private chef and return transfers, subject to availability.',
    image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
  },
  {
    id: 'exp-05',
    title: 'Savile Row & Watchmaking Appointments',
    tag: 'Culture',
    summary:
      'We can help arrange private Mayfair tailoring fittings alongside quiet watch showroom viewings, subject to availability.',
    image: '/assets/aistudio/savile_row_bespoke.jpg',
  },
  {
    id: 'exp-06',
    title: 'Ringside at a major fight night',
    tag: 'Sport',
    summary:
      'We can help arrange ringside seats, pre-fight dining and return chauffeurs at licensed London bouts, subject to availability.',
    image: '/assets/aistudio/ufc_arena_ringside.jpg',
  },
  {
    id: 'exp-07',
    title: 'Saint-Tropez to Verbier Seasonal Move',
    tag: 'Travel',
    summary:
      'We can help coordinate licensed flights, alpine transfers and pre-stocked chalet arrivals, subject to availability.',
    image: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
  },
  {
    id: 'exp-08',
    title: 'Soho Late-Night Jazz Evening',
    tag: 'Dining',
    summary:
      'We can help arrange dinner nearby, prime jazz tables and a waiting car home, subject to availability.',
    image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
  },
  {
    id: 'exp-09',
    title: 'Geneva to Florence Supercar Tour',
    tag: 'Travel',
    summary:
      'We can help arrange alpine driving routes, lakeside stays and restaurant tables across Italy, subject to availability.',
    image: '/assets/aistudio/01_BUGATTI-SOC2022_6775a49f.jpg',
  },
  {
    id: 'exp-10',
    title: 'Tower Bridge Private Event Evening',
    tag: 'Celebrations',
    summary:
      'We can help arrange licensed private hire, catering and river transfers at London landmarks, subject to availability.',
    image: '/assets/aistudio/tower_bascule_vault_1794391687426.jpg',
  },
  {
    id: 'exp-11',
    title: 'Frieze Art Week in London',
    tag: 'Culture',
    summary:
      'We can help arrange fair passes, gallery schedules, drivers and evening dining across London, subject to availability.',
    image: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
  },
  {
    id: 'exp-12',
    title: 'Dinner in a historic City vault',
    tag: 'Dining',
    summary:
      'We can help arrange private hire, seasonal menus and wine pairings in a licensed vault, subject to availability.',
    image: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg',
  },
];

const TAGS: ('All' | ExperienceTag)[] = [
  'All',
  'Travel',
  'Culture',
  'Sport',
  'Dining',
  'Celebrations',
];

export const CaseStudiesPage: React.FC = () => {
  const { openIntroductionModal } = useNavigation();
  const [selectedTag, setSelectedTag] = useState<'All' | ExperienceTag>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = SIGNATURE_EXPERIENCES.filter((item) => {
    const matchesTag = selectedTag === 'All' || item.tag === selectedTag;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q);
    return matchesTag && matchesQuery;
  });

  return (
    <div className="bg-[#07080B] text-[#FAF7F0] min-h-screen pb-16">
      {/* 1. Hero Carousel */}
      <EditorialHeroCarousel
        slides={SIGNATURE_EXPERIENCES_HERO_SLIDES}
        sizes="100vw"
        scrimVariant="centered"
        controlsPosition="bottom-right"
        className="min-h-[44vh] sm:min-h-[52vh] flex items-center justify-center pt-14 sm:pt-18 pb-18 border-b border-[#202530]"
      >
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 mb-1">
            <Compass className="w-3.5 h-3.5 text-[#E2BA6B]" />
            <span className="tglc-kicker">Ideas & Inspiration</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FAF7F0] tracking-wide font-light leading-tight">
            Signature Experiences
          </h1>

          <p className="tglc-prose text-sm sm:text-base max-w-2xl mx-auto text-[#D4D8E2]">
            Examples of what&apos;s possible. Availability varies and every plan is tailored to you.
          </p>
        </div>
      </EditorialHeroCarousel>

      {/* 2. Filter Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <div className="bg-[#0D1017] border border-[#202530] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {TAGS.map((tag) => {
              const isActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`min-h-[42px] px-3.5 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap border shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#131722] text-[#E2BA6B] border-[#E2BA6B]/70 font-medium'
                      : 'bg-[#0D1017] text-[#8F98AA] border-transparent hover:border-[#2C3140] hover:text-[#FAF7F0]'
                  }`}
                >
                  {tag}
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
              placeholder="Filter experiences..."
              className="w-full pl-8.5 pr-3 py-2 bg-[#131722] border border-[#252D3C] text-xs font-mono text-[#FAF7F0] focus:outline-none focus:border-[#E2BA6B]"
            />
          </div>
        </div>

        {/* 3. Signature Experiences Grid */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center bg-[#0D1017] border border-[#202530] space-y-4">
            <p className="font-serif text-xl text-[#FAF7F0]">No experiences match that filter.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedTag('All');
                setSearchQuery('');
              }}
              className="btn-outline-gold px-5 py-2.5 text-xs cursor-pointer"
            >
              Show all experiences
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                whileHover={{ y: -4 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(idx * 0.04, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-[#0D1017] border border-[#202530] hover:border-[#E2BA6B]/60 transition-colors duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#131722]">
                    <SmartImage
                      src={item.image}
                      alt={item.title}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-transparent to-transparent" />
                  </div>

                  <div className="p-6 space-y-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E2BA6B] block">
                      {item.tag}
                    </span>

                    <h2 className="font-serif text-xl sm:text-2xl text-[#FAF7F0] font-normal group-hover:text-[#E2BA6B] transition-colors leading-snug">
                      <span className="card-title-underline">{item.title}</span>
                    </h2>

                    <p className="text-xs sm:text-sm text-[#D4D8E2] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-3 border-t border-[#181D26] space-y-3">
                  <button
                    type="button"
                    onClick={() => openIntroductionModal(`Enquiry: ${item.title}`)}
                    className="min-h-[40px] text-xs font-mono uppercase tracking-wider text-[#E2BA6B] hover:text-[#FAF7F0] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Ask about this</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="block h-[1px] w-full bg-[#191C26] overflow-hidden">
                    <span className="block h-full w-full scale-x-0 group-hover:scale-x-100 origin-left bg-gradient-to-r from-[#8B672B] via-[#E2BA6B] to-[#C4933F] transition-transform duration-500" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* 4. Footer CTA */}
      <div className="mt-14">
        <GoldDivider />
      </div>
      <section className="pt-12 px-5 sm:px-8 max-w-3xl mx-auto text-center space-y-4">
        <Reveal className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0]">
            Have something in mind? Tell us.
          </h2>
          <p className="text-sm text-[#D4D8E2] max-w-xl mx-auto leading-relaxed">
            Share your dates, location and preferences, and our Mayfair team will explore what can be arranged.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => openIntroductionModal('Signature Experiences enquiry')}
              className="btn-gold px-7 py-3.5 text-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Have something in mind? Tell us.</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
