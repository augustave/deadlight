import { useState } from "react";

const CONTENT_FUNCTIONS = [
  {
    id: "impact",
    name: "IMPACT / THESIS",
    description: "Full-bleed statement frames. Single argument. Room-stopping.",
    examples: "KINETICS crosshair, Munitions deficit, Future of Defense",
    material: "CINEMATIC or DOSSIER",
    materialNote: "Cinematic for keynotes/investor; Dossier for acquisition/DoD",
    type: "COMMAND",
    typeNote: "Heavy condensed sans. 60%+ frame width. 6 words maximum.",
    color: "BASE + ONE ACCENT",
    colorNote: "Chartreuse for opportunity. Red for threat. Never both.",
    composition: "FULL BLEED TYPE",
    compositionNote: "Edge-to-edge. No margins. Type IS the frame.",
  },
  {
    id: "cover",
    name: "COVER / TITLE",
    description: "Deck openers. Classification headers. Document identity.",
    examples: "C2 Dossier, Napoleon Maxims, Palantir Edge AI",
    material: "TERMINAL or DOSSIER",
    materialNote: "Terminal for system docs. Dossier for narrative/historical.",
    type: "COMMAND + SYSTEMS",
    typeNote: "Title in condensed sans. Metadata stack in monospace below.",
    color: "BASE ONLY",
    colorNote: "No accent on covers. Let the type do the work.",
    composition: "CENTERED STACK",
    compositionNote: "Title block centered or offset. Metadata anchored bottom-left.",
  },
  {
    id: "context",
    name: "NARRATIVE CONTEXT",
    description: "Scene-setting. Historical anchoring. Emotional priming.",
    examples: "Operation Epic Fury, Software Crucible, Ukraine Reality",
    material: "DOSSIER",
    materialNote: "Aged paper, foxing, wear marks. Must feel like primary source.",
    type: "FIELD REPORT + COMMAND",
    typeNote: "Body in lowercase monospace. Key stat in condensed sans.",
    color: "BASE + RED (threat only)",
    colorNote: "Red reserved for adversary/cost data. Chartreuse never appears here.",
    composition: "ASYMMETRIC SPLIT",
    compositionNote: "Text block left, visual element right. Or full-width text with inset callout.",
  },
  {
    id: "explainer",
    name: "TECHNICAL EXPLAINER",
    description: "How something works. Mechanism diagrams. Process flows.",
    examples: "Polygons in Disguise, RFC 7946 timeline",
    material: "GRID PAPER",
    materialNote: "Engineering pad background. Working-document feel. Draft energy.",
    type: "INSTITUTIONAL + SYSTEMS",
    typeNote: "Title in serif or clean sans. Labels in monospace. Body in serif.",
    color: "BASE + CHARTREUSE (nodes only)",
    colorNote: "Green marks operative coordinates/nodes. Background stays neutral.",
    composition: "DIAGRAM + CALLOUT",
    compositionNote: "Primary diagram with zoom/detail inset. Callout lines connect scales.",
  },
  {
    id: "analysis",
    name: "STRATEGIC ANALYSIS",
    description: "2×2 matrices. Tension diagrams. Position mapping.",
    examples: "Semantic Dissonance, Compliance Tightrope",
    material: "GRID PAPER or HARDWARE",
    materialNote: "Grid for analytical frames. Hardware for constraint/tension frames.",
    type: "COMMAND (title) + SYSTEMS (labels)",
    typeNote: "Bold title. Axis labels and data points in monospace.",
    color: "BASE + CHARTREUSE (nodes)",
    colorNote: "Green dots mark positions. No decorative color.",
    composition: "STRUCTURED FIELD",
    compositionNote: "Axes, grids, or tension lines define the space. Content lives within the structure.",
  },
  {
    id: "data",
    name: "DATA / REFERENCE",
    description: "Tables. Solicitation lists. Requirements matrices. Dense information.",
    examples: "Foundational Infrastructure table, DARPAConnect progression",
    material: "TERMINAL",
    materialNote: "Flat background. Structured rows. Database aesthetic.",
    type: "SYSTEMS (primary) + INSTITUTIONAL (headers)",
    typeNote: "Monospace for data rows. Serif or clean sans for section headers only.",
    color: "WARM GRADIENT permitted",
    colorNote: "Amber/coral gradient allowed to soften density. No neon accents on data slides.",
    composition: "STACKED ROWS or CARD GRID",
    compositionNote: "Layered cards with offset. Or clean table with strong horizontal rules.",
  },
  {
    id: "progression",
    name: "PROCESS / PROGRESSION",
    description: "Timelines. Phase sequences. Escalation paths.",
    examples: "Phase IV Exploit, DARPAConnect ecosystem, RFC draft history",
    material: "GRID PAPER or TERMINAL",
    materialNote: "Grid for tactical sequences. Terminal for institutional/procurement paths.",
    type: "INSTITUTIONAL + SYSTEMS",
    typeNote: "Phase labels in serif. Detail text in monospace.",
    color: "BLUE (friendly) + RED (adversary)",
    colorNote: "MIL-STD convention: blue = friendly maneuver, red = threat positions.",
    composition: "LINEAR or ASCENDING PATH",
    compositionNote: "Left-to-right or bottom-to-top progression. Nodes on a line.",
  },
];

