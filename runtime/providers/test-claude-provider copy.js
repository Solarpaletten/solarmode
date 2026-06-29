const {
    executeTask
} = require(
    `./provider-engine`
)

async function test() {
    const result =
    await executeTask(
        {
            provider: "claude",
            systemPrompt: "You are software architect.",
            prompt: "Write 5 lines about Solar Runtime"
        }
    )
    
    console.log(result)

}

test()