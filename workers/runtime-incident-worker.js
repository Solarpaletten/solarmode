const fs = require("fs")
const path = require("path")

console.log("Runtime Incident Worker Started")

const ROOT_DIR = path.resolve(__dirname, "..")

const runtimeLog = path.join(
  ROOT_DIR,
  "runtime/logs/runtime.log"
)

const incidentsDir = path.join(
  ROOT_DIR,
  "runtime/incidents"
)

fs.mkdirSync(incidentsDir, {
  recursive: true
})

const knownIncidents = new Set()

function createIncident(
  type,
  severity,
  message
) {

  const timestamp = Date.now()

  const incident = {
    incident_id:
      `INC-${timestamp}`,

    type,
    severity,
    message,

    created_at:
      new Date().toISOString()
  }

  const incidentPath = path.join(
    incidentsDir,
    `incident-${timestamp}.json`
  )

  fs.writeFileSync(
    incidentPath,
    JSON.stringify(incident, null, 2)
  )

  console.log(
    `Incident created ${incident.type}`
  )
}

function scanLogs() {

  if (!fs.existsSync(runtimeLog)) {
    return
  }

  const logs = fs
    .readFileSync(runtimeLog, "utf8")
    .split("\n")
    .filter(Boolean)

  logs.forEach((line) => {

    if (knownIncidents.has(line)) {
      return
    }

    if (
      line.includes("MISMATCH")
    ) {

      createIncident(
        "replay-mismatch",
        "critical",
        line
      )

      knownIncidents.add(line)

      return
    }

    if (
      line.includes("BLOCKED")
    ) {

      createIncident(
        "blocked-operation",
        "warning",
        line
      )

      knownIncidents.add(line)

      return
    }

    if (
      line.includes("FAILED")
    ) {

      createIncident(
        "task-failed",
        "critical",
        line
      )

      knownIncidents.add(line)

      return
    }

  })

}

setInterval(scanLogs, 5000)
