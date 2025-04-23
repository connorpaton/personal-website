'use client';

import InteractiveBackground from '@/components/InteractiveBackground';
import DraggableCategory from '@/components/DraggableCategory';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Startups', path: '/startups' },
  { name: 'Fitness', path: '/fitness' },
  { name: 'Life Learnings', path: '/lifelearnings' },
  { name: 'Books', path: '/books' },
  { name: 'Quotes', path: '/quotes' },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <InteractiveBackground />
      
      <div className="relative z-10 h-screen w-full">
        <motion.h1 
          className="absolute top-8 left-1/2 transform -translate-x-1/2 text-4xl md:text-5xl font-bold text-center text-white mix-blend-difference"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Connor Paton
        </motion.h1>
        
        <motion.p
          className="absolute top-24 left-1/2 transform -translate-x-1/2 text-lg md:text-xl text-center text-white/80 max-w-md mix-blend-difference"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Explore my thoughts and experiences
        </motion.p>
        
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
