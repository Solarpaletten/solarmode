const fs = require("fs")

const path = require("path")

const MEMORY_FILE =

    path.join(

        __dirname,

        "./memory.json"

    )

const {

    save,

    get,

    getAll
    
} = require(
    
    './memory-registry'

)

function remember(
    
    task,
    
    consensus,

    artifacts = [

        "answer.md",

        "architecture.md",

        "report.json"
    ]

) {

    const id = Date.now()

    save(

        id,

        {
            
            id,

            timestamp:

                new Date()
                
                     .toISOString(),

            task,

            consensus,

            artifacts

        }

    )

    saveToFile()

    return id

}

function findByWorkflow(
    
    workflow

) {

    return Object.values(
        
        getAll()
    
    ).filter(

        item =>

            item.task.workflow ===
            
            workflow

    )

}

function findByConfidence(

    minConfidence

) {

    return Object.values(

        getAll()

    ).filter(
           
        item =>

            item.consensus
            
                .confidence
                
            >=

            minConfidence

    )
          
}

function saveToFile() {

    fs.writeFileSync (

        MEMORY_FILE,

        JSON.stringify(

            getAll(),

            null,

            2
        )

    )
    
    return MEMORY_FILE
}

function loadFromFile () {

    try {


    if (!fs.existsSync(MEMORY_FILE)) {

        return 0

    }

    const data = JSON.parse(

            fs.readFileSync(

                MEMORY_FILE,

                "utf-8"
            )
        
        )

    for (const key in data) {

        save(

            key,

            data[key]

        )

    }
    
    return Object.keys(data).length}
    
    catch (error) {

        console.log(

            `Memory corrupted:

    ${error.message}`
            
        )

        fs.writeFileSync(

            MEMORY_FILE,

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

const loaded = loadFromFile()

console.log(

    `🧠 Memory loaded:${loaded} records`

)

module.exports = {

    remember,

    get,

    getAll,

    findByWorkflow,

    findByConfidence,

    saveToFile,

    loadFromFile

}