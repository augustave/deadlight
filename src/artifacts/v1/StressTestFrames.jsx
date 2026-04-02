import { useState } from "react";

const STRESS_TESTS = [
  { id: "rtm", label: "REQUIREMENTS TRACEABILITY", short: "RTM" },
  { id: "gantt", label: "PROGRAM TIMELINE", short: "GANTT" },
  { id: "arch", label: "SYSTEM ARCHITECTURE", short: "ARCH" },
  { id: "compliance", label: "COMPLIANCE MATRIX", short: "CMPL" },
];

// --- RTM DATA ---
const RTM_DATA = [
  { id: "REQ-001", need: "Autonomous waypoint navigation", spec: "SRS §3.1.1", ver: "SIM-TC-001", status: "PASS", priority: "P0", trace: "CONOPS §2.1" },
  { id: "REQ-002", need: "GPS-denied fallback (INS/VIO)", spec: "SRS §3.1.2", ver: "SIM-TC-002", status: "PASS", priority: "P0", trace: "CONOPS §2.1" },
  { id: "REQ-003", need: "Dynamic re-tasking via C2 link", spec: "SRS §3.2.1", ver: "SIM-TC-010", status: "PASS", priority: "P0", trace: "CONOPS §2.3" },
  { id: "REQ-004", need: "Swarm formation hold (≤5m err)", spec: "SRS §3.2.3", ver: "SIM-TC-011", status: "PARTIAL", priority: "P0", trace: "CONOPS §2.3" },
  { id: "REQ-005", need: "Obstacle avoidance (static)", spec: "SRS §3.1.4", ver: "SIM-TC-003", status: "PASS", priority: "P1", trace: "CONOPS §2.2" },
  { id: "REQ-006", need: "Obstacle avoidance (dynamic)", spec: "SRS §3.1.5", ver: "SIM-TC-004", status: "FAIL", priority: "P1", trace: "CONOPS §2.2" },
  { id: "REQ-007", need: "Target detection (EO/IR fusion)", spec: "SRS §3.3.1", ver: "SIM-TC-020", status: "PASS", priority: "P0", trace: "CONOPS §3.1" },
  { id: "REQ-008", need: "Target classification (5-class)", spec: "SRS §3.3.2", ver: "SIM-TC-021", status: "PASS", priority: "P0", trace: "CONOPS §3.1" },
  { id: "REQ-009", need: "Human-on-the-loop confirmation", spec: "SRS §3.3.4", ver: "SIM-TC-025", status: "PASS", priority: "P0", trace: "CONOPS §3.2" },
  { id: "REQ-010", need: "Engagement auth chain (2-key)", spec: "SRS §3.3.5", ver: "SIM-TC-026", status: "N/A", priority: "P0", trace: "CONOPS §3.2" },
  { id: "REQ-011", need: "Comms relay mesh (≥3 hops)", spec: "SRS §3.4.1", ver: "SIM-TC-030", status: "PASS", priority: "P1", trace: "CONOPS §4.1" },
  { id: "REQ-012", need: "Encrypted datalink (AES-256)", spec: "SRS §3.4.2", ver: "SIM-TC-031", status: "PASS", priority: "P0", trace: "CONOPS §4.1" },
  { id: "REQ-013", need: "Bandwidth adaptation (<100kbps)", spec: "SRS §3.4.3", ver: "SIM-TC-032", status: "PARTIAL", priority: "P1", trace: "CONOPS §4.2" },
  { id: "REQ-014", need: "EMCON mode (passive only)", spec: "SRS §3.4.4", ver: "SIM-TC-033", status: "PASS", priority: "P0", trace: "CONOPS §4.3" },
  { id: "REQ-015", need: "Battery endurance ≥40 min", spec: "SRS §3.5.1", ver: "SIM-TC-040", status: "PASS", priority: "P0", trace: "CONOPS §5.1" },
  { id: "REQ-016", need: "Wind tolerance ≥25 kt", spec: "SRS §3.5.2", ver: "SIM-TC-041", status: "PASS", priority: "P1", trace: "CONOPS §5.1" },
  { id: "REQ-017", need: "Launch from unprepared surface", spec: "SRS §3.5.3", ver: "SIM-TC-042", status: "PARTIAL", priority: "P2", trace: "CONOPS §5.2" },
  { id: "REQ-018", need: "IFF beacon (CYPHER protocol)", spec: "SRS §3.6.1", ver: "SIM-TC-050", status: "PASS", priority: "P0", trace: "CONOPS §6.1" },
  { id: "REQ-019", need: "Visual IFF degraded mode", spec: "SRS §3.6.2", ver: "SIM-TC-051", status: "PASS", priority: "P0", trace: "CONOPS §6.1" },
  { id: "REQ-020", need: "Telemetry logging (100Hz)", spec: "SRS §3.7.1", ver: "SIM-TC-060", status: "PASS", priority: "P1", trace: "CONOPS §7.1" },
  { id: "REQ-021", need: "Post-mission data offload (<2m)", spec: "SRS §3.7.2", ver: "SIM-TC-061", status: "PASS", priority: "P2", trace: "CONOPS §7.1" },
  { id: "REQ-022", need: "Deterministic replay capability", spec: "SRS §3.7.3", ver: "SIM-TC-062", status: "FAIL", priority: "P1", trace: "CONOPS §7.2" },
  { id: "REQ-023", need: "Swarm size scalability (≥40)", spec: "SRS §3.8.1", ver: "SIM-TC-070", status: "PARTIAL", priority: "P1", trace: "CONOPS §8.1" },
  { id: "REQ-024", need: "Heterogeneous fleet support", spec: "SRS §3.8.2", ver: "SIM-TC-071", status: "N/A", priority: "P2", trace: "CONOPS §8.1" },
];

