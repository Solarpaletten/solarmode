const artifacts = {}

function save(key, value) {

    artifacts[key] = value

}

function get(key) {
    return artifacts[key]

}

function getAll() {

    return artifacts
}

module.exports = {

    save,

    get,

    getAll

}