# Pineapple Jam — Web App Specification

## Overview
A web app for a VATSIM Hawaiian island-hopping cargo event. Pilots register flight legs, draw random Turn Cards, and all activity is displayed on a real-time public dashboard.

**Event:** Pineapple Jam
**Date:** Sunday, April 12, 2026, 1700z–2000z
**Facility:** Honolulu Control Facility (HCF)

---

## Tech Stack
- **Frontend:** React (single page app)
- **Database:** Firebase Firestore (real-time)
- **Hosting:** Firebase Hosting
- **State persistence:** localStorage for returning pilot recognition

---

## Pages / Views

### Dashboard (Home Page — `/`)
- Public, no auth required
- Large table showing all filed legs
- Grouped by callsign — pilot info (callsign, name, aircraft) shows on first row, subsequent legs indented below
- Columns: Callsign, Name, Aircraft, Leg #, Departure, Arrival, Turn Card, Timestamp
- Real-time updates via Firestore onSnapshot listener
- Sortable/filterable (at minimum by callsign, by departure airport)
- "File New Leg" button prominently placed — opens modal

### File New Leg Modal (overlay on dashboard)
- **First visit fields:** Callsign, Name/Tag, Aircraft (select from grid of 25), Departure (autocomplete), Arrival (autocomplete)
- **Return visit:** System remembers callsign/name/aircraft via localStorage. Shows "Welcome back [CALLSIGN]" with pre-filled fields. Pilot only needs to select departure and arrival.
- **Departure/Arrival:** Autocomplete input searching by ICAO code or airport name. 15 Hawaiian airports. Same airport cannot be selected for both.
- **On submit:** Save leg to Firestore, then reveal Turn Card with flip animation inside the modal.
- **After card reveal:** Pilot can close modal and return to updated dashboard.

---

## Data Model

### Firestore Collection: `legs`
```
{
  id: (auto-generated)
  callsign: "AAL123"
  name: "John"
  aircraft: "Cessna 208 Caravan"
  departure: "PHNL"
  arrival: "PHOG"
  card: {
    id: 3,
    title: "Hono Speed Trap",
    text: "Slow it down! Maintain 150 KIAS maximum cruise speed for this entire leg.",
    icon: "🐢",
    category: "Ops",
    color: "#E74C3C"
  }
  timestamp: (server timestamp)
  leg_number: 1
}
```

### Leg number logic
- Query Firestore for existing legs with same callsign
- New leg_number = count of existing legs + 1

### Duplicate prevention
- Same callsign + same departure + same arrival = block with error message
- Same callsign + reversed airports (e.g. PHNL→PHOG then PHOG→PHNL) = allowed

---

## Airports (15 total)

```javascript
const AIRPORTS = [
  // Oahu
  { icao: "PHNL", name: "Honolulu / Inouye", island: "Oahu" },
  { icao: "PHDH", name: "Dillingham", island: "Oahu" },
  { icao: "PHJR", name: "Kalaeloa", island: "Oahu" },
  // Maui
  { icao: "PHOG", name: "Kahului", island: "Maui" },
  { icao: "PHJH", name: "Kapalua / West Maui", island: "Maui" },
  { icao: "PHHN", name: "Hana", island: "Maui" },
  // Molokai
  { icao: "PHMK", name: "Molokai", island: "Molokai" },
  { icao: "PHLU", name: "Kalaupapa", island: "Molokai" },
  // Lanai
  { icao: "PHNY", name: "Lanai", island: "Lanai" },
  // Big Island
  { icao: "PHKO", name: "Kona", island: "Big Island" },
  { icao: "PHTO", name: "Hilo", island: "Big Island" },
  { icao: "PHMU", name: "Waimea-Kohala", island: "Big Island" },
  { icao: "PHUP", name: "Upolu", island: "Big Island" },
  // Kauai
  { icao: "PHLI", name: "Lihue", island: "Kauai" },
  { icao: "PHBK", name: "Barking Sands", island: "Kauai" },
];
```

---

## Aircraft (25 total, sorted by cruise speed)

