const {

    store

} = require(

    "./storage-engine"
)

console.log(

    store(
        "test",

        {
            success: true
        }
    )
)

