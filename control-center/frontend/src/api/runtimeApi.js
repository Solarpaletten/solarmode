const API_BACKEND =
  "http://localhost:3001"

const API_RUNTIME =
  "http://localhost:3010"

export async function fetchQueue() {

  const response = await fetch(
    `${API_BACKEND}/queue`
  )

  return response.json()
}

export async function fetchLogs() {

  const response = await fetch(
    `${API_BACKEND}/logs`
  )

  return response.json()
}

export async function fetchRuntimeStatus() {

  const response = await fetch(
    `${API_RUNTIME}/runtime/status`
  )

  return response.json()
}

export async function mergeRuntime() {

  const response = await fetch(
    `${API_RUNTIME}/runtime/merge`,
    {
      method: "POST"
    }
  )

  return response.json()
}

export async function rollbackRuntime() {

  const response = await fetch(
    `${API_RUNTIME}/runtime/rollback`,
    {
      method: "POST"
    }
  )

  return response.json()
}

export async function fetchAgents() {

  const response = await fetch(
    `${API_RUNTIME}/agents/status`
  )

  return response.json()
}

export async function createTask(
  payload
) {

  const response =
    await fetch(
      "http://localhost:3010/tasks/create",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(payload)
      }
    )

  return response.json()

} 