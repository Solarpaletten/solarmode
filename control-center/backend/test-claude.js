const {
  askClaude
} = require(
  "../../runtime/providers/claude-provider"
)

async function main() {

  const result =
    await askClaude(
      "Say hello from Solar Runtime"
    )

  console.log(result)
}

main()
