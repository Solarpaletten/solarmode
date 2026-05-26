import {
    mergeRuntime
} from "../../api/runtimeApi"

import {
  RUNTIME_ACTIONS
} from "../../store/runtime/runtimeActions"

export default async function mergeRuntimeAction(dispatch) {

    try {

        const response =
            await mergeRuntime()

        dispatch({
            type: RUNTIME_ACTIONS.MERGE,
            payload: response
        })

        console.log(
            "MERGE RESPONSE:",
            response
        )

    } catch (error) {

        console.error(
            "MERGE FAILED:",
            error
        )

    }

}