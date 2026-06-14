require (
        "dotenv").config({  
            path: __dirname + "/.env"

        })

const OpenAI = require("openai")

const client =
    new OpenAI({

        apiKey: "ollama",

        baseURL:

          "http://localhost:11434/v1"

})

async function askDeepSeek(prompt) {

    const systemPrompt = `
    You are coding assistant.

Solar Runtime is:

- JavaScript Runtime
- AI Operating System
- Provider Engine
- Task Scheduler
- Artifact System

You help architect and develop Solar Runtime.`
    

const response =
    await client.chat.completions.create({

        model:

          "deepseek-coder:1.3b",

        messages:[
            {
               role: "system",
               content: systemPrompt
            },


            {
                role: "user",
                content: prompt
            }
        ]
   
})
   

return response.choices[0].message.content

}

async function deepseekProvider(task) {
    
    const result =
      await askDeepSeek(
          task.prompt 
      )

    return {
       result:
       `Response from DeepSeek:${result}`
    }
}


module.exports = {
    askDeepSeek,
    deepseekProvider    
}
