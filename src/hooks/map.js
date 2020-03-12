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
