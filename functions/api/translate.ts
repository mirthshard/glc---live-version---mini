/**
 * Cloudflare Pages Function: POST /api/translate
 * Translates batches of UI/content strings on the edge for any visitor selecting
 * one of the 20 supported languages, with edge caching and strict input bounds.
 */

const ALLOWED_TARGETS = new Set([
  'ar', 'zh', 'fr', 'de', 'es', 'it', 'ja', 'ko', 'ru', 'pt',
  'hi', 'tr', 'nl', 'sv', 'no', 'el', 'he', 'ur', 'ms',
]);

const TARGET_MAP: Record<string, string> = {
  zh: 'zh-CN',
  he: 'iw',
};

interface TranslateBody {
  target?: string;
  texts?: unknown;
}

export const onRequestPost = async (context: { request: Request }): Promise<Response> => {
  try {
    const body = (await context.request.json()) as TranslateBody;
    const rawTarget = typeof body.target === 'string' ? body.target.trim().toLowerCase() : '';
    if (!ALLOWED_TARGETS.has(rawTarget)) {
      return new Response(JSON.stringify({ error: 'Unsupported target language' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!Array.isArray(body.texts) || body.texts.length === 0) {
      return new Response(JSON.stringify({ translations: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const texts = body.texts
      .slice(0, 50)
      .map((item) => (typeof item === 'string' ? item.slice(0, 1200) : ''));

    const tl = TARGET_MAP[rawTarget] || rawTarget;
    const DELIM = '\n<<<TGLC_SEP>>>\n';
    const joined = texts.join(DELIM);

    const url =
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(joined)}`;

    const upstream = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!upstream.ok) {
      return new Response(JSON.stringify({ translations: texts }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = (await upstream.json()) as unknown[];
    const segments = Array.isArray(data?.[0]) ? (data[0] as unknown[]) : [];
    const combined = segments
      .map((seg) => (Array.isArray(seg) && typeof seg[0] === 'string' ? seg[0] : ''))
      .join('');

    const split = combined.split(/\s*<<<\s*TGLC_SEP\s*>>>\s*/i);
    const translations =
      split.length === texts.length ? split.map((s, i) => s.trim() || texts[i]) : texts;

    return new Response(JSON.stringify({ translations }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Translation unavailable' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
