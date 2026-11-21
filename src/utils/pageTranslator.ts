import { useEffect } from 'react';
import { LanguageCode, TRANSLATIONS } from '../data/translations';

export interface LanguagePack {
  lang: LanguageCode;
  exact: Record<string, string>;
  phrases: Record<string, string>;
  words: Record<string, string>;
}

interface CompiledPack {
  lang: LanguageCode;
  exactLower: Map<string, string>;
  phraseEntries: Array<{ pattern: RegExp; replacement: string }>;
  words: Record<string, string>;
  knownTargetStrings: Set<string>;
}

const PACK_PROMISE_CACHE = new Map<LanguageCode, Promise<CompiledPack | null>>();
const LIVE_CACHE = new Map<LanguageCode, Record<string, string>>();
const IN_FLIGHT_KEYS = new Map<LanguageCode, Set<string>>();

const SKIP_TAGS = new Set([
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
  'CODE',
  'PRE',
  'TEXTAREA',
  'SVG',
  'OPTION',
]);

const TRANSLATABLE_ATTRS = ['placeholder', 'aria-label', 'title'] as const;

const originalTextMap = new WeakMap<Text, string>();
const lastAppliedTextMap = new WeakMap<Text, string>();
const originalAttrMap = new WeakMap<Element, Record<string, string>>();
const lastAppliedAttrMap = new WeakMap<Element, Record<string, string>>();
const trackedTextNodes = new Set<Text>();
const trackedElements = new Set<Element>();

let originalTitleByRoute = new Map<string, string>();
let lastAppliedTitle: string | null = null;

/**
 * Normalizes quotes, dashes and internal whitespace for stable dictionary lookups.
 */
