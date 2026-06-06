const {
    applyDecision
} = require(
    "./apply-engine"
)

const result =
    applyDecision(

        {
            decision:
                "APPROVED"
        },

        "# Solar Runtime Generated File",

        "generated-test.md"
    )

console.log(result)
