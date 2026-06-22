const memory = {}

function save (key, value) {

    memory[key] = value

}

function get(key) {

    return memory[key]

}

function getAll() {

    return memory

}
          

module.exports = {

    save,

    get,

    getAll

} 