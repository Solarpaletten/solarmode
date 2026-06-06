const { runTask } = require(
  "./runtime-orchestrator"
)

async function main() {

  const result =
    await runTask({
      task_id: "TASK-AI-004",
      title: "Decision Pipeline Test",
      provider: "claude",
      prompt:
        "Write a short summary about Solar Runtime"
    })

  console.log(result)

}

main()
