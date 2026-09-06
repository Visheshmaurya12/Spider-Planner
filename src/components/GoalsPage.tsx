import { useState } from "react";

type View = "bigpicture" | "goals";

export default function GoalsPage() {
  const [view, setView] = useState<View>("bigpicture");

  return (
    <div>
      <div style={{ padding: "28px 28px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="section-label" style={{ marginBottom: 6 }}>Vision & Goals</div>
        <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 20 }}>
          Your Big Picture
        </h2>
        <div style={{ display: "flex", gap: 0 }}>
          {[{ id: "bigpicture", label: "My Big Picture" }, { id: "goals", label: "Goals & Milestones" }].map(v => (
            <button key={v.id} onClick={() => setView(v.id as View)} style={{
              padding: "10px 24px 12px",
              background: "transparent", border: "none",
              borderBottom: `2px solid ${view === v.id ? "var(--crimson)" : "transparent"}`,
              color: view === v.id ? "var(--text)" : "var(--text-3)",
              cursor: "pointer", fontSize: 12, fontFamily: "Inter, sans-serif",
              fontWeight: view === v.id ? 500 : 400, transition: "all 0.2s",
            }}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {view === "bigpicture" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 28px" }}>
          {/* Vision hero */}
          <div style={{
            background: "linear-gradient(135deg, var(--crimson-dim) 0%, var(--crimson) 100%)",
            borderRadius: "2px", padding: "36px 40px", marginBottom: 28, position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, borderRadius: "50%", border: "50px solid rgba(255,255,255,0.05)" }} />
            <div style={{ position: "absolute", bottom: -40, left: 20, width: 100, height: 100, borderRadius: "50%", border: "30px solid rgba(255,255,255,0.04)" }} />
            <div className="font-mono" style={{ fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>MY VISION</div>
            <textarea id="GoalsPage-textarea-1" style={{
              background: "transparent", border: "none", color: "white",
              fontFamily: "Fraunces, serif", fontStyle: "italic", fontSize: 22, fontWeight: 400,
              width: "100%", resize: "none", outline: "none", lineHeight: 1.5, minHeight: 80,
            }} placeholder="The life I am creating. The version of myself I am becoming. My direction, my north star..." />
          </div>

          {/* 2x2 grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "What Matters Most", prompt: "My non-negotiable values and priorities...", accent: false },
              { label: "What I Want More Of", prompt: "Experiences, feelings, relationships, opportunities...", accent: false },
              { label: "What I Want Less Of", prompt: "Habits, obligations, distractions, energy drains...", accent: false },
              { label: "My Current Focus", prompt: "Where my energy is intentionally directed right now...", accent: true },
            ].map((section, i) => (
              <div key={i} style={{
                background: "var(--surface)",
                border: `1px solid ${section.accent ? "var(--border-red)" : "var(--border)"}`,
                borderRadius: "2px", padding: "24px",
              }}>
                <div className="section-label" style={{ marginBottom: 10, color: section.accent ? "var(--crimson)" : undefined }}>
                  {section.label}
                </div>
                <textarea id="GoalsPage-textarea-2" style={{
                  background: "transparent", border: "none", color: "var(--text)",
                  fontFamily: "Inter, sans-serif", fontSize: 13,
                  width: "100%", resize: "none", outline: "none", lineHeight: 1.7, minHeight: 100,
                }} placeholder={section.prompt} />
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "goals" && (
        <div style={{ padding: "36px 28px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 900, margin: "0 auto" }}>
            {/* Big goals */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "2px", padding: "28px" }}>
              <div className="section-label" style={{ marginBottom: 20 }}>My Big Goals</div>
              {[1, 2, 3, 4].map(n => (
                <div key={n} style={{
                  marginBottom: 20, paddingBottom: 20,
                  borderBottom: n < 4 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{
                      width: 32, height: 32, background: n === 1 ? "var(--crimson)" : "var(--surface-2)",
                      border: `1px solid ${n === 1 ? "var(--crimson)" : "var(--border)"}`,
                      borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <span className="font-mono" style={{ fontSize: 11, color: n === 1 ? "white" : "var(--text-3)" }}>G{n}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <input id="GoalsPage-input-3" className="line-input" style={{ fontSize: 14, fontWeight: 500 }} placeholder="Goal title..." />
                      <div style={{ marginTop: 8 }}>
                        <div className="font-mono" style={{ fontSize: 8, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 4 }}>WHY IT MATTERS</div>
                        <textarea id="GoalsPage-textarea-4" style={{
                          background: "transparent", border: "none", borderBottom: "1px solid var(--border)",
                          color: "var(--text-2)", fontFamily: "Inter, sans-serif", fontSize: 12,
                          width: "100%", resize: "none", outline: "none", lineHeight: 1.6,
                        }} rows={2} placeholder="Because..." />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Milestones */}
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "2px", padding: "24px" }}>
                <div className="section-label" style={{ marginBottom: 14 }}>Important Milestones</div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      border: "1px solid var(--crimson)",
                      flexShrink: 0,
                    }} />
                    <input id="GoalsPage-input-5" className="line-input" style={{ fontSize: 12 }} placeholder="Milestone..." />
                    <input id="GoalsPage-input-6" className="line-input" style={{ fontSize: 10, width: 70, flexShrink: 0, color: "var(--text-3)" }} placeholder="Date" />
                  </div>
                ))}
              </div>

              {/* Future self */}
              <div style={{
                background: "var(--surface)", border: "1px solid var(--border-red)",
                borderRadius: "2px", padding: "24px", flex: 1,
              }}>
                <div className="section-label" style={{ marginBottom: 12, color: "var(--crimson)" }}>My Future Self</div>
                <p style={{ fontSize: 11, color: "var(--text-3)", lineHeight: 1.6, marginBottom: 14 }}>
                  Write a letter to the person you are becoming.
                </p>
                <textarea id="GoalsPage-textarea-7" style={{
                  background: "transparent", border: "none", color: "var(--text)",
                  fontFamily: "Fraunces, serif", fontStyle: "italic", fontSize: 16,
                  width: "100%", resize: "none", outline: "none", lineHeight: 1.6, minHeight: 120,
                }} placeholder="Dear future me, by this time next year I will have..." />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
