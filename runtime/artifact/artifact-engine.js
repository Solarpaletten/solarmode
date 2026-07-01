const fs = require("fs")

const path = require("path")

const crypto = require("crypto")

const ARTIFACT_FILE =
  path.join(
    __dirname,
    "./artifact.json"
  )

const {
  save,
  getAll
} = require("./artifact-registry")

const {
  createArtifactId
} = require(
  "../runtime-id"
)

const artifactExtensions = {
  report: "md",
  architecture: "md",
  readme: "md",
  "source-code": "js",
  "test-suite": "js",
  config: "json",
  deploy: "sh",
  package: "zip"
}

function createArtifact(
  executionResult,
  artifactType = "report"
) {


  const extension =
    artifactExtensions[
    artifactType
    ] || "txt"

  const artifactId =
    createArtifactId(
      artifactType
    )

  const content =
    executionResult.providerResult.result

  const hash =
    crypto
      .createHash("sha256")
      .update(content)
      .digest("hex")



  const artifactPath =
    path.join(
      __dirname,
      "./generated",
      `${artifactId}.${extension}`
    )

  const generatedDir =
    path.join(
      __dirname,
      "./generated"
    )

  if (!fs.existsSync(generatedDir)) {

    fs.mkdirSync(
      generatedDir,
      { recursive: true }
    )
  }

  fs.writeFileSync(
    artifactPath,
    content,
    "utf8"
  )

  const stats =
    fs.statSync(
      artifactPath
    )

  const artifact = {
    artifactId,
    artifactType,
    extension,
    artifactPath,
    executionId:
      executionResult.executionId,
    provider:
      executionResult.providerResult.provider,
    content,
    hash,
    size:
      stats.size,
    status:
      "generated",
    mimeType: "application/javascript",
    version: "v3.26",
    checksumType: "sha256",
    createdBy:
      executionResult.providerResult.provider,
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

module.exports = {
  createArtifact,
  saveToFile
}