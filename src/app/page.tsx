'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Starfield from '@/components/Starfield';

const categories = [
  { name: 'Startups', path: '/startups' },
  { name: 'Fitness', path: '/fitness' },
  { name: 'Life Learnings', path: '/lifelearnings' },
  { name: 'Books', path: '/books' },
  { name: 'Quotes', path: '/quotes' },
];

export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-black relative">
      {/* Starfield Background */}
      <Starfield />
      {/* Main Content - Centered */}
      <div className="flex flex-col items-center justify-center h-screen relative z-10">
        {/* Name - Above Signature */}
        <motion.h1 
          className="text-7xl font-bold mb-8 tracking-tight text-white"
          style={{
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: '900',
            letterSpacing: '-0.02em',
            textShadow: '0 0 30px rgba(255,255,255,0.3)'
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          CONNOR PATON
        </motion.h1>

        {/* Digital Signature - Below Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-80 h-48 mb-16 text-white"
        >
          {/* Digital Signature SVG */}
          <svg 
            viewBox="0 0 400 300" 
            className="w-full h-full"
            fill="currentColor"
          >
            {/* Top horizontal line */}
            <line x1="50" y1="80" x2="350" y2="80" stroke="currentColor" strokeWidth="4"/>
            
            {/* Radiating lines from center-right */}
            <line x1="320" y1="80" x2="280" y2="120" stroke="currentColor" strokeWidth="4"/>
            <line x1="320" y1="80" x2="300" y2="140" stroke="currentColor" strokeWidth="4"/>
            <line x1="320" y1="80" x2="250" y2="160" stroke="currentColor" strokeWidth="4"/>
            <line x1="320" y1="80" x2="200" y2="180" stroke="currentColor" strokeWidth="4"/>
            <line x1="320" y1="80" x2="150" y2="200" stroke="currentColor" strokeWidth="4"/>
            
            {/* Top-left connecting line */}
            <line x1="50" y1="80" x2="100" y2="120" stroke="currentColor" strokeWidth="4"/>
          </svg>
        </motion.div>

        {/* Categories - Below Signature in Horizontal Line */}
        <motion.div 
          className="flex justify-between items-center w-full max-w-6xl mx-auto px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 mx-2"
            >
              <Link href={category.path}>
                <div className="px-6 py-6 rounded-2xl font-semibold text-lg transition-all duration-300 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-center shadow-lg hover:shadow-xl">
                  <div className="text-lg font-medium">
                    {category.name}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Theme Toggle - Top Right */}
      <div className="fixed top-8 right-8 z-20">
        <motion.button
          onClick={() => {
            const event = new MouseEvent('click', { bubbles: true });
            document.dispatchEvent(event);
          }}
          className="px-6 py-3 rounded-xl font-semibold tracking-wide transition-all duration-300 bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ☀️ LIGHT
        </motion.button>
      </div>
    </main>
  );
}
