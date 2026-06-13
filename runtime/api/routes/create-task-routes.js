
const {
    createTask
} = require(
    "../../registry/task-registry"
)

function handleCreateTaskRoute(
    req,
    res,
    sendJson
) {
    let body = ""
    req.on(
        "data",
        chunk => {
            body += chunk
        }

    )

    req.on(
        "end",
            () => {
        const data =
            JSON.parse(body)

    const task = {
            task_id:
                `TASK-AI-${Date.now()}`,
        provider:
        data.provider,
        prompt:
        data.prompt,
        status:
         "pending"

    }
    createTask(task)

    return sendJson(
        res,
        task,
        201
    )

}

    )

}

module.exports = {
    handleCreateTaskRoute
}

