import { useState } from "react";
import { accent as hue, font, ground, border, text } from "../../tokens.js";

const SUBSYSTEMS = [
  {
    name: "DARK RELIEF",
    version: "v1.1",
    domain: "ISR Overlay Visual Language",
    desc: "Six-layer compositing stack for intelligence, surveillance, and reconnaissance displays. MIL-STD-2525D symbology, NVG compatibility, sensor overlay rendering rules.",
    status: "ACTIVE",
  },
  {
    name: "VOL",
    version: "v1.0",
    domain: "Geospatial Operating Language",
    desc: "Heatmap engine, temporal scrubber, command palette, GeoJSON import/export, minimap. 12-page ReportLab specification with companion dossier-tokens.css.",
    status: "ACTIVE",
  },
  {
    name: "CYPHER-IFF",
    version: "v2.0",
    domain: "Visual Identification Protocol",
    desc: "Passive visual IFF for drone swarms in comms-denied/EW-degraded environments. 16×16 deterministic pixel grid, Cistercian numeral encoding, cryptographic hash verification.",
    status: "ACTIVE",
  },
];

const REGISTERS = {
  material: [
    { name: "DOSSIER", glyph: "▰" },
    { name: "HARDWARE", glyph: "▰" },
    { name: "GRID PAPER", glyph: "▰" },
    { name: "TERMINAL", glyph: "▰" },
    { name: "CINEMATIC", glyph: "▰" },
  ],
  type: [
    { name: "COMMAND", glyph: "▰" },
    { name: "SYSTEMS", glyph: "▰" },
    { name: "INSTITUTIONAL", glyph: "▰" },
    { name: "FIELD REPORT", glyph: "▰" },
  ],
  color: [
    { name: "CHARTREUSE", hex: "#BFFF00", role: "Active detection / targeting" },
    { name: "RED", hex: "#FF2D55", role: "Threat / adversary / cost" },
    { name: "BLUE", hex: "#007AFF", role: "Allied / friendly / structural" },
    { name: "BASE DARK", hex: "#1a1a1a", role: "Primary ground" },
    { name: "BASE LIGHT", hex: "#f5f0eb", role: "Document ground" },
  ],
  content: [
    { name: "IMPACT / THESIS" },
    { name: "COVER / TITLE" },
    { name: "NARRATIVE CONTEXT" },
    { name: "TECHNICAL EXPLAINER" },
    { name: "STRATEGIC ANALYSIS" },
    { name: "DATA / REFERENCE" },
    { name: "PROGRESSION" },
  ],
};

const ARTIFACTS = [
  { name: "Decision Matrix", ref: "DEADLIGHT-DM-V1", desc: "Content function → material, type, color, composition mapping. The canonical lookup table." },
  { name: "Signature Deck Architecture", ref: "DEADLIGHT-SDA-V1", desc: "23-slide canonical sequence. 4 acts, intensity arc, pacing protocol." },
  { name: "Case Study Package", ref: "DEADLIGHT-CSP-V1", desc: "Three case studies. Strategic problem → visual argument → outcome." },
  { name: "Stress Test Frames", ref: "DEADLIGHT-STF-V1", desc: "RTM, Gantt, architecture, compliance matrix. High-density proof of system survival." },
];

const PRINCIPLES = [
  {
    number: "01",
    name: "CONTROLLED OCCLUSION",
    statement: "What you choose not to show defines the system as much as what you reveal. Every frame has a single thesis. Everything else is blocked.",
  },
  {
    number: "02",
    name: "MATERIAL IS MEANING",
    statement: "The texture behind the content is not decorative — it's a semantic layer. Dossier means provenance. Hardware means constraint. Grid means analysis. Terminal means data. Cinematic means inflection. Choose wrong and the audience reads the content against the wrong cognitive frame.",
  },
  {
    number: "03",
    name: "COLOR IS FUNCTIONAL",
    statement: "Three accents. Each mapped to a single meaning. Chartreuse marks the operative element. Red marks the threat. Blue marks the allied. No accent is ever decorative. If it doesn't carry meaning, it doesn't appear.",
  },
  {
    number: "04",
    name: "SCALE IS ACCOUNTABILITY",
    statement: "Type at architectural scale cannot be skimmed. When a statement fills the frame edge-to-edge, the audience must confront it. This is deliberate. The system uses physical scale to prevent cognitive avoidance.",
  },
  {
    number: "05",
    name: "THE SYSTEM SURVIVES DENSITY",
    statement: "A visual identity that only works on impact frames is a portfolio piece. DEADLIGHT is production-grade. It carries a 40-row compliance matrix with the same structural clarity it carries a six-word thesis. The terminal register and status-color protocol handle any density level without requiring gradient relief or material compensation.",
  },
];

