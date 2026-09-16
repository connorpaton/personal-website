import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { getAllPostsAcrossCategories } from '@/lib/markdown';
import Nav from '@/components/Nav';

const BLOG_CATEGORIES = ['lifelearnings', 'startups', 'fitness', 'books', 'quotes'] as const;

export default async function Home() {
  const posts = await getAllPostsAcrossCategories([...BLOG_CATEGORIES]);
  const latest = posts.slice(0, 8);

  return (
    <main className="container-raf py-16">
      <header className="mb-14">
        <div className="flex items-baseline justify-between gap-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black dark:text-white">
            Connor Paton
          </h1>
          <Nav />
        </div>
        <p className="mt-6 text-lg leading-relaxed text-black/80 dark:text-white/80">
          Hi, I&apos;m Connor. I love ideas (good or bad), building, and most of all — people. Currently spending my time building <a href="https://tembo.io" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-black dark:hover:text-white">tembo.io</a> with friends.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-black/75 dark:text-white/75">
          <a className="link" href="https://x.com/connorpaton" target="_blank" rel="noopener noreferrer">
            X
          </a>
          <span className="text-black/50 dark:text-white/50">/</span>
          <a className="link" href="https://www.linkedin.com/in/connormpaton/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <span className="text-black/50 dark:text-white/50">/</span>
          <a className="link" href="mailto:connor@tembo.io">
            Email
          </a>
          <span className="text-black/50 dark:text-white/50">/</span>
          <Link className="link" href="/writing">
            View all writing
          </Link>
        </div>
      </header>

      <section>
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="text-xs font-medium tracking-wide text-black/75 dark:text-white/75 uppercase">
            Latest writing
          </h2>
          <div className="flex flex-wrap justify-end gap-x-5 gap-y-2 text-sm text-black/80 dark:text-white/80">
            <Link className="link" href="/walk">Take a walk ↗</Link>
            <Link className="link" href="/writing">View all →</Link>
          </div>
        </div>

        <div className="mt-6">
          {latest.map((post) => (
            <PostCard key={`${post.category}:${post.slug}`} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
