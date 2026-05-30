import CaseStudyPackage from "./artifacts/v1/CaseStudyPackage.jsx";
import DeadlightSystemIdentity from "./artifacts/v1/DeadlightSystemIdentity.jsx";
import StressTestFrames from "./artifacts/v1/StressTestFrames.jsx";
import VisualSystemMatrix from "./artifacts/v1/VisualSystemMatrix.jsx";
import DeadlightRulebookV2 from "./artifacts/v2/DeadlightRulebookV2.jsx";

export const artifacts = [
  {
    id: "rulebook-v2",
    docId: "DEADLIGHT-SPEC-V2.0.0",
    title: "Deadlight Rulebook",
    version: "v2.0.0",
    status: "Canonical",
    date: "2026-04-02",
    description:
      "Expanded rulebook with new registers, scope boundaries, gallery protocol, mark systems, and changelog.",
    group: "v2",
    Component: DeadlightRulebookV2,
    sections: [
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
    ],
  },
  {
    id: "identity-v1",
    docId: "DEADLIGHT-SPEC-V1.0.0",
    title: "System Identity",
    version: "v1.0.0",
    status: "Superseded",
    supersededBy: "rulebook-v2",
    date: "2026-03-28",
    description:
      "Foundational identity spec covering the DEADLIGHT thesis, principles, registers, and subsystem inventory. Folded into the v2 rulebook.",
    group: "v1",
    Component: DeadlightSystemIdentity,
    sections: [
      { id: "identity", label: "IDENTITY" },
      { id: "principles", label: "PRINCIPLES" },
      { id: "registers", label: "REGISTERS" },
      { id: "hierarchy", label: "HIERARCHY" },
      { id: "artifacts", label: "ARTIFACTS" },
    ],
  },
  {
    id: "matrix-v1",
    docId: "DEADLIGHT-DM-V1",
    title: "Decision Matrix",
    version: "v1.0.0",
    status: "Active spec",
    referencedBy: "rulebook-v2",
    date: "2026-03-28",
    description:
      "Maps content functions to material, type, color, and composition decisions. Cited by the v2 rulebook as governing authority for presentations.",
    group: "v1",
    Component: VisualSystemMatrix,
    sections: [
      { id: "matrix", label: "CONTENT → DECISIONS" },
      { id: "type", label: "TYPE REGISTERS" },
      { id: "material", label: "MATERIAL REGISTERS" },
      { id: "color", label: "COLOR PROTOCOL" },
      { id: "outliers", label: "OUTLIER AUDIT" },
    ],
  },
  {
    id: "stress-v1",
    docId: "DEADLIGHT-STF-V1",
    title: "Stress Test Frames",
    version: "v1.0.0",
    status: "Active spec",
    referencedBy: "rulebook-v2",
    date: "2026-03-28",
    description:
      "High-density proof that the system can survive data-heavy technical deliverables. Cited by the v2 rulebook changelog.",
    group: "v1",
    Component: StressTestFrames,
    sections: [
      { id: "rtm", label: "REQUIREMENTS TRACEABILITY" },
      { id: "gantt", label: "PROGRAM TIMELINE" },
      { id: "arch", label: "SYSTEM ARCHITECTURE" },
      { id: "compliance", label: "COMPLIANCE MATRIX" },
    ],
  },
  {
    id: "case-study-v1",
    docId: "DEADLIGHT-CSP-V1",
    title: "Case Study Package",
    version: "v1.0.0",
    status: "Active spec",
    referencedBy: "rulebook-v2",
    date: "2026-03-28",
    description:
      "Three-case-study portfolio artifact organized around strategic context, visual argument, and outcome.",
    group: "v1",
    Component: CaseStudyPackage,
    sections: [
      { id: "algorithmic-warfare", label: "ALGORITHMIC WARFARE" },
      { id: "darpa-navigation", label: "ACQUISITION FRONTIER" },
      { id: "c2-systems", label: "C2 BLUEPRINT" },
    ],
  },
];

// docId → artifactId, for cross-references inside artifacts.
export const docIndex = Object.fromEntries(
  artifacts.filter((a) => a.docId).map((a) => [a.docId, a.id]),
);

export const artifactById = Object.fromEntries(artifacts.map((a) => [a.id, a]));

// Parse "#artifactId/sectionId" → { artifactId, sectionId }. Falls back to the
// canonical rulebook. Validates both ids against the registry.
export function parseRoute(hash) {
  const raw = (hash || "").replace(/^#/, "");
  const [aRaw, sRaw] = raw.split("/");
  const artifact = artifactById[aRaw] ?? artifacts[0];
  const sectionId = artifact.sections?.some((s) => s.id === sRaw)
    ? sRaw
    : (artifact.sections?.[0]?.id ?? null);
  return { artifactId: artifact.id, sectionId, artifact };
}

export function routeHash(artifactId, sectionId) {
  return sectionId ? `#${artifactId}/${sectionId}` : `#${artifactId}`;
}
