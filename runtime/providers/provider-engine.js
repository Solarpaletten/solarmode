const {
    chatgptProvider
    } = require(
        `./chatgpt-provider`
    )

const {
    claudeProvider
} = require(
       `./claude-provider`
    )   

const {
    qwenProvider
} = require(
       `./qwen-provider`
    )

const {
    grokProvider
} = require(
       `./grok-provider`
    )

const {
    deepseekProvider
} = require(
       `./deepseek-provider`
    )

const providers = {
    chatgpt: chatgptProvider,
    claude: claudeProvider,
    qwen: qwenProvider,
    grok: grokProvider,
    deepseek: deepseekProvider
}

async function executeTask(task) {
    const provider =
        providers[task.provider]

    if (!provider) {
        throw new Error(
            `Unknown provider:
            ${task.provider}`
        )
    }

    return await provider(task)
}

module.exports = {
    executeTask
}