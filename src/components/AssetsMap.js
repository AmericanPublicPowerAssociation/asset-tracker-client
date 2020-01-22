import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
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
} from '../actions'
import {
  ADD_LINE,
  ADD_TRANSFORMER,
  ADD_SUBSTATION,
  BUS_RADIUS_IN_METERS,
  LINE_WIDTH_IN_METERS,
  MAP_STYLE_BY_NAME,
  PICKING_RADIUS_IN_PIXELS,
  POINT_RADIUS_IN_METERS,
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
  // const assetsGeoJson = useSelector(getAssetsGeoJson)
  // const busesGeoJson = useSelector(getBusesGeoJson)
  const colors = useSelector(getColors)

  const [geoJson, setGeoJson] = useState({type: 'FeatureCollection', features: []})
  const [selectedFeatureIndexes, setSelectedFeatureIndexes] = useState([])
  console.log(selectedFeatureIndexes)

  const mapLayers = []
  mapLayers.push(new EditableGeoJsonLayer({
    id: 'x',
    data: geoJson,
    mode: DrawLineStringMode,
    selectedFeatureIndexes,
    onEdit: function({editType, editContext, updatedData}) {
      const { featureIndexes } = editContext
      console.log(editType, featureIndexes)
      if (editType === 'addFeature') {
        setSelectedFeatureIndexes(featureIndexes)
      }
      setGeoJson(updatedData)
      // dispatch(setAssetsGeojson(updatedData))
    },
  }))

  /*
  const selectedFeatureIndexes = useSelector(getSelectedFeatureIndexes)
  mapLayers.push(getAssetsMapLayer(
    dispatch, sketchMode, assetsGeoJson, selectedFeatureIndexes, colors))
  mapLayers.push(getBusesMapLayer(busesGeoJson, colors))
  */

  function handleViewStateChange({viewState}) {
    dispatch(setMapViewState(viewState))
  }

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
    <div>
      <DeckGL
        controller={true}
        pickingRadius={PICKING_RADIUS_IN_PIXELS}
        layers={mapLayers}
        viewState={mapViewState}
        onViewStateChange={handleViewStateChange}
        // onClick={handleClick}
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
  const color = colors.asset

  let currentMode = ViewMode
  let type
  if (sketchMode === ADD_LINE) {
    currentMode = DrawLineStringMode
    type = 'line'
  }
  else if (sketchMode === ADD_TRANSFORMER) {
    currentMode = DrawPointMode
    type = 'transformer'
  }
  else if (sketchMode === ADD_SUBSTATION) {
    currentMode = DrawPolygonMode
    type = 'substation'
  }

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
        if (type === 'line') {
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
    getFillColor: () => color,
    getLineColor: () => color,
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
