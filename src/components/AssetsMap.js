import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  ModifyMode,
  EditableGeoJsonLayer,
  TranslateMode,
  ViewMode,
} from 'nebula.gl'
import {
  addToAssetById,
  setSelectedFeatureIndexes,
  setFocusingAssetId,
  setMapViewState,
  setAssetsGeojson,
  setSketchAssetType,
} from '../actions'
import {
  ADD_LINE,
  ADD_TRANSFORMER,
  ADD_SUBSTATION,
  ADD_METER,
  BUS_RADIUS_IN_METERS,
  LINE_WIDTH_IN_METERS,
  MAP_STYLE_BY_NAME,
  PICKING_RADIUS_IN_PIXELS,
  POINT_RADIUS_IN_METERS,
  LINE_ASSET_TYPE_ID,
  TRANSFORMER_ASSET_TYPE_ID,
  SUBSTATION_ASSET_TYPE_ID,
  METER_ASSET_TYPE_ID,
  SELECT_GEOMETRY,
  EDIT_TRANSLATE,
  EDIT_MODIFY,
} from '../constants'
import {
  getAssetsGeoJson,
  getBusesGeoJson,
  getColors,
  getMapStyleName,
  getMapViewState,
  getSelectedFeatureIndexes,
} from '../selectors'

const {
  REACT_APP_MAPBOX_TOKEN,
} = process.env

const ASSETS_MAP_LAYER_ID = 'assets-geojson-layer'
const BUSES_MAP_LAYER_ID = 'buses-geojson-layer'

export default function AssetsMap(props) {
  const {
    sketchMode,
  } = props
  const dispatch = useDispatch()
  const mapStyleName = useSelector(getMapStyleName)
  const mapViewState = useSelector(getMapViewState)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const colors = useSelector(getColors)

  const mapLayers = []

  const selectedFeatureIndexes = useSelector(getSelectedFeatureIndexes)
  mapLayers.push(getAssetsMapLayer(
    dispatch, sketchMode, assetsGeoJson, selectedFeatureIndexes, colors))
  mapLayers.push(getBusesMapLayer(busesGeoJson, colors))

  function handleViewStateChange({viewState}) {
    dispatch(setMapViewState(viewState))
  }

  function handleClick(info, event) {
    if (!info.picked ||
        sketchMode === ADD_LINE ||
        sketchMode === ADD_TRANSFORMER ||
        sketchMode === ADD_SUBSTATION ||
        sketchMode === ADD_METER)
        return

    if (sketchMode === 'view' ||
        sketchMode === SELECT_GEOMETRY ||
        sketchMode === EDIT_TRANSLATE ||
        sketchMode === EDIT_MODIFY) {
      dispatch(setSelectedFeatureIndexes([info.index]))
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
    <div>
      <DeckGL
        controller={true}
        pickingRadius={PICKING_RADIUS_IN_PIXELS}
        layers={mapLayers}
        viewState={mapViewState}
        onViewStateChange={handleViewStateChange}
        onClick={handleClick}
      >
        <StaticMap
          key='static-map'
          mapStyle={MAP_STYLE_BY_NAME[mapStyleName]}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        />
      </DeckGL>
    </div>
  )
}

function getAssetsMapLayer(dispatch, sketchMode, assetsGeoJson, selectedFeatureIndexes, colors) {
  let currentMode = ViewMode
  let type = null
  if (sketchMode === ADD_LINE) {
    currentMode = DrawLineStringMode
    type = LINE_ASSET_TYPE_ID
  }
  else if (sketchMode === ADD_TRANSFORMER) {
    currentMode = DrawPointMode
    type = TRANSFORMER_ASSET_TYPE_ID
  }
  else if (sketchMode === ADD_SUBSTATION) {
    currentMode = DrawPolygonMode
    type = SUBSTATION_ASSET_TYPE_ID
  }
  else if (sketchMode === ADD_METER){
    currentMode = DrawPointMode
    type = METER_ASSET_TYPE_ID
  }
  else if (sketchMode === EDIT_MODIFY) {
    currentMode = ModifyMode
  }
  else if (sketchMode === EDIT_TRANSLATE) {
    currentMode = TranslateMode
  }
  dispatch(setSketchAssetType(type))

  return new EditableGeoJsonLayer({
    id: ASSETS_MAP_LAYER_ID,
    data: assetsGeoJson,
    pickable: true,
    stroked: false,
    selectedFeatureIndexes,
    mode: currentMode,
    onEdit: function({editType, editContext, updatedData}) {
      console.log(editType, editContext, updatedData)
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
    },
    getRadius: POINT_RADIUS_IN_METERS,
    getLineWidth: LINE_WIDTH_IN_METERS,
    getFillColor: (feature, isSelected) => {
      if (isSelected)
        return colors.isSelectedFill
      else
        return colors.asset
    },
    getLineColor: (feature, isSelected) => {
      if(isSelected)
        return colors.isSelectedLine
      else
        return colors.asset
    },
  })
}

function getBusesMapLayer(busesGeoJson, colors) {
  const color = colors.bus
  return new GeoJsonLayer({
    id: BUSES_MAP_LAYER_ID,
    data: busesGeoJson,
    pickable: true,
    stroked: false,
    getRadius: BUS_RADIUS_IN_METERS,
    getFillColor: color,
  })
}
