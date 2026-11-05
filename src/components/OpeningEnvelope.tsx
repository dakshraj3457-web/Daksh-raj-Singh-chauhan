import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OpeningEnvelopeProps {
  recipientName: string;
  onOpen: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({
  recipientName,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Allow the envelope unfolding animation to complete before transitioning to the main site
    setTimeout(() => {
      onOpen();
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#FFF0F5] via-[#FFE4EC] to-[#FADADD] px-4 overflow-hidden">
      {/* Decorative ambient blurred blobs */}
      <div className="absolute top-1/4 -left-16 w-64 h-64 bg-[#F4A6B8]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-16 w-72 h-72 bg-[#E8C7A0]/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative max-w-md w-full flex flex-col items-center text-center z-20 py-8 px-6"
      >
        {/* Soft tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#F4A6B8]/30 text-xs font-medium text-[#C65B7C] mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C65B7C]" />
          <span>A Private Digital Gift</span>
        </div>

        {/* Header greetings */}
        <h1 className="font-playfair text-3xl sm:text-4xl font-semibold text-[#49313D] tracking-tight mb-2">
          Hey {recipientName}...
        </h1>
        <p className="font-sans text-base sm:text-lg text-[#6d4d5e] mb-1">
          Someone has made something special for you.
        </p>
        <p className="font-dancing text-xl text-[#C65B7C] mb-8">
          A little surprise, made with lots of love.
        </p>

        {/* Interactive Envelope */}
        <div className="relative w-64 sm:w-72 h-44 mb-8 flex items-center justify-center">
          {/* Envelope Body */}
          <div className="absolute inset-0 bg-[#FFF5F7] rounded-xl border border-[#F4A6B8]/50 envelope-shadow overflow-hidden flex items-end justify-center">
            {/* Back inner fold lines */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFE4EC]/40 to-transparent" />
            
            {/* Letter peek preview inside envelope */}
            <motion.div
              animate={isOpening ? { y: -70, opacity: 1 } : { y: 0, opacity: 0.8 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="w-48 sm:w-56 h-28 bg-white rounded-t-lg shadow-sm border border-[#F4A6B8]/30 flex flex-col items-center pt-3 px-3"
            >
              <div className="w-12 h-1 bg-[#F4A6B8]/40 rounded-full mb-2" />
              <div className="w-32 h-1 bg-[#FADADD] rounded-full mb-1.5" />
              <div className="w-24 h-1 bg-[#FADADD] rounded-full" />
              <Heart className="w-4 h-4 text-[#C65B7C] mt-2 fill-[#C65B7C]" />
            </motion.div>

            {/* Front Envelope Pouch (triangular look) */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-[#FFE4EC] border-t border-[#F4A6B8]/40 shadow-inner flex items-center justify-center"
                 style={{
                   clipPath: 'polygon(0 0, 50% 45%, 100% 0, 100% 100%, 0 100%)'
                 }}
            />
          </div>

          {/* Envelope Top Flap (Animated opening) */}
          <motion.div
            animate={isOpening ? { rotateX: 180, zIndex: 1 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top center' }}
            className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#FADADD] to-[#FFE4EC] rounded-t-xl border-b border-[#F4A6B8]/40 shadow-sm flex items-center justify-center pointer-events-none"
          >
            {/* Wax Seal Heart */}
            <div className="w-10 h-10 -mb-16 rounded-full bg-gradient-to-br from-[#C65B7C] to-[#a83c5d] text-white shadow-md flex items-center justify-center border-2 border-[#FFE4EC]">
              <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
            </div>
          </motion.div>

          {/* Floating hearts during open animation */}
          <AnimatePresence>
            {isOpening && (
              <>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0, x: (i - 3) * 20, opacity: 1, scale: 0.5 }}
                    animate={{
                      y: -140 - Math.random() * 80,
                      x: (i - 3.5) * 35 + (Math.random() - 0.5) * 40,
                      opacity: 0,
                      scale: 1.2,
                    }}
                    transition={{ duration: 1.2, delay: i * 0.08, ease: 'easeOut' }}
                    className="absolute z-40 pointer-events-none"
                  >
                    <Heart className="w-6 h-6 text-[#C65B7C] fill-[#F4A6B8]" />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpenClick}
          disabled={isOpening}
          className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C65B7C] via-[#d36988] to-[#C65B7C] text-white font-medium text-base shadow-romantic-lg hover:shadow-glow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C65B7C] focus:ring-offset-2 cursor-pointer disabled:opacity-80"
          aria-label="Open your surprise envelope"
        >
          <span className="tracking-wide uppercase text-xs sm:text-sm font-semibold">
            {isOpening ? 'Opening with love...' : 'OPEN YOUR SURPRISE ♡'}
          </span>
          <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform duration-300" />
        </motion.button>

        <p className="font-sans text-xs text-[#8a687a] mt-4 opacity-80">
          Tip: Turn on sound for the full romantic experience
        </p>
      </motion.div>
    </div>
  );
};
