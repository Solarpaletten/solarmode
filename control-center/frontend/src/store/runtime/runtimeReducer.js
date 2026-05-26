import {
    RUNTIME_ACTIONS
} from "./runtimeActions"

export default function runtimeReducer(
    state,
    action
) {

    switch (action.type) {


        case RUNTIME_ACTIONS.SET_QUEUE:

            return {
                ...state,
                queueState: action.payload
            }

        case RUNTIME_ACTIONS.SET_LOGS:

            return {
                ...state,
                logs: action.payload
            }

        case RUNTIME_ACTIONS.SET_RUNTIME_STATUS:

            return {
                ...state,
                runtimeStatus: action.payload
            }

        case RUNTIME_ACTIONS.SET_HEALTH:

            return {
                ...state,
                health: action.payload
            }

        case RUNTIME_ACTIONS.MERGE:

            return {
                ...state,

                logs: [
                    ...state.logs,

                    {
                        id: crypto.randomUUID(),
                        type: "MERGE_COMPLETED",
                        message: "MERGE COMPLETED",
                        timestamp: Date.now()
                    }


                ]
            }

        case RUNTIME_ACTIONS.ROLLBACK:

            return {
                ...state,

                logs: [
                    ...state.logs,
                    {
                        id: crypto.randomUUID(),
                        type: "ROLLBACK_COMPLETED",
                        message: "ROLLBACK COMPLETED",
                        timestamp: Date.now()
                    }
                ]
            }
        case RUNTIME_ACTIONS.CREATE_TASK:

            return {
                ...state,

                queueState: {
                    ...state.queueState,

                    pending: [
                        ...state.queueState.pending,
                        action.payload.task
                    ]
                },

                logs: [
                    ...state.logs,
                    {
                        id: crypto.randomUUID(),
                        type: "TASK_CREATED",
                        message: "TASK CREATED",
                        timestamp: Date.now()
                    }
                ]
            }

        case RUNTIME_ACTIONS.SET_AGENTS:

            return {
                ...state,
                agents: action.payload
            }

        default:
            return state

    }

}