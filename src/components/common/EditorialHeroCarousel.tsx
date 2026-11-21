import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SmartImage } from './SmartImage';
import type { CarouselSlide } from '../../utils/carouselSlides';

interface EditorialHeroCarouselProps {
  slides: CarouselSlide[];
  className?: string;
  intervalMs?: number;
  sizes?: string;
  scrimVariant?: 'bottom-left' | 'centered';
  controlsPosition?: 'bottom-right' | 'top-right';
  children: React.ReactNode;
}

const KEN_BURNS = {
  initial: { scale: 1.07 },
  animate: { scale: 1 },
  transition: { duration: 8, ease: 'easeOut' as const },
};

export const EditorialHeroCarousel: React.FC<EditorialHeroCarouselProps> = ({
  slides,
  className = 'min-h-[360px] sm:min-h-[440px] flex items-end',
  intervalMs = 5600,
  sizes = '(max-width: 1280px) 100vw, 1280px',
  scrimVariant = 'bottom-left',
  controlsPosition = 'bottom-right',
  children,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasAdvanced, setHasAdvanced] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const slideCount = slides.length;
  const safeIndex = slideCount > 0 ? currentSlide % slideCount : 0;
  const activeSlide = slides[safeIndex];
  const nextSlide =
    hasAdvanced && slideCount > 1 ? slides[(safeIndex + 1) % slideCount] : null;

  useEffect(() => {
    setCurrentSlide(0);
    setHasAdvanced(false);
  }, [slides]);

  useEffect(() => {
    if (isPaused || slideCount <= 1) return;
    const timer = setInterval(() => {
      setHasAdvanced(true);
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isPaused, slideCount, intervalMs]);

  if (!activeSlide) return null;

  const goPrev = () => {
    setHasAdvanced(true);
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const goNext = () => {
    setHasAdvanced(true);
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative overflow-hidden bg-[#12141A] select-none ${className}`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={`${activeSlide.image}-${safeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.95, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <motion.div {...KEN_BURNS} className="w-full h-full">
              <SmartImage
                src={activeSlide.image}
                alt={activeSlide.alt}
                sizes={sizes}
                priority={safeIndex === 0 && !hasAdvanced}
                className="w-full h-full object-cover object-center brightness-105 contrast-105"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {nextSlide && (
          <div aria-hidden="true" className="hidden">
            <SmartImage src={nextSlide.image} alt="" sizes={sizes} priority={false} />
          </div>
        )}

        {scrimVariant === 'centered' ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/60 to-[#07080B]/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/85 via-[#07080B]/30 to-[#07080B]/75 hidden sm:block" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/72 to-[#07080B]/35 sm:via-[#07080B]/50 sm:to-[#07080B]/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/85 via-[#07080B]/45 to-transparent" />
          </>
        )}
      </div>

      {/* Carousel Controls & Progress Bars */}
      {slideCount > 1 && (
        <div
          className={`absolute z-20 flex items-center gap-2.5 bg-[#08090C]/90 backdrop-blur-md px-3 py-1.5 border border-[#8B672B]/50 ${
            controlsPosition === 'top-right'
              ? 'top-4 right-4 sm:top-5 sm:right-5'
              : 'bottom-4 right-4 sm:bottom-5 sm:right-6'
          }`}
        >
          <div className="flex items-center gap-1.5">
            {slides.map((s, idx) => (
              <button
                key={`${s.image}-${idx}`}
                type="button"
                onClick={() => {
                  setHasAdvanced(true);
                  setCurrentSlide(idx);
                }}
                className={`h-[3px] transition-all duration-300 cursor-pointer ${
                  idx === safeIndex ? 'w-5 bg-[#E2BA6B]' : 'w-2 bg-[#4A4E5D] hover:bg-[#9C968A]'
                }`}
                aria-label={`View slide ${idx + 1}${s.title ? `: ${s.title}` : ''}`}
              />
            ))}
          </div>

          <span className="text-[11px] font-mono text-[#E2BA6B] tabular-nums pl-0.5">
            {String(safeIndex + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}
          </span>

          <div className="flex items-center gap-0.5 border-l border-[#2B2D3A] pl-1.5">
            <button
              type="button"
              onClick={goPrev}
              className="p-1.5 text-[#B8BECC] hover:text-[#E2BA6B] transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="p-1.5 text-[#B8BECC] hover:text-[#E2BA6B] transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div
        className={
          controlsPosition === 'bottom-right' && slideCount > 1
            ? 'w-full pb-12 sm:pb-0'
            : 'w-full'
        }
      >
        {children}
      </div>
    </section>
  );
};
