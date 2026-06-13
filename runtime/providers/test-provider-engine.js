const {
    executeTask
} = require(
    `./provider-engine`
)


console.log(
    executeTask(
        {
            provider:
                `chatgpt`
        }
    )

)

console.log(
    executeTask(
        {
            provider: 
                `claude`
        }
    )
)

console.log(

        executeTask(
            {
                provider: 
                    `qwen`
            }
        )
)

console.log(
    executeTask(
        {
            provider:
                `grok`
        }
    )
)

console.log(
    executeTask(
        {
            provider:
                `deepseek`
        }
    )
)

