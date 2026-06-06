const fs = require("fs")
const path = require("path")

function applyDecision(
    decision,
    content,
    outputFile
) {

    if (
        decision.decision !==
        "APPROVED"
    ) {

        return {
            success: false,
            reason: "Decision rejected"
        }
    }

    const outputPath =
        path.join(
            __dirname,
            "..",
            "generated",
            outputFile
        )

    fs.writeFileSync(
        outputPath,
        content
    )

    return {
        success: true,
        outputPath
    }
}

module.exports = {
    applyDecision
}
