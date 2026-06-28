const fs = require("fs")

const path = require("path")

const crypto = require("crypto")

const ROUTER_FILE =

    path.join(

        __dirname,

        "./router.json"

    )

const {

    save,

    getAll,

    clear

} = require(

    './router-registry'

)

function loadRouter() {

    try {

        if (!fs.existsSync(ROUTER_FILE)) {

            return 0

        }

        const data = JSON.parse(

            fs.readFileSync(

                ROUTER_FILE,

                "utf-8"
            )

        )

        for (const key in data) {

            save(

                key,

                data[key]

            )

        }

        return Object.keys(data).length

    } catch (error) {

        console.log(

            `Memory corrupted:

    ${error.message}`

        )

        fs.writeFileSync(

            ROUTER_FILE,

            JSON.stringify(

                {},

                null,

                2

            ),

            "utf-8"

        )

        console.log(
            "🧠 New memory journal created"
        )

        return 0

    }

}

function saveToFile() {

    fs.writeFileSync(
        ROUTER_FILE,
        JSON.stringify(
            getAll(),
            null,
            2
        ),
        "utf8"
    )

    return ROUTER_FILE
}

function initializeRouter() {

    const loaded = loadRouter()

    console.log(
        `🧠 Memory loaded: ${loaded} records`
    )

    return loaded

}

function countRouterRecords() {

    if (!fs.existsSync(ROUTER_FILE)) {
        return 0
    }

    const data = JSON.parse(
        fs.readFileSync(
            ROUTER_FILE,
            "utf-8"
        )
    )
    return Object.keys(data).length
}

function routeTask(taskFile, provider) {

    const source = path.join(
        __dirname,
        "../tasks",
        taskFile
    )

    const destination = path.join(
        __dirname,
        "../workspace",
        provider,
        "inbox",
        taskFile
    )

    fs.copyFileSync(
        source,
        destination
    )

    const id =
        crypto.randomUUID()

    store(
        id,
        {
            event: "route",
            task: taskFile,
            provider,
            timestamp: new Date().toISOString()
        }
    )




    return destination
}

function claimTask(provider, taskFile) {
    const source = path.join(
        __dirname,
        "../workspace",
        provider,
        "inbox",
        taskFile
    )

    const destination = path.join(
        __dirname,
        "../workspace",
        provider,
        "work",
        taskFile
    )

    fs.renameSync(
        source,
        destination
    )

    const id =
        crypto.randomUUID()

    store(
        id,
        {
            event: "claim",
            task: taskFile,
            provider,
            timestamp: new Date().toISOString()
        }
    )

    return destination

}

function completeTask(provider, taskFile) {
    const source = path.join(
        __dirname,
        "../workspace",
        provider,
        "work",
        taskFile
    )

    const destination = path.join(
        __dirname,
        "../workspace",
        provider,
        "outbox",
        taskFile
    )

    fs.renameSync(
        source,
        destination
    )

    const id =
        crypto.randomUUID()

    store(
        id,
        {
            event: "complete",
            task: taskFile,
            provider,
            timestamp: new Date().toISOString()
        }
    )

    return destination
}

function archiveTask(
    provider,
    taskFile
) {
    const source = path.join(
        __dirname,
        "../workspace",
        provider,
        "outbox",
        taskFile
    )

    const destination = path.join(
        __dirname,
        "../workspace",
        provider,
        "archive",
        taskFile
    )

    fs.renameSync(
        source,
        destination
    )

    const id =
        crypto.randomUUID()

    store(
        id,
        {
            event: "archived",
            task: taskFile,
            provider,
            timestamp: new Date().toISOString()
        }
    )

    return destination

}

function handoffArtifacts(
    fromProvider,
    toProvider,
    workflow
) {

    const sourceDir = path.join(
        __dirname,
        "../workspace",
        fromProvider,
        "outbox",
        workflow
    )
    const destinationDir = path.join(
        __dirname,
        "../workspace",
        toProvider,
        "inbox",
    )

    const files = fs.readdirSync(sourceDir)
    for (const file of files) {
        fs.copyFileSync(
            path.join(sourceDir, file),
            path.join(destinationDir, file)
        )
    }

    const id =
        crypto.randomUUID()

    store(
        id,
        {
            event: "handoff",
            workflow,
            from: fromProvider,
            to: toProvider,
            artifactCount: files.length,
            artifacts: files,
            timestamp: new Date().toISOString()
        }
    )

    return {
        transferred: files.length,
        from: fromProvider,
        to: toProvider,
        workflow
    }

}

function executeWorkflow(
    taskFile,
    provider,
    nextProvider,
    workflow
) {
    routeTask(
        taskFile,
        provider,
    )

    claimTask(

        provider,
        taskFile
    )

    completeTask(

        provider,
        taskFile
    )

    archiveTask(

        provider,
        taskFile
    )

    return handoffArtifacts(

        provider,
        nextProvider,
        workflow
    )

}

function store(key, value) {

    save(

        key,

        value

    )

    saveToFile()

    return value
}

module.exports = {

    initializeRouter,
    countRouterRecords,
    routeTask,
    claimTask,
    completeTask,
    archiveTask,
    handoffArtifacts,
    executeWorkflow
    
}