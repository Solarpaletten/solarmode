const { runTask } = require(
    "./runtime-orchestrator"
)

async function main() {

    const result =
        await runTask({

            task_id:
                "TASK-AI-005",

            title:
                "Full Pipeline Test",

            provider:
                "claude",

            prompt:
                "Write a short summary about Solar Runtime"
        })

    console.log(result)

}

main()