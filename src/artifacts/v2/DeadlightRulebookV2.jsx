import { useState } from "react";
import { accent as hue, material, ground, border, text, font, scale, fnColor, intColor } from "../../tokens.js";
import { Tag, Card, SectionHead, RuleRow } from "../../components/primitives.jsx";
import { MaterialSpecimen, TypeSpecimen } from "../../components/specimens.jsx";
import { useViewport } from "../../useViewport.js";

// ═══════════════════════════════════════════
// DEADLIGHT V2.0.0 — COMPLETE RULEBOOK
// ═══════════════════════════════════════════

// Cross-reference targets: doc IDs the rulebook cites → routes in this viewer.
// Kept local (not imported from library.js) to avoid a circular import.
const REF_TARGETS = {
  "DEADLIGHT-DM-V1": "matrix-v1",
  "DEADLIGHT-STF-V1": "stress-v1",
  "DEADLIGHT-CSP-V1": "case-study-v1",
  "DEADLIGHT-SPEC-V1.0.0": "identity-v1",
  "DEADLIGHT-SDA-V1": "rulebook-v2/deck",
};
const REF_RE = new RegExp(
  "(" +
    Object.keys(REF_TARGETS)
      .sort((a, b) => b.length - a.length)
      .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|") +
    ")",
  "g",
);

