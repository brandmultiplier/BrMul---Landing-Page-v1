import { Client } from '@notionhq/client';
import type { NotionBlogPost, NotionPageProperties } from '@/types/notion';
import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

let notionClient: Client | null = null;

function getNotionClient(): Client {
  if (notionClient) return notionClient;
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) {
    throw new Error('NOTION_API_KEY is not set');
  }
  notionClient = new Client({ auth: apiKey });
  return notionClient;
}

function getDatabaseId(): string {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) {
    throw new Error('NOTION_DATABASE_ID is not set');
  }
  return databaseId;
}

function richTextToPlain(richText: Array<{ plain_text: string }> | undefined): string {
  if (!richText) return '';
  return richText.map((t) => t.plain_text).join('');
}

function richTextToHtml(richText: RichTextItemResponse[]): string {
  return richText
    .map((item) => {
      let text = item.plain_text;
      if (item.annotations.bold) text = '<strong>' + text + '</strong>';
      if (item.annotations.italic) text = '<em>' + text + '</em>';
      if (item.annotations.strikethrough) text = '<del>' + text + '</del>';
      if (item.annotations.underline) text = '<u>' + text + '</u>';
      if (item.annotations.code) text = '<code>' + text + '</code>';
      if (item.href) text = '<a href="' + item.href + '" target="_blank" rel="noopener">' + text + '</a>';
      return text;
    })
    .join('');
}

function isFullBlock(block: BlockObjectResponse | PartialBlockObjectResponse): block is BlockObjectResponse {
  return 'type' in block;
}

function blockToHtml(block: BlockObjectResponse): string {
  switch (block.type) {
    case 'paragraph':
      return '<p>' + richTextToHtml(block.paragraph.rich_text) + '</p>';
    case 'heading_1':
      return '<h1>' + richTextToHtml(block.heading_1.rich_text) + '</h1>';
    case 'heading_2':
      return '<h2>' + richTextToHtml(block.heading_2.rich_text) + '</h2>';
    case 'heading_3':
      return '<h3>' + richTextToHtml(block.heading_3.rich_text) + '</h3>';
    case 'bulleted_list_item':
      return '<li>' + richTextToHtml(block.bulleted_list_item.rich_text) + '</li>';
    case 'numbered_list_item':
      return '<li>' + richTextToHtml(block.numbered_list_item.rich_text) + '</li>';
    case 'quote':
      return '<blockquote>' + richTextToHtml(block.quote.rich_text) + '</blockquote>';
    case 'code': {
      const lang = block.code.language || 'plaintext';
      return '<pre><code class="language-' + lang + '">' + richTextToHtml(block.code.rich_text) + '</code></pre>';
    }
    case 'divider':
      return '<hr />';
    case 'image': {
      const imageBlock = block.image;
      const url = imageBlock.type === 'external' ? imageBlock.external.url : imageBlock.file.url;
      const caption = imageBlock.caption ? richTextToHtml(imageBlock.caption) : '';
      return caption
        ? '<figure><img src="' + url + '" alt="' + caption + '" /><figcaption>' + caption + '</figcaption></figure>'
        : '<img src="' + url + '" alt="" />';
    }
    case 'video': {
      const videoBlock = block.video;
      const videoUrl = videoBlock.type === 'external' ? videoBlock.external.url : videoBlock.file.url;
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        const match = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
        const videoId = match ? match[1] : null;
        if (videoId) {
          return '<iframe width="100%" height="400" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>';
        }
      }
      return '<video src="' + videoUrl + '" controls></video>';
    }
    case 'embed': {
      return '<iframe src="' + block.embed.url + '" width="100%" height="400" frameborder="0"></iframe>';
    }
    case 'bookmark': {
      return '<a href="' + block.bookmark.url + '" target="_blank" rel="noopener">' + block.bookmark.url + '</a>';
    }
    case 'callout': {
      const icon = block.callout.icon?.type === 'emoji' ? block.callout.icon.emoji : '';
      return '<div class="callout">' + icon + ' ' + richTextToHtml(block.callout.rich_text) + '</div>';
    }
    case 'toggle': {
      return '<details><summary>' + richTextToHtml(block.toggle.rich_text) + '</summary></details>';
    }
    default:
      return '';
  }
}

async function blocksToHtml(blocks: Array<BlockObjectResponse | PartialBlockObjectResponse>): Promise<string> {
  const htmlParts: string[] = [];
  let currentListType: 'ul' | 'ol' | null = null;
  for (const block of blocks) {
    if (!isFullBlock(block)) continue;
    const isBullet = block.type === 'bulleted_list_item';
    const isNumbered = block.type === 'numbered_list_item';
    if (isBullet && currentListType !== 'ul') {
      if (currentListType) htmlParts.push('</' + currentListType + '>');
      htmlParts.push('<ul>');
      currentListType = 'ul';
    } else if (isNumbered && currentListType !== 'ol') {
      if (currentListType) htmlParts.push('</' + currentListType + '>');
      htmlParts.push('<ol>');
      currentListType = 'ol';
    } else if (!isBullet && !isNumbered && currentListType) {
      htmlParts.push('</' + currentListType + '>');
      currentListType = null;
    }
    htmlParts.push(blockToHtml(block));
  }
  if (currentListType) {
    htmlParts.push('</' + currentListType + '>');
  }
  return htmlParts.join('\n');
}

