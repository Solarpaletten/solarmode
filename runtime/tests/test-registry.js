

const {
    
    getStats,
    getTaskById,
    getTasksByStatus
 } = require(
    "../registry/task-registry"
)


console.log(
    getStats()
)

console.log(
    getTasksByStatus("completed")
)

console.log(
    getTasksByStatus("failed")
)

console.log(
    getTasksByStatus("pending")
)

console.log(
    getTasksByStatus("running")
)

console.log(
    getTaskById(
        "TASK-AI-120"
    )       

)
