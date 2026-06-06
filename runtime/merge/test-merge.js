const {
    canMerge
} = require(
    "./merge-engine"
)

console.log(
    canMerge({
        decision:
            "APPROVED"
    })
)

console.log(
    canMerge({
        decision:
            "REJECTED"
    })
)