export default function DeadlightIdentity({ section: sectionProp, onSectionChange }) {
  const [internal, setInternal] = useState("identity");
  const section = sectionProp ?? internal;
  const setSection = onSectionChange ?? setInternal;

  const sections = [
    { id: "identity", label: "IDENTITY" },
    { id: "principles", label: "PRINCIPLES" },
    { id: "registers", label: "REGISTERS" },
    { id: "hierarchy", label: "HIERARCHY" },
    { id: "artifacts", label: "ARTIFACTS" },
  ];

  return (
    <div style={{
      fontFamily: font.mono,
      background: ground.canvas,
      color: text.body,
      minHeight: "100vh",
      padding: "32px 24px",
      boxSizing: "border-box",
    }}>
      {/* System Title */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: text.ghost, marginBottom: 24 }}>
          ANP STUDIO // VISUAL SYSTEM SPECIFICATION
        </div>

        <h1 style={{
          fontFamily: font.display,
          fontWeight: 900,
          fontSize: 72,
          color: text.hi,
          margin: 0,
          letterSpacing: -3,
          lineHeight: 0.9,
        }}>
          DEADLIGHT
        </h1>

        <div style={{
          width: 64,
          height: 3,
          background: hue.chartreuse,
          marginTop: 16,
          marginBottom: 16,
        }} />

        <div style={{
          fontSize: 12,
          color: text.muted,
          maxWidth: 560,
          lineHeight: 1.7,
        }}>
          A presentation and brand system governing material registers, type registers,
          color protocol, and compositional patterns for defense-technology communication.
          Named for the fixed porthole cover that protects against water ingress while
          maintaining controlled visibility — what passes through is deliberate.
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          marginTop: 24,
          maxWidth: 560,
        }}>
          {[
            { label: "VERSION", value: "1.0.0" },
            { label: "STATUS", value: "CANONICAL" },
            { label: "DATE", value: "2026-03-28" },
          ].map(m => (
            <div key={m.label}>
              <div style={{ fontSize: 8, letterSpacing: 3, color: text.ghost, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 12, color: hue.chartreuse }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        display: "flex",
        gap: 0,
        marginBottom: 32,
        borderBottom: `1px solid ${border.mid}`,
      }}>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            style={{
              background: section === s.id ? border.subtle : "transparent",
              color: section === s.id ? hue.chartreuse : text.fainter,
              border: `1px solid ${border.mid}`,
              borderBottom: section === s.id ? `1px solid ${ground.canvas}` : `1px solid ${border.mid}`,
              padding: "10px 20px",
              fontSize: 10,
              letterSpacing: 2,
              cursor: "pointer",
              fontFamily: "inherit",
              marginBottom: -1,
              transition: "all 0.15s",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ============ IDENTITY ============ */}
      {section === "identity" && (
        <div style={{ maxWidth: 640 }}>
          <div style={{
            fontSize: 9,
            letterSpacing: 3,
            color: text.ghost,
            marginBottom: 24,
          }}>
            ETYMOLOGY & DEFINITION
          </div>

          <div style={{
            background: ground.card,
            border: `1px solid ${border.subtle}`,
            padding: 24,
            marginBottom: 24,
          }}>
            <div style={{
              fontFamily: font.serif,
              fontSize: 14,
              fontStyle: "italic",
              color: text.secondary,
              marginBottom: 12,
              lineHeight: 1.7,
            }}>
              dead·light <span style={{ fontStyle: "normal", color: text.fainter }}>/ˈdedˌlīt/</span>
            </div>
            <div style={{
              fontFamily: font.serif,
              fontSize: 12,
              color: text.dim,
              lineHeight: 1.8,
              marginBottom: 16,
            }}>
              <span style={{ fontStyle: "italic", color: text.fainter }}>noun, nautical.</span> A fixed porthole cover or shutter,
              typically of metal or heavy glass, fitted over a ship's window to protect against
              water ingress during heavy weather while maintaining controlled visibility.
              Unlike a standard port, a deadlight determines in advance what will and will not
              pass through.
            </div>
            <div style={{
              borderTop: `1px solid ${border.subtle}`,
              paddingTop: 16,
              fontSize: 11,
              color: text.muted,
              lineHeight: 1.7,
            }}>
              As a design system, DEADLIGHT encodes the same principle: every element that
              reaches the audience — every material texture, every typeface weight, every
              color accent — has been deliberately admitted. Everything else is occluded.
              The system's identity comes not from what it shows, but from the discipline
              of what it blocks.
            </div>
          </div>

          <div style={{
            background: ground.card,
            border: `1px solid ${border.subtle}`,
            borderLeft: `3px solid ${hue.chartreuse}`,
            padding: 20,
            marginBottom: 24,
          }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: hue.chartreuse, marginBottom: 10 }}>
              CORE THESIS
            </div>
            <div style={{
              fontFamily: font.display,
              fontWeight: 900,
              fontSize: 16,
              color: text.bright,
              lineHeight: 1.4,
            }}>
              Making invisible structure visible under pressure.
            </div>
            <div style={{
              fontSize: 11,
              color: text.dim,
              lineHeight: 1.7,
              marginTop: 12,
            }}>
              Cognitive load, information density, rhetorical intent, operational constraints —
              forces that are hard to see, rendered as legible structure through material,
              type, and color. The system treats the audience's attention as the most scarce
              resource in the room, and every design decision as a triage call about what
              deserves that attention.
            </div>
          </div>

          <div style={{
            background: ground.card,
            border: `1px solid ${border.subtle}`,
            padding: 20,
          }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: text.fainter, marginBottom: 10 }}>
              OPERATIONAL CONTEXT
            </div>
            <div style={{
              fontSize: 11,
              color: text.dim,
              lineHeight: 1.7,
            }}>
              DEADLIGHT governs all visual communication produced by ANP Studio for
              defense-technology contexts. This includes but is not limited to: technical
              proposals (SBIR, BAA, STTR), capability briefings, portfolio presentations,
              white papers, product interfaces, and thought-leadership materials. Any
              visual artifact that will be seen by military leadership, acquisition
              professionals, intelligence community stakeholders, or defense-technology
              investors must be DEADLIGHT-compliant.
            </div>
          </div>
        </div>
      )}

      {/* ============ PRINCIPLES ============ */}
      {section === "principles" && (
        <div style={{ display: "grid", gap: 12, maxWidth: 640 }}>
          {PRINCIPLES.map(p => (
            <div key={p.number} style={{
              background: ground.card,
              border: `1px solid ${border.subtle}`,
              padding: 20,
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 10, color: hue.chartreuse }}>{p.number}</span>
                <span style={{
                  fontFamily: font.display,
                  fontWeight: 900,
                  fontSize: 14,
                  color: text.bright,
                  letterSpacing: 1,
                }}>
                  {p.name}
                </span>
              </div>
              <div style={{
                fontSize: 11,
                color: text.muted,
                lineHeight: 1.7,
              }}>
                {p.statement}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============ REGISTERS ============ */}
      {section === "registers" && (
        <div style={{ maxWidth: 720 }}>
          {/* Material */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: hue.chartreuse, marginBottom: 12 }}>
              MATERIAL REGISTERS — 5
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {REGISTERS.material.map(r => (
                <div key={r.name} style={{
                  background: ground.card,
                  border: `1px solid ${border.subtle}`,
                  padding: "10px 16px",
                  fontSize: 11,
                  color: text.primary,
                  letterSpacing: 1,
                }}>
                  {r.name}
                </div>
              ))}
            </div>
          </div>
          {/* Type */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: hue.chartreuse, marginBottom: 12 }}>
              TYPE REGISTERS — 4
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {REGISTERS.type.map(r => (
                <div key={r.name} style={{
                  background: ground.card,
                  border: `1px solid ${border.subtle}`,
                  padding: "10px 16px",
                  fontSize: 11,
                  color: text.primary,
                  letterSpacing: 1,
                }}>
                  {r.name}
                </div>
              ))}
            </div>
          </div>
          {/* Color */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: hue.chartreuse, marginBottom: 12 }}>
              COLOR PROTOCOL — 3 ACCENTS + 2 BASE
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              {REGISTERS.color.map(c => (
                <div key={c.name} style={{
                  display: "grid",
                  gridTemplateColumns: "32px 120px 100px 1fr",
                  gap: 12,
                  alignItems: "center",
                  background: ground.card,
                  border: `1px solid ${border.subtle}`,
                  padding: "8px 12px",
                }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    background: c.hex,
                    borderRadius: 2,
                    border: c.hex === "#1a1a1a" ? `1px solid ${border.strong}` : "none",
                  }} />
                  <div style={{ fontSize: 11, color: text.primary, letterSpacing: 1 }}>{c.name}</div>
                  <div style={{ fontSize: 9, color: text.fainter }}>{c.hex}</div>
                  <div style={{ fontSize: 10, color: text.faint }}>{c.role}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Content Functions */}
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: hue.chartreuse, marginBottom: 12 }}>
              CONTENT FUNCTIONS — 7
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {REGISTERS.content.map(r => (
                <div key={r.name} style={{
                  background: ground.card,
                  border: `1px solid ${border.subtle}`,
                  padding: "10px 16px",
                  fontSize: 10,
                  color: text.primary,
                  letterSpacing: 1,
                }}>
                  {r.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============ HIERARCHY ============ */}
      {section === "hierarchy" && (
        <div style={{ maxWidth: 640 }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: text.ghost, marginBottom: 24 }}>
            SYSTEM HIERARCHY
          </div>

          {/* Parent */}
          <div style={{
            border: `2px solid ${hue.chartreuse}`,
            padding: 20,
            marginBottom: 2,
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{
                fontFamily: font.display,
                fontWeight: 900,
                fontSize: 24,
                color: text.hi,
              }}>
                DEADLIGHT
              </span>
              <span style={{ fontSize: 9, letterSpacing: 2, color: hue.chartreuse }}>PARENT SYSTEM</span>
            </div>
            <div style={{ fontSize: 10, color: text.dim, marginTop: 8, lineHeight: 1.6 }}>
              Presentation & brand system. Governs material registers, type registers,
              color protocol, compositional patterns, and content function mapping.
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: 8,
              marginTop: 16,
              fontSize: 9,
              color: text.fainter,
            }}>
              <div><span style={{ color: hue.chartreuse }}>5</span> material registers</div>
              <div><span style={{ color: hue.chartreuse }}>4</span> type registers</div>
              <div><span style={{ color: hue.chartreuse }}>5</span> color tokens</div>
              <div><span style={{ color: hue.chartreuse }}>7</span> content functions</div>
            </div>
          </div>

          {/* Connector */}
          <div style={{
            borderLeft: `2px solid ${border.strong}`,
            marginLeft: 32,
            height: 24,
          }} />

          {/* Children */}
          <div style={{ paddingLeft: 32 }}>
            {SUBSYSTEMS.map((sub, i) => (
              <div key={sub.name}>
                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 0,
                }}>
                  <div style={{
                    width: 24,
                    borderTop: `2px solid ${border.strong}`,
                    marginTop: 18,
                    flexShrink: 0,
                  }} />
                  <div style={{
                    border: `1px solid ${border.subtle}`,
                    padding: 16,
                    flex: 1,
                    background: ground.card,
                  }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                      <span style={{
                        fontFamily: font.display,
                        fontWeight: 900,
                        fontSize: 14,
                        color: text.bright,
                      }}>
                        {sub.name}
                      </span>
                      <span style={{ fontSize: 9, color: text.fainter }}>{sub.version}</span>
                      <span style={{
                        fontSize: 8,
                        letterSpacing: 2,
                        color: hue.chartreuse,
                        padding: "2px 6px",
                        background: "rgba(191,255,0,0.05)",
                        border: "1px solid rgba(191,255,0,0.15)",
                        marginLeft: "auto",
                      }}>
                        {sub.status}
                      </span>
                    </div>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: text.faint, marginBottom: 6 }}>
                      {sub.domain}
                    </div>
                    <div style={{ fontSize: 10, color: text.dim, lineHeight: 1.6 }}>
                      {sub.desc}
                    </div>
                  </div>
                </div>
                {i < SUBSYSTEMS.length - 1 && (
                  <div style={{
                    borderLeft: `2px solid ${border.mid}`,
                    marginLeft: 0,
                    height: 8,
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============ ARTIFACTS ============ */}
      {section === "artifacts" && (
        <div style={{ maxWidth: 640 }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: text.ghost, marginBottom: 24 }}>
            SYSTEM ARTIFACTS — PRODUCED TO DATE
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {ARTIFACTS.map(a => (
              <div key={a.ref} style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: 16,
                background: ground.card,
                border: `1px solid ${border.subtle}`,
                padding: 16,
              }}>
                <div>
                  <div style={{
                    fontFamily: font.display,
                    fontWeight: 900,
                    fontSize: 12,
                    color: text.bright,
                    marginBottom: 4,
                  }}>
                    {a.name}
                  </div>
                  <div style={{ fontSize: 9, color: hue.chartreuse, letterSpacing: 1 }}>
                    {a.ref}
                  </div>
                </div>
                <div style={{ fontSize: 10, color: text.dim, lineHeight: 1.6 }}>
                  {a.desc}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 24,
            padding: 16,
            border: `1px dashed ${border.mid}`,
            fontSize: 10,
            color: text.ghost,
            lineHeight: 1.6,
          }}>
            All artifacts carry the DEADLIGHT- prefix in their system reference.
            Future artifacts follow the pattern: DEADLIGHT-[ABBREV]-V[N].
            Version numbers increment on structural changes to content or logic.
            Visual refinements within the same structure do not increment.
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        borderTop: `1px solid ${border.subtle}`,
        marginTop: 48,
        paddingTop: 16,
        display: "flex",
        justifyContent: "space-between",
        fontSize: 9,
        color: border.strong,
        letterSpacing: 2,
      }}>
        <span>SYSTEM_REF: DEADLIGHT-SPEC-V1.0.0</span>
        <span>CLASSIFICATION: CANONICAL // ANP STUDIO</span>
      </div>
    </div>
  );
}
