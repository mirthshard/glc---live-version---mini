import fs from 'node:fs';
import path from 'node:path';
import { TARGET_LANGS, EXACT_TABLE, PHRASES_TABLE } from './i18n-exact.mjs';
import { WORDS_TABLE } from './i18n-words.mjs';
import { EXTRA_WORDS_TABLE } from './i18n-words-extra.mjs';

const OUT_DIR = path.resolve(process.cwd(), 'public', 'i18n');
fs.mkdirSync(OUT_DIR, { recursive: true });

function assertRows(name, rows) {
  const expectedLen = TARGET_LANGS.length + 1;
  rows.forEach((row, idx) => {
    if (!Array.isArray(row) || row.length !== expectedLen) {
      throw new Error(
        `[build-i18n-packs] ${name}[${idx}] ("${row?.[0]}") has length ${row?.length}, expected ${expectedLen}`
      );
    }
  });
}

assertRows('EXACT_TABLE', EXACT_TABLE);
assertRows('PHRASES_TABLE', PHRASES_TABLE);
assertRows('WORDS_TABLE', WORDS_TABLE);
assertRows('EXTRA_WORDS_TABLE', EXTRA_WORDS_TABLE);

const ALL_WORDS = [...WORDS_TABLE, ...EXTRA_WORDS_TABLE];

for (let i = 0; i < TARGET_LANGS.length; i++) {
  const lang = TARGET_LANGS[i];
  const exact = {};
  const phrases = {};
  const words = {};

  for (const row of EXACT_TABLE) {
    const src = row[0];
    const target = row[i + 1];
    if (src && target) exact[src] = target;
  }

  for (const row of PHRASES_TABLE) {
    const src = row[0];
    const target = row[i + 1];
    if (src && target) phrases[src] = target;
  }

  for (const row of ALL_WORDS) {
    const src = row[0].toLowerCase();
    const target = row[i + 1];
    if (src && typeof target === 'string') {
      words[src] = target;
    }
  }

  const pack = { lang, exact, phrases, words };
  const filePath = path.join(OUT_DIR, `${lang}.json`);
  fs.writeFileSync(filePath, JSON.stringify(pack), 'utf8');
}

console.log(
  `[build-i18n-packs] Generated ${TARGET_LANGS.length} language packs in public/i18n/ ` +
    `(${EXACT_TABLE.length} exact, ${PHRASES_TABLE.length} phrases, ${ALL_WORDS.length} words each).`
);
