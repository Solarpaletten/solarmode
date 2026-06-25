const fs = require("fs")

const path = require("path")

const EXECUTE_FILE =

    path.join(
        __dirname,
        "./executor.json"
    )

const {

    save,

    get,

    getAll

} = require (

    "./executor-registry"

)

function saveToFile() {
       
    fs.writeFileSync (
        EXECUTE_FILE, 
        JSON.stringify (
            getAll(), 
            null, 
            2
        ), 
        "utf8"
    )

    return EXECUTE_FILE
}

function execute(task) {

    const result = {

        success: true,

        status: "executed"
    }

    save(

        Date.now(),

        result

    )

    saveToFile()

    return result

}

module.exports = {

    saveToFile,

    execute
}