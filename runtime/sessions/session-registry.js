const session = {}

function save (key, value) {
   
    session[key] = value

}

function get(key) { 

    return session[key] 

}

function getAll() {

    return session

}

module.exports = {

        save,

        get,
        
        getAll
}   