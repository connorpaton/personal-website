import { getPostBySlug } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

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
      <div className="min-h-screen bg-black text-white">
        {/* Back Button - Top Left */}
        <div className="absolute top-8 left-8 z-10">
          <Link 
            href={`/${category}`}
            className="inline-flex items-center text-white/60 hover:text-white transition-colors duration-200 group p-3 rounded-lg hover:bg-white/5"
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
        </div>
        
        <article className="py-12">
          
          {/* Header Section */}
          <div className="ml-[33%] w-[33%] mb-16 text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight tracking-tight">{post.title}</h1>
            <p className="text-xl text-white/70 leading-relaxed font-light">{post.description}</p>
          </div>

          {/* Featured Image */}
          {post.image && post.image.trim() !== '' && (
            <div className="ml-[33%] w-[33%] mb-16">
              <div className="w-full rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            </div>
          )}
          


          {/* Content */}
          <div className="ml-[33%] w-[33%]">
            <div
              className="notion-content prose prose-xl dark:prose-invert max-w-none
                         prose-headings:font-bold prose-headings:tracking-tight
                         prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
                         prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10
                         prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
                         prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6 prose-p:text-white/90
                         prose-strong:text-white prose-strong:font-semibold
                         prose-em:text-white/80 prose-em:italic
                         prose-blockquote:border-l-4 prose-blockquote:border-white/20 prose-blockquote:pl-6 prose-blockquote:my-8
                         prose-blockquote:text-white/80 prose-blockquote:font-medium prose-blockquote:text-xl
                         prose-blockquote:not-italic prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
                         prose-ul:my-6 prose-li:text-white/90 prose-li:mb-2 prose-li:text-lg
                         prose-ol:my-6
                         prose-hr:border-white/20 prose-hr:my-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
        <Footer />
      </div>
    );
  } catch {
    notFound();
  }
} 