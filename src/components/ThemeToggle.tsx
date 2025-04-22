'use client';

import { motion, useMotionValue } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useEffect, useRef } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const elementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkPosition = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Check if element is off screen
      const isOffScreen = 
        rect.right > windowWidth ||
        rect.left < 0 ||
        rect.bottom > windowHeight ||
        rect.top < 0;

      if (isOffScreen) {
        // Reset to top right corner with some padding
        const newX = windowWidth - rect.width - 20;
        const newY = 20;
        
        x.set(newX);
        y.set(newY);
        
        // Update localStorage with new position
        localStorage.setItem('signatureX', newX.toString());
        localStorage.setItem('signatureY', newY.toString());
      }
    };

    // Load saved position
    const savedX = localStorage.getItem('signatureX');
    const savedY = localStorage.getItem('signatureY');
    
    if (savedX && savedY) {
      x.set(parseFloat(savedX));
      y.set(parseFloat(savedY));
      // Check position after setting saved coordinates
      setTimeout(checkPosition, 0);
    }

    // Check position on window resize
    window.addEventListener('resize', checkPosition);
    return () => window.removeEventListener('resize', checkPosition);
  }, [x, y]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  const handleDragEnd = () => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Keep element within viewport bounds
    let newX = x.get();
    let newY = y.get();

    if (rect.right > windowWidth) newX = windowWidth - rect.width;
    if (rect.left < 0) newX = 0;
    if (rect.bottom > windowHeight) newY = windowHeight - rect.height;
    if (rect.top < 0) newY = 0;

    x.set(newX);
    y.set(newY);

    // Save position to localStorage
    localStorage.setItem('signatureX', newX.toString());
    localStorage.setItem('signatureY', newY.toString());
  };

  return (
    <motion.button
      ref={elementRef}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      style={{ x, y }}
      className="fixed top-0 right-0 p-4 text-4xl font-signature text-white dark:text-white cursor-move hover:opacity-80 transition-opacity z-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      Connor Paton
    </motion.button>
  );
} 