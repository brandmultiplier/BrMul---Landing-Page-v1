import blogPostsData from '@/data/blog-posts.json';
import { getSeobotArticle, getSeobotArticles } from '@/lib/seobot';
import { getNotionPosts, getNotionPostBySlug } from '@/lib/notion';
import type { SeoBotArticle } from '@/types/seobot';
import type { NotionBlogPost } from '@/types/notion';

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

export type BlogSource = 'static' | 'seobot' | 'notion';

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

function normalizeNotionPost(post: NotionBlogPost): UnifiedBlogPost {
  return {
    name: post.title,
    slug: post.slug,
    collectionId: '',
    localeId: '',
    itemId: post.id,
    createdOn: post.publishedAt || '',
    updatedOn: post.publishedAt || '',
    publishedOn: post.publishedAt || '',
    postBody: post.content,
    postSummary: post.summary || post.seoDescription || '',
    mainImage: post.coverImage || '',
    thumbnailImage: post.coverImage || '',
    featured: false,
    color: '',
    author: '',
    source: 'notion',
    tags: post.tags,
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
  
  const [seobotArticles, notionPosts] = await Promise.all([
    getSeobotArticles(0, 100),
    getNotionPosts(),
  ]);

  const publishedSeoBotPosts = seobotArticles
    .filter((article) => (article.published ?? true) && !(article.deleted ?? false))
    .map(normalizeSeobotPost);

  const normalizedNotionPosts = notionPosts.map(normalizeNotionPost);

  const mergedBySlug = new Map<string, UnifiedBlogPost>();

  // Priority: Notion > SEObot > Static
  // Add static posts first (lowest priority)
  for (const post of staticPosts) {
    mergedBySlug.set(post.slug, post);
  }

  // SEObot posts override static posts
  for (const post of publishedSeoBotPosts) {
    mergedBySlug.set(post.slug, post);
  }

  // Notion posts have highest priority
  for (const post of normalizedNotionPosts) {
    mergedBySlug.set(post.slug, post);
  }

  return Array.from(mergedBySlug.values()).sort(sortByPublishedDateDesc);
}

export async function getPostBySlugUnified(slug: string): Promise<UnifiedBlogPost | undefined> {
  // Priority: Notion > SEObot > Static
  
  // Check Notion first (highest priority)
  const notionPost = await getNotionPostBySlug(slug);
  if (notionPost) {
    return normalizeNotionPost(notionPost);
  }

  // Then check SEObot
  const seobotArticle = await getSeobotArticle(slug);
  if (seobotArticle && (seobotArticle.published ?? true) && !(seobotArticle.deleted ?? false)) {
    return normalizeSeobotPost(seobotArticle);
  }

  // Finally check static posts
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

