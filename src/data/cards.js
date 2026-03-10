export const CARDS = [
  // OPS (9)
  { id: 1, title: "Full Fuel", text: "Depart with full tanks. Recalculate performance.", icon: "\u26fd", category: "Ops", color: "#E74C3C" },
  { id: 2, title: "Hand Fly Only", text: "No autopilot. Hand-fly from takeoff to touchdown.", icon: "\ud83e\udd32", category: "Ops", color: "#E74C3C" },
  { id: 3, title: "Hono Speed Trap", text: "150 KIAS max cruise this leg.", icon: "\ud83d\udc22", category: "Ops", color: "#E74C3C" },
  { id: 4, title: "No GPS", text: "Navigate by VOR, NDB, or pilotage only.", icon: "\ud83e\udded", category: "Ops", color: "#E74C3C" },
  { id: 5, title: "Pressurization INOP", text: "Must stay below 12,000ft.", icon: "\u26a0\ufe0f", category: "Ops", color: "#E74C3C" },
  { id: 6, title: "Engine Trouble", text: "Reduce your cruise speed by 20% this leg.", icon: "\ud83d\udd27", category: "Ops", color: "#E74C3C" },
  { id: 7, title: "Scenic Route", text: "3,000ft AGL maximum altitude.", icon: "\ud83c\udfd4\ufe0f", category: "Ops", color: "#E74C3C" },
  { id: 8, title: "Go Around!", text: "Mandatory go-around on first approach. Re-enter the pattern.", icon: "\ud83d\udd04", category: "Ops", color: "#E74C3C" },
  { id: 9, title: "Fragile Cargo", text: "No bank angle greater than 20\u00b0.", icon: "\ud83d\udce6", category: "Ops", color: "#E74C3C" },

  // FLIGHT PLAN (6)
  { id: 10, title: "REROUTED!", text: "ATC assigns a new destination.", icon: "\ud83d\udd00", category: "Route", color: "#2980B9" },
  { id: 11, title: "Tire Blowout!", text: "Blown tire while taxiing! Hold position on the taxiway for 5 minutes.", icon: "\ud83d\udca5", category: "Route", color: "#2980B9" },
  { id: 12, title: "Visual Approach", text: "Cancel IFR. Request a visual approach at destination.", icon: "\ud83d\udc41\ufe0f", category: "Route", color: "#2980B9" },
  { id: 13, title: "Reverse Route", text: "Fly your planned route backwards.", icon: "\u21a9\ufe0f", category: "Route", color: "#2980B9" },
  { id: 14, title: "Detour", text: "Overfly a waypoint of ATC's choice before proceeding to destination.", icon: "\ud83d\udccd", category: "Route", color: "#2980B9" },
  { id: 15, title: "Runway Change", text: "Trade winds shifted! Request opposite runway on arrival.", icon: "\ud83c\udf2c\ufe0f", category: "Route", color: "#2980B9" },

  // CARGO (4)
  { id: 16, title: "Heavy Load", text: "Overweight pineapple shipment! Add 500 lbs. Recalculate performance.", icon: "\ud83c\udf4d", category: "Cargo", color: "#27AE60" },
  { id: 17, title: "Perishable Goods", text: "Must land within 25 minutes or cargo spoils.", icon: "\ud83e\uddca", category: "Cargo", color: "#27AE60" },
  { id: 18, title: "Live Cargo", text: "Transporting animals. No bank angle greater than 10\u00b0.", icon: "\ud83d\udc15", category: "Cargo", color: "#27AE60" },
  { id: 19, title: "Priority Shipment", text: "Double points if leg completed in under 20 minutes.", icon: "\u26a1", category: "Cargo", color: "#27AE60" },

  // WILD CARD (5)
  { id: 20, title: "Shaka Bonus!", text: "Double points this leg. No strings attached. Mahalo!", icon: "\ud83e\udd19", category: "Aloha", color: "#F39C12" },
  { id: 21, title: "Aloha Spirit", text: "Pass your next turn card to another pilot of your choice.", icon: "\ud83c\udf3a", category: "Aloha", color: "#F39C12" },
  { id: 22, title: "Island Local", text: "You know a shortcut! Skip directly to any airport of your choice.", icon: "\ud83d\uddfa\ufe0f", category: "Aloha", color: "#F39C12" },
  { id: 23, title: "Clear Skies", text: "No restriction this leg. Fly free.", icon: "\u2600\ufe0f", category: "Aloha", color: "#F39C12" },
  { id: 24, title: "Kona Coffee Break", text: "Grab a coffee! 5 minute gate hold before pushback.", icon: "\u2615", category: "Aloha", color: "#F39C12" },
];

export const CATEGORY_LABELS = {
  Ops: "Operational",
  Route: "Flight Plan",
  Cargo: "Cargo",
  Aloha: "Wild Card",
};
