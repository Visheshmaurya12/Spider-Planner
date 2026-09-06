interface Props { onStart: () => void; }

export default function Cover({ onStart }: Props) {
  return (
    <div style={{
      minHeight: "calc(100vh - 53px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      padding: "60px 24px",
    }}>
      {/* Background web pattern */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}
        viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        {/* Radial web lines */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x2 = 400 + Math.cos(angle) * 600;
          const y2 = 300 + Math.sin(angle) * 600;
          return <line key={i} x1="400" y1="300" x2={x2} y2={y2} stroke="#c41e3a" strokeWidth="1" />;
        })}
        {/* Concentric arcs */}
        {[60, 120, 180, 240, 300, 360, 420].map(r => (
          <circle key={r} cx="400" cy="300" r={r} fill="none" stroke="#c41e3a" strokeWidth="1" />
        ))}
      </svg>

      {/* Large decorative number */}
      <div className="font-display" style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -55%)",
        fontSize: "clamp(200px, 40vw, 420px)",
        fontWeight: 700,
        color: "rgba(196,30,58,0.04)",
        lineHeight: 1,
        letterSpacing: "-0.04em",
        userSelect: "none",
        pointerEvents: "none",
      }}>01</div>

      {/* Content */}
      <div style={{ position: "relative", textAlign: "center", maxWidth: 640 }}>
        <div className="section-label" style={{ marginBottom: 32 }}>Premium Undated Planner</div>

        <h1 className="font-display" style={{
          fontSize: "clamp(52px, 10vw, 96px)",
          fontWeight: 700,
          lineHeight: 0.92,
          letterSpacing: "-0.03em",
          color: "var(--text)",
          marginBottom: 8,
        }}>
          The
        </h1>
        <h1 className="font-display" style={{
          fontSize: "clamp(52px, 10vw, 96px)",
          fontWeight: 700,
          lineHeight: 0.92,
          letterSpacing: "-0.03em",
          color: "var(--crimson)",
          marginBottom: 8,
          fontStyle: "italic",
        }}>
          Daily
        </h1>
        <h1 className="font-display" style={{
          fontSize: "clamp(52px, 10vw, 96px)",
          fontWeight: 700,
          lineHeight: 0.92,
          letterSpacing: "-0.03em",
          color: "var(--text)",
          marginBottom: 40,
        }}>
          Edit
        </h1>

        <div className="rule-red" style={{ margin: "0 auto 32px", width: 80 }} />

        <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 48, maxWidth: 440, margin: "0 auto 48px" }}>
          An undated daily planner combining productivity, mindfulness, and intentional living — designed to help you organize your day, build better habits, and reflect on what matters.
        </p>

        {/* Feature pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 56 }}>
          {["Daily Planning", "Time Blocking", "Habit Tracking", "Goals", "Wellness", "Reflection"].map(f => (
            <span key={f} style={{
              padding: "6px 14px",
              border: "1px solid var(--border)",
              borderRadius: "2px",
              fontSize: 11,
              color: "var(--text-3)",
              fontFamily: "JetBrains Mono, monospace",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>{f}</span>
          ))}
        </div>

        {/* CTA */}
        <button onClick={onStart} style={{
          padding: "16px 48px",
          background: "var(--crimson)",
          color: "white",
          border: "none",
          borderRadius: "2px",
          fontSize: 12,
          fontFamily: "JetBrains Mono, monospace",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--crimson-light)")}
        onMouseLeave={e => (e.currentTarget.style.background = "var(--crimson)")}>
          Begin Today
        </button>

        {/* Bottom info */}
        <div style={{ marginTop: 64, display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
          {[["30+", "Planner Pages"], ["4", "Daily Layouts"], ["7", "Wellness Trackers"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div className="font-display" style={{ fontSize: 32, fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>{n}</div>
              <div className="font-mono" style={{ fontSize: 9, color: "var(--text-3)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