// --- GANTT DATA ---
const GANTT_PHASES = [
  {
    phase: "PHASE I — FEASIBILITY",
    tasks: [
      { name: "Literature review & gap analysis", start: 0, dur: 3, status: "complete" },
      { name: "Algorithm design (nav + swarm)", start: 1, dur: 4, status: "complete" },
      { name: "Simulation environment build", start: 2, dur: 5, status: "complete" },
      { name: "Monte Carlo validation (1K runs)", start: 5, dur: 3, status: "complete" },
      { name: "Phase I technical report", start: 7, dur: 2, status: "complete" },
    ],
    color: "#555",
  },
  {
    phase: "PHASE II — DEVELOPMENT",
    tasks: [
      { name: "Hardware-in-loop testbed", start: 9, dur: 4, status: "active" },
      { name: "Sensor fusion pipeline (EO/IR)", start: 10, dur: 5, status: "active" },
      { name: "C2 interface prototype", start: 11, dur: 6, status: "upcoming" },
      { name: "Swarm coordination protocol", start: 12, dur: 5, status: "upcoming" },
      { name: "IFF integration (CYPHER-v2)", start: 14, dur: 3, status: "upcoming" },
      { name: "Field test preparation", start: 16, dur: 2, status: "upcoming" },
      { name: "Phase II demonstration", start: 17, dur: 2, status: "milestone" },
    ],
    color: "#BFFF00",
  },
  {
    phase: "PHASE III — TRANSITION",
    tasks: [
      { name: "Transition partner integration", start: 19, dur: 4, status: "upcoming" },
      { name: "CMMC Level 2 certification", start: 19, dur: 6, status: "upcoming" },
      { name: "Operational test & evaluation", start: 22, dur: 3, status: "upcoming" },
      { name: "Production readiness review", start: 24, dur: 2, status: "milestone" },
    ],
    color: "#7aafff",
  },
];
const GANTT_MONTHS = ["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12","M13","M14","M15","M16","M17","M18","M19","M20","M21","M22","M23","M24","M25","M26"];

