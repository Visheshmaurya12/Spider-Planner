import { useState } from "react";

type Mode = "structured" | "dotgrid" | "lined" | "blank";

const MODES: { id: Mode; label: string; sub: string }[] = [
  { id: "structured", label: "Structured Dump", sub: "Categorized" },
  { id: "dotgrid", label: "Dot Grid", sub: "Free-form" },
  { id: "lined", label: "Lined Notes", sub: "Classic" },
  { id: "blank", label: "Creative Space", sub: "Blank canvas" },
];

const CATEGORIES = [
  { label: "Things To Do", color: "var(--crimson)", icon: "□" },
  { label: "Ideas", color: "#c48a30", icon: "◈" },
  { label: "Reminders", color: "#5aab7a", icon: "◎" },
  { label: "Worries", color: "#7a7aab", icon: "◯" },
  { label: "Important", color: "var(--crimson)", icon: "★" },
];

export default function BrainDump() {
  const [mode, setMode] = useState<Mode>("structured");

  return (
    <div>
      <div style={{ padding: "28px 28px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="section-label" style={{ marginBottom: 6 }}>Brain Dump</div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Empty Your Mind
          </h2>
          <p style={{ fontSize: 12, color: "var(--text-3)", maxWidth: 300 }}>
            Get it all out. No structure required — just write.
          </p>
        </div>
        <div style={{ display: "flex", gap: 0 }}>
          {MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{
              padding: "10px 20px 12px",
              background: "transparent", border: "none",
              borderBottom: `2px solid ${mode === m.id ? "var(--crimson)" : "transparent"}`,
              color: mode === m.id ? "var(--text)" : "var(--text-3)",
              cursor: "pointer", transition: "all 0.2s",
              fontSize: 12, fontFamily: "Inter, sans-serif",
              fontWeight: mode === m.id ? 500 : 400,
            }}>
              {m.label}
              <div style={{ fontSize: 10, color: "var(--text-3)", marginTop: 1 }}>{m.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {mode === "structured" && (
        <div style={{ padding: "28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {CATEGORIES.map(cat => (
            <div key={cat.label} style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "2px", padding: "22px",
              borderTop: `3px solid ${cat.color}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 14, color: cat.color }}>{cat.icon}</span>
                <div className="section-label" style={{ color: cat.color }}>{cat.label}</div>
              </div>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "5px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: cat.color, flexShrink: 0, opacity: 0.5 }} />
                  <input id="BrainDump-input-1" className="line-input" style={{ fontSize: 12, border: "none", borderBottom: "none", paddingBottom: 0 }} placeholder="..." />
                </div>
              ))}
            </div>
          ))}

          {/* Extra notes */}
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "2px", padding: "22px",
            gridColumn: "2 / -1",
          }}>
            <div className="section-label" style={{ marginBottom: 14 }}>Overflow — Anything Else</div>
            <textarea id="BrainDump-textarea-2" style={{
              background: "transparent", border: "none", color: "var(--text)",
              fontFamily: "Inter, sans-serif", fontSize: 13,
              width: "100%", resize: "none", outline: "none", lineHeight: 1.8, minHeight: 100,
            }} placeholder="Everything else in your head..." />
          </div>
        </div>
      )}

      {mode === "dotgrid" && (
        <div style={{ padding: "28px" }}>
          <div className="dot-grid" style={{
            minHeight: "calc(100vh - 200px)",
            borderRadius: "2px",
            border: "1px solid var(--border)",
            padding: "20px",
            position: "relative",
          }}>
            <textarea id="BrainDump-textarea-3" style={{
              background: "transparent", border: "none", color: "var(--text)",
              fontFamily: "Inter, sans-serif", fontSize: 13, width: "100%",
              resize: "none", outline: "none", lineHeight: "20px",
              minHeight: "calc(100vh - 260px)",
            }} placeholder="Write freely..." />
          </div>
        </div>
      )}

      {mode === "lined" && (
        <div style={{ padding: "28px", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "2px", padding: "28px 40px" }}>
            {/* Title line */}
            <input id="BrainDump-input-4" className="line-input" style={{ fontSize: 20, fontFamily: "Fraunces, serif", marginBottom: 20 }} placeholder="Note title..." />
            {/* Lined paper */}
            <div style={{
              background: "repeating-linear-gradient(transparent, transparent 31px, var(--border) 31px, var(--border) 32px)",
              backgroundSize: "100% 32px",
            }}>
              <textarea id="BrainDump-textarea-5" style={{
                background: "transparent", border: "none", color: "var(--text)",
                fontFamily: "Inter, sans-serif", fontSize: 13, width: "100%",
                resize: "none", outline: "none", lineHeight: "32px",
                minHeight: 640, paddingTop: 6,
              }} placeholder="Write your thoughts here..." />
            </div>
          </div>
        </div>
      )}

      {mode === "blank" && (
        <div style={{ padding: "28px" }}>
          <div style={{
            minHeight: "calc(100vh - 220px)",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "2px",
            padding: "40px",
            position: "relative",
          }}>
            <div style={{ position: "absolute", top: 20, right: 24 }}>
              <span className="font-mono" style={{ fontSize: 9, color: "var(--text-3)", letterSpacing: "0.1em" }}>CREATIVE SPACE — USE FREELY</span>
            </div>
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              textAlign: "center", pointerEvents: "none",
            }}>
              <div className="font-display" style={{ fontSize: 80, color: "rgba(196,30,58,0.05)", fontWeight: 700, lineHeight: 1 }}>∞</div>
              <div className="font-mono" style={{ fontSize: 9, color: "var(--text-3)", letterSpacing: "0.15em", marginTop: 8 }}>NO LIMITS. NO RULES.</div>
            </div>
            <textarea id="BrainDump-textarea-6" style={{
              background: "transparent", border: "none", color: "var(--text)",
              fontFamily: "Inter, sans-serif", fontSize: 14, width: "100%",
              resize: "none", outline: "none", lineHeight: 1.8,
              minHeight: "calc(100vh - 320px)",
            }} placeholder="" />
          </div>
        </div>
      )}
    </div>
  );
}
