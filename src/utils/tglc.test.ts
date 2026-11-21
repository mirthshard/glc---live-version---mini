import test from 'node:test';
import assert from 'node:assert/strict';
import { SERVICES_DATA, CALENDAR_EVENTS, JOURNAL_ARTICLES, FAQS_DATA, TGLC_CONTACT } from '../data/tglcData';
import { getServiceCategoryFaqs, getSubServiceFaqs } from './faqHelpers';
import { HIDDEN_LONDON_SECTIONS } from '../components/access/HiddenLondonPage';
import { SIGNATURE_EXPERIENCES } from '../components/casestudies/CaseStudiesPage';

test('TGLC Contact information integrity', () => {
  assert.equal(TGLC_CONTACT.telephone, '020 3951 6369');
  assert.equal(TGLC_CONTACT.privateMemberLine, '020 3951 6369');
  assert.equal(TGLC_CONTACT.companyNumber, '16831098');
  assert.equal(TGLC_CONTACT.email, 'info@thegloballuxuryconsortium.com');
  assert.equal(TGLC_CONTACT.memberSupport, 'info@thegloballuxuryconsortium.com');
  assert.ok(TGLC_CONTACT.address.toString().includes('3rd Floor, 45 Albemarle Street'));
  assert.ok(TGLC_CONTACT.address.toString().includes('W1S 4JL'));
  assert.equal(TGLC_CONTACT.hours, 'Monday – Friday, 08:30 – 19:30');
});

test('Services dataset has all 7 required core categories', () => {
  assert.equal(SERVICES_DATA.length, 7);
  
  const expectedCategoryIds = [
    'travel-aviation',
    'dining-nightlife',
    'experiences-culture',
    'residences-relocation',
    'transport-security',
    'personal-private-office',
    'luxury-sourcing'
  ];

  for (const id of expectedCategoryIds) {
    const found = SERVICES_DATA.find((s) => s.id === id);
    assert.ok(found, `Category ${id} should exist in SERVICES_DATA`);
    assert.ok(found.subServices.length >= 5, `Category ${id} should have at least 5 sub-services`);
  }
});

test('Total distinct sub-practices exceed 35 across categories', () => {
  const totalSubServices = SERVICES_DATA.reduce((acc, cat) => acc + cat.subServices.length, 0);
  assert.ok(totalSubServices >= 35, `Expected at least 35 sub-services, found ${totalSubServices}`);
});

test('The Season calendar has 12 month-only events with valid categories', () => {
  assert.equal(CALENDAR_EVENTS.length, 12, `Expected 12 calendar events, found ${CALENDAR_EVENTS.length}`);
  const allowedCategories = new Set(['Art & Culture', 'Dining', 'Fashion', 'Music', 'Sport', 'Seasonal']);

  for (const event of CALENDAR_EVENTS) {
    assert.ok(event.id, 'Event must have an id');
    assert.ok(event.title, 'Event must have a title');
    assert.ok(event.month, 'Event must have a month');
    assert.ok(allowedCategories.has(event.category), `Invalid calendar category: ${event.category}`);
    assert.ok(event.description.length > 0, 'Event must have a description');
    assert.ok(event.image.startsWith('/assets/'), 'Event must have an existing asset image');
  }
});

test('Journal has 10 evergreen articles with valid slugs, metadata and service links', () => {
  assert.equal(JOURNAL_ARTICLES.length, 10, `Expected 10 journal articles, found ${JOURNAL_ARTICLES.length}`);
  const serviceIds = new Set(SERVICES_DATA.map((s) => s.id));
  const slugs = new Set<string>();
  const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

  for (const article of JOURNAL_ARTICLES) {
    assert.ok(article.slug, 'Article must have a slug');
    assert.ok(!slugs.has(article.slug), `Duplicate slug found: ${article.slug}`);
    slugs.add(article.slug);
    assert.equal(article.author, 'The TGLC Team', `Article ${article.slug} author must be The TGLC Team`);
    assert.ok(
      article.metaDescription.length >= 140 && article.metaDescription.length <= 155,
      `Article ${article.slug} metaDescription length (${article.metaDescription.length}) must be 140–155 chars`
    );
    assert.ok(serviceIds.has(article.relatedServiceId), `Article ${article.slug} links to unknown service ${article.relatedServiceId}`);
    assert.ok(article.relatedServiceLabel.length > 0, `Article ${article.slug} must have relatedServiceLabel`);
    assert.ok(article.contentParagraphs.length >= 3, `Article ${article.slug} must have detailed paragraphs`);
    const bodyText = [
      ...article.contentParagraphs,
      ...(article.subheadings || []).flatMap((s) => [s.title, ...s.paragraphs]),
    ].join(' ');
    const bodyWords = wordCount(bodyText);
    assert.ok(
      bodyWords >= 400 && bodyWords <= 600,
      `Article ${article.slug} body word count (${bodyWords}) must be 400–600 words`
    );
  }
});

