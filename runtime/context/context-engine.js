const fs = require("fs")

const path = require("path")

const CONTEXT_FILE =

    path.join(

        __dirname,

        "./context.json"

    )

const {

    save,

    get,

    getAll

} = require(

    "./context-registry"

)

const {

    resume

} = require(

    "../sessions/session-engine"

)

const {

    findByWorkflow

} = require(

    "../memory/memory-engine"

)

function buildContext(

    sessionId,

    workflow

) {

    const session =

        resume(

            sessionId

        )

    const memory =

        findByWorkflow(

            workflow

        )

    const context = {

        session,

        memory,

        workflow,

        timestamp:

            new Date()

                .toISOString()

    }

    save(

        sessionId,

        context

    )

    saveToFile()

    return context

}

function saveToFile() {

    fs.writeFileSync(

        CONTEXT_FILE,

        JSON.stringify(

            getAll(),

            null,

            2

        ),

        "utf-8"

    )

    return CONTEXT_FILE

}

module.exports = {

    buildContext,

    saveToFile

}