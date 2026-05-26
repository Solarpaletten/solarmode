import createTaskAction
  from "../../actions/runtime/createTaskAction"

import mergeRuntimeAction
  from "../../actions/runtime/mergeRuntimeAction"

import rollbackRuntimeAction
  from "../../actions/runtime/rollbackRuntimeAction"

import { useRuntime }
  from "../../context/RuntimeContext"



export default function RuntimeControlsPanel() {
  const { dispatch } =
    useRuntime()
  return (

    <div
      style={{
        marginBottom: "20px"
      }}
    >

      <h2>Runtime Controls</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px"
        }}
      >

        <button
          onClick={() =>
            createTaskAction(dispatch)
          }
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer"
          }}
        >
          ➕ CREATE TASK
        </button>




        <button
          onClick={() =>
            mergeRuntimeAction(dispatch)
          }
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            background: "#16a34a",
            color: "white",
            cursor: "pointer"
          }}
        >
          ✅ MERGE
        </button>


        <button
          onClick={() =>
            rollbackRuntimeAction(dispatch)
          }
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            background: "#dc2626",
            color: "white",
            cursor: "pointer"
          }}
        >
          🔄 ROLLBACK
        </button>

      </div>

    </div>
  )
}
