/**
 * Timer Engine for 25 + 5 Clock
 * Manages core timing logic, transitions, and state changes.
 */

class TimerEngine {
  constructor(options = {}) {
    this.sessionLength = 25;
    this.breakLength = 5;
    this.currentMode = 'Session'; // 'Session' | 'Break'
    this.timeLeft = 25 * 60;
    this.isRunning = false;
    this.intervalId = null;

    this.onTick = options.onTick || null;
    this.onBeep = options.onBeep || null;
    this.onReset = options.onReset || null;
    this.onModeChange = options.onModeChange || null;
  }

  formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const padMin = mins < 10 ? '0' + mins : String(mins);
    const padSec = secs < 10 ? '0' + secs : String(secs);
    return `${padMin}:${padSec}`;
  }

  getState() {
    const totalDuration = (this.currentMode === 'Session' ? this.sessionLength : this.breakLength) * 60;
    const progress = totalDuration > 0 ? (totalDuration - this.timeLeft) / totalDuration : 0;
    return {
      sessionLength: this.sessionLength,
      breakLength: this.breakLength,
      currentMode: this.currentMode,
      timeLeft: this.timeLeft,
      formattedTime: this.formatTime(this.timeLeft),
      isRunning: this.isRunning,
      progress: Math.min(1, Math.max(0, progress))
    };
  }

  decrementBreak() {
    if (this.isRunning || this.breakLength <= 1) return false;
    this.breakLength--;
    if (this.currentMode === 'Break') {
      this.timeLeft = this.breakLength * 60;
    }
    return true;
  }

  incrementBreak() {
    if (this.isRunning || this.breakLength >= 60) return false;
    this.breakLength++;
    if (this.currentMode === 'Break') {
      this.timeLeft = this.breakLength * 60;
    }
    return true;
  }

  decrementSession() {
    if (this.isRunning || this.sessionLength <= 1) return false;
    this.sessionLength--;
    if (this.currentMode === 'Session') {
      this.timeLeft = this.sessionLength * 60;
    }
    return true;
  }

  incrementSession() {
    if (this.isRunning || this.sessionLength >= 60) return false;
    this.sessionLength++;
    if (this.currentMode === 'Session') {
      this.timeLeft = this.sessionLength * 60;
    }
    return true;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  pause() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  togglePlay() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
    return this.isRunning;
  }

  tick() {
    if (this.timeLeft > 0) {
      this.timeLeft--;
      if (this.onTick) this.onTick(this.getState());
      if (this.timeLeft === 0 && this.onBeep) {
        this.onBeep();
      }
    } else {
      // Countdown was at 00:00, switch phase
      if (this.currentMode === 'Session') {
        this.currentMode = 'Break';
        this.timeLeft = this.breakLength * 60;
      } else {
        this.currentMode = 'Session';
        this.timeLeft = this.sessionLength * 60;
      }
      if (this.onModeChange) this.onModeChange(this.currentMode);
      if (this.onTick) this.onTick(this.getState());
    }
  }

  reset() {
    this.pause();
    this.sessionLength = 25;
    this.breakLength = 5;
    this.currentMode = 'Session';
    this.timeLeft = 25 * 60;
    if (this.onReset) this.onReset(this.getState());
  }
}

window.TimerEngine = TimerEngine;
