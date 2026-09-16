'use client';

import { useState } from 'react';
import PostCard from '@/components/PostCard';

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
};

const BLOG_CATEGORIES = ['lifelearnings', 'startups', 'fitness', 'books', 'quotes'] as const;

const categoryLabels: Record<string, string> = {
  lifelearnings: 'Life',
  startups: 'Startups',
  fitness: 'Fitness',
  books: 'Books',
  quotes: 'Quotes',
};

interface WritingListProps {
  posts: Post[];
}

export default function WritingList({ posts }: WritingListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? posts.filter((post) => post.category === activeCategory)
    : posts;

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 text-sm rounded-full border transition-colors
            ${activeCategory === null
              ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
              : 'bg-transparent text-black/70 border-black/20 hover:border-black/40 dark:text-white/70 dark:border-white/20 dark:hover:border-white/40'
            }`}
        >
          All
        </button>
        {BLOG_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors
              ${activeCategory === category
                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                : 'bg-transparent text-black/70 border-black/20 hover:border-black/40 dark:text-white/70 dark:border-white/20 dark:hover:border-white/40'
              }`}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div>
        {filteredPosts.length === 0 ? (
          <p className="text-black/60 dark:text-white/60 py-8 text-center">
            No posts in this category yet.
          </p>
        ) : (
          filteredPosts.map((post) => (
            <PostCard key={`${post.category}:${post.slug}`} post={post} />
          ))
        )}
      </div>
    </>
  );
}
