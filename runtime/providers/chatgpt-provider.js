const { default: Anthropic } = require("@anthropic-ai/sdk")

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

async function askChatGPT(
    systemPrompt = "",
    prompt
) {

    const response =
        await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                ...(systemPrompt

                    ? [{
                        role: "system",
                        content: systemPrompt
                    }]
                    : []),

                {
                    role: "user",
                    content: prompt
                }
            ]
        })

    return response.choices[0].message.content
}

async function chatgptProvider(task) {
    try {
        const result =
            await askChatGPT(
                task.systemPrompt,
                task.prompt
            )

        return {
            success: true,
            provider: "chatgpt",
            result
        }

    } catch (error) {

        return {
            success: false,
            provider: "chatgpt",
            error: error.message
        }
    }
}


module.exports = {
    askChatGPT,
    chatgptProvider
}
