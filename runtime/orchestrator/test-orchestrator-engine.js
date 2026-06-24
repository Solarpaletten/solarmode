const {

    orchestrate

} = require(

    "./orchestrator-engine"

)


async function main() {

    const result =

        await orchestrate({

                sessionId:

                    1782134867443,

                workflow:

                    "design-feature"

        })


    console.log (

        result.context
    )

    console.log (

        result.result

    )

}

main()