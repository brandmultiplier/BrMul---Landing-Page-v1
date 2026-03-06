import { Metadata } from 'next';
import { getAllPostsUnified } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';

export const metadata: Metadata = {
  title: 'Blog | BrandMultiplier.ai',
  description: 'Insights on AI marketing, brand strategy, storytelling, and growth tactics for founder-led B2B companies.',
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getAllPostsUnified();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-black">
      <section className="pt-32 md:pt-40 pb-20">
        {/* Full-width container with minimal padding */}
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16 md:mb-20">
              <BlogCard post={featuredPost} featured />
            </div>
          )}

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12 md:mb-16" />

          {/* Blog Grid - 2 columns full width */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {remainingPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Total count */}
          <div className="mt-16 text-center">
            <p className="text-text-tertiary text-sm">
              Showing all {posts.length} articles
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
