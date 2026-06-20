const {

    executeWorkflow

} = require(

    "./workflow-engine"

)

const workflows = {

    "design-feature": [

        "architect",

        "auditor",

        "reviewer",

        "pm",

        "runtime-engineer"
    ],

    "review-pr": [

        "reviewer",

        "auditor"

    ],

    "product-roadmap": [

        "pm",

        "architect",

        "auditor"

    ]
}

async function test() {

    console.log(

        await executeWorkflow({

            workflow: 

                "design-feature",
        
            mode:

                "sequential",

            prompt:
              
                "Design Scheduler"

        })

    )
    
}

test()