const TYPE_REGISTERS = [
  { name: "COMMAND", desc: "Heavy condensed sans-serif. Architectural scale. The general's voice.", usage: "Impact frames, thesis statements, section titles", weight: "900 / Black Condensed", size: "60–120pt equivalent" },
  { name: "SYSTEMS", desc: "Monospace. Terminal provenance. Machine-readable.", usage: "Metadata, classification markings, data labels, doc references", weight: "400 / Regular", size: "10–14pt equivalent" },
  { name: "INSTITUTIONAL", desc: "Serif. White paper authority. Policy weight.", usage: "Explainer titles, doctrine headers, formal body copy", weight: "400–700", size: "18–36pt equivalent" },
  { name: "FIELD REPORT", desc: "Monospace, lowercase. Raw. Unprocessed source material.", usage: "Narrative body, operational context, primary source text", weight: "400", size: "12–16pt equivalent" },
];

const MATERIAL_REGISTERS = [
  { name: "DOSSIER", desc: "Worn manila, rubber bands, foxing, edge damage. Declassified intelligence.", when: "Narrative setup, historical context, thesis framing", risk: "Overuse makes everything feel archival rather than forward-looking" },
  { name: "HARDWARE", desc: "Pelican case rivets, industrial clamps, rubberized straps. Field logistics.", when: "Constraint framing, tension diagrams, system boundaries", risk: "Can read as prop-heavy if texture isn't grounded in content logic" },
  { name: "GRID PAPER", desc: "Engineering pad, graph paper, blue-line grid. Working document.", when: "Technical explainers, analytical matrices, process diagrams", risk: "Lowest drama register — needs strong content to carry" },
  { name: "TERMINAL", desc: "Flat dark/light background, structured metadata fields. Secure database.", when: "Cover pages, data tables, reference material, system docs", risk: "Can flatten into generic if metadata styling isn't precise" },
  { name: "CINEMATIC", desc: "Atmospheric lighting, volumetric effects, depth. Impact moment.", when: "Keynote inflection points, investor pitch climax ONLY", risk: "Triggers 'too Hollywood' reflex in DoD acquisition audiences" },
];

const COLOR_RULES = [
  { swatch: "#BFFF00", name: "CHARTREUSE", role: "TARGETING / ACTIVE DETECTION", rule: "Marks the operative element. Appears on nodes, coordinates, reticle elements. Never decorative.", forbid: "Never on text. Never on backgrounds. Never paired with red in the same frame." },
  { swatch: "#FF2D55", name: "RED / MAGENTA", role: "THREAT / COST / ADVERSARY", rule: "Reserved exclusively for threat content, enemy positions, cost data, and failure states.", forbid: "Never used for friendly elements. Never decorative. Never on covers." },
  { swatch: "#007AFF", name: "BLUE", role: "ALLIED / FRIENDLY / STRUCTURAL", rule: "Friendly force icons, structural elements, allied systems. MIL-STD-2525 convention.", forbid: "Never used for threat data. Never mixed with red in the same element." },
  { swatch: "#1a1a1a", name: "BASE DARK", role: "PRIMARY GROUND", rule: "80%+ of frame surface area. Near-black, warm or cool gray.", forbid: "Never pure #000000. Always has slight warmth or cool cast." },
  { swatch: "#f5f0eb", name: "BASE LIGHT", role: "DOCUMENT GROUND", rule: "Off-white for grid paper, terminal, and dossier backgrounds.", forbid: "Never pure white. Always aged, yellowed, or cool-shifted." },
];

