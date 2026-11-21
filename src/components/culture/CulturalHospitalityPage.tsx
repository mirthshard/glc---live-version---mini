import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Compass, Globe, ShieldCheck, Utensils, Home, Sparkles } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { Link } from '../common/Link';
import { SmartImage } from '../common/SmartImage';
import { Reveal } from '../common/Reveal';
import { CollapsibleFaqSection, CollapsibleFaqItem } from '../common/CollapsibleFaqSection';

const ISLAMIC_HOSPITALITY_PILLARS = [
  {
    index: '01',
    icon: Utensils,
    title: 'Certified Halal Fine Dining & Private Chefs',
    summary:
      'We work with Michelin-trained private chefs and trusted Mayfair, Knightsbridge and Belgravia kitchens to verify certified halal sourcing, separate preparation utensils and strictly alcohol-free private dining rooms.',
  },
  {
    index: '02',
    icon: Sparkles,
    title: 'Ramadan, Iftar, Suhoor & Eid in London',
    summary:
      'During Ramadan and Eid, we adjust the entire rhythm of your stay — arranging sunset Iftar tables with Medjool dates and Arabic coffee, quiet pre-dawn Suhoor in your residence, and private family Eid celebrations.',
  },
  {
    index: '03',
    icon: Home,
    title: 'Family Privacy & Modest Spaces',
    summary:
      'From interconnecting Mayfair suites and private-entrance Belgravia townhouses to secluded pool or spa buyouts, we plan every space around family privacy, with female chauffeurs, therapists and house staff on request.',
  },
  {
    index: '04',
    icon: Compass,
    title: 'Prayer Spaces & Daily Observance',
    summary:
      'Before you arrive at a hotel suite, residence or private yacht, we coordinate quiet prayer areas with fresh prayer mats, accurate Qibla orientation, comfortable ablution facilities and smooth Friday Jumu’ah transfers.',
  },
  {
    index: '05',
    icon: ShieldCheck,
    title: 'Private Shopping & Modest Couture',
    summary:
      'Closed-door viewing rooms on Bond Street, Mount Street and in Knightsbridge for bespoke modest tailoring, couture, fine jewellery and thoughtful seasonal gifting — all delivered privately to your door.',
  },
  {
    index: '06',
    icon: Globe,
    title: 'Alcohol-Free Hospitality & Travel',
    summary:
      'Private aircraft cabins, yachts, chauffeur vehicles and residence pantries are prepared strictly to your household standards, featuring artisanal zero-proof botanical pairings, heritage teas and seasonal fruits.',
  },
] as const;

const GLOBAL_TRADITIONS = [
  {
    number: '01',
    title: 'Jewish & Kosher Observance',
    summary:
      'Kosher-certified private catering, Shabbat-conscious suite and townhouse preparations (including manual key access and lighting arrangements) and private family milestone gatherings across London.',
  },
  {
    number: '02',
    title: 'Hindu, Jain & Sattvic Dining',
    summary:
      'Strictly vegetarian, egg-free, onion-and-garlic-free or Jain-compliant private chefs, calm residence preparations for Diwali and family celebrations, and multigenerational estate weekends.',
  },
  {
    number: '03',
    title: 'Sikh & South Asian Hospitality',
    summary:
      'Warm, family-centred arrangements for visiting relatives, milestone anniversaries, private London dining rooms and bespoke tailoring or fine jewellery appointments.',
  },
  {
    number: '04',
    title: 'East Asian Etiquette & Seasons',
    summary:
      'Thoughtful hosting attuned to Japanese, Chinese and Korean etiquette — from private tea salons and Lunar New Year gatherings to discreet seasonal gifting and quiet arrival logistics.',
  },
  {
    number: '05',
    title: 'Orthodox, Christian & European Heritage',
    summary:
      'Seasonal family observances, winter and Easter country house stays, private concerts and dining tables shaped respectfully around your calendar and dietary wishes.',
  },
  {
    number: '06',
    title: 'Multilingual Mayfair Coordination',
    summary:
      'We welcome families visiting England from across the Middle East, Asia, Europe and the Americas, coordinating quietly with your household staff in the language you prefer.',
  },
] as const;

