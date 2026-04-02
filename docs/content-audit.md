# DEADLIGHT Content Audit

Date: 2026-04-02

## Canonical Source

The canonical document is `src/artifacts/v2/DeadlightRulebookV2.jsx`. The March 28 files are preserved as legacy references because they still contain useful framing, but they are no longer the authoritative spec.

## Key Drift

1. Material registers move from 5 in v1 to 6 in v2 with the addition of `DOCUMENTARY`.
2. Type registers move from 4 in v1 to 5 in v2 with the addition of `PRODUCT`.
3. Scope expands in v2 from general defense communication guidance into six explicit production categories plus subsystem inheritance rules for tactical interfaces.
4. Color guidance expands in v2 with extended and mark-specific palettes. The warm gradient on dense data frames moves from a v1 permitted tactic to an optional tactic in v2.
5. Outlier handling becomes stricter in v2. `Swarm Aero Paradigm` is no longer "kill or codify"; it is explicitly marked `KILL`. The Bloomberg terminal composite is moved into the R&D layer only.
6. v2 formalizes new governance areas that do not exist in the v1 files: R&D layer, mark systems, gallery format, scope boundaries, and a changelog.

## Workspace Issues Found

1. `1_case_study_package.jsx` and `case_study_package.jsx` were identical duplicates.
2. The folder name `Dealight_v2_april` appears to be a typo for `Deadlight`.
3. The v2 changelog references a `Capability Page (DEADLIGHT-CAP-V1)`, but no matching file exists in this workspace.

## Recommendation

Keep the v2 rulebook as the source of truth. Treat the v1 components as historical artifacts unless a specific section needs to be merged forward deliberately.
