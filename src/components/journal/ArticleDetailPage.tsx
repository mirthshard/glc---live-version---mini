import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { JOURNAL_ARTICLES } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { Link } from '../common/Link';
import { SmartImage } from '../common/SmartImage';
import { Reveal } from '../common/Reveal';
import {
  ArrowRight,
  ArrowUpRight,
  Share2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ArticleDetailPageProps {
  articleSlug?: string;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ articleSlug }) => {
  const { openIntroductionModal } = useNavigation();
  const [copied, setCopied] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const article =
    JOURNAL_ARTICLES.find((a) => a.slug === articleSlug) || JOURNAL_ARTICLES[0];
  const relatedArticles = JOURNAL_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const galleryItems: { image: string; caption: string }[] = [
    { image: article.heroImage, caption: article.title },
    ...(article.editorialImages || []).map((img, i) => ({
      image: img,
      caption: article.editorialCaptions?.[i] || article.title,
    })),
  ];

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % galleryItems.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + galleryItems.length) % galleryItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, galleryItems.length]);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <article className="bg-[#07080B] text-[#FAF7F0] min-h-screen pb-16">
      {/* 1. Article Hero */}
      <header className="relative pt-10 sm:pt-14 pb-10 border-b border-[#202432] overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#E2BA6B] block">
                {article.category}
              </span>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8F98AA] hover:text-[#E2BA6B] border border-[#232736] px-3 py-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#E2BA6B]" />
                    <span>Link copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FAF7F0] leading-[1.1] font-normal">
              {article.title}
            </h1>

            <p className="font-serif italic text-lg sm:text-2xl text-[#D4D8E2] leading-relaxed">
              {article.subtitle}
            </p>

            <div className="pt-2 text-xs font-mono text-[#8F98AA]">
              By <span className="text-[#FAF7F0]">{article.author}</span>
            </div>
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#12151E] border border-[#232736] group">
            <SmartImage
              src={article.heroImage}
              alt={article.title}
              sizes="(max-width: 896px) 100vw, 896px"
              priority
              className="w-full h-full object-cover brightness-105 contrast-105"
            />
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="absolute bottom-3 right-3 px-3 py-1.5 bg-[#07080B]/85 border border-[#8B672B]/60 text-[11px] font-mono text-[#E2BA6B] hover:bg-[#E2BA6B] hover:text-[#07080B] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              aria-label="Open full-size photograph"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>View photo</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Article Body */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-10 sm:pt-12 space-y-10">
        <div className="space-y-5 text-base sm:text-lg text-[#D4D8E2] leading-[1.8]">
          {article.contentParagraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {article.subheadings &&
          article.subheadings.map((section, idx) => {
            const inlineImage = article.editorialImages?.[idx];
            const inlineCaption = article.editorialCaptions?.[idx];
            return (
              <section key={section.title} className="space-y-5 pt-2">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] font-normal leading-snug">
                  {section.title}
                </h2>

                <div className="space-y-4 text-base sm:text-lg text-[#D4D8E2] leading-[1.8]">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {inlineImage && (
                  <figure className="pt-2 space-y-2.5">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx + 1)}
                      className="block w-full aspect-[16/10] overflow-hidden bg-[#12151E] border border-[#232736] hover:border-[#E2BA6B] transition-colors cursor-pointer group"
                    >
                      <SmartImage
                        src={inlineImage}
                        alt={inlineCaption || section.title}
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                      />
                    </button>
                    {inlineCaption && (
                      <figcaption className="text-xs font-serif italic text-[#8F98AA]">
                        {inlineCaption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </section>
            );
          })}

        {/* End-of-article one-line CTA linking to the most relevant service page */}
        <div className="pt-6 border-t border-[#232736] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D1017] p-6 border">
          <p className="text-sm sm:text-base text-[#FAF7F0]">
            Need help planning this in London or abroad? Explore our{' '}
            <Link
              page="service-detail"
              params={{ serviceId: article.relatedServiceId }}
              className="text-[#E2BA6B] hover:underline font-medium"
            >
              {article.relatedServiceLabel}
            </Link>{' '}
            service.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              page="service-detail"
              params={{ serviceId: article.relatedServiceId }}
              className="btn-gold px-5 py-2.5 text-xs inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>View service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => openIntroductionModal(`Enquiry from article: ${article.title}`)}
              className="btn-outline-gold px-4 py-2.5 text-xs inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Related Articles */}
      <div className="mt-14">
        <GoldDivider />
      </div>
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 space-y-6">
        <Reveal className="flex items-center justify-between">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">More from the Journal</h2>
          <Link
            page="journal"
            className="text-xs text-[#E2BA6B] hover:text-[#FAF7F0] inline-flex items-center gap-1.5 transition-colors"
          >
            <span>All articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <Link
              key={rel.slug}
              page="journal-article"
              params={{ articleSlug: rel.slug }}
              className="bg-[#0D1017] border border-[#232736] hover:border-[#8B672B] transition-colors overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-[#12151E]">
                  <SmartImage
                    src={rel.heroImage}
                    alt={rel.title}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-104 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E2BA6B] block">
                    {rel.category}
                  </span>
                  <h3 className="font-serif text-lg text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                    <span className="card-title-underline">{rel.title}</span>
                  </h3>
                  <p className="text-xs text-[#D4D8E2] line-clamp-2">{rel.excerpt}</p>
                </div>
              </div>
              <div className="px-5 pb-4 pt-2 text-xs text-[#E2BA6B] inline-flex items-center gap-1">
                <span>Read guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[130] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full space-y-4"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close photo viewer"
                className="absolute -top-11 right-0 p-2 text-[#D4D8E2] hover:text-[#E2BA6B] cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-[16/10] bg-[#07080B] border border-[#232736] overflow-hidden">
                <SmartImage
                  src={galleryItems[lightboxIndex].image}
                  alt={galleryItems[lightboxIndex].caption}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="w-full h-full object-contain"
                />
                {galleryItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex(
                          (lightboxIndex - 1 + galleryItems.length) % galleryItems.length
                        )
                      }
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#07080B]/80 text-[#E2BA6B] border border-[#8B672B]/50 hover:bg-[#E2BA6B] hover:text-[#07080B] transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex((lightboxIndex + 1) % galleryItems.length)
                      }
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#07080B]/80 text-[#E2BA6B] border border-[#8B672B]/50 hover:bg-[#E2BA6B] hover:text-[#07080B] transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <p className="text-center font-serif italic text-sm text-[#D4D8E2]">
                {galleryItems[lightboxIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};
