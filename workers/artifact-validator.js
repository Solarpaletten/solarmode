const allowedOperations = [
  "echo",
  "date",
  "pwd"
]

function validateArtifact(artifact) {

  if (!artifact.artifact_id) {
    return {
      valid: false,
      reason: "Missing artifact_id"
    }
  }

  if (!artifact.operations) {
    return {
      valid: false,
      reason: "Missing operations"
    }
  }

  if (!Array.isArray(artifact.operations)) {
    return {
      valid: false,
      reason: "Operations must be array"
    }
  }

  for (const operation of artifact.operations) {

    if (!operation.op) {
      return {
        valid: false,
        reason: "Operation missing op"
      }
    }

    if (!allowedOperations.includes(operation.op)) {
      return {
        valid: false,
        reason: `Unknown operation: ${operation.op}`
      }
    }

    if (
      operation.args &&
      !Array.isArray(operation.args)
    ) {
      return {
        valid: false,
        reason: `Args must be array`
      }
    }

  }

  return {
    valid: true
  }
}

module.exports = {
  validateArtifact
}
