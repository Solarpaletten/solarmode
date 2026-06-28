
const fs = require("fs")

const path = require("path")

const ROUTER_FILE =

    path.join(

        __dirname,

        "./router.json"

    )

const {
    countRouterRecords,
    initializeRouter,
    executeWorkflow

} = require(
    "./router-engine"

)

console.log(

    initializeRouter()
)

console.log(

    executeWorkflow(
        "solar-pocket-research-task.json",
        "claude",
        "gpt",
        "solar-pocket-research"
    )

)