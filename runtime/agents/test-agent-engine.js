const {

    executeAgent

} = require(

    "./agent-engine"

)

async function test() {


    console.log(

        await executeAgent({

                role:

                    `architect`,
                prompt: 

                    `Design Scheduler`

            })
    ),



    console.log(
        await executeAgent({
            role:
               `auditor`,
            prompt:
               `Review Scheduler architecture`
        })
    ),

    console.log(
        await executeAgent({
            role:
               `reviewer`,
            prompt:
               `Review provider-engine.js`
        })

    )
}





test()

