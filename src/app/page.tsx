import Link from 'next/link';
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
          I'm Connor — I build, write, and learn in public. This site is a living
          notebook: short essays, notes, and takeaways on startups, life,
          fitness, books, and ideas.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-black/75 dark:text-white/75">
          <a className="link" href="mailto:connor@tembo.io">
            Email
          </a>
          <span className="text-black/50 dark:text-white/50">/</span>
          <a className="link" href="https://x.com/connorpaton" target="_blank" rel="noopener noreferrer">
            X
          </a>
          <span className="text-black/50 dark:text-white/50">/</span>
          <a className="link" href="https://www.linkedin.com/in/connormpaton/" target="_blank" rel="noopener noreferrer">
            LinkedIn
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
          <Link className="text-sm opacity-80 hover:opacity-100 link text-black/80 dark:text-white/80" href="/writing">
            View all →
          </Link>
        </div>

        <div className="mt-6">
          {latest.map((post) => (
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
              <div className="mt-1 text-sm text-black/75 dark:text-white/75 leading-relaxed">
                {post.description}
              </div>
              <div className="mt-2 text-[11px] tracking-wide text-black/60 dark:text-white/60 uppercase">
                {post.category}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
