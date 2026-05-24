const fs = require("fs")
const path = require("path")
const ROOT_DIR = path.resolve(__dirname, "..")
const pendingPath = path.join(ROOT_DIR, "queue/pending.json")
const runningPath = path.join(ROOT_DIR, "queue/running.json")
const completedPath = path.join(ROOT_DIR, "queue/completed.json")
const failedPath = path.join(ROOT_DIR, "queue/failed.json")
const runtimeLog = path.join(ROOT_DIR, "runtime/logs/runtime.log")

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"))
  } catch {
    return []
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

function appendLog(message) {
  fs.appendFileSync(runtimeLog, `${message}\n`)
}

const allowedCommands = ["echo", "pwd", "ls", "cat", "date"]

const blockedPatterns = [
  "rm -rf",
  "sudo",
  "chmod 777",
  "mkfs",
  "dd if=",
  "shutdown",
  "reboot"
]

function isActionAllowed(action) {
  const baseCommand = action.trim().split(" ")[0]

  if (!allowedCommands.includes(baseCommand)) {
    return false
  }

  return !blockedPatterns.some((pattern) => action.includes(pattern))
}

function processTask() {

  let pending = readJson(pendingPath)
  let running = readJson(runningPath)
  let completed = readJson(completedPath)
  let failed = readJson(failedPath)

  if (pending.length === 0) {
    console.log("No pending tasks")
    return
  }

  const taskId = pending.shift()

  const taskPath = path.join(ROOT_DIR, `tasks/${taskId.toLowerCase()}.json`)

  let task = JSON.parse(fs.readFileSync(taskPath, "utf8"))

  running.push(taskId)

  task.status = "running"

  writeJson(pendingPath, pending)
  writeJson(runningPath, running)

  fs.writeFileSync(taskPath, JSON.stringify(task, null, 2))

  appendLog(`TASK RUNNING | ${taskId}`)

  console.log(`Running ${taskId}`)

  let hasErrors = false

  if (task.actions && Array.isArray(task.actions)) {

    task.actions.forEach((action) => {

      appendLog(`ACTION START | ${action}`)

      console.log(`Executing: ${action}`)

      try {

        const execSync = require("child_process").execSync


        if (!isActionAllowed(action)) {
          appendLog(`BLOCKED | ${action}`)
          console.log(`Blocked: ${action}`)

          hasErrors = true

          return
        }

        const output = execSync(action).toString()

        appendLog(`ACTION OUTPUT | ${output.trim()}`)

      } catch (error) {

        appendLog(`ACTION ERROR | ${error.message}`)

        hasErrors = true

      }

    })

  }

  setTimeout(() => {

    running = running.filter((id) => id !== taskId)

    if (hasErrors) {

      failed.push(taskId)

      task.status = "failed"

      writeJson(failedPath, failed)

      appendLog(`TASK FAILED | ${taskId}`)

      console.log(`Failed ${taskId}`)

    } else {

      completed.push(taskId)

      task.status = "completed"

      writeJson(completedPath, completed)

      appendLog(`TASK COMPLETED | ${taskId}`)

      console.log(`Completed ${taskId}`)
    }

    writeJson(runningPath, running)

    fs.writeFileSync(taskPath, JSON.stringify(task, null, 2))

  }, 3000)
}

setInterval(processTask, 3000)

console.log("SolarBox Worker Started")
