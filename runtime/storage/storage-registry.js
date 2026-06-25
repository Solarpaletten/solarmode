const storage = {}

function save(key, value) {

    storage[key] = value

}

function get(key) {
    return storage[key]

}

function getAll() {

    return storage
}

module.exports = {

    save,

    get,

    getAll

}