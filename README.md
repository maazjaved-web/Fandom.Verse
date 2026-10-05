<p align="center">
  <img src="image/logo.jpg" alt="FandomVerse Logo" width="160px">
</p>

# ✦ FANDOMVERSE — Advanced Multiverse Portal

An interactive, high-performance web platform built for enthusiasts of **Anime**, **Gaming**, **Movies**, **TV Shows**, **K-Pop**, **Comics**, and **Manga**.

---

## 🚀 Key Features & Upgrades

### 1. 🌌 3D Interactive Hyperspace Starfield
- Real-time 3D canvas starfield with mouse parallax tilt.
- **⚡ Hyperspace Warp Mode**: Accelerates stars into blazing light trails with procedural audio and camera feedback.

### 2. 🔊 Procedural Web Audio Synthesizer (`sound.js`)
- Zero external MP3/WAV dependencies! Uses procedural Web Audio API oscillators and gain envelopes.
- Generates UI blips, modal whooshes, success chimes, error tones, and hyperspace warp sweeps.
- Persistent Sound FX toggle in the top navigation (`🔊` / `🔇`).

### 3. 🔍 Spotlight Command Palette (`Ctrl + K`)
- Press `Ctrl + K` (or `Cmd + K`) anywhere to summon the power-user Spotlight search.
- Instant search across universes, characters, lore articles, collectible merch, and events.
- Arrow keys and `Enter` keyboard navigation.

### 4. 🏛️ Core Multiverse Sectors & Deep-Dive Modal
- 7 distinct universes:
  - 🌸 **Anime**: Jujutsu Kaisen, One Piece, Demon Slayer, Cursed Energy lore.
  - 🎮 **Gaming**: Elden Ring, Cyberpunk 2077, God of War, Soulsborne mechanics.
  - 🎬 **Movies**: Dune Messiah, Marvel MCU, Nolan Cinema.
  - 📺 **TV Shows**: Arcane, Stranger Things, House of the Dragon.
  - 🎤 **K-Pop**: BTS, BLACKPINK, NewJeans, Y2K aesthetic analysis.
  - 💥 **Comics**: Batman, Miles Morales, Invincible, Multiverse continuity.
  - 📖 **Manga**: Berserk, Chainsaw Man, Solo Leveling, panel mastery.
- Dedicated **Universe Hub Modal** with character cards, role descriptions, iconic quotes, and lore compendiums.

### 5. 📖 Spotlight Reader & Video Trailer Lightbox
- High-res hero imagery, formatted article body with pull-quotes and lore breakdowns.
- Embedded responsive YouTube trailer player.
- Live community comments with instant submission.
- Real-time interactive Like counter and Bookmark action.

### 6. 🎮 Interactive Fan Arena
- **✦ Universe Sorting Hat Quiz**:
  - 5 philosophical questions to calculate your fandom archetype (*Neo-Tokyo Sorcerer*, *Night City Netrunner*, *Multiverse Cinephile*, etc.).
  - Radar affinity calculation, animated result badge, and shareable result card.
- **⚡ Daily Fandom Lore Trivia**:
  - Live multiple-choice trivia challenge with immediate sound/color feedback, streak tracking, and lore explanation.

### 7. 🎟️ Global Fan Events & Holographic Pass Generator
- Upcoming conventions, esports tournaments, and virtual lore summits.
- **Cyber Holographic Event Pass**:
  - Generates attendee pass with custom handle, pass ID, and barcode visual.
  - One-click **Add to Calendar (`.ics` file export)**.
  - **Print / Save Pass** with clean print stylesheet.

### 8. 🛍️ Collectible Merchandise & Interactive Cart Drawer
- Heavyweight streetwear, floating magnetic desk lamps, and deluxe artbooks.
- Quick View modal with product specs and verified reviews.
- Slide-out Cart Drawer with quantity adjusters (`+` / `-`), item removal, and subtotal calculation.
- **Promo Code Engine**:
  - `VERSE20`: 20% discount on subtotal.
  - `SUPERFAN`: 30% discount on subtotal.
  - `FREESHIP`: Waives shipping costs.
- **Multi-Step Checkout Simulator**: Shipping coordinates, payment method, and holographic digital order confirmation.

### 9. ♡ Bookmarks & Watchlist Manager
- Save any lore article, product, or event to your personal drawer.
- Add private fan notes to each saved item.
- Persisted in `localStorage`.

### 10. 💬 Live Fan Community Feed
- Real-time discussion posts with upvotes.
- "Transmit to the Verse" interactive posting form.

### 11. 🤖 Fandom AI 2.0 Assistant
- Persona switcher:
  - 🔮 **Verse Oracle**: Deep canonical knowledge.
  - ⚡ **Satoru Gojo**: Charismatic Jujutsu Kaisen mentor.
  - 🎮 **Netrunner V**: Night City & Soulsborne specialist.
  - 🎬 **Director Cine**: Cinematic critique & visual storytelling.
- Web Speech API integration (voice synthesis reading responses aloud).
- Quick prompt chips and markdown rendering.

### 12. 🎨 Dark & Light Cyber Themes
- Fully styled dark space theme (`☾`) and crisp cyber light theme (`☼`), saved in `localStorage`.

---

## 💻 How to Run

No build tools or installation needed! Simply open `index.html` in any modern web browser:

1. Double-click `index.html` to open directly in Google Chrome, Microsoft Edge, Firefox, or Safari.
2. Or open the project folder in VS Code and click **Go Live** with the Live Server extension.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + K` or `Cmd + K` | Open Spotlight Search / Command Palette |
| `Escape` | Close all active modals, drawers, or command palette |

---

## 📂 Architecture

- `index.html` — Accessible, semantic HTML5 structure with modals, drawers, and canvas.
- `styles.css` — Modern responsive design system with CSS custom properties, glassmorphism, and print styles.
- `data.js` — Comprehensive database for universes, articles, products, events, trivia, and quiz.
- `sound.js` — Procedural Web Audio API sound synthesizer with zero external assets.
- `script.js` — Application controller coordinating state, starfield canvas, cart, bookmarks, and AI.
