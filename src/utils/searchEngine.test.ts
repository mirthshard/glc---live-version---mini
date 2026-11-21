import test from 'node:test';
import assert from 'node:assert/strict';
import { searchTGLC, getCuratedEditorialSuggestions } from './searchEngine';

test('searchTGLC returns curated results on empty query', () => {
  const suggestions = searchTGLC('');
  assert.ok(suggestions.length > 0, 'Should return curated suggestions for empty query');
  assert.ok(suggestions.some(s => s.category === 'services'), 'Curated list should contain services');
  assert.ok(suggestions.some(s => s.category === 'journal'), 'Curated list should contain journal entries');
});

test('searchTGLC finds services by query', () => {
  const aviationResults = searchTGLC('aviation');
  assert.ok(aviationResults.length > 0, 'Expected results for aviation');
  assert.ok(aviationResults.some(r => r.title.toLowerCase().includes('aviation')), 'Expected title with aviation');
  
  const diningResults = searchTGLC('mayfair dining');
  assert.ok(diningResults.length > 0, 'Expected results for dining query');
  assert.ok(diningResults.some(r => r.category === 'services' || r.category === 'journal'), 'Expected dining in services or journal');
});

test('searchTGLC finds journal articles by topic or title', () => {
  const horologyResults = searchTGLC('horologie');
  const watchResults = searchTGLC('watch');
  assert.ok(watchResults.length > 0, 'Expected watch results');
  assert.ok(watchResults.some(r => r.title.includes('Horlogerie') || r.title.includes('Watches')), 'Expected horology article or service');
});

test('searchTGLC finds calendar events', () => {
  const ascotResults = searchTGLC('Ascot');
  assert.ok(ascotResults.length > 0, 'Expected results for Ascot');
  assert.ok(ascotResults.some(r => r.category === 'calendar'), 'Should identify Ascot as a calendar event');

  const friezeResults = searchTGLC('Frieze');
  assert.ok(friezeResults.length > 0, 'Expected results for Frieze');
  assert.ok(friezeResults.some(r => r.category === 'calendar'), 'Should identify Frieze as a calendar event');
});

test('searchTGLC respects category filtering', () => {
  const allServices = searchTGLC('London', 'services');
  for (const item of allServices) {
    assert.equal(item.category, 'services', 'All results must match services category filter');
  }

  const allCalendar = searchTGLC('London', 'calendar');
  for (const item of allCalendar) {
    assert.equal(item.category, 'calendar', 'All results must match calendar category filter');
  }

  const allJournal = searchTGLC('London', 'journal');
  for (const item of allJournal) {
    assert.equal(item.category, 'journal', 'All results must match journal category filter');
  }
});

test('searchTGLC returns proper routing metadata for navigation', () => {
  const results = searchTGLC('private aviation');
  assert.ok(results.length > 0);
  const first = results[0];
  assert.ok(first.targetRoute, 'Must have targetRoute');
  assert.ok(first.meta, 'Must have unboxed meta text');
  assert.ok(first.snippet, 'Must have descriptive snippet');
});

test('searchTGLC does not return removed Member Portal or Sub-Rosa results', () => {
  const portalResults = searchTGLC('portal');
  assert.equal(
    portalResults.some(r => r.targetRoute === 'member-portal' || r.id === 'consortium-portal'),
    false,
    'Search must not return removed member portal entries'
  );

  const rosaResults = searchTGLC('rosa');
  assert.equal(rosaResults.length, 0, 'Search must not return removed Sub-Rosa copy');

  const subRosaResults = searchTGLC('sub-rosa');
  assert.equal(
    subRosaResults.some(r => r.id === 'consortium-sub-rosa' || r.title.toLowerCase().includes('sub-rosa')),
    false,
    'Search must not return removed Sub-Rosa entry'
  );

  const northoltResults = searchTGLC('Northolt');
  assert.equal(northoltResults.length, 0, 'Search must not return removed RAF Northolt copy');
});

test('searchTGLC indexes Hidden London and Signature Experiences', () => {
  const hiddenResults = searchTGLC('Hidden London');
  assert.ok(hiddenResults.length > 0, 'Expected results for Hidden London');
  assert.ok(hiddenResults.some(r => r.targetRoute === 'hidden-london'), 'Expected Hidden London hub route');

  const expResults = searchTGLC('Signature Experiences');
  assert.ok(expResults.length > 0, 'Expected results for Signature Experiences');
  assert.ok(expResults.some(r => r.targetRoute === 'case-studies'), 'Expected Signature Experiences route');
});
