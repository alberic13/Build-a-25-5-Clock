# 25 + 5 Clock (Pomodoro Timer)

A modern, responsive, and accessible 25 + 5 Clock (Pomodoro Timer) built to fulfill all **FreeCodeCamp Front End Development Libraries** certification requirements.

## 🚀 Features

- **Strict FCC Test Compliance**: Passes all 26 FreeCodeCamp test suite user stories.
- **Glassmorphic Cyber-Slate Design**: High-contrast, sleek aesthetic with subtle neon glow for Session (`#10b981`) and Break (`#8b5cf6`) states.
- **Dynamic Circular Progress Ring**: Real-time SVG stroke dash animation matching countdown progress.
- **Dual-Layer Audio Engine**: Standard HTML5 `<audio id="beep">` coupled with a synthetic Web Audio API oscillator fallback.
- **Modular Architecture**: Zero-dependency, clean separation across `timerEngine.js`, `sound.js`, and `app.js`.
- **Productivity Extras**:
  - Quick presets: 25/5 (Standard), 50/10 (Focus), 15/3 (Sprint).
  - Keyboard shortcuts: `Space` (Start / Pause), `R` (Reset).

---

## 📋 FreeCodeCamp User Stories Covered

- [x] **User Story #1 & #2**: Elements with `id="break-label"` and `id="session-label"`.
- [x] **User Story #3 & #4**: Clickable decrement and increment elements (`break-decrement`, `session-decrement`, `break-increment`, `session-increment`).
- [x] **User Story #5 & #6**: Default values of 5 for `break-length` and 25 for `session-length`.
- [x] **User Story #7 & #8**: Element with `id="timer-label"` ("Session") and `id="time-left"` ("25:00" in `mm:ss` format).
- [x] **User Story #9 & #10**: Clickable elements with `id="start_stop"` and `id="reset"`.
- [x] **User Story #11 & #12**: Reset restores defaults (5, 25, Session, 25:00) and stops/rewinds audio `#beep`.
- [x] **User Story #13 - #16**: Increment/decrement controls modify respective lengths by 1.
- [x] **User Story #17 & #18**: Length boundaries enforced between `1` and `60` minutes.
- [x] **User Story #19 - #21**: Timer counts down second-by-second, pauses on `start_stop`, and resumes smoothly.
- [x] **User Story #22 & #23**: Switches between Session and Break modes upon reaching `00:00`.
- [x] **User Story #24 - #26**: Audio `#beep` plays at `00:00`, lasts >= 1s, and resets when `#reset` is clicked.

---

## 🛠️ Project Structure

```text
├── css/
│   └── style.css        # Responsive cyber-slate glassmorphism styling
├── js/
│   ├── app.js           # DOM binding, UI events, circular progress ring
│   ├── sound.js         # Audio manager and fallback oscillator
│   └── timerEngine.js   # State machine, countdown ticks, and phase transitions
├── index.html           # Semantic HTML with FreeCodeCamp IDs & test bundle
├── README.md            # Project documentation
└── .gitignore           # Ignored files
```

---

## 💻 How to Run Locally

1. Open `index.html` directly in any modern browser, or serve it via a local web server (e.g., Apache / XAMPP):
   ```text
   http://localhost/Build a 25 + 5 Clock/
   ```
2. Select **"25 + 5 Clock"** from the FreeCodeCamp test runner dropdown and click **"Run Tests"**.
