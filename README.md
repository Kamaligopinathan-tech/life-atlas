# LIFE ATLAS

> *"Every moment leaves a trace. Connect the traces. Discover the story."*

**WebRush Challenge Project: "Your Life, In Receipts"**  
A 100% frontend-only interactive digital museum, personal archive, and narrative explorer that transforms fragmented digital receipts into raw data, insights, connections, and stories.

---

## 🌟 Overview

Modern life generates an overwhelming volume of disconnected digital artifacts: songs played on loop at 2 AM, tram tickets, coffee receipts, grainy 35mm photos, encrypted voice notes, and half-formed search queries. Typically, apps display this data as generic SaaS dashboards, sterile KPI cards, or boring chronological lists.

**LIFE ATLAS** takes an entirely different approach:
```
RAW DATA  →  INSIGHTS  →  CONNECTIONS  →  STORY
```
It organizes 108 authentic fictional fragments from one person's life across six months (March 2024 to August 2024) into a cohesive, emotional journey. It allows users to ask:
- *"Why are these moments connected?"*
- *"What pattern is emerging?"*
- *"How did five seemingly unrelated receipts turn out to be one transformative evening?"*

---

## 🏛️ Key Features

### 1. Immersive Opening Constellation (Page 1)
- Abstract interactive network where scattered life receipts slowly float and drift.
- Visual nodes represent 9 distinct life categories (🎵 Music, 📍 Places, 📷 Photos, 🛍 Purchases, 💬 Messages, 🔎 Searches, 🎬 Movies, 📅 Events, 📝 Notes).
- Hovering any node pops up a live archival preview; cursor motion triggers gravitational lines between related moments.

### 2. Life Overview & Interactive "Life Pulse" (Page 2)
- Narrative-driven statistics (108 moments, 48 scored connections, 6 life chapters, 9 dimensions).
- **Life Pulse Visualization**: An interactive monthly activity density scrubber across March – August 2024.
- Clicking any period updates the surrounding context: dominant activity, notable moments, connected traces, and detected themes (e.g. *August 2024: "Your life became more social and communal"*).
- Circadian rhythm and category distribution charts powered by Recharts.

### 3. Multi-View Receipt Explorer (Page 3)
- Search across title, description, location, tags, category, and themes with live match highlighting.
- Multi-dimensional filters:
  - **Category**: All, Music, Movies, Places, Purchases, Photos, Messages, Searches, Events, Notes (with live counts).
  - **Time of Day**: Morning, Afternoon, Evening, Late Night.
  - **Mood / Theme**: Exploration, Connection, Creativity, Routine, Celebration, Change, Discovery.
  - **Location**: Home, City, Travel.
- 3 distinct view modes:
  1. **Editorial Grid**: Museum cards with category borders, timestamps, metadata chips, and connected trace peeks.
  2. **Stream View**: Chronological narrative flow with timeline spine and date markers.
  3. **Visual Map / Cluster View**: Spatial grouping clustering receipts by life theme.
- **Deep Receipt Detail Sheet**:
  - Full metadata anatomy.
  - Curated directly-connected moments with relationship scores.
  - **"Why This Moment Matters"** editorial insight.
  - CTA to jump straight into the Connection Map focusing on that receipt.

### 4. Connection Map & Connected Story (Page 4 — Core Experience)
- High-performance interactive SVG network graph.
- Selecting any node highlights all first-order and second-order connected nodes, dims unrelated moments, and pulses with category colors.
- Connection strength filter slider (20% – 65% minimum threshold).
- Pan and zoom controls with reset option.
- **"Connected Story" Side Panel**:
  - Displays the linear causality chain: e.g. 🎵 Song ↓ 📍 Place ↓ 📷 Photo ↓ 🛍 Purchase.
  - Explains: *"What looked like four unrelated receipts was actually one evening."*
  - Step-by-step sequential breakdown.

### 5. Discover Patterns — "What Keeps Repeating?" (Page 5)
- Automated behavioral pattern detection grounded in the dataset:
  - **Late-Night Creative Solitude**: 76% of notes logged between 23:00 and 03:00.
  - **Weekend Explorer**: 88% of trips beyond city bounds happen on Saturday and Sunday.
  - **New Places, New Memories**: 4.2x higher photo frequency at unfamiliar postal codes.
  - **Music Follows Movement**: 83% of transit events coupled with new track start within 15 minutes.
  - **Curiosity Precedes Tangible Commitment**: Search queries precede purchases by 48–72h.
  - **Social Momentum**: Message spikes reliably culminate in shared evening meals.
- Each pattern includes a mini distribution histogram and direct links to supporting receipts.

