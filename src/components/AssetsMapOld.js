import {
  TranslateMode,
} from 'nebula.gl'
import {
  addToAssetById,
  setSelectedFeatureIndexes,
  setFocusingAssetId,
  setSketchAssetType,
} from '../actions'
import {
  BUS_RADIUS_IN_METERS,
  MAP_STYLE_BY_NAME,
  PICKING_RADIUS_IN_PIXELS,
  LINE_ASSET_TYPE_ID,
  TRANSFORMER_ASSET_TYPE_ID,
  SUBSTATION_ASSET_TYPE_ID,
} from '../constants'
import {
  getBusesGeoJson,
  getColors,
  getMapStyleName,
  getSelectedFeatureIndexes,
} from '../selectors'

export default function AssetsMap(props) {

  mapLayers.push(new EditableGeoJsonLayer({
    onEdit: function({editType, editContext, updatedData}) {
      const { featureIndexes } = editContext
      if (editType === 'addFeature') {
        setSelectedFeatureIndexes(featureIndexes)
      }
      setGeoJson(updatedData)
      // dispatch(setAssetsGeojson(updatedData))
    },
  }))

  function handleClick(info, event) {
    if (!info.picked) {
      return
    }

    const mapLayerId = info.layer.id
    const objectId = info.object.properties.id
    let assetId = null

    switch(mapLayerId) {
      case ASSETS_MAP_LAYER_ID: {
        assetId = objectId
        console.log('clicked assetId =', assetId)
        break
      }
      case BUSES_MAP_LAYER_ID: {
        const busId = objectId
        console.log('clicked busId =', busId)
        break
      }
      default: {
      }
    }

    dispatch(setFocusingAssetId(assetId))
  }

  return (
    <DeckGL
      pickingRadius={PICKING_RADIUS_IN_PIXELS}
      // onClick={handleClick}
    >
    </DeckGL>
  )
}

    onEdit: function({editType, editContext, updatedData}) {
      const { featureIndexes } = editContext
      if (editType === 'addFeature') {
        if (type === LINE_ASSET_TYPE_ID) {
          dispatch(setSelectedFeatureIndexes(featureIndexes))
        }
        const _id = Date.now().toString()
        const name = `${type} ${_id}`
        featureIndexes.forEach( index => {
          const p = updatedData.features[index].properties
          p['id'] = _id
          p['type'] = currentMode
        })
        dispatch(addToAssetById({type, name, _id}))
        dispatch(setFocusingAssetId(_id))
      }
      dispatch(setAssetsGeojson(updatedData))
