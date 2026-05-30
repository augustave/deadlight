// ═══════════════════════════════════════════
// VISUAL SPECIMENS
// The rulebook describes material + type registers; these render them.
// A visual system spec should show its registers, not only name them
// (Principle 02 — MATERIAL IS MEANING; Principle 04 — SCALE IS ACCOUNTABILITY).
// CSS-only textures — no binary assets — so the viewer stays self-contained.
// ═══════════════════════════════════════════
import { specimen, font, accent as hue } from "../tokens.js";

const TILE = {
  height: 104,
  borderRadius: 3,
  overflow: "hidden",
  position: "relative",
  border: "1px solid rgba(255,255,255,0.08)",
};

// One texture per material register. Keyed by register name (uppercase).
const MATERIAL_TEXTURE = {
  DOSSIER: () => {
    const s = specimen.dossier;
    return (
      <div
        style={{
          ...TILE,
          background: `
            radial-gradient(circle at 18% 30%, rgba(120,90,60,0.18) 0 6px, transparent 7px),
            radial-gradient(circle at 70% 65%, rgba(120,90,60,0.16) 0 5px, transparent 6px),
            radial-gradient(circle at 88% 20%, rgba(120,90,60,0.14) 0 4px, transparent 5px),
            linear-gradient(155deg, ${s.bg} 0%, #c0ac86 100%)`,
        }}
      >
        <div style={{ position: "absolute", inset: 0, borderTop: `2px solid rgba(58,48,38,0.35)`, margin: 10 }} />
        <div style={{ position: "absolute", top: 10, left: 12, fontFamily: font.mono, fontSize: 8, letterSpacing: 2, color: s.ink }}>OFFICE FILE / 1968</div>
        <div style={{ position: "absolute", bottom: 10, left: 12, padding: "2px 8px", background: s.accent, color: "#f5efe6", fontFamily: font.mono, fontSize: 8, letterSpacing: 3, fontWeight: 700 }}>CONFIDENTIAL</div>
      </div>
    );
  },
  HARDWARE: () => {
    const s = specimen.hardware;
    const rivets = "radial-gradient(circle at center, #4a5158 0 2px, transparent 3px)";
    return (
      <div style={{ ...TILE, background: `linear-gradient(135deg, ${s.bg} 0%, #14171a 100%)` }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: rivets, backgroundSize: "26px 26px", backgroundPosition: "13px 13px", opacity: 0.7 }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 14, transform: "translateX(-50%)", background: "linear-gradient(90deg,#2b3036,#3a4047,#2b3036)" }} />
        <div style={{ position: "absolute", bottom: 10, left: 12, fontFamily: font.mono, fontSize: 8, letterSpacing: 2, color: s.ink }}>PELICAN-1620 // FIELD</div>
      </div>
    );
  },
  "GRID PAPER": () => {
    const s = specimen.grid;
    const grid = `repeating-linear-gradient(0deg, rgba(93,127,166,0.30) 0 1px, transparent 1px 16px),
                  repeating-linear-gradient(90deg, rgba(93,127,166,0.30) 0 1px, transparent 1px 16px)`;
    return (
      <div style={{ ...TILE, background: s.bg }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: grid }} />
        <div style={{ position: "absolute", top: "55%", left: 14, right: 40, height: 2, background: s.ink, transform: "rotate(-4deg)" }} />
        <div style={{ position: "absolute", top: 10, left: 12, fontFamily: font.mono, fontSize: 8, letterSpacing: 2, color: s.accent }}>ENGINEERING PAD</div>
      </div>
    );
  },
  TERMINAL: () => {
    const s = specimen.terminal;
    return (
      <div style={{ ...TILE, background: s.bg, fontFamily: font.mono }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 16, background: s.accent, color: "#0a0f0c", fontSize: 8, letterSpacing: 3, fontWeight: 700, display: "flex", alignItems: "center", paddingLeft: 10 }}>// SECURE TERMINAL</div>
        {[28, 44, 60, 76].map((t, i) => (
          <div key={t} style={{ position: "absolute", top: t, left: 12, fontSize: 8, color: s.ink, opacity: 1 - i * 0.18 }}>
            {["status: nominal", "node: 0x4F2A", "feed: EO/IR ····", "auth: ✓ verified"][i]}
          </div>
        ))}
      </div>
    );
  },
  CINEMATIC: () => {
    const s = specimen.cinematic;
    return (
      <div
        style={{
          ...TILE,
          background: `radial-gradient(120% 80% at 30% 120%, rgba(134,167,173,0.40) 0%, transparent 55%),
                       radial-gradient(80% 60% at 85% -10%, rgba(255,45,85,0.30) 0%, transparent 60%),
                       linear-gradient(180deg, #0c1518 0%, #060b0d 100%)`,
        }}
      >
        <div style={{ position: "absolute", left: "32%", top: "60%", width: 1, height: 60, background: s.accent, boxShadow: `0 0 12px ${s.accent}`, transform: "rotate(20deg)" }} />
        <div style={{ position: "absolute", bottom: 10, left: 12, fontFamily: font.mono, fontSize: 8, letterSpacing: 2, color: s.ink }}>INFLECTION · MAX 2 / DECK</div>
      </div>
    );
  },
  DOCUMENTARY: () => {
    const s = specimen.documentary;
    const corner = (pos) => (
      <div style={{ position: "absolute", ...pos, width: 14, height: 14, border: `1px solid ${s.ink}`, opacity: 0.6 }} />
    );
    return (
      <div style={{ ...TILE, background: `linear-gradient(180deg, #4a4f52 0%, #2e3336 100%)`, filter: "saturate(0.6)" }}>
        {corner({ top: 10, left: 10, borderRight: 0, borderBottom: 0 })}
        {corner({ top: 10, right: 10, borderLeft: 0, borderBottom: 0 })}
        {corner({ bottom: 10, left: 10, borderRight: 0, borderTop: 0 })}
        {corner({ bottom: 10, right: 10, borderLeft: 0, borderTop: 0 })}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 18, height: 1, background: s.ink, transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 1, height: 18, background: s.ink, transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "absolute", bottom: 10, left: 12, fontFamily: font.mono, fontSize: 8, letterSpacing: 2, color: s.ink }}>RECON · NO HEROIC ANGLE</div>
      </div>
    );
  },
};