### 6. Life Chapters (Page 6)
- 6 curated narrative epochs based on life activity shifts:
  - **Chapter 01**: *The Quiet Nights* (March 2024)
  - **Chapter 02**: *The Spark & Search* (April 2024)
  - **Chapter 03**: *New Places & Coastal Traces* (May 2024)
  - **Chapter 04**: *The Social Convergence* (June 2024)
  - **Chapter 05**: *The Crunch & Creation* (July 2024)
  - **Chapter 06**: *The Week Everything Connected* (August 2024)
- Includes visual collage of representative receipts, narrative excerpts, and archival quotes.

### 7. The Story — Interactive Documentary Conclusion (Page 7)
- 6-act documentary culmination detailing Alex's journey from burnout to public opening.
- **The Interactive Reveal Payoff**:
  - *"At first: These moments look unrelated."* (5 isolated logs on an August night).
  - User clicks *"Look Closer"*.
  - An animated beam draws between the receipts, revealing:
    **"One Evening: August 16, 2024 (02:45 AM — 04:15 AM)"**
    Three friends at Miradouro da Graça celebrating their finished sound installation over warm pastéis de nata and M83's *Midnight City*.

### 8. Global Keyboard-Driven Search
- Press `/` anywhere in the app to instantly open the search command modal.
- Search across title, description, location, tags, artist, merchant, and themes.
- Escape key dismisses modals and detail sheets.

---

## 🧠 Client-Side Deterministic Connection Engine

In strict adherence to the frontend-only hackathon constraints, **LIFE ATLAS** does not use external AI APIs, databases, or servers. All connection scoring is deterministic and computed entirely in the browser:

$$\text{Connection Score} = \min\left(1.0, \Delta t + \Delta s + \Delta \text{tag} + \Delta \text{theme} + \Delta \text{affinity} + \Delta \text{curated}\right)$$

Where:
- **$\Delta t$ (Temporal Proximity):**
  - $\le 1$ hour: $+0.40$
  - $\le 4$ hours: $+0.30$
  - Same calendar date: $+0.22$
  - $\le 72$ hours: $+0.10$
- **$\Delta s$ (Spatial Proximity):**
  - Exact venue match: $+0.35$
  - Same neighborhood: $+0.22$
  - Same city: $+0.12$
- **$\Delta \text{tag}$ (Semantic Overlap):** $+0.08$ per shared tag (capped at $+0.28$).
- **$\Delta \text{theme}$ (Thematic Alignment):** $+0.18$ if matching mood/theme.
- **$\Delta \text{affinity}$ (Cross-Category Causal Affinities):** $+0.12$ for natural human sequences (*Search → Purchase*, *Place → Photo → Music*, *Event → Group Message*).
- **$\Delta \text{curated}$ (Direct Narrative Link):** $+0.45$ for explicit story threads.

The engine normalizes scores from 0.0 to 1.0 (Weak, Moderate, Strong, Profound) and generates human-readable explanations (e.g. *"Captured within 42 minutes of each other"*, *"Exact location match: Armazém 18B"*, *"Shared context: #acoustics, #maritime"*).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Client-Side Architecture)
- **UI Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom museum dark palette
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visualizations**: [Recharts](https://recharts.org/) & Interactive SVG Canvas
- **Typography**: Editorial Serif (*Newsreader*) + Sans (*Inter*) + Monospace (*JetBrains Mono*)

---

## 🚀 How to Run

### Prerequisites
- Node.js 18+ or 20+
- npm (or pnpm / yarn)

### Quick Start
```powershell
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

### Build for Production
```powershell
# Compile optimized static bundle
npm run build

# Start production server
npm run start
```

---

## ♿ Accessibility (WCAG 2.1 AA)

- **Keyboard Navigation**: Full tab index traversal across all filters, cards, and modal dialogs.
- **Keyboard Shortcuts**: `/` to trigger global search, `Esc` to close any overlay or detail panel.
- **Color Independence**: Category badges combine distinct color coding with text labels and emoji icons (never color alone).
- **Color Contrast**: All text elements meet or exceed WCAG AA 4.5:1 contrast ratios on dark stone backgrounds.
- **Semantic HTML**: Proper `<header>`, `<main>`, `<nav>`, `<section>`, `<dialog>`, and ARIA attributes (`aria-modal`, `aria-label`, `aria-current`).

---

## ⚡ Performance Optimizations

- **100% Client-Side**: Zero network requests after initial HTML/JS bundle download.
- **Zero Heavy Assets**: Uses CSS gradients, SVG rendering, and system/Google webfonts instead of large multi-megabyte image assets.
- **Precomputed Memoization**: Connection edges and category distributions are pre-calculated with `useMemo`, ensuring buttery 60 FPS interactions during filtering and panning.
- **Responsive Breakpoints**: Seamlessly adapts from mobile viewports (320px, 375px, 430px) through tablets (768px, 1024px) to ultra-wide displays (1920px).

---

## 📜 License

Created for the **WebRush Challenge: Your Life, In Receipts**.  
*Life Atlas — Discover the story hidden in your traces.*
