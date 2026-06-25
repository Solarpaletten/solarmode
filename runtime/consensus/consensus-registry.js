const consensus = {}

function save(key, value) {

    consensus[key] = value

}

function get(key) {
    return consensus[key]

}

function getAll() {

    return consensus
}

module.exports = {

    save,

    get,

    getAll

}