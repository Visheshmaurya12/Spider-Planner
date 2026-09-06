import { useState } from "react";
import CheckBox from "./CheckBox";

type Version = "productivity" | "balanced" | "deepwork" | "soft";

const VERSIONS: { id: Version; label: string; sub: string }[] = [
  { id: "productivity", label: "Productivity", sub: "Time blocks + priorities" },
  { id: "balanced", label: "Balanced Life", sub: "Work + wellness" },
  { id: "deepwork", label: "Deep Work", sub: "Single focus sessions" },
  { id: "soft", label: "Soft Productivity", sub: "Mindful + gentle" },
];

const HOURS = [
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM",
];

const MOODS = ["😌", "😊", "😐", "😤", "😔", "🔥", "✨", "🌿"];

function CheckBox({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
      <CheckBox id={`dp-cb-3`} onClick={() => setChecked(c => !c)} />
      <span style={{ fontSize: 13, color: checked ? "var(--text-3)" : "var(--text)", textDecoration: checked ? "line-through" : "none", textDecorationColor: "var(--text-3)" }}>{label}</span>
    </div>
  );
}

function TimeBlock({ hour }: { hour: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: 1 }}>
      <div className="font-mono" style={{ fontSize: 9, color: "var(--text-3)", width: 52, flexShrink: 0, paddingTop: 6, letterSpacing: "0.05em" }}>{hour}</div>
      <div style={{ flex: 1, borderTop: "1px solid var(--border)", paddingTop: 4, minHeight: 28 }}>
        <input id="DailyPlanner-input-1" className="line-input" style={{ fontSize: 13 }} placeholder="" />
      </div>
    </div>
  );
}

function PriorityRow({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
      <div style={{
        width: 20, height: 20, borderRadius: "50%",
        background: n === 1 ? "var(--crimson)" : n === 2 ? "rgba(180,120,40,0.25)" : "rgba(60,120,80,0.2)",
        color: n === 1 ? "white" : n === 2 ? "#c48a30" : "#5aab7a",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 9, fontFamily: "JetBrains Mono, monospace", fontWeight: 500, flexShrink: 0,
      }}>{n}</div>
      <input id="DailyPlanner-input-2" className="line-input" style={{ fontSize: 13 }} placeholder="Priority task..." />
    </div>
  );
}

function ProductivityLayout() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
      {/* Left: schedule */}
      <div style={{ borderRight: "1px solid var(--border)", padding: "28px 24px" }}>
        <div className="section-label" style={{ marginBottom: 20 }}>Time Blocking Schedule</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {HOURS.map(h => <TimeBlock key={h} hour={h} />)}
        </div>
      </div>

      {/* Right: tasks + notes */}
      <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 28 }}>
        {/* Intention */}
        <div>
          <div className="section-label" style={{ marginBottom: 12 }}>Today's Intention</div>
          <textarea id="DailyPlanner-textarea-3" style={{
            background: "transparent", border: "none", borderBottom: "1px solid var(--border)",
            color: "var(--text)", fontFamily: "Fraunces, serif", fontSize: 18, fontStyle: "italic",
            width: "100%", resize: "none", outline: "none", lineHeight: 1.5, paddingBottom: 8,
          }} rows={2} placeholder="What intention will guide your day?" />
        </div>

        {/* Top 3 */}
        <div>
          <div className="section-label" style={{ marginBottom: 12 }}>Top 3 Priorities</div>
          <PriorityRow n={1} />
          <PriorityRow n={2} />
          <PriorityRow n={3} />
        </div>

        {/* To-do */}
        <div>
          <div className="section-label" style={{ marginBottom: 10 }}>To-Do List</div>
          {[1, 2, 3].map(i => (
            <div key={'t'+i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
              <CheckBox id={`${prefix}-todo-cb-${i}`} />
              <input id={`${prefix}-todo-in-${i}`} className="line-input" style={{ fontSize: 13 }} placeholder="Add task..." />
            </div>
          ))}
          {[1, 2, 3].map(i => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
              <CheckBox id={`dp-cb-0`} />
              <input id="DailyPlanner-input-4" className="line-input" style={{ fontSize: 13 }} placeholder="Add task..." />
            </div>
          ))}
        </div>

        {/* Do not forget */}
        <div>
          <div className="section-label" style={{ marginBottom: 10 }}>Do Not Forget</div>
          <div style={{ background: "var(--surface-2)", borderRadius: "2px", padding: 14, border: "1px solid var(--border)" }}>
            {[1, 2].map(i => (
              <input id="DailyPlanner-input-5" key={i} className="line-input" style={{ marginBottom: 8 }} placeholder="..." />
            ))}
          </div>
        </div>

        {/* Notes */}
        <div style={{ flex: 1 }}>
          <div className="section-label" style={{ marginBottom: 10 }}>Notes</div>
          <div className="dot-grid" style={{ minHeight: 100, borderRadius: "2px", padding: 12, border: "1px solid var(--border)" }}>
            <textarea id="DailyPlanner-textarea-6" style={{
              background: "transparent", border: "none", color: "var(--text)",
              fontFamily: "Inter, sans-serif", fontSize: 13, width: "100%",
              resize: "none", outline: "none", lineHeight: 1.8, minHeight: 80,
            }} placeholder="Notes, ideas, reminders..." />
          </div>
        </div>
      </div>
    </div>
  );
}

