import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/lib/markdown';
import landscapes from '../../scripts/post-landscapes.json';

const categoryLabels: Record<string, string> = {
  lifelearnings: 'Life',
  startups: 'Startups',
  fitness: 'Fitness',
  books: 'Books',
  quotes: 'Quotes',
};

type PostCardProps = {
  post: Pick<Post, 'slug' | 'category' | 'title' | 'description' | 'date'>;
};

export default function PostCard({ post }: PostCardProps) {
  const landscape = Object.prototype.hasOwnProperty.call(landscapes, post.slug)
    ? post.slug
    : 'my-framework-to-life';

  return (
    <Link
      href={`/${post.category}/${post.slug}`}
      className="group flex items-center justify-between gap-4 sm:gap-8 -mx-2 px-2 py-8 sm:py-10 border-b border-black/10 dark:border-white/10
                 hover:bg-black/[0.02] dark:hover:bg-white/[0.04] transition-colors
                 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
    >
      <div className="min-w-0">
        <div className="text-base font-medium leading-snug tracking-tight text-black dark:text-white">
          {post.title}
        </div>
        <div className="mt-2 text-sm text-black/65 dark:text-white/70 leading-relaxed">
          {post.description}
        </div>
        <div className="mt-3 text-[11px] leading-relaxed tracking-wider text-black/60 dark:text-white/60 uppercase">
          {categoryLabels[post.category] || post.category}
        </div>
      </div>
      <div className="relative isolate size-20 sm:size-28 shrink-0 overflow-hidden rounded-md bg-slate-900 ring-1 ring-inset ring-black/10 dark:ring-white/10">
        <Image
          src={`/images/posts/${landscape}-day.png`}
          alt=""
          width={256}
          height={256}
          loading="eager"
          unoptimized
          className="size-full object-cover dark:hidden [image-rendering:pixelated]"
        />
        <Image
          src={`/images/posts/${landscape}-night.png`}
          alt=""
          width={256}
          height={256}
          loading="eager"
          unoptimized
          className="hidden size-full object-cover dark:block [image-rendering:pixelated]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-1 pb-2 pt-6 text-center">
          <time
            dateTime={post.date}
            className="font-mono text-[10px] leading-none tracking-tight text-white/75 transition-colors group-hover:text-white group-focus-visible:text-white"
          >
            {post.date}
          </time>
        </div>
      </div>
    </Link>
  );
}
