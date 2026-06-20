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

function getWorkflow(name) {

    const workflow =

        workflows[name]

    if (!workflow) {

        throw new Error(

            `Workflow not found:
${name}`

       )
    }
    
    return workflow

}

module.exports = {

    getWorkflow

}

