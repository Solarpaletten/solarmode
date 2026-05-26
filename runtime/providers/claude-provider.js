require("dotenv").config({
  path: __dirname + "/.env"
})

const Anthropic =
  require("@anthropic-ai/sdk")

const client =
  new Anthropic({
    apiKey:
      process.env.ANTHROPIC_API_KEY
  })

async function askClaude(prompt) {

  const response =
    await client.messages.create({

      model:
        "claude-opus-4-1",

      max_tokens: 1000,

      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })

  return response.content[0].text
}

module.exports = {
  askClaude
}
