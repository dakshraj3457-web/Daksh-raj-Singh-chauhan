import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, Disc, Sparkles } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';

interface MusicPageProps {
  recipientName: string;
}

export const MusicPage: React.FC<MusicPageProps> = ({ recipientName }) => {
  const [isPlaying, setIsPlaying] = useState(romanticAudio.getIsPlaying());
  const [isMuted, setIsMuted] = useState(romanticAudio.getIsMuted());

  useEffect(() => {
    const unsub = romanticAudio.subscribe((p) => setIsPlaying(p));
    return () => unsub();
  }, []);

  const handleTogglePlay = () => {
    romanticAudio.togglePlay();
    setIsPlaying(romanticAudio.getIsPlaying());
  };

  const handleToggleMute = () => {
    const m = romanticAudio.toggleMute();
    setIsMuted(m);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
      {/* Header */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-semibold mb-3">
          <Music className="w-3.5 h-3.5" />
          <span>Our Soundtrack</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#49313D] mb-3">
          The Music Corner
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-[#C65B7C]">
          A soft ambient melody playing in the background of our little story
        </p>
      </div>

      {/* Turntable Vinyl Player Card */}
      <div className="relative max-w-lg mx-auto p-8 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-[#F4A6B8]/40 shadow-romantic-lg flex flex-col items-center">
        {/* Spinning Vinyl Record */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 mb-6 flex items-center justify-center">
          {/* Vinyl grooves */}
          <div
            className={`w-full h-full rounded-full bg-gradient-to-tr from-gray-900 via-zinc-800 to-gray-950 shadow-2xl border-4 border-[#333] flex items-center justify-center ${
              isPlaying && !isMuted ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
          >
            {/* Vinyl record grooved rings */}
            <div className="w-4/5 h-4/5 rounded-full border border-gray-700/60 flex items-center justify-center">
              <div className="w-3/5 h-3/5 rounded-full border border-gray-700/60 flex items-center justify-center">
                {/* Center sticker */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FFE4EC] to-[#FADADD] border-2 border-white flex flex-col items-center justify-center p-2 text-center shadow-inner">
                  <Disc className="w-5 h-5 text-[#C65B7C] mb-0.5" />
                  <span className="font-dancing text-xs font-bold text-[#49313D] leading-tight">
                    For {recipientName}
                  </span>
                  <span className="text-[8px] uppercase tracking-wider text-[#C65B7C]">
                    33⅓ RPM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tone-Arm Needle */}
          <div
            className="absolute top-2 right-2 w-16 h-28 origin-top-right transition-transform duration-700 pointer-events-none"
            style={{
              transform: isPlaying ? 'rotate(20deg)' : 'rotate(-10deg)',
            }}
          >
            <div className="w-2 h-20 bg-gray-400 rounded-full shadow-md ml-auto mr-3 border border-gray-500" />
            <div className="w-4 h-5 bg-[#C65B7C] rounded-sm ml-auto mr-2 shadow-xs" />
          </div>
        </div>

        {/* Audio Equalizer visual wave bars */}
        <div className="flex items-center gap-1.5 h-6 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <span
              key={i}
              className={`w-1 bg-[#C65B7C] rounded-full transition-all duration-300 ${
                isPlaying && !isMuted ? 'animate-pulse' : 'h-1.5 opacity-30'
              }`}
              style={{
                height: isPlaying && !isMuted ? `${8 + ((i * 7) % 18)}px` : '4px',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Track Info */}
        <h3 className="font-playfair text-xl font-bold text-[#49313D] mb-1">
          Acoustic Romantic Music Box
        </h3>
        <p className="text-xs text-[#8a687a] font-sans mb-6">
          Composed in E-Major Pentatonic Harmony • Made with Love by Daksh
        </p>

        {/* Player Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleMute}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-[#49313D] flex items-center justify-center transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={handleTogglePlay}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-[#C65B7C] to-[#d36988] text-white flex items-center justify-center shadow-romantic-lg hover:scale-105 transition-all cursor-pointer"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-0.5" />
            )}
          </button>

          <div className="w-10 h-10 rounded-full bg-pink-50 text-[#C65B7C] flex items-center justify-center">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};