test('Hidden London has 10 sections with 3 legal bookable ideas each', () => {
  assert.equal(HIDDEN_LONDON_SECTIONS.length, 10);
  for (const section of HIDDEN_LONDON_SECTIONS) {
    assert.equal(section.ideas.length, 3, `${section.id} must have 3 ideas`);
    for (const idea of section.ideas) {
      assert.ok(idea.title.length > 0);
      assert.ok(idea.summary.includes('subject to availability'), `${idea.id} must note availability`);
    }
  }
});

test('Signature Experiences has 12 concise examples', () => {
  assert.equal(SIGNATURE_EXPERIENCES.length, 12);
  const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
  for (const exp of SIGNATURE_EXPERIENCES) {
    assert.ok(words(exp.title) <= 7, `Experience title exceeds 7 words: ${exp.title}`);
    assert.ok(exp.summary.length > 0);
    assert.ok(exp.image.startsWith('/assets/'));
  }
});

test('FAQ dataset has the 10 core questions in General category with substantive answers', () => {
  assert.equal(FAQS_DATA.length, 10, `Expected 10 FAQs, found ${FAQS_DATA.length}`);
  for (const faq of FAQS_DATA) {
    assert.equal(faq.category, 'General');
    assert.ok(faq.question.length > 0);
    assert.ok(
      faq.answer.length >= 160,
      `General FAQ "${faq.question}" answer is too short (${faq.answer.length} chars)`
    );
  }
});

test('Services dataset conforms to simplified Phase 4 schema and regulatory notes', () => {
  const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
  for (const cat of SERVICES_DATA) {
    assert.equal(cat.highlights.length, 4, `${cat.id} must have exactly 4 highlights`);
    for (const h of cat.highlights) {
      assert.ok(words(h) <= 6, `${cat.id} highlight exceeds 6 words: ${h}`);
    }
    const categoryFaqs = getServiceCategoryFaqs(cat);
    assert.equal(categoryFaqs.length, 10, `${cat.id} category must have exactly 10 FAQs, got ${categoryFaqs.length}`);
    for (const f of categoryFaqs) {
      assert.ok(
        f.answer.length >= 160,
        `${cat.id} category FAQ "${f.question}" answer is too short (${f.answer.length} chars)`
      );
    }
    for (const sub of cat.subServices) {
      assert.ok(words(sub.shortDesc) <= 15, `${sub.id} shortDesc exceeds 15 words`);
      assert.ok(words(sub.leadParagraph) <= 40, `${sub.id} leadParagraph exceeds 40 words`);
      assert.ok(sub.detailedPoints.length >= 3 && sub.detailedPoints.length <= 5, `${sub.id} must have 3-5 bullets`);
      for (const p of sub.detailedPoints) {
        assert.ok(words(p) <= 8, `${sub.id} bullet exceeds 8 words: ${p}`);
      }
      if (sub.example) {
        assert.ok(sub.example.startsWith('For example, '), `${sub.id} example must start with "For example, "`);
      }
      assert.ok((sub.faqs || []).length >= 2, `${sub.id} must have at least 2 dedicated FAQs`);
      const combinedFaqs = getSubServiceFaqs(sub, cat);
      assert.equal(combinedFaqs.length, 10, `${sub.id} combined FAQs must be exactly 10, got ${combinedFaqs.length}`);
      const uniqueQuestions = new Set(combinedFaqs.map((f) => f.q.trim().toLowerCase()));
      assert.equal(uniqueQuestions.size, combinedFaqs.length, `${sub.id} combined FAQs must not contain duplicates`);
      for (const f of combinedFaqs) {
        assert.ok(
          f.a.length >= 160,
          `${sub.id} FAQ "${f.q}" answer is too short (${f.a.length} chars)`
        );
      }
    }
  }

  const transport = SERVICES_DATA.find((c) => c.id === 'transport-security');
  assert.equal(transport?.regulatoryNote, 'Security services are provided by licensed independent specialists.');
  const privateAviation = SERVICES_DATA.find((c) => c.id === 'travel-aviation')?.subServices.find((s) => s.id === 'private-aviation');
  assert.equal(privateAviation?.regulatoryNote, 'Flights are operated by licensed independent operators.');
  const healthWellness = SERVICES_DATA.find((c) => c.id === 'personal-private-office')?.subServices.find((s) => s.id === 'health-wellness-recovery');
  assert.equal(healthWellness?.regulatoryNote, "We don't give medical advice; we help arrange appointments with qualified professionals.");
  const londonResidences = SERVICES_DATA.find((c) => c.id === 'residences-relocation')?.subServices.find((s) => s.id === 'london-residences');
  assert.equal(londonResidences?.regulatoryNote, "We're not estate agents; we introduce you to regulated professionals.");
  const luxurySourcing = SERVICES_DATA.find((c) => c.id === 'luxury-sourcing');
  assert.equal(luxurySourcing?.regulatoryNote, undefined);
});

