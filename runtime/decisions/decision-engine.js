function makeDecision(candidate) {

    if (
        candidate.verdict === "GREEN"
    ) {

        return {
            task_id: candidate.task_id,
            verdict: candidate.verdict,
            decision: "APPROVED"
        }
    }

    return {
        task_id: candidate.task_id,
        verdict: candidate.verdict,
        decision: "REJECTED"
    }
}

module.exports = {
    makeDecision
}
