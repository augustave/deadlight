import { useState } from "react";
import { accent as hue, font, ground, border, text, scale } from "../../tokens.js";
import { useViewport } from "../../useViewport.js";

const CASE_STUDY_FRAMEWORK = {
  structure: [
    { id: "context", label: "STRATEGIC CONTEXT", desc: "The industry condition or client problem that created the need. Not 'they needed a deck' — the actual strategic tension." },
    { id: "brief", label: "THE BRIEF", desc: "What was asked for vs. what was actually needed. The gap between the stated request and the real problem." },
    { id: "argument", label: "VISUAL ARGUMENT", desc: "The design decisions and why they were made. Material, type, color, composition — traced back to strategic intent. This is the core of the case study." },
    { id: "frames", label: "KEY FRAMES", desc: "3-5 slides that demonstrate the argument. Each annotated with the decision logic, not just the aesthetic result." },
    { id: "system", label: "SYSTEMS THINKING", desc: "What this project proves about working at the system level — not individual slides but the architecture that holds them together." },
    { id: "outcome", label: "OUTCOME", desc: "What happened. Audience reaction, contract won, position shifted, conversation changed. If no external outcome yet, the internal capability it built." },
  ],
};

const CASE_STUDIES = [
  {
    id: "algorithmic-warfare",
    number: "01",
    title: "THE AESTHETICS OF ALGORITHMIC WARFARE",
    subtitle: "How UI, UX, and art direction shape the modern battlespace.",
    status: "STRONGEST CANDIDATE",
    statusColor: hue.chartreuse,
    context: {
      headline: "The defense industry's visual language is stuck in 2005.",
      body: "Every defense-tech startup and legacy prime uses the same visual vocabulary: navy backgrounds, abstract globe imagery, circuit-board patterns, and sans-serif type that signals 'technology' without communicating anything specific about what the technology does or why it matters. Meanwhile, the actual battlespace has become an information design problem — sensor fusion, kill chain compression, human-machine teaming all depend on interfaces that operators can read under cognitive load. The aesthetics aren't decorative. They're operational.",
      tension: "The visual language of defense branding actively undermines the mission it claims to serve. Companies that build decision-support systems present them with the visual clarity of a stock photo."
    },
    brief: {
      stated: "Build a presentation on defense-tech branding and design.",
      actual: "Construct a visual argument that the aesthetics of warfare are themselves a strategic capability — that how you present information to a decision-maker under fire IS the weapon system. The presentation must simultaneously demonstrate this thesis by being, itself, a superior example of the design thinking it advocates.",
      gap: "The stated brief treats design as commentary. The actual problem treats design as capability. The presentation must be the proof of its own argument."
    },
    argument: [
      {
        decision: "Dossier materiality over clean corporate backgrounds",
        rationale: "Aged paper, foxing, rubber bands — these textures signal declassified intelligence, documents that have survived a classification lifecycle. The audience (military leadership, defense PMs) unconsciously assigns more weight to information that appears to have institutional provenance. A clean white slide says 'marketing.' A worn dossier says 'this has been through the system.'",
        matrix_ref: "MATERIAL: DOSSIER → NARRATIVE CONTEXT"
      },
      {
        decision: "Monumental type scale for thesis statements",
        rationale: "Setting 'IN A GREAT POWER WAR, THE U.S. RUNS OUT OF CRITICAL MUNITIONS IN LESS THAN 7 DAYS' at 60%+ frame width isn't just emphasis — it's a deliberate rejection of the bullet-point briefing culture that lets senior leaders skim past uncomfortable truths. You cannot multitask past type this large. The scale is a form of accountability.",
        matrix_ref: "TYPE: COMMAND → IMPACT / THESIS"
      },
      {
        decision: "Red accent reserved exclusively for threat content",
        rationale: "MIL-STD-2525 trains every military professional to read red as adversary/threat. By enforcing this convention in a branding presentation, the designer demonstrates fluency with the audience's existing mental model while making a rhetorical move: the production deficit isn't an abstract policy concern, it's a threat indicator on the same cognitive map as an enemy position.",
        matrix_ref: "COLOR: RED → THREAT / COST / ADVERSARY"
      },
      {
        decision: "Cinematic register for the munitions deficit frame",
        rationale: "The red laser-cross intersection with atmospheric teal fog is the most 'Hollywood' frame in the body of work — and it's deployed at the exact moment the content justifies it. The production deficit is genuinely cinematic in its implications. Using cinematic treatment here and nowhere else in the analytical sections creates a controlled spike that earns its drama rather than defaulting to it.",
        matrix_ref: "MATERIAL: CINEMATIC → IMPACT / THESIS (keynote only)"
      },
    ],
    keyFrames: [
      { name: "Title Frame", desc: "Soldier with HUD overlay. Contour map terrain. Drone threat classification callouts. Photography + data visualization composited. The thesis is visible before the subtitle is read." },
      { name: "Munitions Deficit", desc: "Full-bleed COMMAND type on cinematic teal/red backdrop. The single highest-intensity frame. Red laser-cross signals threat. 'The Ukraine Reality' inset callout provides historical grounding." },
      { name: "Semantic Dissonance 2×2", desc: "Grid paper. Four-quadrant analysis mapping rhetoric vs. engineering across civilian and military axes. Proves the designer can analyze, not just dramatize." },
      { name: "Operation Epic Fury", desc: "Dossier materiality. Lowercase monospace field report. Magenta energy streak. Historical proof that algorithmic warfare is already operational, not theoretical." },
    ],
    systemsProof: "This presentation doesn't just argue that aesthetics matter in defense — it demonstrates it by using five distinct material registers, four type registers, and a three-accent color system that maps to MIL-STD conventions. Every design decision traces to a strategic intent. The case study proves the designer operates as an art director (advancing a thesis through visual form) not a graphic designer (making things look good).",
    outcome: {
      direct: "Portfolio centerpiece for defense-tech creative direction positioning. Establishes ANP Studio's thesis that design is a force multiplier, not a service layer.",
      capability: "Produced the visual system that now governs all ANP Studio defense presentations. The material registers, type registers, and color protocol codified in the Decision Matrix originated in this project.",
      position: "Frames the defense branding conversation around a question most competitors haven't asked: does your visual language survive contact with an operator under cognitive load?"
    },
  },
  {
    id: "darpa-navigation",
    number: "02",
    title: "NAVIGATING THE ACQUISITION FRONTIER",
    subtitle: "Making the DARPA procurement ecosystem legible to non-traditional performers.",
    status: "STRONG — NEEDS FRAMING",
    statusColor: hue.blueLt,
    context: {
      headline: "The defense procurement ecosystem is deliberately illegible.",
      body: "DARPA's solicitation landscape — BAAs, SBIRs, Open Mic sessions, Proposers Days — is structurally designed for organizations that already understand it. Non-traditional performers and commercial startups face a double barrier: the technical complexity of the work itself, and the procedural complexity of the acquisition system that funds it. The information exists in public documents, but the architecture of those documents is hostile to first-time readers.",
      tension: "The organizations best positioned to deliver breakthrough innovation are the least equipped to navigate the system that funds it. The procurement process itself is a filter that selects for institutional familiarity over technical capability."
    },
    brief: {
      stated: "Map the DARPA solicitation landscape for internal strategy.",
      actual: "Transform an illegible procurement ecosystem into a visual operating model that a solo operator can use to identify, prioritize, and pursue specific funding vehicles. The presentation must make the complex feel navigable without making it feel simple.",
      gap: "The stated brief is research. The actual problem is wayfinding — building a visual interface to a bureaucratic system."
    },
    argument: [
      {
        decision: "Warm amber gradient for the solicitation table",
        rationale: "The Foundational Infrastructure slide carries the highest data density in the body of work — five DARPA offices, solicitation numbers, scope descriptions, and deadlines in a single frame. The warm amber-to-coral gradient is the only departure from the base palette, and it's doing critical perceptual work: softening a wall of text and numbers that would be impenetrable on a dark background. The warmth also signals approachability — this is the 'you can do this' slide in a deck about a system that usually says 'you can't.'",
        matrix_ref: "COLOR: WARM GRADIENT → DATA / REFERENCE (density relief)"
      },
      {
        decision: "Ascending path for DARPAConnect ecosystem",
        rationale: "Open Mic → Small Business Showcases → Proposers Days rendered as an ascending diagonal with nodes. The upward trajectory isn't decorative — it maps to increasing institutional commitment and resource investment. The lavender background is a deliberate audience-specific variant: this content targets potential DARPA partners, not military operators. The warmth and approachability would be wrong in a tactical briefing but correct for an ecosystem-onboarding context.",
        matrix_ref: "COMPOSITION: ASCENDING PATH → PROGRESSION"
      },
      {
        decision: "Compliance Tightrope as a hardware-register constraint frame",
        rationale: "ITAR/CMMC regulatory constraints on one end, disruptive tech innovation on the other, connected by a taut blue strap through an industrial clamp. The pelican-case materiality says: this tension is a physical reality, not an abstract concept. The three node labels (Focus on Operational Outcomes, Utilize Conceptual Scenario Modeling, Deploy Cleared Thought-Leadership) are the actual navigation instructions for walking the rope. The rule of engagement at the bottom is the operating principle.",
        matrix_ref: "MATERIAL: HARDWARE → STRATEGIC ANALYSIS"
      },
    ],
    keyFrames: [
      { name: "Foundational Infrastructure", desc: "Five-row solicitation matrix. Amber gradient. The density test for the entire visual system — proves it survives unglamorous content." },
      { name: "Compliance Tightrope", desc: "Hardware-register constraint diagram. The visual metaphor that makes regulatory navigation feel physical rather than procedural." },
      { name: "DARPAConnect Ecosystem", desc: "Ascending path. Lavender variant. The audience-specific departure that proves the system can flex for warmth when the audience requires it." },
    ],
    systemsProof: "This case study proves the visual system can serve internal strategy work, not just external impact presentations. The designer is using the same structural thinking (material → function mapping, color → meaning protocols) to solve an information architecture problem: how do you make a bureaucratic ecosystem navigable? The answer is the same as the tactical answer — you match the visual register to the cognitive task.",
    outcome: {
      direct: "Internal strategy document that directly informed the ALIAS SBIR XL proposal targeting. Narrowed the field from 27 solicitations to a single highest-probability target.",
      capability: "Validated the warm-gradient and lavender-variant extensions to the core palette. Established the DATA / REFERENCE content function as a first-class citizen in the visual system.",
      position: "Demonstrates that the designer's value extends beyond aesthetics into strategic analysis — the visual argument IS the strategic work, not a wrapper around it."
    },
  },
  {
    id: "c2-systems",
    number: "03",
    title: "THE C2 BLUEPRINT",
    subtitle: "Designing legibility for autonomous fleet command and control.",
    status: "NEEDS CONSOLIDATION",
    statusColor: hue.tan,
    context: {
      headline: "Autonomous systems generate more data than human command structures can process.",
      body: "The transition from piloted platforms to autonomous fleets doesn't just change the airframe — it changes the entire information architecture of command and control. A human operator supervising 40 autonomous vehicles needs an interface that compresses sensor data, swarm state, and threat environment into actionable reads at machine speed. The C2 software problem is, at its core, a design problem: what does the operator need to see, when, and at what fidelity?",
      tension: "The systems that need the most sophisticated human-machine interfaces are being designed by teams that treat UI as an afterthought — a skin applied after the autonomy stack is built."
    },
    brief: {
      stated: "Create a design and delivery dossier for C2 autonomous fleet software architecture.",
      actual: "Build a visual argument that the interface IS the capability — that the design of the operator's view is not a cosmetic layer but a structural component of the autonomous system's effectiveness. The dossier must demonstrate this by being, itself, a C2-grade information artifact.",
      gap: "The stated brief is documentation. The actual problem is epistemology — what does a human need to know about a machine's decisions, and how fast do they need to know it?"
    },
    argument: [
      {
        decision: "Terminal register for the cover frame",
        rationale: "The C2 Dossier cover uses spray-painted 'C2' letterforms with label-maker metadata strips. This isn't a polished product cover — it's a field-expedient document marker. The spray paint signals urgency and improvisation; the structured metadata strips signal system discipline. The tension between the two IS the C2 problem: imposing order on chaos.",
        matrix_ref: "MATERIAL: TERMINAL → COVER / TITLE"
      },
      {
        decision: "Polygons in Disguise as a first-principles explainer",
        rationale: "The GeoJSON circle approximation diagram uses macro-to-micro zoom with chartreuse coordinate nodes on engineering-pad background. This is the kind of slide that most defense presentations skip — the 'boring' technical foundation that everything else rests on. By giving it the full grid-paper explainer treatment with precise callout lines and a philosophical footnote ('a circle is just a polygon with an extremely high sample rate'), the designer signals that they understand and respect the engineering foundations, not just the operational concepts.",
        matrix_ref: "MATERIAL: GRID PAPER → TECHNICAL EXPLAINER"
      },
      {
        decision: "Software Crucible as narrative context",
        rationale: "Concentric binary rings, a single beam of light at the apex, '7 MINUTES' and '3 HOURS OF SILENCE.' This is the most art-directed frame in the entire body of work, and it's deployed to create an emotional understanding of an operational constraint. The designer isn't explaining what a satellite contact window is — they're making the audience feel the weight of that silence. The binary code spiraling inward visualizes the data waiting to be transmitted. The light beam is the contact window. It's poetry in the dossier register.",
        matrix_ref: "MATERIAL: DOSSIER (cinematic variant) → NARRATIVE CONTEXT"
      },
    ],
    keyFrames: [
      { name: "C2 Dossier Cover", desc: "Spray-paint letterforms + label-maker metadata. Field-expedient authority. The tension between improvisation and discipline." },
      { name: "Polygons in Disguise", desc: "Grid-paper first-principles explainer. Macro-to-micro zoom. Chartreuse coordinates. Proves engineering depth." },
      { name: "Software Crucible", desc: "Concentric binary rings. 7-minute contact window. The emotional peak of the technical portfolio — poetry in the systems register." },
      { name: "RFC 7946 Timeline", desc: "Draft history progression from 00 through RFC. Terminal register. Shows standards evolution as a design problem." },
    ],
    systemsProof: "This case study is the hardest to frame because the content is the most technically dense. The proof it offers is that the visual system doesn't collapse under genuine engineering complexity — GeoJSON specifications, orbital mechanics constraints, and C2 architecture diagrams all resolve through the same material/type/color protocol without losing either technical precision or visual authority. The Software Crucible frame, in particular, proves that the system can reach for genuine emotional resonance without abandoning its structural discipline.",
    outcome: {
      direct: "Design system foundation for TAK-H (Tactical Mosaic C2 Theater Simulator). Visual language that governs the simulation's interface aesthetic.",
      capability: "Validated the GRID PAPER and TERMINAL registers as capable of carrying deep technical content without visual compromise. Established the engineering-pad explainer as a repeatable format.",
      position: "Demonstrates that the designer can operate at the intersection of systems engineering and visual communication — not translating engineering for a lay audience, but designing within the engineering context itself."
    },
  },
];

