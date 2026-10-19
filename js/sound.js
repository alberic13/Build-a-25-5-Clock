/**
 * Sound Manager for 25 + 5 Clock
 * Controls the HTML5 Audio #beep element and Web Audio fallback.
 */

class SoundController {
  constructor(audioElementId = 'beep') {
    this.audio = document.getElementById(audioElementId);
    this.audioCtx = null;
  }

  play() {
    if (this.audio) {
      this.audio.currentTime = 0;
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Fallback to Web Audio if HTML5 audio fails/autoplay blocked
          this.playSyntheticBeep();
        });
      }
    } else {
      this.playSyntheticBeep();
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  playSyntheticBeep() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioCtx) {
        this.audioCtx = new AudioCtx();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 1.2);
    } catch (e) {
      // AudioContext not allowed or unavailable
    }
  }
}

window.SoundController = SoundController;
