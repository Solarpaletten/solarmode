const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

console.log("Artifact Verify Worker Started")

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

function generateSignature(content) {

  return crypto
    .createHash("sha256")
    .update(content)
    .digest("hex")
}

function verifyArtifacts() {

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

    if (!artifact.signature) {
      return
    }

    const contentForSignature = JSON.stringify({
      artifact_id: artifact.artifact_id,
      operations: artifact.operations,
      results: artifact.results,
      manifest: artifact.manifest
    })

    const currentSignature =
      generateSignature(contentForSignature)

    if (currentSignature === artifact.signature) {

      appendLog(
        `SIGNATURE VERIFIED | ${file}`
      )

      console.log(`Verified ${file}`)

    } else {

      appendLog(
        `SIGNATURE MISMATCH | ${file}`
      )

      console.log(`Mismatch ${file}`)
    }

  })

}

setInterval(verifyArtifacts, 5000)
