const {

    getRole

} = require(

    "../roles/role-registry"

)

const {

  executeTask

} = require(

    "../providers/provider-engine"

)

async function executeAgent(task) {

    const role =
    
    getRole(

        task.role

    )
    return await executeTask ({

        provider:
        
            role.provider,

        systemPrompt:
        
            role.systemPrompt,

        prompt:

            task.prompt,

    } )




}
module.exports = {

    executeAgent

}
