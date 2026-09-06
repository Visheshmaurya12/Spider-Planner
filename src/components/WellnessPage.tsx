import { useState } from "react";

type Tracker = "mood" | "energy" | "sleep" | "water" | "selfcare" | "movement" | "gratitude";

const TRACKERS: { id: Tracker; label: string; icon: string }[] = [
  { id: "mood", label: "Mood", icon: "◉" },
  { id: "energy", label: "Energy", icon: "⚡" },
  { id: "sleep", label: "Sleep", icon: "◗" },
  { id: "water", label: "Water", icon: "◎" },
  { id: "selfcare", label: "Self-Care", icon: "◈" },
  { id: "movement", label: "Movement", icon: "◈" },
  { id: "gratitude", label: "Gratitude", icon: "♡" },
];

const MOOD_LABELS = ["Very Low", "Low", "Okay", "Good", "Great", "Excellent", "Wonderful"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function MoodTracker() {
  const [week, setWeek] = useState(() => { const s = localStorage.getItem("well-week"); return s ? JSON.parse(s) : (number | null)[]>(Array(7).fill(null)); });
  useEffect(() => localStorage.setItem("well-week", JSON.stringify(week)), [week]);
  function setDay(i: number, v: number) {
    setWeek(w => w.map((x, j) => j === i ? (x === v ? null : v) : x));
  }
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, marginBottom: 24 }}>
        {DAYS.map((d, i) => (
          <div key={d}>
            <div className="font-mono" style={{ fontSize: 9, color: "var(--text-3)", letterSpacing: "0.1em", textAlign: "center", marginBottom: 8 }}>{d}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[7, 6, 5, 4, 3, 2, 1].map(v => (
                <div key={v} onClick={() => setDay(i, v)} style={{
                  height: 18,
                  background: week[i] !== null && week[i]! >= v
                    ? `rgba(196,30,58,${0.15 + (v / 7) * 0.7})`
                    : "var(--surface-3)",
                  borderRadius: "2px",
                  cursor: "pointer",
                  transition: "background 0.15s",
                  border: week[i] === v ? "1px solid var(--crimson)" : "1px solid transparent",
                }} />
              ))}
            </div>
            {week[i] !== null && (
              <div className="font-mono" style={{ fontSize: 8, color: "var(--crimson)", textAlign: "center", marginTop: 4 }}>
                {week[i]}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {MOOD_LABELS.map(l => (
          <div key={l} className="font-mono" style={{ fontSize: 8, color: "var(--text-3)", letterSpacing: "0.05em" }}>{l.split(" ")[0]}</div>
        ))}
      </div>
    </div>
  );
}

function EnergyTracker() {
  const [levels, setLevels] = useState(() => { const s = localStorage.getItem("well-levels"); return s ? JSON.parse(s) : (Array(7).fill(0)); });
  useEffect(() => localStorage.setItem("well-levels", JSON.stringify(levels)), [levels]);
  return (
    <div>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: 120, marginBottom: 16 }}>
        {DAYS.map((d, i) => (
          <div key={d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              {[5, 4, 3, 2, 1].map(v => (
                <div key={v} onClick={() => setLevels(l => l.map((x, j) => j === i ? (x === v ? 0 : v) : x))} style={{
                  height: 20,
                  background: levels[i] >= v ? "var(--crimson)" : "var(--surface-3)",
                  cursor: "pointer",
                  marginTop: 1,
                  transition: "background 0.15s",
                  opacity: levels[i] >= v ? 0.4 + (v / 5) * 0.6 : 1,
                }} />
              ))}
            </div>
            <div className="font-mono" style={{ fontSize: 8, color: "var(--text-3)" }}>{d}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="font-mono" style={{ fontSize: 8, color: "var(--text-3)" }}>LOW</span>
        <span className="font-mono" style={{ fontSize: 8, color: "var(--text-3)" }}>HIGH</span>
      </div>
    </div>
  );
}

function SleepTracker() {
  const [hours, setHours] = useState(() => { const s = localStorage.getItem("well-hours"); return s ? JSON.parse(s) : (Array(7).fill(0)); });
  useEffect(() => localStorage.setItem("well-hours", JSON.stringify(hours)), [hours]);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
        {DAYS.map((d, i) => (
          <div key={d} style={{ textAlign: "center" }}>
            <div className="font-mono" style={{ fontSize: 9, color: "var(--text-3)", marginBottom: 8 }}>{d}</div>
            <div style={{
              position: "relative",
              width: "100%", height: 80,
              background: "var(--surface-3)",
              borderRadius: "20px",
              overflow: "hidden",
              cursor: "pointer",
            }} onClick={() => setHours(h => h.map((x, j) => j === i ? (x >= 10 ? 0 : x + 1) : x))}>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: `${(hours[i] / 10) * 100}%`,
                background: hours[i] >= 7 ? "var(--crimson)" : hours[i] >= 6 ? "rgba(196,30,58,0.5)" : "rgba(196,30,58,0.25)",
                transition: "height 0.2s",
              }} />
            </div>
            <div className="font-mono" style={{ fontSize: 10, color: hours[i] >= 7 ? "var(--crimson)" : "var(--text-3)", marginTop: 4 }}>
              {hours[i]}h
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ height: 2, background: "var(--surface-3)", borderRadius: "1px", position: "relative" }}>
          <div style={{ position: "absolute", left: "70%", top: -3, width: 1, height: 8, background: "var(--crimson)" }} />
        </div>
        <div className="font-mono" style={{ fontSize: 8, color: "var(--text-3)", marginTop: 4 }}>
          Tap each day to set hours — 7h target marked
        </div>
      </div>
    </div>
  );
}

function WaterTrackerFull() {
  const [weekly, setWeekly] = useState(() => { const s = localStorage.getItem("well-weekly"); return s ? JSON.parse(s) : (Array(7).fill(0)); });
  useEffect(() => localStorage.setItem("well-weekly", JSON.stringify(weekly)), [weekly]);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12 }}>
        {DAYS.map((d, i) => (
          <div key={d}>
            <div className="font-mono" style={{ fontSize: 9, color: "var(--text-3)", textAlign: "center", marginBottom: 8 }}>{d}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {Array.from({ length: 8 }).map((_, j) => (
                <div key={j} onClick={() => setWeekly(w => w.map((x, k) => k === i ? (j < x ? j : j + 1) : x))} style={{
                  height: 20, borderRadius: "2px",
                  background: j < weekly[i] ? "var(--crimson)" : "var(--surface-3)",
                  cursor: "pointer", transition: "background 0.15s",
                  opacity: j < weekly[i] ? 0.4 + (j / 8) * 0.6 : 1,
                }} />
              ))}
            </div>
            <div className="font-mono" style={{ fontSize: 9, color: "var(--text-3)", textAlign: "center", marginTop: 4 }}>
              {weekly[i]}/8
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SelfCareTracker() {
  const activities = ["Skincare routine", "Mindful breathing", "Journaling", "Hot bath/shower", "Rest without guilt", "Creative time", "Nature walk", "Digital detox", "Nourishing meal", "Gentle stretching"];
  const [done, setDone] = useState<Set<string>>(() => { const s = localStorage.getItem("well-done"); return s ? new Set(JSON.parse(s)) : new Set(); });
  useEffect(() => localStorage.setItem("well-done", JSON.stringify([...done])), [done]);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {activities.map(a => (
        <div key={a} onClick={() => setDone(d => { const n = new Set(d); n.has(a) ? n.delete(a) : n.add(a); return n; })} style={{
          padding: "10px 14px", borderRadius: "2px",
          background: done.has(a) ? "var(--crimson-muted)" : "var(--surface-2)",
          border: `1px solid ${done.has(a) ? "var(--border-red)" : "var(--border)"}`,
          cursor: "pointer", transition: "all 0.15s",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 16, height: 16, borderRadius: "2px",
            background: done.has(a) ? "var(--crimson)" : "transparent",
            border: `1px solid ${done.has(a) ? "var(--crimson)" : "var(--text-3)"}`,
            flexShrink: 0,
            position: "relative",
          }}>
            {done.has(a) && <div style={{ position: "absolute", top: 2, left: 5, width: 5, height: 8, border: "1.5px solid white", borderTop: "none", borderLeft: "none", transform: "rotate(45deg)" }} />}
          </div>
          <span style={{ fontSize: 12, color: done.has(a) ? "var(--text)" : "var(--text-2)" }}>{a}</span>
        </div>
      ))}
    </div>
  );
}

function MovementTracker() {
  const [mins, setMins] = useState(() => { const s = localStorage.getItem("well-mins"); return s ? JSON.parse(s) : (Array(7).fill(0)); });
  useEffect(() => localStorage.setItem("well-mins", JSON.stringify(mins)), [mins]);
  const options = [0, 10, 20, 30, 45, 60, 90];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12, marginBottom: 20 }}>
        {DAYS.map((d, i) => (
          <div key={d} style={{ textAlign: "center" }}>
            <div className="font-mono" style={{ fontSize: 9, color: "var(--text-3)", marginBottom: 8 }}>{d}</div>
            <select value={mins[i]} onChange={e => setMins(m => m.map((x, j) => j === i ? Number(e.target.value) : x))} style={{
              background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)",
              fontFamily: "JetBrains Mono, monospace", fontSize: 10, borderRadius: "2px",
              padding: "4px", width: "100%", outline: "none", cursor: "pointer",
            }}>
              {options.map(o => <option key={o} value={o}>{o}m</option>)}
            </select>
            <div style={{
              height: 4, background: "var(--surface-3)", borderRadius: "2px", marginTop: 4,
            }}>
              <div style={{
                height: "100%", width: `${(mins[i] / 90) * 100}%`,
                background: mins[i] >= 30 ? "var(--crimson)" : "rgba(196,30,58,0.4)",
                borderRadius: "2px", transition: "width 0.3s",
              }} />
            </div>
          </div>
        ))}
      </div>
      <div className="font-mono" style={{ fontSize: 9, color: "var(--text-3)" }}>
        Total this week: {mins.reduce((a, b) => a + b, 0)} minutes · Goal: 150 min/week
      </div>
    </div>
  );
}

