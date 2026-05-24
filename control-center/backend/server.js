const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")

const app = express()

app.use(cors())

const ROOT_DIR = path.resolve(__dirname, "../..")

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"))
  } catch (error) {
    return []
  }
}

app.get("/", (req, res) => {
  res.json({
    status: "SolarBox Backend Online"
  })
})

app.get("/queue", (req, res) => {
  res.json({
    pending: readJson(path.join(ROOT_DIR, "queue/pending.json")),
    running: readJson(path.join(ROOT_DIR, "queue/running.json")),
    completed: readJson(path.join(ROOT_DIR, "queue/completed.json")),
    failed: readJson(path.join(ROOT_DIR, "queue/failed.json"))
  })
})

app.get("/logs", (req, res) => {
  const logFile = path.join(ROOT_DIR, "runtime/logs/runtime.log")

  try {
    const logs = fs.readFileSync(logFile, "utf8")
      .split("\n")
      .filter(Boolean)

    res.json(logs)
  } catch {
    res.json([])
  }
})

app.use(express.json())

app.post("/task", (req, res) => {

  const taskId = `TASK-${Date.now()}`

  const task = {
    task_id: taskId,
    title: req.body.title || "New SolarBox Task",
    priority: "medium",
    status: "pending",
    owner: "Dashka",
    repo: "SOLAR-PAYCENT",
    branch: "runtime/generated",
    files: [],
    risk_level: "low",
    rollback_available: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    actions: [
      "echo SolarBox Runtime Task"
    ],
    logs: [],
    result: ""
  }

  const taskPath = path.join(ROOT_DIR, `tasks/${taskId.toLowerCase()}.json`)

  fs.writeFileSync(taskPath, JSON.stringify(task, null, 2))

  const pendingPath = path.join(ROOT_DIR, "queue/pending.json")

  let pending = readJson(pendingPath)

  pending.push(taskId)

  fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2))

  res.json({
    success: true,
    task
  })
})

app.listen(3001, () => {
  console.log("SolarBox backend running on port 3001")
})
