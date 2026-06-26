
const fs = require("fs")

const path = require("path")

const CONTEXT_FILE =

path.join(

        __dirname,

        "./context.json"

    )



const {

    buildContext,

    saveToFile

} = require(

    "./context-engine"

)

console.log(

    buildContext(

        1782511288355,

        "design-feature"

    )

)