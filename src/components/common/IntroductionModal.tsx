import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { SERVICES_DATA, TGLC_CONTACT } from '../../data/tglcData';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sendEmailViaBrevo, EMAIL_FAILURE_MESSAGE } from '../../utils/brevoEmail';
import { SmartImage } from './SmartImage';

const HELP_OPTIONS = [
  ...SERVICES_DATA.map((service) => service.title),
  'Something else',
];

export const IntroductionModal: React.FC = () => {
  const { isIntroModalOpen, closeIntroductionModal, introModalInterest, t } = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [helpTopic, setHelpTopic] = useState(HELP_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dispatchInfo, setDispatchInfo] = useState<string>('');

  useEffect(() => {
    if (introModalInterest) {
      const matched = HELP_OPTIONS.find(
        (opt) => opt.toLowerCase() === introModalInterest.toLowerCase()
      );
      setHelpTopic(matched || 'Something else');
    }
  }, [introModalInterest]);

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
        senderName: fullName,
        senderEmail: email,
        telephone: telephone || 'Not provided',
        inquiryType: helpTopic,
        subject: `Introduction Request: ${helpTopic}`,
        message: message || 'Introduction requested.',
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

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setTelephone('');
    setHelpTopic(HELP_OPTIONS[0]);
    setMessage('');
    setErrorMessage('');
    closeIntroductionModal();
  };

  useEffect(() => {
    if (!isIntroModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeIntroductionModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isIntroModalOpen, closeIntroductionModal]);

  return (
    <AnimatePresence>
      {isIntroModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeIntroductionModal();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Request an introduction"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#0F1117] border border-[#2B2E39] shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={closeIntroductionModal}
              className="absolute top-6 right-6 p-2 text-[#9C968A] hover:text-[#CFA85E] transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="py-8 text-center space-y-5"
              >
                <div className="w-14 h-14 mx-auto bg-[#151720] border border-[#8B672B]/70 flex items-center justify-center text-[#CFA85E]">
                  <CheckCircle className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA]">
                  Thank you for getting in touch.
                </h3>

                <p className="text-sm text-[#D9D4CA] max-w-md mx-auto leading-relaxed font-light">
                  We have received your message and will reply personally.
                </p>

                <div className="bg-[#151720] border border-[#272A35] p-5 text-xs text-[#9C968A] max-w-md mx-auto text-left space-y-2">
                  <p>Name: <span className="text-[#F4F1EA]">{fullName}</span></p>
                  <p>Topic: <span className="text-[#F4F1EA]">{helpTopic}</span></p>
                  {dispatchInfo && (
                    <p className="text-[#A4D65E] text-[11px] font-medium pt-1 border-t border-[#262934]">
                      ✓ {dispatchInfo}
                    </p>
                  )}
                  <p className="text-[11px] text-[#8E8A83] pt-2 border-t border-[#262934] leading-relaxed">
                    You can also call us on <span className="tabular-nums text-[#D9D4CA]">{TGLC_CONTACT.telephone}</span> or email <span className="text-[#CFA85E]">{TGLC_CONTACT.email}</span>.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="btn-outline-gold px-7 py-2.5 text-xs"
                  >
                    {t('modal.close')}
                  </button>
                </div>
              </motion.div>
            ) : (
              <div>
                <div className="mb-6 space-y-2">
                  <div className="flex items-center justify-between pr-8">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#CFA85E]">
                      <ShieldCheck className="w-4 h-4 text-[#B98633]" />
                      <span>{t('modal.kicker')}</span>
                    </div>
                    <SmartImage
                      src="/assets/aistudio/tglc_crest_transparent.png"
                      alt="The Global Luxury Consortium crest"
                      sizes="36px"
                      className="w-9 h-11 object-contain filter brightness-105 drop-shadow-[0_2px_10px_rgba(185,134,51,0.35)]"
                    />
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#F2D8A0]">
                    {t('modal.heading')}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#B4BCCB] leading-relaxed">
                    {t('modal.subtitle')}
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 mb-4 bg-[#2C1417] border border-[#521C22] text-xs text-[#F2C2C6]">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="intro-name" className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                        {t('modal.name')}
                      </label>
                      <input
                        id="intro-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-[#151720] border border-[#2A2D38] focus:border-[#C4933F] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#5C5953] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="intro-email" className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                        {t('modal.email')}
                      </label>
                      <input
                        id="intro-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-[#151720] border border-[#2A2D38] focus:border-[#C4933F] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#5C5953] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="intro-phone" className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                        {t('modal.phone')}
                      </label>
                      <input
                        id="intro-phone"
                        type="tel"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        placeholder="+44..."
                        className="w-full bg-[#151720] border border-[#2A2D38] focus:border-[#C4933F] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#5C5953] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="intro-topic" className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                        {t('modal.topic')}
                      </label>
                      <select
                        id="intro-topic"
                        value={helpTopic}
                        onChange={(e) => setHelpTopic(e.target.value)}
                        className="w-full bg-[#151720] border border-[#2A2D38] focus:border-[#C4933F] px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none transition-colors"
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
                    <label htmlFor="intro-message" className="block text-[11px] uppercase tracking-wider text-[#D9D4CA] mb-1.5">
                      {t('modal.message')}
                    </label>
                    <textarea
                      id="intro-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you have in mind..."
                      className="w-full bg-[#151720] border border-[#2A2D38] focus:border-[#C4933F] px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#5C5953] focus:outline-none resize-none transition-colors"
                    />
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#222530]">
                    <div className="text-[11px] text-[#8E8A83] space-y-0.5 tabular-nums">
                      <div>Phone: <span className="text-[#D9D4CA]">{TGLC_CONTACT.telephone}</span></div>
                      <div>Email: <span className="text-[#CFA85E]">{TGLC_CONTACT.email}</span></div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-gold px-7 py-3 text-xs whitespace-nowrap disabled:opacity-50"
                    >
                      {isSubmitting ? t('modal.sending') : t('cta.requestIntroduction')}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
