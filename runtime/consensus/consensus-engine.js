function generateFinalAnswer(results) {

    return (

        "Consensus final answer placeholder"

    )
}

function buildConsensus(results) {

    const roles =

        Object.keys(results)

    const successful =

        roles.filter(

            role =>
                results[role].success

        )

    const failed =

        roles.filter(

            role =>

                !results[role].success

        )




    return {

        success:

            failed.length === 0,

        summary:

            `${successful.length}/${roles.length} agents completed`,

        completed:

            successful.length,

        total:

            roles.length,

        confidence:

        roles.length

        ? 
        
        successful.length / roles.length

        : 0,

        finalAnswer:
          
        generateFinalAnswer(results),

        roles,

        successful,

        failed,

        results

    }
}



module.exports = {

    buildConsensus
}