const PREPARATION_STEPS = [
  {
    step: '01',
    title: 'Private Household Brief',
    description:
      'Before you travel, we note your dietary standards, prayer or observance timings, staffing preferences and privacy needs once — so you never have to repeat them.',
  },
  {
    step: '02',
    title: 'Advance Venue & Kitchen Checks',
    description:
      'We speak directly with hotel directors, head chefs, flight coordinators and house teams ahead of arrival to verify halal or dietary sourcing, room layouts and alcohol-free setups.',
  },
  {
    step: '03',
    title: 'Quiet Care Throughout Your Stay',
    description:
      'From touchdown in London to your final departure, your dedicated lifestyle manager handles every adjustment discreetly so your family can simply feel at home.',
  },
] as const;

const CULTURAL_FAQS: CollapsibleFaqItem[] = [
  {
    id: 'cult-faq-1',
    question: 'How do you arrange certified halal dining in Mayfair and central London?',
    answer:
      'We work with private chefs and established London dining rooms that can confirm certified halal meat sourcing in advance, prepare dishes with dedicated cookware and offer private rooms free from alcohol on request. Where a restaurant requires advance notice to bring in certified halal cuts, we coordinate directly with the kitchen well before you arrive.',
  },
  {
    id: 'cult-faq-2',
    question: 'Can TGLC plan a full Ramadan or Eid stay in London?',
    answer:
      'Yes. We align your entire London schedule to Ramadan hours — arranging sunset Iftar dinners in private suites or dining rooms, fresh Suhoor service before Fajr, late-evening chauffeur standbys for Taraweeh prayers, and calm family Eid gatherings with seasonal floral styling and curated gifting.',
  },
  {
    id: 'cult-faq-3',
    question: 'Can you provide female-only chauffeurs, wellness therapists and house staff?',
    answer:
      'Yes, with advance notice we can arrange female chauffeurs, female private trainers and spa therapists, and female household or styling assistants, subject to availability. We also arrange private buyouts of wellness suites and pools so families can relax in complete privacy.',
  },
  {
    id: 'cult-faq-4',
    question: 'Will our hotel suite, residence or private flight be prepared completely alcohol-free?',
    answer:
      'Whenever requested, we instruct hotels, private residences, yacht crews and flight operators before your arrival to clear minibars and wine displays completely, replacing them with fine spring water, Medjool dates, artisanal Arabic or herbal teas and crafted zero-proof pairings.',
  },
  {
    id: 'cult-faq-5',
    question: 'Do you prepare prayer spaces and Qibla direction ahead of arrival?',
    answer:
      'Yes. We can quietly arrange a dedicated prayer corner in your hotel suite or London residence with clean prayer mats, accurate Qibla orientation and daily prayer timetables, as well as seamless chauffeur transfers for Friday Jumu’ah prayers near Mayfair or Regent’s Park.',
  },
  {
    id: 'cult-faq-6',
    question: 'How do you accommodate families travelling with multiple generations and staff?',
    answer:
      'We frequently look after extended families visiting London for summer stays, schooling or celebrations. We source adjoining townhouse wings or private-floor hotel suites, coordinate nannies and travelling staff accommodation, and keep day-to-day cars and meals running smoothly.',
  },
  {
    id: 'cult-faq-7',
    question: 'Do you also cater to Kosher, Hindu, Jain, Sikh and other cultural traditions?',
    answer:
      'Warmly and thoroughly. Every household has its own customs, and we respect all faiths and cultural traditions equally — from Kosher-certified dining and Shabbat suite arrangements to strict Jain or Sattvic vegetarian private chefs, Sikh family celebrations and East Asian hosting etiquette.',
  },
  {
    id: 'cult-faq-8',
    question: 'Can you arrange private shopping for modest couture and fine jewellery?',
    answer:
      'Yes. We organise closed-door private appointments in Mayfair, Bond Street and Knightsbridge suites — or bring pieces and tailors directly to your residence — so you and your family can view collections in quiet comfort without public footfall.',
  },
  {
    id: 'cult-faq-9',
    question: 'How is our family’s privacy protected when sharing cultural or religious preferences?',
    answer:
      'Your preferences stay strictly inside your personal household profile with your Mayfair lifestyle manager. We share only the practical instructions a kitchen, hotel or driver needs to serve you properly, and we never discuss client families publicly.',
  },
  {
    id: 'cult-faq-10',
    question: 'How far in advance should we share our cultural or seasonal requirements?',
    answer:
      'The earlier you let us know, the wider the choice of private residences, specialist chefs and bespoke dining rooms — particularly during Ramadan, Eid, London summer stays and Diwali. Even for short-notice visits, call our Mayfair desk and we will tell you honestly what can be arranged.',
  },
];

