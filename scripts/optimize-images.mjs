import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, 'public', 'assets', 'aistudio');
const OUT_DIR = path.join(ROOT, 'public', 'img');
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'imageManifest.json');
const OG_SOURCE_FILE = 'rolls-cullian-featured_a41abfa9.webp';
const OG_OUT_PATH = path.join(OUT_DIR, 'og-default.jpg');

const TARGET_WIDTHS = [320, 480, 960, 1440];
const ALLOWED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function toSlug(filename) {
  const stem = path.parse(filename).name;
  return stem
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });

  const entries = (await fs.readdir(SOURCE_DIR))
    .filter((name) => ALLOWED_EXTS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const manifest = {};
  let generatedCount = 0;
  let skippedCount = 0;

  for (const filename of entries) {
    const absPath = path.join(SOURCE_DIR, filename);
    const bytes = await fs.readFile(absPath);
    const hash = crypto.createHash('sha1').update(bytes).digest('hex').slice(0, 8);
    const slug = toSlug(filename);

    const rotated = sharp(bytes).rotate();
    const meta = await rotated.metadata();

    // Respect EXIF orientation 5..8 where width and height swap after .rotate()
    const isSwapped = meta.orientation && meta.orientation >= 5 && meta.orientation <= 8;
    const width = isSwapped ? meta.height : meta.width;
    const height = isSwapped ? meta.width : meta.height;

    if (!width || !height) {
      continue;
    }

    const stats = await sharp(bytes).stats();
    const { r, g, b } = stats.dominant;
    const color = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;

    const widths = Array.from(
      new Set(TARGET_WIDTHS.map((w) => Math.min(w, width)))
    ).sort((a, b) => a - b);

    const variants = [];

    for (const w of widths) {
      const outName = `${slug}-${hash}-${w}.webp`;
      const outPath = path.join(OUT_DIR, outName);
      const url = `/img/${outName}`;

      if (await fileExists(outPath)) {
        skippedCount += 1;
      } else {
        await sharp(bytes)
          .rotate()
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: w <= 480 ? 78 : 76, smartSubsample: true, effort: 5 })
          .toFile(outPath);
        generatedCount += 1;
      }

      variants.push({ url, w });
    }

    manifest[`/assets/aistudio/${filename}`] = {
      w: width,
      h: height,
      color,
      variants,
    };
  }

  // Generate default Open Graph image (1200x630 cover crop)
  const ogSourcePath = path.join(SOURCE_DIR, OG_SOURCE_FILE);
  if (await fileExists(ogSourcePath)) {
    if (!(await fileExists(OG_OUT_PATH))) {
      await sharp(ogSourcePath)
        .rotate()
        .resize(1200, 630, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: 80 })
        .toFile(OG_OUT_PATH);
      generatedCount += 1;
    } else {
      skippedCount += 1;
    }
  }

  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  console.log(
    `[optimize-images] Processed ${entries.length} images (${generatedCount} written, ${skippedCount} skipped). Manifest written to src/data/imageManifest.json.`
  );
}

run().catch((err) => {
  console.error('[optimize-images] Failed:', err);
  process.exit(1);
});
