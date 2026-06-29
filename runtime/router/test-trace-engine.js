const {
  initializeRouter
} = require("./router-engine")

initializeRouter()

const {
  traceTree
} = require("./trace-engine")

const workflowId = "wf-solar-pocket-research-11f212d1-0ab0-4bf3-8381-2575bf96db2c"

console.log(
  JSON.stringify(
    traceTree(workflowId),
    null,
    2
  )
)


