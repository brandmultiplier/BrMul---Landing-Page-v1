import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlugUnified, formatDate, getAuthorDisplayName } from '@/lib/blog';
import './blog-content.css';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlugUnified(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | BrandMultiplier.ai',
    };
  }

  return {
    title: `${post.name} | BrandMultiplier.ai Blog`,
    description: post.postSummary || `Read ${post.name} on the BrandMultiplier.ai blog.`,
    openGraph: {
      title: post.name,
      description: post.postSummary,
      type: 'article',
      publishedTime: post.publishedOn,
      images: post.mainImage ? [post.mainImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlugUnified(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      <article className="pt-32 md:pt-40 pb-20">
        <div className="container-width">
          {/* Back to blog */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Blog
          </Link>

          {/* Hero Image */}
          {post.mainImage && (
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-10 bg-white/5">
              <Image
                src={post.mainImage}
                alt={post.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          )}

          {/* Post Header */}
          <header className="max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
              {post.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-text-secondary text-sm">
              {post.author && (
                <span className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple font-medium text-xs">
                    {getAuthorDisplayName(post.author).charAt(0)}
                  </span>
                  {getAuthorDisplayName(post.author)}
                </span>
              )}
              {post.publishedOn && (
                <>
                  <span className="text-white/20">•</span>
                  <time dateTime={post.publishedOn}>
                    {formatDate(post.publishedOn)}
                  </time>
                </>
              )}
            </div>
          </header>

          {/* Post Content */}
          <div
            className="blog-content max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: post.postBody }}
          />

          {/* Footer CTA */}
          <div className="max-w-3xl mx-auto mt-16 pt-12 border-t border-white/10">
            <div className="text-center">
              <h3 className="text-2xl font-medium text-white mb-4">
                Ready to transform your brand story?
              </h3>
              <p className="text-text-secondary mb-6">
                Schedule a free diagnostic to see how we can help.
              </p>
              <Link
                href="/#cta"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#A855F7] to-[#6366F1] text-white font-medium rounded-full hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-shadow"
              >
                Schedule The Diagnostic
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
