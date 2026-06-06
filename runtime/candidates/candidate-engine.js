const fs = require("fs")
const path = require("path")

function createCandidate(
    task,
    auditResult
) {

    const candidate = {
        task_id: task.task_id,
        title: task.title,
        verdict: auditResult.verdict,
        created_at:
            new Date().toISOString()
    }

    if (task.output) {
        candidate.output = task.output
    }

    return candidate
}

module.exports = {
    createCandidate
}
