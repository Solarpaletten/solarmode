export default function RuntimeLayout({
  left,
  center,
  right,
  bottom
}) {

  return (

    <div style={{
      display: "grid",
      gridTemplateColumns: "260px 1fr 320px",
      gridTemplateRows: "1fr 220px",
      height: "100vh",
      background: "#020617",
      color: "#e2e8f0",
      overflow: "hidden"
    }}>

      <aside style={{
        borderRight: "1px solid #1e293b",
        padding: "20px",
        overflowY: "auto"
      }}>
        {left}
      </aside>

      <main style={{
        padding: "20px",
        overflowY: "auto"
      }}>
        {center}
      </main>

      <aside style={{
        borderLeft: "1px solid #1e293b",
        padding: "20px",
        overflowY: "auto"
      }}>
        {right}
      </aside>

      <footer style={{
        gridColumn: "1 / span 3",
        borderTop: "1px solid #1e293b",
        padding: "15px",
        overflowY: "auto",
        background: "#0f172a"
      }}>
        {bottom}
      </footer>

    </div>
  )
}
