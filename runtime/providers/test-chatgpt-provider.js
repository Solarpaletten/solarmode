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
                `chatgpt`,
            prompt:
                `Write 5 lines about Solar Runtime`
        }
    )
)

}

test()
