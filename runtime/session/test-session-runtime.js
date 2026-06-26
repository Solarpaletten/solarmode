const fs = require("fs")

const path = require("path")

const SESSION_FILE =

path.join(

        __dirname,

        "./session.json"

    )

const {

    createSession,

    get,

    getAll,

    addMessage,

    saveToFile,

    loadFromFile,

    resume

} = require(

    "./session-engine"
)

const id =

    createSession(

        "Design Scheduler"
    
    )

addMessage(

    id,

    "user",

    "Design FIFO scheduler"

)

addMessage(

    id,

    "architect",

    "Use queue + worker"
)

console.log(

    get(id)
)

console.log(

    getAll()
)

console.log(

    saveToFile()
)

console.log(

    loadFromFile()
)

const session =

    resume(
        
        id
        
    )

console.log(

    session

)