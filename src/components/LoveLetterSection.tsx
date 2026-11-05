import React, { useState } from 'react';
import { Mail, MailOpen, Heart, Sparkles, BookOpen } from 'lucide-react';

interface LoveLetterSectionProps {
  title: string;
  salutation: string;
  bodyText: string;
  signature: string;
  highlightText: string;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({
  title,
  salutation,
  bodyText,
  signature,
  highlightText,
}) => {
  const [isOpen, setIsOpen] = useState(true); // Default open for multi-page reading

  const paragraphs = bodyText.split('\n\n').filter(Boolean);

  return (
    <section id="love-letter-section" className="relative w-full max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
      {/* Header */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 fill-[#C65B7C]" />
          <span>From the Heart</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#49313D] mb-3">
          {title}
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-[#C65B7C]">
          An intimate, heartfelt letter written for you by Daksh
        </p>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Closed Envelope View */}
        {!isOpen ? (
          <div className="flex flex-col items-center w-full max-w-md animate-in fade-in zoom-in-95 duration-300">
            <div
              onClick={() => setIsOpen(true)}
              className="relative w-72 sm:w-84 h-52 bg-gradient-to-br from-[#FFE4EC] to-[#FADADD] rounded-3xl border-2 border-[#F4A6B8]/60 envelope-shadow flex items-center justify-center p-6 text-center cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#C65B7C] text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <span className="font-dancing text-3xl font-bold text-[#49313D]">
                  For Vaishnavi
                </span>
                <span className="text-xs text-[#8a687a] mt-1 font-sans">
                  Tap to unfold love letter
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C65B7C] hover:bg-[#a83c5d] text-white font-semibold text-xs tracking-wider uppercase shadow-romantic transition-all cursor-pointer"
            >
              <MailOpen className="w-4 h-4" />
              <span>OPEN MY LETTER</span>
            </button>
          </div>
        ) : (
          /* Unfolded Letter Parchment */
          <div
            className="w-full relative bg-[#FFFDFB] rounded-3xl p-6 sm:p-12 md:p-14 shadow-romantic-lg border-2 border-[#F4A6B8]/40 text-left overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-500"
            style={{
              backgroundImage: 'radial-gradient(#FADADD 0.75px, transparent 0.75px)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* Top Bar with Wax Seal mark & Close button */}
            <div className="flex items-center justify-between border-b border-[#F4A6B8]/30 pb-4 mb-8">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#FFE4EC] flex items-center justify-center text-[#C65B7C] shadow-2xs">
                  <Heart className="w-4 h-4 fill-[#C65B7C]" />
                </div>
                <div>
                  <span className="font-playfair text-sm font-semibold text-[#49313D] block">
                    A Letter from Daksh
                  </span>
                  <span className="text-[10px] text-[#8a687a] font-sans">
                    With endless appreciation & care
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-xs font-sans text-[#8a687a] flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Full Letter
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-[#8a687a] hover:text-[#C65B7C] font-semibold underline cursor-pointer"
                >
                  Fold back
                </button>
              </div>
            </div>

            {/* Salutation */}
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#49313D] mb-6">
              {salutation}
            </h3>

            {/* Paragraphs */}
            <div className="space-y-5 font-sans text-base sm:text-lg text-[#49313D] leading-relaxed">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>

            {/* Signature Block */}
            <div className="mt-10 pt-6 border-t border-[#F4A6B8]/30 flex flex-col items-end">
              <div className="font-dancing text-2xl sm:text-3xl text-[#C65B7C] whitespace-pre-line text-right">
                {signature}
              </div>
            </div>

            {/* Emotional Highlight Statement */}
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#FFE4EC] via-[#FFF0F5] to-[#FFE4EC] border-2 border-[#F4A6B8] text-center shadow-sm">
              <div className="flex items-center justify-center gap-1.5 text-[#C65B7C] mb-2">
                <Sparkles className="w-4 h-4 text-[#E8C7A0]" />
                <span className="text-xs uppercase tracking-widest font-bold">
                  Remember Always
                </span>
                <Sparkles className="w-4 h-4 text-[#E8C7A0]" />
              </div>
              <p className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#C65B7C] tracking-wide">
                {highlightText}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
