const fs = require("fs")
const path = require("path")

const TASKS_DIR =
    path.join(
        __dirname,
        "../../tasks"
    )

function getAllTasks() {

    const files =
        fs.readdirSync(TASKS_DIR)

    const taskFiles =
        files.filter(
            file => file.endsWith(".json")
        )

    return taskFiles.map(file => {

        const taskPath =
            path.join(
                TASKS_DIR,
                file
            )

        try {

            return JSON.parse(
                fs.readFileSync(
                    taskPath,
                    "utf8"
                )
            )

        } catch {

            return null

        }

    }).filter(Boolean)
}

function getStats() {

    const tasks = getAllTasks()

    const stats = {
        total: tasks.length,
        pending: 0,
        running: 0,
        completed: 0,
        failed: 0
    }

    for (const task of tasks) {

        if (task.status === "pending")
            stats.pending++

        if (task.status === "running")
            stats.running++

        if (task.status === "completed")
            stats.completed++

        if (task.status === "failed")
            stats.failed++
    }


    return stats
}

function getTaskById(taskId) {

    const tasks =
        getAllTasks()

    return tasks.find(
        task =>
            task.task_id === taskId
    )
}  

function getTasksByStatus(status) {


    return getAllTasks().filter(
        task =>
            task.status === status
    )
}


module.exports = {
    getAllTasks,
    getStats,
    getTaskById,
    getTasksByStatus
}