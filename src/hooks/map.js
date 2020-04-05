import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import {
  setMapViewState,
} from '../actions'

export function useMovableMap() {
  const dispatch = useDispatch()
  return useMemo(() => ({
    handleMapMove({viewState}) {
      // Update the map viewport
      dispatch(setMapViewState(viewState))
    },
  }), [dispatch])
}

export function useEditableMap() {
  return useMemo(() => ({
    handleMapKey(event) {
      event.persist()
      console.log('map key', event)
    },
    handleMapClick(info, event) {
      console.log('map click', info, event)
    },
  }), [])
}
