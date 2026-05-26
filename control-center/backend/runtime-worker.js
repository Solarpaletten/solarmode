const fs = require("fs")
const path = require("path")

console.log("Runtime Worker Started")

const ROOT_DIR = path.resolve(__dirname, "../..")

const tasksDir = path.join(
    ROOT_DIR,
    "tasks"
)

const reportsDir = path.join(
    ROOT_DIR,
    "runtime/reports"
)

const { execSync } =
    require("child_process")

const SAFE_ACTIONS = [
    "echo",
    "ls",
    "pwd",
    "touch",
    "mkdir",
    "cat"
]


function ensureDir(dir) {

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        })
    }

}

ensureDir(tasksDir)
ensureDir(reportsDir)

function processTasks() {

    const files =
        fs.readdirSync(tasksDir)

    const taskFiles =
        files.filter((file) =>
            file.endsWith(".json")
        )

    taskFiles.forEach((file) => {

        const taskPath =
            path.join(tasksDir, file)

        const raw =
            fs.readFileSync(
                taskPath,
                "utf8"
            )


        const parsed =
            JSON.parse(raw)

        const task =
            parsed.task || parsed

        if (
            task.status === "completed" ||
            task.status === "failed"
        ) {
            return
        }

        console.log(
            `PROCESSING TASK: ${task.task_id}`
        )

        task.status = "running"

        fs.writeFileSync(
            taskPath,
            JSON.stringify(task, null, 2)
        )

        if (!task.logs) {
            task.logs = []
        }

        if (task.actions) {

            for (const action of task.actions) {

                try {

                    console.log(
                        `EXECUTING: ${action}`
                    )

                    const command =
                        action.split(" ")[0]

                    if (
                        !SAFE_ACTIONS.includes(command)
                    ) {

                        throw new Error(
                            `UNSAFE ACTION: ${command}`
                        )

                    }

                    const output =
                        execSync(action).toString()

                    task.logs.push(output)

                } catch (error) {

                    task.status = "failed"


                    fs.writeFileSync(
                        taskPath,
                        JSON.stringify(task, null, 2)
                    )

                    console.log(
                        `ACTION FAILED: ${error.message}`
                    )

                    break

                }

            }

        }

        const reportPath =
            path.join(
                reportsDir,
                `${task.task_id}.md`
            )

        if (task.type === "generate_file") {

            const outputPath = path.join(
                ROOT_DIR,
                task.output
            )

            ensureDir(
                path.dirname(outputPath)
            )

            fs.writeFileSync(
            outputPath,
            task.content
            )
            
            console.log(
                 `FILE GENERATED: ${outputPath}`
            )
            
        }
        

        const reportContent = `
# Runtime Report

Task:
${task.title}

Status:
${task.status}

Owner:
${task.owner}

Priority:
${task.priority}

Generated:
${new Date().toISOString()}

Logs:
${task.logs.join("\n")}

Actions:
${task.actions.join("\n")}
`
        fs.writeFileSync(
            reportPath,
            reportContent
        )

        if (task.status !== "failed") {
            task.status = "completed"
        }

        fs.writeFileSync(
            taskPath,
            JSON.stringify(task, null, 2)
        )

        console.log(
            `TASK COMPLETED: ${task.task_id}`
        )
    })

}

setInterval(
    processTasks,
    3000
)