export function normalizeLookupKey(text: string): string {
  return text
    .replace(/[\u2018\u2019\u201A\u2032]/g, "'")
    .replace(/[\u201C\u201D\u201E\u2033]/g, '"')
    .replace(/[\u2013\u2014]/g, '—')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Returns true when a text string should remain untouched (identifiers, phone numbers,
 * email addresses, postcodes, counters, symbols, brand abbreviations, etc.).
 */
export function shouldSkipTranslation(raw: string): boolean {
  const text = raw.trim();
  if (!text) return true;
  if (text.length <= 1) return true;

  // Must contain at least one ASCII letter to be English source copy
  if (!/[A-Za-z]/.test(text)) return true;

  // Emails, URLs, social handles
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return true;
  if (/^(https?:\/\/|www\.)/i.test(text)) return true;
  if (/^@[A-Za-z0-9._-]+$/.test(text)) return true;

  // UK postcodes, phone numbers, company registration numbers, keyboard shortcuts
  if (/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(text)) return true;
  if (/^(\+?\d[\d\s\-()]{6,})$/.test(text)) return true;
  if (/^[⌘⌥⇧⌃]+[A-Za-z0-9]$/.test(text)) return true;

  // Pure Roman numerals (I., II., III., IV., V., VI., VII.)
  if (/^(I|II|III|IV|V|VI|VII|VIII|IX|X)\.?$/.test(text)) return true;

  // Short brand / language codes
  if (/^(TGLC|UK|EN|FR|AR|ZH|DE|ES|IT|JA|KO|RU|PT|HI|TR|NL|SV|NO|EL|HE|UR|MS|SSL|HTTPS|URL|WCAG|AA|GDPR|ICO|NDA|FBO|VIP|MPV|CEO|EA|PA)$/i.test(text)) {
    return true;
  }

  return false;
}

function isLatinLikeTarget(lang: LanguageCode): boolean {
  return ['fr', 'de', 'es', 'it', 'pt', 'tr', 'nl', 'sv', 'no', 'ms'].includes(lang);
}

function preserveCase(source: string, target: string, lang: LanguageCode): string {
  if (!target) return target;
  if (!isLatinLikeTarget(lang) && lang !== 'ru' && lang !== 'el') {
    return target;
  }
  // All uppercase acronym/heading word (at least 3 chars)
  if (source.length >= 3 && source === source.toUpperCase() && /[A-Z]/.test(source)) {
    return target.toUpperCase();
  }
  // Capitalized first character
  if (source[0] === source[0].toUpperCase() && source[0] !== source[0].toLowerCase()) {
    return target.charAt(0).toUpperCase() + target.slice(1);
  }
  return target;
}

function lookupWord(rawWord: string, words: Record<string, string>, lang: LanguageCode): string | null {
  const normalized = rawWord.replace(/[\u2018\u2019]/g, "'");
  const lower = normalized.toLowerCase();

  // Direct hit
  if (words[lower]) {
    return preserveCase(rawWord, words[lower], lang);
  }

  // Possessive ('s)
  if (lower.endsWith("'s") && lower.length > 3) {
    const stem = lower.slice(0, -2);
    if (words[stem]) {
      return preserveCase(rawWord, words[stem], lang);
    }
  }

  // Hyphenated compound words (e.g., late-night, alcohol-free, full-day)
  if (lower.includes('-')) {
    const parts = rawWord.split('-');
    let anyTranslated = false;
    const translatedParts = parts.map((part) => {
      const hit = lookupWord(part, words, lang);
      if (hit) {
        anyTranslated = true;
        return hit;
      }
      return part;
    });
    if (anyTranslated) {
      return translatedParts.join(isLatinLikeTarget(lang) ? ' ' : ' ');
    }
  }

  // Common English plural & verb inflections
  const candidates: string[] = [];
  if (lower.endsWith('ies') && lower.length > 4) {
    candidates.push(lower.slice(0, -3) + 'y');
  }
  if (lower.endsWith('es') && lower.length > 4) {
    candidates.push(lower.slice(0, -2));
    candidates.push(lower.slice(0, -1));
  }
  if (lower.endsWith('s') && !lower.endsWith('ss') && lower.length > 3) {
    candidates.push(lower.slice(0, -1));
  }
  if (lower.endsWith('ing') && lower.length > 5) {
    const stem = lower.slice(0, -3);
    candidates.push(stem, stem + 'e');
    if (stem.length > 2 && stem[stem.length - 1] === stem[stem.length - 2]) {
      candidates.push(stem.slice(0, -1));
    }
  }
  if (lower.endsWith('ed') && lower.length > 4) {
    const stem = lower.slice(0, -2);
    candidates.push(stem, stem + 'e');
    if (stem.endsWith('i')) {
      candidates.push(stem.slice(0, -1) + 'y');
    }
  }
  if (lower.endsWith('ly') && lower.length > 4) {
    candidates.push(lower.slice(0, -2));
  }

  for (const cand of candidates) {
    if (words[cand]) {
      return preserveCase(rawWord, words[cand], lang);
    }
  }

  return null;
}

export function compileLanguagePack(pack: LanguagePack): CompiledPack {
  const exactLower = new Map<string, string>();
  for (const [k, v] of Object.entries(pack.exact || {})) {
    const norm = normalizeLookupKey(k).toLowerCase();
    if (norm && v) exactLower.set(norm, v);
  }

  // Also index every English UI translation from TRANSLATIONS.en -> TRANSLATIONS[lang]
  const enUi = TRANSLATIONS.en;
  const targetUi = TRANSLATIONS[pack.lang];
  const knownTargetStrings = new Set<string>();
  if (enUi && targetUi) {
    for (const key of Object.keys(enUi) as Array<keyof typeof enUi>) {
      const enNorm = normalizeLookupKey(enUi[key]).toLowerCase();
      const targetVal = targetUi[key];
      if (enNorm && targetVal && !exactLower.has(enNorm)) {
        exactLower.set(enNorm, targetVal);
      }
      if (targetVal) {
        knownTargetStrings.add(normalizeLookupKey(targetVal).toLowerCase());
      }
    }
  }

  // Add all exact target strings to knownTargetStrings to prevent double translation
  for (const val of exactLower.values()) {
    knownTargetStrings.add(normalizeLookupKey(val).toLowerCase());
  }

  // Sort phrases longest-first so multi-word matches always win over shorter fragments
  const phraseEntries = Object.entries(pack.phrases || {})
    .filter(([k, v]) => k.trim().length > 0 && v.trim().length > 0)
    .sort((a, b) => b[0].length - a[0].length)
    .map(([phrase, replacement]) => ({
      pattern: new RegExp(`\\b${escapeRegExp(normalizeLookupKey(phrase))}\\b`, 'gi'),
      replacement,
    }));

  const lowerWords: Record<string, string> = {};
  for (const [k, v] of Object.entries(pack.words || {})) {
    if (k && v) lowerWords[k.toLowerCase()] = v;
  }

  return {
    lang: pack.lang,
    exactLower,
    phraseEntries,
    words: lowerWords,
    knownTargetStrings,
  };
}

export interface TranslationResult {
  text: string;
  isExact: boolean;
}

/**
 * Pure translation helper: translates any visible English string using
 * live cache -> exact dictionary -> composite/sentence exact -> phrases + word lexicon.
 */
export function translateStringWithPack(
  rawText: string,
  compiled: CompiledPack,
  liveCache?: Record<string, string>
): TranslationResult {
  if (shouldSkipTranslation(rawText)) {
    return { text: rawText, isExact: true };
  }

  const match = rawText.match(/^(\s*)([\s\S]*?)(\s*)$/);
  const lead = match?.[1] ?? '';
  const core = match?.[2] ?? rawText;
  const tail = match?.[3] ?? '';

  const norm = normalizeLookupKey(core);
  const normLower = norm.toLowerCase();

  // Already a known translated UI string for this target language (e.g. rendered via t(...))
  if (compiled.knownTargetStrings.has(normLower)) {
    return { text: rawText, isExact: true };
  }

  // 1. Live edge-translation cache
  if (liveCache && liveCache[norm]) {
    return { text: lead + liveCache[norm] + tail, isExact: true };
  }

  // 2. Exact match in static pack
  const exactHit = compiled.exactLower.get(normLower);
  if (exactHit) {
    return { text: lead + exactHit + tail, isExact: true };
  }

  // 3. Composite strings separated by middot, em-dash or pipe (e.g. "01 · Savile Row & Craft")
  if (/\s+[·|]\s+/.test(norm)) {
    const tokens = norm.split(/(\s+[·|]\s+)/);
    let allExact = true;
    const translatedTokens = tokens.map((tok, idx) => {
      if (idx % 2 === 1) return tok;
      if (shouldSkipTranslation(tok)) return tok;
      const sub = translateStringWithPack(tok, compiled, liveCache);
      if (!sub.isExact) allExact = false;
      return sub.text;
    });
    return { text: lead + translatedTokens.join('') + tail, isExact: allExact };
  }

  // 4. Multi-sentence split check (if every sentence is an exact hit)
  const sentences = norm.split(/(?<=[.!?])\s+/);
  if (sentences.length > 1) {
    let allSentencesExact = true;
    const mapped = sentences.map((s) => {
      const sKey = normalizeLookupKey(s);
      const sLower = sKey.toLowerCase();
      if (liveCache?.[sKey]) return liveCache[sKey];
      const eHit = compiled.exactLower.get(sLower);
      if (eHit) return eHit;
      allSentencesExact = false;
      return s;
    });
    if (allSentencesExact) {
      return { text: lead + mapped.join(' ') + tail, isExact: true };
    }
  }

  // 5. Phrase + Word Lexicon translation
  let working = norm;
  const placeholders: string[] = [];

  for (const { pattern, replacement } of compiled.phraseEntries) {
    pattern.lastIndex = 0;
    if (pattern.test(working)) {
      pattern.lastIndex = 0;
      working = working.replace(pattern, (matched) => {
        const idx = placeholders.length;
        placeholders.push(preserveCase(matched, replacement, compiled.lang));
        return `\uE000${idx}\uE001`;
      });
    }
  }

  // Translate remaining English words while skipping placeholder markers
  working = working.replace(/\uE000\d+\uE001|[A-Za-z][A-Za-z'’-]*/g, (token) => {
    if (token.startsWith('\uE000')) return token;
    if (/^(TGLC|Mayfair|London|Savile|Row|Albemarle|Belgravia|Knightsbridge|Chelsea|Marylebone|Soho|St|James's|Thames|Wimbledon|Ascot|Goodwood|Frieze|Cotswolds|Heathrow|Farnborough|Harrods|Claridge's|Connaught|Halal|Ramadan|Iftar|Suhoor|Eid|Qibla|Jumu'ah|Kosher|Shabbat|Sattvic|Diwali|Vaisakhi)$/i.test(token)) {
      const properHit = compiled.words[token.toLowerCase()];
      if (properHit) return preserveCase(token, properHit, compiled.lang);
      return token;
    }
    const wordHit = lookupWord(token, compiled.words, compiled.lang);
    return wordHit ?? token;
  });

  // Restore phrase placeholders
  working = working.replace(/\uE000(\d+)\uE001/g, (_, idxStr) => placeholders[Number(idxStr)] ?? '');

  // Clean up spacing before punctuation
  working = working
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return { text: lead + working + tail, isExact: false };
}

function getStorageKey(lang: LanguageCode): string {
  return `tglc_tr_v1_${lang}`;
}

function getLiveCache(lang: LanguageCode): Record<string, string> {
  const existing = LIVE_CACHE.get(lang);
  if (existing) return existing;

  let loaded: Record<string, string> = {};
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(getStorageKey(lang));
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          loaded = parsed as Record<string, string>;
        }
      }
    } catch {
      // Ignore storage access failures
    }
  }
  LIVE_CACHE.set(lang, loaded);
  return loaded;
}

