import React from 'react';
import { HeartHandshake, CheckCircle2, Shield, Heart } from 'lucide-react';
import { PromiseItem } from '../config/birthdayConfig';

interface PromisesSectionProps {
  promises: PromiseItem[];
}

export const PromisesSection: React.FC<PromisesSectionProps> = ({ promises }) => {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-semibold mb-3">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>12 Meaningful Promises</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#49313D] mb-3">
          My Promises to You
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-[#C65B7C]">
          Anchored in respect, trust, gentle care, and unwavering appreciation
        </p>
      </div>

      {/* 12 Promises Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
        {promises.map((promise) => (
          <div
            key={promise.id}
            className="glass-romantic-pink rounded-3xl p-6 shadow-sm border border-[#F4A6B8]/40 flex flex-col justify-between hover:bg-white/95 transition-all group hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C65B7C] bg-white/80 px-2.5 py-1 rounded-full border border-[#F4A6B8]/30">
                  {promise.category}
                </span>
                <span className="font-playfair text-xs font-bold text-[#8a687a]">
                  #{promise.id}
                </span>
              </div>

              <p className="font-playfair text-base sm:text-lg font-bold text-[#49313D] leading-snug mb-2">
                {promise.text}
              </p>

              <p className="font-sans text-xs text-[#6d4d5e] leading-relaxed">
                {promise.detail}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F4A6B8]/20 flex items-center justify-between text-[11px] text-[#C65B7C]">
              <span className="font-dancing text-sm">Always & Truly</span>
              <CheckCircle2 className="w-4 h-4 text-[#C65B7C]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
