const {
    executeTask
} = require(
    `./provider-engine`
)

async function test() {
console.log(
    await executeTask(
        {
            provider: 
                `deepseek`,
            prompt:
                `Review Scheduler architecture`
        }
    )
)

}

test()
