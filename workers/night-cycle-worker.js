const fs = require("fs")
const path = require("path")

console.log("Night Cycle Worker Started")

const ROOT_DIR = path.resolve(__dirname, "..")

const archiveDir = path.join(
  ROOT_DIR,
  "artifacts/archive"
)

const runtimeLog = path.join(
  ROOT_DIR,
  "runtime/logs/runtime.log"
)

const reportsDir = path.join(
  ROOT_DIR,
  "runtime/reports"
)

fs.mkdirSync(reportsDir, {
  recursive: true
})

function appendLog(message) {
  fs.appendFileSync(runtimeLog, `${message}\n`)
}

function runNightCycle() {

  const files = fs.readdirSync(archiveDir)

  const report = {
    cycle_started_at:
      new Date().toISOString(),

    total_artifacts: files.length,

    verified: 0,
    mismatches: 0,

    artifacts: []
  }

  files.forEach((file) => {

    const artifactPath = path.join(
      archiveDir,
      file
    )

    const artifact = JSON.parse(
      fs.readFileSync(artifactPath, "utf8")
    )

    const artifactInfo = {
      file,
      artifact_id: artifact.artifact_id,
      signature_created:
        artifact.signature_created || false,
      manifest_created:
        artifact.manifest_created || false,
      replay_status: "unknown"
    }

    if (
      artifact.results &&
      artifact.signature_created
    ) {

      artifactInfo.replay_status =
        "verified"

      report.verified += 1

    } else {

      artifactInfo.replay_status =
        "mismatch"

      report.mismatches += 1
    }

    report.artifacts.push(
      artifactInfo
    )

  })

  report.cycle_finished_at =
    new Date().toISOString()

  const timestamp =
    Date.now()

  const reportPath = path.join(
    reportsDir,
    `night-report-${timestamp}.json`
  )

  fs.writeFileSync(
    reportPath,
    JSON.stringify(report, null, 2)
  )

  appendLog(
    `NIGHT CYCLE COMPLETE | ${reportPath}`
  )

  console.log(
    `Night cycle complete`
  )
}

setInterval(runNightCycle, 10000)
