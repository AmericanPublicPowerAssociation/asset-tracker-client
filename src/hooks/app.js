import { useEffect } from 'react'

export function useStickyWindow(isSticky) {
  useEffect(function () {
    if (!isSticky) return

    function handleBeforeUnload(event) {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return function tearDown() {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isSticky])
}