function BalancedLayout() {
  const [mood, setMood] = useState<string | null>(null);
  const [water, setWater] = useState(0);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
      <div style={{ borderRight: "1px solid var(--border)", padding: "28px 24px", display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Mood */}
        <div>
          <div className="section-label" style={{ marginBottom: 12 }}>How Do I Want To Feel Today?</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {MOODS.map(m => (
              <button key={m} onClick={() => setMood(m)} style={{
                width: 36, height: 36, borderRadius: "4px", border: `1px solid ${mood === m ? "var(--crimson)" : "var(--border)"}`,
                background: mood === m ? "var(--crimson-muted)" : "transparent",
                fontSize: 18, cursor: "pointer", transition: "all 0.15s",
              }}>{m}</button>
            ))}
          </div>
        </div>

        {/* Schedule condensed */}
        <div>
          <div className="section-label" style={{ marginBottom: 14 }}>Schedule</div>
          {HOURS.slice(0, 10).map(h => <TimeBlock key={h} hour={h} />)}
        </div>
      </div>

      <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <div className="section-label" style={{ marginBottom: 10 }}>Top Priorities</div>
          <PriorityRow n={1} />
          <PriorityRow n={2} />
          <PriorityRow n={3} />
        </div>

        <div>
          <div className="section-label" style={{ marginBottom: 10 }}>To-Do List</div>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 0" }}>
              <CheckBox id={`dp-cb-1`} />
              <input id="DailyPlanner-input-7" className="line-input" style={{ fontSize: 13 }} placeholder="Task..." />
            </div>
          ))}
        </div>

        {/* Water */}
        <div>
          <div className="section-label" style={{ marginBottom: 10 }}>Water Intake</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} onClick={() => setWater(i < water ? i : i + 1)} style={{
                width: 28, height: 36, borderRadius: "3px 3px 6px 6px",
                border: `1px solid ${i < water ? "var(--crimson)" : "var(--border)"}`,
                background: i < water ? "rgba(196,30,58,0.2)" : "transparent",
                cursor: "pointer", transition: "all 0.15s",
                display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4,
              }}>
                {i < water && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--crimson)" }} />}
              </div>
            ))}
            <span className="font-mono" style={{ fontSize: 10, color: "var(--text-3)", marginLeft: 4 }}>{water}/8 glasses</span>
          </div>
        </div>

        {/* Wellness grid */}
        {["Movement", "Meals", "Self-Care", "Gratitude"].map(section => (
          <div key={section}>
            <div className="section-label" style={{ marginBottom: 8 }}>{section}</div>
            <textarea id="DailyPlanner-textarea-8" style={{
              background: "var(--surface-2)", border: "1px solid var(--border)",
              color: "var(--text)", fontFamily: "Inter, sans-serif", fontSize: 12,
              width: "100%", resize: "none", outline: "none", borderRadius: "2px",
              padding: "8px 10px", lineHeight: 1.6,
            }} rows={2} placeholder={`${section} notes...`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function DeepWorkLayout() {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
      {/* Hero focus */}
      <div style={{
        background: "var(--crimson)",
        borderRadius: "2px",
        padding: "32px 36px",
        marginBottom: 32,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", border: "40px solid rgba(255,255,255,0.05)" }} />
        <div className="font-mono" style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>Main Focus</div>
        <textarea id="DailyPlanner-textarea-9" style={{
          background: "transparent", border: "none",
          color: "white", fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 600,
          width: "100%", resize: "none", outline: "none", lineHeight: 1.3,
        }} rows={2} placeholder="The one thing I'm working on today..." />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* The one thing */}
        <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "2px", padding: "20px 20px" }}>
          <div className="section-label" style={{ marginBottom: 10 }}>The One Thing I Must Complete</div>
          <textarea id="DailyPlanner-textarea-10" style={{
            background: "transparent", border: "none", color: "var(--text)",
            fontFamily: "Inter, sans-serif", fontSize: 13,
            width: "100%", resize: "none", outline: "none", lineHeight: 1.6, minHeight: 60,
          }} placeholder="Non-negotiable..." />
        </div>

        {/* Distractions */}
        <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "2px", padding: "20px 20px" }}>
          <div className="section-label" style={{ marginBottom: 10 }}>Distractions to Avoid</div>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "4px 0" }}>
              <div style={{ width: 4, height: 4, background: "var(--crimson)", borderRadius: "50%", flexShrink: 0 }} />
              <input id="DailyPlanner-input-11" className="line-input" style={{ fontSize: 12 }} placeholder="..." />
            </div>
          ))}
        </div>
      </div>

      {/* Deep work sessions */}
      <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "2px", padding: "20px 20px", marginBottom: 20 }}>
        <div className="section-label" style={{ marginBottom: 14 }}>Deep Work Sessions</div>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr 80px", gap: 12, alignItems: "center", paddingBottom: 10, marginBottom: 10, borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
            <input id="DailyPlanner-input-12" className="line-input" style={{ fontSize: 11, textAlign: "center" }} placeholder="Time" />
            <input id="DailyPlanner-input-13" className="line-input" style={{ fontSize: 13 }} placeholder={`Session ${i} focus...`} />
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", border: "1px solid var(--text-3)" }} />
              <span className="font-mono" style={{ fontSize: 9, color: "var(--text-3)" }}>Done</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Task breakdown */}
        <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "2px", padding: "20px 20px" }}>
          <div className="section-label" style={{ marginBottom: 10 }}>Task Breakdown</div>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "5px 0" }}>
              <CheckBox id={`dp-cb-2`} style={{ width: 14, height: 14 }} />
              <input id="DailyPlanner-input-14" className="line-input" style={{ fontSize: 12 }} placeholder="Subtask..." />
            </div>
          ))}
        </div>

        {/* Small wins */}
        <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "2px", padding: "20px 20px" }}>
          <div className="section-label" style={{ marginBottom: 10 }}>Small Wins</div>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
              <input id="DailyPlanner-input-15" className="line-input" style={{ fontSize: 12 }} placeholder="..." />
            </div>
          ))}
          <div style={{ marginTop: 16 }}>
            <div className="section-label" style={{ marginBottom: 8 }}>Notes</div>
            <textarea id="DailyPlanner-textarea-16" style={{
              background: "transparent", border: "none", color: "var(--text)",
              fontFamily: "Inter, sans-serif", fontSize: 12, width: "100%",
              resize: "none", outline: "none", lineHeight: 1.7, minHeight: 60,
            }} placeholder="Thoughts..." />
          </div>
        </div>
      </div>
    </div>
  );
}

