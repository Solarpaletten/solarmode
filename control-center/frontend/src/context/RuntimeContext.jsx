import {
  createContext,
  useContext
} from "react"

export const RuntimeContext =
  createContext(null)

export function useRuntime() {

  return useContext(
    RuntimeContext
  )
}
