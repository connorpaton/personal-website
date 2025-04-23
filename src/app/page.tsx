'use client';

import InteractiveBackground from '@/components/InteractiveBackground';
import DraggableCategory from '@/components/DraggableCategory';

const categories = [
  { name: 'Startups', path: '/startups' },
  { name: 'Fitness', path: '/fitness' },
  { name: 'Life Learnings', path: '/lifelearnings' },
  { name: 'Books', path: '/books' },
  { name: 'Quotes', path: '/quotes' },
];

export default function Home() {
  return (
    <main className="fixed inset-0 w-full h-full overflow-hidden">
      <InteractiveBackground />
      
      <div className="relative z-10 h-full w-full">
        {categories.map((category, index) => (
          <DraggableCategory
            key={category.name}
            name={category.name}
            path={category.path}
            index={index}
          />
        ))}
      </div>
    </main>
  );
}
