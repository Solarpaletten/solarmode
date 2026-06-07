const fs = require("fs")
const path = require("path")

const DEAD_LETTER_DIR =
    __dirname

function moveToDeadLetter(
    task,
    taskPath
) {

    const deadLetterPath =
        path.join(
            DEAD_LETTER_DIR,
            `${task.task_id}.json`
        )

    fs.writeFileSync(
        deadLetterPath,
        JSON.stringify(
            task,
            null,
            2
        )
    )

    fs.unlinkSync(taskPath)
}

module.exports = {
    moveToDeadLetter
}