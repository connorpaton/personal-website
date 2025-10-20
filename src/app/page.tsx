'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Minesweeper from '@/components/Minesweeper';

const categories = [
  { name: 'Startups', path: '/startups', type: 'folder' },
  { name: 'Fitness', path: '/fitness', type: 'folder' },
  { name: 'Life', path: '/lifelearnings', type: 'folder' },
  { name: 'Books', path: '/books', type: 'folder' },
  { name: 'Quotes', path: '/quotes', type: 'folder' },
  { name: 'Spotify', path: null, type: 'spotify' },
  { name: 'Minesweeper', path: null, type: 'minesweeper' },
];

export default function Home() {
  const [showSpotify, setShowSpotify] = useState(false);
  const [showMinesweeper, setShowMinesweeper] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  const handleSpotifyClick = () => {
    console.log('Opening Spotify modal');
    setShowSpotify(true);
    // Set initial position when opening
    setPosition({ 
      x: window.innerWidth - 600, 
      y: window.innerHeight - 300 
    });
  };

  const handleMinesweeperClick = () => {
    console.log('Opening Minesweeper');
    setShowMinesweeper(true);
  };

  useEffect(() => {
    if (!showSpotify) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (!modalRef.current) return;
      
      const target = e.target as HTMLElement;
      // Only allow dragging from the modal container itself, not iframe or button
      if (!modalRef.current.contains(target)) return;
      if (target.tagName === 'IFRAME' || 
          target.tagName === 'BUTTON' ||
          target.closest('button') ||
          target.closest('iframe')) {
        return;
      }

      e.preventDefault();
      isDraggingRef.current = true;
      
      const rect = modalRef.current.getBoundingClientRect();
      dragOffsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      modalRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !modalRef.current) return;
      
      e.preventDefault();
      
      // Direct DOM manipulation for smooth, instant updates
      const newX = e.clientX - dragOffsetRef.current.x;
      const newY = e.clientY - dragOffsetRef.current.y;
      
      modalRef.current.style.left = `${newX}px`;
      modalRef.current.style.top = `${newY}px`;
      
      // Update state for persistence (but don't rely on it for rendering during drag)
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current && modalRef.current) {
        modalRef.current.style.cursor = 'grab';
      }
      isDraggingRef.current = false;
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [showSpotify]);

  return (
    <>
    <main className="h-screen overflow-hidden relative bg-transparent" data-page="home">
      {/* Spotify Modal */}
      {showSpotify && (
        <div 
          className="fixed inset-0" 
          style={{ zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.5)', pointerEvents: 'auto' }}
          onClick={() => setShowSpotify(false)}
        >
          <div 
            ref={modalRef}
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '35px', 
              borderRadius: '20px', 
              position: 'fixed',
              left: `${position.x}px`,
              top: `${position.y}px`,
              cursor: 'grab',
              userSelect: 'none'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - macOS style */}
            <button
              onClick={() => setShowSpotify(false)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5F57'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF5F57'}
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#FF5F57',
                color: 'rgba(0,0,0,0.4)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '9px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              ✕
            </button>
            
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/25vORe660yyTZtwZ0XsVEl?utm_source=generator"
              width="500"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            ></iframe>
          </div>
        </div>
      )}

      {/* Minesweeper Modal */}
      {showMinesweeper && (
        <div 
          className="fixed inset-0" 
          style={{ zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.7)', pointerEvents: 'auto' }}
          onClick={() => setShowMinesweeper(false)}
        >
          <div 
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.05]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded border border-[#808080] bg-[#c0c0c0] shadow-2xl shadow-[inset_-1px_-1px_0_0_#000,inset_1px_1px_0_0_#fff,inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#dfdfdf]">
              {/* Title bar */}
              <div className="flex items-center justify-between bg-[#000080] px-2 py-1 text-white">
                <div className="flex items-center gap-2 font-bold">
                  <span className="inline-block h-4 w-4 rounded-full bg-gradient-to-b from-sky-200 to-sky-500" />
                  <span>Minesweeper</span>
                </div>
                <button
                  onClick={() => setShowMinesweeper(false)}
                  className="rounded border border-[#808080] bg-[#c0c0c0] px-2 text-xs font-bold text-black hover:bg-[#d0d0d0]"
                >
                  ×
                </button>
              </div>
              <div className="p-4">
                <Minesweeper onClose={() => setShowMinesweeper(false)} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vintage Computer Room Background - Full Screen */}
      <img 
        src="/images/vintage-computer-room.jpg"
        alt="Vintage Computer Room"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />
      {/* Dark overlay for better text readability */}
      <div className="fixed inset-0 w-full h-full bg-black/30 z-[1]" />
      {/* Folders - Top Left Vertical Stack */}
      <motion.div 
        className="fixed z-50 flex flex-col gap-2"
        style={{ left: 'calc(1rem + 0.125vw)', top: 'calc(1rem + 0.125vw)' }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.08, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 flex justify-center h-[90px]"
            style={{ pointerEvents: 'auto' }}
          >
            {category.type === 'folder' ? (
              <Link href={category.path} className="flex flex-col items-center justify-between group cursor-pointer w-full h-full">
                {/* Folder Icon - Small macOS size */}
                <div className="w-14 h-14 flex items-center justify-center mb-1">
                  <img 
                    src="/images/folder-icon.png" 
                    alt={category.name}
                    className="max-w-full max-h-full object-contain drop-shadow-lg"
                    style={{ width: '56px', height: '56px' }}
                  />
                </div>
                {/* Category Label */}
                <span 
                  className="text-white text-sm font-black text-center leading-snug max-w-[85px] line-clamp-2 block px-2 py-1 rounded-md bg-black/80 backdrop-blur-md"
                  style={{ 
                    textShadow: '0 2px 6px rgba(0,0,0,1), 0 0 3px rgba(0,0,0,0.5)',
                    fontFamily: 'Recoleta, Georgia, "Times New Roman", serif',
                    fontWeight: '900'
                  }}
                >
                  {category.name}
                </span>
              </Link>
            ) : category.type === 'spotify' ? (
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSpotifyClick();
                }}
                type="button"
                className="flex flex-col items-center justify-between group cursor-pointer bg-transparent border-0 p-0 w-full h-full"
                style={{ pointerEvents: 'auto', zIndex: 100 }}
              >
                {/* Spotify Icon - Same size as folder */}
                <div className="w-14 h-14 flex items-center justify-center mb-1" style={{ pointerEvents: 'none' }}>
                  <img 
                    src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
                    alt="Spotify"
                    className="max-w-full max-h-full object-contain drop-shadow-lg"
                    style={{ width: '56px', height: '56px', pointerEvents: 'none' }}
                  />
                </div>
                {/* Spotify Label */}
                <span 
                  className="text-white text-sm font-black text-center leading-snug max-w-[85px] line-clamp-2 block px-2 py-1 rounded-md bg-black/80 backdrop-blur-md"
                  style={{ 
                    color: 'white',
                    textShadow: '0 2px 6px rgba(0,0,0,1), 0 0 3px rgba(0,0,0,0.5)',
                    fontFamily: 'Recoleta, Georgia, "Times New Roman", serif',
                    fontWeight: '900',
                    pointerEvents: 'none'
                  }}
                >
                  {category.name}
                </span>
              </button>
            ) : (
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleMinesweeperClick();
                }}
                type="button"
                className="flex flex-col items-center justify-between group cursor-pointer bg-transparent border-0 p-0 w-full h-full"
                style={{ pointerEvents: 'auto', zIndex: 100 }}
              >
                {/* Minesweeper Icon - Mine image matching folder size */}
                <div className="w-14 h-14 flex items-center justify-center mb-1">
                  <img 
                    src="/images/mine-icon.jpg"
                    alt="Minesweeper"
                    className="drop-shadow-lg"
                    style={{ width: '56px', height: '56px', objectFit: 'contain', pointerEvents: 'none' }}
                  />
                </div>
                {/* Minesweeper Label */}
                <span 
                  className="text-white text-sm font-black text-center leading-snug max-w-[85px] line-clamp-2 block px-2 py-1 rounded-md bg-black/80 backdrop-blur-md"
                  style={{ 
                    color: 'white',
                    textShadow: '0 2px 6px rgba(0,0,0,1), 0 0 3px rgba(0,0,0,0.5)',
                    fontFamily: 'Recoleta, Georgia, "Times New Roman", serif',
                    fontWeight: '900',
                    pointerEvents: 'none'
                  }}
                >
                  {category.name}
                </span>
              </button>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content - Positioned at 25% from top */}
      <div className="flex flex-col items-center h-screen relative z-10 pt-[25vh]">
        {/* Greeting Text */}
        <motion.h1 
          className="text-5xl font-black text-white text-center max-w-3xl px-8"
          style={{
            fontFamily: 'Recoleta, Georgia, "Times New Roman", serif',
            fontWeight: '900',
            letterSpacing: '0.01em',
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
            lineHeight: '1.3'
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          CONNOR PATON
        </motion.h1>
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
    </>
  );
}
