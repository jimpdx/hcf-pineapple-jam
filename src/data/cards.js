export const CARDS = [
  // OPS (9)
  { id: 1, text: "Depart with full tanks! Recalculate takeoff and landing performance.", title: "Full Fuel", icon: "⛽", category: "OPERATIONAL", color: "#D94F3B" },
  { id: 2, text: "No autopilot allowed! Hand-fly from takeoff to touchdown the entire leg.", title: "Hand Fly Only", icon: "✋", category: "OPERATIONAL", color: "#D94F3B" },
  { id: 3, text: "Slow it down! Maintain 150 KIAS maximum cruise speed this entire leg.", title: "Honu Slowdown", icon: "🐢", category: "OPERATIONAL", color: "#D94F3B" },
  { id: 4, text: "GPS is out! Navigate by VOR radials, NDB, or pilotage only this leg.", title: "No GPS", icon: "🧭", category: "OPERATIONAL", color: "#D94F3B" },
  { id: 5, text: "Pressurization failure! Don your masks and stay below 12,000 ft for this entire leg.", title: "Press. INOP", icon: "💨", category: "OPERATIONAL", color: "#D94F3B" },
  { id: 6, text: "Engine running rough! Reduce your cruise speed by 20% for this entire leg.", title: "Engine Trouble", icon: "🔧", category: "OPERATIONAL", color: "#D94F3B" },
  { id: 7, text: "Enjoy the view! Maintain a maximum altitude of 5,000 ft AGL this leg.", title: "Scenic Route", icon: "🏝️", category: "OPERATIONAL", color: "#D94F3B" },
  { id: 8, text: "Missed approach! Execute a mandatory go-around on your first approach.", title: "Go Around!", icon: "🔄", category: "OPERATIONAL", color: "#D94F3B" },
  { id: 9, text: "Handle with care! No bank angle greater than 20° this entire leg.", title: "Fragile Cargo", icon: "📦", category: "OPERATIONAL", color: "#D94F3B" },

  // FLIGHT PLAN (6)
  { id: 10, text: "Blown tire while taxiing! Hold position on the taxiway for 5 minutes at ATC's discretion.", title: "Tire Blowout", icon: "💥", category: "FLIGHT PLAN", color: "#5BAFCF" },
  { id: 11, text: "Change of plans! ATC will assign you a new destination airport enroute!", title: "REROUTED", icon: "🔀", category: "FLIGHT PLAN", color: "#5BAFCF" },
  { id: 12, text: "IFR cancellation received! Maintain VFR only for this leg. ATC will amend your flightplan.", title: "Visual Only", icon: "👀", category: "FLIGHT PLAN", color: "#5BAFCF" },
  { id: 13, text: "Plot twist! Fly your planned route in reverse order this leg. Refile please.", title: "Reverse Route", icon: "🔃", category: "FLIGHT PLAN", color: "#5BAFCF" },
  { id: 14, text: "Overfly a waypoint of ATC's choice before proceeding to destination.", title: "Detour", icon: "↩️", category: "FLIGHT PLAN", color: "#5BAFCF" },
  { id: 15, text: "Trade winds shifted! Expect to land the opposite runway if ATC is able to accomodate.", title: "Runway Change", icon: "🌬️", category: "FLIGHT PLAN", color: "#5BAFCF" },

  // CARGO (2)
  { id: 16, text: "Overweight pineapple shipment! Add 500 lbs to your cargo payload.", title: "Heavy Load", icon: "🍍", category: "CARGO", color: "#3AAA8E" },
  { id: 17, text: "Transporting animals to the next island. No bank angle greater than 10° this leg.", title: "Live Cargo", icon: "🐕", category: "CARGO", color: "#3AAA8E" },

  // WILD CARD (3)
  { id: 20, text: "Lucky draw! You get priority sequencing and direct routing. Mahalo!", title: "Shaka Bonus", icon: "🤙", category: "WILD CARD", color: "#F5C518" },
  { id: 21, text: "You know the area! Receive direct routing to your destination upon request.", title: "Island Local", icon: "🗺️", category: "WILD CARD", color: "#F5C518" },
  { id: 22, text: "Grab a Kona coffee! Mandatory 5 minute gate hold before pushback.", title: "Coffee Break", icon: "☕", category: "WILD CARD", color: "#F5C518" },
];

export const CATEGORY_LABELS = {
  OPERATIONAL: "OPERATIONAL",
  "FLIGHT PLAN": "FLIGHT PLAN",
  CARGO: "CARGO",
  "WILD CARD": "WILD CARD",
};
