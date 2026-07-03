import { useState, useEffect } from 'react'

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    // Deferred sync avoids SSR/client hydration mismatch for persisted store state.
    // Wrapped in a thunk so a function-typed `result` isn't mistaken for a state updater.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(() => result)
  }, [result])

  return data
}

export default useStore