export function MaterialSpecimen({ name }) {
  const render = MATERIAL_TEXTURE[name];
  if (!render) return null;
  return render();
}

// Live type specimens — each register rendered in its own voice + scale.
const TYPE_SAMPLE = {
  COMMAND: { text: "SCALE IS ACCOUNTABILITY", style: { fontFamily: font.display, fontWeight: 900, fontSize: 30, letterSpacing: -1, lineHeight: 0.95, color: "#f0f0f0", textTransform: "uppercase" } },
  SYSTEMS: { text: "classification: unclass // node 0x4f2a // v2.0.0", style: { fontFamily: font.mono, fontSize: 12, letterSpacing: 0.5, color: hue.chartreuse } },
  INSTITUTIONAL: { text: "Doctrine. Policy. Standards.", style: { fontFamily: font.serif, fontSize: 20, color: "#d8d4cc" } },
  "FIELD REPORT": { text: "operator on station. comms nominal. no further traffic.", style: { fontFamily: font.mono, fontSize: 13, textTransform: "lowercase", color: "#b8b8b8" } },
  PRODUCT: { text: "CVA-1 · REMI · PROTCTR", style: { fontFamily: font.display, fontWeight: 700, fontSize: 18, letterSpacing: 1, color: "#e6e6e6" } },
};

export function TypeSpecimen({ name }) {
  const s = TYPE_SAMPLE[name];
  if (!s) return null;
  return (
    <div style={{ padding: "14px 12px", background: "#060606", border: "1px solid #161616", borderRadius: 3, overflow: "hidden" }}>
      <div style={s.style}>{s.text}</div>
    </div>
  );
}
