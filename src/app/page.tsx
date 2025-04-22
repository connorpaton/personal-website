'use client';

import InteractiveBackground from '@/components/InteractiveBackground';
import DraggableCategory from '@/components/DraggableCategory';

const categories = [
  { name: 'Startups', path: '/startups' },
  { name: 'Fitness', path: '/fitness' },
  { name: 'Life Learnings', path: '/lifelearnings' },
  { name: 'Books', path: '/books' },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <InteractiveBackground />
      
      <div className="relative z-10">
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
