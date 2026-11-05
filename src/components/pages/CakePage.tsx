import React, { useState } from 'react';
import { Sparkles, Wind, RotateCcw, PartyPopper } from 'lucide-react';

interface CakePageProps {
  recipientName: string;
  onTriggerBurst?: () => void;
  celebrationPhotoUrl?: string;
}

export const CakePage: React.FC<CakePageProps> = ({
  recipientName,
  onTriggerBurst,
  celebrationPhotoUrl = '/images/photo14.jpg',
}) => {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [wishMade, setWishMade] = useState(false);
  const [imgError, setImgError] = useState(false);

  const allBlownOut = candlesLit.every((lit) => !lit);

  const handleBlowCandle = (index: number) => {
    if (!candlesLit[index]) return;
    const next = [...candlesLit];
    next[index] = false;
    setCandlesLit(next);

    if (next.every((l) => !l)) {
      setWishMade(true);
      onTriggerBurst?.();
    }
  };

  const handleBlowAll = () => {
    setCandlesLit([false, false, false, false, false]);
    setWishMade(true);
    onTriggerBurst?.();
  };

  const handleRelight = () => {
    setCandlesLit([true, true, true, true, true]);
    setWishMade(false);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-semibold mb-3">
          <PartyPopper className="w-3.5 h-3.5" />
          <span>Interactive Birthday Celebration</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#49313D] mb-3">
          Blow Out Your Birthday Candles
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-[#C65B7C]">
          Close your eyes, make your most heartfelt wish, and tap the flames!
        </p>
      </div>

      {/* Celebratory Birthday Portrait — Photo 14 */}
      <div className="relative mb-8 flex flex-col items-center">
        <div className="relative group">
          {/* Glowing ambient light */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#F4A6B8] via-[#FFE4EC] to-[#E8C7A0] opacity-60 blur-md group-hover:opacity-80 transition duration-500" />
          
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-2 bg-white shadow-romantic-lg border-2 border-[#F4A6B8]/60 overflow-hidden flex items-center justify-center">
            {imgError ? (
              <div className="w-full h-full rounded-2xl bg-[#FFE4EC] flex flex-col items-center justify-center p-3 text-center">
                <Sparkles className="w-8 h-8 text-[#C65B7C] mb-1" />
                <span className="font-playfair text-xs font-semibold text-[#49313D]">
                  Birthday Star {recipientName}
                </span>
              </div>
            ) : (
              <img
                src={celebrationPhotoUrl}
                alt={`Birthday Celebration — ${recipientName}`}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
            )}
          </div>

          {/* Birthday Tiara / Crown Badge */}
          <div className="absolute -top-3 -right-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#E8C7A0] to-[#d69f68] text-white text-[11px] font-bold shadow-md border border-white flex items-center gap-1">
            <span>✨</span>
            <span>Birthday Girl</span>
          </div>
        </div>

        <p className="font-dancing text-xl text-[#C65B7C] mt-3">
          The shining star of today ♡
        </p>
      </div>

      {/* Main Cake Container */}
      <div className="relative max-w-md mx-auto p-8 rounded-3xl glass-romantic shadow-romantic-lg border-2 border-[#F4A6B8]/40 flex flex-col items-center">
        {/* Wish notification banner */}
        {allBlownOut ? (
          <div className="w-full mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#FFE4EC] via-white to-[#FFE4EC] border border-[#F4A6B8] animate-bounce shadow-sm">
            <div className="flex items-center justify-center gap-2 text-[#C65B7C] font-semibold text-sm mb-1">
              <Sparkles className="w-4 h-4 text-[#E8C7A0]" />
              <span>A WISH HAS BEEN SENT TO THE UNIVERSE!</span>
              <Sparkles className="w-4 h-4 text-[#E8C7A0]" />
            </div>
            <p className="font-dancing text-xl text-[#49313D]">
              May every single wish you made today turn into reality, {recipientName}! ♡
            </p>
          </div>
        ) : (
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-[#6d4d5e] bg-white/60 px-4 py-1.5 rounded-full border border-[#F4A6B8]/30">
            <Wind className="w-3.5 h-3.5 text-[#C65B7C]" />
            <span>Tap each candle flame to blow it out</span>
          </div>
        )}

        {/* The Illustrated Birthday Cake */}
        <div className="relative w-72 h-64 flex flex-col items-center justify-end my-4 select-none">
          {/* Candles Row */}
          <div className="flex items-end justify-center gap-5 mb-1 z-20">
            {candlesLit.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => handleBlowCandle(idx)}
                className="flex flex-col items-center cursor-pointer group"
                title={isLit ? "Click to blow out candle" : "Candle blown out"}
              >
                {/* Flame or smoke */}
                <div className="h-8 flex items-center justify-center">
                  {isLit ? (
                    <div className="relative flex items-center justify-center">
                      {/* Glow halo */}
                      <div className="absolute w-6 h-6 rounded-full bg-amber-300/40 blur-xs animate-pulse" />
                      {/* Animated flame */}
                      <div
                        className="w-3.5 h-5 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-amber-100 shadow-sm animate-pulse"
                        style={{
                          borderRadius: '50% 50% 35% 35% / 80% 80% 30% 30%',
                          transformOrigin: 'bottom center',
                        }}
                      />
                    </div>
                  ) : (
                    /* Smoke wisps */
                    <div className="text-[10px] text-gray-400 font-sans opacity-70 animate-bounce">
                      ☁
                    </div>
                  )}
                </div>

                {/* Candle stick */}
                <div
                  className="w-2.5 h-10 rounded-t-sm shadow-xs border-x border-[#F4A6B8]"
                  style={{
                    background:
                      idx % 2 === 0
                        ? 'repeating-linear-gradient(45deg, #FFE4EC, #FFE4EC 3px, #C65B7C 3px, #C65B7C 6px)'
                        : 'repeating-linear-gradient(45deg, #FFF0F5, #FFF0F5 3px, #F4A6B8 3px, #F4A6B8 6px)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Cake Tier 1 (Top) */}
          <div className="relative w-44 h-14 bg-gradient-to-b from-[#FFF5F7] to-[#FFE4EC] rounded-t-2xl border-2 border-[#F4A6B8]/50 shadow-sm flex items-center justify-center z-10">
            {/* Frosting dripping scallops */}
            <div className="absolute -bottom-1.5 inset-x-2 flex justify-between">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-4 h-3 bg-white rounded-b-full shadow-xs" />
              ))}
            </div>
            <span className="font-dancing text-lg font-bold text-[#C65B7C]">Vaishnavi</span>
          </div>

          {/* Cake Tier 2 (Middle) */}
          <div className="relative w-56 h-16 bg-gradient-to-b from-[#FFE4EC] to-[#FADADD] rounded-t-2xl border-2 border-[#F4A6B8]/60 shadow-sm flex items-center justify-center">
            {/* Strawberries / decorations */}
            <div className="flex gap-4">
              <span className="text-sm">🍓</span>
              <span className="text-sm">✨</span>
              <span className="text-sm">🍓</span>
              <span className="text-sm">✨</span>
              <span className="text-sm">🍓</span>
            </div>
          </div>

          {/* Cake Tier 3 (Base) */}
          <div className="relative w-68 h-18 bg-gradient-to-b from-[#FADADD] to-[#F4A6B8]/70 rounded-t-3xl border-2 border-[#F4A6B8] shadow-md flex items-center justify-center">
            <span className="font-playfair text-xs tracking-widest uppercase text-white font-bold">
              Sweet & Special
            </span>
          </div>

          {/* Golden Platter Plate */}
          <div className="w-80 h-4 bg-gradient-to-r from-[#E8C7A0] via-white to-[#E8C7A0] rounded-full shadow-lg border border-amber-300" />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {!allBlownOut ? (
            <button
              onClick={handleBlowAll}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C65B7C] hover:bg-[#a83c5d] text-white font-semibold text-xs tracking-wider uppercase shadow-romantic transition-all cursor-pointer"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Blow All Candles At Once</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#F4A6B8] text-[#C65B7C] font-semibold text-xs tracking-wider uppercase shadow-sm hover:bg-[#FFE4EC] transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Relight Candles</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
