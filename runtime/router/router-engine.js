const fs = require("fs")

const path = require("path")

const ROUTER_FILE =

    path.join(

        __dirname,

        "./router.json"

    )

const {

    save,

    getAll

} = require(

    './router-registry'

)

const {
    createEventId,
    createWorkflowId,
    createTaskId
} = require("../runtime-id")

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

function createRootEventId(name = "root") {
    return createEventId(name)
}

function routeTask(
    taskFile,
    provider,
    workflowId,
    taskId,
    parentEventId
) {

    const eventId =
        createEventId("route")

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

    store(
        eventId,
        {
            eventId,
            parentEventId,
            workflowId,
            taskId,
            event: "route",
            task: taskFile,
            provider,
            timestamp: new Date().toISOString()
        }
    )

    return eventId
}

function claimTask(provider, taskFile, workflowId, taskId, parentEventId) {

    const eventId = createEventId("claim")

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

    store(
        eventId,
        {
            eventId,
            parentEventId,
            workflowId,
            taskId,
            event: "claim",
            task: taskFile,
            provider,
            timestamp: new Date().toISOString()
        }
    )

    return eventId

}

function completeTask(provider, taskFile, workflowId, taskId, parentEventId) {

    const eventId = createEventId("complete")

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

    store(
        eventId,
        {
            eventId,
            parentEventId,
            workflowId,
            taskId,
            event: "complete",
            task: taskFile,
            provider,
            timestamp: new Date().toISOString()
        }
    )

    return eventId
}

function archiveTask(
    provider,
    taskFile,
    workflowId,
    taskId,
    parentEventId
) {

    const eventId = createEventId("archive")

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

    store(
        eventId,
        {
            eventId,
            parentEventId,
            workflowId,
            taskId,
            event: "archive",
            task: taskFile,
            provider,
            timestamp: new Date().toISOString()
        }
    )

    return eventId

}

function handoffArtifacts(
    fromProvider,
    toProvider,
    workflow,
    workflowId,
    taskId,
    parentEventId
) {

    const eventId = createEventId("handoff")

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

    store(
        eventId,
        {
            eventId,
            parentEventId,
            workflowId,
            taskId,
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
        eventId,
        parentEventId,
        workflowId,
        taskId,
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
    workflow,
) {

    const workflowId =
        createWorkflowId(workflow)

    const taskId =
        createTaskId(taskFile)


    const routeEventId =
        routeTask(
            taskFile,
            provider,
            workflowId,
            taskId,
            null
        )

    const claimEventId =
        claimTask(
            provider,
            taskFile,
            workflowId,
            taskId,
            routeEventId
        )

    const completeEventId =
        completeTask(
            provider,
            taskFile,
            workflowId,
            taskId,
            claimEventId
        )

    const archiveEventId =
        archiveTask(
            provider,
            taskFile,
            workflowId,
            taskId,
            completeEventId
        )

    return handoffArtifacts(
        provider,
        nextProvider,
        workflow,
        workflowId,
        taskId,
        archiveEventId
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
    createRootEventId,
    initializeRouter,
    countRouterRecords,
    createEventId,
    routeTask,
    claimTask,
    completeTask,
    archiveTask,
    handoffArtifacts,
    executeWorkflow
}