export default function RuntimeIncidentsPanel() {

  const incidents = [
    "REPLAY MISMATCH",
    "TASK FAILED",
    "BLOCKED OPERATION"
  ]

  return (

    <div
      style={{
        marginTop: "20px"
      }}
    >

      <h2>Runtime Incidents</h2>

      {incidents.map((incident, index) => (

        <div
          key={index}
          style={{
            marginTop: "10px",
            padding: "10px",
            borderRadius: "8px",
            background: "#3f1d1d",
            color: "#fecaca"
          }}
        >
          🚨 {incident}
        </div>

      ))}

    </div>
  )
}
