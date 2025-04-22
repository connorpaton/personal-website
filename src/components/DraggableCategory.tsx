'use client';

import { motion, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';

interface DraggableCategoryProps {
  name: string;
  path: string;
  index: number;
}

export default function DraggableCategory({ name, path, index }: DraggableCategoryProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    // Load saved position from localStorage
    const savedX = localStorage.getItem(`category-${name}-x`);
    const savedY = localStorage.getItem(`category-${name}-y`);
    
    if (savedX && savedY) {
      x.set(parseFloat(savedX));
      y.set(parseFloat(savedY));
    } else {
      // Random initial position if not saved
      const randomX = Math.random() * (window.innerWidth - 200); // Avoid edges
      const randomY = Math.random() * (window.innerHeight - 200) + 100; // Start below header
      x.set(randomX);
      y.set(randomY);
    }
  }, [name, x, y]);

  const handleDragEnd = () => {
    // Save position to localStorage
    localStorage.setItem(`category-${name}-x`, x.get().toString());
    localStorage.setItem(`category-${name}-y`, y.get().toString());
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: { delay: index * 0.2 }
      }}
      className="absolute cursor-move"
    >
      <Link href={path} className="no-underline">
        <motion.div
          className="text-2xl font-notepad text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors no-underline"
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            WebkitTextFillColor: 'inherit',
            textDecoration: 'none',
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: -2,
          }}
          whileTap={{ scale: 0.95 }}
        >
          {name}
        </motion.div>
      </Link>
    </motion.div>
  );
} 