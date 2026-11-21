export type SocialChannelId = 'linkedin' | 'instagram' | 'telegram';

export interface SocialChannel {
  id: SocialChannelId;
  name: string;
  subtitle: string;
  ariaLabel: string;
  /**
   * Placeholder URL pointing to this site until official channel URLs are finalised.
   * Replace with the final https:// URL when ready; external links automatically open safely in a new tab.
   */
  href: string;
  membersOnly?: boolean;
}

/**
 * Centralised social and private member channel links for the Footer.
 * Currently pointed to this site ('/') while official profiles and the private Telegram channel are being finalised.
 */
export const TGLC_SOCIAL_CHANNELS: readonly SocialChannel[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    subtitle: 'The Global Luxury Consortium',
    ariaLabel: 'LinkedIn — The Global Luxury Consortium',
    href: '/',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    subtitle: '@thegloballuxuryconsortium',
    ariaLabel: 'Instagram — @thegloballuxuryconsortium',
    href: '/',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    subtitle: 'Private Members Channel',
    ariaLabel: 'Private Telegram Channel for Members',
    href: '/',
    membersOnly: true,
  },
] as const;

/**
 * Determines whether a configured channel URL points to an external origin.
 */
export function isExternalSocialUrl(href: string): boolean {
  return /^https?:\/\//i.test(href.trim());
}

/**
 * Computes safe anchor attributes so internal placeholder URLs navigate in-site
 * while final external social URLs open cleanly with `noopener noreferrer`.
 */
export function getSocialLinkProps(channel: SocialChannel): {
  href: string;
  target?: '_blank';
  rel?: string;
} {
  const trimmed = channel.href.trim() || '/';
  if (isExternalSocialUrl(trimmed)) {
    return {
      href: trimmed,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }
  return {
    href: trimmed,
  };
}
