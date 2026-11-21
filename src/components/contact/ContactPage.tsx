import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES_DATA, TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { SmartImage } from '../common/SmartImage';
import { Reveal } from '../common/Reveal';
import { EditorialHeroCarousel } from '../common/EditorialHeroCarousel';
import { CONTACT_HERO_SLIDES } from '../../utils/carouselSlides';
import { ShieldCheck, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { sendEmailViaBrevo, EMAIL_FAILURE_MESSAGE } from '../../utils/brevoEmail';

const HELP_OPTIONS = [...SERVICES_DATA.map((s) => s.title), 'Something else'];

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [helpTopic, setHelpTopic] = useState(HELP_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dispatchInfo, setDispatchInfo] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMessage('Please enter your name and email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await sendEmailViaBrevo({
        senderName: fullName.trim(),
        senderEmail: email.trim(),
        telephone: telephone.trim(),
        inquiryType: helpTopic,
        subject: `Enquiry: ${helpTopic}`,
        message: message.trim() || 'No additional message provided.',
      });

      if (res.success) {
        setDispatchInfo(res.message);
        setIsSubmitted(true);
      } else {
        setErrorMessage(res.message);
      }
    } catch {
      setErrorMessage(EMAIL_FAILURE_MESSAGE);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#08090C] text-[#F4F1EA] pt-24 sm:pt-28 pb-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
        {/* Cinematic 5-Slide Mayfair Photographic Hero */}
        <EditorialHeroCarousel
          slides={CONTACT_HERO_SLIDES}
          className="min-h-[340px] sm:min-h-[410px] flex items-end border border-[#242630]"
          sizes="(max-width: 1280px) 100vw, 1280px"
          scrimVariant="bottom-left"
          controlsPosition="bottom-right"
        >
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative z-10 p-6 sm:p-10 pb-16 sm:pb-12 max-w-4xl space-y-3"
          >
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#CFA85E] font-medium block tabular-nums">
              Mayfair Office · W1S 4JL
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F4F1EA] leading-[1.06]">
              Get in touch.
            </h1>
            <p className="font-serif italic text-lg sm:text-2xl text-[#E5DFD3] leading-relaxed">
              “Opening doors that don’t usually exist.”
            </p>
            <p className="text-xs sm:text-base text-[#D9D4CA] leading-relaxed font-light max-w-2xl">
              Tell us what you need. We’ll reply personally.
            </p>
          </motion.div>
        </EditorialHeroCarousel>

        {/* How It Works */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              step: '01 · Send a Note',
              title: 'Read by our team',
              body: 'Every message goes straight to our Mayfair office and stays completely private.',
            },
            {
              step: '02 · Have a Conversation',
              title: 'By phone or in Mayfair',
              body: 'We can talk by phone or meet in person at 45 Albemarle Street.',
            },
            {
              step: '03 · Clear Next Steps',
              title: 'Simple terms upfront',
              body: 'We explain how we can help and agree terms before anything starts.',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="p-6 bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-colors space-y-2"
            >
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#CFA85E] block">{item.step}</span>
              <h2 className="font-serif text-2xl text-[#F4F1EA]">{item.title}</h2>
              <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">{item.body}</p>
            </motion.div>
          ))}
        </section>

        {/* Form & Mayfair Office Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: 5-Field Form */}
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 bg-[#12141A] border border-[#242630] p-7 sm:p-10 shadow-2xl"
          >
            {isSubmitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-[#181A22] border border-[#8B672B] flex items-center justify-center text-[#CFA85E]">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-3xl text-[#F4F1EA]">
                  Thank you for getting in touch.
                </h3>

                <p className="font-serif italic text-xl text-[#D9D4CA] max-w-lg mx-auto leading-relaxed">
                  We have received your message and will reply personally.
                </p>

                <div className="bg-[#0D0F14] border border-[#242630] p-6 text-xs text-[#9C968A] max-w-md mx-auto text-left space-y-2 font-light">
                  <p className="text-[#CFA85E] font-medium uppercase tracking-wider text-[11px]">
                    Summary
                  </p>
                  <p>
                    Name: <span className="text-[#F4F1EA]">{fullName}</span>
                  </p>
                  <p>
                    Topic: <span className="text-[#F4F1EA]">{helpTopic}</span>
                  </p>
                  {dispatchInfo && (
                    <p className="text-[#A4D65E] text-[11px] font-medium pt-1 border-t border-[#20232E]">
                      ✓ {dispatchInfo}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                    }}
                    className="btn-outline-gold px-6 py-2.5 text-xs"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#CFA85E] pb-3 border-b border-[#20232E]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Send us a message</span>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-[#2C1417] border border-[#521C22] text-xs text-[#F2C2C6]">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full min-h-[44px] bg-[#181A22] border border-[#2A2D38] focus:border-[#CFA85E] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#6B675E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full min-h-[44px] bg-[#181A22] border border-[#2A2D38] focus:border-[#CFA85E] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#6B675E] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                      Phone (optional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="+44 20 ..."
                      className="w-full min-h-[44px] bg-[#181A22] border border-[#2A2D38] focus:border-[#CFA85E] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#6B675E] focus:outline-none tabular-nums"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                      What can we help with?
                    </label>
                    <select
                      id="contact-topic"
                      value={helpTopic}
                      onChange={(e) => setHelpTopic(e.target.value)}
                      className="w-full min-h-[44px] bg-[#181A22] border border-[#2A2D38] focus:border-[#CFA85E] px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none"
                    >
                      {HELP_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us a little about what you need and when you would like to speak..."
                    className="w-full bg-[#181A22] border border-[#2A2D38] focus:border-[#CFA85E] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#6B675E] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#20232E]">
                  <span className="text-[11px] text-[#9C968A]">Your details stay private.</span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold min-h-[44px] px-8 py-3.5 text-xs disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right Column: Office Details */}
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 bg-[#12141A] border border-[#242630] space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#CFA85E]">Mayfair Office</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#8B672B] tabular-nums">W1S 4JL</span>
              </div>
              <h3 className="font-serif text-3xl text-[#F4F1EA]">The Global Luxury Consortium</h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#D9D4CA] border-t border-[#20232E] pt-6 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#CFA85E] shrink-0 mt-0.5" />
                  <p>{TGLC_CONTACT.address.toString()}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#CFA85E] shrink-0 mt-0.5" />
                  <a
                    href={`tel:${TGLC_CONTACT.telephone.replace(/\s+/g, '')}`}
                    className="text-[#F4F1EA] hover:text-[#CFA85E] transition-colors tabular-nums"
                  >
                    {TGLC_CONTACT.telephone}
                  </a>
                </div>
                <div className="flex items-start gap-3 min-w-0">
                  <Mail className="w-4 h-4 text-[#CFA85E] shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${TGLC_CONTACT.email}`}
                    className="text-[#D9D4CA] hover:text-[#CFA85E] transition-colors break-words flex-1 min-w-0"
                  >
                    {TGLC_CONTACT.email.split('@')[0]}@<wbr />{TGLC_CONTACT.email.split('@')[1]}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#CFA85E] shrink-0 mt-0.5" />
                  <p className="text-[#9C968A]">{TGLC_CONTACT.hours}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#20232E] space-y-1.5 text-xs text-[#9C968A]">
                <p className="text-[#D9D4CA] tabular-nums">
                  Company Number: <span className="text-[#CFA85E] font-medium">{TGLC_CONTACT.companyNumber}</span> (England & Wales)
                </p>
                <p>{TGLC_CONTACT.instagram}</p>
              </div>
            </div>

            <div className="p-6 bg-[#12141A] border border-[#242630] space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#CFA85E] block">
                Visiting Albemarle Street
              </span>
              <p className="text-xs text-[#9C968A] leading-relaxed font-light">
                We are on the third floor at 45 Albemarle Street, a short walk from Piccadilly and Old Bond Street. Please let us know before you visit so we can welcome you properly.
              </p>
            </div>
          </motion.div>
        </div>

        <GoldDivider />

        {/* Three Visual Vignettes */}
        <section className="space-y-6">
          <Reveal className="max-w-3xl space-y-1.5">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#CFA85E] block">
              Ways to Meet
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              In Mayfair, in London, or by phone
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
                alt: 'Chauffeur car in London',
                tag: 'Easy Arrivals',
                title: 'Planned around your day',
                desc: 'We fit around your schedule and can arrange a car when you visit London.',
              },
              {
                img: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
                alt: 'Mayfair interior',
                tag: 'In Person',
                title: 'Meet at a place that suits you',
                desc: 'Visit us on Albemarle Street, or we can meet you at your home or office in London.',
              },
              {
                img: '/assets/aistudio/U2xzhqR8NqpZGDRNVta6Gk_fe26a8c6.jpg',
                alt: 'Private dining table in Mayfair',
                tag: 'First Conversation',
                title: 'Quiet tables nearby',
                desc: 'If you prefer to talk over coffee or lunch, we can arrange a quiet table in Mayfair.',
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="bg-[#12141A] border border-[#242630] hover:border-[#8B672B] transition-colors overflow-hidden group"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src={card.img}
                    alt={card.alt}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] uppercase tracking-widest text-[#CFA85E]">{card.tag}</span>
                  <h3 className="font-serif text-2xl text-[#F4F1EA]">
                    <span className="card-title-underline">{card.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
