function DecisionPanel({ decision }) {

  if (!decision) {

    return (
      <div>
        No runtime decision available
      </div>
    )
  }

  const decisionColor =
    decision.decision === "rollback"
      ? "#ef4444"
      : decision.decision === "review"
      ? "#f59e0b"
      : "#22c55e"

  return (

    <div
      style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        border: `2px solid ${decisionColor}`
      }}
    >

      <h2>🧠 Runtime Decision</h2>

      <p
        style={{
          color: decisionColor,
          fontWeight: "bold",
          fontSize: "18px"
        }}
      >
        {decision.decision.toUpperCase()}
      </p>

      <p>
        {decision.reason}
      </p>

      <p>
        Merge Candidates:
        {" "}
        {decision.merge_candidates}
      </p>

      <p>
        Runtime Health:
        {" "}
        {decision.runtime_health}
      </p>

    </div>

  )
}

export default DecisionPanel