function extractCoverImage(properties: NotionPageProperties): string | null {
  const anyProps = properties as Record<string, any>;
  const coverProp = anyProps['Cover Image'] || anyProps['cover image'];
  if (!coverProp) return null;
  if (coverProp.url) return coverProp.url;
  if (coverProp.files && coverProp.files.length > 0) {
    const file = coverProp.files[0];
    if (file.type === 'external' && file.external) {
      return file.external.url;
    }
    if (file.type === 'file' && file.file) {
      return file.file.url;
    }
  }
  return null;
}

function getStatusValue(properties: NotionPageProperties): string {
  const anyProps = properties as Record<string, any>;
  const statusProperty = anyProps.Status || anyProps.status;

  return statusProperty?.status?.name || statusProperty?.select?.name || '';
}

function parseNotionPage(page: { id: string; properties: NotionPageProperties }): Omit<NotionBlogPost, 'content'> {
  const props = page.properties as Record<string, any>;

  const titleValue =
    richTextToPlain(props.Title?.title) ||
    richTextToPlain(props.title?.title) ||
    richTextToPlain(props.Name?.title) ||
    richTextToPlain(props.name?.title);

  const slugValue =
    richTextToPlain(props.Slug?.rich_text) ||
    richTextToPlain(props.slug?.rich_text);

  const summaryValue =
    richTextToPlain(props.Summary?.rich_text) ||
    richTextToPlain(props.summary?.rich_text);

  const seoDescriptionValue =
    richTextToPlain(props['SEO Description']?.rich_text) ||
    richTextToPlain(props['seo description']?.rich_text);

  return {
    id: page.id,
    slug: slugValue,
    title: titleValue,
    status: getStatusValue(props as NotionPageProperties),
    publishedAt: props['Published At']?.date?.start || props['published at']?.date?.start || null,
    summary: summaryValue,
    coverImage: extractCoverImage(props as NotionPageProperties),
    tags: props.Tags?.multi_select?.map((t: { name: string }) => t.name) || props.tags?.multi_select?.map((t: { name: string }) => t.name) || [],
    seoDescription: seoDescriptionValue,
  };
}

type NotionQueryFilter = Record<string, unknown>;
type NotionQuerySort = Record<string, unknown>;

async function queryNotionPages(
  client: Client,
  databaseId: string,
  filter?: NotionQueryFilter,
  sorts?: NotionQuerySort[]
): Promise<{ results: Array<{ id: string; properties?: NotionPageProperties }> }> {
  const notion = client as unknown as {
    databases?: {
      query?: (args: Record<string, unknown>) => Promise<{ results: Array<{ id: string; properties?: NotionPageProperties }> }>;
      retrieve?: (args: { database_id: string }) => Promise<Record<string, unknown>>;
    };
    dataSources?: {
      query?: (args: Record<string, unknown>) => Promise<{ results: Array<{ id: string; properties?: NotionPageProperties }> }>;
    };
  };

  if (notion.databases?.query) {
    return notion.databases.query({
      database_id: databaseId,
      ...(filter ? { filter } : {}),
      ...(sorts ? { sorts } : {}),
    });
  }

  if (notion.dataSources?.query) {
    try {
      return await notion.dataSources.query({
        data_source_id: databaseId,
        ...(filter ? { filter } : {}),
        ...(sorts ? { sorts } : {}),
      });
    } catch (error) {
      if (notion.databases?.retrieve) {
        const database = await notion.databases.retrieve({ database_id: databaseId });
        const asAny = database as { data_sources?: Array<{ id: string }>; dataSources?: Array<{ id: string }> };
        const resolvedDataSourceId = asAny.data_sources?.[0]?.id || asAny.dataSources?.[0]?.id;

        if (resolvedDataSourceId) {
          return notion.dataSources.query({
            data_source_id: resolvedDataSourceId,
            ...(filter ? { filter } : {}),
            ...(sorts ? { sorts } : {}),
          });
        }
      }
      throw error;
    }
  }

  throw new Error('Unsupported Notion client version: no query method found');
}

export async function getNotionPosts(): Promise<NotionBlogPost[]> {
  try {
    const client = getNotionClient();
    const databaseId = getDatabaseId();
    const response = await queryNotionPages(client, databaseId, undefined, [
      { property: 'Published At', direction: 'descending' },
    ]);

    const posts: NotionBlogPost[] = [];
    for (const page of response.results) {
      if (!('properties' in page)) continue;
      const pageData = parseNotionPage(page as { id: string; properties: NotionPageProperties });
      if (!pageData.slug) continue;
      if (pageData.status.toLowerCase() !== 'published') continue;

      const blocksResponse = await client.blocks.children.list({ block_id: page.id, page_size: 100 });
      const content = await blocksToHtml(blocksResponse.results);
      posts.push({ ...pageData, content });
    }
    return posts;
  } catch (error) {
    console.error('Error fetching Notion posts:', error);
    return [];
  }
}

export async function getNotionPostBySlug(slug: string): Promise<NotionBlogPost | null> {
  try {
    const client = getNotionClient();
    const databaseId = getDatabaseId();
    const response = await queryNotionPages(client, databaseId);

    const matchingPage = response.results.find((page) => {
      if (!('properties' in page)) return false;
      const pageData = parseNotionPage(page as { id: string; properties: NotionPageProperties });
      return pageData.slug === slug && pageData.status.toLowerCase() === 'published';
    });

    if (!matchingPage || !('properties' in matchingPage)) return null;

    const pageData = parseNotionPage(matchingPage as { id: string; properties: NotionPageProperties });
    const blocksResponse = await client.blocks.children.list({ block_id: matchingPage.id, page_size: 100 });
    const content = await blocksToHtml(blocksResponse.results);
    return { ...pageData, content };
  } catch (error) {
    console.error('Error fetching Notion post by slug:', error);
    return null;
  }
}
