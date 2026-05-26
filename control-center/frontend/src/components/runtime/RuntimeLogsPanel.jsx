import { useRuntime }
  from "../../context/RuntimeContext"

export default function RuntimeLogsPanel() {

  const { logs } =
    useRuntime()

  return (

    <div
      style={{
        maxHeight: "180px",
        overflowY: "scroll"
      }}
    >

      <h2>Runtime Logs</h2>

      {logs.map((log, index) => {

  if (typeof log === "string") {

    return (
      <div key={index}>
        📄 {log}
      </div>
    )
  }

  return (
    <div
      key={log.id}
      style={{
        marginBottom: "6px"
      }}
    >
      🕒 {
        new Date(log.timestamp)
          .toLocaleTimeString()
      }

      {" — "}

      📄 {log.message}
    </div>
  )

      })}

    </div>
  )
}