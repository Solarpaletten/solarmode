const fs = require("fs")
const path = require("path")

console.log("Runtime Decision Worker Started")

const ROOT_DIR = path.resolve(__dirname, "..")

const healthPath = path.join(
  ROOT_DIR,
  "runtime/health/runtime-health.json"
)

const candidatesDir = path.join(
  ROOT_DIR,
  "runtime/candidates"
)

const decisionsDir = path.join(
  ROOT_DIR,
  "runtime/decisions"
)

const runtimeLog = path.join(
  ROOT_DIR,
  "runtime/logs/runtime.log"
)

fs.mkdirSync(decisionsDir, {
  recursive: true
})

function appendLog(message) {
  fs.appendFileSync(runtimeLog, `${message}\n`)
}

function generateDecision() {

  if (!fs.existsSync(healthPath)) {
    console.log("No runtime health file")
    return
  }

  const health = JSON.parse(
    fs.readFileSync(
      healthPath,
      "utf8"
    )
  )

  const candidates =
    fs.existsSync(candidatesDir)
      ? fs.readdirSync(candidatesDir)
      : []

  let decision = "review"
  let reason =
    "manual verification required"

  if (
    health.health === "critical"
  ) {

    decision = "rollback"

    reason =
      "critical runtime incidents detected"

  } else if (
    health.health === "stable" &&
    candidates.length > 0
  ) {

    decision = "merge"

    reason =
      "runtime stable and merge candidates available"

  } else if (
    health.health === "warning"
  ) {

    decision = "review"

    reason =
      "warnings detected in runtime"
  }

  const report = {

    generated_at:
      new Date().toISOString(),

    runtime_health:
      health.health,

    merge_candidates:
      candidates.length,

    decision,
    reason
  }

  const reportPath = path.join(
    decisionsDir,
    "runtime-decision.json"
  )

  fs.writeFileSync(
    reportPath,
    JSON.stringify(report, null, 2)
  )

  appendLog(
    `RUNTIME DECISION | ${decision.toUpperCase()}`
  )

  console.log(
    `Runtime decision: ${decision}`
  )
}

setInterval(generateDecision, 5000)
