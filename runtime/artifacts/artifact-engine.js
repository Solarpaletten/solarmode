const fs = require("fs")

const path = require("path")

const GENERATED_DIR =

    path.join(

        __dirname,

        "../generated"

    )

function buildAnswer(consensus) {

    return `# Final Answer

${consensus.finalAnswer}

Confidence:
    
${consensus.confidence}

Status:

${consensus.success

            ? "SUCCESS"

            : "FAILED"


        }

`
}

function saveArtifact(

    filename,

    content

) {

    if (

        !fs.existsSync(

            GENERATED_DIR

        )

    ) {

        fs.mkdirSync(

            GENERATED_DIR,

            {

                recursive: true

            }
        )
    }

    const filePath =

        path.join(

            GENERATED_DIR,

            filename

        )

    fs.writeFileSync(

        filePath,

        content,

        "utf-8"

    )

    return filePath





}

function buildArchitecture(

    task,

    consensus

) {

    return `# Architecture

Workflow:

${task.workflow}

Mode:

${task.mode}

Roles:

${consensus.roles.join(", ")}

Confidence:

${consensus.confidence}

Status:

${consensus.success

            ? "SUCCESS"

            : "FAILED"
        }

`
}

function buildReport(

    task,

    consensus

) {
  
    return JSON.stringify(

        {

            workflow:
                
                task.workflow,
           
            mode:

                task.mode,

            success:
            
                consensus.success, 

            completed:

                consensus.completed,

            total:

                consensus.total,

            confidence:

                consensus.confidence,

            successful:

                consensus.successful,

            failed:

                consensus.failed

        },

        null,

        2
    )
}


module.exports = {

    saveArtifact,

    buildAnswer,

    buildArchitecture,

    buildReport

}
