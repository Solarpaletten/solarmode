import { useRuntime }
  from "../../context/RuntimeContext"

export default function AgentsPanel() {

  const { agents } =
    useRuntime()

  return (

    <div>

      <h2>Agents</h2>

      {agents.map((agent) => (

        <div
          key={agent.id}
          style={{
            marginBottom: "10px"
          }}
        >

          <p>
            🤖 {agent.id}
          </p>

          <p>
            📡 {agent.status}
          </p>

          <p>
            📦 Tasks: {agent.tasks}
          </p>

        </div>

      ))}

    </div>
  )
}