function SoftLayout() {
  const [mood, setMood] = useState<number | null>(null);
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "36px 24px" }}>
      {/* Mood */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Today's Mood</div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          {[1, 2, 3, 4, 5].map(v => (
            <button key={v} onClick={() => setMood(v)} style={{
              width: 44, height: 44, borderRadius: "50%",
              border: `1px solid ${mood === v ? "var(--crimson)" : "var(--border)"}`,
              background: mood === v ? "var(--crimson)" : "transparent",
              color: mood === v ? "white" : "var(--text-3)",
              fontSize: 13, cursor: "pointer", transition: "all 0.2s",
              fontFamily: "JetBrains Mono, monospace",
            }}>{v}</button>
          ))}
        </div>
        {mood && <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 8 }}>
          {["Very Low", "Low", "Okay", "Good", "Wonderful"][mood - 1]}
        </p>}
      </div>

      {/* Intention */}
      <div style={{ textAlign: "center", marginBottom: 36, padding: "24px", border: "1px solid var(--border-red)", borderRadius: "2px" }}>
        <div className="section-label" style={{ marginBottom: 12 }}>My Intention</div>
        <textarea id="DailyPlanner-textarea-17" style={{
          background: "transparent", border: "none", color: "var(--text)",
          fontFamily: "Fraunces, serif", fontStyle: "italic", fontSize: 20, textAlign: "center",
          width: "100%", resize: "none", outline: "none", lineHeight: 1.5,
        }} rows={2} placeholder="Today, I choose to..." />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div>
          <div className="section-label" style={{ marginBottom: 10 }}>Important Tasks</div>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 0" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", border: "1px solid var(--text-3)", flexShrink: 0 }} />
              <input id="DailyPlanner-input-18" className="line-input" style={{ fontSize: 13 }} placeholder="Task..." />
            </div>
          ))}
        </div>
        <div>
          <div className="section-label" style={{ marginBottom: 10 }}>Gentle Reminders</div>
          {["Drink water", "Take breaks", "Breathe deeply"].map(r => (
            <div key={r} style={{ padding: "6px 0", borderBottom: "1px solid var(--border)", fontSize: 13, color: "var(--text-2)" }}>
              <span style={{ color: "var(--crimson)", marginRight: 8 }}>♡</span>{r}
            </div>
          ))}
          <div style={{ padding: "6px 0" }}>
            <input id="DailyPlanner-input-19" className="line-input" style={{ fontSize: 13 }} placeholder="Add reminder..." />
          </div>
        </div>
      </div>

      {["Self-Care", "Something Beautiful Today", "Gratitude", "Evening Reflection"].map(section => (
        <div key={section} style={{ marginBottom: 16, padding: "16px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "2px" }}>
          <div className="section-label" style={{ marginBottom: 8 }}>{section}</div>
          <textarea id="DailyPlanner-textarea-20" style={{
            background: "transparent", border: "none", color: "var(--text)",
            fontFamily: "Inter, sans-serif", fontSize: 13,
            width: "100%", resize: "none", outline: "none", lineHeight: 1.7,
          }} rows={2} placeholder={`${section}...`} />
        </div>
      ))}
    </div>
  );
}

