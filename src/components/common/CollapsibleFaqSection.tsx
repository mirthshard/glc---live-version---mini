import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link } from './Link';
import { PageRoute } from '../../types';
import { useNavigation } from '../../context/NavigationContext';

export interface CollapsibleFaqItem {
  id?: string;
  question: string;
  answer: string;
}

interface CollapsibleFaqSectionProps {
  items: CollapsibleFaqItem[];
  kicker?: string;
  heading?: string;
  previewCount?: number;
  resetKey?: string;
  viewAllRoute?: PageRoute;
  viewAllLabel?: string;
  maxWidthClass?: string;
  sectionClassName?: string;
}

/**
 * Compact, two-level collapsible FAQ section:
 * - Starts with all answers closed and only `previewCount` (default 3) questions visible.
 * - Includes a sleek "Show all N questions" / "Show fewer" expander, plus a header toggle
 *   to fold the entire question drawer closed for minimal vertical footprint.
 */
export const CollapsibleFaqSection: React.FC<CollapsibleFaqSectionProps> = ({
  items,
  kicker,
  heading,
  previewCount = 3,
  resetKey,
  viewAllRoute,
  viewAllLabel,
  maxWidthClass = 'max-w-5xl',
  sectionClassName = 'py-10 sm:py-12 px-5 sm:px-8',
}) => {
  const { t } = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsDrawerOpen(true);
    setShowAll(false);
    setOpenIndex(null);
  }, [resetKey]);

  if (!items || items.length === 0) return null;

  const resolvedKicker = kicker ?? t('faq.kicker');
  const resolvedHeading = heading ?? t('faq.heading');
  const resolvedViewAllLabel = viewAllLabel ?? t('faq.viewAll');

  const hasOverflow = items.length > previewCount;
  const visibleItems = showAll ? items : items.slice(0, previewCount);
  const hiddenCount = Math.max(0, items.length - previewCount);

  return (
    <section className={sectionClassName}>
      <div className={`${maxWidthClass} mx-auto space-y-4`}>
        {/* Compact Header Bar with Top-Level Collapse Toggle */}
        <div className="border-b border-[#20232E] pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#CFA85E] block mb-1">
              {resolvedKicker}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F2D8A0] leading-tight">
              {resolvedHeading}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#8F98AA] tabular-nums">
              {items.length} {t('faq.countSuffix')}
            </span>

            {viewAllRoute && (
              <Link
                page={viewAllRoute}
                className="text-xs font-mono uppercase tracking-wider text-[#E2BA6B] hover:text-[#FAF7F0] transition-colors inline-flex items-center gap-1 whitespace-nowrap"
              >
                <span>{resolvedViewAllLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}

            <button
              type="button"
              aria-expanded={isDrawerOpen}
              onClick={() => {
                setIsDrawerOpen((prev) => !prev);
                if (isDrawerOpen) setOpenIndex(null);
              }}
              className="min-h-[34px] px-3 py-1 border border-[#2A2D38] hover:border-[#E2BA6B] bg-[#0D1017] text-[11px] font-mono uppercase tracking-wider text-[#D4D8E2] hover:text-[#E2BA6B] transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>{isDrawerOpen ? t('faq.hideList') : t('faq.showQuestions')}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#E2BA6B] transition-transform duration-200 ${
                  isDrawerOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Ultra-Compact Collapsible Hairline Accordion Container */}
        <AnimatePresence initial={false}>
          {isDrawerOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0D1017] border border-[#242630] divide-y divide-[#1A1D28]"
            >
              {visibleItems.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={item.id || item.question}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full min-h-[44px] text-left px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between gap-4 hover:bg-[#11151F]/80 transition-colors cursor-pointer"
                    >
                      <span className="flex items-baseline gap-3 min-w-0">
                        <span className="font-mono text-[10px] text-[#CFA85E] tabular-nums shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`font-serif text-[15px] sm:text-[17px] leading-snug transition-colors ${
                            isOpen ? 'text-[#FFE7B3]' : 'text-[#F2D8A0]'
                          }`}
                        >
                          {item.question}
                        </span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#CFA85E] shrink-0 transition-transform duration-200 ${
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
                          <div className="px-4 sm:px-6 pb-4 pt-3 pl-9 sm:pl-11 border-t border-[#181B24] bg-[#090B10]">
                            <p className="border-l border-[#CFA85E]/45 pl-3.5 text-[13px] sm:text-sm text-[#B4BCCB] leading-[1.75] font-light max-w-3xl">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Show More / Show Fewer Footer Bar */}
              {hasOverflow && (
                <div className="px-4 sm:px-5 py-2.5 bg-[#090B10] flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8F98AA] tabular-nums">
                    {t('faq.showing')} {visibleItems.length} {t('faq.of')} {items.length} {t('faq.countSuffix')}
                  </span>
                  <button
                    type="button"
                    aria-expanded={showAll}
                    onClick={() => {
                      if (showAll && openIndex !== null && openIndex >= previewCount) {
                        setOpenIndex(null);
                      }
                      setShowAll((prev) => !prev);
                    }}
                    className="min-h-[34px] px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#E2BA6B] hover:text-[#FAF7F0] border border-[#8B672B]/50 hover:border-[#E2BA6B] bg-[#0D1017] transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>
                      {showAll
                        ? t('faq.showFewer')
                        : `${t('faq.showMorePrefix')} ${hiddenCount} ${t('faq.showMoreSuffix')}`}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        showAll ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
