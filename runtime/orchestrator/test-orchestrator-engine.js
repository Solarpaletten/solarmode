const {

    orchestrate

} = require(

    "./orchestrator-engine"

)


async function main() {

    const runtime =

        await orchestrate({

                sessionId: 1782506382062,

                workflow: "design-feature"

        })


    console.log(runtime.context)

    console.log(runtime.consensus)

    console.log(runtime.execution)


}

main()