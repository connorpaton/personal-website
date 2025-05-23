import { getPostBySlug } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';

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

export default async function Page(props: Props) {
  const params = await props.params;
  const { category, slug } = params;
  
  try {
    const post = await getPostBySlug(category, slug);

    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">{post.description}</p>
        </div>

        {post.image && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div
          className="prose dark:prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    );
  } catch {
    notFound();
  }
} 