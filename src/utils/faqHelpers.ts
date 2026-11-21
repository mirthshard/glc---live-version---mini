import { ServiceCategory, SubService } from '../types';
import { SERVICE_CATEGORY_FAQS, type RichFaqEntry } from '../data/serviceCategoryFaqs';
import { SUB_SERVICE_FAQS } from '../data/subServiceFaqs';

export interface NormalizedFaqItem {
  q: string;
  a: string;
}

export const EXACT_FAQ_COUNT = 10;

const normalizeKey = (text: string) =>
  text.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/**
 * Returns exactly 10 rich, humanised FAQs for a core service category page.
 */
export function getServiceCategoryFaqs(service: ServiceCategory): RichFaqEntry[] {
  const curated = SERVICE_CATEGORY_FAQS[service.id];
  const source: RichFaqEntry[] =
    curated && curated.length > 0
      ? curated
      : (service.faqs ?? []).map((f) => ({ question: f.question, answer: f.answer }));

  const result: RichFaqEntry[] = [];
  const seen = new Set<string>();

  for (const item of source) {
    const key = normalizeKey(item.question);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push({ question: item.question, answer: item.answer });
    if (result.length === EXACT_FAQ_COUNT) break;
  }

  return result;
}

/**
 * Builds exactly 10 rich, non-duplicate FAQs for a sub-service detail page:
 * leads with the sub-service's 4 bespoke specialty FAQs, then completes to
 * exactly 10 using non-duplicate FAQs from its parent service category.
 */
export function getSubServiceFaqs(
  subService: SubService,
  parentService: ServiceCategory
): NormalizedFaqItem[] {
  const result: NormalizedFaqItem[] = [];
  const seen = new Set<string>();

  const curatedSubFaqs = SUB_SERVICE_FAQS[subService.id];
  const subSource: NormalizedFaqItem[] =
    curatedSubFaqs && curatedSubFaqs.length > 0
      ? curatedSubFaqs.map((item) => ({ q: item.question, a: item.answer }))
      : (subService.faqs ?? []).map((item) => ({ q: item.q, a: item.a }));

  for (const item of subSource) {
    const key = normalizeKey(item.q);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push({ q: item.q, a: item.a });
    if (result.length === EXACT_FAQ_COUNT) return result;
  }

  for (const item of getServiceCategoryFaqs(parentService)) {
    const key = normalizeKey(item.question);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push({ q: item.question, a: item.answer });
    if (result.length === EXACT_FAQ_COUNT) break;
  }

  return result;
}