export default function CaseStudyPackage({ section: sectionProp, onSectionChange }) {
  const [internalStudy, setInternalStudy] = useState("algorithmic-warfare");
  const [activeSection, setActiveSection] = useState("context");

  const { narrow } = useViewport();
  const activeStudy = sectionProp ?? internalStudy;
  const selectStudy = (id) => {
    (onSectionChange ?? setInternalStudy)(id);
    setActiveSection("context");
  };

  const study = CASE_STUDIES.find(s => s.id === activeStudy);

  return (
    <div style={{
      fontFamily: font.mono,
      background: ground.canvas,
      color: text.body,
      minHeight: "100vh",
      padding: "32px 24px",
      boxSizing: "border-box",
    }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${border.strong}`, paddingBottom: 24, marginBottom: 32 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: text.faint, marginBottom: 8 }}>
          ANP STUDIO // CASE STUDY PACKAGE
        </div>
        <h1 style={{
          fontFamily: font.display,
          fontWeight: 900,
          fontSize: 28,
          color: text.hi,
          margin: 0,
          letterSpacing: -1,
        }}>
          THREE CASE STUDIES
        </h1>
        <div style={{ fontSize: 10, color: text.fainter, marginTop: 8, letterSpacing: 2 }}>
          STRATEGIC PROBLEM → VISUAL ARGUMENT → OUTCOME
        </div>
      </div>

      {/* Case Study Selector */}
      <div style={{ display: "flex", flexDirection: narrow ? "column" : "row", gap: 8, marginBottom: 32 }}>
        {CASE_STUDIES.map(cs => (
          <button
            key={cs.id}
            onClick={() => selectStudy(cs.id)}
            style={{
              flex: 1,
              background: activeStudy === cs.id ? ground.raised : ground.inset,
              border: `1px solid ${activeStudy === cs.id ? border.strong : border.subtle}`,
              padding: 16,
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            <div style={{
              fontSize: 9,
              letterSpacing: 3,
              color: cs.statusColor,
              marginBottom: 6,
            }}>
              CASE {cs.number}
            </div>
            <div style={{
              fontFamily: font.display,
              fontWeight: 900,
              fontSize: 12,
              color: activeStudy === cs.id ? text.bright : text.dim,
              marginBottom: 4,
              lineHeight: 1.3,
            }}>
              {cs.title}
            </div>
            <div style={{ fontSize: 9, color: text.fainter }}>{cs.subtitle}</div>
            <div style={{
              fontSize: 8,
              letterSpacing: 2,
              color: cs.statusColor,
              marginTop: 8,
              padding: "2px 6px",
              background: `${cs.statusColor}10`,
              border: `1px solid ${cs.statusColor}30`,
              display: "inline-block",
            }}>
              {cs.status}
            </div>
          </button>
        ))}
      </div>

      {/* Section Tabs */}
      <div style={{
        display: "flex",
        gap: 0,
        marginBottom: 24,
        borderBottom: `1px solid ${border.mid}`,
        flexWrap: "wrap",
      }}>
        {CASE_STUDY_FRAMEWORK.structure.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            style={{
              background: activeSection === s.id ? border.subtle : "transparent",
              color: activeSection === s.id ? hue.chartreuse : text.fainter,
              border: `1px solid ${border.mid}`,
              borderBottom: activeSection === s.id ? `1px solid ${ground.canvas}` : `1px solid ${border.mid}`,
              padding: "8px 12px",
              fontSize: 9,
              letterSpacing: 1.5,
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

      {/* Section Description */}
      <div style={{
        fontSize: 10,
        color: text.fainter,
        marginBottom: 20,
        fontStyle: "italic",
      }}>
        {CASE_STUDY_FRAMEWORK.structure.find(s => s.id === activeSection)?.desc}
      </div>

      {/* STRATEGIC CONTEXT */}
      {activeSection === "context" && study && (
        <div>
          <div style={{
            fontFamily: font.display,
            fontWeight: 900,
            fontSize: 20,
            color: text.bright,
            marginBottom: 16,
            lineHeight: 1.3,
          }}>
            {study.context.headline}
          </div>
          <div style={{
            fontSize: 12,
            color: text.secondary,
            lineHeight: 1.8,
            marginBottom: 20,
            maxWidth: 680,
          }}>
            {study.context.body}
          </div>
          <div style={{
            background: ground.inset,
            border: `1px solid ${border.subtle}`,
            borderLeft: `3px solid ${hue.red}`,
            padding: 16,
            maxWidth: 680,
          }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: hue.red, marginBottom: 8 }}>
              THE TENSION
            </div>
            <div style={{ fontSize: 12, color: text.primary, lineHeight: 1.7 }}>
              {study.context.tension}
            </div>
          </div>
        </div>
      )}

      {/* THE BRIEF */}
      {activeSection === "brief" && study && (
        <div style={{ display: "grid", gap: 16, maxWidth: 680 }}>
          <div style={{ background: ground.inset, border: `1px solid ${border.subtle}`, padding: 16 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: text.faint, marginBottom: 8 }}>STATED BRIEF</div>
            <div style={{ fontSize: 12, color: text.secondary, lineHeight: 1.7 }}>{study.brief.stated}</div>
          </div>
          <div style={{ background: ground.inset, border: `1px solid ${border.subtle}`, borderLeft: `3px solid ${hue.chartreuse}`, padding: 16 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: hue.chartreuse, marginBottom: 8 }}>ACTUAL PROBLEM</div>
            <div style={{ fontSize: 12, color: text.primary, lineHeight: 1.7 }}>{study.brief.actual}</div>
          </div>
          <div style={{ background: ground.inset, border: `1px solid ${border.subtle}`, padding: 16 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: hue.red, marginBottom: 8 }}>THE GAP</div>
            <div style={{ fontSize: 12, color: text.secondary, lineHeight: 1.7 }}>{study.brief.gap}</div>
          </div>
        </div>
      )}

      {/* VISUAL ARGUMENT */}
      {activeSection === "argument" && study && (
        <div style={{ display: "grid", gap: 16, maxWidth: 720 }}>
          {study.argument.map((a, i) => (
            <div key={i} style={{
              background: ground.inset,
              border: `1px solid ${border.subtle}`,
              padding: 20,
            }}>
              <div style={{
                fontFamily: font.display,
                fontWeight: 900,
                fontSize: 13,
                color: text.bright,
                marginBottom: 10,
              }}>
                {a.decision}
              </div>
              <div style={{
                fontSize: 11,
                color: text.secondary,
                lineHeight: 1.7,
                marginBottom: 12,
              }}>
                {a.rationale}
              </div>
              <div style={{
                fontSize: 9,
                letterSpacing: 2,
                color: hue.chartreuse,
                padding: "4px 8px",
                background: "rgba(191,255,0,0.05)",
                border: "1px solid rgba(191,255,0,0.15)",
                display: "inline-block",
              }}>
                MATRIX: {a.matrix_ref}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* KEY FRAMES */}
      {activeSection === "frames" && study && (
        <div style={{ display: "grid", gap: 12, maxWidth: 680 }}>
          {study.keyFrames.map((f, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "48px 1fr",
              gap: 16,
              background: ground.inset,
              border: `1px solid ${border.subtle}`,
              padding: 16,
              alignItems: "start",
            }}>
              <div style={{
                width: 48,
                height: 48,
                background: border.faint,
                border: `1px solid ${border.mid}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                color: text.ghost,
                letterSpacing: 2,
              }}>
                IMG
              </div>
              <div>
                <div style={{
                  fontFamily: font.display,
                  fontWeight: 900,
                  fontSize: 12,
                  color: text.bright,
                  marginBottom: 6,
                }}>
                  {f.name}
                </div>
                <div style={{ fontSize: 11, color: text.muted, lineHeight: 1.6 }}>
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
          <div style={{
            fontSize: 10,
            color: text.ghost,
            marginTop: 8,
            padding: 12,
            border: `1px dashed ${border.mid}`,
            textAlign: "center",
          }}>
            Replace IMG placeholders with actual frame crops from the presentation files.
            Each image should be annotated with callout lines pointing to specific design decisions.
          </div>
        </div>
      )}

      {/* SYSTEMS THINKING */}
      {activeSection === "system" && study && (
        <div style={{ maxWidth: 680 }}>
          <div style={{
            background: ground.inset,
            border: `1px solid ${border.subtle}`,
            borderLeft: `3px solid ${hue.chartreuse}`,
            padding: 20,
          }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: hue.chartreuse, marginBottom: 12 }}>
              WHAT THIS PROJECT PROVES
            </div>
            <div style={{
              fontSize: 12,
              color: text.primary,
              lineHeight: 1.8,
            }}>
              {study.systemsProof}
            </div>
          </div>
        </div>
      )}

      {/* OUTCOME */}
      {activeSection === "outcome" && study && (
        <div style={{ display: "grid", gap: 12, maxWidth: 680 }}>
          {[
            { label: "DIRECT OUTCOME", value: study.outcome.direct, accent: hue.chartreuse },
            { label: "CAPABILITY BUILT", value: study.outcome.capability, accent: hue.blueLt },
            { label: "POSITION ESTABLISHED", value: study.outcome.position, accent: hue.tan },
          ].map(o => (
            <div key={o.label} style={{
              background: ground.inset,
              border: `1px solid ${border.subtle}`,
              borderLeft: `3px solid ${o.accent}`,
              padding: 16,
            }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: o.accent, marginBottom: 8 }}>
                {o.label}
              </div>
              <div style={{ fontSize: 12, color: text.primary, lineHeight: 1.7 }}>
                {o.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Writing Notes */}
      <div style={{
        borderTop: `1px solid ${border.mid}`,
        marginTop: 40,
        paddingTop: 20,
      }}>
        <div style={{ fontSize: scale.label, letterSpacing: 3, color: text.label, marginBottom: 12 }}>
          PRODUCTION NOTES
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: narrow ? "1fr" : "1fr 1fr",
          gap: 12,
          fontSize: 10,
          color: text.fainter,
          lineHeight: 1.6,
        }}>
          <div style={{ background: ground.inset, padding: 12, border: `1px solid ${border.subtle}` }}>
            <div style={{ color: hue.chartreuse, fontSize: 9, letterSpacing: 2, marginBottom: 6 }}>FORMAT</div>
            Each case study should be 800-1200 words when written out. Web format (portfolio page or long-scroll) is primary. PDF export for leave-behinds. The artifact framework above provides the skeleton — the writing needs to be tight, specific, and free of design jargon that doesn't serve a strategic audience.
          </div>
          <div style={{ background: ground.inset, padding: 12, border: `1px solid ${border.subtle}` }}>
            <div style={{ color: hue.chartreuse, fontSize: 9, letterSpacing: 2, marginBottom: 6 }}>COMPANION PIECE</div>
            The defense branding article ("Systems Thinking at the Edge" / legibility thesis) should link to these case studies as evidence. Each case study should link back to the article as theoretical framing. Together they form a closed argument loop: thesis → evidence → thesis.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: `1px solid ${border.subtle}`,
        marginTop: 32,
        paddingTop: 16,
        display: "flex",
        justifyContent: "space-between",
        fontSize: 9,
        color: border.strong,
        letterSpacing: 2,
      }}>
        <span>SYSTEM_REF: CASE_STUDY_PKG_V1</span>
        <span>CLASSIFICATION: INTERNAL // ANP STUDIO</span>
      </div>
    </div>
  );
}
