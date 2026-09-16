import { getAllPosts } from '@/lib/markdown';
import PostCard from '@/components/PostCard';
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
          <PostCard key={`${post.category}:${post.slug}`} post={post} />
        ))}
      </div>
    </main>
  );
}
