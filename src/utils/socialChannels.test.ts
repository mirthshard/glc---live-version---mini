import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TGLC_SOCIAL_CHANNELS,
  getSocialLinkProps,
  isExternalSocialUrl,
} from '../data/socialChannels';

test('TGLC_SOCIAL_CHANNELS defines LinkedIn, Instagram, and Private Telegram channel', () => {
  assert.equal(TGLC_SOCIAL_CHANNELS.length, 3);
  assert.deepEqual(
    TGLC_SOCIAL_CHANNELS.map((c) => c.id),
    ['linkedin', 'instagram', 'telegram']
  );

  const telegram = TGLC_SOCIAL_CHANNELS.find((c) => c.id === 'telegram');
  assert.equal(telegram?.membersOnly, true);
  assert.ok(telegram?.subtitle.toLowerCase().includes('members'));
});

test('all placeholder social channel links currently point to this site (/)', () => {
  for (const channel of TGLC_SOCIAL_CHANNELS) {
    assert.equal(channel.href, '/', `${channel.id} should currently point to /`);
    assert.deepEqual(getSocialLinkProps(channel), { href: '/' });
  }
});

test('getSocialLinkProps automatically applies target="_blank" and rel for external https URLs', () => {
  assert.equal(isExternalSocialUrl('/'), false);
  assert.equal(isExternalSocialUrl('https://t.me/tglc_private'), true);

  assert.deepEqual(
    getSocialLinkProps({
      id: 'telegram',
      name: 'Telegram',
      subtitle: 'Private Members Channel',
      ariaLabel: 'Private Telegram Channel for Members',
      href: 'https://t.me/tglc_private',
      membersOnly: true,
    }),
    {
      href: 'https://t.me/tglc_private',
      target: '_blank',
      rel: 'noopener noreferrer',
    }
  );
});
