const fs = require("fs")
const path = require("path")

console.log("Artifact Replay Worker Started")

const ROOT_DIR = path.resolve(__dirname, "..")

const archiveDir = path.join(
  ROOT_DIR,
  "artifacts/archive"
)

const runtimeLog = path.join(
  ROOT_DIR,
  "runtime/logs/runtime.log"
)

const operations = {
  echo: (args) => {
    return args.join(" ")
  },

  pwd: () => {
    return process.cwd()
  }
}

function appendLog(message) {
  fs.appendFileSync(runtimeLog, `${message}\n`)
}

function replayArtifacts() {

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

    if (!artifact.results) {
      return
    }

    let replayOk = true

    artifact.operations.forEach((operation, index) => {

      const handler = operations[operation.op]

      if (!handler) {
        return
      }

      const replayResult =
        handler(operation.args || [])

      const originalResult =
        artifact.results[index]?.result

      if (
        replayResult !== originalResult
      ) {

        replayOk = false

        appendLog(
          `REPLAY MISMATCH | ${file} | ${operation.op}`
        )

        console.log(
          `Replay mismatch ${file}`
        )
      }

    })

    if (replayOk) {

      appendLog(
        `REPLAY VERIFIED | ${file}`
      )

      console.log(
        `Replay verified ${file}`
      )
    }

  })

}

setInterval(replayArtifacts, 5000)
