import { getPostBySlug, getAllPostsAcrossCategories } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
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

export default async function Page(props: Props) {
  const params = await props.params;
  const { category, slug } = params;
  
  try {
    const post = await getPostBySlug(category, slug);

    if (!post) {
      notFound();
    }

    return (
      <main className="container-essay py-16">
        <header className="mb-10">
          <BackNav href={`/${category}`} label="← Back" />

          <h1 className="mt-8 text-3xl sm:text-4xl font-semibold tracking-tight text-black dark:text-white">{post.title}</h1>
          {post.description ? (
            <p className="mt-4 text-lg leading-relaxed text-black/80 dark:text-white/80">{post.description}</p>
          ) : null}
          <div className="mt-4 text-sm text-black/60 dark:text-white/60">
            <span className="uppercase tracking-wide">{category}</span>
            <span className="mx-2 text-black/35 dark:text-white/35">/</span>
            <span>{post.date}</span>
          </div>
        </header>

        {post.image && post.image.trim() !== '' ? (
          <div className="mb-10">
            <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.04]">
              <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
            </div>
          </div>
        ) : null}

        <article
          className="prose prose-lg max-w-none
                     prose-stone dark:prose-invert
                     prose-p:leading-relaxed prose-p:mb-6
                     prose-headings:tracking-tight prose-headings:font-semibold prose-headings:mt-10 prose-headings:mb-4
                     prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                     prose-li:leading-relaxed prose-li:mb-2
                     prose-ul:my-6 prose-ol:my-6
                     prose-a:underline prose-a:underline-offset-4 prose-a:decoration-black/30 dark:prose-a:decoration-white/30
                     prose-blockquote:border-l-black/20 dark:prose-blockquote:border-l-white/25 prose-blockquote:bg-black/[0.03] dark:prose-blockquote:bg-white/[0.06] prose-blockquote:py-4 prose-blockquote:my-8
                     prose-hr:my-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    notFound();
  }
}
