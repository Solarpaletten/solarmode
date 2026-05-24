const fs = require("fs")
const path = require("path")

console.log("Merge Candidate Worker Started")

const ROOT_DIR = path.resolve(__dirname, "..")

const archiveDir = path.join(
  ROOT_DIR,
  "artifacts/archive"
)

const candidatesDir = path.join(
  ROOT_DIR,
  "runtime/candidates"
)

const runtimeLog = path.join(
  ROOT_DIR,
  "runtime/logs/runtime.log"
)

fs.mkdirSync(candidatesDir, {
  recursive: true
})

function appendLog(message) {
  fs.appendFileSync(runtimeLog, `${message}\n`)
}

function processCandidates() {

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

    if (
      !artifact.signature_created ||
      !artifact.manifest_created
    ) {

      appendLog(
        `CANDIDATE REJECTED | ${file}`
      )

      console.log(
        `Rejected ${file}`
      )

      return
    }

    const hasReplayMismatch =
      artifact.results &&
      artifact.results.some((result) =>
        result.result === "HACKED"
      )

    if (hasReplayMismatch) {

      appendLog(
        `REPLAY DRIFT DETECTED | ${file}`
      )

      console.log(
        `Drift detected ${file}`
      )

      return
    }

    const candidatePath = path.join(
      candidatesDir,
      file
    )

    fs.writeFileSync(
      candidatePath,
      JSON.stringify(artifact, null, 2)
    )

    appendLog(
      `MERGE CANDIDATE CREATED | ${file}`
    )

    console.log(
      `Candidate created ${file}`
    )

  })

}

setInterval(processCandidates, 5000)
