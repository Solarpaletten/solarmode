import { useRuntime }
from "../../context/RuntimeContext"

export default function RuntimeMetricsPanel() {
  

  const { runtimeStatus } =
  useRuntime()

  if (!runtimeStatus) {
    return (
      <p>No runtime metrics available</p>
    )
  }

  return (

    <div>

      <h2>Runtime Metrics</h2>

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
  )
}