
const {
    runCouncil

} = require(

    "./council-engine"   
)

const result = 

    runCouncil(

        {

            workflow:
               "design-feature",
        },

        {

            session:

                 {},

            memory:
                
                 []
        }
    )

console.log(

    result
)