export const CulturalHospitalityPage: React.FC = () => {
  const { openIntroductionModal, t } = useNavigation();

  return (
    <div className="bg-[#07080B] text-[#FAF7F0] pt-24 sm:pt-28 pb-16 overflow-hidden">
      {/* 1. Editorial Hero */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-12 sm:pb-16">
        <div className="relative min-h-[420px] sm:min-h-[520px] flex items-end overflow-hidden border border-[#242630] bg-[#0D1017] shadow-2xl">
          <motion.div
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <SmartImage
              src="/assets/aistudio/cultural_iftar_mayfair_salon.jpg"
              alt="Candlelit Georgian Mayfair private dining salon prepared for an elegant Ramadan Iftar evening"
              sizes="100vw"
              priority
              className="w-full h-full object-cover object-center brightness-105 contrast-105"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/55 to-[#07080B]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/85 via-[#07080B]/30 to-transparent" />

          <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#CFA85E] block">
              Cultural & Faith Hospitality · Mayfair, London
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] text-[#F2D8A0] leading-[1.1]">
              Islamic, Muslim & global traditions, quietly honoured.
            </h1>
            <p className="text-sm sm:text-base text-[#D4D8E2] leading-relaxed font-light max-w-2xl">
              London welcomes families from every part of the world. From certified halal fine dining, Ramadan Iftar and family-private Mayfair suites to Kosher, Hindu, Jain, Sikh and East Asian customs, we shape every stay with genuine respect for your traditions.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => openIntroductionModal('Cultural & Islamic Hospitality')}
                className="btn-gold px-6 py-3.5 text-xs inline-flex items-center gap-2 min-h-[44px] cursor-pointer"
              >
                <span>{t('cta.requestIntroduction')}</span>
                <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
              </button>
              <Link
                page="commission-studio"
                className="btn-outline-gold px-6 py-3.5 text-xs bg-[#08090C]/75 backdrop-blur-sm min-h-[44px] inline-flex items-center"
              >
                {t('cta.startPlanning')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 2. Dedicated Islamic & Muslim Traditions Section */}
      <section id="islamic-traditions" className="py-12 sm:py-16 px-5 sm:px-8 bg-[#08090C] border-b border-[#1A1C24]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#CFA85E] block">
                Islamic & Muslim Hospitality
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F2D8A0] leading-tight">
                Thoughtful London stays shaped around Muslim life.
              </h2>
              <p className="text-sm text-[#B4BCCB] leading-relaxed font-light">
                Whether you visit London from the Gulf, South Asia, Southeast Asia, Europe or North America, our Mayfair desk plans every detail around Islamic values — never as an afterthought, and always with calm discretion.
              </p>
              <p className="text-sm text-[#B4BCCB] leading-relaxed font-light">
                From halal culinary verification and alcohol-free suites to family privacy, prayer preparation and Ramadan hospitality, we brief kitchens, residences and drivers ahead of time so nothing feels awkward or improvised.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0D1017] border border-[#222532] overflow-hidden flex flex-col">
                <div className="aspect-[4/3] overflow-hidden bg-[#131722]">
                  <SmartImage
                    src="/assets/aistudio/cultural_halal_gastronomy.jpg"
                    alt="Certified halal fine dining dish with non-alcoholic botanical pairing in Mayfair"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="w-full h-full object-cover hover:scale-104 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#CFA85E] block">
                    Halal Gastronomy
                  </span>
                  <p className="text-xs text-[#B4BCCB] font-light leading-relaxed">
                    Certified halal sourcing, private chefs and zero-proof dining rooms.
                  </p>
                </div>
              </div>

              <div className="bg-[#0D1017] border border-[#222532] overflow-hidden flex flex-col">
                <div className="aspect-[4/3] overflow-hidden bg-[#131722]">
                  <SmartImage
                    src="/assets/aistudio/cultural_belgravia_family_suite.jpg"
                    alt="Private Belgravia townhouse family drawing room prepared for quiet comfort"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="w-full h-full object-cover hover:scale-104 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#CFA85E] block">
                    Private Family Suites
                  </span>
                  <p className="text-xs text-[#B4BCCB] font-light leading-relaxed">
                    Discreet Belgravia and Mayfair residences with private entrances and prayer space.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Six Structured Islamic Hospitality Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ISLAMIC_HOSPITALITY_PILLARS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.index}
                  className="bg-[#0D1017] border border-[#202330] hover:border-[#CFA85E]/70 transition-colors p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#CFA85E] tabular-nums">{item.index}</span>
                      <Icon className="w-4 h-4 text-[#CFA85E]" />
                    </div>
                    <h3 className="font-serif text-xl text-[#F2D8A0] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B4BCCB] leading-relaxed font-light">
                      {item.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 3. Respecting All Cultures, Faiths & Global Traditions */}
      <section id="all-cultures" className="py-12 sm:py-16 px-5 sm:px-8 bg-[#0A0B10] border-b border-[#1A1C24]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] overflow-hidden border border-[#242632] bg-[#0D1017] shadow-2xl">
                <SmartImage
                  src="/assets/aistudio/cultural_global_tea_salon.jpg"
                  alt="Quiet Mayfair hospitality salon celebrating international tea and gifting traditions"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="w-full h-full object-cover hover:scale-104 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#CFA85E] block">
                All Cultures & Traditions Welcomed
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F2D8A0] leading-tight">
                True luxury adapts to your heritage, never the other way round.
              </h2>
              <p className="text-sm text-[#B4BCCB] leading-relaxed font-light">
                Our members come from diverse faiths, countries and family customs. We listen carefully and work seamlessly with every cultural tradition — whether that means preparing a Kosher kitchen, sourcing a strict Jain chef, observing Japanese gifting etiquette or hosting a multi-generational celebration in the English countryside.
              </p>
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#8F98AA]">
                Discreet · Respectful · All arrangements subject to availability
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {GLOBAL_TRADITIONS.map((tradition) => (
              <div
                key={tradition.number}
                className="bg-[#0D1017] border border-[#1E212E] hover:border-[#8B672B]/80 transition-colors p-6 space-y-2.5"
              >
                <span className="font-mono text-[11px] text-[#CFA85E] tabular-nums block">
                  {tradition.number}
                </span>
                <h3 className="font-serif text-xl text-[#F2D8A0] leading-snug">
                  {tradition.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#B4BCCB] leading-relaxed font-light">
                  {tradition.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 4. Three-Step Preparation Rhythm */}
      <section className="py-12 sm:py-16 px-5 sm:px-8 bg-[#08090C] border-b border-[#1A1C24]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1D1F28] pb-5">
            <div className="space-y-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#CFA85E] block">
                How We Prepare
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F2D8A0]">
                Calm preparation before you land.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#B4BCCB] max-w-md font-light leading-relaxed">
              Every cultural detail is confirmed quietly behind the scenes so your family steps straight into comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PREPARATION_STEPS.map((item) => (
              <div key={item.step} className="bg-[#0C0E14] border border-[#202330] p-6 space-y-3">
                <span className="font-serif text-2xl text-[#CFA85E] tabular-nums block">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl text-[#F2D8A0]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#B4BCCB] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 5. Compact 10-Question Collapsible FAQ */}
      <CollapsibleFaqSection
        items={CULTURAL_FAQS}
        kicker="Cultural & Faith Questions"
        heading="Questions about Islamic & cultural hospitality"
        previewCount={3}
        resetKey="cultural-traditions"
        viewAllRoute="faq"
      />

      <GoldDivider />

      {/* 6. Closing Private Consultation Band */}
      <section className="py-12 sm:py-16 px-5 sm:px-8 bg-black text-center">
        <Reveal className="max-w-3xl mx-auto space-y-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#CFA85E] block">
            Mayfair Private Desk
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F2D8A0] leading-tight">
            Tell us what makes you feel at home.
          </h2>
          <p className="text-xs sm:text-sm text-[#B4BCCB] max-w-xl mx-auto leading-relaxed font-light">
            Share your family’s traditions, dates and preferences in complete confidence. Our Mayfair office will prepare every stay, table and journey accordingly.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openIntroductionModal('Cultural & Islamic Hospitality')}
              className="btn-gold px-7 py-3.5 text-xs inline-flex items-center gap-2 min-h-[44px] cursor-pointer"
            >
              <span>{t('cta.requestIntroduction')}</span>
              <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
            </button>
            <Link
              page="contact"
              className="btn-outline-gold px-7 py-3.5 text-xs inline-flex items-center justify-center min-h-[44px]"
            >
              {t('cta.contactOffice')}
            </Link>
          </div>
          <p className="text-[11px] font-mono text-[#8F98AA] pt-3 tabular-nums">
            {TGLC_CONTACT.address.toString()} · {TGLC_CONTACT.telephone}
          </p>
        </Reveal>
      </section>
    </div>
  );
};
