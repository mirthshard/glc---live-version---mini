import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  shouldSkipTranslation,
  normalizeLookupKey,
  compileLanguagePack,
  translateStringWithPack,
  LanguagePack,
} from './pageTranslator';
import { SUPPORTED_LANGUAGES } from '../data/translations';
import { pathFor, parsePath } from '../routing/routes';
import { getPageMeta } from '../seo/meta';
import { searchTGLC } from './searchEngine';

const I18N_DIR = path.resolve(process.cwd(), 'public', 'i18n');

test('shouldSkipTranslation preserves emails, phones, postcodes, brand acronyms, and counters', () => {
  assert.equal(shouldSkipTranslation('enquiries@thegloballuxuryconsortium.co.uk'), true);
  assert.equal(shouldSkipTranslation('020 3951 6369'), true);
  assert.equal(shouldSkipTranslation('W1S 4JL'), true);
  assert.equal(shouldSkipTranslation('TGLC'), true);
  assert.equal(shouldSkipTranslation('01 / 07'), true);
  assert.equal(shouldSkipTranslation('IV.'), true);
  assert.equal(shouldSkipTranslation('⌘K'), true);
  assert.equal(shouldSkipTranslation('@thegloballuxuryconsortium'), true);

  assert.equal(shouldSkipTranslation('Private dining rooms across London.'), false);
  assert.equal(shouldSkipTranslation('Certified Halal Fine Dining & Private Chefs'), false);
});

test('normalizeLookupKey unifies curly quotes, dashes, and whitespace', () => {
  assert.equal(
    normalizeLookupKey('  Opening doors that don’t  usually exist — Mayfair  '),
    "Opening doors that don't usually exist — Mayfair"
  );
});

test('all 19 non-English static language packs exist in public/i18n/ and translate exact + fallback strings', () => {
  const nonEnglish = SUPPORTED_LANGUAGES.filter((l) => l.code !== 'en');
  assert.equal(nonEnglish.length, 19);

  for (const lang of nonEnglish) {
    const filePath = path.join(I18N_DIR, `${lang.code}.json`);
    assert.ok(fs.existsSync(filePath), `Missing language pack ${filePath}`);
    const pack = JSON.parse(fs.readFileSync(filePath, 'utf8')) as LanguagePack;
    assert.equal(pack.lang, lang.code);
    assert.ok(Object.keys(pack.exact).length >= 30, `Too few exact entries in ${lang.code}`);
    assert.ok(Object.keys(pack.phrases).length >= 40, `Too few phrase entries in ${lang.code}`);
    assert.ok(Object.keys(pack.words).length >= 300, `Too few word entries in ${lang.code}`);

    const compiled = compileLanguagePack(pack);

    // Exact match test
    const exactRes = translateStringWithPack('All venues and introductions are subject to availability.', compiled);
    assert.equal(exactRes.isExact, true, `Expected exact hit for ${lang.code}`);
    assert.notEqual(exactRes.text, 'All venues and introductions are subject to availability.');

    // Preserves leading and trailing whitespace
    const wsRes = translateStringWithPack('  Direct Mayfair Desk  ', compiled);
    assert.ok(wsRes.text.startsWith('  ') && wsRes.text.endsWith('  '), `Whitespace lost for ${lang.code}`);

    // Fallback phrase + lexicon test on unmapped sentence
    const fallbackRes = translateStringWithPack(
      'Private dining room and certified halal family hospitality in central London on request.',
      compiled
    );
    assert.notEqual(
      fallbackRes.text,
      'Private dining room and certified halal family hospitality in central London on request.',
      `Expected translated output for ${lang.code}`
    );
  }
});

test('cultural-traditions route resolves cleanly in router, SEO metadata, and site search', () => {
  const url = pathFor('cultural-traditions');
  assert.equal(url, '/cultural-traditions/');

  const parsed = parsePath('/cultural-traditions/');
  assert.equal(parsed.page, 'cultural-traditions');

  const meta = getPageMeta({ page: 'cultural-traditions' });
  assert.ok(meta.title.length <= 60, `Title too long: ${meta.title.length}`);
  assert.ok(
    meta.description.length >= 135 && meta.description.length <= 160,
    `Description length out of bounds: ${meta.description.length}`
  );
  assert.ok(meta.image?.includes('cultural_iftar_mayfair_salon'));

  const halalHits = searchTGLC('halal');
  assert.ok(
    halalHits.some((r) => r.targetRoute === 'cultural-traditions'),
    'Expected site search for "halal" to return Cultural & Islamic Hospitality page'
  );

  const ramadanHits = searchTGLC('Ramadan');
  assert.ok(
    ramadanHits.some((r) => r.targetRoute === 'cultural-traditions'),
    'Expected site search for "Ramadan" to return Cultural & Islamic Hospitality page'
  );
});
