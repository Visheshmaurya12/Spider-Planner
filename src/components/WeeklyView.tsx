import { useState } from "react";
import CheckBox from "./CheckBox";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const SHORT = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];


type View = "plan" | "reflect";

export default function WeeklyView() {
  const [view, setView] = useState<View>("plan");

  return (
    <div>
      {/* Header */}
      <div style={{ padding: "28px 28px 0", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div className="section-label" style={{ marginBottom: 6 }}>Weekly View</div>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Week at a Glance
            </h2>
          </div>
        </div>
        <div style={{ display: "flex", gap: 0 }}>
          {["plan", "reflect"].map(v => (
            <button key={v} onClick={() => setView(v as View)} style={{
              padding: "10px 24px 12px",
              background: "transparent", border: "none",
              borderBottom: `2px solid ${view === v ? "var(--crimson)" : "transparent"}`,
              color: view === v ? "var(--text)" : "var(--text-3)",
              cursor: "pointer", fontSize: 12, fontFamily: "Inter, sans-serif",
              textTransform: "capitalize", fontWeight: view === v ? 500 : 400,
              transition: "all 0.2s",
            }}>
              {v === "plan" ? "Weekly Plan" : "Weekly Reflection"}
            </button>
          ))}
        </div>
      </div>

      {view === "plan" && (
        <div style={{ padding: "28px" }}>
          {/* Intentions + priorities row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
            <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "2px", padding: "18px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>Weekly Intentions</div>
              <textarea id="WeeklyView-textarea-1" style={{
                background: "transparent", border: "none", color: "var(--text)",
                fontFamily: "Fraunces, serif", fontStyle: "italic", fontSize: 15,
                width: "100%", resize: "none", outline: "none", lineHeight: 1.5, minHeight: 80,
              }} placeholder="This week I intend to..." />
            </div>
            <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "2px", padding: "18px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>Top 3 Priorities</div>
              {[1, 2, 3].map(n => (
                <div key={n} style={{ display: "flex", gap: 10, alignItems: "center", padding: "5px 0", borderBottom: n < 3 ? "1px solid var(--border)" : "none" }}>
                  <span style={{
                    fontSize: 9, fontFamily: "JetBrains Mono, monospace",
                    color: n === 1 ? "var(--crimson)" : "var(--text-3)", width: 14, flexShrink: 0,
                  }}>{n}.</span>
                  <input id="WeeklyView-input-2" className="line-input" style={{ fontSize: 12 }} placeholder="Priority..." />
                </div>
              ))}
            </div>
            <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "2px", padding: "18px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>Things to Remember</div>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "5px 0" }}>
                  <div style={{ width: 4, height: 4, background: "var(--crimson)", borderRadius: "50%", flexShrink: 0 }} />
                  <input id="WeeklyView-input-3" className="line-input" style={{ fontSize: 12 }} placeholder="..." />
                </div>
              ))}
            </div>
          </div>

          {/* 7-day grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
            {/* Day headers */}
            {SHORT.map((d, i) => (
              <div key={d} style={{
                background: i === 5 || i === 6 ? "var(--surface-3)" : "var(--surface-2)",
                padding: "10px 12px",
                borderBottom: "1px solid var(--border)",
              }}>
                <div className="font-mono" style={{ fontSize: 9, color: "var(--crimson)", letterSpacing: "0.12em" }}>{d}</div>
                <input id="WeeklyView-input-4" className="line-input" style={{ fontSize: 11, marginTop: 4 }} placeholder="Date" />
              </div>
            ))}

            {/* Day task columns */}
            {DAYS.map((d, i) => (
              <div key={d} style={{
                background: i === 5 || i === 6 ? "var(--surface-3)" : "var(--surface)",
                padding: "12px",
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}>
                {[1, 2, 3, 4, 5].map(j => (
                  <div key={j} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <CheckBox id={`wv-cb-0`} style={{ width: 12, height: 12 }} />
                    <input id="WeeklyView-input-5" className="line-input" style={{ fontSize: 11 }} placeholder="Task..." />
                  </div>
                ))}
                {(i === 5 || i === 6) && (
                  <div style={{ marginTop: "auto", paddingTop: 12 }}>
                    <div className="font-mono" style={{ fontSize: 8, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 4 }}>WEEKEND</div>
                    <input id="WeeklyView-input-6" className="line-input" style={{ fontSize: 11 }} placeholder="Relaxation..." />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Important tasks + notes */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
            <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "2px", padding: "18px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>Important Tasks This Week</div>
              {[1, 2, 3].map(i => (
            <div key={'t'+i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "4px 0" }}>
              <CheckBox id={`wv-todo-cb-${i}`} style={{ width: 14, height: 14 }} />
              <input id={`wv-todo-in-${i}`} className="line-input" style={{ fontSize: 12 }} placeholder="Add task..." />
            </div>
          ))}
              {[1, 2].map(i => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "4px 0" }}>
                  <CheckBox id={`wv-cb-1`} style={{ width: 14, height: 14 }} />
                  <input id="WeeklyView-input-7" className="line-input" style={{ fontSize: 12 }} placeholder="Add task..." />
                </div>
              ))}
            </div>
            <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "2px", padding: "18px" }}>
              <div className="section-label" style={{ marginBottom: 10 }}>Notes</div>
              <textarea id="WeeklyView-textarea-8" style={{
                background: "transparent", border: "none", color: "var(--text)",
                fontFamily: "Inter, sans-serif", fontSize: 13,
                width: "100%", resize: "none", outline: "none", lineHeight: 1.7, minHeight: 100,
              }} placeholder="Weekly notes, reminders, ideas..." />
            </div>
          </div>
        </div>
      )}

      {view === "reflect" && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 28px" }}>
          {[
            { label: "My Wins", prompt: "What did I accomplish this week?", accent: true },
            { label: "What Worked", prompt: "Habits, systems, or approaches that served me well..." },
            { label: "What Didn't Work", prompt: "What got in the way or felt off..." },
            { label: "What I Learned", prompt: "Insights, lessons, observations..." },
            { label: "My Focus for Next Week", prompt: "The one thing I want to do differently or prioritize...", accent: true },
          ].map((item, i) => (
            <div key={i} style={{
              marginBottom: 24,
              padding: "24px",
              background: item.accent ? "var(--surface-2)" : "transparent",
              border: item.accent ? "1px solid var(--border-red)" : "1px solid var(--border)",
              borderRadius: "2px",
            }}>
              <div className="section-label" style={{ marginBottom: 8, color: item.accent ? "var(--crimson)" : undefined }}>{item.label}</div>
              <textarea id="WeeklyView-textarea-9" style={{
                background: "transparent", border: "none", color: "var(--text)",
                fontFamily: item.accent ? "Fraunces, serif" : "Inter, sans-serif",
                fontStyle: item.accent ? "italic" : "normal",
                fontSize: item.accent ? 17 : 14,
                width: "100%", resize: "none", outline: "none", lineHeight: 1.7, minHeight: 70,
              }} placeholder={item.prompt} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
