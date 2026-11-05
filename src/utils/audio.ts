/**
 * Romantic Ambient Audio Engine
 * Supports:
 * 1. Web Audio API synthesized romantic music box melody (no external files or copyright issues)
 * 2. User-uploaded audio file (MP3/WAV/AAC) with HTML5 Audio element fallback
 */

class RomanticAudioManager {
  private audioCtx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private volume = 0.6;
  private loopTimer: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private useCustomAudio = false;
  private listeners: Set<(playing: boolean) => void> = new Set();

  constructor() {
    // Lazy initialize on first interaction
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public setCustomAudio(url: string | null) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }

    if (url) {
      this.customAudio = new Audio(url);
      this.customAudio.loop = true;
      this.customAudio.volume = this.isMuted ? 0 : this.volume;
      this.useCustomAudio = true;
      if (this.isPlaying) {
        this.stopSynthesizer();
        this.customAudio.play().catch(() => {});
      }
    } else {
      this.useCustomAudio = false;
      if (this.isPlaying) {
        this.startSynthesizer();
      }
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public play() {
    this.isPlaying = true;
    if (this.useCustomAudio && this.customAudio) {
      this.customAudio.volume = this.isMuted ? 0 : this.volume;
      this.customAudio.play().catch(() => {
        // Fallback to synthesizer if audio element fails
        this.startSynthesizer();
      });
    } else {
      this.startSynthesizer();
    }
    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.stopSynthesizer();
    this.notify();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.customAudio) {
      this.customAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // --- Romantic Web Audio Music Box Melody Synthesizer ---
  private startSynthesizer() {
    this.stopSynthesizer();
    const ctx = this.getAudioContext();

    // Romantic music box notes (Pentatonic gentle lullaby in E Major / C# minor)
    // Notes in Hz:
    const NOTES: Record<string, number> = {
      E4: 329.63,
      Fs4: 369.99,
      Gs4: 415.3,
      A4: 440.0,
      B4: 493.88,
      Cs5: 554.37,
      Ds5: 622.25,
      E5: 659.25,
      Fs5: 739.99,
      Gs5: 830.61,
      B5: 987.77,
    };

    const MELODY: Array<{ note: keyof typeof NOTES; dur: number; delay: number }> = [
      // Phrase 1: Dreamy opening
      { note: 'E4', dur: 1.2, delay: 0 },
      { note: 'B4', dur: 1.0, delay: 0.6 },
      { note: 'Cs5', dur: 1.5, delay: 1.2 },
      { note: 'Gs4', dur: 1.2, delay: 2.0 },
      { note: 'A4', dur: 1.4, delay: 2.8 },
      { note: 'Fs4', dur: 1.2, delay: 3.6 },
      { note: 'E4', dur: 2.0, delay: 4.4 },

      // Phrase 2: Sparkle & heart lift
      { note: 'Gs4', dur: 1.0, delay: 5.6 },
      { note: 'B4', dur: 1.0, delay: 6.2 },
      { note: 'E5', dur: 1.8, delay: 6.8 },
      { note: 'Ds5', dur: 1.2, delay: 7.8 },
      { note: 'Cs5', dur: 1.6, delay: 8.6 },
      { note: 'B4', dur: 1.8, delay: 9.6 },
      { note: 'Gs4', dur: 2.2, delay: 10.6 },

      // Phrase 3: Tender resolution
      { note: 'A4', dur: 1.2, delay: 12.0 },
      { note: 'Cs5', dur: 1.2, delay: 12.8 },
      { note: 'B4', dur: 1.6, delay: 13.6 },
      { note: 'Gs4', dur: 1.4, delay: 14.6 },
      { note: 'Fs4', dur: 1.4, delay: 15.4 },
      { note: 'E4', dur: 2.8, delay: 16.4 },
    ];

    const LOOP_DURATION = 19.5; // seconds

    const playPhrase = () => {
      if (!this.isPlaying || this.useCustomAudio) return;
      const startTime = ctx.currentTime + 0.05;

      MELODY.forEach(({ note, dur, delay }) => {
        const freq = NOTES[note];
        if (!freq) return;
        this.playMusicBoxNote(ctx, freq, startTime + delay, dur);
      });

      this.loopTimer = window.setTimeout(() => {
        playPhrase();
      }, LOOP_DURATION * 1000);
    };

    playPhrase();
  }

  private playMusicBoxNote(ctx: AudioContext, freq: number, startTime: number, duration: number) {
    if (this.isMuted) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Gentle celesta/music box timbre (sine blended with subtle triangle)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Warm slight vibrato
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.002, startTime + duration * 0.5);

      const targetGain = this.isMuted ? 0 : this.volume * 0.22;

      // Soft music-box attack and natural acoustic exponential decay
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(targetGain, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    } catch {
      // Audio node cleanup safeguard
    }
  }

  private stopSynthesizer() {
    if (this.loopTimer !== null) {
      window.clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }
}

export const romanticAudio = new RomanticAudioManager();
