
const {
     execute
} = require("./executor-engine")

async function test () {

  const result =
    await execute({
       provider: "chatgpt",
       systemPrompt: "You are software architect.",
       prompt: "Write 5 lines about Solar Runtime"
    })
    console.log(result)
}


test()
