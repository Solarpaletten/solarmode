const fs = require("fs")
const path = require("path")

console.log("Artifact Worker Started")

const ROOT_DIR = path.resolve(__dirname, "..")

const incomingDir = path.join(ROOT_DIR, "artifacts/incoming")
const testingDir = path.join(ROOT_DIR, "artifacts/testing")
const approvedDir = path.join(ROOT_DIR, "artifacts/approved")
const rejectedDir = path.join(ROOT_DIR, "artifacts/rejected")

const runtimeLog = path.join(ROOT_DIR, "runtime/logs/runtime.log")

const operations = {
  echo: (args) => {
    return args.join(" ")
  },

  date: () => {
    return new Date().toISOString()
  },

  pwd: () => {
    return process.cwd()
  }
}

const {
  validateArtifact
} = require("./artifact-validator")

function appendLog(message) {
  fs.appendFileSync(runtimeLog, `${message}\n`)
}

function processArtifacts() {

  const files = fs.readdirSync(incomingDir)

  if (files.length === 0) {
    console.log("No incoming artifacts")
    return
  }

  files.forEach((file) => {

    const sourcePath = path.join(incomingDir, file)
    const testingPath = path.join(testingDir, file)

    fs.renameSync(sourcePath, testingPath)

    appendLog(`ARTIFACT TESTING | ${file}`)

    console.log(`Testing ${file}`)

    const artifact = JSON.parse(
      fs.readFileSync(testingPath, "utf8")
    )
    let approved = true
    
    const validation = validateArtifact(artifact)

    if (!validation.valid) {

      approved = false

      appendLog(
        `VALIDATION FAILED | ${validation.reason}`
      )
    }

    artifact.results = []

    artifact.operations.forEach((operation) => {



      const handler = operations[operation.op]

      if (!handler) {
        approved = false

        appendLog(`UNKNOWN OPERATION | ${operation.op}`)

        return
      }

      try {

        const result = handler(operation.args || [])

        artifact.results.push({
          operation: operation.op,
          result
        })

        appendLog(
          `OPERATION SUCCESS | ${operation.op} | ${result}`
        )

      } catch (error) {

        approved = false

        appendLog(
          `OPERATION FAILED | ${operation.op}`
        )
      }

    })

    if (!artifact.operations || !Array.isArray(artifact.operations)) {
      approved = false
    }

    const finalPath = approved
      ? path.join(approvedDir, file)
      : path.join(rejectedDir, file)

    artifact.status = approved
      ? "approved"
      : "rejected"

    fs.writeFileSync(
      testingPath,
      JSON.stringify(artifact, null, 2)
    )

    fs.renameSync(testingPath, finalPath)

    if (approved) {
      appendLog(`ARTIFACT APPROVED | ${file}`)
      console.log(`Approved ${file}`)
    } else {
      appendLog(`ARTIFACT REJECTED | ${file}`)
      console.log(`Rejected ${file}`)
    }

  })
}

setInterval(processArtifacts, 3000)
