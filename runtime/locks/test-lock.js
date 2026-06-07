const {
    createLock
} = require(
    "./lock-engine"
)

createLock("TASK-AI-031")

const {
    removeLock
} = require(
    "./lock-engine"
)

removeLock("TASK-AI-031")

const {
    isLocked
} = require(
    "./lock-engine"
)

console.log(
    isLocked("TASK-AI-031")
)