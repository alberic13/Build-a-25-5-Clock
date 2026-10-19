/**
 * Main Application Orchestrator for 25 + 5 Clock
 * Connects UI elements, handles user interactions, updates visual progress ring.
 */

document.addEventListener('DOMContentLoaded', () => {
  const sound = new SoundController('beep');
  const timer = new TimerEngine({
    onTick: (state) => render(state),
    onBeep: () => sound.play(),
    onReset: (state) => {
      sound.stop();
      render(state);
    },
    onModeChange: (mode) => updateTheme(mode)
  });

  // DOM Elements - FCC Required IDs
  const breakLengthEl = document.getElementById('break-length');
  const sessionLengthEl = document.getElementById('session-length');
  const timerLabelEl = document.getElementById('timer-label');
  const timeLeftEl = document.getElementById('time-left');
  const startStopBtn = document.getElementById('start_stop');
  const resetBtn = document.getElementById('reset');
  const breakDecBtn = document.getElementById('break-decrement');
  const breakIncBtn = document.getElementById('break-increment');
  const sessionDecBtn = document.getElementById('session-decrement');
  const sessionIncBtn = document.getElementById('session-increment');

  // Decorative & Enhancing UI Elements
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const progressRing = document.getElementById('progress-ring-circle');
  const timerCard = document.getElementById('clock-card');
  const testBeepBtn = document.getElementById('test-beep');

  const RING_RADIUS = 135;
  const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

  if (progressRing) {
    progressRing.style.strokeDasharray = `${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`;
    progressRing.style.strokeDashoffset = '0';
  }

  function render(state = timer.getState()) {
    breakLengthEl.textContent = state.sessionLength !== undefined ? state.breakLength : timer.breakLength;
    sessionLengthEl.textContent = state.sessionLength !== undefined ? state.sessionLength : timer.sessionLength;
    timerLabelEl.textContent = state.currentMode || timer.currentMode;
    timeLeftEl.textContent = state.formattedTime || timer.formatTime(timer.timeLeft);

    // Update play/pause button visual
    if (playIcon && pauseIcon) {
      if (state.isRunning) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        startStopBtn.setAttribute('aria-label', 'Pause Timer');
      } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        startStopBtn.setAttribute('aria-label', 'Start Timer');
      }
    }

    // Update Circular Progress
    if (progressRing) {
      const offset = RING_CIRCUMFERENCE - (state.progress * RING_CIRCUMFERENCE);
      progressRing.style.strokeDashoffset = offset;
    }

    updateTheme(state.currentMode);
  }

  function updateTheme(mode) {
    if (!timerCard) return;
    if (mode === 'Break') {
      timerCard.classList.add('mode-break');
      timerCard.classList.remove('mode-session');
    } else {
      timerCard.classList.add('mode-session');
      timerCard.classList.remove('mode-break');
    }
  }

  // Event Handlers for Length Controls
  breakDecBtn.addEventListener('click', () => {
    if (timer.decrementBreak()) render();
  });

  breakIncBtn.addEventListener('click', () => {
    if (timer.incrementBreak()) render();
  });

  sessionDecBtn.addEventListener('click', () => {
    if (timer.decrementSession()) render();
  });

  sessionIncBtn.addEventListener('click', () => {
    if (timer.incrementSession()) render();
  });

  // Start / Pause
  startStopBtn.addEventListener('click', () => {
    timer.togglePlay();
    render();
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    timer.reset();
  });

  // Manual Test Beep
  if (testBeepBtn) {
    testBeepBtn.addEventListener('click', () => sound.play());
  }

  // Quick Presets
  document.querySelectorAll('.preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (timer.isRunning) return;
      const s = parseInt(btn.dataset.session, 10);
      const b = parseInt(btn.dataset.break, 10);
      if (s && b) {
        timer.sessionLength = s;
        timer.breakLength = b;
        timer.timeLeft = s * 60;
        timer.currentMode = 'Session';
        render();
      }
    });
  });

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.code === 'Space') {
      e.preventDefault();
      timer.togglePlay();
      render();
    } else if (e.key === 'r' || e.key === 'R') {
      timer.reset();
    }
  });

  // Initial Render
  render();
});
