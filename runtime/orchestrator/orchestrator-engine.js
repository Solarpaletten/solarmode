const fs = require("fs")

const path = require("path")

const ORCHESTRATOR_FILE =

    path.join(

        __dirname,

        "./orchestrator.json"

    )

const {

    save,

    get,

    getAll

} = require(

    './orchestrator-registry'

)

const {

    buildConsensus

} = require(

    "../consensus/consensus-engine"
)

const {

    buildContext

} = require(

    "../context/context-engine"

)

const {

    runCouncil

} = require(

    "../council/council-engine"

)


function saveOrchestratorToFile() {

        fs.writeFileSync(

            ORCHESTRATOR_FILE,

            JSON.stringify(

                getAll(),

                null,

                2
            ),
            "utf8"
        )

        return ORCHESTRATOR_FILE

    }

   

async function orchestrate(task) {

    const context =

        buildContext(

            task.sessionId,

            task.workflow

        )

    const  council =

        runCouncil(

            task,

            context
          )

    const consensus =

        buildConsensus(

            council
        )

    const result = {

        council,

        consensus
    }
    
    const orchestration = {

        id: Date.now(),
        task,
        context,
        result,
        timeStamp:
            new Date()
                .toISOString()
    }

    save(

        orchestration.id,

        orchestration
    )

    saveOrchestratorToFile() 

    return {
        context,
        result
    }    
}

module.exports = {

    orchestrate

}