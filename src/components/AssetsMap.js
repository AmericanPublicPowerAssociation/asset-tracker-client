import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import {
  // setFocusingBusId,
  setAsset,
  setAssetsGeoJson,
  setFocusingAssetId,
  setMapViewState,
} from '../actions'
import {
  BUS_RADIUS_IN_METERS,
  LINE_WIDTH_IN_METERS,
  MAP_STYLE_BY_NAME,
  PICKING_DEPTH,
  PICKING_RADIUS_IN_PIXELS,
  POINT_RADIUS_IN_METERS,
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_LINE,
} from '../constants'
import {
  CustomEditableGeoJsonLayer,
  getAssetTypeCode,
  getMapMode,
  makeAsset,
} from '../routines'
import {
  getAssetTypeByCode,
  getAssetIdByBusId,
  getAssetsGeoJson,
  getBusesGeoJson,
  getColors,
  // getFocusingAssetId,
  // getFocusingBusId,
  getMapStyleName,
  getMapViewState,
} from '../selectors'

const {
  REACT_APP_MAPBOX_TOKEN,
} = process.env

const ASSETS_GEOJSON_LAYER_ID = 'assets-geojson-layer'
const BUSES_GEOJSON_LAYER_ID = 'buses-geojson-layer'

export default function AssetsMap(props) {
  const {
    sketchMode,
    selectedAssetIndexes,
    lineBusId,
    changeSketchMode,
    setSelectedAssetIndexes,
    setLineBusId,
  } = props
  const dispatch = useDispatch()
  const deckGL = useRef()
  const mapStyleName = useSelector(getMapStyleName)
  const mapViewState = useSelector(getMapViewState)
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetIdByBusId = useSelector(getAssetIdByBusId)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const colors = useSelector(getColors)
  // const focusingAssetId = useSelector(getFocusingAssetId)
  // const focusingBusId = useSelector(getFocusingBusId)
  const mapLayers = []
  const mapMode = getMapMode(sketchMode)
  const pickingRadius = PICKING_RADIUS_IN_PIXELS
  const pickingDepth = PICKING_DEPTH

  function handleViewStateChange({viewState}) {
    // Update the map viewport
    dispatch(setMapViewState(viewState))
  }

  function handleAssetsGeoJsonClick(info, event) {
    const assetId = info.object.properties.id
    assetId && dispatch(setFocusingAssetId(assetId))
    if (sketchMode.startsWith(SKETCH_MODE_ADD) || info.isGuide) return
    const featureIndex = info.index
    setSelectedAssetIndexes([featureIndex])
  }

  function handleAssetsGeoJsonEdit({editType, editContext, updatedData}) {
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
        }
        // If the new feature is a line,
        if (sketchMode === SKETCH_MODE_ADD_LINE) {
          // Have subsequent clicks extend the same line
          setSelectedAssetIndexes(featureIndexes)
        } else {
          changeSketchMode(SKETCH_MODE_ADD)
        }
        dispatch(setFocusingAssetId(assetId))  // Show details for the new asset
        break
      }
      case 'movePosition': {
        console.log('movePosition', editContext.position)
        break
      }
      case 'finishMovePosition': {
        console.log('finishMovePosition', editContext.position)
        break
      }
      default: {}
    }
    dispatch(setAssetsGeoJson(updatedData))  // Update geojson for assets
  }

  function handleAssetsGeoJsonInterpret(event) {
    const screenCoords = event.screenCoords
    const pickingInfo = deckGL.current.pickObject({
      x: screenCoords[0],
      y: screenCoords[1],
      layerIds: [BUSES_GEOJSON_LAYER_ID],
      radius: pickingRadius,
      depth: pickingDepth,
    })

    console.log('pickingInfo', pickingInfo)
  }

  function handleBusesGeoJsonClick(info, event) {
    const busId = info.object.properties.id
    const assetId = assetIdByBusId[busId]

    if (sketchMode === SKETCH_MODE_ADD_LINE) {
      setLineBusId(busId)
      // If we already started a line,
      if (selectedAssetIndexes.length) {
        // End the line
        changeSketchMode(SKETCH_MODE_ADD, busId)
      }
    }

    // busId && dispatch(setFocusingBusId(busId))
    assetId && dispatch(setFocusingAssetId(assetId))
  }

  mapLayers.push(new CustomEditableGeoJsonLayer({
    id: ASSETS_GEOJSON_LAYER_ID,
    data: assetsGeoJson,
    mode: mapMode,
    pickable: true,
    stroked: false,
    autoHighlight: sketchMode !== SKETCH_MODE_ADD_LINE,
    highlightColor: colors.assetHighlight,
    selectedFeatureIndexes: selectedAssetIndexes,
    getRadius: POINT_RADIUS_IN_METERS,
    getLineWidth: LINE_WIDTH_IN_METERS,
    getFillColor: (feature, isSelected) => {
      return isSelected ? colors.assetSelect : colors.asset
    },
    getLineColor: (feature, isSelected) => {
      return isSelected ? colors.assetSelect : colors.asset
    },
    onClick: handleAssetsGeoJsonClick,
    onEdit: handleAssetsGeoJsonEdit,
    onInterpret: handleAssetsGeoJsonInterpret,
  }))

  mapLayers.push(new GeoJsonLayer({
    id: BUSES_GEOJSON_LAYER_ID,
    data: busesGeoJson,
    pickable: true,
    stroked: false,
    autoHighlight: true,
    highlightColor: colors.busHighlight,
    getRadius: BUS_RADIUS_IN_METERS,
    getFillColor: colors.bus,
    onClick: handleBusesGeoJsonClick,
  }))

  return (
    <DeckGL
      ref={deckGL}
      controller={true}
      layers={mapLayers}
      viewState={mapViewState}
      pickingRadius={pickingRadius}
      pickingDepth={pickingDepth}
      onViewStateChange={handleViewStateChange}
      // onHover={(e, i) => console.log(e, i)}
      // onClick={(e, i) => console.log(e, i)}
    >
      <StaticMap
        mapStyle={MAP_STYLE_BY_NAME[mapStyleName]}
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
      />
    </DeckGL>
  )
}

/*
*    and we clicked on a bus
*       add a connection to that bus
*        show snackbar
*    and we did not click on a bus
*       add a connection to a new bus
* if we are ending the line
*    and we clicked on a bus
*       add a connection to that bus
*       end the connection
*        clear selected asset indexes
*        show snackbar
*/
