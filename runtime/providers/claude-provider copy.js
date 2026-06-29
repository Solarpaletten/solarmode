
require("dotenv").config({
  path: __dirname + "/.env"
})

const Anthropic =
  require(
    "@anthropic-ai/sdk"
  )

const client =
  new Anthropic({
    apiKey:
      process.env.ANTHROPIC_API_KEY
  })


async function askClaude(

  systemPrompt,

  prompt

) {

  const response =

    await client.messages.create({

      model:

        `claude-opus-4-1`,

      max_tokens:

        1000,

      system:

        systemPrompt,

      messages: [

        {

          role:

            "user",

          content:

            prompt

        }
      ]

    })

  return response.content[0].text

}

async function claudeProvider(task) {

  try {
    const result =
      await askClaude(
        task.systemPrompt,
        task.prompt
      )

    return {
      success: true,
      provider: "claude",
      result
    }

  } catch (error) {

    return {
      success: false,
      provider: "claude",
      error: error.message
    }

  }

}

module.exports = {
  claudeProvider,
  askClaude
}