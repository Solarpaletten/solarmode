const fs = require("fs")

function writeCandidate(
    candidatePath,
    candidate
) {

    fs.writeFileSync(
        candidatePath,
        JSON.stringify(
            candidate,
            null,
            2
        )
    )

    return candidatePath
}

module.exports = {
    writeCandidate
}