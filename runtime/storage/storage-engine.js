const fs = require("fs")

const path = require("path")

const STORAGE_FILE =

    path.join(

        __dirname,

        "./storage.json"

    )

const {

    save,

    getAll

} = require(

    './storage-registry'

)

function saveToFile() {
    
    fs.writeFileSync(
        STORAGE_FILE,
        JSON.stringify(
            getAll(),
            null,
            2
        ),
        "utf8"
    )

    return STORAGE_FILE
}

function store(key, value) {
    
    save(

        key,

        value

    )
    
    saveToFile()

    return value 
}

module.exports = {

    saveToFile,

    store
}