import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import {
  deleteAsset,
  setFocusingAssetId,
  setFocusingBusId,
} from '../actions'
import {
  SKETCH_MODE_DELETE,
} from '../constants'
import {
  getPickedInfo,
} from '../routines'

export function usePickableLayer(
  sketchMode,
  setSelectedAssetIndexes,
  setSelectedBusIndexes,
) {
  const dispatch = useDispatch()
  return useMemo(() => ({
    handleSelect(event) {
      const info = getPickedInfo(event, {})
      let assetId = info && info.object.properties.id
      if (!assetId) {
        return
      }
      let selectedAssetIndexes = [info.index]
      if (sketchMode === SKETCH_MODE_DELETE) {
        dispatch(deleteAsset(assetId))
        selectedAssetIndexes = []
        assetId = null
      }
      // Update selection in map
      setSelectedAssetIndexes(selectedAssetIndexes)
      setSelectedBusIndexes([])
      // Update focus in detail
      dispatch(setFocusingAssetId(assetId))
      dispatch(setFocusingBusId(null))
    },
  }), [
    dispatch,
    sketchMode,
    setSelectedAssetIndexes,
    setSelectedBusIndexes,
  ])
}

export function useEditableLayer() {
}

export function useInterpretableLayer() {
}
