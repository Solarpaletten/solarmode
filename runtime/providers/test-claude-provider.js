const {
    executeTask
} = require(
    `./provider-engine`
)

async function test() {

    console.log(

        await executeTask({
            provider: "claude",
            systemPrompt: "You are software engineer.",
            prompt: "Write 5 lines about Solar Runtime"
        })
    )


}

test()
