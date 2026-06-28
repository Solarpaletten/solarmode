const router = {}

function save(key, value) {

    router[key] = value

}

function get(key) {
    return router[key]

}

function getAll() {

    return router
}

function clear() {
    for (const key in router) {
        delete router[key]
    }
}

module.exports = {

    save,

    get,

    getAll,

    clear

}