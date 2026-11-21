import { prerenderToNodeStream } from 'react-dom/static';
import App from './App';

export { getAllRoutes, getHeadTags, renderSitemapXml } from './seo/head';

export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(<App url={url} />, {
    progressiveChunkSize: Infinity,
  });
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}
