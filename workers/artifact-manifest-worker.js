const fs = require("fs")
const path = require("path")

console.log("Artifact Manifest Worker Started")

const ROOT_DIR = path.resolve(__dirname, "..")

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

function processManifest() {

  const files = fs.readdirSync(archiveDir)

  if (files.length === 0) {
    console.log("No archived artifacts")
    return
  }

  files.forEach((file) => {

    const artifactPath = path.join(
      archiveDir,
      file
    )

    const artifact = JSON.parse(
      fs.readFileSync(artifactPath, "utf8")
    )

    if (artifact.manifest_created) {
      return
    }

    artifact.manifest = {
      runtime_version: "v1",
      worker: "artifact-worker-test",
      processed_at: new Date().toISOString(),
      execution_time_ms: 5
    }

    artifact.manifest_created = true

    fs.writeFileSync(
      artifactPath,
      JSON.stringify(artifact, null, 2)
    )

    appendLog(
      `MANIFEST CREATED | ${file}`
    )

    console.log(`Manifest created for ${file}`)

  })

}

setInterval(processManifest, 5000)
