import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { LittleThing } from '../../config/birthdayConfig';

interface LittleThingsPageProps {
  items: LittleThing[];
  recipientName: string;
}

export const LittleThingsPage: React.FC<LittleThingsPageProps> = ({
  items,
  recipientName,
}) => {
  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
      {/* Header */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#E8C7A0]" />
          <span>Little Delights</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#49313D] mb-3">
          Little Things I Love About You
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-[#C65B7C]">
          The subtle nuances, the cute habits, and the quiet comfort you bring
        </p>
      </div>

      {/* Cards list */}
      <div className="space-y-4 max-w-2xl mx-auto text-left">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white/80 hover:bg-white backdrop-blur-md border border-[#F4A6B8]/40 shadow-romantic hover:shadow-romantic-lg transition-all flex items-start gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FFE4EC] to-[#FADADD] text-2xl flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform flex-shrink-0">
              {item.emoji}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-playfair text-lg sm:text-xl font-bold text-[#49313D]">
                  {item.title}
                </h3>
                <span className="text-xs font-dancing text-[#C65B7C]">#{item.id}</span>
              </div>
              <p className="font-sans text-sm text-[#6d4d5e] leading-relaxed">
                {item.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Ending romantic note */}
      <div className="mt-12 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFE4EC] to-[#FFF0F5] border border-[#F4A6B8]/40 shadow-sm text-xs text-[#C65B7C] font-semibold">
        <Heart className="w-4 h-4 fill-[#C65B7C]" />
        <span>You are loved for simply being {recipientName}</span>
      </div>
    </section>
  );
};
