import React, { useState } from 'react';
import { Gift, Sparkles, Smile, Heart, Ear, Crown, X } from 'lucide-react';
import { VirtualGift } from '../../config/birthdayConfig';

interface VirtualGiftsPageProps {
  gifts: VirtualGift[];
  recipientName: string;
  onTriggerBurst?: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Smile,
  Heart,
  Ear,
  Gift,
  Crown,
};

export const VirtualGiftsPage: React.FC<VirtualGiftsPageProps> = ({
  gifts,
  recipientName,
  onTriggerBurst,
}) => {
  const [openedIds, setOpenedIds] = useState<number[]>([]);
  const [activeGiftModal, setActiveGiftModal] = useState<VirtualGift | null>(null);

  const handleOpenGift = (gift: VirtualGift) => {
    if (!openedIds.includes(gift.id)) {
      setOpenedIds([...openedIds, gift.id]);
    }
    setActiveGiftModal(gift);
    onTriggerBurst?.();
  };

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
      {/* Header */}
      <div className="max-w-xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-semibold mb-3">
          <Gift className="w-3.5 h-3.5" />
          <span>Interactive Unboxing</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#49313D] mb-3">
          5 Virtual Birthday Gift Boxes
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-[#C65B7C]">
          Tap any ribbon to unwrap a special token made with love for {recipientName}
        </p>
      </div>

      {/* 5 Gift Boxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {gifts.map((gift) => {
          const isOpened = openedIds.includes(gift.id);

          return (
            <div
              key={gift.id}
              onClick={() => handleOpenGift(gift)}
              className="relative p-6 rounded-3xl bg-white/80 hover:bg-white backdrop-blur-md border border-[#F4A6B8]/40 shadow-romantic hover:shadow-romantic-lg transition-all flex flex-col items-center cursor-pointer group hover:-translate-y-1.5 select-none"
            >
              {/* Badge */}
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C65B7C] mb-4">
                {gift.boxTitle}
              </span>

              {/* 3D-styled Gift Box Graphic */}
              <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                {/* Box base */}
                <div
                  className="w-20 h-18 rounded-2xl shadow-sm border-2 border-white flex items-center justify-center relative overflow-hidden"
                  style={{
                    backgroundColor: isOpened ? '#FFE4EC' : '#FADADD',
                  }}
                >
                  {/* Vertical Ribbon */}
                  <div
                    className="absolute inset-y-0 w-3.5"
                    style={{ backgroundColor: gift.ribbonColor }}
                  />
                  {/* Horizontal Ribbon */}
                  <div
                    className="absolute inset-x-0 h-3.5"
                    style={{ backgroundColor: gift.ribbonColor }}
                  />

                  {/* Icon peek if opened */}
                  {isOpened && (
                    <Sparkles className="w-6 h-6 text-[#C65B7C] z-10 animate-pulse" />
                  )}
                </div>

                {/* Bow top */}
                <div
                  className="absolute -top-1 w-8 h-4 rounded-full border border-white/60 shadow-xs z-10 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: gift.ribbonColor }}
                />
              </div>

              {/* Status & prompt */}
              <span className="font-playfair text-sm font-bold text-[#49313D] mb-1">
                {isOpened ? gift.surpriseTitle : 'Tap to Unwrap'}
              </span>

              <span className="text-[11px] text-[#C65B7C] font-dancing">
                {isOpened ? 'Opened ♡' : 'Special Surprise Inside'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Modal Dialog revealing opened gift */}
      {activeGiftModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center relative shadow-2xl border-2 border-[#F4A6B8]/50 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveGiftModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-[#49313D] flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close gift preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFE4EC] to-[#FADADD] text-[#C65B7C] flex items-center justify-center mx-auto mb-4 shadow-sm">
              {React.createElement(ICON_MAP[activeGiftModal.iconName] || Gift, {
                className: 'w-8 h-8',
              })}
            </div>

            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C65B7C] mb-1 block">
              {activeGiftModal.boxTitle} Unwrapped
            </span>

            <h3 className="font-playfair text-2xl font-bold text-[#49313D] mb-3">
              {activeGiftModal.surpriseTitle}
            </h3>

            <p className="font-sans text-sm text-[#6d4d5e] leading-relaxed mb-6">
              {activeGiftModal.surpriseMessage}
            </p>

            <button
              onClick={() => setActiveGiftModal(null)}
              className="px-7 py-2.5 rounded-full bg-[#C65B7C] hover:bg-[#a83c5d] text-white text-xs font-bold uppercase tracking-wider shadow-romantic cursor-pointer transition-all"
            >
              Cherish This Gift ♡
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
