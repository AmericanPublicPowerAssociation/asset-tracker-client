import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import {
  EditableGeoJsonLayer,
  ViewMode,
} from 'nebula.gl'
// import { GeoJsonLayer } from '@deck.gl/layers'
import {
  setFocusingBusId,
  setAssetConnection,
  setFocusingAssetId,
} from '../actions'
import {
  ASSET_METER_RADIUS_IN_METERS,
  BUS_RADIUS_IN_METERS,
  LINE_WIDTH_IN_METERS,
  MAP_STYLE_BY_NAME,
  MINIMUM_BUS_ID_LENGTH,
  PICKING_DEPTH,
  PICKING_RADIUS_IN_PIXELS,
  POINT_RADIUS_IN_METERS,
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_EDIT,
} from '../constants'
import {
  useMovableMap,
  usePickableLayer,
  useEditableLayer,
  // useInterpretableLayer,
} from '../hooks'
import {
  getByKey,
  getRandomId,
} from '../macros'
import {
  CustomEditableGeoJsonLayer,
  getMapMode,
  getPickedInfo,
} from '../routines'
import {
  getAssetIdByBusId,
  getAssetTypeByCode,
  getAssetsGeoJson,
  getBusesGeoJson,
  getColors,
  getFocusingAssetId,
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
    assetById,
    sketchMode,
    selectedAssetIndexes,
    lineBusId,
    changeSketchMode,
    setSelectedAssetIndexes,
    setLineBusId,
    selectedBusIndexes,
    setSelectedBusIndexes,
    openDeleteAssetDialog,
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
  const focusingAssetId = useSelector(getFocusingAssetId)
  // const focusingBusId = useSelector(getFocusingBusId)
  //
  const {
    handleMapMove,
  } = useMovableMap()

  const {
    handleLayerSelect,
  } = usePickableLayer(
    sketchMode,
    setSelectedAssetIndexes,
    setSelectedBusIndexes)

  const {
    handleLayerEdit,
  } = useEditableLayer(
    sketchMode,
    assetTypeByCode,
    lineBusId,
    setSelectedBusIndexes,
    changeSketchMode)

  /*
  const {
    // handleLayerInterpret,
  } = useInterpretableLayer()
  */

  const mapLayers = []
  const mapMode = getMapMode(sketchMode)
  const pickingRadius = PICKING_RADIUS_IN_PIXELS
  const pickingDepth = PICKING_DEPTH
  const ASSET_TYPE_METER_CODE = assetTypeByCode['m'] && assetTypeByCode['m'].code

  function handleAssetsGeoJsonInterpret(event) {
    console.log('INTERPRET')

    // Find the vertex that the user is editing
    const info = getPickedInfo(event, {isGuide: true})
    if (!info) {
      return
    }

    // Determine whether the user modified a middle vertex
    const vertexProperties = info.object.properties
    console.log(vertexProperties)
    const vertexIndex = vertexProperties.positionIndexes[0]
    const featureIndex = vertexProperties.featureIndex
    const feature = assetsGeoJson.features[featureIndex]
    const featureVertexCount = feature.geometry.coordinates.length
    const isMiddleVertex = vertexIndex !== 0 &&
      vertexIndex !== featureVertexCount - 1
    if (isMiddleVertex) {
      // Split the line
      console.log('INTERPRET', 'isMiddleVertex', vertexIndex)
      return
    }
    const vertexAssetId = feature.properties.id
    const vertexAsset = assetById[vertexAssetId]
    const vertexAssetConnections = vertexAsset.connections || []
    const connectionByBusId = getByKey(vertexAssetConnections, 'busId')
    const connectionIndex = vertexIndex === 0 ? 0 : 1

    // Find nearest bus
    const screenCoords = event.screenCoords
    const busInfos = deckGL.current.pickMultipleObjects({
      x: screenCoords[0],
      y: screenCoords[1],
      layerIds: [BUSES_GEOJSON_LAYER_ID],
      radius: pickingRadius,
      depth: pickingDepth,
    })

    function getMatchingBusId(isMatchingBusAssetId) {
      for (let i = 0; i < busInfos.length; i++) {
        const busInfo = busInfos[i]
        const busId = busInfo.object.properties.id
        const busAssetId = assetIdByBusId[busId]
        if (isMatchingBusAssetId(busAssetId)) {
          return busId
        }
      }
    }

    function getConnection(busId) {
      return connectionByBusId[busId] || {busId}
    }

    // Find a bus that belongs to another asset
    const theirBusId = getMatchingBusId(
      busAssetId => busAssetId !== vertexAssetId)
    if (theirBusId) {
      console.log('SET CONNECTION TO THEIR BUS', theirBusId)
      const connection = getConnection(theirBusId)
      console.log(vertexAssetId, connectionIndex, connection)
      dispatch(setAssetConnection(vertexAssetId, connectionIndex, connection))
      return
    }

    // Find a bus that belongs to this asset
    const ourBusId = getMatchingBusId(
      busAssetId => busAssetId === vertexAssetId)
    if (ourBusId) {
      console.log('KEEP OUR BUS', ourBusId)
      const connection = getConnection(ourBusId)
      console.log(vertexAssetId, connectionIndex, connection)
      dispatch(setAssetConnection(vertexAssetId, connectionIndex, connection))
      return
    }

    // Make a new bus
    console.log('MAKE A NEW BUS')
    const newBusId = getRandomId(MINIMUM_BUS_ID_LENGTH)
    const connection = getConnection(newBusId)
    console.log(vertexAssetId, connectionIndex, connection)
    dispatch(setAssetConnection(vertexAssetId, connectionIndex, connection))
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
    else {
      if (info.picked) {
        const busIndex = info.index
        setSelectedBusIndexes([busIndex])
        dispatch(setFocusingBusId(busId))
      }
    }

    // busId && dispatch(setFocusingBusId(busId))
    assetId && dispatch(setFocusingAssetId(assetId))
  }

  function handleDoubleClick(e) {
    if (sketchMode === SKETCH_MODE_ADD_LINE) {
      changeSketchMode(SKETCH_MODE_ADD)
    }
  }

  function onKeyUp(e) {
    e.preventDefault()
    if (e.key === 'Enter') {
      if (sketchMode === SKETCH_MODE_ADD_LINE) {
        changeSketchMode(SKETCH_MODE_ADD)
      }
    }
    else if (e.key === 'Delete') {
      if (focusingAssetId &&
          sketchMode.startsWith(SKETCH_MODE_EDIT)
        ) {
        openDeleteAssetDialog()
      }
    }
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
    getRadius: (feature, isSelected) => {
      const assetTypeCode = feature.properties.typeCode
      return assetTypeCode === ASSET_TYPE_METER_CODE ?
        ASSET_METER_RADIUS_IN_METERS :
        POINT_RADIUS_IN_METERS
    },
    getLineWidth: LINE_WIDTH_IN_METERS,
    getFillColor: (feature, isSelected) => {
      return isSelected ? colors.assetSelect : colors.asset
    },
    getLineColor: (feature, isSelected) => {
      return isSelected ? colors.assetSelect : colors.asset
    },
    onSelect: handleLayerSelect,
    onEdit: handleLayerEdit,
    onInterpret: handleAssetsGeoJsonInterpret,
    onDoubleClick: handleDoubleClick,
  }))

  mapLayers.push(new EditableGeoJsonLayer({
    id: BUSES_GEOJSON_LAYER_ID,
    data: busesGeoJson,
    mode: ViewMode,
    pickable: true,
    stroked: false,
    autoHighlight: true,
    highlightColor: colors.busHighlight,
    selectedFeatureIndexes: selectedBusIndexes,
    getRadius: BUS_RADIUS_IN_METERS,
    getFillColor: (feature, isSelected) => {
      return isSelected ? colors.busSelect : colors.bus
    },
    onClick: handleBusesGeoJsonClick,
  }))

  return (
    <div onKeyUp={onKeyUp}>
      <DeckGL
        ref={deckGL}
        controller={{ doubleClickZoom: false }}
        layers={mapLayers}
        viewState={mapViewState}
        pickingRadius={pickingRadius}
        pickingDepth={pickingDepth}
        onViewStateChange={handleMapMove}
      >
        <StaticMap
          mapStyle={MAP_STYLE_BY_NAME[mapStyleName]}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        />
      </DeckGL>
    </div>
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
