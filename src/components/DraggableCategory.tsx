'use client';

import { motion, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';

interface DraggableCategoryProps {
  name: string;
  path: string;
  index: number;
}

// Define color themes for each category
const getCategoryTheme = (name: string) => {
  const themes = {
    'Startups': {
      bg: 'bg-gradient-to-r from-purple-600 to-indigo-600',
      hover: 'from-purple-700 to-indigo-700',
      shadow: 'rgba(79, 70, 229, 0.4)',
      icon: '🚀'
    },
    'Fitness': {
      bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
      hover: 'from-green-600 to-emerald-600',
      shadow: 'rgba(16, 185, 129, 0.4)',
      icon: '💪'
    },
    'Life Learnings': {
      bg: 'bg-gradient-to-r from-amber-500 to-yellow-500',
      hover: 'from-amber-600 to-yellow-600',
      shadow: 'rgba(245, 158, 11, 0.4)',
      icon: '🧠'
    },
    'Books': {
      bg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      hover: 'from-blue-600 to-cyan-600',
      shadow: 'rgba(14, 165, 233, 0.4)',
      icon: '📚'
    },
    'Quotes': {
      bg: 'bg-gradient-to-r from-rose-500 to-pink-500',
      hover: 'from-rose-600 to-pink-600',
      shadow: 'rgba(244, 63, 94, 0.4)',
      icon: '💭'
    }
  };
  
  return themes[name as keyof typeof themes] || {
    bg: 'bg-gradient-to-r from-slate-600 to-gray-600',
    hover: 'from-slate-700 to-gray-700',
    shadow: 'rgba(100, 116, 139, 0.4)',
    icon: '✨'
  };
};

export default function DraggableCategory({ name, path, index }: DraggableCategoryProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const theme = getCategoryTheme(name);

  useEffect(() => {
    // Load saved position from localStorage
    const savedX = localStorage.getItem(`category-${name}-x`);
    const savedY = localStorage.getItem(`category-${name}-y`);
    
    if (savedX && savedY) {
      x.set(parseFloat(savedX));
      y.set(parseFloat(savedY));
    } else {
      // Random initial position if not saved
      const randomX = Math.random() * (window.innerWidth - 250); // Avoid edges
      const randomY = Math.random() * (window.innerHeight - 250) + 120; // Start below header
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
      initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: index % 2 === 0 ? 3 : -3,
        transition: { 
          delay: index * 0.2,
          type: "spring",
          stiffness: 260,
          damping: 20
        }
      }}
      className="absolute cursor-move z-10"
    >
      <Link href={path} className="no-underline">
        <motion.div
          className={`px-8 py-5 rounded-xl ${theme.bg} text-white font-bold flex items-center justify-center gap-3`}
          style={{
            boxShadow: `0 10px 25px -5px ${theme.shadow}, 0 8px 10px -6px ${theme.shadow}`,
            minWidth: '220px',
          }}
          whileHover={{ 
            scale: 1.08,
            rotate: index % 2 === 0 ? 5 : -5,
            backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
            boxShadow: `0 20px 25px -5px ${theme.shadow}, 0 10px 10px -5px ${theme.shadow}`,
          }}
          whileTap={{ 
            scale: 0.95,
            rotate: 0
          }}
        >
          <span className="text-2xl">{theme.icon}</span>
          <span className="text-xl">{name}</span>
        </motion.div>
      </Link>
    </motion.div>
  );
} 