import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link 
        href="/"
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
      
      <h1 className="text-4xl font-bold mb-8 capitalize">{category}</h1>
      
      <div className="grid gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${category}/${post.slug}`}
            className="group"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/10">
              {post.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400">{post.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 