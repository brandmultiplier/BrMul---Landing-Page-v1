import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';

export const metadata: Metadata = {
  title: 'Blog | BrandMultiplier.ai',
  description: 'Insights on AI marketing, brand strategy, storytelling, and growth tactics for founder-led B2B companies.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-black">
      <section className="section-spacing pt-32 md:pt-40">
        <div className="container-width">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16 md:mb-24">
              <BlogCard post={featuredPost} featured />
            </div>
          )}

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12 md:mb-16" />

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
