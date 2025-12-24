import { getPostBySlug, getAllPostsAcrossCategories } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import BackNav from '@/components/BackNav';

export const metadata: Metadata = {
  title: 'Post',
  description: 'Read the full post',
};

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const categories = ['lifelearnings', 'startups', 'fitness', 'books', 'quotes'];
  const allPosts = await getAllPostsAcrossCategories(categories);
  
  return allPosts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

const categoryLabels: { [key: string]: string } = {
  lifelearnings: 'Life',
  startups: 'Startups',
  fitness: 'Fitness',
  books: 'Books',
  quotes: 'Quotes',
};

export default async function Page(props: Props) {
  const params = await props.params;
  const { category, slug } = params;
  
  try {
    const post = await getPostBySlug(category, slug);

    if (!post) {
      notFound();
    }

    const displayCategory = categoryLabels[category] || category;

    return (
      <main className="container-essay py-16">
        <header className="mb-10">
          <BackNav href={`/${category}`} label="← Back" />

          <h1 className="mt-8 text-3xl sm:text-4xl font-semibold tracking-tight text-black dark:text-white">{post.title}</h1>
          {post.description ? (
            <p className="mt-4 text-lg leading-relaxed text-black/80 dark:text-white/80">{post.description}</p>
          ) : null}
          <div className="mt-4 text-sm text-black/60 dark:text-white/60">
            <span className="uppercase tracking-wide">{displayCategory}</span>
            <span className="mx-2 text-black/35 dark:text-white/35">/</span>
            <span>{post.date}</span>
          </div>
        </header>

        {post.image && post.image.trim() !== '' ? (
          <div className="mb-10">
            <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.04]">
              <Image 
                src={post.image} 
                alt={post.title} 
                width={1200} 
                height={630} 
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          </div>
        ) : null}

        <article
          className="prose-notion"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    notFound();
  }
}
