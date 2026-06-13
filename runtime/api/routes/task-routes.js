
const {
    getAllTasks,
    getStats,
    getTaskById,
    getTasksByStatus
} = require(
    "../../registry/task-registry"
)


function handleTaskRoutes(
    pathname,
    res,
    sendJson
) {

    if (pathname === "/tasks") {
        return sendJson(
            res,
            getAllTasks()
        )
    }

    if (
        pathname.startsWith(
            "/tasks/status/"
        )
    ) {
        const status =
            pathname.split("/").pop()

        return sendJson(
            res,
            getTasksByStatus(
                status
            )
        )
    }

    if (pathname.startsWith(
        "/tasks/"
    )
    ) {

        const taskId =
            pathname.split("/").pop()

        const task =
            getTaskById(
                taskId
            )

        if (!task) {
            return sendJson(
                res,
                {
                    error: "Task not found"
                },
                404

            )
        }
        return sendJson(
            res,
            task
        )
    }

    return sendJson(
        res,
        {
            error: "Task route not found"
        },
        404
    )
}

module.exports = {
    handleTaskRoutes
}
