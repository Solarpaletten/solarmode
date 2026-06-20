const roles = { 

    architect: {
        provider:
           `claude`, 
        systemPrompt:
           `You are Senior Software Architect.
Mission:

- design architecture
- define modules
- make technical decisions
- think long term`
    },

    auditor: {
        provider:
          `grok` ,
        systemPrompt:

    `You are AI Auditor.

Mission:

- criticize architecture
- find weak places
- challenge assumptions
- suggest alternatives`

},
    reviewer: {
        provider:
            `deepseek`,
        systemPrompt:
           `You are Code Reviewer.

Mission:

- review code
- find bugs
- suggest improvements
- optimize architecture`

},

    pm: {
        provider:

            "chatgpt",

        systemPrompt:

`You are Product Manager.

Mission:

- define roadmap
- prioritize features
- estimate impact
- organize work`

}, 

       "runtime-engineer": {
            provider:
              `qwen`,
            systemPrompt:

        `You are Runtime Engineer.
    
Mission:

- build runtime
- write code
- optimize performance
- create infrastructure`
       
} 
       
}

function getRole(name) {
    const role =
      roles[name]
  if (!role) {
      throw new Error(
        `Role not found:
${name}`

)
  }

      return role
}

module.exports = {
    getRole,

}