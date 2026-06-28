const crypto = require("crypto")

function createId(prefix, name = "unknown") {
    const normalized =
        String(name)
            .toLowerCase()
            .replace(/\s+/g, "-")

    return `${prefix}-${normalized}-${crypto.randomUUID()}`
}

function createEventId(name) {
    return createId("ev", name)
}

function createWorkflowId(name) {
    return createId ("wf", name)
}

function createTaskId(name) {
    return createId ("tk", name)
}

function createSessionId(name) {
    return createId ("ss", name)
}

function createArtifactId(name) {
    return createId ("at", name)
}

function createMemoryId(name) {
    return createId ("mm", name)
}

function createConsensusId(name) {
    return createId ("cs", name)
}

function createCouncilId(name) {
    return createId ("cl", name)
}

module.exports = {
    createId,
    createEventId,
    createWorkflowId,
    createTaskId,
    createSessionId,
    createArtifactId,
    createMemoryId,
    createConsensusId,
    createCouncilId
}

