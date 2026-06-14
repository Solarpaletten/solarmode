
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
   

async function executeTask(task) {
    if (
        task.provider === 
        `chatgpt`
    ) {
     return await chatgptProvider(task) 

    }


    if ( 
        task.provider === 
        `claude`
    ) {
      
     return await claudeProvider(task)
    }

    if (
        task.provider === 
        `qwen`
    ) {
       return await qwenProvider(task) 

    }

    if ( 
        task.provider === 
        `grok`
    ) { 
     return await grokProvider(task)

    }

    if (
       task.provider === 
        `deepseek`
    ) {
       return await deepseekProvider(task) 

    }


    throw new Error(
        `Provider not found:
         ${task.provider}`
        )
}

module.exports = {
    executeTask
}