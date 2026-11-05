import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause, Disc } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

export const FloatingMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(romanticAudio.getIsPlaying());
  const [isMuted, setIsMuted] = useState(romanticAudio.getIsMuted());
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = () => {
    romanticAudio.togglePlay();
    setIsPlaying(romanticAudio.getIsPlaying());
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = romanticAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <aside aria-label="Music controls" className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {/* Audio equalizing bars indicator when playing */}
      {isPlaying && !isMuted && (
        <div className="hidden sm:flex items-end gap-1 h-5 px-2 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#F4A6B8]/40 shadow-xs" aria-hidden="true">
          <span className="w-1 bg-[#C65B7C] rounded-full animate-bounce h-3" style={{ animationDuration: '0.8s' }} />
          <span className="w-1 bg-[#F4A6B8] rounded-full animate-bounce h-4" style={{ animationDuration: '0.5s' }} />
          <span className="w-1 bg-[#C65B7C] rounded-full animate-bounce h-2" style={{ animationDuration: '0.7s' }} />
          <span className="w-1 bg-[#E8C7A0] rounded-full animate-bounce h-3.5" style={{ animationDuration: '0.6s' }} />
        </div>
      )}

      {/* Floating control capsule */}
      <div className="relative">
        <div
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#F4A6B8]/50 shadow-romantic text-[#49313D] cursor-pointer hover:bg-white transition-all duration-300 ${
            isPlaying ? 'ring-2 ring-[#F4A6B8]/60 shadow-glow' : ''
          }`}
        >
          <div className="relative flex items-center justify-center">
            <Disc
              className={`w-5 h-5 text-[#C65B7C] ${
                isPlaying && !isMuted ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '4s' }}
            />
          </div>

          <span className="text-xs font-medium font-sans hidden xs:inline text-[#6d4d5e]">
            {isPlaying ? 'Music Playing' : 'Background Music'}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleTogglePlay();
            }}
            className="w-7 h-7 rounded-full bg-[#FFE4EC] hover:bg-[#FADADD] text-[#C65B7C] flex items-center justify-center transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause romantic background music' : 'Play romantic background music'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
          </button>

          <button
            onClick={handleToggleMute}
            className="w-7 h-7 rounded-full bg-transparent hover:bg-[#FFE4EC] text-[#8a687a] hover:text-[#C65B7C] flex items-center justify-center transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Small subtle tooltip on hover/expand */}
        {expanded && (
          <div className="absolute bottom-full right-0 mb-2 w-56 p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-romantic-lg border border-[#F4A6B8]/40 text-xs text-[#6d4d5e] z-50">
            <div className="flex items-center gap-1.5 font-semibold text-[#C65B7C] mb-1">
              <Music className="w-3.5 h-3.5" />
              <span>Romantic Music Box</span>
            </div>
            <p className="text-[11px] leading-tight">
              A gentle lullaby synthesized especially for Vaishnavi. Tap play anytime to immerse in the warmth.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
