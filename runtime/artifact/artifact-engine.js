const fs = require("fs")

const path = require("path")

const ARTIFACT_FILE =
  path.join(
    __dirname,
    "./artifact.json"
  )

const {
  save,
  get,
  getAll
} = require("./artifact-registry")

const {
  createArtifactId
} = require(
  "../runtime-id"
)

function saveToFile() {

  fs.writeFileSync(
    ARTIFACT_FILE,
    JSON.stringify(
      getAll(),
      null,
      2
    ),
    "utf8"
  )

  return ARTIFACT_FILE
}

function createArtifact(executionResult) {

  const artifactType =
    "report"

  const artifactId =
       createArtifactId(
        artifactType
      )
  
  const generatedDir =
    path.join(
      __dirname,
      "./generated"
    )
  
  if (!fs.existsSync(generatedDir)) {

    fs.mkdirSync(
      generatedDir,
      {recursive: true}
    )
  }

  const artifactPath =
    path.join(
      __dirname,
      "./generated",
      `${artifactId}.md`
    )

  const content =
    executionResult.providerResult.result
  
  fs.writeFileSync(
    artifactPath,
    content,
    "utf8"
  )

  const artifact = {
      artifactId,
      artifactType,
      artifactPath,
      executionId: 
        executionResult.executionId,
      provider: 
        executionResult.providerResult.provider,
      content,
      timestamp: 
        new Date().toISOString()
}

  save(
      artifactId,
      artifact
  )
  
  saveToFile()

  return artifact
}

module.exports = {
  createArtifact,
  saveToFile
}