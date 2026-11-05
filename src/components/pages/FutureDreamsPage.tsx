import React from 'react';
import { Compass, Coffee, Sparkles, Trophy, BookMarked, Heart } from 'lucide-react';
import { FutureDream } from '../../config/birthdayConfig';

interface FutureDreamsPageProps {
  dreams: FutureDream[];
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass,
  Coffee,
  Sparkles,
  Trophy,
  BookMarked,
  Heart,
};

export const FutureDreamsPage: React.FC<FutureDreamsPageProps> = ({ dreams }) => {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>A Vision Board</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#49313D] mb-3">
          Our Future Dreams & Adventures
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-[#C65B7C]">
          Hopes, road trips, laughter, and milestones waiting for us down the road
        </p>
      </div>

      {/* Dreams grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {dreams.map((dream) => {
          const Icon = ICON_MAP[dream.iconName] || Heart;

          return (
            <div
              key={dream.id}
              className="p-7 rounded-3xl bg-white/80 hover:bg-white backdrop-blur-md border border-[#F4A6B8]/40 shadow-romantic hover:shadow-romantic-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FFE4EC] to-[#FADADD] text-[#C65B7C] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>

                <h3 className="font-playfair text-xl font-bold text-[#49313D] mb-2">
                  {dream.title}
                </h3>

                <p className="font-sans text-sm text-[#6d4d5e] leading-relaxed">
                  {dream.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#F4A6B8]/20 flex items-center justify-between text-xs text-[#C65B7C]">
                <span className="font-dancing text-base">To many more memories</span>
                <Heart className="w-4 h-4 fill-[#C65B7C]" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
