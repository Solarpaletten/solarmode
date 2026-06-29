require(
    "dotenv").config({
        path: __dirname + "/.env"
    })

const OpenAI = require("openai")


const client =
    new OpenAI({
        apiKey:
            process.env.XAI_API_KEY,
        
        baseURL:
           "https://api.x.ai/v1" 
    })

async function askGrok(prompt) {

    const systemPrompt = `
    AI Auditor

Mission:

- criticize architecture
- find weak places
- challenge assumptions
- suggest alternatives`

    const response =
        await client.chat.completions.create({
            model: "grok-4",
            messages: [
                {
                  role: "system",
                  content: systemPrompt
                },
                {
                    role: "user",
                    content:
                        prompt
                }
            ]


        })
    return response.choices[0].message.content

}

async function grokProvider(task) {

    const result =
        await askGrok(
            task.prompt
        )
    return {
        result:
            `Response from Grok: ${result}`
    }
}

module.exports = {
    askGrok,
    grokProvider
}
