const fs = require("fs")
const path = require("path")

console.log("Artifact Archive Worker Started")

const ROOT_DIR = path.resolve(__dirname, "..")

const approvedDir = path.join(
  ROOT_DIR,
  "artifacts/approved"
)

const archiveDir = path.join(
  ROOT_DIR,
  "artifacts/archive"
)

const runtimeLog = path.join(
  ROOT_DIR,
  "runtime/logs/runtime.log"
)

function appendLog(message) {
  fs.appendFileSync(runtimeLog, `${message}\n`)
}

function archiveArtifacts() {

  const files = fs.readdirSync(approvedDir)

  if (files.length === 0) {
    console.log("No approved artifacts")
    return
  }

  files.forEach((file) => {

    const sourcePath = path.join(
      approvedDir,
      file
    )

    const archivePath = path.join(
      archiveDir,
      file
    )

    const artifact = JSON.parse(
      fs.readFileSync(sourcePath, "utf8")
    )

    artifact.archived_at =
      new Date().toISOString()

    fs.writeFileSync(
      sourcePath,
      JSON.stringify(artifact, null, 2)
    )

    fs.renameSync(sourcePath, archivePath)

    appendLog(
      `ARTIFACT ARCHIVED | ${file}`
    )

    console.log(`Archived ${file}`)

  })

}

setInterval(archiveArtifacts, 5000)