// --- ARCH DATA ---
const ARCH_LAYERS = [
  {
    layer: "OPERATOR INTERFACE",
    color: "#f0f0f0",
    subsystems: [
      { name: "C2 Dashboard", desc: "Fleet state, threat overlay, mission timeline" },
      { name: "Sensor Feed Mgr", desc: "EO/IR stream routing, PiP, annotation" },
      { name: "Mission Planner", desc: "Waypoint editor, constraint zones, ROE config" },
    ]
  },
  {
    layer: "DECISION SUPPORT",
    color: "#BFFF00",
    subsystems: [
      { name: "Threat Assessor", desc: "Multi-source fusion, classification, confidence" },
      { name: "Resource Allocator", desc: "Asset-to-task pairing, fuel/ammo budgets" },
      { name: "COA Generator", desc: "Course of action ranking, risk scoring" },
    ]
  },
  {
    layer: "AUTONOMY ENGINE",
    color: "#7aafff",
    subsystems: [
      { name: "Swarm Coordinator", desc: "Formation, task allocation, consensus" },
      { name: "Path Planner", desc: "Obstacle avoidance, terrain following, deconfliction" },
      { name: "Flight Controller", desc: "PID loops, state estimation, actuator commands" },
    ]
  },
  {
    layer: "SENSING & COMMS",
    color: "#c49a6c",
    subsystems: [
      { name: "Sensor Suite", desc: "EO/IR, LIDAR, radar altimeter, IMU" },
      { name: "Comms Stack", desc: "Mesh radio, EMCON modes, encryption" },
      { name: "IFF Module", desc: "CYPHER protocol, visual beacon, RF interrogator" },
    ]
  },
];

// --- COMPLIANCE DATA ---
const COMPLIANCE_DATA = [
  { standard: "CMMC Level 2", domain: "Cybersecurity", req: "110 practices across 14 domains", status: "IN PROGRESS", gap: "3 practices remaining (IR, RM)", deadline: "Q3 2026", owner: "Security" },
  { standard: "ITAR §120.17", domain: "Export Control", req: "Defense article classification", status: "COMPLIANT", gap: "—", deadline: "Ongoing", owner: "Legal" },
  { standard: "NIST 800-171r2", domain: "CUI Protection", req: "Controlled Unclassified Info handling", status: "COMPLIANT", gap: "—", deadline: "Ongoing", owner: "Security" },
  { standard: "MIL-STD-882E", domain: "System Safety", req: "Hazard analysis & risk assessment", status: "PARTIAL", gap: "Software hazard analysis pending", deadline: "Q2 2026", owner: "Engineering" },
  { standard: "DO-178C (equiv)", domain: "Software Assurance", req: "Design assurance level mapping", status: "NOT STARTED", gap: "Full DAL assessment required", deadline: "Q4 2026", owner: "Engineering" },
  { standard: "MIL-STD-1553B", domain: "Data Bus", req: "Platform integration interface", status: "N/A Phase I", gap: "Deferred to Phase II HIL", deadline: "Q1 2027", owner: "Integration" },
  { standard: "STANAG 4586", domain: "Interoperability", req: "UAV C2 interface standard", status: "PARTIAL", gap: "LOI 3 achieved; LOI 4 pending", deadline: "Q3 2026", owner: "Integration" },
  { standard: "ATO / IATT", domain: "Flight Authorization", req: "Airworthiness for test flights", status: "IN PROGRESS", gap: "Safety case under review", deadline: "Q2 2026", owner: "Flight Ops" },
  { standard: "FAR 52.204-21", domain: "Basic Safeguarding", req: "Federal contract info protection", status: "COMPLIANT", gap: "—", deadline: "Ongoing", owner: "Legal" },
  { standard: "DFARS 252.204-7012", domain: "CDI Protection", req: "Covered defense information", status: "COMPLIANT", gap: "—", deadline: "Ongoing", owner: "Security" },
  { standard: "DFARS 252.204-7021", domain: "CMMC Requirement", req: "Contractor certification mandate", status: "IN PROGRESS", gap: "Pending Level 2 assessment", deadline: "Q3 2026", owner: "Security" },
  { standard: "MIL-STD-2525D", domain: "Symbology", req: "Military symbol standard for C2", status: "COMPLIANT", gap: "—", deadline: "Ongoing", owner: "Design" },
  { standard: "JAUS / SAE AS-4", domain: "Autonomy Architecture", req: "Joint architecture for UxS", status: "PARTIAL", gap: "Message set mapping 60% complete", deadline: "Q2 2026", owner: "Engineering" },
  { standard: "RMF / DIACAP", domain: "Risk Management", req: "DoD info system authorization", status: "NOT STARTED", gap: "Full assessment deferred to Phase III", deadline: "Q1 2027", owner: "Security" },
];

