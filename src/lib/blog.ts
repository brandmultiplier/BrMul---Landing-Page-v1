import blogPostsData from '@/data/blog-posts.json';

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

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
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
