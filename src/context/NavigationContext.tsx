import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { PageRoute, RouteState } from '../types';
import { parsePath, pathFor, resolveLegacyHash } from '../routing/routes';
import {
  LanguageCode,
  LANGUAGE_MAP,
  TranslationKey,
  isValidLanguageCode,
  translate,
} from '../data/translations';

interface NavigationContextType {
  route: RouteState;
  navigateTo: (page: PageRoute, params?: Partial<Omit<RouteState, 'page'>>) => void;
  navigateToPath: (pathname: string) => void;
  isIntroModalOpen: boolean;
  introModalInterest: string;
  openIntroductionModal: (interest?: string) => void;
  closeIntroductionModal: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  cookieConsent: boolean | null;
  setCookieConsent: (consent: boolean) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isRtl: boolean;
  t: (key: TranslationKey) => string;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);
const LANGUAGE_STORAGE_KEY = 'tglc_language';

interface NavigationProviderProps {
  children: ReactNode;
  initialUrl?: string;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children, initialUrl }) => {
  const [route, setRoute] = useState<RouteState>(() =>
    parsePath(initialUrl ?? (typeof window !== 'undefined' ? window.location.pathname : '/'))
  );

  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [introModalInterest, setIntroModalInterest] = useState('General Membership & Advisory');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cookieConsent, setCookieConsentState] = useState<boolean | null>(null);
  const [language, setLanguageState] = useState<LanguageCode>('en');

  // Read persisted cookie consent and language after mount (SSR/prerender safe)
  useEffect(() => {
    try {
      const storedConsent = window.localStorage.getItem('tglc_cookie_consent');
      if (storedConsent !== null) {
        setCookieConsentState(JSON.parse(storedConsent));
      }
      const storedLang = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (isValidLanguageCode(storedLang)) {
        setLanguageState(storedLang);
      }
    } catch {
      // ignore storage restrictions
    }
  }, []);

  // Sync HTML lang and dir (RTL support for Arabic) whenever language changes
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const meta = LANGUAGE_MAP[language] ?? LANGUAGE_MAP.en;
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;
  }, [language]);

  // Redirect legacy hash routes on mount while preserving plain in-page anchors
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const rawHash = window.location.hash;
    if (!rawHash) return;

    const resolvedPath = resolveLegacyHash(rawHash);
    if (resolvedPath) {
      window.history.replaceState(null, '', resolvedPath);
      setRoute(parsePath(resolvedPath));
    }
  }, []);

  const setCookieConsent = useCallback((consent: boolean) => {
    setCookieConsentState(consent);
    try {
      window.localStorage.setItem('tglc_cookie_consent', JSON.stringify(consent));
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    if (!isValidLanguageCode(lang)) return;
    setLanguageState(lang);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, []);

  const isRtl = (LANGUAGE_MAP[language]?.dir ?? 'ltr') === 'rtl';

  const t = useCallback(
    (key: TranslationKey) => translate(language, key),
    [language]
  );

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
    setIsIntroModalOpen(false);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const navigateToPath = useCallback((rawPath: string) => {
    const nextRoute = parsePath(rawPath);
    const canonical =
      nextRoute.page === 'not-found'
        ? rawPath.startsWith('/') ? rawPath : `/${rawPath}`
        : pathFor(nextRoute.page, {
            serviceId: nextRoute.serviceId,
            subServiceId: nextRoute.subServiceId,
            articleSlug: nextRoute.articleSlug,
          });

    setRoute(nextRoute);
    setIsSearchOpen(false);
    setIsIntroModalOpen(false);

    if (typeof window !== 'undefined') {
      if (window.location.pathname !== canonical || window.location.hash) {
        window.history.pushState(null, '', canonical);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, []);

  const navigateTo = useCallback((page: PageRoute, params?: Partial<Omit<RouteState, 'page'>>) => {
    const newState: RouteState = { page, ...params };
    const nextPath = pathFor(page, params);

    setRoute(newState);
    setIsSearchOpen(false);
    setIsIntroModalOpen(false);

    if (typeof window !== 'undefined') {
      if (window.location.pathname !== nextPath || window.location.hash) {
        window.history.pushState(null, '', nextPath);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [route.page, route.serviceId, route.subServiceId, route.articleSlug]);

  const openIntroductionModal = useCallback((interest?: string) => {
    if (interest) setIntroModalInterest(interest);
    setIsSearchOpen(false);
    setIsIntroModalOpen(true);
  }, []);

  const closeIntroductionModal = useCallback(() => {
    setIsIntroModalOpen(false);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parsePath(window.location.pathname));
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        return;
      }

      // Quick slash key when not in an input/textarea/select
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        route,
        navigateTo,
        navigateToPath,
        isIntroModalOpen,
        introModalInterest,
        openIntroductionModal,
        closeIntroductionModal,
        isSearchOpen,
        openSearch,
        closeSearch,
        cookieConsent,
        setCookieConsent,
        language,
        setLanguage,
        isRtl,
        t,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
