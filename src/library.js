import CaseStudyPackage from "./artifacts/v1/CaseStudyPackage.jsx";
import DeadlightSystemIdentity from "./artifacts/v1/DeadlightSystemIdentity.jsx";
import StressTestFrames from "./artifacts/v1/StressTestFrames.jsx";
import VisualSystemMatrix from "./artifacts/v1/VisualSystemMatrix.jsx";
import DeadlightRulebookV2 from "./artifacts/v2/DeadlightRulebookV2.jsx";

export const artifacts = [
  {
    id: "rulebook-v2",
    title: "Deadlight Rulebook",
    version: "v2.0.0",
    status: "Canonical",
    date: "2026-04-02",
    description:
      "Expanded rulebook with new registers, scope boundaries, gallery protocol, mark systems, and changelog.",
    group: "v2",
    Component: DeadlightRulebookV2,
  },
  {
    id: "identity-v1",
    title: "System Identity",
    version: "v1.0.0",
    status: "Legacy",
    date: "2026-03-28",
    description:
      "Foundational identity spec covering the DEADLIGHT thesis, principles, registers, and subsystem inventory.",
    group: "v1",
    Component: DeadlightSystemIdentity,
  },
  {
    id: "matrix-v1",
    title: "Decision Matrix",
    version: "v1.0.0",
    status: "Legacy",
    date: "2026-03-28",
    description:
      "Maps content functions to material, type, color, and composition decisions.",
    group: "v1",
    Component: VisualSystemMatrix,
  },
  {
    id: "stress-v1",
    title: "Stress Test Frames",
    version: "v1.0.0",
    status: "Legacy",
    date: "2026-03-28",
    description:
      "High-density proof that the system can survive data-heavy technical deliverables.",
    group: "v1",
    Component: StressTestFrames,
  },
  {
    id: "case-study-v1",
    title: "Case Study Package",
    version: "v1.0.0",
    status: "Legacy",
    date: "2026-03-28",
    description:
      "Three-case-study portfolio artifact organized around strategic context, visual argument, and outcome.",
    group: "v1",
    Component: CaseStudyPackage,
  },
];

export const auditHighlights = [
  "V2 is the canonical system. It adds the DOCUMENTARY material register and PRODUCT type register that do not exist in the v1 specs.",
  "The v1 matrix permits a warm gradient for dense data slides; the v2 changelog downgrades that move from density relief to optional.",
  "Operational scope expands in v2 from broad defense communication into six explicit production categories plus subsystem inheritance for tactical interfaces.",
  "Outlier governance tightens in v2: Swarm Aero Paradigm moves from 'kill or codify' to 'kill', and the Bloomberg composite is pushed into the R&D layer only.",
  "The workspace had a duplicate file: 1_case_study_package.jsx matched case_study_package.jsx exactly.",
];
