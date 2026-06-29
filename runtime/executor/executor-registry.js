const executor = {}

function save(key, value) {

  executor[key] = value

}

function get(key) {
  return executor[key]

}

function getAll() {

  return executor
}

module.exports = {

  save,

  get,

  getAll

}