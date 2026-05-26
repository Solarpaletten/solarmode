import { useRuntime }
from "../../context/RuntimeContext"

export default function RuntimeHealthPanel() {

  const { health } =
    useRuntime()

    
  if (!health) {
    return (
      <p>No runtime health available</p>
    )
  }

  return (

    <div>

      <h2>Runtime Health</h2>

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
        🚦 {health.health}
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
  )
}


