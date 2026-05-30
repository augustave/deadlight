// ═══════════════════════════════════════════
// DEADLIGHT DESIGN TOKENS
// The color + type protocol, made executable.
//
// Principle 03 — COLOR IS FUNCTIONAL: functional accents carry meaning and
// nothing else. Neutrals form the ground + text ramp. This module is the single
// source for those values; the spec the rulebook documents is the same spec the
// code renders with. Magic hex strings should resolve here, not be re-typed.
//
// NOTE: values inside artifact DATA arrays (e.g. COLOR_PROTOCOL swatches) are
// the SUBJECT MATTER of the spec — they stay literal. Tokens govern STYLING.
// ═══════════════════════════════════════════

// Functional accents — each maps to one meaning (Principle 03).
export const accent = {
  chartreuse: "#BFFF00", // TARGETING / ACTIVE DETECTION
  red: "#FF2D55", // THREAT / COST / ADVERSARY
  blue: "#007AFF", // ALLIED / FRIENDLY / STRUCTURAL
  blueLt: "#7aafff", // strategic-analysis / ancestry (UI accent)
  tan: "#c49a6c", // narrative / dossier (UI accent)
  purple: "#9b7aff", // process / progression (UI accent)
};

// Extended palette — R&D ground and optional density relief.
export const material = {
  celadon: "#8FA89A", // R&D collage ground
  amber: "#D4956A", // data-density relief (optional)
};

// Documented base tones (also appear as swatch data — kept here for styling use).
export const base = {
  dark: "#1a1a1a", // BASE DARK — primary ground
  light: "#f5f0eb", // BASE LIGHT — document ground
};

// Surface ramp — backgrounds from canvas to raised.
export const ground = {
  canvas: "#0d0d0d",
  card: "#080808",
  inset: "#0a0a0a",
  raised: "#151515",
};

// Border ramp — all hairlines (each value equals its 6-digit form).
export const border = {
  faint: "#111",
  subtle: "#1a1a1a",
  mid: "#222",
  xstrong: "#2a2a2a",
  strong: "#333",
};

// Text ramp — brightest to faintest.
export const text = {
  hi: "#f0f0f0",
  bright: "#e0e0e0",
  pale: "#ddd",
  primary: "#ccc",
  body: "#c8c8c8",
  soft: "#aaa",
  secondary: "#999",
  muted: "#888",
  dim: "#777",
  faint: "#666",
  fainter: "#555",
  ghost: "#444",
  ghoster: "#333",
};

// Type registers — font stacks (Principle: type register encodes voice).
export const font = {
  mono: "'SF Mono','Fira Code','Consolas',monospace", // SYSTEMS / FIELD REPORT
  display: "'Arial Black','Helvetica Neue',sans-serif", // COMMAND
  serif: "'Georgia','Times New Roman',serif", // INSTITUTIONAL
};

// Content-function → accent map (rulebook signature deck, decision matrix).
export const fnColor = {
  "IMPACT / THESIS": accent.red,
  "COVER / TITLE": text.ghost,
  "NARRATIVE CONTEXT": accent.tan,
  "TECHNICAL EXPLAINER": accent.chartreuse,
  "STRATEGIC ANALYSIS": accent.blueLt,
  "DATA / REFERENCE": text.muted,
  "PROCESS / PROGRESSION": accent.purple,
};

// Slide-intensity → accent ramp (signature deck pacing bars).
export const intColor = (v) =>
  v >= 85 ? accent.red : v >= 60 ? accent.chartreuse : v >= 40 ? text.fainter : border.xstrong;
