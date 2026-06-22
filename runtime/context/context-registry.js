const context = {}

function save(key, value) {

    context[key] = value

}

function get(key) {

    return context[key]

}

function getAll() {

    return context

}

module.exports = {

    save,

    get,

    getAll

}