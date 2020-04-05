import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import {
  setAssetsGeoJson,
  setMapViewState,
} from '../actions'
import {
  MINIMUM_ASSET_ID_LENGTH,
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_LINE,
} from '../constants'
import {
  getRandomId,
} from '../macros'
import {
  getAssetTypeCode,
} from '../routines'

export function useMovableMap() {
  const dispatch = useDispatch()
  return useMemo(() => ({
    handleMapMove({viewState}) {
      // Update the map viewport
      dispatch(setMapViewState(viewState))
    },
  }), [dispatch])
}

export function useEditableMap(
  sketchMode,
  mapEditState,
  setSelectedAssetIndexes,
) {
  const dispatch = useDispatch()

  function processMapEdit(mapEditState) {
    console.log('process map edit')

    const { editType, updatedData } = mapEditState
    // If we have a new feature,
    if (editType === 'addFeature') {
      const { editContext } = mapEditState
      const { featureIndexes } = editContext
      if (sketchMode === SKETCH_MODE_ADD_LINE) {
        // Have subsequent clicks extend the same line
        setSelectedAssetIndexes(featureIndexes)
      }
      // Update feature properties
      const { features } = updatedData
      const { sourceAssetId } = mapEditState
      const sourceAssetTypeCode = getAssetTypeCode(sketchMode)
      for (let i = 0; i < featureIndexes.length; i++) {
        const featureIndex = featureIndexes[i]
        const feature = features[featureIndex]
        const featureProperties = feature.properties
        featureProperties.id = sourceAssetId
        featureProperties.typeCode = sourceAssetTypeCode
      }
      delete mapEditState.editType
    }
    if (updatedData) {
      // Update geojson for assets
      dispatch(setAssetsGeoJson(updatedData))
      delete mapEditState.updatedData
    }
  }

  return useMemo(() => ({
    handleMapKey(event) {
      event.persist()
      console.log('map key', event)
    },
    handleMapClick(info, event) {
      console.log('map click', info, event)
      if (sketchMode.startsWith(SKETCH_MODE_ADD)) {
        // Get or set a new assetId
        if (!mapEditState.sourceAssetId) {
          mapEditState.sourceAssetId = getRandomId(
            MINIMUM_ASSET_ID_LENGTH)
        }
        processMapEdit(mapEditState)
      }
    },
    processMapEdit,
  }), [
    sketchMode,
    mapEditState, processMapEdit,
  ])
}
