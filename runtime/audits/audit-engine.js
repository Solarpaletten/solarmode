function audit(content) {

    if (
        !content ||
        content.length < 100
    ) {

        return {
            verdict: "RED"
        }
    }

    return {
        verdict: "GREEN"
    }
}

module.exports = {
    audit
}
