const fs = require("fs")

const path = require("path")

const SESSION_FILE =

    path.join(

        __dirname,

        "./sessions.json"

    )

const {

    save,

    get,

    getAll

} = require(

    './session-registry'

)

function createSession(

    title

) {

    const id =

        Date.now()

    save(
        id,

        {
            id,

            title,

            createdAt:

                new Date()

                    .toISOString(),

            messages: []

        }
    )

    saveToFile()

    return id
}

function addMessage(

    sessionId,

    role,

    content

) {

    const session =

        get(sessionId)

    if (!session) {

        return false
    }

    session.messages.push({

        role,

        content,

        timestamp:

            new Date()

                .toISOString()


    })

    save(

        sessionId,

        session

    )

    saveToFile()

    return true
}

function saveToFile() {

    fs.writeFileSync(

        SESSION_FILE,

        JSON.stringify(

            getAll(),

            null,

            2
        )

    )

    return SESSION_FILE

}

function loadFromFile() {

    try {

        if (

            !fs.existsSync(

                SESSION_FILE

            )
        ) {

            return 0

        }

        const data =

            JSON.parse(

                fs.readFileSync(

                    SESSION_FILE,

                    "utf-8"
                )
            )
        for (

            const key

            in

            data

        ) {

            save(

                key,

                data[key]

            )
        }

        return Object.keys(

            data

        ).length

    }

    catch (error) {

        console.log(

            `Session corrupted:
    
    
${error.message}`

        )

        fs.writeFileSync(

            SESSION_FILE,

            JSON.stringify(

                {},

                null,

                2

            ),

            "utf-8"

        )

        return 0

    }

}

function resume(

    sessionId

) {

    const session = 
        
        get(sessionId)

    if (!session) {

        return null

    }

    return {

        sessionId,

        title:

           session.title,

        messages:

          session.messages
    }
}

const loaded =

    loadFromFile()

console.log(

    `💬 Sessions loaded:

${loaded} records`

)


module.exports = {

    createSession,

    addMessage,

    saveToFile,

    loadFromFile,

    resume,

    get,

    getAll
}
