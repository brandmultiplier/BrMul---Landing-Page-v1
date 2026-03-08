import { unstable_noStore as noStore } from 'next/cache';
import type { SeoBotArticle } from '@/types/seobot';

interface SeoBotArticlesResponse {
  articles?: SeoBotArticle[];
  total?: number;
}

interface SeoBotShortTag {
  t: string;
  s?: string;
}

interface SeoBotShortCategory {
  t: string;
  s?: string;
}

interface SeoBotShortArticle {
  id: string;
  s: string;
  h: string;
  d: string;
  i: string;
  rt: number;
  cr: string;
  up: string;
  c?: SeoBotShortCategory;
  tg?: SeoBotShortTag[];
  t?: boolean;
  v?: boolean;
  n?: boolean;
}

const SEOBOT_CDN_BASE_URL = 'https://cdn.seobotai.com';
const SEOBOT_REQUEST_TIMEOUT_MS = 15000;

function getSeoBotApiKey(): string {
  const apiKey = process.env.SEOBOT_API_KEY;

  if (!apiKey) {
    throw new Error('SEOBOT_API_KEY is not set');
  }

  return apiKey;
}

function shouldLogSeobotDebug(): boolean {
  return process.env.BLOG_SYNC_DEBUG === 'true';
}

function logSeobotDebug(message: string, payload?: Record<string, unknown>): void {
  if (!shouldLogSeobotDebug()) return;

  if (payload) {
    console.log(`[seobot] ${message}`, payload);
    return;
  }

  console.log(`[seobot] ${message}`);
}

function normalizeSlug(value: string): string {
  return decodeURIComponent(value || '').trim().toLowerCase();
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function mapShortToArticle(short: SeoBotShortArticle): SeoBotArticle {
  return {
    id: short.id,
    slug: short.s,
    headline: short.h,
    metaDescription: short.d,
    metaKeywords: '',
    tags: (short.tg ?? []).map((item) => ({
      id: `${short.id}-${item.s ?? toSlug(item.t)}`,
      title: item.t,
      slug: item.s ?? toSlug(item.t),
    })),
    category: short.c
      ? {
          id: `${short.id}-${short.c.s ?? toSlug(short.c.t)}`,
          title: short.c.t,
          slug: short.c.s ?? toSlug(short.c.t),
        }
      : ({ id: '', title: '', slug: '' } as SeoBotArticle['category']),
    readingTime: short.rt,
    html: '',
    markdown: '',
    outline: '',
    deleted: false,
    published: true,
    publishedAt: short.cr,
    createdAt: short.cr,
    updatedAt: short.up,
    relatedPosts: [],
    image: short.i,
    isTool: short.t,
    isVideo: short.v,
    isNews: short.n,
  };
}

async function fetchSeobotJson<T>(path: string): Promise<T> {
  const url = `${SEOBOT_CDN_BASE_URL}${path}${path.includes('?') ? '&' : '?'}v=${Date.now()}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SEOBOT_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      next: { revalidate: 0 },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`SEObot request failed (${response.status}) for ${path}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchSeobotIndex(apiKey: string): Promise<SeoBotArticle[]> {
  const shortIndex = await fetchSeobotJson<SeoBotShortArticle[]>(`/${apiKey}/system/base.json`);

  const mapped = (shortIndex ?? [])
    .map(mapShortToArticle)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  logSeobotDebug('Fetched SEObot index', { total: mapped.length });
  return mapped;
}

export async function getSeobotArticles(page = 0, limit = 100): Promise<SeoBotArticle[]> {
  noStore();

  try {
    const apiKey = getSeoBotApiKey();
    const allArticles = await fetchSeobotIndex(apiKey);

    const start = Math.max(0, page) * Math.max(1, limit);
    const end = start + Math.max(1, limit);
    const paginated = allArticles.slice(start, end);

    logSeobotDebug('Returning paginated SEObot articles', {
      page,
      limit,
      returned: paginated.length,
      total: allArticles.length,
    });

    return paginated;
  } catch (error) {
    logSeobotDebug('Error fetching SEObot articles', {
      error: error instanceof Error ? error.message : String(error),
    });
    return [];
  }
}

export async function getSeobotArticle(slug: string): Promise<SeoBotArticle | null> {
  noStore();

  try {
    const apiKey = getSeoBotApiKey();
    const normalizedSlug = normalizeSlug(slug);
    const allArticles = await fetchSeobotIndex(apiKey);
    const shortMatch = allArticles.find((item) => normalizeSlug(item.slug) === normalizedSlug);

    if (!shortMatch) {
      logSeobotDebug('SEObot slug not found in index', { slug });
      return null;
    }

    try {
      const detailed = await fetchSeobotJson<SeoBotArticle>(`/${apiKey}/blog/${shortMatch.id}.json`);

      logSeobotDebug('Fetched SEObot article detail', {
        slug: shortMatch.slug,
        id: shortMatch.id,
        updatedAt: detailed.updatedAt,
      });

      return detailed ?? null;
    } catch (detailError) {
      logSeobotDebug('SEObot detail JSON unavailable, using index fallback', {
        slug: shortMatch.slug,
        id: shortMatch.id,
        error: detailError instanceof Error ? detailError.message : String(detailError),
      });

      const fallbackHtml = shortMatch.metaDescription
        ? `<p>${escapeHtml(shortMatch.metaDescription)}</p>`
        : '<p>Content coming soon.</p>';

      return {
        ...shortMatch,
        html: fallbackHtml,
        markdown: shortMatch.metaDescription || '',
        outline: shortMatch.metaDescription || '',
      };
    }
  } catch (error) {
    logSeobotDebug('Error fetching SEObot article detail', {
      slug,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}
