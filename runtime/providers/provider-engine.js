
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
   

function executeTask(task) {
    if (
        task.provider === 
        `chatgpt`
    ) {
     return chatgptProvider(task) 

    }


    if ( 
        task.provider === 
        `claude`
    ) {
      
     return claudeProvider(task)

    }

    if (
        task.provider === 
        `qwen`
    ) {
       return qwenProvider(task) 

    }

    if ( 
        task.provider === 
        `grok`
    ) { 
     return grokProvider(task)

    }

    if (
       task.provider === 
        `deepseek`
    ) {
       return deepseekProvider(task) 

    }


    throw new Error(
        `Provider not found:
         ${task.provider}`
        )
}

module.exports = {
    executeTask
}