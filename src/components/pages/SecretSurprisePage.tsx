import React, { useState } from 'react';
import { KeyRound, Sparkles, Heart, Eye } from 'lucide-react';

interface SecretSurprisePageProps {
  secretData: {
    prompt: string;
    hiddenTitle: string;
    hiddenMessage: string;
    closingNote: string;
  };
  onTriggerBurst?: () => void;
}

export const SecretSurprisePage: React.FC<SecretSurprisePageProps> = ({
  secretData,
  onTriggerBurst,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);

  const handleScratch = () => {
    if (isRevealed) return;
    const next = scratchProgress + 25;
    if (next >= 100) {
      setScratchProgress(100);
      setIsRevealed(true);
      onTriggerBurst?.();
    } else {
      setScratchProgress(next);
    }
  };

  const handleRevealDirect = () => {
    setScratchProgress(100);
    setIsRevealed(true);
    onTriggerBurst?.();
  };

  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
      {/* Header */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-semibold mb-3">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Hidden Chamber</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#49313D] mb-3">
          A Secret Surprise Note
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-[#C65B7C]">
          Something written just between the lines, waiting for your touch
        </p>
      </div>

      {/* The Scratch Card Container */}
      <div className="relative max-w-lg mx-auto p-6 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-[#F4A6B8]/50 shadow-romantic-lg overflow-hidden">
        {/* Underlying Hidden Message */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FFF0F5] to-[#FFE4EC] border border-[#F4A6B8]/40 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-white text-[#C65B7C] flex items-center justify-center mx-auto shadow-sm">
            <Heart className="w-6 h-6 fill-[#C65B7C]" />
          </div>

          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#49313D]">
            {secretData.hiddenTitle}
          </h3>

          {/* Surprise Keepsake Photos — Photos 12 & 13 */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 my-4">
            <div className="bg-white p-2 pb-3 rounded-2xl shadow-sm border border-[#F4A6B8]/40 rotate-[-2deg] transition-transform hover:rotate-0">
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#FFE4EC]">
                <img
                  src="/images/photo12.jpg"
                  alt="Surprise Photo 12"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="font-dancing text-xs sm:text-sm text-[#C65B7C] mt-1.5 text-center">
                Secret Treasure ♡
              </p>
            </div>

            <div className="bg-white p-2 pb-3 rounded-2xl shadow-sm border border-[#F4A6B8]/40 rotate-[2deg] transition-transform hover:rotate-0">
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#FFE4EC]">
                <img
                  src="/images/photo13.jpg"
                  alt="Surprise Photo 13"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="font-dancing text-xs sm:text-sm text-[#C65B7C] mt-1.5 text-center">
                Pure Happiness ♡
              </p>
            </div>
          </div>

          <p className="font-sans text-base text-[#49313D] leading-relaxed">
            &ldquo;{secretData.hiddenMessage}&rdquo;
          </p>

          <div className="pt-2 border-t border-[#F4A6B8]/30">
            <span className="font-dancing text-2xl text-[#C65B7C]">
              {secretData.closingNote}
            </span>
          </div>
        </div>

        {/* Scratch-off Overlay Mask */}
        {!isRevealed && (
          <div
            onClick={handleScratch}
            className="absolute inset-0 bg-gradient-to-br from-[#F4A6B8] via-[#e2849e] to-[#C65B7C] rounded-3xl flex flex-col items-center justify-center p-6 text-white text-center cursor-pointer select-none transition-opacity duration-300 shadow-inner group"
            style={{
              opacity: 1 - scratchProgress * 0.008,
            }}
          >
            <Sparkles className="w-10 h-10 mb-3 animate-bounce" />
            <span className="font-playfair text-xl font-bold tracking-wide mb-2">
              Scratch Card To Reveal
            </span>
            <p className="text-xs text-white/90 max-w-xs mb-4">
              {secretData.prompt}
            </p>

            {/* Progress bar */}
            <div className="w-48 h-2 bg-white/30 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${scratchProgress}%` }}
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRevealDirect();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Tap to Instant Reveal</span>
            </button>
          </div>
        )}
      </div>

      {isRevealed && (
        <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#C65B7C]">
          <Sparkles className="w-3.5 h-3.5 text-[#E8C7A0]" />
          <span>Secret Unlocked: DAKSH LOVES YOU THE MOST</span>
        </div>
      )}
    </section>
  );
};
