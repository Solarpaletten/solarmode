import { useReducer } from "react"

import runtimeReducer
  from "../../store/runtime/runtimeReducer"

import {
  RuntimeContext
} from "../../context/RuntimeContext"

import useRuntimeSync
  from "./useRuntimeSync"

export default function RuntimeProvider({
  children
}) {

  const initialState = {

    runtimeStatus: null,

    health: null,

    queueState: {

      pending: [
        {
          id: "TASK-001",
          title: "Pending Runtime Task",
          status: "pending",
          createdAt: Date.now()
        }
      ],

      running: [
        {
          id: "TASK-002",
          title: "Running Runtime Task",
          status: "running",
          createdAt: Date.now()
        }
      ],

      completed: [
        {
          id: "TASK-003",
          title: "Completed Runtime Task",
          status: "completed",
          createdAt: Date.now()
        }
      ],

      failed: [
        {
          id: "TASK-004",
          title: "Failed Runtime Task",
          status: "failed",
          createdAt: Date.now()
        }
      ]

    },

    agents: [],

    logs: []

  }

  const [state, dispatch] =
    useReducer(
      runtimeReducer,
      initialState
    )

  useRuntimeSync({
    dispatch
  })


  return (

    <RuntimeContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </RuntimeContext.Provider>

  )
}
