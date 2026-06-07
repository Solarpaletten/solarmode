const fs = require("fs")
const path = require("path")

const {
    runTask
} = require(
    "../orchestrator/runtime-orchestrator"
)


const TASKS_DIR =
    path.join(
        __dirname,
        "../../tasks"
    )

const {
    writeHistory
} = require(
    "../history/history-engine"
)




async function processQueue() {

    const files =
        fs.readdirSync(
            TASKS_DIR
        )

    const taskFiles =
        files.filter(
            file =>
                file.endsWith(".json")
        )

    for (
        const file
        of taskFiles
    ) {

        const taskPath =
            path.join(
                TASKS_DIR,
                file
            )

        const task =
            JSON.parse(
                fs.readFileSync(
                    taskPath,
                    "utf8"
                )
            )

        if (
            task.status ===
            "completed"
        ) {
            continue
        }

        console.log(
            `QUEUE: ${task.task_id}`
        )


        task.status = "running"
        task.started_at =
             new Date().toISOString()
        
        fs.writeFileSync(
            taskPath,
            JSON.stringify(
                task,
                null,
                2
            )
        )

    let result = null

    try {

        result = await runTask(task)

        task.status =
            "completed"

        task.completed_at =
            new Date().toISOString()

    } catch (error) {

        task.status =
            "failed"
        
        task.failed_at =
            new Date().toISOString()

        task.error =
            error.message
    }

    console.log(result)


        writeHistory(task)

        fs.writeFileSync(
            taskPath,
            JSON.stringify(
                task,
                null,
                2
            )
        )
    }
}

module.exports = {
    processQueue
}