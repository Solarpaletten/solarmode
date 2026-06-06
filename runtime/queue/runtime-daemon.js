const {
    processQueue
} = require(
    "./runtime-queue"
)

console.log(
    "Runtime Daemon Started"
)

setInterval(
    async () => {

        try {

            await processQueue()

        } catch (error) {

            console.log(
                "Daemon Error:",
                error.message
            )

        }

    },
    5000
)