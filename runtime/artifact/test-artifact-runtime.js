
const {
  execute
} = require("../executor/executor-engine")

const {
  createArtifact
} = require("./artifact-engine")

async function test() {
  const execution =
    await execute({
      provider: "chatgpt",
      systemPrompt: "You are software architect.",
      prompt: "Write 5 lines about Solar Runtime"
    })
    
  const artifact =
    createArtifact(
      execution
    )

  console.log(
    artifact
  )
}



test()