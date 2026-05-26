import {
    createTask
} from "../../api/runtimeApi"

import {
    RUNTIME_ACTIONS
} from "../../store/runtime/runtimeActions"

export default async function createTaskAction(dispatch) {

    try {

        const response =
            await createTask({
                title: "Frontend Runtime Task",
                owner: "Dashka",
                actions: [
                    "pwd",
                    "ls"
                ]
            })

        dispatch({
            type: RUNTIME_ACTIONS.CREATE_TASK,
            payload: response
        })

        console.log(
            "TASK CREATED:",
            response
        )

    } catch (error) {

        console.error(
            "CREATE TASK FAILED:",
            error
        )

    }

}
