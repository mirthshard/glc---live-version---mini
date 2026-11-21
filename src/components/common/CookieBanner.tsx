import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from './Link';
import { SmartImage } from './SmartImage';

export const CookieBanner: React.FC = () => {
  const { cookieConsent, setCookieConsent } = useNavigation();

  return (
    <AnimatePresence>
      {cookieConsent === null && (
        <motion.div
          initial={{ y: 36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 36, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-[#0B0C10]/95 border-t border-[#252730] backdrop-blur-md text-[#D9D4CA] shadow-2xl"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[#CFA85E]">
                <SmartImage
                  src="/assets/aistudio/tglc_crest_transparent.png"
                  alt=""
                  aria-hidden="true"
                  sizes="16px"
                  className="w-4 h-5 object-contain brightness-105"
                />
                <Shield className="w-3.5 h-3.5 text-[#B98633]" />
                <span>Cookies</span>
              </div>
              <p className="text-xs text-[#9C968A] leading-relaxed">
                We use essential cookies to make this site work.{' '}
                <Link
                  page="cookie-policy"
                  className="text-[#CFA85E] hover:underline focus:outline-none"
                >
                  Cookie Policy
                </Link>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setCookieConsent(false)}
                className="px-4 py-2.5 text-xs uppercase tracking-wider text-[#D9D4CA] bg-[#161820] hover:bg-[#1E202A] border border-[#2D303D] hover:border-[#8B672B] transition-colors whitespace-nowrap"
              >
                Decline
              </button>

              <button
                onClick={() => setCookieConsent(true)}
                className="btn-gold px-5 py-2.5 text-xs whitespace-nowrap"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
