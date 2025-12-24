import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';
import { Metadata } from 'next';
import BackNav from '@/components/BackNav';

export const metadata: Metadata = {
  title: 'Category',
  description: 'Browse posts by category',
};

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateStaticParams() {
  return [
    { category: 'startups' },
    { category: 'fitness' },
    { category: 'lifelearnings' },
    { category: 'books' },
    { category: 'quotes' }
  ];
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { category } = params;
  const posts = await getAllPosts(category);

  const categoryNames: { [key: string]: string } = {
    'lifelearnings': 'Life',
    'startups': 'Startups',
    'fitness': 'Fitness',
    'books': 'Books',
    'quotes': 'Quotes'
  };

  const displayName = categoryNames[category] || category;

  return (
    <main className="container-raf py-16">
      <header className="mb-12">
        <BackNav href="/" label="← Home" />

        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-black dark:text-white">
          {displayName}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-black/80 dark:text-white/80">
          Browse {displayName.toLowerCase()} writing.
        </p>
      </header>

      <div>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${category}/${post.slug}`}
            className="group block -mx-2 px-2 py-4 border-b border-black/10 dark:border-white/15
                       hover:bg-black/[0.02] dark:hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-baseline justify-between gap-4">
              <div className="text-[15px] sm:text-base font-medium tracking-tight text-black dark:text-white">
                {post.title}
              </div>
              <div className="text-xs text-black/60 dark:text-white/60 whitespace-nowrap">
                {post.date}
              </div>
            </div>
            <div className="mt-1 text-sm text-black/75 dark:text-white/75 leading-relaxed">
              {post.description}
            </div>
            <div className="mt-2 text-[11px] tracking-wide text-black/60 dark:text-white/60 uppercase">
              {category}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
