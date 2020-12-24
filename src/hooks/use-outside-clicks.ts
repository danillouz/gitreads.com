import { useRef, useEffect } from "react"

type ClickCallback = () => void

// Custom hook to register outside clicks in a container
function useOutsideClicks(onOutsideClick: ClickCallback) {
  const el = useRef<HTMLInputElement>(null)

  const handleOutsideClicks = (e) => {
    const isInside = el?.current.contains(e.target)
    if (isInside) {
      return
    }

    onOutsideClick()
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClicks)

    return function cleanup() {
      document.removeEventListener("mousedown", handleOutsideClicks)
    }
  }, [])

  return [el]
}

export default useOutsideClicks
