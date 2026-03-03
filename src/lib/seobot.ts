import { BlogClient } from 'seobot';
import type { SeoBotArticle } from '@/types/seobot';

interface SeoBotArticlesResponse {
  articles?: SeoBotArticle[];
  total?: number;
}

function getSeoBotClient() {
  const apiKey = process.env.SEOBOT_API_KEY;

  if (!apiKey) {
    throw new Error('SEOBOT_API_KEY is not set');
  }

  return new BlogClient(apiKey);
}

export async function getSeobotArticles(page = 0, limit = 100): Promise<SeoBotArticle[]> {
  try {
    const client = getSeoBotClient();
    const response = (await client.getArticles(page, limit)) as SeoBotArticlesResponse;
    return response.articles ?? [];
  } catch {
    return [];
  }
}

export async function getSeobotArticle(slug: string): Promise<SeoBotArticle | null> {
  try {
    const client = getSeoBotClient();
    const article = (await client.getArticle(slug)) as SeoBotArticle;
    return article ?? null;
  } catch {
    return null;
  }
}