const statusColor = (s) => {
  if (s === "PASS" || s === "COMPLIANT") return "#BFFF00";
  if (s === "PARTIAL" || s === "IN PROGRESS") return "#c49a6c";
  if (s === "FAIL") return "#FF2D55";
  if (s === "N/A" || s === "N/A Phase I" || s === "NOT STARTED") return "#444";
  return "#555";
};

export default function StressTest() {
  const [activeTest, setActiveTest] = useState("rtm");

  const cellBase = {
    fontSize: 10,
    padding: "7px 8px",
    borderBottom: "1px solid #1a1a1a",
    lineHeight: 1.4,
    fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
  };

  const headerBase = {
    ...cellBase,
    fontSize: 9,
    letterSpacing: 2,
    color: "#BFFF00",
    borderBottom: "1px solid #333",
    position: "sticky",
    top: 0,
    background: "#0d0d0d",
    zIndex: 2,
    fontWeight: 400,
    padding: "10px 8px",
  };

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
      <div style={{ borderBottom: "1px solid #333", paddingBottom: 24, marginBottom: 24 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: "#666", marginBottom: 8 }}>
          ANP STUDIO // VISUAL SYSTEM STRESS TEST
        </div>
        <h1 style={{
          fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
          fontWeight: 900,
          fontSize: 28,
          color: "#f0f0f0",
          margin: 0,
          letterSpacing: -1,
        }}>
          HIGH-DENSITY, LOW-DRAMA
        </h1>
        <div style={{ fontSize: 10, color: "#555", marginTop: 8, letterSpacing: 2 }}>
          CAN THE SYSTEM SURVIVE THE SLIDES A DARPA PM ACTUALLY NEEDS?
        </div>
        <div style={{
          fontSize: 11,
          color: "#666",
          marginTop: 16,
          maxWidth: 640,
          lineHeight: 1.6,
        }}>
          Four frames. No atmospheric lighting. No full-bleed type. No cinematic register.
          Just data, structure, and the question of whether the identity holds
          when the content won't let you hide behind drama.
        </div>
      </div>

      {/* Test Selector */}
      <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
        {STRESS_TESTS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTest(t.id)}
            style={{
              flex: 1,
              background: activeTest === t.id ? "#111" : "transparent",
              border: `1px solid ${activeTest === t.id ? "#333" : "#1a1a1a"}`,
              color: activeTest === t.id ? "#BFFF00" : "#555",
              padding: "12px 8px",
              fontSize: 9,
              letterSpacing: 2,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 8, color: activeTest === t.id ? "#555" : "#333", marginBottom: 4 }}>
              STRESS TEST
            </div>
            {t.label}
          </button>
        ))}
      </div>

      {/* ============ RTM ============ */}
      {activeTest === "rtm" && (
        <div>
          <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, fontSize: 16, color: "#e0e0e0" }}>
                Requirements Traceability Matrix
              </div>
              <div style={{ fontSize: 10, color: "#555", marginTop: 4 }}>
                24 requirements // 7 columns // TERMINAL register // SYSTEMS type
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 9, color: "#555" }}>
              {[["PASS", "#BFFF00"], ["PARTIAL", "#c49a6c"], ["FAIL", "#FF2D55"], ["N/A", "#444"]].map(([l, c]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 6, height: 6, background: c, borderRadius: 1 }} />
                  {l}
                </div>
              ))}
            </div>
          </div>
          <div style={{ overflowX: "auto", border: "1px solid #1a1a1a" }}>
            <div style={{ maxHeight: 520, overflowY: "auto", minWidth: 800 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["ID", "REQUIREMENT", "SPEC REF", "VERIFICATION", "STATUS", "PRI", "CONOPS TRACE"].map(h => (
                      <th key={h} style={{ ...headerBase, textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RTM_DATA.map((r, i) => (
                    <tr key={r.id} style={{ background: i % 2 === 0 ? "transparent" : "#080808" }}>
                      <td style={{ ...cellBase, color: "#BFFF00", whiteSpace: "nowrap" }}>{r.id}</td>
                      <td style={{ ...cellBase, color: "#ccc", minWidth: 200 }}>{r.need}</td>
                      <td style={{ ...cellBase, color: "#666" }}>{r.spec}</td>
                      <td style={{ ...cellBase, color: "#666" }}>{r.ver}</td>
                      <td style={{ ...cellBase }}>
                        <span style={{
                          color: statusColor(r.status),
                          fontSize: 9,
                          letterSpacing: 1,
                          padding: "2px 6px",
                          background: `${statusColor(r.status)}12`,
                          border: `1px solid ${statusColor(r.status)}30`,
                        }}>
                          {r.status}
                        </span>
                      </td>
                      <td style={{ ...cellBase, color: r.priority === "P0" ? "#e0e0e0" : "#555" }}>{r.priority}</td>
                      <td style={{ ...cellBase, color: "#555" }}>{r.trace}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 9, color: "#444" }}>
            <span>PASS: {RTM_DATA.filter(r => r.status === "PASS").length}</span>
            <span>PARTIAL: {RTM_DATA.filter(r => r.status === "PARTIAL").length}</span>
            <span style={{ color: "#FF2D55" }}>FAIL: {RTM_DATA.filter(r => r.status === "FAIL").length}</span>
            <span>N/A: {RTM_DATA.filter(r => r.status === "N/A").length}</span>
            <span style={{ marginLeft: "auto" }}>TOTAL: {RTM_DATA.length}</span>
          </div>
        </div>
      )}

      {/* ============ GANTT ============ */}
      {activeTest === "gantt" && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, fontSize: 16, color: "#e0e0e0" }}>
              Program Timeline — 26 Month Horizon
            </div>
            <div style={{ fontSize: 10, color: "#555", marginTop: 4 }}>
              3 phases // 16 tasks // 2 milestones // TERMINAL register
            </div>
          </div>
          <div style={{ overflowX: "auto", border: "1px solid #1a1a1a" }}>
            <div style={{ minWidth: 900 }}>
              {/* Month headers */}
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderBottom: "1px solid #222" }}>
                <div style={{ ...headerBase, borderBottom: "1px solid #222" }} />
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${GANTT_MONTHS.length}, 1fr)` }}>
                  {GANTT_MONTHS.map(m => (
                    <div key={m} style={{
                      ...headerBase,
                      textAlign: "center",
                      fontSize: 8,
                      letterSpacing: 1,
                      padding: "10px 2px",
                      color: "#444",
                      borderBottom: "1px solid #222",
                    }}>
                      {m}
                    </div>
                  ))}
                </div>
              </div>
              {/* Phases */}
              {GANTT_PHASES.map(phase => (
                <div key={phase.phase}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr",
                    borderBottom: "1px solid #1a1a1a",
                    background: "#080808",
                  }}>
                    <div style={{
                      ...cellBase,
                      fontSize: 9,
                      letterSpacing: 2,
                      color: phase.color,
                      fontWeight: 600,
                      padding: "8px",
                    }}>
                      {phase.phase}
                    </div>
                    <div />
                  </div>
                  {phase.tasks.map(task => (
                    <div key={task.name} style={{
                      display: "grid",
                      gridTemplateColumns: "200px 1fr",
                      borderBottom: "1px solid #111",
                    }}>
                      <div style={{
                        ...cellBase,
                        color: task.status === "complete" ? "#555" : task.status === "active" ? "#ccc" : "#444",
                        fontSize: 10,
                        paddingLeft: 16,
                      }}>
                        {task.name}
                      </div>
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${GANTT_MONTHS.length}, 1fr)`,
                        alignItems: "center",
                        padding: "4px 0",
                      }}>
                        {GANTT_MONTHS.map((_, mi) => {
                          const inRange = mi >= task.start && mi < task.start + task.dur;
                          const isFirst = mi === task.start;
                          const isLast = mi === task.start + task.dur - 1;
                          const barColor = task.status === "complete" ? "#333" :
                                          task.status === "active" ? "#BFFF00" :
                                          task.status === "milestone" ? "#FF2D55" : "#222";
                          return (
                            <div key={mi} style={{
                              height: 14,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}>
                              {inRange && (
                                <div style={{
                                  width: "100%",
                                  height: task.status === "milestone" ? 10 : 6,
                                  background: barColor,
                                  borderRadius: isFirst && isLast ? 2 : isFirst ? "2px 0 0 2px" : isLast ? "0 2px 2px 0" : 0,
                                  opacity: task.status === "complete" ? 0.5 : 1,
                                }} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Now marker */}
          <div style={{ display: "flex", gap: 12, marginTop: 12, fontSize: 9, color: "#444", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 12, height: 4, background: "#333", opacity: 0.5 }} /> COMPLETE
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 12, height: 4, background: "#BFFF00" }} /> ACTIVE
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 12, height: 4, background: "#222" }} /> UPCOMING
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 12, height: 8, background: "#FF2D55" }} /> MILESTONE
            </div>
          </div>
        </div>
      )}

      {/* ============ ARCHITECTURE ============ */}
      {activeTest === "arch" && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, fontSize: 16, color: "#e0e0e0" }}>
              System Architecture — 4 Layers, 12 Subsystems
            </div>
            <div style={{ fontSize: 10, color: "#555", marginTop: 4 }}>
              Layered stack // GRID PAPER register // INSTITUTIONAL + SYSTEMS type
            </div>
          </div>
          <div style={{ display: "grid", gap: 2 }}>
            {ARCH_LAYERS.map((layer, li) => (
              <div key={layer.layer} style={{
                border: "1px solid #1a1a1a",
                background: "#080808",
              }}>
                {/* Layer header */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderBottom: "1px solid #111",
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    background: layer.color,
                    borderRadius: 1,
                  }} />
                  <div style={{
                    fontSize: 9,
                    letterSpacing: 3,
                    color: layer.color,
                  }}>
                    LAYER {li}: {layer.layer}
                  </div>
                  {li < ARCH_LAYERS.length - 1 && (
                    <div style={{ marginLeft: "auto", fontSize: 8, color: "#333" }}>
                      ▼ API BOUNDARY
                    </div>
                  )}
                </div>
                {/* Subsystems */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 1,
                  background: "#111",
                }}>
                  {layer.subsystems.map(sub => (
                    <div key={sub.name} style={{
                      background: "#0a0a0a",
                      padding: 12,
                    }}>
                      <div style={{
                        fontSize: 11,
                        color: "#ddd",
                        marginBottom: 4,
                        fontWeight: 600,
                      }}>
                        {sub.name}
                      </div>
                      <div style={{ fontSize: 9, color: "#555", lineHeight: 1.5 }}>
                        {sub.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Interface arrows */}
          <div style={{
            marginTop: 16,
            padding: 12,
            background: "#080808",
            border: "1px solid #1a1a1a",
            fontSize: 10,
            color: "#555",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
          }}>
            <div>
              <span style={{ color: "#BFFF00", fontSize: 9, letterSpacing: 2 }}>DATA FLOW </span>
              Operator → Decision Support: mission intent, ROE constraints, manual overrides
            </div>
            <div>
              <span style={{ color: "#7aafff", fontSize: 9, letterSpacing: 2 }}>CONTROL FLOW </span>
              Decision Support → Autonomy: task assignments, waypoints, engagement auth
            </div>
            <div>
              <span style={{ color: "#c49a6c", fontSize: 9, letterSpacing: 2 }}>SENSOR FLOW </span>
              Sensing → all layers: raw feeds, processed tracks, comm status, IFF state
            </div>
          </div>
        </div>
      )}

      {/* ============ COMPLIANCE ============ */}
      {activeTest === "compliance" && (
        <div>
          <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, fontSize: 16, color: "#e0e0e0" }}>
                Compliance & Standards Matrix
              </div>
              <div style={{ fontSize: 10, color: "#555", marginTop: 4 }}>
                14 standards // 7 columns // TERMINAL register
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 9, color: "#555" }}>
              {[["COMPLIANT", "#BFFF00"], ["IN PROGRESS", "#c49a6c"], ["PARTIAL", "#c49a6c"], ["NOT STARTED", "#FF2D55"], ["N/A", "#444"]].map(([l, c]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 6, height: 6, background: c, borderRadius: 1 }} />
                  {l}
                </div>
              ))}
            </div>
          </div>
          <div style={{ overflowX: "auto", border: "1px solid #1a1a1a" }}>
            <div style={{ maxHeight: 520, overflowY: "auto", minWidth: 900 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["STANDARD", "DOMAIN", "REQUIREMENT", "STATUS", "GAP", "DEADLINE", "OWNER"].map(h => (
                      <th key={h} style={{ ...headerBase, textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPLIANCE_DATA.map((r, i) => (
                    <tr key={r.standard} style={{ background: i % 2 === 0 ? "transparent" : "#080808" }}>
                      <td style={{ ...cellBase, color: "#ccc", whiteSpace: "nowrap", fontWeight: 600 }}>{r.standard}</td>
                      <td style={{ ...cellBase, color: "#888" }}>{r.domain}</td>
                      <td style={{ ...cellBase, color: "#666", minWidth: 180 }}>{r.req}</td>
                      <td style={{ ...cellBase }}>
                        <span style={{
                          color: statusColor(r.status),
                          fontSize: 9,
                          letterSpacing: 1,
                          padding: "2px 6px",
                          background: `${statusColor(r.status)}12`,
                          border: `1px solid ${statusColor(r.status)}30`,
                        }}>
                          {r.status}
                        </span>
                      </td>
                      <td style={{ ...cellBase, color: r.gap === "—" ? "#333" : "#999", fontSize: 10 }}>{r.gap}</td>
                      <td style={{ ...cellBase, color: "#555" }}>{r.deadline}</td>
                      <td style={{ ...cellBase, color: "#444" }}>{r.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 9, color: "#444" }}>
            <span style={{ color: "#BFFF00" }}>COMPLIANT: {COMPLIANCE_DATA.filter(r => r.status === "COMPLIANT").length}</span>
            <span>IN PROGRESS: {COMPLIANCE_DATA.filter(r => r.status === "IN PROGRESS").length}</span>
            <span>PARTIAL: {COMPLIANCE_DATA.filter(r => r.status === "PARTIAL").length}</span>
            <span style={{ color: "#FF2D55" }}>NOT STARTED: {COMPLIANCE_DATA.filter(r => r.status === "NOT STARTED").length}</span>
            <span style={{ marginLeft: "auto" }}>TOTAL: {COMPLIANCE_DATA.length}</span>
          </div>
        </div>
      )}

      {/* Verdict */}
      <div style={{
        borderTop: "1px solid #222",
        marginTop: 40,
        paddingTop: 20,
      }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", marginBottom: 12 }}>
          STRESS TEST VERDICT
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          fontSize: 10,
          color: "#666",
          lineHeight: 1.6,
        }}>
          <div style={{ background: "#0a0a0a", padding: 16, border: "1px solid #1a1a1a" }}>
            <div style={{ color: "#BFFF00", fontSize: 9, letterSpacing: 2, marginBottom: 8 }}>WHAT SURVIVES</div>
            The monospace systems voice carries data tables without strain. Chartreuse-as-status-indicator translates directly from targeting-reticle to pass/fail without any conceptual stretch. The terminal register's flat dark ground absorbs density better than any textured alternative. Alternating row shading at 4% opacity creates scanline rhythm without competing with the data. The identity holds through all four stress tests.
          </div>
          <div style={{ background: "#0a0a0a", padding: 16, border: "1px solid #1a1a1a" }}>
            <div style={{ color: "#FF2D55", fontSize: 9, letterSpacing: 2, marginBottom: 8 }}>WHAT TO WATCH</div>
            The warm amber gradient from the Foundational Infrastructure frame is absent here — deliberately. The system doesn't need color compensation when the data is properly structured with status indicators and row alternation. The gradient was a crutch. These frames prove that TERMINAL + SYSTEMS + status-color protocol is sufficient for any density level. The amber variant should be reclassified as optional, not required.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #1a1a1a",
        marginTop: 32,
        paddingTop: 16,
        display: "flex",
        justifyContent: "space-between",
        fontSize: 9,
        color: "#333",
        letterSpacing: 2,
      }}>
        <span>SYSTEM_REF: STRESS_TEST_V1</span>
        <span>CLASSIFICATION: INTERNAL // ANP STUDIO</span>
      </div>
    </div>
  );
}
