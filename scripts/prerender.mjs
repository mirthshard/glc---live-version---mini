import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const template = await fs.readFile('dist/index.html', 'utf8');
const entryUrl = pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href;
const { render, getAllRoutes, getHeadTags, renderSitemapXml } = await import(entryUrl);

const routes = getAllRoutes();

for (const url of routes) {
  try {
    const app = await render(url);
    const headTags = getHeadTags(url);
    const html = template
      .replace('<!--app-head-->', () => headTags)
      .replace('<div id="root"></div>', () => `<div id="root">${app}</div>`);

    const out =
      url === '/'
        ? 'dist/index.html'
        : url === '/404'
          ? 'dist/404.html'
          : path.join('dist', url, 'index.html');

    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(out, html);
  } catch (err) {
    console.error(`Prerender failed for route ${url}:`, err);
    process.exit(1);
  }
}

await fs.writeFile('dist/sitemap.xml', renderSitemapXml());

// Prune original photos in dist/ that have optimised WebP variants
try {
  const manifest = JSON.parse(await fs.readFile('src/data/imageManifest.json', 'utf8'));
  for (const key of Object.keys(manifest)) {
    const rel = key.replace(/^\/+/, '');
    await fs.rm(path.join('dist', rel), { force: true });
  }
} catch {}

await fs.rm('dist-ssr', { recursive: true, force: true });
console.log('Prerendered', routes.length, 'routes');
