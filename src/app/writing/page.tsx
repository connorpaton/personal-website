import { getAllPostsAcrossCategories } from '@/lib/markdown';
import BackNav from '@/components/BackNav';
import WritingList from '@/components/WritingList';

const BLOG_CATEGORIES = ['lifelearnings', 'startups', 'fitness', 'books', 'quotes'] as const;

export default async function WritingPage() {
  const posts = await getAllPostsAcrossCategories([...BLOG_CATEGORIES]);

  return (
    <main className="container-raf py-16">
      <header className="mb-8">
        <BackNav href="/" label="← Home" />
        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-black dark:text-white">Writing</h1>
        <p className="mt-4 text-lg leading-relaxed text-black/80 dark:text-white/80">
          Everything I&apos;ve published here, across life learnings, startups, fitness, books, and quotes.
        </p>
      </header>

      <WritingList posts={posts} />
    </main>
  );
}
