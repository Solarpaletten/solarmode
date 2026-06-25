const {

    saveArtifact,

    buildAnswer,

    buildArchitecture,

    buildReport

} = require(

    "./artifact-engine"

)

const task = {

    workflow:

        "design-feature",

    mode:

        "parallel"

}

const consensus = {

    finalAnswer:

        "Use FIFO Scheduler for MVP",

    confidence:

        0.8,

    success:

        true,

    completed:

        5,

    total:

        5,
    
    roles: [

        "architect",

        "auditor",

        "reviewer",

        "pm",

        "runtime-engineer"

    ],

    successful:

        [

            "architect",

            "auditor",

            "reviewer",

            "pm",

            "runtime-engineer"

        ],

    failed:

        [],
}

const content =

    buildAnswer(

        consensus
    )

console.log(

    saveArtifact(

        "answer.md",

        content
    )
)

const architecture =

    buildArchitecture(

        task,

        consensus
    )

console.log(

    saveArtifact(

        "architecture.md",

        architecture
    )

)

const report =

    buildReport(

        task,

        consensus
    )

console.log(

    saveArtifact(

        "report.json",

        report

    )
)


