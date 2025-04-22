'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function InteractiveBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [0, isClient ? window.innerHeight : 0], [15, -15]);
  const rotateY = useTransform(springX, [0, isClient ? window.innerWidth : 0], [-15, 15]);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isClient]);

  if (!isClient) {
    return (
      <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-gray-900 to-black dark:from-gray-900 dark:to-black" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-gradient-to-br from-gray-900 to-black dark:from-gray-900 dark:to-black"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{
              top: `${(i * 100) / 20}%`,
              transform: `translateZ(${i * 10}px)`,
            }}
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
            style={{
              left: `${(i * 100) / 20}%`,
              transform: `translateZ(${i * 10}px)`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
} 