const providers = {
    claude: require("./claude-provider")
}

function getProvider(name) {

    const provider = providers[name]

    if (!provider) {
        throw new Error(
            `Provider not found: ${name}`
        )
    }

    return provider
}

module.exports = {
    getProvider
}
