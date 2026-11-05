import React, { useState, useEffect, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { GalleryPhoto } from '../config/birthdayConfig';
import { motion, AnimatePresence } from 'motion/react';

interface MemoryGalleryProps {
  photos: GalleryPhoto[];
  onCaptionChange?: (id: string, caption: string) => void;
  isEditable?: boolean;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  photos,
  onCaptionChange,
  isEditable = false,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! + 1) % photos.length);
  }, [selectedIdx, photos.length]);

  const handlePrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! - 1 + photos.length) % photos.length);
  }, [selectedIdx, photos.length]);

  const handleClose = () => setSelectedIdx(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, handleNext, handlePrev]);

  // Touch swipe support for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      handleNext(); // Swiped left -> next
    } else if (diff < -50) {
      handlePrev(); // Swiped right -> prev
    }
    setTouchStart(null);
  };

  return (
    <section id="gallery-section" className="relative w-full max-w-6xl mx-auto px-4 py-16 sm:py-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-medium mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Our Scrapbook Memories</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#49313D] mb-3">
          Moments That Make You Smile
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-[#C65B7C]">
          Photographs of precious times, gentle smiles, and quiet happiness
        </p>
      </div>

      {/* Polaroid & Scrapbook Grid for Photos 2–5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
        {photos.map((photo, idx) => {
          const rotationAngle = photo.rotation ?? (idx % 2 === 0 ? -1.5 : 2);

          return (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
              transition={{ duration: 0.3 }}
              style={{ transform: `rotate(${rotationAngle}deg)` }}
              onClick={() => setSelectedIdx(idx)}
              className="group relative bg-white p-3.5 pb-6 rounded-2xl shadow-romantic hover:shadow-romantic-lg border border-[#F4A6B8]/30 cursor-pointer transition-shadow"
            >
              {/* Cute Washi Tape decorative sticker at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#FFE4EC]/90 border-t border-b border-[#F4A6B8]/40 rounded-sm shadow-xs rotate-1 pointer-events-none" />

              {/* Polaroid Image Container */}
              <div className="w-full aspect-[4/5] bg-[#FFF0F5] rounded-xl overflow-hidden mb-3 relative">
                <img
                  src={photo.url}
                  alt={photo.caption || `Memory photo ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback graceful graphic if network drops
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                      target.parentElement.innerHTML =
                        '<div class="text-center p-4 text-[#C65B7C]"><svg class="w-8 h-8 mx-auto mb-1 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg><span class="text-xs font-semibold">Special Memory</span></div>';
                    }
                  }}
                />
                {/* Subtle hover icon */}
                <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65B7C]" />
                </div>
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="px-1 text-center">
                {isEditable ? (
                  <input
                    type="text"
                    value={photo.caption}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => onCaptionChange?.(photo.id, e.target.value)}
                    className="font-dancing text-lg text-[#49313D] w-full text-center border-b border-[#F4A6B8] focus:outline-none"
                    placeholder="Add a sweet caption..."
                  />
                ) : (
                  <p className="font-dancing text-xl text-[#49313D] tracking-wide leading-snug">
                    {photo.caption || 'A beautiful memory ♡'}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
            onClick={handleClose}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Top Bar with counter & close */}
            <div
              className="absolute top-4 inset-x-4 max-w-5xl mx-auto flex items-center justify-between text-white z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium">
                <Heart className="w-3.5 h-3.5 fill-[#F4A6B8] text-[#F4A6B8]" />
                <span>
                  Memory {selectedIdx + 1} of {photos.length}
                </span>
              </div>

              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close photo preview"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Previous Photo Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 sm:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer z-20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Active Photograph Container */}
            <div
              className="relative max-w-3xl max-h-[75vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={photos[selectedIdx].url}
                alt={photos[selectedIdx].caption}
                className="max-h-[68vh] max-w-full rounded-2xl object-contain shadow-2xl border-4 border-white/20"
              />

              {/* Caption Underneath */}
              <div className="mt-4 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md text-center max-w-lg">
                <p className="font-dancing text-2xl text-[#FFE4EC]">
                  {photos[selectedIdx].caption}
                </p>
                <p className="text-[11px] text-white/60 mt-0.5">
                  Swipe or use arrows to view more memories
                </p>
              </div>
            </div>

            {/* Next Photo Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer z-20"
              aria-label="Next photo"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
