const fs = require("fs")
const path = require("path")

console.log("Runtime Health Worker Started")

const ROOT_DIR = path.resolve(__dirname, "..")

const incidentsDir = path.join(
  ROOT_DIR,
  "runtime/incidents"
)

const candidatesDir = path.join(
  ROOT_DIR,
  "runtime/candidates"
)

const reportsDir = path.join(
  ROOT_DIR,
  "runtime/reports"
)

const healthDir = path.join(
  ROOT_DIR,
  "runtime/health"
)

fs.mkdirSync(healthDir, {
  recursive: true
})

function calculateHealth() {

  const incidents =
    fs.existsSync(incidentsDir)
      ? fs.readdirSync(incidentsDir)
      : []

  const candidates =
    fs.existsSync(candidatesDir)
      ? fs.readdirSync(candidatesDir)
      : []

  const reports =
    fs.existsSync(reportsDir)
      ? fs.readdirSync(reportsDir)
      : []

  let critical = 0
  let warnings = 0

  incidents.forEach((file) => {

    const incidentPath = path.join(
      incidentsDir,
      file
    )

    const incident = JSON.parse(
      fs.readFileSync(incidentPath, "utf8")
    )

    if (
      incident.severity === "critical"
    ) {
      critical += 1
    }

    if (
      incident.severity === "warning"
    ) {
      warnings += 1
    }

  })

  let health = "stable"

  if (warnings > 0) {
    health = "warning"
  }

  if (critical > 0) {
    health = "critical"
  }

  const report = {

    generated_at:
      new Date().toISOString(),

    health,

    critical_incidents:
      critical,

    warning_incidents:
      warnings,

    merge_candidates:
      candidates.length,

    reports_created:
      reports.length
  }

  const reportPath = path.join(
    healthDir,
    "runtime-health.json"
  )

  fs.writeFileSync(
    reportPath,
    JSON.stringify(report, null, 2)
  )

  console.log(
    `Runtime health: ${health}`
  )
}

setInterval(calculateHealth, 5000)
