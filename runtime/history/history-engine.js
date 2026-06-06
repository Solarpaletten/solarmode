const fs = require("fs")
const path = require("path")

function writeHistory(task) {

    const historyPath =
        path.join(
            __dirname,
            `${task.task_id}.json`
        )

    fs.writeFileSync(
        historyPath,
        JSON.stringify(
            {
                task_id: task.task_id,
                status: task.status,
                provider: task.provider,
                completed_at:
                    new Date().toISOString()
            },
            null,
            2
        )
    )
}

module.exports = {
    writeHistory
}
