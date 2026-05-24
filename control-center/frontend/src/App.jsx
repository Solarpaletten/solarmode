import { useEffect, useState } from "react"
import { snapshotsData } from "./data/snapshots"
import { metricsData } from "./data/metrics"
import DecisionPanel from "./components/DecisionPanel"


function App() {
  const [backendStatus, setBackendStatus] = useState("Connecting...")
  const [runtimeStatus, setRuntimeStatus] = useState(null)

  const [health, setHealth] = useState(null)
  const [decision, setDecision] = useState(null)

  const [queueState, setQueueState] = useState({
    pending: [],
    running: [],
    completed: [],
    failed: []
  })
  const [logs, setLogs] = useState([])

  const createTask = () => {
    fetch("http://localhost:3001/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: "Frontend Runtime Task"
      })
    })
  }
  const fetchRuntime = () => {
    fetch("http://localhost:3010/runtime/status")
      .then((res) => res.json())
      .then((data) => {
        setRuntimeStatus(data)
      })
  }

  useEffect(() => {
    const fetchQueue = () => {
      fetch("http://localhost:3001/queue")
        .then((res) => res.json())
        .then((data) => {
          setQueueState(data)
          setBackendStatus("SolarBox Backend Online")
        })
        .catch(() => {
          setBackendStatus("Backend Offline")
        })

    }

    const fetchHealth = () => {

      fetch(
        "http://localhost:3010/runtime/status"
      )
        .then((res) => res.json())
        .then((data) => {

          setHealth(
            data.health || null
          )

        })

    }

    const fetchLogs = () => {
      fetch("http://localhost:3001/logs")
        .then((res) => res.json())
        .then((data) => {
          setLogs(data)
        })
    }


    fetchQueue()
    fetchLogs()
    fetchRuntime()
    fetchHealth()

    const interval = setInterval(fetchQueue, 3000)
    const logsInterval = setInterval(fetchLogs, 3000)
    const runtimeInterval = setInterval(fetchRuntime, 3000)
    const healthInterval = setInterval(fetchHealth, 3000)

    return () => {
      clearInterval(interval)
      clearInterval(logsInterval)
      clearInterval(runtimeInterval)
      clearInterval(healthInterval)
    }
  }, [])

  return (

    <div style={{
      background: "#0f172a",
      color: "#e2e8f0",
      minHeight: "100vh",
      padding: "40px",
      fontFamily: "Arial"
    }}>
      <h1>🚀 SolarBox Control Center</h1>

      <h2>System Status</h2>

      <ul>
        <li>✅ Queue Engine</li>
        <li>✅ Worker Runtime</li>
        <li>✅ Governance Security</li>
        <li>✅ Rollback Recovery</li>
        <li>✅ Knowledge Layer</li>
      </ul>

      <h2>Agents</h2>

      <ul>
        <li>🟢 Dashka — Orchestration</li>
        <li>🟢 Claude — Execution</li>
        <li>🟢 Kimi — Security / Audit</li>
        <li>🟢 Solana — Knowledge / Analytics</li>
        <li>🟢 Leanid — Architect</li>
      </ul>

      <h2>Queues</h2>

      <p>🟡 Pending: {queueState.pending.join(", ")}</p>
      <p>🔵 Running: {queueState.running.join(", ")}</p>
      <p>🟢 Completed: {queueState.completed.join(", ")}</p>

      <h2>Execution Logs</h2>

      <ul>
        {logs.map((log, index) => {

          let color = "#e2e8f0"

          if (log.includes("BLOCKED")) color = "#f59e0b"
          if (log.includes("COMPLETED")) color = "#22c55e"
          if (log.includes("RUNNING")) color = "#3b82f6"
          if (log.includes("ERROR")) color = "#ef4444"

          return (
            <li key={index} style={{ color }}>
              📄 {log}
            </li>
          )
        })}
      </ul>

      <DecisionPanel
        decision={runtimeStatus?.decision}
      />

      <h2>Snapshots</h2>

      <ul>
        {snapshotsData.map((snapshot, index) => (
          <li key={index}>💾 {snapshot}</li>
        ))}
      </ul>
      <h2>Governance</h2>

      <p>✔ Allowed Commands Active</p>
      <p>✔ Dangerous Commands Blocked</p>
      <p>✔ Snapshot Recovery Enabled</p>

      <h2>Deployment Controls</h2>

      <button
        onClick={createTask}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "15px"
        }}
      >
        ➕ CREATE TASK
      </button>

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{
          background: "#16a34a",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          ✅ YES MERGE
        </button>

        <button style={{
          background: "#dc2626",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          🔄 ROLLBACK
        </button>
      </div>

      <h2>System Metrics</h2>

      <ul>
        <li>📦 Agents: {metricsData.agents}</li>
        <li>💾 Snapshots: {metricsData.snapshots}</li>
        <li>📄 Logs: {metricsData.logs}</li>
        <li>🗂 Queues: {metricsData.queues}</li>
      </ul>

      <h2>Backend Status</h2>

      <p>🛰 {backendStatus}</p>

      <h2>Runtime</h2>
      <h2>Runtime Intelligence</h2>

      {health && (

        <div>

          <p
            style={{
              color:
                health.health === "critical"
                  ? "#ef4444"
                  : health.health === "warning"
                    ? "#f59e0b"
                    : "#22c55e"
            }}
          >
            🚦 Health:
            {health.health}
          </p>

          <p>
            🔴 Critical:
            {health.critical_incidents}
          </p>

          <p>
            🟡 Warnings:
            {health.warning_incidents}
          </p>

        </div>

      )}

      {runtimeStatus && (
        <div>

          <p>
            📦 Archived:
            {runtimeStatus.archived_artifacts}
          </p>

          <p>
            ✅ Candidates:
            {runtimeStatus.merge_candidates}
          </p>

          <p>
            📄 Reports:
            {runtimeStatus.reports_created}
          </p>

        </div>
      )}

      <p>SolarBox is operational.</p>
    </div>
  )
}

export default App