const OUTLIERS = [
  { frame: "Swarm Aero Paradigm", issue: "Ceremonial photography (white gloves, rifle) introduces a sixth material register used only once. Serif + gold accent breaks from core palette.", verdict: "KILL or CODIFY", recommendation: "If ceremony is a valid content function (heritage, tradition, institutional gravitas), codify it as a sixth register with explicit rules. Otherwise, sunset." },
  { frame: "DARPAConnect (lavender)", issue: "Lavender/periwinkle background and ascending serif typography breaks from every other palette and material in the system.", verdict: "AUDIENCE VARIANT", recommendation: "Acceptable ONLY for DARPA-facing / partnership-building contexts where warmth > authority. Must never appear in the same deck as KINETICS or C2 Dossier frames." },
  { frame: "Foundational Infrastructure (amber gradient)", issue: "Warm amber-to-coral gradient is the only frame using a full-spectrum color background.", verdict: "PERMITTED — DATA REGISTER ONLY", recommendation: "Warm gradient is sanctioned specifically for high-density data tables where softening is needed. Cannot migrate to impact or cover frames." },
  { frame: "100,000x Leap (prismatic)", issue: "Holographic refraction overlay is visually stunning but stylistically orphaned from the rest of the system.", verdict: "CINEMATIC VARIANT", recommendation: "File under CINEMATIC register. Prismatic/refraction effects permitted for compute/AI scaling content only. Not a general-purpose treatment." },
];

