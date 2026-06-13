const http = require("http")
const url = require("url")

const {
    getStats
} = require(
    "../registry/task-registry"
)

const {
    handleTaskRoutes
} = require("./routes/task-routes"

)

const {
    handleCreateTaskRoute
} = require("./routes/create-task-routes"

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
                    "/tasks"
                )  &&
                    req.method === "POST"
            ) {

               return handleCreateTaskRoute(
                        req,    
                        res,
                        sendJson
               )
            }

            if (
                pathname.startsWith(
                    "/tasks"
                )
            ) {

                return handleTaskRoutes(
                       pathname,
                       res,
                       sendJson
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