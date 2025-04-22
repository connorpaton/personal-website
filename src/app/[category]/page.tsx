import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const posts = await getAllPosts(params.category);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 capitalize">{params.category}</h1>
      
      <div className="grid gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${params.category}/${post.slug}`}
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