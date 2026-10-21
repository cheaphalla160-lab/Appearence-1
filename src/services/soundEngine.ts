// Web Audio API Synthesizer for cheerful background music and game sound effects
class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isBgmPlaying = false;
  private bgmTimer: number | null = null;
  private bgmStep = 0;
  private isMuted = false;
  private bgmVolume = 0.25;
  private sfxVolume = 0.55;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.isMuted ? 0 : this.bgmVolume, this.ctx.currentTime);
      this.bgmGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : this.sfxVolume, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Pleasant cheerful melody sequence in C major / pentatonic for kids classroom
  private readonly melodyNotes = [
    523.25, // C5
    659.25, // E5
    783.99, // G5
    880.00, // A5
    1046.50,// C6
    880.00, // A5
    783.99, // G5
    659.25, // E5

    587.33, // D5
    659.25, // E5
    783.99, // G5
    880.00, // A5
    783.99, // G5
    659.25, // E5
    587.33, // D5
    523.25, // C5

    698.46, // F5
    880.00, // A5
    1046.50,// C6
    880.00, // A5
    783.99, // G5
    659.25, // E5
    523.25, // C5
    587.33, // D5

    659.25, // E5
    783.99, // G5
    880.00, // A5
    1046.50,// C6
    987.77, // B5
    783.99, // G5
    587.33, // D5
    523.25  // C5
  ];

  private readonly bassNotes = [
    261.63, // C4
    261.63,
    220.00, // A3
    220.00,
    174.61, // F3
    174.61,
    196.00, // G3
    196.00
  ];

  public startBGM() {
    this.initCtx();
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;
    this.scheduleNextBgmNote();
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      window.clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  public toggleBGM(): boolean {
    if (this.isBgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  public isPlayingBGM(): boolean {
    return this.isBgmPlaying;
  }

  public setBgmVolume(val: number) {
    this.bgmVolume = Math.max(0, Math.min(1, val));
    if (this.bgmGain && this.ctx && !this.isMuted) {
      this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
    }
  }

  public getBgmVolume(): number {
    return this.bgmVolume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.isMuted ? 0 : this.bgmVolume, this.ctx.currentTime);
    }
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : this.sfxVolume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private scheduleNextBgmNote() {
    if (!this.isBgmPlaying || !this.ctx || !this.bgmGain) return;

    const noteFreq = this.melodyNotes[this.bgmStep % this.melodyNotes.length];
    const bassIndex = Math.floor((this.bgmStep / 4) % this.bassNotes.length);
    const bassFreq = this.bassNotes[bassIndex];

    const now = this.ctx.currentTime;

    // Melody bell note (soft sine with warmth)
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(noteFreq, now);

    // Warm envelope
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

    osc.connect(noteGain);
    noteGain.connect(this.bgmGain);

    osc.start(now);
    osc.stop(now + 0.4);

    // Occasional gentle woodblock / marimba bass pulse on quarter beats
    if (this.bgmStep % 2 === 0) {
      const bassOsc = this.ctx.createOscillator();
      const bassGainNode = this.ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(bassFreq, now);

      bassGainNode.gain.setValueAtTime(0.001, now);
      bassGainNode.gain.exponentialRampToValueAtTime(0.05, now + 0.05);
      bassGainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      bassOsc.connect(bassGainNode);
      bassGainNode.connect(this.bgmGain);

      bassOsc.start(now);
      bassOsc.stop(now + 0.5);
    }

    this.bgmStep++;

    // 250ms per 8th note => 120 bpm, cheerful and relaxing for children
    this.bgmTimer = window.setTimeout(() => {
      this.scheduleNextBgmNote();
    }, 250);
  }

  // --- Sound Effects ---

  public playCorrect() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const startTime = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, startTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.2, startTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.08 + 0.28);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(startTime + idx * 0.08);
      osc.stop(startTime + idx * 0.08 + 0.3);
    });
  }

  public playWrong() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const notes = [311.13, 277.18]; // Eb4 -> Db4 soft gentle warning
    const startTime = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.14);

      // Low pass filter to soften
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, startTime + idx * 0.14);

      gain.gain.setValueAtTime(0.001, startTime + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.12, startTime + idx * 0.14 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.14 + 0.22);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(startTime + idx * 0.14);
      osc.stop(startTime + idx * 0.14 + 0.25);
    });
  }

  public playBuzzer(isTeamRed = true) {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isTeamRed ? 660 : 880, now);
    osc.frequency.exponentialRampToValueAtTime(isTeamRed ? 880 : 1100, now + 0.12);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  public playFlip() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.exponentialRampToValueAtTime(0.1, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  public playStar() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const notes = [784, 988, 1175, 1568]; // G5, B5, D6, G6
    const startTime = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.06);

      gain.gain.setValueAtTime(0.001, startTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.18, startTime + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.06 + 0.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(startTime + idx * 0.06);
      osc.stop(startTime + idx * 0.06 + 0.22);
    });
  }

  public playClick() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  public playVictory() {
    this.initCtx();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const notes = [
      { f: 523.25, d: 0.15 }, // C5
      { f: 659.25, d: 0.15 }, // E5
      { f: 783.99, d: 0.15 }, // G5
      { f: 1046.50, d: 0.4 }, // C6
      { f: 880.00, d: 0.15 }, // A5
      { f: 1046.50, d: 0.6 }  // C6 long
    ];

    let t = this.ctx.currentTime;
    notes.forEach((item) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.24, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + item.d);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + item.d + 0.05);

      t += item.d;
    });
  }
}

export const soundEngine = new SoundEngine();
