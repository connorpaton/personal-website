import { getPostBySlug } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';

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
        {/* Back Button */}
        <Link 
          href={`/${category}`}
          className="inline-flex items-center mb-6 text-white/70 hover:text-white transition-colors duration-200 group p-2 rounded-lg hover:bg-white/10"
        >
          <svg 
            className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">{post.description}</p>
        </div>

        {post.image && post.image.trim() !== '' && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
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