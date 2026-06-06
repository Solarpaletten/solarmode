const fs = require("fs")

const path = require("path")

const {
    getProvider
} = require(
    "../providers/provider-registry"
)

const {
    audit
} = require(
    "../audits/audit-engine"
)

const {
    createCandidate
} = require(
    "../candidates/candidate-engine"
)

const {
    writeCandidate
} = require(
    "../candidates/candidate-writer"
)

const {
    makeDecision
} = require(
    "../decisions/decision-engine"
)

const {
    canMerge
} = require(
    "../merge/merge-engine"
)

const {
    applyDecision
} = require(
    "../apply/apply-engine"
) 

async function runTask(task) {

    const provider =
        getProvider(
            task.provider || "claude"
        )

    let result = null

    try {

        result =
            await provider.askClaude(
                task.prompt
            )

    } catch (error) {

        console.log(
            "Provider Error:",
            error.message
        )

        return {
            error: error.message
        }
    }

    const auditResult =
        audit(result)

    const candidate =
        createCandidate(
            task,
            auditResult
        )

    const candidatePath =
        path.join(
            __dirname,
            "../candidates",
            `${task.task_id}.json`
        )

    writeCandidate(
        candidatePath,
        candidate
    )

    const decision =
    makeDecision(
        candidate
    )

    const decisionPath =
    path.join(
        __dirname,
        "../decisions",
        `${task.task_id}.json`
    )

    fs.writeFileSync(
    decisionPath,
    JSON.stringify(
        decision,
        null,
        2
    )

    )

    const mergeable =
        canMerge(
            decision
        )
    
    let applyResult = null

    if (mergeable) {
        
        applyResult =
            applyDecision(
                decision,
                result,
                `${task.task_id}.md`
            )


    }

    return {
        result,
        auditResult,
        candidate,
        decision,
        mergeable,
        applyResult
    }
}

module.exports = {
    runTask
}
