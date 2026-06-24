const orchestrations = {}

function save(key, value) {

    orchestrations[key] = value

}

function get(key) {

    return orchestrations[key]

}

function getAll() {

    return orchestrations

}

module.exports = {

    save,

    get,

    getAll

}

