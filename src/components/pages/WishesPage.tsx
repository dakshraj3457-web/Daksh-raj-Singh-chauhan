import React, { useState } from 'react';
import { Sparkles, Star, Heart } from 'lucide-react';
import { BirthdayWish } from '../../config/birthdayConfig';

interface WishesPageProps {
  wishes: BirthdayWish[];
  recipientName: string;
}

export const WishesPage: React.FC<WishesPageProps> = ({
  wishes,
  recipientName,
}) => {
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const toggleReveal = (id: number) => {
    if (revealedIds.includes(id)) {
      setRevealedIds(revealedIds.filter((x) => x !== id));
    } else {
      setRevealedIds([...revealedIds, id]);
    }
  };

  const handleRevealAll = () => {
    setRevealedIds(wishes.map((w) => w.id));
  };

  const tags = ['All', ...Array.from(new Set(wishes.map((w) => w.tag)))];

  const filteredWishes =
    selectedTag === 'All'
      ? wishes
      : wishes.filter((w) => w.tag === selectedTag);

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-16 sm:py-20 text-center">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-semibold mb-3">
          <Star className="w-3.5 h-3.5 text-[#E8C7A0]" />
          <span>20 Heartfelt Blessings</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#49313D] mb-3">
          A Collection of 20 Birthday Wishes
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-[#C65B7C]">
          Tap each star or card to unveil a dedicated birthday wish for you, {recipientName}
        </p>
      </div>

      {/* Filter and Reveal All Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTag(t)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedTag === t
                ? 'bg-[#C65B7C] text-white shadow-xs'
                : 'bg-white/80 text-[#6d4d5e] hover:bg-white border border-[#F4A6B8]/30'
            }`}
          >
            {t}
          </button>
        ))}
        <button
          onClick={handleRevealAll}
          className="ml-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F4A6B8] to-[#C65B7C] text-white text-xs font-bold shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
        >
          Reveal All 20 Wishes
        </button>
      </div>

      {/* 20 Wish Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 text-left">
        {filteredWishes.map((wish) => {
          const isRevealed = revealedIds.includes(wish.id);

          return (
            <div
              key={wish.id}
              onClick={() => toggleReveal(wish.id)}
              className="relative p-5 rounded-3xl bg-white/85 hover:bg-white border border-[#F4A6B8]/40 shadow-sm hover:shadow-romantic transition-all cursor-pointer flex flex-col justify-between min-h-[170px] group"
              style={{ backgroundColor: isRevealed ? wish.accentColor || '#FFF' : '#FFFDFB' }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFE4EC] text-[#C65B7C] flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                    <Star
                      className={`w-4 h-4 ${
                        isRevealed ? 'fill-[#E8C7A0] text-[#E8C7A0]' : 'text-[#C65B7C]'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C65B7C] bg-white/60 px-2 py-0.5 rounded-full border border-[#F4A6B8]/30">
                    {wish.tag}
                  </span>
                </div>

                <h3 className="font-playfair text-base font-bold text-[#49313D] mb-1">
                  Wish #{wish.id}: {wish.title}
                </h3>

                <p className="font-sans text-xs text-[#6d4d5e] leading-relaxed mt-2">
                  {wish.message}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[#F4A6B8]/20 flex items-center justify-between text-[11px] text-[#C65B7C]">
                <span className="font-dancing text-sm">Made with love</span>
                <Heart className="w-3.5 h-3.5 fill-[#C65B7C]" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
