import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
<<<<<<< HEAD
import {
=======
import { EditableGeoJsonLayer } from 'nebula.gl'
// import { GeoJsonLayer } from '@deck.gl/layers'
import { Feature, LineString, Coord, point } from '@turf/helpers'
import lineSlice  from '@turf/line-slice'
import {
  setFocusingBusId,
  deleteAsset,
  setAsset,
  setAssetConnection,
  setAssetsGeoJson,
  setFocusingAssetId,
  setMapViewState, setAssetAttribute,
} from '../actions'
import {
  ASSET_METER_RADIUS_IN_METERS,
  BUS_RADIUS_IN_METERS,
  LINE_WIDTH_IN_METERS,
  MAP_STYLE_BY_NAME,
  MINIMUM_BUS_ID_LENGTH,
  PICKING_DEPTH,
>>>>>>> feature/split-line
  PICKING_RADIUS_IN_PIXELS,
  PICKING_DEPTH,
} from '../constants'
import {
  useEditableMap,
  useMovableMap,
} from '../hooks'
import {
  getAssetTypeByCode,
  getAssetsGeoJson,
  getBusesGeoJson,
  getColors,
  getMapStyle,
  getMapViewState,
} from '../selectors'

const {
  REACT_APP_MAPBOX_TOKEN,
} = process.env

export default function AssetsMap({
  sketchMode, changeSketchMode,
  selectedAssetIndexes, setSelectedAssetIndexes,
  selectedBusIndexes,
}) {
  const deckGL = useRef()
  const mapStyle = useSelector(getMapStyle)
  const mapViewState = useSelector(getMapViewState)
  const mapEditState = {}
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const colors = useSelector(getColors)
<<<<<<< HEAD
  const { handleMapMove } = useMovableMap()
  const {
    getAssetsMapLayer,
    getBusesMapLayer,
    handleMapKey,
    handleMapClick,
  } = useEditableMap(
    sketchMode, changeSketchMode,
    assetTypeByCode,
    assetsGeoJson, selectedAssetIndexes, setSelectedAssetIndexes,
    busesGeoJson, selectedBusIndexes,
    mapEditState,
    colors)
  const mapLayers = [
    getAssetsMapLayer(),
    getBusesMapLayer(),
  ]
=======
  const focusingAssetId = useSelector(getFocusingAssetId)
  // const focusingBusId = useSelector(getFocusingBusId)
  const mapLayers = []
  const mapMode = getMapMode(sketchMode)
  const pickingRadius = PICKING_RADIUS_IN_PIXELS
  const pickingDepth = PICKING_DEPTH
  const ASSET_TYPE_METER_CODE = assetTypeByCode['m'] && assetTypeByCode['m'].code

  function handleViewStateChange({viewState}) {
    // Update the map viewport
    dispatch(setMapViewState(viewState))
  }

  function handleAssetsGeoJsonClick(info, event, data) {
    const assetId = info.object.properties.id
    if (assetId && sketchMode.startsWith(SKETCH_MODE_DELETE)) {
      dispatch(setFocusingAssetId(null))
      setSelectedAssetIndexes([])
      setSelectedBusIndexes([])
      dispatch(deleteAsset(assetId))
      return
    }
    assetId && dispatch(setFocusingAssetId(assetId))
    assetId && dispatch(setFocusingBusId(null))
    // Validate that were adding assets
    if (sketchMode.startsWith(SKETCH_MODE_ADD) || info.isGuide) {
      // Validate that were adding a line
      if (sketchMode === SKETCH_MODE_ADD_LINE) {
        // Given the info provided in the parameters we get the assets on such point
        const assetInfos = deckGL.current.pickMultipleObjects({
          x: info.x,
          y: info.y,
          layerIds: [ASSETS_GEOJSON_LAYER_ID],
          radius: pickingRadius,
          depth: pickingDepth,
        })
        // 'tentative' results means the line hast more than 2 vertex
        // o-----o-----o THe mos basic example of the multi-string line
        const joinedLines = assetInfos.filter((asset) => asset.object.properties.guideType !== "tentative")
        // Here we need two know if the clock overlap two objects
        // Maybe i missed to check if the two elements are lines
        if (joinedLines.length !== 2) return;

        // This could be improved checking who is new assets, instead of hardcoded index
        const new_asset = joinedLines[0]
        const old_asset = joinedLines[1]

        // We need to know the bus to wich the elements will be connected
        const vertexAssetId = new_asset.object.properties.id


        const assetObjective = old_asset.object
        // Create a new line, because instead of delete lines.
        // We reduce the existent lines and add a new line
        // After that we wire those lines
        // 1. o-------------------o Existing lines
        // 2. o-------o             Reduce existing lines
        // 3.         o-----------o Create new line
        // 4. o-------o-----------o Wire lines

        // Each block correspond to one step
        // 1. o-------------------o Existing lines
        const assetTypeCode = getAssetTypeCode(sketchMode)
        const assetType = assetTypeByCode[assetTypeCode]
        const asset = makeAsset(assetType, [])
        dispatch(setAsset(asset))

        // 2. o-------o             Reduce existing lines
        const [splitAsset] = assetInfos.filter((asset) => asset.object.properties.id !== undefined && asset.object.properties.id.length < 10);
        const sliceFirst = lineSlice(point(splitAsset.object.geometry.coordinates[0]),
          point(info.coordinate),
          splitAsset.object)

        // 3.         o-----------o Create new line
        const last = assetObjective.geometry.coordinates.length - 1
        const sliceSecond = lineSlice(point(info.coordinate),
          point(splitAsset.object.geometry.coordinates[last]),
          // point(assetObjective.geometry.coordinates[last]),
          splitAsset.object)
        sliceSecond.properties = {id: asset.id, typeCode: "l"}

        // 4. o-------o-----------o Wire lines
        // Here we update the points for the existing line
        assetsGeoJson.features.forEach((asset, i) => {
          if (asset.properties.id === assetObjective.properties.id) {
            alert('Updated')
            asset.geometry = sliceFirst.geometry
          }
        })
        assetsGeoJson.features.push(sliceSecond)
        sliceFirst.properties.typeCode = assetTypeCode


        dispatch(setAssetConnection(assetObjective.properties.id, 1, {busId: vertexAssetId}))
        dispatch(setAssetConnection(asset.id, 0, {busId: vertexAssetId}))
        dispatch(setAssetsGeoJson(assetsGeoJson))  // Update geojson for assets

        // Doesn't allow the user continue adding new points to the new line
        changeSketchMode(SKETCH_MODE_ADD, vertexAssetId)
      }

      return;
    }
    const featureIndex = info.index
    setSelectedAssetIndexes([featureIndex])
    setSelectedBusIndexes([])
  }

  function handleAssetsGeoJsonEdit({editType, editContext, updatedData}) {
    const splitLines = () => {};
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
          setSelectedAssetIndexes(featureIndexes)
        } else {
          changeSketchMode(SKETCH_MODE_ADD)
        }
        dispatch(setFocusingAssetId(assetId))  // Show details for the new asset
        break
      }
      default: {}
    }
    dispatch(setAssetsGeoJson(updatedData))  // Update geojson for assets
  }

  function handleAssetsGeoJsonInterpret(event) {
    // Find nearest bus
    const screenCoords = event.screenCoords
    const busInfos = deckGL.current.pickMultipleObjects({
      x: screenCoords[0],
      y: screenCoords[1],
      layerIds: [BUSES_GEOJSON_LAYER_ID],
      radius: pickingRadius,
      depth: pickingDepth,
    })
    // Determine whether the user modified a middle vertex
    const vertex = getPickedEditHandle(event.picks)
    if (!vertex) {
      return
    }
    const vertexProperties = vertex.properties
    const vertexIndex = vertexProperties.positionIndexes[0]
    const featureIndex = vertexProperties.featureIndex
    const feature = assetsGeoJson.features[featureIndex]
    const featureVertexCount = feature.geometry.coordinates.length
    const isMiddleVertex = vertexIndex !== 0 &&
      vertexIndex !== featureVertexCount - 1
    if (isMiddleVertex) {
      // Split the line
      return
    }
    const vertexAssetId = feature.properties.id
    const vertexAsset = assetById[vertexAssetId]
    const vertexAssetConnections = vertexAsset.connections || []
    const connectionByBusId = getByKey(vertexAssetConnections, 'busId')
    const connectionIndex = vertexIndex === 0 ? 0 : 1

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
    console.log(theirBusId)
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
    console.log(ourBusId);
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
    
    // console.log('pickingInfo', event, nearestBusInfos)
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


  function handleOnDoubleClick(e) {
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
    onClick: handleAssetsGeoJsonClick,
    onEdit: handleAssetsGeoJsonEdit,
    onInterpret: handleAssetsGeoJsonInterpret,
    handleOnDoubleClick: handleOnDoubleClick,
  }))

  // mapLayers.push(new GeoJsonLayer({
  mapLayers.push(new EditableGeoJsonLayer({
    id: BUSES_GEOJSON_LAYER_ID,
    data: busesGeoJson,
    mode: getMapMode(),
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

>>>>>>> feature/split-line
  return (
    <div onKeyUp={handleMapKey}>
      <DeckGL
        ref={deckGL}
        layers={mapLayers}
        pickingRadius={PICKING_RADIUS_IN_PIXELS}
        pickingDepth={PICKING_DEPTH}
        controller={{ doubleClickZoom: false }}
        viewState={mapViewState}
        onViewStateChange={handleMapMove}
        onClick={handleMapClick}
      >
        <StaticMap
          mapStyle={mapStyle}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        />
      </DeckGL>
    </div>
  )
}
