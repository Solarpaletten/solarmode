const express = require("express")
const fs = require("fs")
const path = require("path")
const cors = require("cors")

console.log("Runtime Dashboard API Started")

const app = express()

app.use(cors())
app.use(express.json())

const ROOT_DIR = path.resolve(__dirname, "../..")

const archiveDir = path.join(
  ROOT_DIR,
  "artifacts/archive"
)

const healthPath = path.join(
  ROOT_DIR,
  "runtime/health/runtime-health.json"
)

const candidatesDir = path.join(
  ROOT_DIR,
  "runtime/candidates"
)

const reportsDir = path.join(
  ROOT_DIR,
  "runtime/reports"
)

const runtimeLog = path.join(
  ROOT_DIR,
  "runtime/logs/runtime.log"
)

const decisionPath = path.join(
  ROOT_DIR,
  "runtime/decisions/runtime-decision.json"
)

function safeReadDir(dir) {
  try {
    return fs.readdirSync(dir)
  } catch {
    return []
  }
}

app.get("/runtime/status", (req, res) => {

  const archived =
    safeReadDir(archiveDir)

  const candidates =
    safeReadDir(candidatesDir)

  const reports =
    safeReadDir(reportsDir)

  const logs = fs.existsSync(runtimeLog)
    ? fs.readFileSync(runtimeLog, "utf8")
    : ""

  res.json({

    health:
  fs.existsSync(healthPath)
    ? JSON.parse(
        fs.readFileSync(
          healthPath,
          "utf8"
        )
      )
    : null,

    decision:
  fs.existsSync(decisionPath)
    ? JSON.parse(
        fs.readFileSync(
          decisionPath,
          "utf8"
        )
      )
    : null,

    runtime: "online",

    archived_artifacts:
      archived.length,

    merge_candidates:
      candidates.length,

    reports_created:
      reports.length,

    latest_reports:
      reports.slice(-5),

    latest_candidates:
      candidates.slice(-5),

    latest_logs:
      logs
        .split("\n")
        .filter(Boolean)
        .slice(-15)

  })

})

const PORT = 3010

app.listen(PORT, () => {

  console.log(
    `Runtime Dashboard API running on ${PORT}`
  )

})
