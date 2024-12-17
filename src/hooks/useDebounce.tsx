import { useEffect, useState } from 'react'

export const useDebounce = (inputValue: string, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(inputValue)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [inputValue, delay])

  return debouncedValue
}
