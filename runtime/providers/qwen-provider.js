require(

    "dotenv").config({

        path: __dirname + "/.env"

    })

const OpenAI =

    require("openai")

const client =

    new OpenAI({

        apiKey: `ollama`,

        baseURL:
            "http://localhost:11434/v1",

        timeout:

            300000

    })

async function askQwen(
    
    systemPrompt,

    prompt

) {

    const response =

        await client.chat.completions.create({

            model: "qwen2.5:32b-instruct-q4_K_M",

            timeout:

                300000,
            
            messages: [
                {
                    role:
                    
                        "system",

                    content:
                        
                        systemPrompt
                   
                },
                {
                    role:

                        "user",
                    
                    content:
                        
                        prompt
                }
            ]
        })

    return response.choices[0].message.content

}



async function qwenProvider(task) {

    const result =

        await askQwen(

            task.systemPrompt,

            task.prompt
        )

    return {
        
        result: 

            `Response from Qwen: ${result}`
    }
}

module.exports = {
    askQwen,
    qwenProvider
}