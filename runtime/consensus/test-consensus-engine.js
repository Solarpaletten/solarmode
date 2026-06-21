const {
    buildConsensus

} = require(

    "./consensus-engine"

)


console.log(
     buildConsensus({

         architect: {

            success: true

         },

         auditor: {

            success: false,

            error:

               "API timeout"

         },

         reviewer: {

            success: true

         }

    })

)
