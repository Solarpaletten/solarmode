const {
    getALLArtifacts,
    getArtifactByName,
    getArtifactContent
} = require(
    './artifact-registry'
)

console.log(
    getALLArtifacts()
)

console.log(
    getArtifactByName(
        'TASK-AI-130.md'
    )
)

console.log(
    getArtifactContent(
        'TASK-AI-130.md'
    )
)