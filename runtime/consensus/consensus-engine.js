function generateFinalAnswer(results) {

    const failed =

        Object.values(results)

        .filter(

            item => !item.success
        )

    if (

        failed.length === 0
    
    )  {

        return "Consensus approved"
    } 
    
    return "Consensus requires revision"
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

    buildConsensus,

    generateFinalAnswer


}