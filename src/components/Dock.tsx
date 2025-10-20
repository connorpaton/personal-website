'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Dock() {
  const [isHovered, setIsHovered] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);

  const handleDoubleClick = () => {
    setShowSpotify(true);
  };

  const closeSpotify = () => {
    setShowSpotify(false);
  };

  return (
    <>
      {/* Dock Container */}
      <motion.div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[60]"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: isHovered ? -10 : 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl px-3 py-2 shadow-2xl">
          <div className="flex gap-2 items-center">
            {/* Spotify Icon */}
            <motion.div
              whileHover={{ scale: 1.2, y: -8 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onDoubleClick={handleDoubleClick}
              className="cursor-pointer w-12 h-12 bg-black rounded-xl flex items-center justify-center overflow-hidden"
            >
              <img
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
                alt="Spotify"
                className="w-8 h-8"
                style={{ objectFit: 'contain' }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Spotify Player Modal */}
      {showSpotify && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center"
          onClick={closeSpotify}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeSpotify}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            {/* Spotify Embed */}
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/25vORe660yyTZtwZ0XsVEl?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

