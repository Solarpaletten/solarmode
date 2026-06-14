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
                `qwen`,
            prompt:
                `Write 5 lines about Solar Runtime`
        }
    )
)

}

test()

