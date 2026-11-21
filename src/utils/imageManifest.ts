import { ImageManifest } from './smartImage';

let cachedManifest: ImageManifest | undefined;

try {
  const modules = import.meta.glob<ImageManifest>('../data/imageManifest.json', {
    eager: true,
    import: 'default',
  });
  cachedManifest = Object.values(modules)[0];
} catch {
  cachedManifest = undefined;
}

export function getImageManifest(): ImageManifest | undefined {
  return cachedManifest;
}
