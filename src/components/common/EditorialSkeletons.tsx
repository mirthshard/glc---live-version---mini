import React from 'react';
import { motion } from 'motion/react';

interface PillarGridSkeletonProps {
  variant?: 'home' | 'consortium';
  count?: number;
}

export const PillarGridSkeleton: React.FC<PillarGridSkeletonProps> = ({
  variant = 'home',
  count = 6,
}) => {
  const isConsortium = variant === 'consortium';

  return (
    <div
      role="status"
      aria-label="Loading private concierge pillars"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0.75, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.03 }}
          className="relative p-6 sm:p-7 bg-[#0C0D12] border border-[#1E202B] flex flex-col justify-between space-y-5 overflow-hidden"
        >
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#8B672B]/50"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#8B672B]/50"
          />

          <div className="space-y-4">
            {isConsortium ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 tglc-shimmer border border-[#262B3A]" />
                  <div className="space-y-2">
                    <div className="h-3 w-32 tglc-shimmer-soft" />
                    <div className="h-4 w-8 tglc-shimmer" />
                  </div>
                </div>
                <div className="w-4 h-4 tglc-shimmer-soft" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="h-6 w-8 tglc-shimmer" />
                  <div className="h-4 w-4 tglc-shimmer-soft" />
                </div>
                <div className="h-3 w-36 tglc-shimmer-soft" />
              </>
            )}

            {/* Fixed-height heading skeleton aligned to match rendered 2-line max heading container */}
            <div className="h-[3.5rem] sm:h-[3.75rem] flex flex-col justify-center gap-2">
              <div className="h-5 w-4/5 tglc-shimmer" />
              <div className="h-4 w-1/2 tglc-shimmer-soft" />
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="h-3 w-full tglc-shimmer-soft" />
              <div className="h-3 w-11/12 tglc-shimmer-soft" />
              <div className="h-3 w-4/5 tglc-shimmer-soft" />
            </div>
          </div>

          <div className="pt-4 border-t border-[#1A1C24] flex items-center justify-between">
            <div className="h-3 w-24 tglc-shimmer-soft" />
            <div className="h-3 w-14 tglc-shimmer-soft" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

interface ArticleListSkeletonProps {
  includeLead?: boolean;
  cardCount?: number;
}

export const ArticleListSkeleton: React.FC<ArticleListSkeletonProps> = ({
  includeLead = true,
  cardCount = 6,
}) => {
  return (
    <div role="status" aria-label="Loading journal dispatches" className="space-y-10">
      {includeLead && (
        <div className="p-6 sm:p-9 bg-[#0D1017] border border-[#242630] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#B98633]/60"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#B98633]/60"
          />

          <div className="lg:col-span-6 order-2 lg:order-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-24 tglc-shimmer" />
              <div className="h-3 w-28 tglc-shimmer-soft" />
              <div className="h-3 w-16 tglc-shimmer-soft" />
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="h-8 w-11/12 tglc-shimmer" />
              <div className="h-8 w-3/4 tglc-shimmer" />
            </div>

            <div className="h-5 w-4/5 tglc-shimmer-soft" />

            <div className="space-y-2 pt-2">
              <div className="h-3.5 w-full tglc-shimmer-soft" />
              <div className="h-3.5 w-11/12 tglc-shimmer-soft" />
              <div className="h-3.5 w-2/3 tglc-shimmer-soft" />
            </div>

            <div className="pt-4 border-t border-[#20232E] flex items-center justify-between">
              <div className="h-3 w-40 tglc-shimmer-soft" />
              <div className="h-3 w-24 tglc-shimmer" />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="aspect-[16/10] w-full tglc-shimmer border border-[#242630]" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {Array.from({ length: cardCount }).map((_, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0.75, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            className="bg-[#0D1017] border border-[#242630] p-6 flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="aspect-[16/10] w-full mb-5 tglc-shimmer border border-[#20232E]" />

              <div className="flex items-center gap-2 mb-3">
                <div className="h-3 w-20 tglc-shimmer" />
                <div className="h-3 w-24 tglc-shimmer-soft" />
                <div className="h-3 w-14 tglc-shimmer-soft" />
              </div>

              <div className="h-[3.5rem] sm:h-[3.8rem] flex flex-col justify-center gap-2 mb-2">
                <div className="h-5 w-11/12 tglc-shimmer" />
                <div className="h-5 w-2/3 tglc-shimmer-soft" />
              </div>

              <div className="space-y-2 mb-6">
                <div className="h-3 w-full tglc-shimmer-soft" />
                <div className="h-3 w-11/12 tglc-shimmer-soft" />
                <div className="h-3 w-3/4 tglc-shimmer-soft" />
              </div>
            </div>

            <div className="pt-3 border-t border-[#20232E] flex items-center justify-between">
              <div className="h-3 w-28 tglc-shimmer-soft" />
              <div className="h-3 w-12 tglc-shimmer" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
