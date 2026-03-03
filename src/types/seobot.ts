export interface SeoBotTag {
  id: string;
  title: string;
  slug: string;
}

export interface SeoBotCategory {
  id: string;
  title: string;
  slug: string;
}

export interface SeoBotRelatedPost {
  id: string;
  headline: string;
  slug: string;
}

export interface SeoBotArticle {
  id: string;
  slug: string;
  headline: string;
  metaDescription: string;
  metaKeywords: string;
  tags: SeoBotTag[];
  category: SeoBotCategory;
  readingTime: number;
  html: string;
  markdown: string;
  outline: string;
  deleted: boolean;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  relatedPosts: SeoBotRelatedPost[];
  image: string;
  isTool?: boolean;
  isVideo?: boolean;
  isNews?: boolean;
}
