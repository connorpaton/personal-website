import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';
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

  // Map category slugs to display names
  const categoryNames: { [key: string]: string } = {
    'lifelearnings': 'Life',
    'startups': 'Startups',
    'fitness': 'Fitness',
    'books': 'Books',
    'quotes': 'Quotes'
  };

  const displayName = categoryNames[category] || category;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#F5F1E8]" style={{ height: '2vh' }}></div>
      <div className="bg-[#F5F1E8] text-black pt-12 px-12 pb-12 md:pt-16 md:px-16 md:pb-16 lg:pt-20 lg:px-20 lg:pb-20" style={{ fontFamily: 'Recoleta, Georgia, "Times New Roman", serif', marginLeft: '5%' }}>
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center mb-6 text-black/70 hover:text-black transition-colors duration-200 group p-3 rounded-lg hover:bg-black/5"
          >
            <svg 
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </Link>
          
          <h1 className="text-4xl font-bold mb-8" style={{ fontWeight: '900' }}>{displayName}</h1>
          
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${category}/${post.slug}`}
                className="group block"
              >
                <div className="inline-block bg-white/60 backdrop-blur-sm rounded-lg px-6 py-5 transition-all duration-300 hover:bg-white/80">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-black/70 transition-colors" style={{ fontWeight: '700' }}>
                    {post.title}
                  </h2>
                  <p className="text-black/60">{post.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Blank Footer for spacing */}
      <div className="bg-[#F5F1E8]" style={{ height: '10vh' }}></div>
    </>
  );
}
