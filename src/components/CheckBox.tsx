import { useState } from "react";

export default function CheckBox({ label, id, style }: { label?: string; id: string; style?: React.CSSProperties }) {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem(id);
    return saved ? JSON.parse(saved) : false;
  });

  function toggle() {
    const next = !checked;
    setChecked(next);
    localStorage.setItem(id, JSON.stringify(next));
  }

  if (label) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
        <div className={`check-box${checked ? " checked" : ""}`} onClick={toggle} style={style} />
        <span style={{ fontSize: 13, color: checked ? "var(--text-3)" : "var(--text)", textDecoration: checked ? "line-through" : "none", textDecorationColor: "var(--text-3)" }}>{label}</span>
      </div>
    );
  }

  return <div className={`check-box${checked ? " checked" : ""}`} onClick={toggle} style={style} />;
}
