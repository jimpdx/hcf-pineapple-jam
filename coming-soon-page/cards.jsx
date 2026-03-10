const PREVIEW_CARDS = [
  // OPS
  { id: 1, title: "Full Fuel", text: "Depart with full tanks! Recalculate your takeoff and landing performance.", icon: "⛽", category: "Ops", color: "#D94F3B" },
  { id: 2, title: "Hand Fly Only", text: "No autopilot allowed! Hand-fly from takeoff to touchdown the entire leg.", icon: "✋", category: "Ops", color: "#D94F3B" },
  { id: 3, title: "Honu Slowdown", text: "Slow it down! Maintain 150 KIAS maximum cruise speed for this entire leg.", icon: "🐢", category: "Ops", color: "#D94F3B" },
  { id: 4, title: "No GPS", text: "GPS is out! Navigate by VOR radials, NDB, or pilotage only this leg.", icon: "🧭", category: "Ops", color: "#D94F3B" },
  { id: 5, title: "Press. INOP", text: "Pressurization failure! Stay below 12,000 ft for this entire leg.", icon: "💨", category: "Ops", color: "#D94F3B" },
  { id: 6, title: "Engine Trouble", text: "Engine running rough! Reduce your cruise speed by 20% this leg.", icon: "🔧", category: "Ops", color: "#D94F3B" },
  { id: 7, title: "Scenic Route", text: "Enjoy the view! Maximum altitude 3,000 ft AGL this entire leg.", icon: "🏝️", category: "Ops", color: "#D94F3B" },
  { id: 8, title: "Go Around!", text: "Mandatory go-around on your first approach at your next destination.", icon: "🔄", category: "Ops", color: "#D94F3B" },
  { id: 9, title: "Fragile Cargo", text: "Handle with care! No bank angle greater than 20° this entire leg.", icon: "📦", category: "Ops", color: "#D94F3B" },

  // FLIGHT PLAN
  { id: 10, title: "Tire Blowout", text: "Blown tire while taxiing! Hold your position on the taxiway for 5 minutes.", icon: "💥", category: "Route", color: "#5BAFCF" },
  { id: 11, title: "REROUTED", text: "Change of plans! ATC will assign you a new destination airport enroute!", icon: "🔀", category: "Route", color: "#5BAFCF" },
  { id: 12, title: "Visual Only", text: "IFR cancellation recieved! Maintain VFR only for this leg. Amend your flightplan.", icon: "👀", category: "Route", color: "#5BAFCF" },
  { id: 13, title: "Reverse Route", text: "Plot twist! Fly your planned route in reverse order.", icon: "🔃", category: "Route", color: "#5BAFCF" },
  { id: 14, title: "Detour", text: "Overfly a waypoint of ATC's choice before proceeding to destination.", icon: "↩️", category: "Route", color: "#5BAFCF" },
  { id: 15, title: "Runway Change", text: "Trade winds shifted! Expect to land the opposite runway if able.", icon: "🌬️", category: "Route", color: "#5BAFCF" },

  // CARGO
  { id: 16, title: "Heavy Load", text: "Overweight pineapple shipment! Add 500 lbs to your cargo payload.", icon: "🍍", category: "Cargo", color: "#3AAA8E" },
  { id: 17, title: "Perishable Goods", text: "Clock is ticking! Land within 25 minutes or the cargo spoils.", icon: "⏱️", category: "Cargo", color: "#3AAA8E" },
  { id: 18, title: "Live Cargo", text: "Transporting animals to the next island. No bank angle greater than 10°.", icon: "🐕", category: "Cargo", color: "#3AAA8E" },
  { id: 19, title: "Priority Shipment", text: "Rush delivery! Complete this leg in under 20 minutes or the client walks.", icon: "🚀", category: "Cargo", color: "#3AAA8E" },

  // WILD CARD
  { id: 20, title: "Shaka Bonus", text: "Lucky draw! You get priority sequencing and direct routing. Mahalo!", icon: "🤙", category: "Aloha", color: "#F5C518" },
  { id: 21, title: "Aloha Spirit", text: "Share the love! Pass your next turn card to another pilot.", icon: "🌺", category: "Aloha", color: "#F5C518" },
  { id: 22, title: "Island Local", text: "You know a shortcut! Skip directly to any airport of your choice.", icon: "🗺️", category: "Aloha", color: "#F5C518" },
  { id: 23, title: "Clear Skies", text: "No restrictions this leg. Fly free, pilot!", icon: "☀️", category: "Aloha", color: "#F5C518" },
  { id: 24, title: "Coffee Break", text: "Grab a Kona coffee! Mandatory 5 minute gate hold before pushback.", icon: "☕", category: "Aloha", color: "#F5C518" },
];

const CATEGORY_LABELS = {
  Ops: "OPERATIONAL",
  Route: "FLIGHT PLAN",
  Cargo: "CARGO",
  Aloha: "WILD CARD",
};

function Card({ card }) {
  return (
    <div style={{
      width: 270,
      height: 420,
      borderRadius: 16,
      background: "linear-gradient(160deg, #1A5C5A 0%, #1E6E63 100%)",
      border: `2px solid ${card.color}55`,
      boxShadow: `0 6px 24px rgba(0,0,0,0.3), 0 0 16px ${card.color}20`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 16px 20px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {/* PINEAPPLE JAM header */}
      <div style={{
        fontSize: 22,
        fontWeight: 900,
        letterSpacing: 1,
        color: "#F5C518",
        textTransform: "uppercase",
        textShadow: "0 1px 3px rgba(0,0,0,0.4)",
      }}>
        PINEAPPLE JAM
      </div>

      {/* Category badge */}
      <div style={{
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: 1,
        color: card.color,
        textTransform: "uppercase",
        opacity: 0.8,
        marginTop: 6,
      }}>
        {CATEGORY_LABELS[card.category]}
      </div>

      {/* Icon */}
      <div style={{
        fontSize: card.icon === "🐢" ? 90 : 78,
        lineHeight: 1,
        filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.4))",
        marginTop: 4,
      }}>
        {card.icon}
      </div>

      {/* Title */}
      <div style={{
        fontSize: 26,
        fontWeight: 900,
        color: "#fff",
        lineHeight: 1.15,
        textShadow: `0 2px 6px ${card.color}33`,
        padding: "0 4px",
        letterSpacing: -0.5,
      }}>
        {card.title}
      </div>

      {/* Description */}
      <div style={{
        fontSize: 16,
        color: "rgba(255,255,255,0.65)",
        lineHeight: 1.45,
        padding: "0 6px",
      }}>
        {card.text}
      </div>
    </div>
  );
}

function PineappleJamPreview() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#5B9BD5",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 16px",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Dot texture */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />



      {/* Card Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 270px)",
        gap: 18,
        position: "relative",
        zIndex: 1,
      }}>
        {PREVIEW_CARDS.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>


    </div>
  );
}