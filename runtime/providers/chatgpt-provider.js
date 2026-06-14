require(
    "dotenv").config({
        path: __dirname + "/.env"
    })

const OpenAI = require("openai")


const client =
    new OpenAI({
        apiKey:
            process.env.OPENAI_API_KEY
    })

async function askChatGPT(prompt) {

    const response =
        await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content:
                        prompt
                }
            ]


        })
    return response.choices[0].message.content

}

async function chatgptProvider(task) {

    const result =
        await askChatGPT(
            task.prompt
        )
    return {
        result:
            `Response from ChatGPT: ${result}`
    }
}

module.exports = {
    askChatGPT,
    chatgptProvider
}
