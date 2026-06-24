
function runCouncil(task, context) {

    return {

        architect: {

            success: true,

            answer:

                "Use simple modular architecture"
            
        },

        reviewer: {

            success: true,

            answer:

                 "Approved for MVP"
        },

        auditor: {

            success: true,

            answer:

                "Risk is low"
        }
    }
}

module.exports = {

    runCouncil
}