import { useEffect, useState } from "react";
import { artifacts, artifactById, parseRoute, routeHash } from "./library.js";

const groups = [
  { label: "April 2, 2026", list: artifacts.filter((a) => a.group === "v2") },
  { label: "March 28, 2026", list: artifacts.filter((a) => a.group === "v1") },
];

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  const [query, setQuery] = useState("");
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    const onHash = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Print/PDF: flip to full-spec render, let it flush, then open the print
  // dialog (user saves as PDF). Reset once the dialog closes.
  useEffect(() => {
    if (!printing) return;
    const done = () => setPrinting(false);
    window.addEventListener("afterprint", done);
    const id = setTimeout(() => window.print(), 80);
    return () => {
      window.removeEventListener("afterprint", done);
      clearTimeout(id);
    };
  }, [printing]);

  // Keep the URL canonical as #artifact/section.
  useEffect(() => {
    const want = routeHash(route.artifactId, route.sectionId);
    if (window.location.hash !== want) {
      window.history.replaceState(null, "", want);
    }
  }, [route.artifactId, route.sectionId]);

  const navigate = (artifactId, sectionId) => {
    const a = artifactById[artifactId] ?? artifacts[0];
    const sid = sectionId ?? a.sections?.[0]?.id ?? null;
    setRoute({ artifactId: a.id, sectionId: sid, artifact: a });
  };

  const activeArtifact = route.artifact;
  const ActiveComponent = activeArtifact.Component;

  // Search over artifact titles/docIds and their section labels.
  const q = query.trim().toLowerCase();
  const filterArtifact = (a) => {
    if (!q) return { show: true, sections: a.sections ?? [] };
    const titleHit =
      a.title.toLowerCase().includes(q) ||
      a.id.includes(q) ||
      (a.docId || "").toLowerCase().includes(q);
    const secHits = (a.sections ?? []).filter(
      (s) => s.label.toLowerCase().includes(q) || s.id.includes(q),
    );
    return { show: titleHit || secHits.length > 0, sections: titleHit ? a.sections ?? [] : secHits };
  };

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="sidebar-block">
          <div className="eyebrow">Library</div>
          <h1>DEADLIGHT</h1>
          <p className="sidebar-copy">
            A focused viewer for the DEADLIGHT rulebook and its supporting
            specifications.
          </p>
        </div>

        <div className="sidebar-block">
          <div className="eyebrow">Artifacts</div>
          <input
            className="sidebar-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artifacts + sections…"
            aria-label="Search artifacts and sections"
          />

          {groups.map(({ label, list }) => {
            const items = list.map((a) => ({ a, ...filterArtifact(a) })).filter((x) => x.show);
            if (!items.length) return null;
            return (
              <div key={label}>
                <div className="artifact-group-label">{label}</div>
                {items.map(({ a, sections }) => {
                  const isActive = route.artifactId === a.id;
                  const showSections = (isActive || q) && sections.length > 0;
                  return (
                    <div key={a.id} className="artifact-nav">
                      <button
                        className={`artifact-button ${isActive ? "is-active" : ""}`}
                        onClick={() => navigate(a.id)}
                      >
                        <span className="artifact-title">{a.title}</span>
                        <span className="artifact-meta">
                          {a.version} · {a.status}
                        </span>
                      </button>
                      {showSections && (
                        <div className="section-list">
                          {sections.map((s) => (
                            <button
                              key={s.id}
                              className={`section-button ${
                                isActive && route.sectionId === s.id ? "is-active" : ""
                              }`}
                              onClick={() => navigate(a.id, s.id)}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </aside>

      <main className="app-main">
        <header className="viewer-header">
          <div>
            <div className="eyebrow">Active Artifact</div>
            <h2>{activeArtifact.title}</h2>
            <p>{activeArtifact.description}</p>
          </div>
          <div className="viewer-meta">
            {activeArtifact.docId && <span className="viewer-meta-doc">{activeArtifact.docId}</span>}
            <span>{activeArtifact.version}</span>
            <span>{activeArtifact.date}</span>
            <span>{activeArtifact.status}</span>
            <button
              className="print-btn"
              onClick={() => setPrinting(true)}
              title={
                activeArtifact.group === "v2"
                  ? "Print the full rulebook (save as PDF)"
                  : "Print this artifact (save as PDF)"
              }
            >
              ⎙ Print / PDF
            </button>
          </div>
        </header>

        <section className="viewer-canvas">
          <ActiveComponent
            section={route.sectionId}
            onSectionChange={(s) => navigate(route.artifactId, s)}
            printAll={printing}
          />
        </section>
      </main>
    </div>
  );
}