function saveLiveCache(lang: LanguageCode, cache: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  try {
    // Keep cache bounded so localStorage never overflows
    const entries = Object.entries(cache);
    const trimmed = entries.length > 600 ? Object.fromEntries(entries.slice(-600)) : cache;
    window.localStorage.setItem(getStorageKey(lang), JSON.stringify(trimmed));
  } catch {
    // Ignore quota errors
  }
}

export async function loadLanguagePack(lang: LanguageCode): Promise<CompiledPack | null> {
  if (lang === 'en') return null;

  const existing = PACK_PROMISE_CACHE.get(lang);
  if (existing) return existing;

  const promise = (async () => {
    try {
      const res = await fetch(`/i18n/${lang}.json`, { credentials: 'same-origin' });
      if (!res.ok) return null;
      const data = (await res.json()) as LanguagePack;
      if (!data || typeof data !== 'object') return null;
      return compileLanguagePack({
        lang,
        exact: data.exact || {},
        phrases: data.phrases || {},
        words: data.words || {},
      });
    } catch {
      return null;
    }
  })();

  PACK_PROMISE_CACHE.set(lang, promise);
  return promise;
}

function isInsideNoTranslate(node: Node | null): boolean {
  let el: HTMLElement | null =
    node instanceof HTMLElement ? node : node?.parentElement ?? null;

  while (el) {
    if (SKIP_TAGS.has(el.tagName)) return true;
    if (el.getAttribute('data-no-translate') === 'true') return true;
    el = el.parentElement;
  }
  return false;
}

