import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { TGLC_CONTACT } from '../../data/tglcData';
import { Link } from './Link';
import { SmartImage } from './SmartImage';
import { FooterSocialMedia } from './FooterSocialMedia';
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Compass,
  Lock,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DISPATCH_TOPICS = [
  'Travel & Escapes',
  'London Events',
  'Watches & Craft',
  'Hidden London',
] as const;

const dispatchStaggerVariants = {
  hidden: { opacity: 0.9 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const dispatchChildVariants = {
  hidden: { opacity: 0.88, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export const Footer: React.FC = () => {
  const { openIntroductionModal, t } = useNavigation();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Travel & Escapes',
    'London Events',
  ]);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((item) => item !== topic) : [...prev, topic]
    );
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#08090C] border-t border-[#1D1F28] text-[#9C968A] pt-14 pb-10 overflow-hidden">
      {/* Animated Brass Crown Hairline */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#CFA85E] to-transparent origin-center pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        {/* Top Architectural Grid: Balanced Mayfair House Panel & Private Dispatch (Subscribe) Card */}
        <motion.div
          variants={dispatchStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-10 border-b border-[#1D1F28] items-stretch"
        >
          {/* Left: Official Crested Emblem, House Overview & Direct Mayfair Details */}
          <motion.div
            variants={dispatchChildVariants}
            className="lg:col-span-6 relative bg-[#0C0E14] border border-[#222532] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl overflow-hidden"
          >
            {/* Matching Subtle Corner Reticles */}
            <span aria-hidden="true" className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#8B672B]" />
            <span aria-hidden="true" className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#8B672B]" />
            <span aria-hidden="true" className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#8B672B]" />
            <span aria-hidden="true" className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#8B672B]" />

            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="w-32 sm:w-36 shrink-0 bg-black border border-[#8B672B]/55 p-3 shadow-2xl relative"
                >
                  <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#E2BA6B]" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#E2BA6B]" />
                  <SmartImage
                    src="/assets/aistudio/tglc_lockup_transparent.png"
                    alt="The Global Luxury Consortium crest lockup"
                    sizes="144px"
                    className="w-full h-auto object-contain block"
                  />
                </motion.div>
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.26em] text-[#CFA85E] font-medium block">
                    {t('hero.tag1')}
                  </span>
                  <p className="font-serif text-xl sm:text-2xl italic text-[#F4F1EA] leading-snug">
                    “{t('hero.headline1')}”
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#B4BCCB] leading-relaxed font-light">
                Private concierge and lifestyle management from Mayfair, London. One dedicated point of contact for travel, dining, homes, transport, culture, Islamic & halal hospitality and global traditions — in London and abroad.
              </p>

              {/* Structured 2x2 Direct Mayfair Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#1E212E]">
                <div className="p-3.5 bg-[#08090E] border border-[#1E212E] space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8F98AA] flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#CFA85E] shrink-0" />
                    <span>{t('footer.mayfairOffice')}</span>
                  </span>
                  <p className="text-xs text-[#F4F1EA] leading-relaxed">
                    3rd Floor, 45 Albemarle Street, W1S 4JL
                  </p>
                </div>

                <div className="p-3.5 bg-[#08090E] border border-[#1E212E] space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8F98AA] flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-[#CFA85E] shrink-0" />
                    <span>{t('footer.directTelephone')}</span>
                  </span>
                  <a
                    href={`tel:${TGLC_CONTACT.internationalPhone.replace(/\s+/g, '')}`}
                    className="block text-sm font-serif text-[#E2BA6B] hover:text-white transition-colors tabular-nums"
                  >
                    {TGLC_CONTACT.telephone}
                  </a>
                </div>

                <div className="p-3.5 bg-[#08090E] border border-[#1E212E] space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8F98AA] block">
                    {t('footer.officeHours')}
                  </span>
                  <p className="text-xs text-[#D9D4CA] leading-relaxed">
                    {TGLC_CONTACT.hours}
                  </p>
                </div>

                <div className="p-3.5 bg-[#08090E] border border-[#1E212E] space-y-1 min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8F98AA] block">
                    {t('footer.privateEnquiries')}
                  </span>
                  <a
                    href={`mailto:${TGLC_CONTACT.email}`}
                    className="block text-[11px] text-[#D9D4CA] hover:text-[#CFA85E] transition-colors break-words leading-relaxed"
                  >
                    {TGLC_CONTACT.email.split('@')[0]}@<wbr />{TGLC_CONTACT.email.split('@')[1]}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E212E] flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => openIntroductionModal('General enquiry')}
                className="min-h-[44px] text-xs text-[#E2BA6B] hover:text-white transition-colors inline-flex items-center gap-1.5 font-medium cursor-pointer"
              >
                <span>{t('cta.requestIntroduction')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-3 text-xs text-[#9C968A]">
                <Link page="services" className="min-h-[44px] inline-flex items-center hover:text-[#CFA85E] transition-colors">
                  {t('nav.services')}
                </Link>
                <span className="text-[#3C4152]" aria-hidden="true">·</span>
                <Link page="about" className="min-h-[44px] inline-flex items-center hover:text-[#CFA85E] transition-colors">
                  {t('nav.aboutTglc')}
                </Link>
                <span className="text-[#3C4152]" aria-hidden="true">·</span>
                <Link page="contact" className="min-h-[44px] inline-flex items-center hover:text-[#CFA85E] transition-colors">
                  {t('nav.contact')}
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right: Animated Private Dispatch (Subscribe) Block */}
          <motion.div
            variants={dispatchChildVariants}
            className="lg:col-span-6 relative bg-[#0E1018] border border-[#262936] p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-2xl overflow-hidden"
          >
            {/* Corner Reticles & Subtle Top Hairline Sweep */}
            <span aria-hidden="true" className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#CFA85E]" />
            <span aria-hidden="true" className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#CFA85E]" />
            <span aria-hidden="true" className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#CFA85E]" />
            <span aria-hidden="true" className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#CFA85E]" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
              className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#CFA85E]/80 to-transparent origin-left pointer-events-none"
            />

            <motion.div variants={dispatchChildVariants} className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#CFA85E] font-medium inline-flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#E2BA6B]" />
                  <span>The TGLC Journal</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8F98AA]">
                  {t('footer.mayfairOffice')}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-[1.7rem] text-[#F2D8A0] leading-snug">
                {t('footer.journalTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-[#B4BCCB] leading-relaxed font-light">
                {t('footer.journalSubtitle')}
              </p>
            </motion.div>

            {/* Interactive Topic Preference Selectors */}
            <motion.div variants={dispatchChildVariants} className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8F98AA] block">
                {t('footer.chooseTopics')}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DISPATCH_TOPICS.map((topic) => {
                  const active = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      aria-pressed={active}
                      className={`min-h-[44px] px-3 py-2 text-left text-xs border transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                        active
                          ? 'bg-[#161923] border-[#CFA85E] text-[#FAF7F0]'
                          : 'bg-[#090B10] border-[#222532] text-[#8F98AA] hover:border-[#8B672B] hover:text-[#D4D8E2]'
                      }`}
                    >
                      <span>{topic}</span>
                      <span
                        className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
                          active ? 'border-[#CFA85E] bg-[#CFA85E] text-[#07080B]' : 'border-[#33384A]'
                        }`}
                      >
                        {active && <Check className="w-3 h-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Form / Confirmation State with AnimatePresence */}
            <AnimatePresence mode="wait">
              {newsletterSubscribed ? (
                <motion.div
                  key="dispatch-confirmed"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="p-4 bg-[#141722] border border-[#B98633] text-xs text-[#F4F1EA] space-y-2.5"
                >
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#CFA85E] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium text-[#FAF7F0]">
                        You’re subscribed to The TGLC Journal.
                      </p>
                      <p className="text-[11px] text-[#9C968A]">
                        Selected topics:{' '}
                        <span className="text-[#E2BA6B]">
                          {selectedTopics.length > 0 ? selectedTopics.join(' · ') : 'All updates'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNewsletterSubscribed(false)}
                    className="text-[11px] font-mono uppercase tracking-wider text-[#CFA85E] hover:text-white transition-colors cursor-pointer"
                  >
                    Update preferences →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="dispatch-form"
                  initial={{ opacity: 0.85, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={t('footer.emailPlaceholder')}
                    required
                    aria-label="Email address for The TGLC Journal"
                    className="flex-1 min-h-[44px] bg-[#08090D] border border-[#2C303E] focus:border-[#CFA85E] px-4 py-3 text-xs text-[#F4F1EA] placeholder-[#6E6A63] focus:outline-none transition-colors"
                  />
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    type="submit"
                    className="btn-gold min-h-[44px] px-6 py-3 text-xs whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{t('cta.subscribe')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#08090C]" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="pt-3 border-t border-[#1D1F2A] flex flex-wrap items-center justify-between gap-4 text-xs text-[#9C968A]">
              <span>Sent strictly to subscribers. Never shared with third parties.</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E]">
                Mayfair Editorial
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Architectural Quick-Access Strip */}
        <motion.div
          initial={{ opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-10 border-b border-[#1D1F28]"
        >
          <div className="p-5 bg-[#0C0E14] border border-[#20232E] hover:border-[#8B672B]/65 transition-colors flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#CFA85E] flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                <span>{t('jump.ourLondon')}</span>
              </span>
              <p className="font-serif text-lg text-[#F2D8A0]">Visit us by appointment</p>
              <p className="text-xs text-[#B4BCCB] font-light leading-relaxed">
                Explore the Mayfair, Belgravia and St James’s streets we work across daily.
              </p>
            </div>
            <Link
              page="our-london"
              className="min-h-[40px] text-xs text-[#E2BA6B] hover:text-white transition-colors inline-flex items-center gap-1 font-medium text-left"
            >
              <span>{t('cta.exploreOurLondon')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-5 bg-[#0C0E14] border border-[#20232E] hover:border-[#8B672B]/65 transition-colors flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#CFA85E] flex items-center gap-1.5">
                <Compass className="w-3 h-3" />
                <span>{t('nav.commissionStudio')}</span>
              </span>
              <p className="font-serif text-lg text-[#F2D8A0]">Plan an evening or trip</p>
              <p className="text-xs text-[#B4BCCB] font-light leading-relaxed">
                Share your dates, venue style and transport in minutes for our Mayfair desk.
              </p>
            </div>
            <Link
              page="commission-studio"
              className="min-h-[40px] text-xs text-[#E2BA6B] hover:text-white transition-colors inline-flex items-center gap-1 font-medium text-left"
            >
              <span>{t('cta.startPlanning')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-5 bg-[#0C0E14] border border-[#20232E] hover:border-[#8B672B]/65 transition-colors flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#CFA85E] flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                <span>{t('nav.members')}</span>
              </span>
              <p className="font-serif text-lg text-[#F2D8A0]">Existing members & FAQ</p>
              <p className="text-xs text-[#B4BCCB] font-light leading-relaxed">
                Reach your lifestyle manager directly, or read clear answers on how TGLC works.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs">
                <Link
                  page="member-portal"
                  className="min-h-[40px] inline-flex items-center text-[#E2BA6B] hover:text-white transition-colors font-medium"
                >
                  {t('nav.members')} →
                </Link>
                <span aria-hidden="true" className="text-[#3C4152]">·</span>
                <Link
                  page="faq"
                  className="min-h-[40px] inline-flex items-center text-[#D4D8E2] hover:text-[#CFA85E] transition-colors font-medium"
                >
                  FAQ
                </Link>
              </div>
              <button
                type="button"
                onClick={scrollToTop}
                className="min-h-[40px] inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-[#9C968A] hover:text-[#E2BA6B] transition-colors cursor-pointer"
                aria-label="Return to top of page"
              >
                <span>{t('cta.top')}</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Middle Section: Staggered 5-Column Directory Grid */}
        <motion.div
          variants={dispatchStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.01 }}
          className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,0.9fr)_minmax(0,1.5fr)_minmax(0,1.55fr)] gap-x-6 lg:gap-x-6 xl:gap-x-8 gap-y-10 py-2 border-b border-[#1D1F28] pb-10 text-xs"
        >
          {/* Column 1: The Consortium */}
          <motion.div variants={dispatchChildVariants} className="col-span-1 md:col-span-2 lg:col-span-1 min-w-0 space-y-4">
            <h2 className="font-serif text-base tracking-wide text-[#F2D8A0]">{t('nav.consortium')}</h2>
            <ul className="space-y-3">
              <li><Link page="about" className="hover:text-[#CFA85E] transition-colors text-left">{t('nav.aboutTglc')}</Link></li>
              <li><Link page="ethos" className="hover:text-[#CFA85E] transition-colors text-left">{t('cta.ourEthos')}</Link></li>
              <li><Link page="approach" className="hover:text-[#CFA85E] transition-colors text-left">Our Approach</Link></li>
              <li><Link page="network" className="hover:text-[#CFA85E] transition-colors text-left">Our Network</Link></li>
              <li><Link page="our-london" className="hover:text-[#CFA85E] transition-colors text-left">{t('jump.ourLondon')}</Link></li>
              <li><Link page="privacy-discretion" className="hover:text-[#CFA85E] transition-colors text-left">Privacy & Discretion</Link></li>
              <li><Link page="cultural-traditions" className="text-[#CFA85E] hover:text-white transition-colors text-left font-medium">{t('nav.culturalTraditions')}</Link></li>
            </ul>
          </motion.div>

          {/* Column 2: Services */}
          <motion.div variants={dispatchChildVariants} className="col-span-1 md:col-span-2 lg:col-span-1 min-w-0 space-y-4">
            <h2 className="font-serif text-base tracking-wide text-[#F2D8A0]">{t('nav.services')}</h2>
            <ul className="space-y-3">
              <li><Link page="service-detail" params={{ serviceId: 'travel-aviation' }} className="hover:text-[#CFA85E] transition-colors text-left">Travel & Aviation</Link></li>
              <li><Link page="service-detail" params={{ serviceId: 'dining-nightlife' }} className="hover:text-[#CFA85E] transition-colors text-left">Dining & Nightlife</Link></li>
              <li><Link page="service-detail" params={{ serviceId: 'experiences-culture' }} className="hover:text-[#CFA85E] transition-colors text-left">Experiences & Culture</Link></li>
              <li><Link page="service-detail" params={{ serviceId: 'residences-relocation' }} className="hover:text-[#CFA85E] transition-colors text-left">Residences & Relocation</Link></li>
              <li><Link page="service-detail" params={{ serviceId: 'transport-security' }} className="hover:text-[#CFA85E] transition-colors text-left">Transport & Security</Link></li>
              <li><Link page="service-detail" params={{ serviceId: 'personal-private-office' }} className="hover:text-[#CFA85E] transition-colors text-left">Personal & Private Office</Link></li>
              <li><Link page="service-detail" params={{ serviceId: 'luxury-sourcing' }} className="hover:text-[#CFA85E] transition-colors text-left">Luxury Sourcing</Link></li>
              <li>
                <Link page="hidden-london" className="text-[#CFA85E] hover:text-white transition-colors font-medium text-left">
                  {t('nav.hiddenLondon')}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Explore */}
          <motion.div variants={dispatchChildVariants} className="col-span-2 md:col-span-2 lg:col-span-1 min-w-0 space-y-4">
            <h2 className="font-serif text-base tracking-wide text-[#F2D8A0]">{t('footer.exploreCol')}</h2>
            <ul className="space-y-3">
              <li><Link page="commission-studio" className="text-[#CFA85E] hover:text-white transition-colors text-left font-medium">{t('nav.commissionStudio')}</Link></li>
              <li><Link page="case-studies" className="text-[#CFA85E] hover:text-white transition-colors text-left font-medium">{t('nav.signatureExperiences')}</Link></li>
              <li><Link page="membership" className="hover:text-[#CFA85E] transition-colors text-left">{t('nav.join')}</Link></li>
              <li><Link page="calendar" className="hover:text-[#CFA85E] transition-colors text-left">{t('nav.londonCalendar')}</Link></li>
              <li><Link page="journal" className="hover:text-[#CFA85E] transition-colors text-left">{t('nav.journal')}</Link></li>
              <li><Link page="faq" className="hover:text-[#CFA85E] transition-colors text-left">FAQ</Link></li>
              <li>
                <button onClick={() => openIntroductionModal('General enquiry')} className="text-[#CFA85E] hover:text-white transition-colors inline-flex items-center gap-1 font-medium text-left cursor-pointer">
                  <span>{t('cta.requestIntroduction')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Members & Hours */}
          <motion.div variants={dispatchChildVariants} className="col-span-2 md:col-span-3 lg:col-span-1 min-w-0 space-y-4">
            <h2 className="font-serif text-base tracking-wide text-[#F2D8A0]">{t('nav.members')}</h2>
            <ul className="space-y-3.5 min-w-0">
              <li>
                <Link page="member-portal" className="hover:text-[#CFA85E] transition-colors flex items-center gap-1.5 text-[#F4F1EA]">
                  <Lock className="w-3.5 h-3.5 text-[#C4933F] shrink-0" />
                  <span>{t('nav.members')}</span>
                </Link>
              </li>
              <li>
                <span className="text-[#7E7A72] block">{t('footer.officeHours')}</span>
                <span className="block text-[#D9D4CA] pt-0.5">{TGLC_CONTACT.hours}</span>
              </li>
              <li className="min-w-0">
                <span className="text-[#7E7A72] block">{t('nav.contact')}</span>
                <Link page="contact" className="text-[#CFA85E] hover:text-[#DDB872] transition-colors pt-0.5 block">
                  {t('cta.contactOffice')} →
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 5: Office Details */}
          <motion.div variants={dispatchChildVariants} className="col-span-2 md:col-span-3 lg:col-span-1 min-w-0 space-y-4">
            <h2 className="font-serif text-base tracking-wide text-[#F2D8A0]">{t('footer.mayfairOffice')}</h2>
            <address className="not-italic space-y-2.5 leading-relaxed text-[#D9D4CA] min-w-0">
              <p className="text-xs font-light">{TGLC_CONTACT.address.toString()}</p>
              <div className="pt-1">
                <span className="text-[#7E7A72] block">{t('footer.directTelephone')}</span>
                <a href={`tel:${TGLC_CONTACT.internationalPhone.replace(/\s+/g, '')}`} className="text-[#CFA85E] hover:text-[#DDB872] font-medium text-sm tabular-nums transition-colors">
                  {TGLC_CONTACT.telephone}
                </a>
              </div>
              <div className="min-w-0">
                <span className="text-[#7E7A72] block">{t('footer.privateEnquiries')}</span>
                <a
                  href={`mailto:${TGLC_CONTACT.email}`}
                  className="block max-w-full text-[#D9D4CA] hover:text-[#CFA85E] transition-colors pt-0.5 text-[11px] xl:text-xs break-words"
                >
                  {TGLC_CONTACT.email.split('@')[0]}@<wbr />{TGLC_CONTACT.email.split('@')[1]}
                </a>
              </div>
              <div className="pt-1">
                <span className="text-[#7E7A72] block">Company Number</span>
                <p className="text-[#D9D4CA] tabular-nums">{TGLC_CONTACT.companyNumber}</p>
              </div>
            </address>
          </motion.div>
        </motion.div>

        {/* Discrete Gold-Toned Social Media & Private Member Channels */}
        <FooterSocialMedia />

        {/* Bottom Wordmark & Legal Row */}
        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-[#7E7A72]">
          <div className="flex items-center gap-4 text-center md:text-left">
            <SmartImage
              src="/assets/aistudio/tglc_crest_transparent.png"
              alt=""
              aria-hidden="true"
              sizes="24px"
              className="w-6 h-7 object-contain opacity-80 hidden sm:block"
            />
            <div className="space-y-1">
              <p className="text-[#9C968A]">© 2026 The Global Luxury Consortium Ltd. All rights reserved.</p>
              <p className="text-[#6E6A63] tabular-nums">
                Registered in England & Wales · Company Number {TGLC_CONTACT.companyNumber} · {TGLC_CONTACT.address.toString()}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[#8E8A83]">
            <Link page="privacy-policy" className="hover:text-[#CFA85E] transition-colors">{t('footer.privacyPolicy')}</Link>
            <span aria-hidden="true">·</span>
            <Link page="terms" className="hover:text-[#CFA85E] transition-colors">{t('footer.terms')}</Link>
            <span aria-hidden="true">·</span>
            <Link page="cookie-policy" className="hover:text-[#CFA85E] transition-colors">{t('footer.cookiePolicy')}</Link>
            <span aria-hidden="true">·</span>
            <Link page="accessibility" className="hover:text-[#CFA85E] transition-colors">{t('footer.accessibility')}</Link>
            <span aria-hidden="true">·</span>
            <Link page="image-credits" className="hover:text-[#CFA85E] transition-colors">{t('footer.imageCredits')}</Link>
            <span aria-hidden="true">·</span>
            <Link page="sitemap" className="hover:text-[#CFA85E] transition-colors">{t('footer.sitemap')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
