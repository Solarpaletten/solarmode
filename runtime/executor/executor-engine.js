const fs = require("fs")

const path = require("path")

const EXECUTOR_FILE =
  path.join(
    __dirname,
    "./executor.json"
  )

const {
  save,
  get,
  getAll
} = require(
  "./executor-registry"
)

const {
  executeTask
} = require("../providers/provider-engine")

const {
  createExecutionId
} = require("../runtime-id")

function saveToFile() {

  fs.writeFileSync(
    EXECUTOR_FILE,
    JSON.stringify(
      getAll(),
      null,
      2
    ),
    "utf8"
  )

  return EXECUTOR_FILE
}

async function execute(task) {
  
  const executionId =
    createExecutionId()
  
  const providerResult =
    await executeTask(task)

  const result = {
    executionId,
    success: providerResult.success,
    status: "executed",
    task,
    providerResult,
    timestamp: 
      new Date().toISOString()
  }

  save(
    executionId,
    result
  )

  saveToFile()

  return result
}

module.exports = {
  saveToFile,
  execute
}