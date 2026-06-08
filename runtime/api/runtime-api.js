const http = require("http")
const url = require("url")

const {
    getAllTasks,
    getStats,
    getTaskById,
    getTasksByStatus
} = require(
    "../registry/task-registry"
)

const {
    handleArtifactRoutes
} = require(
    "./routes/artifact-routes"
)

const PORT = 3001

function sendJson(res, data, statusCode = 200) {

    res.writeHead(
        statusCode,
        {
            "Content-Type": "application/json"
        }
    )

    res.end(
        JSON.stringify(
            data,
            null,
            2
        )
    )
}

const server =
    http.createServer(
        (req, res) => {

            const parsedUrl =
                new URL(
                    req.url,
                    `http://${req.headers.host}`
                )


            const pathname =
                parsedUrl.pathname

            if (pathname === "/stats") {
                return sendJson(
                    res,
                    getStats()
                )
            }

            if (
                pathname.startsWith(
                    "/artifacts"
                )
            ) {

                return handleArtifactRoutes(
                    pathname,
                    res,
                    sendJson
                )
            }


            if (pathname === "/tasks") {
                return sendJson(
                    res,
                    getAllTasks()
                )
            }

            if (pathname.startsWith("/tasks/status/")) {

                const status =
                    pathname.split("/").pop()

                return sendJson(
                    res,
                    getTasksByStatus(status)
                )
            }

            if (pathname.startsWith("/tasks/")) {

                const taskId =
                    pathname.split("/").pop()

                const task =
                    getTaskById(taskId)

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
                    error: "Not found"
                },
                404
            )
        }
    )

server.listen(
    PORT,
    () => {
        console.log(
            `RUNTIME API STARTED: http://localhost:${PORT}`
        )
    }
)