const fs = require("fs")

const path = require("path")

const MEMORY_FILE =

    path.join(

        __dirname,

        "./memory.json"

    )

const {

    remember,

    get,

    getAll,

    findByWorkflow,

    findByConfidence,

    saveToFile,

    loadFromFile

} = require(

    "./memory-engine"

)

const id =

    remember(

        {

            workflow:

                "design-feature"
        },

        {

            confidence:

                0.8,

            success:

                true

        }

    )

console.log(

    get(id)

)

console.log(

    getAll()

)

console.log(

    findByWorkflow(

        "design-feature"
    )

)

console.log(

    findByConfidence(

        0.75

    )

)

console.log(

    saveToFile()

)

console.log(

    loadFromFile()

)