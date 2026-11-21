export interface ImageVariant {
  url: string;
  w: number;
}

export interface ImageManifestEntry {
  w: number;
  h: number;
  color: string;
  variants: ImageVariant[];
}

export type ImageManifest = Record<string, ImageManifestEntry>;

export interface ResolvedImageProps {
  src: string;
  srcSet?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
}

export function isTransparentAsset(src: string): boolean {
  return /transparent/i.test(src);
}

export function resolveSmartImage(
  src: string,
  manifest: ImageManifest | null | undefined,
  maxWidth?: number
): ResolvedImageProps {
  const entry = manifest?.[src];
  if (!entry || !Array.isArray(entry.variants) || entry.variants.length === 0) {
    return { src };
  }

  const sorted = [...entry.variants].sort((a, b) => a.w - b.w);
  const filtered =
    typeof maxWidth === 'number'
      ? sorted.filter((v) => v.w <= maxWidth)
      : sorted;
  const usable = filtered.length > 0 ? filtered : [sorted[0]];
  const largest = usable[usable.length - 1];
  const srcSet = usable.map((v) => `${v.url} ${v.w}w`).join(', ');

  return {
    src: largest.url,
    srcSet,
    width: entry.w,
    height: entry.h,
    backgroundColor: isTransparentAsset(src) ? undefined : entry.color,
  };
}

export function resolveThumbnailUrl(
  src: string,
  manifest: ImageManifest | null | undefined,
  targetMaxWidth = 640
): string {
  return resolveSmartImage(src, manifest, targetMaxWidth).src;
}

