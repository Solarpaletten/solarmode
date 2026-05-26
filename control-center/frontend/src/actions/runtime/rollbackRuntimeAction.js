import {
  rollbackRuntime
} from "../../api/runtimeApi"

import {
  RUNTIME_ACTIONS
} from "../../store/runtime/runtimeActions"

export default async function rollbackRuntimeAction(dispatch) {

  try {

    const response =
      await rollbackRuntime()
    
    dispatch({
  type: RUNTIME_ACTIONS.ROLLBACK,
  payload: response
})

    console.log(
      "ROLLBACK RESPONSE:",
      response
    )

  } catch(error) {

    console.error(
      "ROLLBACK FAILED:",
      error
    )

  }

}