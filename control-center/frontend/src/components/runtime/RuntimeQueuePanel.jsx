import { useRuntime }
  from "../../context/RuntimeContext"

export default function RuntimeQueuePanel() {

  const { queueState } =
    useRuntime()

  if (!queueState) {
    return (
      <p>No queue data available</p>
    )
  }

  return (

    <div
      style={{
        marginTop: "20px"
      }}
    >

      <h2>Runtime Queue</h2>

      <p>
        🟡 Pending:
        {queueState.pending.length}
      </p>

      <p>
        🔵 Running:
        {queueState.running.length}
      </p>

      <p>
        🟢 Completed:
        {queueState.completed.length}
      </p>

      <p>
        🔴 Failed:
        {queueState.failed.length}
      </p>

      <div
        style={{
          marginTop: "20px"
        }}
      >

        {queueState.pending.map((task) => (

          <div
            key={`pending-${task.task_id}`}
            style={{
              marginBottom: "12px",
              padding: "10px",
              border: "1px solid #333",
              borderRadius: "8px"
            }}
          >

            <p>🆔 {task.task_id}</p>

            <p>📄 {task.title}</p>

            <p>📌 {task.status}</p>

            <p>
              🕒 {
                new Date(task.created_at)
                  .toLocaleTimeString()
              }
            </p>

          </div>

        ))}


          {queueState.running.map((task) => (


            <div
              key={`running-${task.task_id}`}
              style={{
                marginBottom: "12px",
                padding: "10px",
                border: "1px solid #333",
                borderRadius: "8px"
              }}
            >

              <p>🆔 {task.task_id}</p>

              <p>📄 {task.title}</p>

              <p>📌 {task.status}</p>

              <p>
                🕒 {
                  new Date(task.created_at)
                    .toLocaleTimeString()
                }
              </p>

            </div>


          ))}

          {queueState.completed.map((task) => (

            <div
              key={`completed-${task.task_id}`}
              style={{
                marginBottom: "12px",
                padding: "10px",
                border: "1px solid #333",
                borderRadius: "8px"
              }}
            >

              <p>🆔 {task.task_id}</p>

              <p>📄 {task.title}</p>

              <p>📌 {task.status}</p>

              <p>
                🕒 {
                  new Date(task.created_at)
                    .toLocaleTimeString()
                }
              </p>

            </div>

          ))}

            {queueState.failed.map((task) => (

              <div
                key={`failed-${task.task_id}`}
                style={{
                  marginBottom: "12px",
                  padding: "10px",
                  border: "1px solid #333",
                  borderRadius: "8px"
                }}
              >

                <p>🆔 {task.task_id}</p>

                <p>📄 {task.title}</p>

                <p>📌 {task.status}</p>

                <p>
                  🕒 {
                    new Date(task.created_at)
                      .toLocaleTimeString()
                  }
                </p>
              </div>

            ))}

      </div>

    </div>
  )
}