// Renders text with cited doc IDs turned into in-app navigation links.
function Linkify({ text }) {
  return text.split(REF_RE).map((part, i) =>
    REF_TARGETS[part] ? (
      <button
        key={i}
        onClick={() => { window.location.hash = "#" + REF_TARGETS[part]; }}
        style={{ background: "none", border: 0, padding: 0, font: "inherit", color: hue.chartreuse, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2 }}
        title={`Open ${part}`}
      >
        {part}
      </button>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

const SECTIONS = [
  { id: "identity", label: "IDENTITY" },
  { id: "principles", label: "PRINCIPLES" },
  { id: "materials", label: "MATERIALS" },
  { id: "type", label: "TYPE" },
  { id: "color", label: "COLOR" },
  { id: "content", label: "CONTENT FUNCTIONS" },
  { id: "apply", label: "HOW TO APPLY" },
  { id: "production", label: "PRODUCTION CATEGORIES" },
  { id: "rnd", label: "R&D LAYER" },
  { id: "marks", label: "MARK SYSTEMS" },
  { id: "gallery", label: "GALLERY FORMAT" },
  { id: "hierarchy", label: "HIERARCHY" },
  { id: "boundaries", label: "SCOPE BOUNDARIES" },
  { id: "outliers", label: "OUTLIER AUDIT" },
  { id: "deck", label: "SIGNATURE DECK" },
  { id: "changelog", label: "CHANGELOG" },
];

const PRINCIPLES = [
  { n: "01", name: "CONTROLLED OCCLUSION", s: "What you choose not to show defines the system as much as what you reveal. Every frame has a single thesis. Everything else is blocked." },
  { n: "02", name: "MATERIAL IS MEANING", s: "Texture is a semantic layer, not decoration. Dossier = provenance. Hardware = constraint. Grid = analysis. Terminal = data. Cinematic = inflection. The material register encodes the cognitive frame the audience reads the content against." },
  { n: "03", name: "COLOR IS FUNCTIONAL", s: "Three accents mapped to three meanings. Chartreuse = operative element / active detection. Red = threat / adversary / cost. Blue = allied / friendly / structural. No accent is ever decorative. If it doesn't carry meaning, it doesn't appear." },
  { n: "04", name: "SCALE IS ACCOUNTABILITY", s: "Type at architectural scale cannot be skimmed. When a statement fills the frame edge-to-edge, the audience must confront it. The system uses physical scale to prevent cognitive avoidance." },
  { n: "05", name: "THE SYSTEM SURVIVES DENSITY", s: "A visual identity that only works on impact frames is a portfolio piece. DEADLIGHT is production-grade. It carries a 40-row compliance matrix with the same structural clarity it carries a six-word thesis." },
  { n: "06", name: "THE COLLAGE FEEDS THE SYSTEM", s: "DEADLIGHT's material registers are extracted from the temporal collision collage practice, not invented from abstraction. When the collage practice stops, the system's vocabulary stagnates. Research is infrastructure." },
  { n: "07", name: "RANGE PROVES DISCIPLINE", s: "DEADLIGHT's restraint is a choice, not a limitation. The existence of parallel practices (HEAVY, editorial, cultural production) operating in completely different visual registers demonstrates that the brutalist constraint is deliberate, not default." },
];

const MATERIAL_REGISTERS = [
  { name: "DOSSIER", desc: "Worn manila, rubber bands, foxing, edge damage. Declassified intelligence. Institutional provenance.", when: "Narrative setup, historical context, thesis framing, bookend slides", risk: "Overuse makes everything feel archival rather than forward-looking", ancestry: "Derived from the classified-file collage aesthetic — Office File/1968, Washington postmarks, aged ledger lines" },
  { name: "HARDWARE", desc: "Pelican case rivets, industrial clamps, rubberized straps. Field logistics. Equipment containers.", when: "Constraint framing, tension diagrams, system boundaries, compliance", risk: "Can read as prop-heavy if texture isn't grounded in content logic", ancestry: "Derived from physical military logistics — the actual containers that carry mission-critical equipment into theater" },
  { name: "GRID PAPER", desc: "Engineering pad, graph paper, blue-line grid. Working document. Draft energy.", when: "Technical explainers, analytical matrices, process diagrams, system architecture", risk: "Lowest drama register — needs strong content to carry the frame", ancestry: "Derived from engineering notebooks and ledger paper visible in the collage R&D practice" },
  { name: "TERMINAL", desc: "Flat dark/light background, structured metadata fields. Secure database aesthetic.", when: "Cover pages, data tables, reference material, system docs, stress-test frames", risk: "Can flatten into generic if metadata styling (classification strips, version numbers) isn't precise", ancestry: "Derived from SIPRNET/JWICS interface conventions and Bloomberg terminal density logic" },
  { name: "CINEMATIC", desc: "Atmospheric lighting, volumetric effects, depth. Controlled drama for inflection moments.", when: "Keynote climax, investor pitch peak. MAXIMUM TWO PER DECK.", risk: "Triggers 'too Hollywood' reflex in DoD acquisition audiences. Use only when content justifies the drama.", ancestry: "Derived from the atmospheric composites in the collage practice — rocket engines, prismatic refraction, energy streaks" },
  { name: "DOCUMENTARY", desc: "Photographic content in the surveillance/found-footage register. Overcast, desaturated, no heroic angles. The camera is an instrument, not a storyteller.", when: "Product visualization (CVA-1, REMI), concept renders meant to be evaluated by engineers, operational photography", risk: "Can read as generic stock if the lighting and angle aren't specifically calibrated to deny the heroic", ancestry: "Derived from reconnaissance photography conventions — the CVA-1 renders look like surveillance photographs of something not yet supposed to exist" },
];

const TYPE_REGISTERS = [
  { name: "COMMAND", desc: "Heavy condensed sans-serif. Architectural scale. The general's voice.", usage: "Impact frames, thesis statements, section titles", weight: "900 / Black Condensed", size: "60–120pt equivalent", rule: "6 words maximum. 60%+ frame width. Edge-to-edge. Type IS the frame." },
  { name: "SYSTEMS", desc: "Monospace. Terminal provenance. Machine-readable.", usage: "Metadata, classification markings, data labels, doc references, status indicators", weight: "400 / Regular", size: "10–14pt equivalent", rule: "Always lowercase for field-report body. Uppercase for classification headers and metadata keys." },
  { name: "INSTITUTIONAL", desc: "Serif. White paper authority. Policy weight.", usage: "Explainer titles, doctrine headers, formal body copy, progression labels", weight: "400–700", size: "18–36pt equivalent", rule: "Reserved for content that carries institutional authority — doctrine, policy, standards." },
  { name: "FIELD REPORT", desc: "Monospace, lowercase. Raw. Unprocessed source material.", usage: "Narrative body, operational context, primary source text, case study prose", weight: "400", size: "12–16pt equivalent", rule: "Always lowercase. Never styled or emphasized. The rawness IS the emphasis." },
  { name: "PRODUCT", desc: "Compressed sans-serif. Minimal. The product speaks.", usage: "Product names, model designators, airframe markings (REMI, CVA-1, PROTCTR)", weight: "600–700", size: "Context-dependent (tail code scale to hero display)", rule: "Never decorative. Name + designator only. No taglines, no descriptions. The product is the communication." },
];

const COLOR_PROTOCOL = {
  functional: [
    { swatch: "#BFFF00", name: "CHARTREUSE", role: "TARGETING / ACTIVE DETECTION", rule: "Marks the operative element. Nodes, coordinates, reticle elements, status-pass indicators. Never decorative.", forbid: "Never on text. Never on backgrounds. Never paired with red in the same frame." },
    { swatch: "#FF2D55", name: "RED", role: "THREAT / COST / ADVERSARY", rule: "Reserved for threat content, enemy positions, cost data, failure states, status-fail indicators.", forbid: "Never for friendly elements. Never decorative. Never on covers." },
    { swatch: "#007AFF", name: "BLUE", role: "ALLIED / FRIENDLY / STRUCTURAL", rule: "Friendly force icons, structural elements, allied systems. MIL-STD-2525 convention.", forbid: "Never for threat data. Never mixed with red in same element." },
  ],
  base: [
    { swatch: "#1a1a1a", name: "BASE DARK", role: "PRIMARY GROUND", rule: "80%+ of frame surface area in presentation context. Near-black with slight warmth or cool cast.", forbid: "Never pure #000000." },
    { swatch: "#f5f0eb", name: "BASE LIGHT", role: "DOCUMENT GROUND", rule: "Off-white for grid paper, terminal light-mode, and dossier backgrounds.", forbid: "Never pure #ffffff. Always aged, yellowed, or cool-shifted." },
  ],
  extended: [
    { swatch: "#8FA89A", name: "CELADON", role: "R&D LAYER / COLLAGE GROUND", rule: "Reserved exclusively for the collage R&D practice. Muted sage/celadon field behind diptych compositions.", forbid: "Never appears in presentations. Never in product deliverables. R&D layer only." },
    { swatch: "#D4956A", name: "AMBER GRADIENT", role: "DATA DENSITY RELIEF (optional)", rule: "Warm amber-to-coral gradient permitted for high-density data tables. Reclassified from 'required' to 'optional' after stress test proved terminal register handles density unassisted.", forbid: "Cannot migrate to impact or cover frames. Data context only." },
  ],
  mark: [
    { swatch: "#0000FF", name: "MARK BLUE", role: "DIRECTION DEFENSE MARK — ALLIED", rule: "Pure blue in the mark system. Maps to DEADLIGHT blue (allied/friendly) but uses a more saturated value for mark legibility at small scale.", forbid: "Mark-system only. Does not replace #007AFF in presentation contexts." },
    { swatch: "#FF0000", name: "MARK RED", role: "DIRECTION DEFENSE MARK — THREAT", rule: "Pure red in the mark system. Maps to DEADLIGHT red (threat/adversary). Used for threat-variant mark compositions.", forbid: "Mark-system only. Does not replace #FF2D55 in presentation contexts." },
    { swatch: "#000000", name: "MARK BLACK", role: "DIRECTION DEFENSE MARK — STRUCTURE", rule: "Pure black for structural elements (chevron body, horizontal bars) in mark compositions.", forbid: "Mark-system only." },
  ],
};

const CONTENT_FUNCTIONS = [
  { name: "IMPACT / THESIS", material: "CINEMATIC or DOSSIER", type: "COMMAND", color: "BASE + ONE ACCENT", comp: "FULL BLEED TYPE" },
  { name: "COVER / TITLE", material: "TERMINAL or DOSSIER", type: "COMMAND + SYSTEMS", color: "BASE ONLY", comp: "CENTERED STACK" },
  { name: "NARRATIVE CONTEXT", material: "DOSSIER", type: "FIELD REPORT + COMMAND", color: "BASE + RED (threat only)", comp: "ASYMMETRIC SPLIT" },
  { name: "TECHNICAL EXPLAINER", material: "GRID PAPER", type: "INSTITUTIONAL + SYSTEMS", color: "BASE + CHARTREUSE (nodes)", comp: "DIAGRAM + CALLOUT" },
  { name: "STRATEGIC ANALYSIS", material: "GRID PAPER or HARDWARE", type: "COMMAND + SYSTEMS", color: "BASE + CHARTREUSE (nodes)", comp: "STRUCTURED FIELD" },
  { name: "DATA / REFERENCE", material: "TERMINAL", type: "SYSTEMS + INSTITUTIONAL", color: "AMBER GRADIENT optional", comp: "STACKED ROWS or CARD GRID" },
  { name: "PROCESS / PROGRESSION", material: "GRID PAPER or TERMINAL", type: "INSTITUTIONAL + SYSTEMS", color: "BLUE + RED (MIL-STD)", comp: "LINEAR or ASCENDING PATH" },
];

const PRODUCTION_CATEGORIES = [
  {
    id: "presentations",
    name: "PRESENTATIONS",
    status: "FULLY GOVERNED",
    desc: "Technical proposals (SBIR, BAA, STTR), capability briefings, portfolio presentations, white papers, thought-leadership decks.",
    governed_by: "Decision Matrix (DEADLIGHT-DM-V1), Signature Deck Architecture (DEADLIGHT-SDA-V1)",
    rules: "All 5 material registers, 4 type registers (COMMAND, SYSTEMS, INSTITUTIONAL, FIELD REPORT), full color protocol, 7 content functions, 23-slide canonical sequence with pacing protocol.",
  },
  {
    id: "product_viz",
    name: "PRODUCT VISUALIZATION",
    status: "GOVERNED — V2",
    desc: "Concept renders (CVA-1, PROTCTR), product photography (REMI GRIP-P1), engineering visualizations, digital twins.",
    governed_by: "DEADLIGHT-PV-V2 (this document)",
    rules: "DOCUMENTARY material register. PRODUCT type register. Color protocol applies to HUD overlays and UI elements on renders but NOT to the render environment itself (sky, sea, terrain are naturalistic). Photography uses available or controlled studio light — never stylized. Operator photography uses the civilian-operator hybrid (flannel + plate carrier + NVGs) as the standard figure, not uniformed military.",
  },
  {
    id: "marks",
    name: "MARK SYSTEMS",
    status: "GOVERNED — V2",
    desc: "Brand marks, logomarks, identity symbols (DIRECTION DEFENSE chevron system, airframe markings).",
    governed_by: "DEADLIGHT-MK-V2 (this document)",
    rules: "Three-element vocabulary: vertical bar, chevron (open angle), horizontal bar. Mark-specific color protocol (pure blue, pure red, black). Combinatorial matrix exploration required before selection — all permutations of position, rotation, scale, and color assignment must be generated and evaluated. Marks must survive at icon scale (16px) and display scale (full-bleed).",
  },
  {
    id: "gallery",
    name: "GALLERY / EXHIBITION",
    status: "GOVERNED — V2",
    desc: "Portfolio display, exhibition prints, social media, editorial imagery. The border/frame system.",
    governed_by: "DEADLIGHT-GL-V2 (this document)",
    rules: "Colored hairline border system. Border color sets emotional temperature (NOT functional meaning). Magenta = archival-technological tension. Celadon/sage = pastoral-industrial. Green = environmental/geospatial. Gray = neutral documentary. Border must be uniform width on all four sides. Content within the border follows DOCUMENTARY material register.",
  },
  {
    id: "collage",
    name: "COLLAGE R&D",
    status: "GOVERNED — V2",
    desc: "Temporal collision diptychs on celadon ground. The research layer that feeds DEADLIGHT's material vocabulary.",
    governed_by: "DEADLIGHT-RD-V2 (this document)",
    rules: "Diptych format on #8FA89A celadon ground. Left panel: historical artifact (engravings, paintings, archival photography, found documents). Right panel: contemporary technology or speculative abstraction. The pairing is argumentative — it proposes a structural rhyme, not an illustration. Timestamp markers (#1960, etc.) denote the geological age of the problem, not the artifact.",
  },
  {
    id: "interfaces",
    name: "TACTICAL INTERFACES",
    status: "GOVERNED BY SUBSYSTEMS",
    desc: "TAK-H theater simulator, VOL geospatial webapp, sensor dashboards, C2 operator screens.",
    governed_by: "DARK RELIEF v1.1, VOL v1.0, CYPHER-IFF v2.0",
    rules: "Governed by their respective subsystem specifications. DEADLIGHT's color protocol applies at the meta-level (chartreuse = active, red = threat, blue = allied). Material and type registers are adapted for interactive contexts — monospace for data, sans-serif for labels, no dossier/hardware textures in operational interfaces.",
  },
];

const RND_RULES = [
  { rule: "FORMAT", desc: "Diptych (two panels, side by side) on muted celadon ground (#8FA89A). Consistent padding between panels and from panels to frame edge." },
  { rule: "LEFT PANEL", desc: "Historical artifact. Engravings, paintings, archival photography, declassified documents, stamps, postmarks, ledger pages. Must carry genuine historical weight — no AI-generated pastiche." },
  { rule: "RIGHT PANEL", desc: "Contemporary technology, speculative visualization, abstract 3D, data systems, or scientific imagery. Must create a structural argument when paired with the left panel." },
  { rule: "THE RHYME", desc: "The two panels must propose a structural parallel across time. The viewer should discover the connection, not be told it. No labels, no captions, no explanatory text between panels." },
  { rule: "TIMESTAMP", desc: "Optional. When present (e.g. #1960), marks the geological age of the design problem, not the date of the artifact. Positioned top-left, monospace, black on celadon ground." },
  { rule: "OUTPUT", desc: "Collage R&D is the input layer to DEADLIGHT. New material textures, compositional strategies, and visual vocabularies are extracted from the collage practice and formalized into presentation-grade registers. The practice must be maintained to prevent system vocabulary stagnation." },
  { rule: "FREQUENCY", desc: "Minimum one collage study per month. The practice is infrastructure, not hobby." },
];

const MARK_RULES = [
  { rule: "PRIMITIVES", desc: "Three elements only: vertical bar (|), chevron/open angle (<, >, V, ^), horizontal bar (—). All marks in the DIRECTION DEFENSE system are composed from combinations of these three primitives." },
  { rule: "EXPLORATION METHOD", desc: "Combinatorial matrix. Every permutation of position (left/right/above/below/behind), rotation (0°/90°/180°/270°), scale (icon/display), and color assignment (blue/red/black) must be generated before selection. Minimum 8 variants per composition type." },
  { rule: "COLOR IN MARKS", desc: "Mark-specific palette: pure blue (#0000FF), pure red (#FF0000), pure black (#000000). These are more saturated than the presentation-context equivalents for legibility at small scale. The semantic mapping is preserved: blue = allied/direction, red = threat/defense, black = structure." },
  { rule: "SCALE TEST", desc: "Every mark candidate must be tested at 16px (favicon/icon), 48px (app icon), 200px (document header), and full-bleed (presentation slide). If it fails at any scale, it fails." },
  { rule: "AIRFRAME APPLICATION", desc: "When applied to concept renders or product surfaces, marks function as tail codes — small, structural, identification-grade. Never as logos or branding badges." },
  { rule: "LOCKUP", desc: "'DIRECTION DEFENSE' text lockup uses the SYSTEMS type register (monospace, uppercase). Positioned bottom-left of mark exploration sheets. Never combined with the mark in a formal logo lockup — the mark and the name are independent identification channels." },
];

const GALLERY_RULES = [
  { rule: "BORDER", desc: "Colored hairline border, uniform width on all four sides. Width: 2–4% of frame short dimension. The border is the only colored element in the gallery format — content within is naturalistic/documentary." },
  { rule: "BORDER COLORS", desc: "Magenta (#FF00FF neighborhood): archival-technological tension. Sage/celadon (#8FA89A): pastoral-industrial. Green (#2D8C47 neighborhood): environmental/geospatial. Gray (#888): neutral documentary. Border color is EMOTIONAL TEMPERATURE, not functional meaning." },
  { rule: "CONTENT", desc: "Photographic or render content in the DOCUMENTARY register. No text overlays except product designators (REMI, CVA-1, PROTCTR) in PRODUCT type. No DEADLIGHT presentation elements (no chartreuse nodes, no grid paper, no dossier textures)." },
  { rule: "CONTEXT", desc: "Gallery format is for portfolio display, exhibition, social media, editorial use. It is NOT for presentations, proposals, or technical documents. If the audience is a DARPA PM, use presentation format. If the audience is a portfolio viewer, use gallery format." },
];

const SUBSYSTEMS = [
  { name: "DARK RELIEF", v: "v1.1", domain: "ISR Overlay Visual Language", desc: "Six-layer compositing stack. MIL-STD-2525D symbology, NVG compatibility, sensor overlay rendering." },
  { name: "VOL", v: "v1.0", domain: "Geospatial Operating Language", desc: "Heatmap engine, temporal scrubber, GeoJSON import/export, 12-page spec, dossier-tokens.css." },
  { name: "CYPHER-IFF", v: "v2.0", domain: "Visual Identification Protocol", desc: "Passive visual IFF for drone swarms. 16×16 pixel grid, Cistercian encoding, cryptographic hash." },
  { name: "CELLBLOCK", v: "v1.0", domain: "Style Guide Codename", desc: "YAML-based style spec derived from reference imagery. Companion to DEADLIGHT material registers." },
];

const SCOPE_BOUNDARIES = [
  { name: "HEAVY", status: "OUT OF SCOPE", desc: "Parallel creative practice. Cultural production, editorial, record-label-adjacent identity work. Different palette (deep green, saturated red, holographic, mint), different typography (display-forward, decorative), different compositional logic (scattered, organic). HEAVY proves DEADLIGHT's restraint is a choice. The two systems must never merge.", color: hue.red },
  { name: "ORIGAMI UX", status: "OUT OF SCOPE", desc: "Research framework applying origami mathematics to interface design. Operates under its own theoretical system (Kawasaki's theorem, Maekawa's theorem). Not governed by DEADLIGHT material or type registers.", color: hue.tan },
  { name: "CLIENT BRAND SYSTEMS", status: "CASE-BY-CASE", desc: "Brand systems built for external clients (e.g. Apex Space satellite-bus identifiers, Anthropic Constitution Brand OS). These may borrow DEADLIGHT methodology (systematic exploration, functional color) but operate under client-specific palettes and type choices. DEADLIGHT governs the process, not the output.", color: hue.blueLt },
  { name: "PERSONAL EDITORIAL", status: "LOOSELY GOVERNED", desc: "Social media, blog posts, commentary. May use DEADLIGHT type registers and color protocol at the designer's discretion but is not required to be fully compliant.", color: text.muted },
];

const OUTLIERS = [
  { frame: "Swarm Aero Paradigm", verdict: "KILL", vColor: hue.red, issue: "Ceremonial photography (white gloves, rifle) with serif + gold accent. Introduces a material register used only once.", rec: "Retired. If ceremony is needed in the future, formalize as HONORARY material register with explicit rules. Until then, it's a one-off that breaks the system." },
  { frame: "DARPAConnect (lavender)", verdict: "AUDIENCE VARIANT — CONTAINED", vColor: hue.chartreuse, issue: "Lavender/periwinkle background breaks from every other palette in the system.", rec: "Permitted ONLY for DARPA partnership / ecosystem-onboarding contexts. Must never appear in the same deck as KINETICS, C2 Dossier, or any CINEMATIC-register frame." },
  { frame: "Foundational Infrastructure (amber)", verdict: "OPTIONAL — RECLASSIFIED", vColor: hue.blueLt, issue: "Warm amber-to-coral gradient. Previously classified as 'permitted for density relief.'", rec: "Reclassified to OPTIONAL after stress test proved TERMINAL register handles density without color compensation. Gradient was a crutch. Still permitted but no longer required." },
  { frame: "100,000x Leap (prismatic)", verdict: "CINEMATIC VARIANT", vColor: hue.blueLt, issue: "Holographic refraction overlay. Visually orphaned from core system.", rec: "Filed under CINEMATIC register. Prismatic/refraction effects permitted for compute/AI scaling content only." },
  { frame: "Bloomberg terminal composite", verdict: "R&D REFERENCE — DO NOT PRESENT", vColor: hue.chartreuse, issue: "Bloomberg screenshot is a research artifact, not a presentation element.", rec: "Lives in the R&D COLLAGE layer. Informs the TERMINAL register's density logic but should never appear in a client deliverable." },
];

const DECK_SLIDES = [
  { act: "I", title: "FRAME THE WORLD", slides: [
    { n: 1, t: "SYSTEM COVER", fn: "COVER / TITLE", int: 30 },
    { n: 2, t: "THE THESIS", fn: "IMPACT / THESIS", int: 85 },
    { n: 3, t: "HISTORICAL ANCHOR", fn: "NARRATIVE CONTEXT", int: 50 },
    { n: 4, t: "THE PRODUCTION DEFICIT", fn: "IMPACT / THESIS", int: 95 },
    { n: 5, t: "THE GAP", fn: "STRATEGIC ANALYSIS", int: 40 },
    { n: 6, t: "THE QUESTION", fn: "IMPACT / THESIS", int: 60 },
  ]},
  { act: "II", title: "THE ARCHITECTURE", slides: [
    { n: 7, t: "ACT II BREAK", fn: "COVER / TITLE", int: 20 },
    { n: 8, t: "FIRST PRINCIPLES", fn: "TECHNICAL EXPLAINER", int: 45 },
    { n: 9, t: "THE MECHANISM", fn: "TECHNICAL EXPLAINER", int: 50 },
    { n: 10, t: "OPERATIONAL PROOF", fn: "NARRATIVE CONTEXT", int: 65 },
    { n: 11, t: "THE DATA WALL", fn: "DATA / REFERENCE", int: 35 },
    { n: 12, t: "SYNTHESIS", fn: "STRATEGIC ANALYSIS", int: 55 },
    { n: 13, t: "THE INFLECTION", fn: "IMPACT / THESIS", int: 90 },
  ]},
  { act: "III", title: "THE CAPABILITY", slides: [
    { n: 14, t: "ACT III BREAK", fn: "COVER / TITLE", int: 20 },
    { n: 15, t: "SYSTEM OVERVIEW", fn: "TECHNICAL EXPLAINER", int: 50 },
    { n: 16, t: "OPERATIONAL SCENARIO", fn: "PROCESS / PROGRESSION", int: 60 },
    { n: 17, t: "PERFORMANCE DATA", fn: "DATA / REFERENCE", int: 40 },
    { n: 18, t: "EDGE CASE", fn: "STRATEGIC ANALYSIS", int: 45 },
    { n: 19, t: "ROADMAP", fn: "PROCESS / PROGRESSION", int: 50 },
  ]},
  { act: "IV", title: "THE CLOSE", slides: [
    { n: 20, t: "ACT IV BREAK", fn: "COVER / TITLE", int: 20 },
    { n: 21, t: "THE RESTATEMENT", fn: "IMPACT / THESIS", int: 80 },
    { n: 22, t: "THE ASK", fn: "DATA / REFERENCE", int: 40 },
    { n: 23, t: "END CARD", fn: "COVER / TITLE", int: 15 },
  ]},
];

const CHANGELOG = [
  { version: "2.0.0", date: "2026-04-02", changes: [
    "Added DOCUMENTARY material register for product visualization and concept renders",
    "Added PRODUCT type register for product names and airframe markings",
    "Added Principle 06: THE COLLAGE FEEDS THE SYSTEM",
    "Added Principle 07: RANGE PROVES DISCIPLINE",
    "Added PRODUCTION CATEGORIES section — 6 categories with governance status",
    "Added R&D LAYER section formalizing the collage practice as DEADLIGHT infrastructure",
    "Added MARK SYSTEMS section governing DIRECTION DEFENSE identity work",
    "Added GALLERY FORMAT section governing border/frame exhibition system",
    "Added SCOPE BOUNDARIES section defining HEAVY, ORIGAMI UX, and client work as out-of-scope",
    "Added extended color protocol: celadon (R&D ground), mark-specific pure blue/red/black",
    "Reclassified amber gradient from 'permitted for density relief' to 'optional'",
    "Reclassified Swarm Aero Paradigm outlier from 'KILL or CODIFY' to 'KILL'",
    "Moved Bloomberg terminal composite to R&D reference layer",
    "Expanded subsystem hierarchy to include CELLBLOCK v1.0",
  ]},
  { version: "1.0.0", date: "2026-03-28", changes: [
    "Initial specification: 5 material registers, 4 type registers, 3+2 color protocol, 7 content functions",
    "Decision Matrix (DEADLIGHT-DM-V1)",
    "Signature Deck Architecture (DEADLIGHT-SDA-V1) — 23-slide canonical sequence",
    "Case Study Package (DEADLIGHT-CSP-V1) — 3 case studies",
    "Stress Test Frames (DEADLIGHT-STF-V1) — RTM, Gantt, architecture, compliance",
    "System Identity (DEADLIGHT-SPEC-V1.0.0)",
    "Capability Page (DEADLIGHT-CAP-V1)",
  ]},
];

// ═══════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════
export default function DeadlightV2({ section: sectionProp, onSectionChange, printAll = false }) {
  const [internal, setInternal] = useState("identity");
  const section = sectionProp ?? internal;
  const setSection = onSectionChange ?? setInternal;
  const { narrow } = useViewport();
  const triCol = narrow ? "1fr" : "1fr 1fr 1fr";

  return (
    <div style={{ fontFamily: font.mono, background: ground.canvas, color: text.body, minHeight: "100vh", padding: "24px 20px", boxSizing: "border-box" }}>

      {/* HEADER */}
      <div style={{ marginBottom: 32, borderBottom: `2px solid ${border.mid}`, paddingBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: text.ghost, marginBottom: 16 }}>ANP STUDIO // VISUAL SYSTEM SPECIFICATION</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <h1 style={{ fontFamily: font.display, fontWeight: 900, fontSize: 48, color: text.hi, margin: 0, letterSpacing: -2 }}>DEADLIGHT</h1>
          <Tag color={hue.red}>V2.0.0</Tag>
        </div>
        <div style={{ width: 48, height: 3, background: hue.chartreuse, margin: "12px 0" }} />
        <div style={{ fontSize: 11, color: text.faint, maxWidth: 600, lineHeight: 1.6 }}>
          Complete rulebook governing all visual production for defense-technology communication.
          6 material registers. 5 type registers. Expanded color protocol. 7 content functions.
          6 production categories. R&D layer formalization. Mark system governance. Gallery format protocol.
        </div>
      </div>

      {/* NAV — hidden when printing the full spec */}
      <div style={{ display: printAll ? "none" : "flex", gap: 0, marginBottom: 32, borderBottom: `1px solid ${border.mid}`, flexWrap: "wrap", position: "sticky", top: 0, zIndex: 10, background: ground.canvas, paddingTop: 4 }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)} style={{
            background: section === s.id ? border.subtle : "transparent",
            color: section === s.id ? hue.chartreuse : text.fainter,
            border: `1px solid ${border.mid}`, borderBottom: section === s.id ? `1px solid ${ground.canvas}` : `1px solid ${border.mid}`,
            padding: "8px 12px", fontSize: 9, letterSpacing: 1.5, cursor: "pointer", fontFamily: font.mono, marginBottom: -1,
          }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* ═══ IDENTITY ═══ */}
      {(printAll || section === "identity") && (
        <div style={{ maxWidth: 760 }}>
          <SectionHead label="IDENTITY" sub="Etymology, thesis, operational scope" />
          <Card accent={hue.chartreuse} style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: font.serif, fontSize: scale.sub, fontStyle: "italic", color: text.secondary, marginBottom: 8 }}>
              dead·light <span style={{ fontStyle: "normal", color: text.label }}>/ˈdedˌlīt/</span>
            </div>
            <div style={{ fontFamily: font.serif, fontSize: scale.body, color: text.soft, lineHeight: 1.8, marginBottom: 12 }}>
              <span style={{ fontStyle: "italic", color: text.label }}>noun, nautical.</span> A fixed porthole cover fitted over a ship's window to protect against water ingress while maintaining controlled visibility. What passes through is deliberate.
            </div>
          </Card>
          {/* COMMAND-scale thesis moment — Principle 04, edge-to-edge, cannot be skimmed. */}
          <div style={{ borderLeft: `3px solid ${hue.chartreuse}`, padding: "22px 20px", marginBottom: 20, background: "linear-gradient(180deg, rgba(191,255,0,0.04), transparent)" }}>
            <div style={{ fontSize: scale.label, letterSpacing: 3, color: hue.chartreuse, marginBottom: 12 }}>CORE THESIS</div>
            <div style={{ fontFamily: font.display, fontWeight: 900, fontSize: "clamp(30px, 6.5vw, 54px)", color: text.hi, lineHeight: 0.98, letterSpacing: -1.5, textTransform: "uppercase" }}>
              Making invisible structure visible under pressure.
            </div>
          </div>
          <Card>
            <div style={{ fontSize: scale.label, letterSpacing: 3, color: text.label, marginBottom: 8 }}>OPERATIONAL SCOPE</div>
            <div style={{ fontSize: scale.body, color: text.soft, lineHeight: 1.7 }}>
              DEADLIGHT governs all visual production by ANP Studio for defense-technology contexts across six production categories: presentations, product visualization, mark systems, gallery/exhibition, collage R&D, and tactical interfaces. Tactical interfaces are governed by domain-specific subsystems (DARK RELIEF, VOL, CYPHER-IFF) that inherit DEADLIGHT's color protocol.
            </div>
          </Card>
        </div>
      )}

      {/* ═══ PRINCIPLES ═══ */}
      {(printAll || section === "principles") && (
        <div style={{ maxWidth: 640 }}>
          <SectionHead label="GOVERNING PRINCIPLES" sub="7 principles — V2 adds 06 and 07" />
          <div style={{ display: "grid", gap: 8 }}>
            {PRINCIPLES.map(p => (
              <Card key={p.n}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 10, color: hue.chartreuse }}>{p.n}</span>
                  <span style={{ fontFamily: font.display, fontWeight: 900, fontSize: 13, color: text.bright, letterSpacing: 1 }}>{p.name}</span>
                  {(p.n === "06" || p.n === "07") && <Tag color={hue.red}>NEW V2</Tag>}
                </div>
                <div style={{ fontSize: 11, color: text.muted, lineHeight: 1.7 }}>{p.s}</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ═══ MATERIALS ═══ */}
      {(printAll || section === "materials") && (
        <div style={{ maxWidth: 760 }}>
          <SectionHead label="MATERIAL REGISTERS" sub="6 registers — V2 adds DOCUMENTARY" />
          <div style={{ display: "grid", gap: 10 }}>
            {MATERIAL_REGISTERS.map((m, i) => (
              <Card key={m.name}>
                <div style={{ marginBottom: 12 }}>
                  <MaterialSpecimen name={m.name} />
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                  <Tag>{String(i + 1).padStart(2, "0")}</Tag>
                  <span style={{ fontFamily: font.display, fontWeight: 900, fontSize: 18, color: text.bright }}>{m.name}</span>
                  {m.name === "DOCUMENTARY" && <Tag color={hue.red}>NEW V2</Tag>}
                </div>
                <div style={{ fontSize: scale.body, color: text.soft, lineHeight: 1.6, marginBottom: 10 }}>{m.desc}</div>
                <div style={{ display: "grid", gridTemplateColumns: triCol, gap: 8 }}>
                  <Card><div style={{ fontSize: scale.micro, letterSpacing: 2, color: text.label, marginBottom: 4 }}>WHEN</div><div style={{ fontSize: scale.meta, color: text.secondary, lineHeight: 1.5 }}>{m.when}</div></Card>
                  <Card><div style={{ fontSize: scale.micro, letterSpacing: 2, color: hue.red, marginBottom: 4 }}>RISK</div><div style={{ fontSize: scale.meta, color: text.secondary, lineHeight: 1.5 }}>{m.risk}</div></Card>
                  <Card><div style={{ fontSize: scale.micro, letterSpacing: 2, color: hue.blueLt, marginBottom: 4 }}>ANCESTRY</div><div style={{ fontSize: scale.meta, color: text.secondary, lineHeight: 1.5 }}>{m.ancestry}</div></Card>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ═══ TYPE ═══ */}
      {(printAll || section === "type") && (
        <div style={{ maxWidth: 760 }}>
          <SectionHead label="TYPE REGISTERS" sub="5 registers — V2 adds PRODUCT" />
          <div style={{ display: "grid", gap: 10 }}>
            {TYPE_REGISTERS.map((t, i) => (
              <Card key={t.name}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                  <Tag>{String(i + 1).padStart(2, "0")}</Tag>
                  <span style={{ fontFamily: font.display, fontWeight: 900, fontSize: 18, color: text.bright }}>{t.name}</span>
                  {t.name === "PRODUCT" && <Tag color={hue.red}>NEW V2</Tag>}
                </div>
                <div style={{ marginBottom: 10 }}>
                  <TypeSpecimen name={t.name} />
                </div>
                <div style={{ fontSize: scale.body, color: text.soft, lineHeight: 1.6, marginBottom: 8 }}>{t.desc}</div>
                <div style={{ display: "grid", gridTemplateColumns: triCol, gap: 8 }}>
                  <Card><div style={{ fontSize: scale.micro, letterSpacing: 2, color: text.label, marginBottom: 4 }}>USAGE</div><div style={{ fontSize: scale.meta, color: text.secondary }}>{t.usage}</div></Card>
                  <Card><div style={{ fontSize: scale.micro, letterSpacing: 2, color: text.label, marginBottom: 4 }}>WEIGHT / SIZE</div><div style={{ fontSize: scale.meta, color: text.secondary }}>{t.weight} / {t.size}</div></Card>
                  <Card><div style={{ fontSize: scale.micro, letterSpacing: 2, color: hue.chartreuse, marginBottom: 4 }}>RULE</div><div style={{ fontSize: scale.meta, color: text.secondary }}>{t.rule}</div></Card>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ═══ COLOR ═══ */}
      {(printAll || section === "color") && (
        <div style={{ maxWidth: 700 }}>
          <SectionHead label="COLOR PROTOCOL" sub="3 functional accents + 2 base + 3 extended (V2) + 3 mark-specific (V2)" />
          {[
            { label: "FUNCTIONAL ACCENTS", items: COLOR_PROTOCOL.functional },
            { label: "BASE TONES", items: COLOR_PROTOCOL.base },
            { label: "EXTENDED PALETTE (V2)", items: COLOR_PROTOCOL.extended, isNew: true },
            { label: "MARK-SPECIFIC (V2)", items: COLOR_PROTOCOL.mark, isNew: true },
          ].map(group => (
            <div key={group.label} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: text.fainter }}>{group.label}</div>
                {group.isNew && <Tag color={hue.red}>NEW V2</Tag>}
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                {group.items.map(c => (
                  <div key={c.name} style={{ border: `1px solid ${border.subtle}`, padding: 14, display: "grid", gridTemplateColumns: "36px 1fr", gap: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 3, background: c.swatch, border: c.swatch === "#1a1a1a" || c.swatch === "#000000" ? `1px solid ${border.strong}` : "none" }} />
                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontFamily: font.display, fontWeight: 900, fontSize: 12, color: text.bright }}>{c.name}</span>
                        <span style={{ fontSize: 9, color: text.fainter }}>{c.swatch}</span>
                      </div>
                      <div style={{ fontSize: 10, letterSpacing: 1, color: c.swatch === "#1a1a1a" || c.swatch === "#000000" || c.swatch === "#f5f0eb" ? text.faint : c.swatch, marginBottom: 4 }}>{c.role}</div>
                      <div style={{ fontSize: 10, color: text.muted, lineHeight: 1.5, marginBottom: 4 }}>{c.rule}</div>
                      <div style={{ fontSize: 9, color: hue.red, opacity: 0.7 }}>✕ {c.forbid}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ CONTENT FUNCTIONS ═══ */}
      {(printAll || section === "content") && (
        <div style={{ maxWidth: 760 }}>
          <SectionHead label="CONTENT FUNCTIONS" sub="7 functions — unchanged from V1" />
          <div style={{ display: "grid", gap: narrow ? 8 : 4 }}>
            {CONTENT_FUNCTIONS.map((fn, i) => (
              narrow ? (
              <div key={fn.name} style={{ padding: "12px 10px", background: ground.card, border: `1px solid ${border.faint}` }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: scale.meta, color: hue.chartreuse }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: scale.body, color: text.bright, fontFamily: font.display, fontWeight: 700 }}>{fn.name}</span>
                </div>
                {[["MATERIAL", fn.material], ["TYPE", fn.type], ["COLOR", fn.color], ["COMP", fn.comp]].map(([k, v]) => (
                  <div key={k} style={{ display: "grid", gridTemplateColumns: "84px 1fr", gap: 8, padding: "2px 0" }}>
                    <span style={{ fontSize: scale.micro, letterSpacing: 1.5, color: text.label }}>{k}</span>
                    <span style={{ fontSize: scale.meta, color: text.secondary }}>{v}</span>
                  </div>
                ))}
              </div>
              ) : (
              <div key={fn.name} style={{ display: "grid", gridTemplateColumns: "28px 180px 1fr 1fr 1fr 1fr", gap: 8, alignItems: "center", padding: "10px 8px", background: i % 2 === 0 ? "transparent" : ground.card, borderBottom: `1px solid ${border.faint}` }}>
                <span style={{ fontSize: scale.meta, color: hue.chartreuse }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: scale.body, color: text.bright, fontFamily: font.display, fontWeight: 700 }}>{fn.name}</span>
                <span style={{ fontSize: scale.micro, color: text.label }}>{fn.material}</span>
                <span style={{ fontSize: scale.micro, color: text.label }}>{fn.type}</span>
                <span style={{ fontSize: scale.micro, color: text.label }}>{fn.color}</span>
                <span style={{ fontSize: scale.micro, color: text.label }}>{fn.comp}</span>
              </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* ═══ HOW TO APPLY (worked example) ═══ */}
      {(printAll || section === "apply") && (
        <div style={{ maxWidth: 760 }}>
          <SectionHead label="HOW TO APPLY" sub="One brief, resolved through the system to a finished frame" />

          {/* STEP 1 — the brief */}
          <Card accent={hue.tan} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: scale.label, letterSpacing: 3, color: hue.tan, marginBottom: 8 }}>STEP 1 · THE BRIEF</div>
            <div style={{ fontSize: scale.body, color: text.soft, lineHeight: 1.7 }}>
              "Open the keynote by confronting the audience with the munitions production deficit." A single, room-stopping
              statement. No data yet, no diagram — this frame exists to make the problem undeniable.
            </div>
          </Card>

          {/* STEP 2 — resolve the content function in the matrix */}
          <Card accent={hue.chartreuse} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: scale.label, letterSpacing: 3, color: hue.chartreuse, marginBottom: 10 }}>STEP 2 · RESOLVE THE MATRIX ROW</div>
            <div style={{ fontSize: scale.meta, color: text.dim, lineHeight: 1.6, marginBottom: 12 }}>
              A room-stopping statement is the <strong style={{ color: text.bright }}>IMPACT / THESIS</strong> content function.
              That row dictates every decision:
            </div>
            <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "1fr 1fr", gap: 8 }}>
              {[
                ["MATERIAL", "CINEMATIC", "the content justifies the drama — max two per deck", material.celadon],
                ["TYPE", "COMMAND", "6 words, 60%+ frame width, edge-to-edge", hue.chartreuse],
                ["COLOR", "BASE + RED", "red = threat / cost. one accent only", hue.red],
                ["COMPOSITION", "FULL BLEED TYPE", "type IS the frame. no margins", hue.blueLt],
              ].map(([k, v, why, c]) => (
                <div key={k} style={{ background: ground.inset, border: `1px solid ${border.subtle}`, borderLeft: `3px solid ${c}`, padding: 12 }}>
                  <div style={{ fontSize: scale.micro, letterSpacing: 2, color: text.label, marginBottom: 4 }}>{k}</div>
                  <div style={{ fontFamily: font.display, fontWeight: 900, fontSize: scale.sub, color: text.bright, marginBottom: 4 }}>{v}</div>
                  <div style={{ fontSize: scale.meta, color: text.dim, lineHeight: 1.5 }}>{why}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* STEP 3 — the rendered frame */}
          <div style={{ fontSize: scale.label, letterSpacing: 3, color: hue.red, margin: "18px 0 10px" }}>STEP 3 · THE FRAME</div>
          <div style={{ position: "relative", border: `1px solid ${border.mid}`, borderRadius: 3, overflow: "hidden", aspectRatio: "16 / 9", minHeight: 220,
            background: `radial-gradient(120% 90% at 25% 120%, rgba(134,167,173,0.30) 0%, transparent 55%),
                        radial-gradient(90% 70% at 90% -10%, rgba(255,45,85,0.28) 0%, transparent 60%),
                        linear-gradient(180deg, #0c1518 0%, #05090b 100%)`,
            display: "flex", alignItems: "center", padding: narrow ? "20px" : "28px 36px" }}>
            <div>
              <div style={{ fontFamily: font.mono, fontSize: scale.micro, letterSpacing: 3, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>CINEMATIC · IMPACT / THESIS</div>
              <div style={{ fontFamily: font.display, fontWeight: 900, fontSize: "clamp(26px, 5.5vw, 50px)", lineHeight: 0.96, letterSpacing: -1.5, color: "#f4f4f4", textTransform: "uppercase" }}>
                Seven days of<br />munitions. <span style={{ color: hue.red }}>Then nothing.</span>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "1fr 1fr 1fr", gap: 8, marginTop: 10 }}>
            {[
              ["CINEMATIC ground", "atmospheric depth, controlled — not decoration", material.celadon],
              ["COMMAND type", "six words, fills the frame, cannot be skimmed", hue.chartreuse],
              ["RED, once", "marks the cost. the only accent present", hue.red],
            ].map(([k, v, c]) => (
              <div key={k} style={{ borderTop: `2px solid ${c}`, paddingTop: 8 }}>
                <div style={{ fontSize: scale.micro, letterSpacing: 2, color: c, marginBottom: 3 }}>{k}</div>
                <div style={{ fontSize: scale.meta, color: text.dim, lineHeight: 1.5 }}>{v}</div>
              </div>
            ))}
          </div>

          <Card style={{ marginTop: 16 }}>
            <div style={{ fontSize: scale.meta, color: text.dim, lineHeight: 1.7 }}>
              Every choice traces to a row in the <Linkify text="Decision Matrix (DEADLIGHT-DM-V1)" />. The frame is not
              designed by taste — it is <strong style={{ color: text.bright }}>resolved</strong> from the brief. That is the
              system working: a different brief lands on a different row and produces a different, equally inevitable frame.
            </div>
          </Card>
        </div>
      )}

      {/* ═══ PRODUCTION CATEGORIES ═══ */}
      {(printAll || section === "production") && (
        <div style={{ maxWidth: 700 }}>
          <SectionHead label="PRODUCTION CATEGORIES" sub="6 categories — what DEADLIGHT governs and how" />
          <div style={{ display: "grid", gap: 10 }}>
            {PRODUCTION_CATEGORIES.map(pc => (
              <Card key={pc.id}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontFamily: font.display, fontWeight: 900, fontSize: 14, color: text.bright }}>{pc.name}</span>
                  <Tag color={pc.status.includes("V2") ? hue.red : pc.status.includes("SUBSYSTEM") ? hue.blueLt : hue.chartreuse}>{pc.status}</Tag>
                </div>
                <div style={{ fontSize: 11, color: text.secondary, lineHeight: 1.6, marginBottom: 10 }}>{pc.desc}</div>
                <div style={{ fontSize: 9, color: text.fainter, marginBottom: 6 }}>GOVERNED BY: <Linkify text={pc.governed_by} /></div>
                <div style={{ fontSize: 10, color: text.dim, lineHeight: 1.6, background: ground.inset, padding: 10, border: `1px solid ${border.faint}` }}>{pc.rules}</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ═══ R&D LAYER ═══ */}
      {(printAll || section === "rnd") && (
        <div style={{ maxWidth: 640 }}>
          <SectionHead label="R&D LAYER: THE COLLAGE PRACTICE" sub="The research stratum that feeds DEADLIGHT's material vocabulary" />
          <Card accent={material.celadon} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: text.primary, lineHeight: 1.8 }}>
              DEADLIGHT's material registers are extracted from the temporal collision collage practice — not invented from abstraction. The dossier register descends from classified-file composites. The grid-paper register descends from ledger-line backgrounds. The cinematic register descends from atmospheric photo composites. When this practice stops, the system's vocabulary stagnates.
            </div>
          </Card>
          {RND_RULES.map(r => <RuleRow key={r.rule} {...r} />)}
        </div>
      )}

      {/* ═══ MARK SYSTEMS ═══ */}
      {(printAll || section === "marks") && (
        <div style={{ maxWidth: 640 }}>
          <SectionHead label="MARK SYSTEMS: DIRECTION DEFENSE" sub="Governing rules for the chevron/bar identity system" />
          {MARK_RULES.map(r => <RuleRow key={r.rule} {...r} />)}
        </div>
      )}

      {/* ═══ GALLERY FORMAT ═══ */}
      {(printAll || section === "gallery") && (
        <div style={{ maxWidth: 640 }}>
          <SectionHead label="GALLERY FORMAT" sub="Border/frame system for exhibition, portfolio, and editorial use" />
          {GALLERY_RULES.map(r => <RuleRow key={r.rule} {...r} />)}
        </div>
      )}

      {/* ═══ HIERARCHY ═══ */}
      {(printAll || section === "hierarchy") && (
        <div style={{ maxWidth: 640 }}>
          <SectionHead label="SYSTEM HIERARCHY" sub="DEADLIGHT and its subsystems" />
          <div style={{ border: `2px solid ${hue.chartreuse}`, padding: 16, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontFamily: font.display, fontWeight: 900, fontSize: 20, color: text.hi }}>DEADLIGHT</span>
              <Tag>PARENT SYSTEM</Tag>
              <Tag color={hue.red}>V2.0.0</Tag>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 8, marginTop: 12, fontSize: 9, color: text.fainter }}>
              {[["6","material"],["5","type"],["11","color"],["7","content"],["6","production"]].map(([n,l])=>(
                <div key={l}><span style={{ color: hue.chartreuse }}>{n}</span> {l}</div>
              ))}
            </div>
          </div>
          <div style={{ paddingLeft: 32, display: "grid", gap: 4 }}>
            {SUBSYSTEMS.map(s => (
              <div key={s.name} style={{ display: "flex", gap: 0 }}>
                <div style={{ width: 20, borderTop: `2px solid ${border.strong}`, marginTop: 16, flexShrink: 0 }} />
                <Card style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontFamily: font.display, fontWeight: 900, fontSize: 13, color: text.bright }}>{s.name}</span>
                    <span style={{ fontSize: 9, color: text.fainter }}>{s.v}</span>
                    {s.name === "CELLBLOCK" && <Tag color={hue.red}>NEW V2</Tag>}
                  </div>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: text.fainter, marginBottom: 4 }}>{s.domain}</div>
                  <div style={{ fontSize: 10, color: text.dim, lineHeight: 1.5 }}>{s.desc}</div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ SCOPE BOUNDARIES ═══ */}
      {(printAll || section === "boundaries") && (
        <div style={{ maxWidth: 640 }}>
          <SectionHead label="SCOPE BOUNDARIES" sub="What DEADLIGHT does NOT govern" />
          <div style={{ display: "grid", gap: 10 }}>
            {SCOPE_BOUNDARIES.map(b => (
              <Card key={b.name} accent={b.color}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontFamily: font.display, fontWeight: 900, fontSize: 14, color: text.bright }}>{b.name}</span>
                  <Tag color={b.color}>{b.status}</Tag>
                </div>
                <div style={{ fontSize: 11, color: text.secondary, lineHeight: 1.7 }}>{b.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ═══ OUTLIERS ═══ */}
      {(printAll || section === "outliers") && (
        <div style={{ maxWidth: 640 }}>
          <SectionHead label="OUTLIER AUDIT" sub="V2 updates — resolved and reclassified" />
          <div style={{ display: "grid", gap: 10 }}>
            {OUTLIERS.map(o => (
              <Card key={o.frame}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontFamily: font.display, fontWeight: 900, fontSize: 13, color: text.bright }}>{o.frame}</span>
                  <Tag color={o.vColor}>{o.verdict}</Tag>
                </div>
                <div style={{ fontSize: 11, color: text.secondary, lineHeight: 1.6, marginBottom: 10 }}>{o.issue}</div>
                <Card><span style={{ color: hue.chartreuse, fontSize: 9, letterSpacing: 2 }}>RECOMMENDATION: </span><span style={{ fontSize: 11, color: text.muted }}>{o.rec}</span></Card>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ═══ SIGNATURE DECK ═══ */}
      {(printAll || section === "deck") && (
        <div style={{ maxWidth: 700 }}>
          <SectionHead label="SIGNATURE DECK ARCHITECTURE" sub="23 slides / 4 acts / unchanged from V1" />
          {DECK_SLIDES.map(act => (
            <div key={act.act} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: text.fainter, padding: "8px 0", borderBottom: `1px solid ${border.mid}` }}>
                ACT {act.act}: {act.title}
              </div>
              {act.slides.map(s => (
                <div key={s.n} style={{ display: "grid", gridTemplateColumns: "28px 160px 140px 1fr", gap: 8, alignItems: "center", padding: "7px 6px", borderBottom: `1px solid ${border.faint}` }}>
                  <span style={{ fontSize: 10, color: hue.chartreuse }}>{String(s.n).padStart(2, "0")}</span>
                  <span style={{ fontSize: 11, color: text.primary, fontFamily: font.display, fontWeight: 700 }}>{s.t}</span>
                  <span style={{ fontSize: 9, color: fnColor[s.fn] || text.fainter }}>{s.fn}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ height: 3, width: `${s.int}%`, background: intColor(s.int), borderRadius: 1 }} />
                    <span style={{ fontSize: 8, color: text.ghost }}>{s.int}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ═══ CHANGELOG ═══ */}
      {(printAll || section === "changelog") && (
        <div style={{ maxWidth: 640 }}>
          <SectionHead label="CHANGELOG" sub="Version history" />
          {CHANGELOG.map(v => (
            <div key={v.version} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
                <span style={{ fontFamily: font.display, fontWeight: 900, fontSize: 16, color: text.bright }}>{v.version}</span>
                <span style={{ fontSize: 10, color: text.fainter }}>{v.date}</span>
                {v.version === "2.0.0" && <Tag color={hue.red}>CURRENT</Tag>}
              </div>
              <div style={{ display: "grid", gap: 4 }}>
                {v.changes.map((c, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 8, padding: "4px 0" }}>
                    <span style={{ fontSize: 9, color: hue.chartreuse }}>+</span>
                    <span style={{ fontSize: 10, color: text.muted, lineHeight: 1.5 }}><Linkify text={c} /></span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${border.subtle}`, marginTop: 40, paddingTop: 16, display: "flex", justifyContent: "space-between", fontSize: 9, color: text.ghoster, letterSpacing: 2 }}>
        <span>DEADLIGHT-SPEC-V2.0.0</span>
        <span>CANONICAL // ANP STUDIO</span>
      </div>
    </div>
  );
}
