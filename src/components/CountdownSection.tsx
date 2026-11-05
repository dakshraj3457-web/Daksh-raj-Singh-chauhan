import React, { useEffect, useState } from 'react';
import { Sparkles, Clock, PartyPopper, Heart } from 'lucide-react';
import { calculateTimeRemaining, padZero, CountdownTime } from '../utils/countdown';
import { motion } from 'motion/react';

interface CountdownSectionProps {
  targetDateISO: string;
  recipientName: string;
  timezoneLabel: string;
  onCelebrationTrigger?: () => void;
  forceBirthdayMode?: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  targetDateISO,
  recipientName,
  timezoneLabel,
  onCelebrationTrigger,
  forceBirthdayMode = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    calculateTimeRemaining(targetDateISO)
  );
  const [hasCelebrated, setHasCelebrated] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const remaining = calculateTimeRemaining(targetDateISO);
      setTimeLeft(remaining);

      if (remaining.isReached && !hasCelebrated) {
        setHasCelebrated(true);
        if (onCelebrationTrigger) {
          onCelebrationTrigger();
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDateISO, hasCelebrated, onCelebrationTrigger]);

  const isCelebration = forceBirthdayMode || timeLeft.isReached;

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="glass-romantic rounded-3xl p-6 sm:p-10 shadow-romantic border border-[#F4A6B8]/30 relative overflow-hidden text-center">
        {/* Soft background radial shine */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-[#F4A6B8]/20 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

        {isCelebration ? (
          /* Midnight Birthday Celebration Reveal */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE4EC] text-[#C65B7C] border border-[#F4A6B8]/40 text-xs sm:text-sm font-medium mb-4 shadow-sm animate-pulse-gentle">
              <PartyPopper className="w-4 h-4 text-[#C65B7C]" />
              <span>Midnight Has Arrived!</span>
            </div>

            <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#C65B7C] tracking-tight mb-3">
              IT'S YOUR DAY, {recipientName.toUpperCase()}!
            </h2>

            <p className="font-dancing text-2xl sm:text-4xl text-[#49313D] mb-4">
              Happy Birthday, Princess! ♡
            </p>

            <p className="font-sans text-sm sm:text-base text-[#6d4d5e] max-w-lg mb-6">
              The wait is finally over! Today, the universe smiles a little brighter because
              it&apos;s all about celebrating the wonderful, irreplaceable person you are.
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 text-[#C65B7C] font-semibold text-xs tracking-wider uppercase border border-[#F4A6B8]/40 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#E8C7A0]" />
              <span>Celebrating Live with Love</span>
              <Heart className="w-4 h-4 fill-[#C65B7C] text-[#C65B7C]" />
            </div>
          </motion.div>
        ) : (
          /* Live Countdown Mode */
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE4EC] text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-medium mb-3">
              <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Counting Down to Midnight</span>
            </div>

            <h2 className="font-playfair text-2xl sm:text-4xl font-semibold text-[#49313D] mb-2">
              Something beautiful is about to begin...
            </h2>

            <p className="font-dancing text-lg sm:text-xl text-[#C65B7C] mb-8">
              Every second brings us closer to your special day
            </p>

            {/* Countdown Digits Grid */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-6 w-full max-w-lg mb-6">
              {[
                { label: 'Days', value: padZero(timeLeft.days) },
                { label: 'Hours', value: padZero(timeLeft.hours) },
                { label: 'Minutes', value: padZero(timeLeft.minutes) },
                { label: 'Seconds', value: padZero(timeLeft.seconds) },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center p-3 sm:p-5 rounded-2xl bg-white/80 border border-[#F4A6B8]/30 shadow-sm hover:border-[#F4A6B8] transition-colors"
                >
                  <span className="font-playfair text-2xl sm:text-4xl font-bold text-[#C65B7C] tracking-tight">
                    {item.value}
                  </span>
                  <span className="font-sans text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#8a687a] mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-xs text-[#8a687a] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E8C7A0]" />
              <span>Target: November 6, 2026, 12:00 AM ({timezoneLabel})</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
