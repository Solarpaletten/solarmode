const councils = {}

function save(key, value) {

    councils[key] = value

}

function get(key) {
    return councils[key]

}

function getAll() {

    return councils
}

module.exports = {

    save,

    get,

    getAll

}