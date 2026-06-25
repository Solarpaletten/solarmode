const {
    buildArtifacts

} = require(

    "./artifact-engine"   

)

const result = 

    buildArtifacts(
        {
            workflow:
              "design-feature",
        },
        { 
            session: true,

            confidence: 1
          }

        )

console.log(
    
    result

)
