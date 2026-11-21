import React from 'react';
import { resolveSmartImage } from '../../utils/smartImage';
import { getImageManifest } from '../../utils/imageManifest';
import { LazyImageWrapper } from './LazyImageWrapper';

const IMAGE_MANIFEST = getImageManifest();

export interface SmartImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'sizes' | 'loading' | 'decoding'> {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  maxWidth?: number;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  sizes = '100vw',
  priority = false,
  maxWidth,
  rootMargin,
  threshold,
  className = '',
  width: explicitWidth,
  height: explicitHeight,
  ...rest
}) => {
  const resolved = resolveSmartImage(src, IMAGE_MANIFEST, maxWidth);

  return (
    <LazyImageWrapper
      src={resolved.src}
      fallbackSrc={src}
      srcSet={resolved.srcSet}
      sizes={sizes}
      width={explicitWidth ?? resolved.width}
      height={explicitHeight ?? resolved.height}
      placeholderColor={resolved.backgroundColor}
      alt={alt}
      priority={priority}
      rootMargin={rootMargin}
      threshold={threshold}
      className={className}
      {...rest}
    />
  );
};