function GratitudeJournal() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{
            width: 28, height: 28, background: "var(--crimson)", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginTop: 2,
          }}>
            <span style={{ fontSize: 10, color: "white", fontFamily: "JetBrains Mono, monospace" }}>{i + 1}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div className="font-mono" style={{ fontSize: 9, color: "var(--text-3)", marginBottom: 4 }}>TODAY I AM GRATEFUL FOR</div>
            <textarea id="WellnessPage-textarea-1" style={{
              background: "transparent", border: "none", borderBottom: "1px solid var(--border)",
              color: "var(--text)", fontFamily: "Fraunces, serif", fontStyle: "italic", fontSize: 15,
              width: "100%", resize: "none", outline: "none", lineHeight: 1.5, paddingBottom: 6,
            }} rows={1} placeholder="Something I appreciate..." />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WellnessPage() {
  const [active, setActive] = useState<Tracker>("mood");

  const CONTENT: Record<Tracker, React.ReactNode> = {
    mood: <MoodTracker />,
    energy: <EnergyTracker />,
    sleep: <SleepTracker />,
    water: <WaterTrackerFull />,
    selfcare: <SelfCareTracker />,
    movement: <MovementTracker />,
    gratitude: <GratitudeJournal />,
  };

  return (
    <div>
      <div style={{ padding: "28px 28px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="section-label" style={{ marginBottom: 6 }}>Wellness Tracking</div>
        <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 20 }}>
          Body & Mind
        </h2>
        <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
          {TRACKERS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} style={{
              padding: "10px 20px 12px",
              background: "transparent", border: "none",
              borderBottom: `2px solid ${active === t.id ? "var(--crimson)" : "transparent"}`,
              color: active === t.id ? "var(--text)" : "var(--text-3)",
              cursor: "pointer", transition: "all 0.2s",
              fontSize: 12, fontFamily: "Inter, sans-serif",
              fontWeight: active === t.id ? 500 : 400, whiteSpace: "nowrap",
            }}>
              <span style={{ marginRight: 6 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "36px 28px" }}>
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "2px",
          padding: "28px",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
            <h3 className="font-display" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>
              {TRACKERS.find(t => t.id === active)?.label} Tracker
            </h3>
            <div className="font-mono" style={{ fontSize: 9, color: "var(--text-3)", letterSpacing: "0.1em" }}>WEEKLY VIEW</div>
          </div>
          {CONTENT[active]}
        </div>
      </div>
    </div>
  );
}
