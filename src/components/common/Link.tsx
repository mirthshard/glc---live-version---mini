import React from 'react';
import { PageRoute, RouteState } from '../../types';
import { pathFor } from '../../routing/routes';
import { useNavigation } from '../../context/NavigationContext';

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to?: string;
  page?: PageRoute;
  params?: Partial<Omit<RouteState, 'page'>>;
}

export const Link: React.FC<LinkProps> = ({
  to,
  page,
  params,
  onClick,
  target,
  children,
  ...rest
}) => {
  const { navigateTo, navigateToPath } = useNavigation();
  const href = to ?? (page ? pathFor(page, params) : '/');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);

    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      (target && target !== '_self')
    ) {
      return;
    }

    // Allow external URLs, mailto/tel links, and plain in-page hash anchors to work natively
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#')
    ) {
      return;
    }

    e.preventDefault();
    if (page) {
      navigateTo(page, params);
    } else {
      navigateToPath(href);
    }
  };

  return (
    <a href={href} target={target} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
