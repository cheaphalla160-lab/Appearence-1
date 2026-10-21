// Native Speech Synthesis for Primary School English Pronunciation
export interface SpeechSettings {
  rate: number; // 0.75 (slow for young learners) or 1.0 (normal)
  accent: 'en-US' | 'en-GB';
}

class SpeechEngine {
  private settings: SpeechSettings = {
    rate: 0.85,
    accent: 'en-US',
  };

  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.voices = window.speechSynthesis.getVoices();
    }
  }

  public setRate(rate: number) {
    this.settings.rate = Math.max(0.5, Math.min(1.5, rate));
  }

  public getRate(): number {
    return this.settings.rate;
  }

  public setAccent(accent: 'en-US' | 'en-GB') {
    this.settings.accent = accent;
  }

  public getAccent(): 'en-US' | 'en-GB' {
    return this.settings.accent;
  }

  public speak(text: string, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    window.speechSynthesis.cancel(); // cancel any active speech

    // Clean text of parenthetical notes if speaking e.g. "short (pencil)" -> "short pencil"
    const cleanText = text.replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = this.settings.rate;
    utterance.pitch = 1.08; // slightly friendlier, warmer pitch for children
    utterance.lang = this.settings.accent;

    if (this.voices.length === 0) {
      this.loadVoices();
    }

    // Try finding matching voice
    const targetLang = this.settings.accent;
    const match = this.voices.find(
      (v) => v.lang.replace('_', '-').toLowerCase().startsWith(targetLang.toLowerCase()) && !v.name.includes('Google') // standard local voice
    ) || this.voices.find(
      (v) => v.lang.replace('_', '-').toLowerCase().startsWith(targetLang.toLowerCase())
    ) || this.voices.find(
      (v) => v.lang.startsWith('en')
    );

    if (match) {
      utterance.voice = match;
    }

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    window.speechSynthesis.speak(utterance);
  }
}

export const speechEngine = new SpeechEngine();
