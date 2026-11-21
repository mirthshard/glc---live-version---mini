import test from 'node:test';
import assert from 'node:assert/strict';
import imageManifest from '../data/imageManifest.json';
import { SERVICES_DATA, JOURNAL_ARTICLES } from '../data/tglcData';
import { HIDDEN_LONDON_SECTIONS } from '../components/access/HiddenLondonPage';
import {
  buildUniqueSlides,
  CONSORTIUM_SUBPAGE_SLIDES,
  MEMBERSHIP_HERO_SLIDES,
  SIGNATURE_EXPERIENCES_HERO_SLIDES,
  FAQ_HERO_SLIDES,
  CONTACT_HERO_SLIDES,
  MEMBERS_HERO_SLIDES,
  JOURNAL_HERO_SLIDES,
  CALENDAR_HERO_SLIDES,
  HIDDEN_LONDON_HUB_SLIDES,
  HIDDEN_LONDON_SECTION_EXTRA_SLIDES,
  getServiceCategoryHeroSlides,
  getSubServiceHeroSlides,
} from './carouselSlides';

const manifestKeys = new Set(Object.keys(imageManifest as Record<string, unknown>));

function assertValidCarousel(label: string, images: string[], minSlides = 5) {
  assert.ok(
    images.length >= minSlides,
    `${label}: expected at least ${minSlides} slides, got ${images.length}`
  );
  const unique = new Set(images);
  assert.equal(
    unique.size,
    images.length,
    `${label}: contains duplicate images (${images.join(', ')})`
  );
  for (const img of images) {
    assert.ok(
      manifestKeys.has(img),
      `${label}: image "${img}" not found in src/data/imageManifest.json`
    );
  }
}

test('buildUniqueSlides deduplicates and fills to minCount', () => {
  const result = buildUniqueSlides(
    [{ image: '/a.jpg' }, { image: '/a.jpg' }, { image: '/b.jpg' }],
    [{ image: '/b.jpg' }, { image: '/c.jpg' }, { image: '/d.jpg' }, { image: '/e.jpg' }],
    5
  );
  assert.deepEqual(
    result.map((r) => r.image),
    ['/a.jpg', '/b.jpg', '/c.jpg', '/d.jpg', '/e.jpg']
  );
});

test('all 7 service category carousels have >= 5 unique verified slides', () => {
  for (const cat of SERVICES_DATA) {
    const slides = getServiceCategoryHeroSlides(cat);
    assertValidCarousel(`ServiceCategory(${cat.id})`, slides, 5);
  }
});

test('all 39 sub-service carousels have >= 5 unique verified slides', () => {
  for (const cat of SERVICES_DATA) {
    for (const sub of cat.subServices) {
      const slides = getSubServiceHeroSlides(sub, cat);
      assertValidCarousel(`SubService(${cat.id}/${sub.id})`, slides, 5);
    }
  }
});

test('all 7 Consortium sub-page carousels have >= 5 unique verified slides', () => {
  for (const [key, slides] of Object.entries(CONSORTIUM_SUBPAGE_SLIDES)) {
    assertValidCarousel(
      `Consortium(${key})`,
      slides.map((s) => s.image),
      5
    );
  }
});

test('Membership, Signature Experiences, FAQ, Contact, Members, Journal and Calendar carousels have >= 5 unique verified slides', () => {
  assertValidCarousel('Membership', MEMBERSHIP_HERO_SLIDES.map((s) => s.image), 5);
  assertValidCarousel('SignatureExperiences', SIGNATURE_EXPERIENCES_HERO_SLIDES.map((s) => s.image), 5);
  assertValidCarousel('FAQ', FAQ_HERO_SLIDES.map((s) => s.image), 5);
  assertValidCarousel('Contact', CONTACT_HERO_SLIDES.map((s) => s.image), 5);
  assertValidCarousel('Members', MEMBERS_HERO_SLIDES.map((s) => s.image), 5);
  assertValidCarousel('Journal', JOURNAL_HERO_SLIDES.map((s) => s.image), 5);
  assertValidCarousel('Calendar', CALENDAR_HERO_SLIDES.map((s) => s.image), 5);

  const validSlugs = new Set(JOURNAL_ARTICLES.map((a) => a.slug));
  for (const slide of JOURNAL_HERO_SLIDES) {
    assert.ok(validSlugs.has(slide.slug), `Journal hero slide slug "${slide.slug}" must match an article`);
  }
});

test('Hidden London hub and all 10 section carousels have >= 5 unique verified slides', () => {
  assertValidCarousel('HiddenLondonHub', HIDDEN_LONDON_HUB_SLIDES.map((s) => s.image), 5);

  for (const section of HIDDEN_LONDON_SECTIONS) {
    const extras = HIDDEN_LONDON_SECTION_EXTRA_SLIDES[section.id] || [];
    const slides = buildUniqueSlides(
      section.ideas.map((idea) => ({ id: idea.id, image: idea.image, title: idea.title })),
      extras,
      5
    );
    assertValidCarousel(`HiddenLondon(${section.id})`, slides.map((s) => s.image), 5);
  }
});
