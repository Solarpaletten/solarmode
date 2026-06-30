
const artifact = {}

function save(key, value) {

  artifact[key] = value

}

function get(key) {
  return artifact[key]

}

function getAll() {
  return artifact
}

module.exports = {

  save,

  get,

  getAll

}