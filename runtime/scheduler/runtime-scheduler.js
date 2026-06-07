const {
    processQueue
} = require(
    "../queue/runtime-queue"
)


console.log(
    "SCHEDULER STARTED"
)

setInterval(
    async () => {
        console.log(
            "SCHEDULER TICK"
        )

        await processQueue()
    },
    5000
)