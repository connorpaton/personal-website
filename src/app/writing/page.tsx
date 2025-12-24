import Link from 'next/link';
import { getAllPostsAcrossCategories } from '@/lib/markdown';
import BackNav from '@/components/BackNav';

const BLOG_CATEGORIES = ['lifelearnings', 'startups', 'fitness', 'books', 'quotes'] as const;

const categoryLabels: Record<(typeof BLOG_CATEGORIES)[number], string> = {
  lifelearnings: 'Life',
  startups: 'Startups',
  fitness: 'Fitness',
  books: 'Books',
  quotes: 'Quotes',
};

export default async function WritingPage() {
  const posts = await getAllPostsAcrossCategories([...BLOG_CATEGORIES]);

  return (
    <main className="container-raf py-16">
      <header className="mb-12">
        <BackNav href="/" label="← Home" />
        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-black dark:text-white">Writing</h1>
        <p className="mt-4 text-lg leading-relaxed text-black/80 dark:text-white/80">
          Everything I&apos;ve published here, across life learnings, startups, fitness, books, and quotes.
        </p>
      </header>

      <div>
        {posts.map((post) => (
          <Link
            key={`${post.category}:${post.slug}`}
            href={`/${post.category}/${post.slug}`}
            className="group block -mx-2 px-2 py-4 border-b border-black/10 dark:border-white/15
                       hover:bg-black/[0.02] dark:hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-baseline justify-between gap-4">
              <div className="text-[15px] sm:text-base font-medium tracking-tight text-black dark:text-white">{post.title}</div>
              <div className="text-xs text-black/60 dark:text-white/60 whitespace-nowrap">{post.date}</div>
            </div>
            <div className="mt-1 text-sm text-black/75 dark:text-white/75 leading-relaxed">{post.description}</div>
            <div className="mt-2 text-[11px] tracking-wide text-black/60 dark:text-white/60 uppercase">
              {categoryLabels[post.category as keyof typeof categoryLabels] ?? post.category}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
