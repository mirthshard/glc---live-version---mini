import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_MAP,
  TRANSLATIONS,
  isValidLanguageCode,
  translate,
  TranslationKey,
} from '../data/translations';

const ALL_20_CODES = [
  'en', 'ar', 'zh', 'fr', 'de', 'es', 'it', 'ja', 'ko', 'ru',
  'pt', 'hi', 'tr', 'nl', 'sv', 'no', 'el', 'he', 'ur', 'ms',
] as const;

const RTL_CODES = new Set(['ar', 'he', 'ur']);

test('supports all 20 global languages (top wealthy & England-visiting languages)', () => {
  const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
  assert.equal(codes.length, 20);
  for (const required of ALL_20_CODES) {
    assert.ok(codes.includes(required), `Missing language ${required}`);
  }
});

test('Arabic, Hebrew, and Urdu are configured as RTL while all other 17 languages are LTR', () => {
  for (const lang of SUPPORTED_LANGUAGES) {
    const expectedDir = RTL_CODES.has(lang.code) ? 'rtl' : 'ltr';
    assert.equal(lang.dir, expectedDir, `Expected ${lang.code} to be ${expectedDir}`);
    assert.equal(LANGUAGE_MAP[lang.code].dir, expectedDir);
  }
});

test('every language provides a non-empty translation for every key in English', () => {
  const keys = Object.keys(TRANSLATIONS.en) as TranslationKey[];
  assert.ok(keys.length >= 90, 'Expected comprehensive UI translation dictionary');

  for (const lang of SUPPORTED_LANGUAGES) {
    for (const key of keys) {
      const value = translate(lang.code, key);
      assert.ok(
        typeof value === 'string' && value.trim().length > 0,
        `Empty translation for ${lang.code}.${key}`
      );
    }
  }
});

test('isValidLanguageCode validates all 20 known codes and rejects unknown values', () => {
  for (const code of ALL_20_CODES) {
    assert.equal(isValidLanguageCode(code), true, `Expected ${code} to be valid`);
  }
  assert.equal(isValidLanguageCode('xx'), false);
  assert.equal(isValidLanguageCode(null), false);
  assert.equal(isValidLanguageCode(undefined), false);
});

test('Membership nav label is renamed cleanly to Join TGLC (distinct from Members)', () => {
  assert.equal(translate('en', 'nav.join'), 'Join TGLC');
  assert.equal(translate('en', 'nav.members'), 'Members');
  for (const code of ['en', 'fr', 'zh', 'ar', 'he', 'ur', 'ko', 'hi'] as const) {
    assert.notEqual(
      translate(code, 'nav.join'),
      translate(code, 'nav.members'),
      `Expected nav.join and nav.members to be distinct in ${code}`
    );
  }
});

test('Cultural & Islamic Hospitality keys exist in every language', () => {
  const culturalKeys: TranslationKey[] = [
    'nav.culturalTraditions',
    'cta.exploreTraditions',
    'jump.traditions',
    'home.traditions.kicker',
    'home.traditions.heading',
  ];
  for (const lang of SUPPORTED_LANGUAGES) {
    for (const key of culturalKeys) {
      assert.ok(translate(lang.code, key).trim().length > 0, `Missing ${lang.code}.${key}`);
    }
  }
});
