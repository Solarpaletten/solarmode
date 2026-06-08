const fs = require('fs')

const path = require('path')

const GENERATOR_DIR =
        path.join(
            __dirname,
             '../generated'
    )

function getALLArtifacts() {
    
     const files =
      fs.readdirSync(
        GENERATOR_DIR
    )
    
    return files.filter(
        file =>
             file.endsWith('.md')
        )
}

function getArtifactByName(name) {
    const artifacts =
            getALLArtifacts()
        
    return artifacts.find(
           artifact => 
             artifact === name
           ) || null
}


function getArtifactContent(name) {
    const artifact =
            getArtifactByName(name)

        if (!artifact) {
            return null
        }
    
    const artifactPath =
        path.join(
            GENERATOR_DIR,
            name
            )

    return fs.readFileSync(
                artifactPath,
                 "utf-8"
           ) || null
}

module.exports = {
    getALLArtifacts,
    getArtifactByName,
    getArtifactContent
}