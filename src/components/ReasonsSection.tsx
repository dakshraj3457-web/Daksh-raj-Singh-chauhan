import React from 'react';
import {
  Sparkles,
  Heart,
  Star,
  Smile,
  Sun,
  Flower2,
  Flame,
  Music,
  BookOpen,
  Feather,
  HeartHandshake,
  ShieldCheck,
  Eye,
  PartyPopper,
  Crown,
} from 'lucide-react';
import { SpecialReason } from '../config/birthdayConfig';

interface ReasonsSectionProps {
  reasons: SpecialReason[];
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Heart,
  Star,
  Smile,
  Sun,
  Flower: Flower2,
  Flame,
  Music,
  BookOpen,
  Feather,
  HeartHandshake,
  ShieldCheck,
  Eye,
  PartyPopper,
  Crown,
};

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({ reasons }) => {
  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-16 sm:py-20 text-center">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#E8C7A0]" />
          <span>15 Reasons</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#49313D] mb-3">
          15 Reasons Why You Are So Special
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-[#C65B7C]">
          Just a glimpse into the countless things that make you irreplaceable
        </p>
      </div>

      {/* 15 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 text-left">
        {reasons.map((reason) => {
          const IconComp = ICON_MAP[reason.iconName] || Heart;

          return (
            <div
              key={reason.id}
              className="glass-romantic rounded-3xl p-6 sm:p-7 shadow-romantic border border-[#F4A6B8]/30 flex flex-col justify-between hover:border-[#F4A6B8] transition-all group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FFE4EC] to-[#FADADD] text-[#C65B7C] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <span className="font-playfair text-2xl font-bold text-[#F4A6B8]/50 group-hover:text-[#C65B7C]/50 transition-colors">
                    {reason.id < 10 ? `0${reason.id}` : reason.id}
                  </span>
                </div>

                <h3 className="font-playfair text-xl font-bold text-[#49313D] mb-2 leading-snug">
                  {reason.title}
                </h3>

                <p className="font-sans text-sm text-[#6d4d5e] leading-relaxed">
                  {reason.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F4A6B8]/20 flex items-center justify-between text-xs text-[#C65B7C] font-medium opacity-80 group-hover:opacity-100">
                <span className="font-dancing text-sm">Deeply appreciated</span>
                <Heart className="w-3.5 h-3.5 fill-[#C65B7C]" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
