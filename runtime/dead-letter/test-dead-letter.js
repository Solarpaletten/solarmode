const fs = require("fs")
const path = require("path")

const {
    moveToDeadLetter
} = require(
    "./dead-letter-engine"
)

const task = {
    task_id: "TASK-AI-TEST",
    status: "failed",
    retry_count: 3,
    max_retries: 3
}

const taskPath =
    path.join(
        __dirname,
        "../../tasks/TASK-AI-TEST.json"
    )

fs.writeFileSync(
    taskPath,
    JSON.stringify(task, null, 2)
)

moveToDeadLetter(
    task,
    taskPath
)

console.log(
    "Moved to dead-letter"
)