# 🎸 Bkappi Tuner - High-Precision Online Chromatic Tuner

**Bkappi Tuner** is a modern, high-performance web application focused exclusively on the fast and intuitive tuning of stringed instruments, with optimized support for **Acoustic Guitar**, **Electric Guitar**, and **Bass**.

The project works **100% in the browser**, running entirely locally (offline) on the user's device, with no installation, registration, or transmission of audio data to external servers required.

<p align="center">
  <img src="https://cdn.bkappi.com/GithubReadmeAssets/Tuner/TunerDarkTheme.png" alt="Bkappi Tuner Dark Theme" width="49%" />
  <img src="https://cdn.bkappi.com/GithubReadmeAssets/Tuner/TunerLightTheme.png" alt="Bkappi Tuner Light Theme" width="49%" />
</p>

---

## ✨ Key Features

*   **100% Client-Side:** Captures the local microphone signal and performs digital audio processing entirely in the browser using the **Web Audio API**.
*   **Total Privacy:** Zero audio data is stored or uploaded to external servers.
*   **Advanced Chromatic Detection:** Accurately identifies any of the 12 musical notes of the chromatic scale and their corresponding octave (from C0 to B8).
*   **Stable Pointer (DSP Engineering):** Graduated analog pointer that glides with real physics-based damping, preventing abrupt oscillations.
*   **Statistical Mode Filtering:** Implements an algorithm that filters out unstable notes by analyzing the recent detection history, stabilizing the displayed note and octave.
*   **Input Level Indicator (RMS):** Visually classifies the detected sound intensity into "No signal", "Weak signal", and "Good signal".
*   **Reactive Instrument Selector:** Predefined profiles for Acoustic Guitar, Electric Guitar, and Bass, with a visual indicator showing which physical string is closest to the played note.
*   **Premium Minimalist Design:** Native dark mode with a Glassmorphism aesthetic, fluid micro-animations, smooth transitions at 60 FPS, and full internationalization support (i18n).

---

## 🛠️ Tech Stack

*   **Core:** React 19, TypeScript, Vite
*   **State Management:** Redux Toolkit (for structural settings) and React State (for 60 FPS stream processing)
*   **Styling:** Tailwind CSS v3 and PostCSS (using Inter and Outfit fonts)
*   **Pitch Detection Algorithm:** Pitchy (optimized pitch detection library using FFT)
*   **Internationalization:** i18next and react-i18next (full offline English and Brazilian Portuguese support)
*   **Iconography:** Lucide React

---

## 🧠 Technical Architecture & Signal Engineering

To solve the issue of excessive sensitivity and abrupt frequency fluctuations (common in string transients or secondary harmonics), the tuner utilizes three client-side digital processing mechanisms:

1.  **RMS (Root Mean Square) Amplitude Gate:**
    Calculates the actual energy of the captured audio buffer to block insignificant ambient noise from being analyzed.
2.  **Exponential Moving Average (EMA):**
    Applies a low-pass frequency filter with a coefficient of $\alpha = 0.08$ to smooth the virtual cents needle. If a frequency jump greater than $5\%$ is detected (indicating a real note change), the filter resets instantly to keep the tuner highly responsive.
3.  **Statistical Mode Filtering:**
    Keeps the last 9 note readings in a circular buffer and displays the **Mode** (the note with the highest occurrence count in history). This completely filters out transient spikes or unstable harmonics.

---

## 📂 Folder Structure

The application follows a modular architecture inspired by **Domain-Driven Design (DDD)**:

```txt
src/
├── core/
│   ├── store/
│   │   └── Store.ts               # Global Redux Store
│   └── i18n/
│       └── i18n.ts                # Offline i18next initialization
├── modules/
│   └── Tuner/
│       ├── components/
│       │   ├── Tuner.Card.tsx               # Central container and visualizer
│       │   ├── Tuner.Meter.tsx              # SVG graduated analog meter
│       │   ├── Tuner.InstrumentSelector.tsx # Instrument selector
│       │   ├── Tuner.StatusDisplay.tsx      # Note, octave, string, and frequencies
│       │   ├── Tuner.Controls.tsx           # Mute and reset controls
│       │   └── Tuner.QuickInstructions.tsx  # Quick user manual and guide
│       ├── hooks/
│       │   └── Tuner.Hook.ts                # Reactive custom hook for audio
│       ├── services/
│       │   └── Tuner.AudioProcessor.ts      # Web Audio API engine + Pitchy
│       ├── store/
│       │   └── Tuner.Slice.ts               # Redux state and preferences
│       ├── types/
│       │   └── Tuner.Types.ts               # Domain TypeScript interfaces
│       ├── constants/
│       │   └── Tuner.Constants.ts           # Tunings physical definitions and thresholds
│       └── translations/
│           ├── pt-BR.json                   # Portuguese translations
│           └── en.json                      # English translations
```

---

## 🚀 How to Run Locally

### Prerequisites
Make sure you have **Node.js** installed on your system (v18 or higher recommended).

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:BrunoKappi/Tuner.git
    cd Tuner
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    Access the local link (e.g., `http://localhost:5173`) displayed in the terminal.

4.  **To build the optimized production version:**
    ```bash
    npm run build
    ```
