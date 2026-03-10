# Pineapple Jam — Development Stories

## Story 1: Project Scaffolding & Firebase Setup ✅
- [x] Vite + React project initialized
- [x] Dependencies installed (react, react-dom, firebase)
- [x] Firebase config (`src/firebase.js`) with emulator auto-connect in dev
- [x] Data files: `src/data/airports.js`, `aircraft.js`, `cards.js`
- [x] App layout with banner image, nav bar (tagline + button), light tropical theme
- [x] `firebase.json` configured (Hosting → `dist`, SPA rewrite, emulator ports)
- [x] `firestore.rules` set to allow read/write until April 15, 2026
- [x] Dev server verified running at localhost:5173

## Story 2: Dashboard & Real-time Table ✅
- [x] `Dashboard.jsx` — main page layout with filter controls
- [x] `DashboardTable.jsx` — Firestore `onSnapshot` real-time listener
- [x] Table grouped by callsign (pilot info on first row via rowSpan, legs below)
- [x] Columns: Callsign, Name, Aircraft, Leg #, Departure, Arrival, Turn Card, Timestamp
- [x] Sort by callsign or timestamp; filter by callsign and departure airport
- [x] Mobile responsive table (horizontal scroll, condensed on small screens)

## Story 3: File New Leg Modal (Form) ✅
- [x] `FileNewLegModal.jsx` — modal overlay triggered by "Pilot Registration" button
- [x] `AirportAutocomplete.jsx` — search by ICAO code or airport name, same-airport prevention
- [x] `AircraftSelect.jsx` — grid of 25 aircraft with speed labels
- [x] localStorage for returning pilot recognition ("Welcome back [CALLSIGN]")
- [x] Firestore write with leg_number calculation
- [x] Duplicate prevention (same callsign + same departure + same arrival)
- [x] Form validation with inline error messages
- [x] Card reveal view after successful submission

## Story 4: Turn Card System & Reveal Animation 🔲
- [ ] `TurnCard.jsx` — card component matching coming-soon-page styling
- [ ] `TurnCardReveal.jsx` — CSS 3D flip animation (~0.6s)
- [ ] Random card selection on leg submit, saved with leg in Firestore
- [ ] Emoji particle burst animation for Wild Card (Aloha) draws
- [x] Dashboard: hover over Turn Card pill shows full card popup (tooltip with icon, title, text, category)

## Story 5: Polish & Deploy 🔲
- [ ] Final responsive pass (phone-first for pilots)
- [ ] Pineapple Jam branding polish
- [ ] Firebase Hosting deploy
- [ ] Edge cases and bug fixes
