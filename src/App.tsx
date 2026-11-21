/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/common/Header';
import { BreadcrumbNav } from './components/common/BreadcrumbNav';
import { Footer } from './components/common/Footer';
import { CookieBanner } from './components/common/CookieBanner';
import { HomePage } from './components/home/HomePage';
import { AmbienceProvider } from './context/AmbienceContext';
import { AmbiencePlayer } from './components/common/AmbiencePlayer';
import { ArticleListSkeleton, PillarGridSkeleton } from './components/common/EditorialSkeletons';
import { useDocumentHead } from './seo/useDocumentHead';
import { usePageTranslator } from './utils/pageTranslator';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'motion/react';

const ConsortiumPages = lazy(() =>
  import('./components/consortium/ConsortiumPages').then((m) => ({ default: m.ConsortiumPages }))
);
const ServicesHub = lazy(() =>
  import('./components/services/ServicesHub').then((m) => ({ default: m.ServicesHub }))
);
const ServiceDetailPage = lazy(() =>
  import('./components/services/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage }))
);
const SubServiceDetailPage = lazy(() =>
  import('./components/services/SubServiceDetailPage').then((m) => ({ default: m.SubServiceDetailPage }))
);
const MembershipPage = lazy(() =>
  import('./components/membership/MembershipPage').then((m) => ({ default: m.MembershipPage }))
);
const MembersPage = lazy(() =>
  import('./components/members/MembersPage').then((m) => ({ default: m.MembersPage }))
);
const CalendarPage = lazy(() =>
  import('./components/calendar/CalendarPage').then((m) => ({ default: m.CalendarPage }))
);
const JournalPage = lazy(() =>
  import('./components/journal/JournalPage').then((m) => ({ default: m.JournalPage }))
);
const ArticleDetailPage = lazy(() =>
  import('./components/journal/ArticleDetailPage').then((m) => ({ default: m.ArticleDetailPage }))
);
const ContactPage = lazy(() =>
  import('./components/contact/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const FAQPage = lazy(() =>
  import('./components/faq/FAQPage').then((m) => ({ default: m.FAQPage }))
);
const LegalPages = lazy(() =>
  import('./components/legal/LegalPages').then((m) => ({ default: m.LegalPages }))
);
const HiddenLondonPage = lazy(() =>
  import('./components/access/HiddenLondonPage').then((m) => ({ default: m.HiddenLondonPage }))
);
const CommissionStudio = lazy(() =>
  import('./components/studio/CommissionStudio').then((m) => ({ default: m.CommissionStudio }))
);
const CaseStudiesPage = lazy(() =>
  import('./components/casestudies/CaseStudiesPage').then((m) => ({ default: m.CaseStudiesPage }))
);
const CulturalHospitalityPage = lazy(() =>
  import('./components/culture/CulturalHospitalityPage').then((m) => ({ default: m.CulturalHospitalityPage }))
);
const GlobalSearchModal = lazy(() =>
  import('./components/search/GlobalSearchModal').then((m) => ({ default: m.GlobalSearchModal }))
);
const IntroductionModal = lazy(() =>
  import('./components/common/IntroductionModal').then((m) => ({ default: m.IntroductionModal }))
);

const RouteFallback: React.FC<{ isEditorial?: boolean }> = ({ isEditorial = false }) => (
  <div className="min-h-[70vh] bg-[#07080B] max-w-7xl mx-auto px-5 sm:px-8 py-12">
    {isEditorial ? <ArticleListSkeleton includeLead cardCount={3} /> : <PillarGridSkeleton variant="consortium" count={6} />}
  </div>
);

const LazyModals: React.FC = () => {
  const { isSearchOpen, isIntroModalOpen } = useNavigation();
  const [hasOpenedSearch, setHasOpenedSearch] = useState(false);
  const [hasOpenedIntro, setHasOpenedIntro] = useState(false);

  useEffect(() => {
    if (isSearchOpen) setHasOpenedSearch(true);
  }, [isSearchOpen]);

  useEffect(() => {
    if (isIntroModalOpen) setHasOpenedIntro(true);
  }, [isIntroModalOpen]);

  return (
    <Suspense fallback={null}>
      {(hasOpenedSearch || isSearchOpen) && <GlobalSearchModal />}
      {(hasOpenedIntro || isIntroModalOpen) && <IntroductionModal />}
    </Suspense>
  );
};

const PageContent: React.FC = () => {
  const { route } = useNavigation();

  switch (route.page) {
    case 'home':
      return <HomePage />;
    case 'consortium':
      return <ConsortiumPages subPage="overview" />;
    case 'consortium-concierge':
      return <ConsortiumPages subPage="concierge" />;
    case 'about':
      return <ConsortiumPages subPage="about" />;
    case 'ethos':
      return <ConsortiumPages subPage="ethos" />;
    case 'approach':
      return <ConsortiumPages subPage="approach" />;
    case 'network':
      return <ConsortiumPages subPage="network" />;
    case 'our-london':
      return <ConsortiumPages subPage="our-london" />;
    case 'privacy-discretion':
      return <ConsortiumPages subPage="privacy" />;
    case 'cultural-traditions':
      return <CulturalHospitalityPage />;
    case 'services':
      return <ServicesHub />;
    case 'service-detail':
      return <ServiceDetailPage serviceId={route.serviceId} />;
    case 'subservice-detail':
      return <SubServiceDetailPage serviceId={route.serviceId} subServiceId={route.subServiceId} />;
    case 'membership':
      return <MembershipPage />;
    case 'commission-studio':
      return <CommissionStudio />;
    case 'case-studies':
      return <CaseStudiesPage />;
    case 'member-portal':
      return <MembersPage />;
    case 'calendar':
      return <CalendarPage />;
    case 'journal':
      return <JournalPage />;
    case 'journal-article':
      return <ArticleDetailPage articleSlug={route.articleSlug} />;
    case 'contact':
      return <ContactPage />;
    case 'faq':
      return <FAQPage />;
    case 'hidden-london':
      return <HiddenLondonPage initialSubPage="all" />;
    case 'hidden-london-subterranean':
      return <HiddenLondonPage initialSubPage="underground" />;
    case 'hidden-london-industrial':
      return <HiddenLondonPage initialSubPage="architecture" />;
    case 'hidden-london-combat':
      return <HiddenLondonPage initialSubPage="fight-nights" />;
    case 'hidden-london-gaming':
      return <HiddenLondonPage initialSubPage="casino-nights" />;
    case 'hidden-london-maritime':
      return <HiddenLondonPage initialSubPage="thames-after-dark" />;
    case 'hidden-london-gastronomy':
      return <HiddenLondonPage initialSubPage="supper-clubs" />;
    case 'hidden-london-exploration':
      return <HiddenLondonPage initialSubPage="rooftops" />;
    case 'hidden-london-after-hours':
      return <HiddenLondonPage initialSubPage="jazz" />;
    case 'hidden-london-urban-clubs':
      return <HiddenLondonPage initialSubPage="club-nights" />;
    case 'hidden-london-itinerary':
      return <HiddenLondonPage initialSubPage="24-hours" />;
    case 'privacy-policy':
    case 'terms':
    case 'cookie-policy':
    case 'accessibility':
    case 'image-credits':
    case 'sitemap':
    case 'not-found':
      return <LegalPages page={route.page} />;
    default:
      return <HomePage />;
  }
};

function PageContentWrapper() {
  const { route, language } = useNavigation();
  useDocumentHead(route);
  const routeKey = `${route.page}-${route.serviceId || ''}-${route.subServiceId || ''}-${route.articleSlug || ''}-${route.subSection || ''}`;
  usePageTranslator(language, routeKey);
  const isEditorial = route.page === 'journal' || route.page === 'journal-article' || route.page === 'calendar' || route.page === 'case-studies';

  return (
    <Suspense fallback={<RouteFallback isEditorial={isEditorial} />}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={routeKey}
          initial={{ opacity: 0.88, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.9, y: -4 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <PageContent />
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
}

function GlobalScrollEnhancements() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 680);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Subtle architectural brass hairline reading progress */}
      <motion.div
        style={{ scaleX }}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8B672B] via-[#E2BA6B] to-[#C4933F] origin-left z-[60] pointer-events-none"
      />

      {/* Desktop Back-to-Top Elevator */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Return to top of page"
            className="hidden md:flex fixed bottom-4 left-4 z-40 items-center gap-2 px-3.5 py-2.5 bg-[#0C0D12]/90 backdrop-blur-xl border border-[#2B2D3A] hover:border-[#CFA85E] text-xs font-serif text-[#D9D4CA] hover:text-[#CFA85E] shadow-2xl transition-colors min-h-[40px]"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#CFA85E]" />
            <span>Top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export interface AppProps {
  url?: string;
}

export default function App({ url }: AppProps = {}) {
  return (
    <MotionConfig reducedMotion="user">
      <AmbienceProvider>
        <NavigationProvider initialUrl={url}>
          <div className="min-h-screen bg-[#07080B] text-[#D4D8E2] flex flex-col font-sans selection:bg-[#B98633]/30 selection:text-[#FAF7F0]">
            <GlobalScrollEnhancements />
            <Header />
            <BreadcrumbNav />
            <main className="flex-1">
              <PageContentWrapper />
            </main>
            <Footer />
            <LazyModals />
            <CookieBanner />
            <AmbiencePlayer />
          </div>
        </NavigationProvider>
      </AmbienceProvider>
    </MotionConfig>
  );
}