export default function DailyPlanner() {
  const [version, setVersion] = useState<Version>("productivity");

  return (
    <div>
      {/* Header */}
      <div style={{ padding: "28px 28px 0", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div className="section-label" style={{ marginBottom: 6 }}>Daily Planner</div>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)" }}>
              Plan with intention
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input id="DailyPlanner-input-21" type="date" style={{
              background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "2px",
              color: "var(--text-2)", fontFamily: "JetBrains Mono, monospace", fontSize: 11,
              padding: "6px 12px", outline: "none", letterSpacing: "0.05em",
            }} />
          </div>
        </div>

        {/* Version selector */}
        <div style={{ display: "flex", gap: 0, borderBottom: "none" }}>
          {VERSIONS.map(v => (
            <button key={v.id} onClick={() => setVersion(v.id)} style={{
              padding: "10px 20px 12px",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${version === v.id ? "var(--crimson)" : "transparent"}`,
              color: version === v.id ? "var(--text)" : "var(--text-3)",
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: 12,
              fontFamily: "Inter, sans-serif",
              fontWeight: version === v.id ? 500 : 400,
            }}>
              {v.label}
              <div style={{ fontSize: 10, color: "var(--text-3)", marginTop: 1 }}>{v.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div style={{ background: "var(--surface)" }}>
        {version === "productivity" && <ProductivityLayout />}
        {version === "balanced" && <BalancedLayout />}
        {version === "deepwork" && <DeepWorkLayout />}
        {version === "soft" && <SoftLayout />}
      </div>
    </div>
  );
}
