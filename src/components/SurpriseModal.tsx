import React, { useState } from 'react';
import { Gift, Heart, Sparkles, RotateCcw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SurpriseModalProps {
  recipientName: string;
  heading: string;
  subtitle: string;
  revealHeading: string;
  revealBody: string;
  finalMessage: string;
  onTriggerBurst: () => void;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({
  heading,
  subtitle,
  revealHeading,
  revealBody,
  finalMessage,
  onTriggerBurst,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<number>(0);

  const handleOpenSurprise = () => {
    setIsOpen(true);
    setStage(1);
    onTriggerBurst();

    // Stage 2 reveal after brief suspense
    setTimeout(() => {
      setStage(2);
      onTriggerBurst();
    }, 1800);
  };

  const handleReplay = () => {
    setStage(1);
    onTriggerBurst();
    setTimeout(() => {
      setStage(2);
      onTriggerBurst();
    }, 1800);
  };

  const handleClose = () => {
    setIsOpen(false);
    setStage(0);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
      <div className="glass-romantic-strong rounded-3xl p-8 sm:p-12 shadow-romantic-lg border-2 border-[#F4A6B8]/50 max-w-2xl mx-auto relative overflow-hidden">
        {/* Floating background decorative aura */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#F4A6B8]/30 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE4EC] text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-semibold uppercase tracking-wider mb-4">
          <Gift className="w-3.5 h-3.5" />
          <span>Interactive Surprise</span>
        </div>

        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#49313D] mb-3">
          {heading}
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#6d4d5e] mb-8 max-w-md mx-auto">
          {subtitle}
        </p>

        {/* Big Trigger Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenSurprise}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#C65B7C] via-[#e27394] to-[#C65B7C] text-white font-bold text-base sm:text-lg shadow-romantic-lg hover:shadow-glow transition-all duration-300 cursor-pointer"
          aria-label="Click for a surprise"
        >
          <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="tracking-wide">CLICK FOR A SURPRISE ♡</span>
          <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform duration-300" />
        </motion.button>
      </div>

      {/* Fullscreen Surprise Experience Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-[#FFF0F5]/95 via-[#FFE4EC]/95 to-[#FADADD]/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6"
          >
            {/* Close button in top-right */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-[#C65B7C] shadow-md flex items-center justify-center transition-colors cursor-pointer z-30"
              aria-label="Close surprise window"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-w-xl w-full text-center flex flex-col items-center z-20 py-8 px-6">
              {/* Pulse Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.7 }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#C65B7C] to-[#F4A6B8] flex items-center justify-center text-white shadow-glow mb-6"
              >
                <Heart className="w-10 h-10 fill-white text-white animate-pulse" />
              </motion.div>

              {/* Stage 1: Initial grand statement */}
              <motion.h3
                key={`h-${stage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#C65B7C] tracking-tight mb-6"
              >
                {revealHeading}
              </motion.h3>

              {/* Stage 2: Revelation message and final statement */}
              <AnimatePresence>
                {stage >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col items-center"
                  >
                    <p className="font-sans text-base sm:text-xl text-[#49313D] leading-relaxed mb-4 max-w-md">
                      {revealBody}
                    </p>

                    {/* Surprise Keepsake Photos — Photos 12 & 13 */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
                      <div className="w-28 sm:w-36 aspect-[4/5] rounded-2xl p-1.5 bg-white border border-[#F4A6B8]/50 shadow-md rotate-[-2deg]">
                        <img
                          src="/images/photo12.jpg"
                          alt="Surprise Photo 12"
                          className="w-full h-full object-cover rounded-xl"
                          loading="eager"
                        />
                      </div>
                      <div className="w-28 sm:w-36 aspect-[4/5] rounded-2xl p-1.5 bg-white border border-[#F4A6B8]/50 shadow-md rotate-[2deg]">
                        <img
                          src="/images/photo13.jpg"
                          alt="Surprise Photo 13"
                          className="w-full h-full object-cover rounded-xl"
                          loading="eager"
                        />
                      </div>
                    </div>

                    <div className="p-5 sm:p-7 rounded-2xl bg-white/90 border-2 border-[#F4A6B8] shadow-romantic-lg mb-8 max-w-lg w-full">
                      <div className="flex items-center justify-center gap-1.5 text-[#C65B7C] mb-2">
                        <Sparkles className="w-4 h-4 text-[#E8C7A0]" />
                        <span className="font-dancing text-xl">The simple truth</span>
                        <Sparkles className="w-4 h-4 text-[#E8C7A0]" />
                      </div>
                      <p className="font-playfair text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#C65B7C] tracking-wide">
                        {finalMessage}
                      </p>
                    </div>

                    {/* Action buttons inside surprise */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <button
                        onClick={handleReplay}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#C65B7C] font-semibold text-sm border border-[#F4A6B8] shadow-sm hover:bg-[#FFE4EC] transition-colors cursor-pointer"
                        aria-label="Replay surprise animation"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>REPLAY SURPRISE</span>
                      </button>

                      <button
                        onClick={handleClose}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#C65B7C] text-white font-semibold text-sm shadow-romantic hover:bg-[#a83c5d] transition-colors cursor-pointer"
                        aria-label="Back to story"
                      >
                        <span>CONTINUE STORY ♡</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