```javascript
const AIRCRAFT = [
  { name: "BN-2 Islander (Piston)", speed: 150 },
  { name: "C-47D Skytrain (DC-3)", speed: 160 },
  { name: "DHC-4 Caribou", speed: 160 },
  { name: "BN-2T Islander (Turbine)", speed: 170 },
  { name: "DHC-6 Twin Otter", speed: 170 },
  { name: "Piper Comanche 250", speed: 170 },
  { name: "Short SC.7 Skyvan", speed: 175 },
  { name: "Bonanza G36", speed: 175 },
  { name: "Cessna 208 Caravan", speed: 180 },
  { name: "Kodiak 100", speed: 180 },
  { name: "Curtiss C-46 Commando", speed: 180 },
  { name: "Beechcraft Model 18", speed: 190 },
  { name: "Shorts SD330/SD360", speed: 190 },
  { name: "Beechcraft Baron G58", speed: 200 },
  { name: "Black Square Piston Duke", speed: 200 },
  { name: "Cessna 408 SkyCourier", speed: 200 },
  { name: "King Air C90 GTX", speed: 230 },
  { name: "A2A Aerostar 600", speed: 250 },
  { name: "King Air 200", speed: 250 },
  { name: "Black Square Turbine Duke", speed: 270 },
  { name: "MU-2", speed: 270 },
  { name: "C-130 Hercules", speed: 290 },
  { name: "King Air 350", speed: 300 },
  { name: "TBM 930/850", speed: 330 },
  { name: "A400M Atlas", speed: 400 },
];
```

---

## Turn Cards (24 total, equal probability)

```javascript
const CARDS = [
  // OPS (9)
  { id: 1, title: "Full Fuel", text: "Depart with full tanks. Recalculate performance.", icon: "⛽", category: "Ops", color: "#E74C3C" },
  { id: 2, title: "Hand Fly Only", text: "No autopilot. Hand-fly from takeoff to touchdown.", icon: "🤲", category: "Ops", color: "#E74C3C" },
  { id: 3, title: "Hono Speed Trap", text: "150 KIAS max cruise this leg.", icon: "🐢", category: "Ops", color: "#E74C3C" },
  { id: 4, title: "No GPS", text: "Navigate by VOR, NDB, or pilotage only.", icon: "🧭", category: "Ops", color: "#E74C3C" },
  { id: 5, title: "Pressurization INOP", text: "Must stay below 12,000ft.", icon: "⚠️", category: "Ops", color: "#E74C3C" },
  { id: 6, title: "Engine Trouble", text: "Reduce your cruise speed by 20% this leg.", icon: "🔧", category: "Ops", color: "#E74C3C" },
  { id: 7, title: "Scenic Route", text: "3,000ft AGL maximum altitude.", icon: "🏔️", category: "Ops", color: "#E74C3C" },
  { id: 8, title: "Go Around!", text: "Mandatory go-around on first approach. Re-enter the pattern.", icon: "🔄", category: "Ops", color: "#E74C3C" },
  { id: 9, title: "Fragile Cargo", text: "No bank angle greater than 20°.", icon: "📦", category: "Ops", color: "#E74C3C" },

  // FLIGHT PLAN (6)
  { id: 10, title: "REROUTED!", text: "ATC assigns a new destination.", icon: "🔀", category: "Route", color: "#2980B9" },
  { id: 11, title: "Tire Blowout!", text: "Blown tire while taxiing! Hold position on the taxiway for 5 minutes.", icon: "💥", category: "Route", color: "#2980B9" },
  { id: 12, title: "Visual Approach", text: "Cancel IFR. Request a visual approach at destination.", icon: "👁️", category: "Route", color: "#2980B9" },
  { id: 13, title: "Reverse Route", text: "Fly your planned route backwards.", icon: "↩️", category: "Route", color: "#2980B9" },
  { id: 14, title: "Detour", text: "Overfly a waypoint of ATC's choice before proceeding to destination.", icon: "📍", category: "Route", color: "#2980B9" },
  { id: 15, title: "Runway Change", text: "Trade winds shifted! Request opposite runway on arrival.", icon: "🌬️", category: "Route", color: "#2980B9" },

  // CARGO (4)
  { id: 16, title: "Heavy Load", text: "Overweight pineapple shipment! Add 500 lbs. Recalculate performance.", icon: "🍍", category: "Cargo", color: "#27AE60" },
  { id: 17, title: "Perishable Goods", text: "Must land within 25 minutes or cargo spoils.", icon: "🧊", category: "Cargo", color: "#27AE60" },
  { id: 18, title: "Live Cargo", text: "Transporting animals. No bank angle greater than 10°.", icon: "🐕", category: "Cargo", color: "#27AE60" },
  { id: 19, title: "Priority Shipment", text: "Double points if leg completed in under 20 minutes.", icon: "⚡", category: "Cargo", color: "#27AE60" },

  // WILD CARD (5)
  { id: 20, title: "Shaka Bonus!", text: "Double points this leg. No strings attached. Mahalo!", icon: "🤙", category: "Aloha", color: "#F39C12" },
  { id: 21, title: "Aloha Spirit", text: "Pass your next turn card to another pilot of your choice.", icon: "🌺", category: "Aloha", color: "#F39C12" },
  { id: 22, title: "Island Local", text: "You know a shortcut! Skip directly to any airport of your choice.", icon: "🗺️", category: "Aloha", color: "#F39C12" },
  { id: 23, title: "Clear Skies", text: "No restriction this leg. Fly free.", icon: "☀️", category: "Aloha", color: "#F39C12" },
  { id: 24, title: "Kona Coffee Break", text: "Grab a coffee! 5 minute gate hold before pushback.", icon: "☕", category: "Aloha", color: "#F39C12" },
];
```

