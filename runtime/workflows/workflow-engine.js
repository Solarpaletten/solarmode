const {

    executeAgent

} = require(

    "../agents/agent-engine"

)

const {

    getWorkflow

} = require(

    "./workflow-registry"
)

const {

    getMode

} = require(

    "./workflow-modes"

)

const {

    buildConsensus

} = require(
    
    "../consensus/consensus-engine"

)

async function executeWorkflow(task) {


    const mode =

        getMode(

            task.mode || "sequential"

        )

    console.log(

        `Mode:
        
    ${task.mode || "sequential"}`

    )

    console.log(

        mode.description
    )

    const roles =

        getWorkflow(

            task.workflow
        )


    if (

        task.mode === "parallel"

    ) {

        const results =

            await runParallel(

            roles,

            task
        )

        return buildConsensus(

            results
        )

    }

    if (

        task.mode === "sequential"

        ||

        !task.mode
    ) {

        const results =
        
             await runSequential(

            roles,

            task
        )

        return buildConsensus(

            results
        )
    }

    throw new Error(

        `Mode not supported: ${task.mode}`

    )

}

async function runSequential(roles, task) {

    const result = {}

    for (const role of roles) {

        result[role] =

            await executeAgent({

                role,

                prompt:

                    task.prompt
            })
    }

    return result
}

async function runParallel(roles, task) {

    const entries =

        await Promise.all(

            roles.map(

                async role => {

                    console.log(

                        `Running ${role}...`

                    )

                    const start = Date.now()

                    try {

                        const result =

                            await executeAgent({

                                role,

                                prompt:

                                    task.prompt

                            })

                        const elapsed =

                            ((Date.now() - start) / 1000)
                                .toFixed(1)

                        console.log(
                            `${role} completed (${elapsed}s)`
                        )


                        return [

                            role,

                            {

                                success: true,

                                result
                            }
                        ]

                    }

                    catch (error) {

                        console.log(

                         `${role} failed
                        
                        ${error.message}`

                        )


                        return [

                            role,

                            {

                                success: false,

                                error:

                                    error.message

                            }
                        ]

                    }



                }
            )

        )


    return Object.fromEntries(

        entries
    )

}

module.exports = {

    executeWorkflow
}