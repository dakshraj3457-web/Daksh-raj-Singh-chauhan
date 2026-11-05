import React, { useState } from 'react';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  recipientName: string;
  heroHeading: string;
  heroSubtitle: string;
  heroTagline: string;
  heroPhotoUrl: string;
  onScrollClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroHeading,
  heroSubtitle,
  heroTagline,
  heroPhotoUrl,
  onScrollClick,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-10 pb-16 overflow-hidden">
      {/* Subtle floral/sparkle floating elements */}
      <div className="absolute top-12 left-8 text-[#F4A6B8]/40 pointer-events-none animate-float-slow">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute top-20 right-10 text-[#C65B7C]/30 pointer-events-none animate-float-slow" style={{ animationDelay: '2s' }}>
        <Heart className="w-6 h-6 fill-[#F4A6B8]/30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-3xl w-full flex flex-col items-center z-10"
      >
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#F4A6B8]/40 shadow-sm text-xs sm:text-sm font-medium text-[#C65B7C] mb-6">
          <Heart className="w-3.5 h-3.5 fill-[#C65B7C]" />
          <span>{heroTagline}</span>
        </div>

        {/* Featured Vaishnavi Portrait with Romantic Frame & Pink Glow */}
        <div className="relative mb-8 group">
          {/* Outer glowing halo */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#F4A6B8] via-[#FFE4EC] to-[#C65B7C] opacity-60 blur-lg group-hover:opacity-80 transition duration-700" />

          {/* Decorative floral wreath styling / circular photo container */}
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full p-2 bg-gradient-to-b from-white via-[#FFF0F5] to-[#FADADD] shadow-romantic-lg border-2 border-[#F4A6B8]/60 overflow-hidden flex items-center justify-center">
            {imgError ? (
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#FFE4EC] to-[#FADADD] flex flex-col items-center justify-center p-4 text-center">
                <Heart className="w-12 h-12 text-[#C65B7C] fill-[#F4A6B8] mb-2 animate-pulse" />
                <span className="font-playfair text-base font-semibold text-[#49313D]">
                  Simply Vaishnavi
                </span>
                <span className="text-[11px] text-[#C65B7C]">A Smile That Radiates</span>
              </div>
            ) : (
              <img
                src={heroPhotoUrl}
                alt="Vaishnavi"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover rounded-full shadow-inner transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
            )}
          </div>

          {/* Corner Floating Heart Badge */}
          <div className="absolute -bottom-2 right-3 w-10 h-10 rounded-full bg-gradient-to-br from-[#C65B7C] to-[#a83c5d] text-white shadow-md flex items-center justify-center border-2 border-white animate-bounce" style={{ animationDuration: '3s' }}>
            <Heart className="w-5 h-5 fill-white text-white" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold text-[#49313D] tracking-tight leading-tight mb-4">
          {heroHeading}
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-[#6d4d5e] max-w-xl mx-auto leading-relaxed mb-4">
          {heroSubtitle}
        </p>

        {/* Romantic accent phrase */}
        <p className="font-dancing text-2xl sm:text-3xl text-[#C65B7C] mb-10">
          Wishing you endless joy, laughter, and timeless memories ♡
        </p>

        {/* Scroll Indicator */}
        <motion.button
          onClick={onScrollClick}
          whileHover={{ y: 3 }}
          className="inline-flex flex-col items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#C65B7C] hover:text-[#9e3a58] transition-colors cursor-pointer mt-2"
          aria-label="Scroll down to explore surprise"
        >
          <span>Scroll to uncover your story</span>
          <div className="w-8 h-8 rounded-full bg-white/80 shadow-sm border border-[#F4A6B8]/40 flex items-center justify-center animate-bounce">
            <ChevronDown className="w-4 h-4 text-[#C65B7C]" />
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
};
