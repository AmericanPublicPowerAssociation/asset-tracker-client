import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import {
  deleteAsset,
  setAsset,
  setAssetsGeoJson,
  setFocusingAssetId,
  setFocusingBusId,
} from '../actions'
import {
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_DELETE,
} from '../constants'
import {
  getAssetTypeCode,
  getPickedInfo,
  makeAsset,
} from '../routines'

export function usePickableLayer(
  sketchMode,
  setSelectedAssetIndexes,
  setSelectedBusIndexes,
) {
  const dispatch = useDispatch()
  return useMemo(() => ({
    handleLayerSelect(event) {
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

export function useEditableLayer(
  sketchMode,
  assetTypeByCode,
  lineBusId,
  setSelectedAssetIndexes,
  changeSketchMode,
) {
  const dispatch = useDispatch()
  return useMemo(() => ({
    handleLayerEdit({editType, editContext, updatedData}) {
      switch(editType) {
        // If a feature is being added for the first time,
        case 'addFeature': {
          const features = updatedData.features
          const { featureIndexes } = editContext
          // Add an asset corresponding to the feature
          const assetTypeCode = getAssetTypeCode(sketchMode)
          const assetType = assetTypeByCode[assetTypeCode]
          const asset = makeAsset(assetType, lineBusId)
          dispatch(setAsset(asset))
          // Store assetId in feature
          const assetId = asset.id
          for (let i = 0; i < featureIndexes.length; i++) {
            const featureIndex = featureIndexes[i]
            const feature = features[featureIndex]
            feature.properties.id = assetId
            feature.properties.typeCode = assetTypeCode
          }
          // If the new feature is a line,
          if (sketchMode === SKETCH_MODE_ADD_LINE) {
            // Have subsequent clicks extend the same line
            setSelectedAssetIndexes(featureIndexes)
          } else {
            changeSketchMode(SKETCH_MODE_ADD)
          }
          // Show details for the new asset
          dispatch(setFocusingAssetId(assetId))
          break
        }
        default: {}
      }
      // Update geojson for assets
      dispatch(setAssetsGeoJson(updatedData))
    },
  }), [
    dispatch,
    sketchMode,
    assetTypeByCode,
    lineBusId,
    setSelectedAssetIndexes,
    changeSketchMode,
  ])
}

export function useInterpretableLayer() {
  /*
  const dispatch = useDispatch()
  return useMemo(() => ({
  }), [
  ])
  */
}
