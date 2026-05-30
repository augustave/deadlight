// ═══════════════════════════════════════════
// SHARED PRIMITIVES
// Extracted from the v2 rulebook so every artifact draws from one set of
// token-driven building blocks instead of re-declaring them inline.
// ═══════════════════════════════════════════
import { accent as hue, text, border, ground, font } from "../tokens.js";

export const Tag = ({ children, color = hue.chartreuse }) => (
  <span
    style={{
      fontSize: 9,
      letterSpacing: 1,
      padding: "2px 6px",
      background: `${color}12`,
      color,
      border: `1px solid ${color}30`,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

export const Card = ({ children, accent, style = {} }) => (
  <div
    style={{
      background: ground.card,
      border: `1px solid ${border.subtle}`,
      padding: 16,
      borderLeft: accent ? `3px solid ${accent}` : undefined,
      ...style,
    }}
  >
    {children}
  </div>
);

export const SectionHead = ({ label, sub }) => (
  <div style={{ marginBottom: 24 }}>
    <div
      style={{
        fontFamily: font.display,
        fontWeight: 900,
        fontSize: 22,
        color: text.hi,
        letterSpacing: -1,
      }}
    >
      {label}
    </div>
    {sub && <div style={{ fontSize: 10, color: text.fainter, marginTop: 4 }}>{sub}</div>}
  </div>
);

export const RuleRow = ({ rule, desc }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "140px 1fr",
      gap: 16,
      padding: "12px 0",
      borderBottom: `1px solid ${border.faint}`,
    }}
  >
    <div style={{ fontSize: 10, color: hue.chartreuse, letterSpacing: 2, fontWeight: 600 }}>
      {rule}
    </div>
    <div style={{ fontSize: 11, color: text.secondary, lineHeight: 1.7 }}>{desc}</div>
  </div>
);
