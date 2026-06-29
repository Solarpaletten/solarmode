const {

  getAll
} = require("./router-registry")

const {

  initializeRouter
} = require("./router-engine")

function getEvent(eventId) {
   return getAll()[eventId]
}

function getParent(eventId) {
  const event = getEvent(eventId)
  
  if (!event || !event.parentEventId) {
    return null
  }
   
  return getEvent(event.parentEventId)

}

function getChildren(eventId) {
    return Object
        .values(getAll())
        .filter(event => event.parentEventId === eventId)
       
}

function traceEvent(eventId) {
    const trace = []

    let currentId = eventId

    while (currentId) {
      const event = getEvent(currentId)

      if (!event) {
        break
      }

      trace.unshift(event)

      currentId = event.parentEventId
    }
    
    return trace
}

function traceWorkflow(workflowId) {

  return Object
       .values(getAll())
       .filter(event => event.workflowId === workflowId)
}

function findRootEvent(workflowId) {
  return traceWorkflow(workflowId)
      .find(event => event.parentEventId === null)
}

function buildTree(eventId) {
    const event = getEvent(eventId)

    if (!event) {
        return null
    }
    
    return {
      ...event,
      children: getChildren(event.eventId)
           .map(child => buildTree(child.eventId))
    }
}

function traceTree(workflowId) {
     const root = findRootEvent(workflowId)

     if (!root) {
         return null
     }

     return buildTree(root.eventId)
}


module.exports = {
  getEvent,
  getParent,
  getChildren,
  traceEvent,
  traceWorkflow,
  findRootEvent,
  buildTree,
  traceTree
}