export default function VisualSystemMatrix() {
  const [activeSection, setActiveSection] = useState("matrix");
  const [expandedRow, setExpandedRow] = useState(null);

  const sections = [
    { id: "matrix", label: "CONTENT → DECISIONS" },
    { id: "type", label: "TYPE REGISTERS" },
    { id: "material", label: "MATERIAL REGISTERS" },
    { id: "color", label: "COLOR PROTOCOL" },
    { id: "outliers", label: "OUTLIER AUDIT" },
  ];

  return (
    <div style={{
      fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
      background: "#0d0d0d",
      color: "#c8c8c8",
      minHeight: "100vh",
      padding: "32px 24px",
      boxSizing: "border-box",
    }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #333", paddingBottom: 24, marginBottom: 32 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: "#666", marginBottom: 8 }}>
          ANP STUDIO // VISUAL SYSTEM SPECIFICATION
        </div>
        <h1 style={{
          fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
          fontWeight: 900,
          fontSize: 32,
          color: "#f0f0f0",
          margin: 0,
          letterSpacing: -1,
          lineHeight: 1.1,
        }}>
          DECISION MATRIX
        </h1>
        <div style={{ fontSize: 10, color: "#555", marginTop: 8, letterSpacing: 2 }}>
          STATUS: DRAFT // VERSION: 1.0.0 // DATE: 2026-03-28
        </div>
        <div style={{
          fontSize: 11,
          color: "#888",
          marginTop: 16,
          maxWidth: 640,
          lineHeight: 1.6,
        }}>
          Maps content function to material register, type register, color accent, and compositional pattern.
          Every frame in every deck must resolve to exactly one row in this matrix.
          If it doesn't, it's either a new content function that needs codification or an outlier that needs killing.
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        display: "flex",
        gap: 0,
        marginBottom: 32,
        borderBottom: "1px solid #222",
        flexWrap: "wrap",
      }}>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            style={{
              background: activeSection === s.id ? "#1a1a1a" : "transparent",
              color: activeSection === s.id ? "#BFFF00" : "#666",
              border: "1px solid #222",
              borderBottom: activeSection === s.id ? "1px solid #0d0d0d" : "1px solid #222",
              padding: "10px 16px",
              fontSize: 10,
              letterSpacing: 2,
              cursor: "pointer",
              fontFamily: "inherit",
              marginBottom: -1,
              transition: "all 0.15s ease",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* CONTENT → DECISIONS MATRIX */}
      {activeSection === "matrix" && (
        <div>
          <div style={{ fontSize: 10, color: "#555", marginBottom: 16, letterSpacing: 2 }}>
            7 CONTENT FUNCTIONS — CLICK TO EXPAND
          </div>
          {CONTENT_FUNCTIONS.map((fn, i) => {
            const isOpen = expandedRow === fn.id;
            return (
              <div key={fn.id} style={{
                border: "1px solid " + (isOpen ? "#333" : "#1a1a1a"),
                marginBottom: 2,
                background: isOpen ? "#111" : "#0d0d0d",
                transition: "all 0.2s ease",
              }}>
                <div
                  onClick={() => setExpandedRow(isOpen ? null : fn.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "14px 16px",
                    cursor: "pointer",
                    gap: 16,
                  }}
                >
                  <span style={{
                    fontSize: 10,
                    color: "#BFFF00",
                    fontFamily: "inherit",
                    minWidth: 24,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{
                    fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
                    fontWeight: 900,
                    fontSize: 14,
                    color: "#e0e0e0",
                    letterSpacing: 1,
                    flex: 1,
                  }}>
                    {fn.name}
                  </span>
                  <span style={{ fontSize: 10, color: "#555" }}>
                    {fn.description}
                  </span>
                  <span style={{ color: "#444", fontSize: 14, marginLeft: 8 }}>
                    {isOpen ? "−" : "+"}
                  </span>
                </div>

                {isOpen && (
                  <div style={{ padding: "0 16px 20px 56px" }}>
                    <div style={{ fontSize: 10, color: "#555", marginBottom: 16 }}>
                      EXAMPLES: {fn.examples}
                    </div>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                    }}>
                      {[
                        { label: "MATERIAL", value: fn.material, note: fn.materialNote },
                        { label: "TYPE", value: fn.type, note: fn.typeNote },
                        { label: "COLOR", value: fn.color, note: fn.colorNote },
                        { label: "COMPOSITION", value: fn.composition, note: fn.compositionNote },
                      ].map(cell => (
                        <div key={cell.label} style={{
                          background: "#0a0a0a",
                          border: "1px solid #1a1a1a",
                          padding: 12,
                        }}>
                          <div style={{
                            fontSize: 9,
                            letterSpacing: 3,
                            color: "#BFFF00",
                            marginBottom: 6,
                          }}>
                            {cell.label}
                          </div>
                          <div style={{
                            fontSize: 12,
                            color: "#e0e0e0",
                            fontWeight: 600,
                            marginBottom: 6,
                            fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
                          }}>
                            {cell.value}
                          </div>
                          <div style={{
                            fontSize: 10,
                            color: "#777",
                            lineHeight: 1.5,
                          }}>
                            {cell.note}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TYPE REGISTERS */}
      {activeSection === "type" && (
        <div style={{ display: "grid", gap: 16 }}>
          {TYPE_REGISTERS.map((t, i) => (
            <div key={t.name} style={{
              border: "1px solid #1a1a1a",
              padding: 20,
              display: "grid",
              gridTemplateColumns: "160px 1fr",
              gap: 20,
            }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: 3, color: "#BFFF00", marginBottom: 8 }}>
                  REGISTER {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{
                  fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#e0e0e0",
                  marginBottom: 8,
                }}>
                  {t.name}
                </div>
                <div style={{ fontSize: 10, color: "#555" }}>
                  {t.weight}
                </div>
                <div style={{ fontSize: 10, color: "#555" }}>
                  {t.size}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.6, marginBottom: 8 }}>
                  {t.desc}
                </div>
                <div style={{ fontSize: 10, color: "#666" }}>
                  USAGE: {t.usage}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MATERIAL REGISTERS */}
      {activeSection === "material" && (
        <div style={{ display: "grid", gap: 16 }}>
          {MATERIAL_REGISTERS.map((m, i) => (
            <div key={m.name} style={{
              border: "1px solid #1a1a1a",
              padding: 20,
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 9, letterSpacing: 3, color: "#BFFF00" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{
                  fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#e0e0e0",
                }}>
                  {m.name}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.6, marginBottom: 12 }}>
                {m.desc}
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}>
                <div style={{ background: "#0a0a0a", padding: 12, border: "1px solid #1a1a1a" }}>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#666", marginBottom: 4 }}>WHEN</div>
                  <div style={{ fontSize: 11, color: "#999", lineHeight: 1.5 }}>{m.when}</div>
                </div>
                <div style={{ background: "#0a0a0a", padding: 12, border: "1px solid #1a1a1a" }}>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#FF2D55", marginBottom: 4 }}>RISK</div>
                  <div style={{ fontSize: 11, color: "#999", lineHeight: 1.5 }}>{m.risk}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* COLOR PROTOCOL */}
      {activeSection === "color" && (
        <div>
          <div style={{ fontSize: 10, color: "#555", marginBottom: 20, letterSpacing: 2, lineHeight: 1.6 }}>
            THREE-ACCENT SYSTEM ON A TWO-TONE BASE. ACCENTS ARE FUNCTIONAL, NEVER DECORATIVE.
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {COLOR_RULES.map(c => (
              <div key={c.name} style={{
                border: "1px solid #1a1a1a",
                padding: 20,
                display: "grid",
                gridTemplateColumns: "48px 1fr",
                gap: 20,
                alignItems: "start",
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 4,
                  background: c.swatch,
                  border: c.swatch === "#0d0d0d" || c.swatch === "#1a1a1a" ? "1px solid #333" : "none",
                }} />
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                    <span style={{
                      fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
                      fontWeight: 900,
                      fontSize: 14,
                      color: "#e0e0e0",
                    }}>
                      {c.name}
                    </span>
                    <span style={{ fontSize: 10, color: "#555", letterSpacing: 2 }}>
                      {c.swatch}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 10,
                    letterSpacing: 2,
                    color: c.swatch === "#BFFF00" ? "#BFFF00" :
                           c.swatch === "#FF2D55" ? "#FF2D55" :
                           c.swatch === "#007AFF" ? "#007AFF" : "#666",
                    marginBottom: 8,
                  }}>
                    {c.role}
                  </div>
                  <div style={{ fontSize: 11, color: "#999", lineHeight: 1.6, marginBottom: 8 }}>
                    {c.rule}
                  </div>
                  <div style={{
                    fontSize: 10,
                    color: "#FF2D55",
                    opacity: 0.7,
                    lineHeight: 1.5,
                  }}>
                    ✕ {c.forbid}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OUTLIER AUDIT */}
      {activeSection === "outliers" && (
        <div>
          <div style={{ fontSize: 10, color: "#555", marginBottom: 20, letterSpacing: 2, lineHeight: 1.6 }}>
            FRAMES THAT BREAK THE CURRENT SYSTEM. EACH NEEDS A VERDICT: CODIFY, VARIANT, OR KILL.
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            {OUTLIERS.map(o => (
              <div key={o.frame} style={{
                border: "1px solid #1a1a1a",
                padding: 20,
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
                  <span style={{
                    fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
                    fontWeight: 900,
                    fontSize: 14,
                    color: "#e0e0e0",
                  }}>
                    {o.frame}
                  </span>
                  <span style={{
                    fontSize: 9,
                    letterSpacing: 2,
                    padding: "3px 8px",
                    background: o.verdict === "KILL or CODIFY" ? "rgba(255,45,85,0.15)" :
                               o.verdict.includes("VARIANT") ? "rgba(191,255,0,0.1)" :
                               "rgba(0,122,255,0.1)",
                    color: o.verdict === "KILL or CODIFY" ? "#FF2D55" :
                           o.verdict.includes("VARIANT") ? "#BFFF00" :
                           "#007AFF",
                    border: "1px solid " + (o.verdict === "KILL or CODIFY" ? "rgba(255,45,85,0.3)" :
                            o.verdict.includes("VARIANT") ? "rgba(191,255,0,0.2)" :
                            "rgba(0,122,255,0.2)"),
                  }}>
                    {o.verdict}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: "#999", lineHeight: 1.6, marginBottom: 12 }}>
                  <strong style={{ color: "#aaa" }}>Issue:</strong> {o.issue}
                </div>
                <div style={{
                  fontSize: 11,
                  color: "#888",
                  lineHeight: 1.6,
                  background: "#0a0a0a",
                  padding: 12,
                  border: "1px solid #1a1a1a",
                }}>
                  <span style={{ color: "#BFFF00", fontSize: 9, letterSpacing: 2 }}>RECOMMENDATION: </span>
                  {o.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #1a1a1a",
        marginTop: 40,
        paddingTop: 16,
        display: "flex",
        justifyContent: "space-between",
        fontSize: 9,
        color: "#333",
        letterSpacing: 2,
      }}>
        <span>SYSTEM_REF: VISUAL_OPERATING_MATRIX_V1</span>
        <span>CLASSIFICATION: INTERNAL // ANP STUDIO</span>
      </div>
    </div>
  );
}