---

## UI/UX Design Direction

- Dark theme matching the card aesthetic (deep navy/teal gradient backgrounds)
- Pineapple yellow (#FFD966) as accent color
- Category colors: Ops red (#E74C3C), Flight Plan blue (#2980B9), Cargo green (#27AE60), Wild Card gold (#F39C12)
- Card flip animation for turn card reveal (CSS 3D transform, ~0.6s)
- Wild card draws get emoji particle burst animation
- Mobile responsive — pilots may register from phone while sim loads
- "PINEAPPLE JAM" branding in gold on cards and header

---

## User Flow

### First-time pilot:
1. Lands on dashboard (sees all pilots/legs)
2. Clicks "File New Leg"
3. Modal opens: enters callsign, name, selects aircraft, types departure (autocomplete), types arrival (autocomplete)
4. Submits → leg saved to Firestore → card flip animation reveals their Turn Card
5. Closes modal → dashboard now shows their leg

### Returning pilot (leg 2, 3, etc.):
1. Lands on dashboard
2. Clicks "File New Leg"
3. Modal opens: "Welcome back AAL123" — callsign, name, aircraft pre-filled from localStorage
4. Only needs to select new departure and arrival
5. Submit → card reveal → dashboard updates

### Controller / spectator:
1. Lands on dashboard
2. Sees all pilots, all legs, all cards in real-time
3. Can filter by callsign or departure airport
4. No interaction needed — view only

---

## Firebase Setup Required
- Create Firebase project
- Enable Firestore (start in test mode for development)
- Enable Firebase Hosting
- Install Firebase CLI: `npm install -g firebase-tools`
- Initialize: `firebase init` (select Hosting + Firestore)
- React app created with: `npx create-react-app pineapple-jam` or Vite

---

## File Structure (suggested)
```
pineapple-jam/
├── public/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── DashboardTable.jsx
│   │   ├── FileNewLegModal.jsx
│   │   ├── AirportAutocomplete.jsx
│   │   ├── AircraftSelect.jsx
│   │   ├── TurnCardReveal.jsx
│   │   └── TurnCard.jsx
│   ├── data/
│   │   ├── airports.js
│   │   ├── aircraft.js
│   │   └── cards.js
│   ├── firebase.js
│   ├── App.jsx
│   └── index.jsx
├── firestore.rules
├── firebase.json
├── SPEC.md (this file)
└── package.json
```
