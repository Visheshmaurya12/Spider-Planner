import { useState } from "react";

const PROMPTS = [
  { key: "well", label: "What Went Well Today?", italic: true, size: 18 },
  { key: "challenge", label: "What Challenged Me?", italic: false, size: 14 },
  { key: "proud", label: "What Am I Proud Of?", italic: true, size: 16 },
  { key: "learned", label: "What Did I Learn?", italic: false, size: 14 },
  { key: "letgo", label: "What Can I Let Go Of?", italic: false, size: 14 },
  { key: "tomorrow", label: "Tomorrow I Want To...", italic: true, size: 18 },
];

const MONTHLY_SECTIONS = [
  "This Month's Focus",
  "Top 3 Goals",
  "What I Want to Improve",
  "Something I'm Looking Forward To",
];

type View = "daily" | "monthly";

export default function ReflectionPage() {
  const [view, setView] = useState<View>("daily");
  const [word, setWord] = useState("");

  return (
    <div>
      <div style={{ padding: "28px 28px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="section-label" style={{ marginBottom: 6 }}>Reflection</div>
        <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 20 }}>
          Reflect & Reset
        </h2>
        <div style={{ display: "flex", gap: 0 }}>
          {["daily", "monthly"].map(v => (
            <button key={v} onClick={() => setView(v as View)} style={{
              padding: "10px 24px 12px",
              background: "transparent", border: "none",
              borderBottom: `2px solid ${view === v ? "var(--crimson)" : "transparent"}`,
              color: view === v ? "var(--text)" : "var(--text-3)",
              cursor: "pointer", fontSize: 12, fontFamily: "Inter, sans-serif",
              fontWeight: view === v ? 500 : 400, transition: "all 0.2s",
              textTransform: "capitalize",
            }}>
              {v === "daily" ? "Daily Reflection" : "Monthly Reset"}
            </button>
          ))}
        </div>
      </div>

      {view === "daily" && (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 28px" }}>
          {/* Word of the day */}
          <div style={{
            textAlign: "center",
            padding: "28px",
            background: "var(--crimson)",
            borderRadius: "2px",
            marginBottom: 32,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.06), transparent 60%)" }} />
            <div className="font-mono" style={{ fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>ONE WORD FOR TODAY</div>
            <input id="ReflectionPage-input-1"
              value={word}
              onChange={e => setWord(e.target.value)}
              style={{
                background: "transparent", border: "none",
                color: "white", fontFamily: "Fraunces, serif", fontWeight: 700,
                fontSize: 36, textAlign: "center", width: "100%",
                outline: "none", letterSpacing: "-0.02em",
              }}
              placeholder="Focused"
            />
          </div>

          {/* Reflection prompts */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {PROMPTS.map((p, i) => (
              <div key={p.key} style={{
                padding: "22px 24px",
                background: "var(--surface)",
                border: `1px solid ${i === 0 || i === PROMPTS.length - 1 ? "var(--border-red)" : "var(--border)"}`,
                borderRadius: "2px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div className="font-mono" style={{ fontSize: 9, color: "var(--crimson)", letterSpacing: "0.12em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="section-label">{p.label}</div>
                </div>
                <textarea id="ReflectionPage-textarea-2" style={{
                  background: "transparent", border: "none", color: "var(--text)",
                  fontFamily: p.italic ? "Fraunces, serif" : "Inter, sans-serif",
                  fontStyle: p.italic ? "italic" : "normal",
                  fontSize: p.size,
                  width: "100%", resize: "none", outline: "none", lineHeight: 1.6, minHeight: 60,
                }} placeholder={`${p.label}...`} />
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "monthly" && (
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 28px" }}>
          {/* Hero */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 20, marginBottom: 24,
          }}>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border-red)",
              borderRadius: "2px", padding: "28px",
              gridColumn: "1 / -1",
            }}>
              <div className="section-label" style={{ marginBottom: 12 }}>This Month's Focus</div>
              <textarea id="ReflectionPage-textarea-3" style={{
                background: "transparent", border: "none", color: "var(--text)",
                fontFamily: "Fraunces, serif", fontStyle: "italic", fontSize: 22,
                width: "100%", resize: "none", outline: "none", lineHeight: 1.4, minHeight: 60,
              }} placeholder="What am I building, healing, or becoming this month?" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            {/* Top 3 goals */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "2px", padding: "24px" }}>
              <div className="section-label" style={{ marginBottom: 14 }}>Top 3 Goals</div>
              {[1, 2, 3].map(n => (
                <div key={n} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{
                    width: 28, height: 28, border: `1px solid ${n === 1 ? "var(--crimson)" : "var(--border)"}`,
                    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span className="font-mono" style={{ fontSize: 10, color: n === 1 ? "var(--crimson)" : "var(--text-3)" }}>{n}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <input id="ReflectionPage-input-4" className="line-input" style={{ fontSize: 13, fontWeight: 500 }} placeholder="Goal..." />
                    <input id="ReflectionPage-input-5" className="line-input" style={{ fontSize: 11, marginTop: 4, color: "var(--text-3)" }} placeholder="Why it matters..." />
                  </div>
                </div>
              ))}
            </div>

            {/* Important dates */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "2px", padding: "24px" }}>
              <div className="section-label" style={{ marginBottom: 14 }}>Important Dates</div>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 10, alignItems: "center", marginBottom: 10 }}>
                  <input id="ReflectionPage-input-6" className="line-input" style={{ fontSize: 11, textAlign: "center" }} placeholder="Date" />
                  <input id="ReflectionPage-input-7" className="line-input" style={{ fontSize: 12 }} placeholder="Event or deadline..." />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {MONTHLY_SECTIONS.slice(2).map(section => (
              <div key={section} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "2px", padding: "24px" }}>
                <div className="section-label" style={{ marginBottom: 12 }}>{section}</div>
                <textarea id="ReflectionPage-textarea-8" style={{
                  background: "transparent", border: "none", color: "var(--text)",
                  fontFamily: "Inter, sans-serif", fontSize: 13,
                  width: "100%", resize: "none", outline: "none", lineHeight: 1.7, minHeight: 80,
                }} placeholder={`${section}...`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
