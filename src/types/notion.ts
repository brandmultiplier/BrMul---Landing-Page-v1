export interface NotionBlogPost {
  id: string;
  slug: string;
  title: string;
  status: string;
  publishedAt: string | null;
  summary: string;
  coverImage: string | null;
  tags: string[];
  seoDescription: string;
  content: string;
}

export interface NotionPageProperties {
  Title?: {
    title: Array<{ plain_text: string }>;
  };
  Slug?: {
    rich_text: Array<{ plain_text: string }>;
  };
  Status?: {
    select: { name: string } | null;
  };
  'Published At'?: {
    date: { start: string } | null;
  };
  Summary?: {
    rich_text: Array<{ plain_text: string }>;
  };
  'Cover Image'?: {
    url?: string;
    files?: Array<{
      type: 'file' | 'external';
      file?: { url: string };
      external?: { url: string };
    }>;
  };
  Tags?: {
    multi_select: Array<{ name: string }>;
  };
  'SEO Description'?: {
    rich_text: Array<{ plain_text: string }>;
  };
}
