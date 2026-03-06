import blogPostsData from '@/data/blog-posts.json';
import { getSeobotArticle, getSeobotArticles } from '@/lib/seobot';
import type { SeoBotArticle } from '@/types/seobot';

export interface BlogPost {
  name: string;
  slug: string;
  collectionId: string;
  localeId: string;
  itemId: string;
  createdOn: string;
  updatedOn: string;
  publishedOn: string;
  postBody: string;
  postSummary: string;
  mainImage: string;
  thumbnailImage: string;
  featured: boolean;
  color: string;
  author: string;
}

const posts: BlogPost[] = blogPostsData as BlogPost[];

export type BlogSource = 'static' | 'seobot';

export interface UnifiedBlogPost extends BlogPost {
  source: BlogSource;
  readingTime?: number;
  tags?: string[];
  category?: string;
}

function normalizeStaticPost(post: BlogPost): UnifiedBlogPost {
  return {
    ...post,
    source: 'static',
  };
}

function normalizeSeobotPost(article: SeoBotArticle): UnifiedBlogPost {
  const publishedAt = article.publishedAt || article.updatedAt || article.createdAt;

  return {
    name: article.headline,
    slug: article.slug,
    collectionId: '',
    localeId: '',
    itemId: article.id,
    createdOn: article.createdAt,
    updatedOn: article.updatedAt,
    publishedOn: publishedAt,
    postBody: article.html,
    postSummary: article.metaDescription || '',
    mainImage: article.image || '',
    thumbnailImage: article.image || '',
    featured: false,
    color: '',
    author: '',
    source: 'seobot',
    readingTime: article.readingTime,
    tags: article.tags?.map((tag) => tag.title) ?? [],
    category: article.category?.title,
  };
}

function sortByPublishedDateDesc(a: UnifiedBlogPost, b: UnifiedBlogPost): number {
  const aTime = new Date(a.publishedOn).getTime();
  const bTime = new Date(b.publishedOn).getTime();

  if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
    return bTime - aTime;
  }
  if (!Number.isNaN(aTime)) return -1;
  if (!Number.isNaN(bTime)) return 1;
  return 0;
}

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export async function getAllPostsUnified(): Promise<UnifiedBlogPost[]> {
  const staticPosts = posts.map(normalizeStaticPost);
  const seobotArticles = await getSeobotArticles(0, 100);

  const publishedSeoBotPosts = seobotArticles
    .filter((article) => article.published && !article.deleted)
    .map(normalizeSeobotPost);

  const mergedBySlug = new Map<string, UnifiedBlogPost>();

  for (const post of publishedSeoBotPosts) {
    mergedBySlug.set(post.slug, post);
  }

  for (const post of staticPosts) {
    if (!mergedBySlug.has(post.slug)) {
      mergedBySlug.set(post.slug, post);
    }
  }

  return Array.from(mergedBySlug.values()).sort(sortByPublishedDateDesc);
}

export async function getPostBySlugUnified(slug: string): Promise<UnifiedBlogPost | undefined> {
  const seobotArticle = await getSeobotArticle(slug);

  if (seobotArticle && seobotArticle.published && !seobotArticle.deleted) {
    return normalizeSeobotPost(seobotArticle);
  }

  const staticPost = getPostBySlug(slug);
  if (staticPost) {
    return normalizeStaticPost(staticPost);
  }

  return undefined;
}

export function getFeaturedPosts(): BlogPost[] {
  return posts.filter((post) => post.featured);
}

export function getLatestPosts(count: number = 10): BlogPost[] {
  return posts.slice(0, count);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

export function getAuthorDisplayName(author: string): string {
  const authorMap: Record<string, string> = {
    'team-crc': 'BrandMultiplier Team',
    'chris-rubin': 'Chris Rubin',
  };
  
  return authorMap[author] || author || 'BrandMultiplier Team';
}
