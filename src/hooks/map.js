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
  SKETCH_MODE_ADD_METER,
  SKETCH_MODE_ADD_SUBSTATION,
  SKETCH_MODE_ADD_TRANSFORMER,
} from '../constants'
import {
  getRandomId,
} from '../macros'

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
) {
  const dispatch = useDispatch()
  return useMemo(() => ({
    handleMapKey(event) {
      event.persist()
      console.log('map key', event)
    },
    handleMapClick(info, event) {
      console.log('map click', info, event)
      if (sketchMode.startsWith(SKETCH_MODE_ADD)) {
        // Get or set a new assetId
        let { sourceAssetId } = mapEditState
        if (!sourceAssetId) {
          sourceAssetId = mapEditState.sourceAssetId = getRandomId(
            MINIMUM_ASSET_ID_LENGTH)
        }

        switch (sketchMode) {
          case SKETCH_MODE_ADD_LINE: {
            break
          }
          case SKETCH_MODE_ADD_METER: {
            break
          }
          case SKETCH_MODE_ADD_TRANSFORMER: {
            break
          }
          case SKETCH_MODE_ADD_SUBSTATION: {
            break
          }
          default: {
          }
        }

        const { editType } = mapEditState
        if (editType === 'addFeature') {
          delete mapEditState.editType
          // Update geojson for assets
          const { editContext, updatedData } = mapEditState
          dispatch(setAssetsGeoJson(updatedData))
          console.log('addFeature', editContext)
        }
      }
    },
  }), [dispatch, sketchMode, mapEditState])
}
