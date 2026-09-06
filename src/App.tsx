import { useState, useEffect } from "react";
import Cover from "./components/Cover";
import DailyPlanner from "./components/DailyPlanner";
import WeeklyView from "./components/WeeklyView";
import HabitTracker from "./components/HabitTracker";
import WellnessPage from "./components/WellnessPage";
import ReflectionPage from "./components/ReflectionPage";
import GoalsPage from "./components/GoalsPage";
import BrainDump from "./components/BrainDump";

type Page = "cover" | "daily" | "weekly" | "habits" | "wellness" | "reflection" | "goals" | "brain";

const NAV: { id: Page; label: string }[] = [
  { id: "cover", label: "Home" },
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "habits", label: "Habits" },
  { id: "wellness", label: "Wellness" },
  { id: "reflection", label: "Reflect" },
  { id: "goals", label: "Goals" },
  { id: "brain", label: "Brain Dump" },
];

export default function App() {
// Run when page changes to catch newly mounted inputs

  const [page, setPage] = useState<Page>("cover");
  useEffect(() => {
    function handleInput(e: Event) {
      const target = e.target as HTMLElement;
      if ((target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') && target.id) {
        if ((target as HTMLInputElement).type === 'checkbox') {
           localStorage.setItem(target.id, JSON.stringify((target as HTMLInputElement).checked));
        } else {
           localStorage.setItem(target.id, (target as HTMLInputElement).value);
        }
      }
    }
    document.querySelectorAll('input[id], textarea[id]').forEach(el => {
      const saved = localStorage.getItem(el.id);
      if (saved !== null) {
        if ((el as HTMLInputElement).type === 'checkbox') {
          (el as HTMLInputElement).checked = JSON.parse(saved);
        } else {
          (el as HTMLInputElement).value = saved;
        }
      }
    });
    document.addEventListener('input', handleInput);
    return () => document.removeEventListener('input', handleInput);
  }, [page]);


  function go(p: Page) { setPage(p); }

  return (
    <div style={{ minHeight: "100%", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      {/* Top nav */}
      <nav style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0" }}>
          <div style={{
            width: 28, height: 28,
            background: "var(--crimson)",
            borderRadius: "2px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="2" width="4" height="4" rx="0.5" fill="white" opacity="0.9"/>
              <rect x="8" y="2" width="4" height="4" rx="0.5" fill="white" opacity="0.6"/>
              <rect x="2" y="8" width="4" height="4" rx="0.5" fill="white" opacity="0.6"/>
              <rect x="8" y="8" width="4" height="4" rx="0.5" fill="white" opacity="0.3"/>
            </svg>
          </div>
          <span className="font-display" style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.02em", color: "var(--text)" }}>
            The Daily Edit
          </span>
        </div>

        {/* Nav items */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto" }}>
          {NAV.map(n => (
            <button key={n.id} className={`nav-btn${page === n.id ? " active" : ""}`} onClick={() => go(n.id)}>
              {n.label}
            </button>
          ))}
        </div>

        {/* Date badge */}
        <div className="font-mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em" }}>
          {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()}
        </div>
      </nav>

      {/* Page content */}
      <main style={{ flex: 1, overflow: "auto" }}>
        {page === "cover" && <Cover onStart={() => go("daily")} />}
        {page === "daily" && <DailyPlanner />}
        {page === "weekly" && <WeeklyView />}
        {page === "habits" && <HabitTracker />}
        {page === "wellness" && <WellnessPage />}
        {page === "reflection" && <ReflectionPage />}
        {page === "goals" && <GoalsPage />}
        {page === "brain" && <BrainDump />}
      </main>
    </div>
  );
}
