import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, formatDate } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const imageUrl = post.thumbnailImage || post.mainImage;
  
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white/5">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={post.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent-purple/20 to-accent-indigo/20" />
            )}
          </div>
          <div className="space-y-4">
            <span className="text-[#F36901] text-sm font-medium uppercase tracking-wider">
              Newest Blog Post
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-white leading-tight group-hover:text-accent-purple transition-colors">
              {post.name}
            </h2>
            {post.postSummary && (
              <p className="text-text-secondary text-base leading-relaxed line-clamp-3">
                {post.postSummary}
              </p>
            )}
            <span className="inline-flex items-center gap-2 text-[#F36901] font-medium uppercase tracking-wider text-sm group-hover:gap-3 transition-all">
              Explore Further
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full flex flex-col">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white/5 mb-6">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent-purple/20 to-accent-indigo/20" />
          )}
        </div>
        <h3 className="text-xl md:text-2xl font-medium text-white leading-snug group-hover:text-accent-purple transition-colors mb-3">
          {post.name}
        </h3>
        {post.postSummary && (
          <p className="text-text-secondary text-base leading-relaxed line-clamp-3 flex-1">
            {post.postSummary}
          </p>
        )}
      </article>
    </Link>
  );
}
