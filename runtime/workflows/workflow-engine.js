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


async function executeWorkflow(task) {

    

    if (task.mode === "parallel") {

        return await runParallel(roles, task)
    
    }

    return await runSequential(roles, task)


    const mode =

        getMode(

            task.mode || "sequential"

        )

    console.log(

        `Mode:
        
    ${task.mode || "sequential"}`

    )

    const roles =

        getWorkflow(

            task.workflow
        )

    const result = {}

    if (

        mode


    ) {

        console.log(

            mode.description

        )

        for (const role of roles) {

            console.log(

                `Running ${role}...`

            )

            const start = Date.now()

            result[role] =

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
        }

        return result
    }

    

}

async function runSequential(roles, task) {

    const result = {}

    for (const role of roles) {

        result(role) =
            await executeAgent({
                role,
                prompt: task.prompt
            })
    }
    
    return result
}
async function runParallel(roles, task) {

    const entries =

         await Promise.all(

            roles.map(role => {

                const result =
                    
                     await executeAgent( {

                          role,
                          prompt: task.prompt
                     }

                     )

                return [
                    role,
                    result
                ]     
            }
        )
    
)

    return Object.fromEntries(entries)

}
           



    module.exports = {

        executeWorkflow
    }


