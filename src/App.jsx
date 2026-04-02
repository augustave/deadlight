import { useEffect, useState } from "react";
import { artifacts, auditHighlights } from "./library.js";

const groupedArtifacts = {
  v2: artifacts.filter((artifact) => artifact.group === "v2"),
  v1: artifacts.filter((artifact) => artifact.group === "v1"),
};

function readHash() {
  const raw = window.location.hash.replace(/^#/, "");
  return artifacts.find((artifact) => artifact.id === raw)?.id ?? "rulebook-v2";
}

export default function App() {
  const [activeId, setActiveId] = useState(readHash);

  useEffect(() => {
    const onHashChange = () => setActiveId(readHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (window.location.hash !== `#${activeId}`) {
      window.history.replaceState(null, "", `#${activeId}`);
    }
  }, [activeId]);

  const activeArtifact =
    artifacts.find((artifact) => artifact.id === activeId) ?? artifacts[0];
  const ActiveComponent = activeArtifact.Component;

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="sidebar-block">
          <div className="eyebrow">Workspace</div>
          <h1>DEADLIGHT</h1>
          <p className="sidebar-copy">
            Reorganized into a versioned React viewer with the v2 rulebook as the
            canonical source and the March 28 artifacts preserved as legacy references.
          </p>
        </div>

        <div className="sidebar-block">
          <div className="eyebrow">Artifacts</div>
          <div className="artifact-group-label">April 2, 2026</div>
          {groupedArtifacts.v2.map((artifact) => (
            <button
              key={artifact.id}
              className={`artifact-button ${activeId === artifact.id ? "is-active" : ""}`}
              onClick={() => setActiveId(artifact.id)}
            >
              <span className="artifact-title">{artifact.title}</span>
              <span className="artifact-meta">
                {artifact.version} · {artifact.status}
              </span>
            </button>
          ))}

          <div className="artifact-group-label">March 28, 2026</div>
          {groupedArtifacts.v1.map((artifact) => (
            <button
              key={artifact.id}
              className={`artifact-button ${activeId === artifact.id ? "is-active" : ""}`}
              onClick={() => setActiveId(artifact.id)}
            >
              <span className="artifact-title">{artifact.title}</span>
              <span className="artifact-meta">
                {artifact.version} · {artifact.status}
              </span>
            </button>
          ))}
        </div>

        <div className="sidebar-block">
          <div className="eyebrow">Audit Highlights</div>
          <ul className="audit-list">
            {auditHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
            <span>{activeArtifact.version}</span>
            <span>{activeArtifact.date}</span>
            <span>{activeArtifact.status}</span>
          </div>
        </header>

        <section className="viewer-canvas">
          <ActiveComponent />
        </section>
      </main>
    </div>
  );
}
