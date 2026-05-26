import { useEffect } from "react"

import {
  RUNTIME_ACTIONS
} from "../../store/runtime/runtimeActions"

import {
  fetchQueue,
  fetchLogs,
  fetchRuntimeStatus,
  fetchAgents
} from "../../api/runtimeApi"

export default function useRuntimeSync({
  dispatch
}) {

  useEffect(() => {

    const runtimeSync = () => {

      fetchQueue().then((data) => {
        dispatch({
          type: RUNTIME_ACTIONS.SET_QUEUE,
          payload: data
        })
      })

      fetchLogs().then((data) => {
        dispatch({
          type: RUNTIME_ACTIONS.SET_LOGS,
          payload: data
        })
      })

      fetchRuntimeStatus().then((data) => {

        dispatch({
          type: RUNTIME_ACTIONS.SET_RUNTIME_STATUS,
          payload: data
        })

        fetchAgents().then((data) => {

          dispatch({
            type: RUNTIME_ACTIONS.SET_AGENTS,
            payload: data
          })

        })

        dispatch({
          type: RUNTIME_ACTIONS.SET_HEALTH,
          payload: data.health || null
        })

      })

    }

    runtimeSync()

    const interval =
      setInterval(runtimeSync, 3000)

    return () => {
      clearInterval(interval)
    }


  }, [])

}
