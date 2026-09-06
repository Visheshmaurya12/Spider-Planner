import { useState, useEffect } from "react";

const DEFAULT_HABITS = [
  "Morning meditation",
  "Exercise",
  "Read 20 pages",
  "Drink 8 glasses of water",
  "No social media before 9am",
  "Journal",
  "Walk outside",
  "",
  "",
  "",
];

const DAYS_31 = Array.from({ length: 31 }, (_, i) => i + 1);

export default function HabitTracker() {
  const [habits, setHabits] = useState(() => { const s = localStorage.getItem("ht-habits"); return s ? JSON.parse(s) : (DEFAULT_HABITS); });
  useEffect(() => localStorage.setItem("ht-habits", JSON.stringify(habits)), [habits]);
  const [grid, setGrid] = useState(() => { const s = localStorage.getItem("ht-grid"); return s ? JSON.parse(s) : ({}); });
  useEffect(() => localStorage.setItem("ht-grid", JSON.stringify(grid)), [grid]);

  function toggleCell(habit: number, day: number) {
    const key = `${habit}-${day}`;
    setGrid(g => ({ ...g, [key]: !g[key] }));
  }

  function countForHabit(i: number) {
    return DAYS_31.filter(d => grid[`${i}-${d}`]).length;
  }

  function updateHabit(i: number, val: string) {
    setHabits(h => h.map((x, j) => j === i ? val : x));
  }

  return (
    <div>
      <div style={{ padding: "28px 28px 20px", borderBottom: "1px solid var(--border)" }}>
        <div className="section-label" style={{ marginBottom: 6 }}>Monthly View</div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Habit Tracker
          </h2>
          <div className="font-mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em" }}>
            DAYS 1–31
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 28px", overflowX: "auto" }}>
        <div style={{ minWidth: 900 }}>
          {/* Grid header */}
          <div style={{ display: "grid", gridTemplateColumns: "200px repeat(31, 22px) 60px", gap: 4, marginBottom: 8, alignItems: "center" }}>
            <div className="font-mono" style={{ fontSize: 9, color: "var(--text-3)", letterSpacing: "0.1em" }}>HABIT</div>
            {DAYS_31.map(d => (
              <div key={d} className="font-mono" style={{
                fontSize: 9, color: d % 7 === 0 || d % 7 === 6 ? "var(--crimson)" : "var(--text-3)",
                textAlign: "center", letterSpacing: "0.05em",
              }}>{d}</div>
            ))}
            <div className="font-mono" style={{ fontSize: 9, color: "var(--text-3)", textAlign: "center", letterSpacing: "0.05em" }}>TOTAL</div>
          </div>

          <div className="rule" style={{ marginBottom: 12 }} />

          {/* Habit rows */}
          {habits.map((habit, i) => {
            const count = countForHabit(i);
            const pct = count / 31;
            return (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "200px repeat(31, 22px) 60px",
                gap: 4, alignItems: "center", marginBottom: 6,
              }}>
                <input id="HabitTracker-input-1"
                  className="line-input"
                  style={{ fontSize: 12, paddingRight: 8 }}
                  value={habit}
                  onChange={e => updateHabit(i, e.target.value)}
                  placeholder={`Habit ${i + 1}...`}
                />
                {DAYS_31.map(d => (
                  <div
                    key={d}
                    className={`habit-cell${grid[`${i}-${d}`] ? " filled" : ""}`}
                    onClick={() => toggleCell(i, d)}
                  />
                ))}
                <div style={{ textAlign: "center" }}>
                  <div className="font-mono" style={{ fontSize: 11, color: count > 0 ? "var(--text)" : "var(--text-3)" }}>{count}</div>
                  <div style={{ height: 3, background: "var(--surface-3)", borderRadius: "1px", marginTop: 2 }}>
                    <div style={{ height: "100%", width: `${pct * 100}%`, background: "var(--crimson)", borderRadius: "1px", transition: "width 0.3s" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Month summary */}
        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {[
            { label: "Best Streak", value: (() => {
    let max = 0;
    let curr = 0;
    for (let d = 1; d <= 31; d++) {
        const anyDone = habits.some((_, i) => grid[`${i}-${d}`]);
        if (anyDone) curr++;
        else curr = 0;
        if (curr > max) max = curr;
    }
    return max.toString();
})(), sub: "days" },
            { label: "Total Completions", value: Object.values(grid).filter(Boolean).length.toString(), sub: "this month" },
            { label: "Completion Rate", value: `${Math.round((Object.values(grid).filter(Boolean).length / (habits.filter(h => h).length * 31)) * 100) || 0}%`, sub: "average" },
          ].map(stat => (
            <div key={stat.label} style={{
              background: "var(--surface-2)", border: "1px solid var(--border)",
              borderRadius: "2px", padding: "18px",
            }}>
              <div className="section-label" style={{ marginBottom: 8 }}>{stat.label}</div>
              <div className="font-display" style={{ fontSize: 28, fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>{stat.value}</div>
              <div className="font-mono" style={{ fontSize: 9, color: "var(--text-3)", marginTop: 4, letterSpacing: "0.1em" }}>{stat.sub.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* Monthly notes */}
        <div style={{ marginTop: 20, background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "2px", padding: "20px" }}>
          <div className="section-label" style={{ marginBottom: 10 }}>This Month's Focus</div>
          <textarea id="HabitTracker-textarea-2" style={{
            background: "transparent", border: "none", color: "var(--text)",
            fontFamily: "Fraunces, serif", fontStyle: "italic", fontSize: 16,
            width: "100%", resize: "none", outline: "none", lineHeight: 1.6,
          }} rows={2} placeholder="What does building these habits mean to you this month?" />
        </div>
      </div>
    </div>
  );
}