function isLocalDevelopmentHost(): boolean {
  if (typeof window === 'undefined') return true;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host === '::1';
}

export function restoreOriginalPage(routeKey?: string): void {
  if (typeof document === 'undefined') return;

  for (const node of trackedTextNodes) {
    if (!node.isConnected) {
      trackedTextNodes.delete(node);
      continue;
    }
    const orig = originalTextMap.get(node);
    const last = lastAppliedTextMap.get(node);
    if (orig !== undefined && last === node.nodeValue) {
      node.nodeValue = orig;
    }
    lastAppliedTextMap.delete(node);
  }

  for (const el of trackedElements) {
    if (!el.isConnected) {
      trackedElements.delete(el);
      continue;
    }
    const origAttrs = originalAttrMap.get(el);
    const lastAttrs = lastAppliedAttrMap.get(el);
    if (origAttrs && lastAttrs) {
      for (const attr of TRANSLATABLE_ATTRS) {
        if (origAttrs[attr] !== undefined && lastAttrs[attr] === el.getAttribute(attr)) {
          el.setAttribute(attr, origAttrs[attr]);
        }
      }
    }
    lastAppliedAttrMap.delete(el);
  }

  if (routeKey) {
    const savedTitle = originalTitleByRoute.get(routeKey);
    if (savedTitle && lastAppliedTitle === document.title) {
      document.title = savedTitle;
      lastAppliedTitle = null;
    }
  }
}

async function upgradeStringsViaEdge(
  lang: LanguageCode,
  texts: string[],
  onComplete: () => void
): Promise<void> {
  if (isLocalDevelopmentHost() || texts.length === 0) return;

  let inFlight = IN_FLIGHT_KEYS.get(lang);
  if (!inFlight) {
    inFlight = new Set<string>();
    IN_FLIGHT_KEYS.set(lang, inFlight);
  }

  const cache = getLiveCache(lang);
  const toFetch = texts
    .filter((t) => t.length >= 18 && !cache[t] && !inFlight!.has(t))
    .slice(0, 40);

  if (toFetch.length === 0) return;
  for (const t of toFetch) inFlight.add(t);

  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: lang, texts: toFetch }),
    });
    if (!res.ok) return;
    const data = (await res.json()) as { translations?: string[] };
    if (!Array.isArray(data.translations)) return;

    let updated = false;
    toFetch.forEach((src, i) => {
      const tr = data.translations?.[i];
      if (typeof tr === 'string' && tr.trim().length > 0 && tr !== src) {
        cache[src] = tr;
        updated = true;
      }
    });

    if (updated) {
      saveLiveCache(lang, cache);
      onComplete();
    }
  } catch {
    // Graceful fallback: static pack translation already displayed
  } finally {
    for (const t of toFetch) inFlight.delete(t);
  }
}

