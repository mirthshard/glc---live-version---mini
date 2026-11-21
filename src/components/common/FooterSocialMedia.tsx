import React from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import {
  TGLC_SOCIAL_CHANNELS,
  SocialChannel,
  SocialChannelId,
  getSocialLinkProps,
  isExternalSocialUrl,
} from '../../data/socialChannels';
import { useNavigation } from '../../context/NavigationContext';

const SocialIcon: React.FC<{ id: SocialChannelId; className?: string }> = ({
  id,
  className = 'w-4 h-4',
}) => {
  switch (id) {
    case 'linkedin':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case 'telegram':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
        >
          <path d="M21.2 4.4 2.8 11.5c-.8.3-.8 1.4.1 1.7l4.6 1.5 1.8 5.4c.2.7 1.1.9 1.6.4l2.7-2.6 4.7 3.4c.7.5 1.7.1 1.9-.7l2.9-14.6c.2-.9-.7-1.7-1.9-1.6Z" />
          <path d="M7.5 14.7 18.2 7.8" />
        </svg>
      );
  }
};

export interface FooterSocialMediaProps {
  channels?: readonly SocialChannel[];
}

export const FooterSocialMedia: React.FC<FooterSocialMediaProps> = ({
  channels = TGLC_SOCIAL_CHANNELS,
}) => {
  const { navigateTo } = useNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, channel: SocialChannel) => {
    if (isExternalSocialUrl(channel.href)) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigateTo('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      aria-label="Social media and private member channels"
      className="py-5 border-b border-[#1D1F28] flex flex-col xl:flex-row xl:items-center justify-between gap-5 xl:gap-8"
    >
      <div className="space-y-1 xl:max-w-[270px] shrink-0">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#CFA85E] block">
          Private Channels &amp; Dispatches
        </span>
        <p className="text-xs text-[#9C968A] font-light leading-relaxed">
          Official channels and our private dispatch for Consortium members.
        </p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
        {channels.map((channel) => {
          const linkProps = getSocialLinkProps(channel);
          return (
            <li key={channel.id} className="min-w-0">
              <a
                {...linkProps}
                onClick={(e) => handleClick(e, channel)}
                aria-label={channel.ariaLabel}
                className="group w-full min-h-[48px] px-3.5 py-2.5 bg-[#0C0E14] hover:bg-[#131621] border border-[#242734] hover:border-[#CFA85E]/80 transition-all duration-200 flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CFA85E]"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 border border-[#8B672B]/55 group-hover:border-[#E2BA6B] bg-[#08090D] flex items-center justify-center text-[#CFA85E] group-hover:text-[#F2D8A0] transition-colors shrink-0">
                    <SocialIcon id={channel.id} className="w-4 h-4" />
                  </span>
                  <span className="flex flex-col text-left leading-tight min-w-0">
                    <span className="text-xs font-medium text-[#F2D8A0] group-hover:text-[#FFE7B3] transition-colors inline-flex items-center gap-1.5">
                      <span>{channel.name}</span>
                      {channel.membersOnly && (
                        <Lock className="w-3 h-3 text-[#CFA85E] shrink-0" aria-hidden="true" />
                      )}
                    </span>
                    <span
                      data-no-translate={channel.id === 'instagram' || channel.id === 'linkedin' ? 'true' : undefined}
                      className="text-[11px] text-[#8F98AA] group-hover:text-[#D4D8E2] transition-colors truncate"
                    >
                      {channel.subtitle}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 text-[#8B672B] group-hover:text-[#E2BA6B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                  aria-hidden="true"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
