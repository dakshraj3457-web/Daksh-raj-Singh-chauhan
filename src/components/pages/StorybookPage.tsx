import React, { useState } from 'react';
import { BookOpen, Sparkles, Heart, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { GalleryPhoto } from '../../config/birthdayConfig';

interface StorybookPageProps {
  recipientName: string;
  intro: {
    title: string;
    subtitle: string;
    chapter1: string;
    chapter2: string;
  };
  scrapbookPhotos?: GalleryPhoto[];
}

export const StorybookPage: React.FC<StorybookPageProps> = ({
  intro,
  scrapbookPhotos = [
    {
      id: 'photo-9',
      url: '/images/photo9.jpg',
      caption: 'Quiet moments that speak louder than words.',
      rotation: -2.5,
    },
    {
      id: 'photo-10',
      url: '/images/photo10.jpg',
      caption: 'Every glance, a little spark of joy.',
      rotation: 2,
    },
    {
      id: 'photo-11',
      url: '/images/photo11.jpg',
      caption: 'Captured smiles and timeless warmth.',
      rotation: -1.5,
    },
  ],
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
      <div className="max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Our Little World</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#49313D] mb-3">
          {intro.title}
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-[#C65B7C]">
          {intro.subtitle}
        </p>
      </div>

      {/* Storybook open parchment spread */}
      <div className="relative bg-[#FFFDFB] rounded-3xl p-6 sm:p-12 shadow-romantic-lg border-2 border-[#F4A6B8]/40 text-left max-w-4xl mx-auto overflow-hidden">
        {/* Soft background grid texture */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#FADADD 0.75px, transparent 0.75px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top Header with Book Ribbon */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#F4A6B8]/30 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="font-dancing text-xl text-[#C65B7C]">Page 05</span>
            <span className="text-gray-300">•</span>
            <span className="font-sans text-xs uppercase tracking-widest text-[#8a687a]">
              The Story of Us
            </span>
          </div>
          <Heart className="w-4 h-4 fill-[#C65B7C] text-[#C65B7C]" />
        </div>

        {/* Narrative Chapters */}
        <div className="relative z-10 space-y-6 text-[#49313D] font-sans text-base sm:text-lg leading-relaxed mb-10">
          <p className="first-letter:font-playfair first-letter:text-5xl first-letter:font-bold first-letter:text-[#C65B7C] first-letter:float-left first-letter:mr-3 first-letter:pr-1">
            {intro.chapter1}
          </p>
          <p>{intro.chapter2}</p>
        </div>

        {/* Scrapbook Visual Section — Photos 9, 10, 11 */}
        <div className="relative z-10 my-8 pt-6 border-t border-[#F4A6B8]/20">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Camera className="w-4 h-4 text-[#C65B7C]" />
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#49313D]">
              Scrapbook Snapshots
            </h3>
            <Sparkles className="w-4 h-4 text-[#E8C7A0]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6">
            {scrapbookPhotos.map((photo, idx) => {
              const rotationAngle = photo.rotation ?? (idx === 0 ? -2.5 : idx === 1 ? 2 : -1.5);

              return (
                <motion.div
                  key={photo.id}
                  whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
                  transition={{ duration: 0.3 }}
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                  onClick={() => setSelectedPhoto(photo.url)}
                  className="group relative bg-white p-3 pb-5 rounded-2xl shadow-romantic hover:shadow-romantic-lg border border-[#F4A6B8]/30 cursor-pointer transition-all duration-300"
                >
                  {/* Washi tape sticker */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-[#FFE4EC]/95 border-t border-b border-[#F4A6B8]/40 rounded-xs shadow-xs rotate-1 pointer-events-none" />

                  {/* Photo container */}
                  <div className="w-full aspect-[4/5] bg-[#FFF0F5] rounded-xl overflow-hidden mb-2.5 relative">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Handwritten caption */}
                  <p className="font-dancing text-lg text-center text-[#49313D] group-hover:text-[#C65B7C] transition-colors leading-snug">
                    {photo.caption}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Romantic quote box */}
        <div className="relative z-10 mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#FFE4EC] via-[#FFF0F5] to-[#FFE4EC] border border-[#F4A6B8]/50 text-center">
          <Sparkles className="w-4 h-4 text-[#E8C7A0] mx-auto mb-2" />
          <p className="font-dancing text-2xl text-[#C65B7C]">
            &ldquo;In all the universe, there is only one Vaishnavi.&rdquo;
          </p>
          <span className="font-playfair text-xs uppercase tracking-widest text-[#49313D] mt-2 block font-bold">
            DAKSH LOVES YOU THE MOST
          </span>
        </div>
      </div>

      {/* Lightbox Preview if clicked */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative max-w-lg w-full bg-white p-4 rounded-3xl shadow-2xl">
            <img
              src={selectedPhoto}
              alt="Scrapbook preview"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
            <p className="font-dancing text-center text-xl text-[#C65B7C] mt-3">
              Cherished Moment ♡
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