export function applyPageTranslation(
  compiled: CompiledPack,
  routeKey: string,
  onEdgeUpgrade?: () => void
): void {
  if (typeof document === 'undefined' || !document.body) return;

  const liveCache = getLiveCache(compiled.lang);
  const edgeCandidates = new Set<string>();

  // 1. Translate document.title
  if (document.title) {
    if (lastAppliedTitle !== document.title) {
      originalTitleByRoute.set(routeKey, document.title);
    }
    const baseTitle = originalTitleByRoute.get(routeKey) ?? document.title;
    const titleRes = translateStringWithPack(baseTitle, compiled, liveCache);
    if (titleRes.text !== document.title) {
      document.title = titleRes.text;
      lastAppliedTitle = titleRes.text;
    }
  }

  // 2. Walk every visible text node in document.body
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let currentNode = walker.nextNode();
  while (currentNode) {
    nodes.push(currentNode as Text);
    currentNode = walker.nextNode();
  }

  for (const textNode of nodes) {
    if (isInsideNoTranslate(textNode)) continue;
    const currentVal = textNode.nodeValue ?? '';
    if (!currentVal.trim()) continue;

    // If React changed the text node itself (e.g. tab switch or t(...) update), refresh source
    const prevApplied = lastAppliedTextMap.get(textNode);
    if (prevApplied !== currentVal) {
      originalTextMap.set(textNode, currentVal);
    }

    const sourceVal = originalTextMap.get(textNode) ?? currentVal;
    if (shouldSkipTranslation(sourceVal)) continue;

    const result = translateStringWithPack(sourceVal, compiled, liveCache);
    if (!result.isExact) {
      edgeCandidates.add(normalizeLookupKey(sourceVal));
    }

    if (result.text !== currentVal) {
      textNode.nodeValue = result.text;
    }
    lastAppliedTextMap.set(textNode, textNode.nodeValue ?? result.text);
    trackedTextNodes.add(textNode);
  }

  // 3. Translate placeholder, aria-label, and title attributes
  const elements = document.body.querySelectorAll('[placeholder], [aria-label], [title]');
  elements.forEach((el) => {
    if (isInsideNoTranslate(el)) return;
    let origAttrs = originalAttrMap.get(el);
    let lastAttrs = lastAppliedAttrMap.get(el);

    for (const attr of TRANSLATABLE_ATTRS) {
      const currentAttr = el.getAttribute(attr);
      if (!currentAttr || !currentAttr.trim()) continue;

      if (!origAttrs) {
        origAttrs = {};
        originalAttrMap.set(el, origAttrs);
      }
      if (!lastAttrs) {
        lastAttrs = {};
        lastAppliedAttrMap.set(el, lastAttrs);
      }

      if (lastAttrs[attr] !== currentAttr) {
        origAttrs[attr] = currentAttr;
      }

      const sourceAttr = origAttrs[attr] ?? currentAttr;
      if (shouldSkipTranslation(sourceAttr)) continue;

      const res = translateStringWithPack(sourceAttr, compiled, liveCache);
      if (res.text !== currentAttr) {
        el.setAttribute(attr, res.text);
      }
      lastAttrs[attr] = res.text;
      trackedElements.add(el);
    }
  });

  // 4. In live Cloudflare Pages production, progressively upgrade any long non-exact copy
  if (edgeCandidates.size > 0 && onEdgeUpgrade) {
    void upgradeStringsViaEdge(compiled.lang, Array.from(edgeCandidates), onEdgeUpgrade);
  }
}

/**
 * React hook mounted once at the application root.
 * Translates every visible text node across all routes, modals, accordions, tabs and menus
 * whenever the selected language is non-English, and cleanly restores English on switch back.
 */
export function usePageTranslator(language: LanguageCode, routeKey: string): void {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    if (language === 'en') {
      restoreOriginalPage(routeKey);
      return;
    }

    let cancelled = false;
    let observer: MutationObserver | null = null;
    let rafId: number | null = null;
    let compiledRef: CompiledPack | null = null;

    const runTranslation = () => {
      if (cancelled || !compiledRef) return;
      // Temporarily pause observer so our own DOM writes do not trigger recursion
      observer?.disconnect();
      try {
        applyPageTranslation(compiledRef, routeKey, scheduleTranslation);
      } finally {
        if (!cancelled && observer && document.body) {
          observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
          });
        }
      }
    };

    const scheduleTranslation = () => {
      if (cancelled) return;
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        runTranslation();
      });
    };

    void loadLanguagePack(language).then((compiled) => {
      if (cancelled || !compiled) return;
      compiledRef = compiled;

      observer = new MutationObserver(() => {
        scheduleTranslation();
      });

      // Run immediately and once more after lazy route transitions settle
      runTranslation();
      window.setTimeout(() => {
        if (!cancelled) runTranslation();
      }, 180);
    });

    return () => {
      cancelled = true;
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [language, routeKey]);
}
