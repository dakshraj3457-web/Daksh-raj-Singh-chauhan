import React, { useState } from 'react';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';

interface FinalScreenProps {
  recipientName: string;
  creatorName: string;
  photoUrl: string;
  finalGreeting: string;
  finalMessage: string;
  finalBigStatement: string;
  finalFootnote: string;
  onReplay: () => void;
  onOpenCreatorPanel?: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({
  recipientName,
  photoUrl,
  finalGreeting,
  finalMessage,
  finalBigStatement,
  finalFootnote,
  onReplay,
  onOpenCreatorPanel,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <footer className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-transparent via-[#FFE4EC]/50 to-[#FADADD]/80 overflow-hidden">
      {/* Decorative ambient blurred glowing orbs */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#F4A6B8]/30 via-[#FFE4EC]/40 to-[#E8C7A0]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl w-full flex flex-col items-center z-10 animate-in fade-in duration-700">
        {/* Heart Seal */}
        <div className="w-16 h-16 rounded-full bg-white shadow-romantic flex items-center justify-center text-[#C65B7C] mb-8 border border-[#F4A6B8]/40 animate-pulse-gentle">
          <Heart className="w-8 h-8 fill-[#C65B7C]" />
        </div>

        {/* Featured Photo in final frame */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl p-2.5 bg-white shadow-romantic-lg border-2 border-[#F4A6B8]/50 rotate-1 mb-8 overflow-hidden">
          {imgError ? (
            <div className="w-full h-full rounded-2xl bg-[#FFE4EC] flex flex-col items-center justify-center p-3 text-center">
              <Sparkles className="w-8 h-8 text-[#C65B7C] mb-1" />
              <span className="font-playfair text-xs font-semibold text-[#49313D]">
                {recipientName}
              </span>
            </div>
          ) : (
            <img
              src={photoUrl}
              alt={recipientName}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy"
            />
          )}
        </div>

        {/* Big Final Greeting */}
        <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#49313D] tracking-tight mb-2">
          {finalGreeting}
        </h2>

        <p className="font-dancing text-2xl sm:text-3xl text-[#C65B7C] mb-4">
          Thank you for being you.
        </p>

        {/* Sweet Blessing */}
        <p className="font-sans text-base sm:text-xl text-[#6d4d5e] max-w-lg mb-4 leading-relaxed">
          {finalMessage}
        </p>

        <p className="font-dancing text-xl sm:text-2xl text-[#8a687a] mb-8">
          Always keep smiling, keep shining, and keep chasing your dreams.
        </p>

        {/* Emotional Signature Statement */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border-2 border-[#C65B7C]/40 shadow-glow max-w-xl w-full mb-8">
          <p className="font-dancing text-2xl text-[#8a687a] mb-2">
            Always & forever in every heartbeat
          </p>
          <h3 className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#C65B7C] tracking-wide leading-tight">
            {finalBigStatement}
          </h3>
        </div>

        <div className="space-y-2 mb-8">
          <p className="font-playfair text-sm sm:text-base tracking-widest uppercase font-bold text-[#49313D]">
            THIS LITTLE WORLD WAS MADE JUST FOR YOU.
          </p>
          <p className="font-dancing text-2xl sm:text-3xl font-bold text-[#C65B7C]">
            HAPPIEST BIRTHDAY {recipientName.toUpperCase()}. ♡
          </p>
        </div>

        {/* Replay Button */}
        <button
          onClick={onReplay}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65B7C] hover:bg-[#a83c5d] text-white font-semibold text-sm sm:text-base shadow-romantic-lg hover:shadow-glow transition-all duration-300 cursor-pointer mb-12"
          aria-label="Replay our little story"
        >
          <RotateCcw className="w-4 h-4" />
          <span>REPLAY OUR LITTLE STORY</span>
        </button>

        {/* Footer Credit & Creator link */}
        <div className="pt-8 border-t border-[#F4A6B8]/30 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-[#8a687a] gap-3">
          <p className="font-sans font-medium">{finalFootnote}</p>
          <div className="flex items-center gap-3">
            <span className="font-dancing text-sm text-[#C65B7C]">With endless affection</span>
            {onOpenCreatorPanel && (
              <button
                onClick={onOpenCreatorPanel}
                className="opacity-40 hover:opacity-100 text-[10px] text-[#49313D] underline cursor-pointer transition-opacity"
                aria-label="Creator customization settings"
                title="Creator Studio"
              >
                ⚙ Creator Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
