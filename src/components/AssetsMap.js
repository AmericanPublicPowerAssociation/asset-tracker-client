import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
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
  PICKING_RADIUS_IN_PIXELS,
  POINT_RADIUS_IN_METERS,
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_EDIT,
  SKETCH_MODE_DELETE,
} from '../constants'
import {
  getByKey,
  getRandomId,
} from '../macros'
import {
  CustomEditableGeoJsonLayer,
  getAssetTypeCode,
  getMapMode,
  getPickedEditHandle,
  makeAsset,
} from '../routines'
import {
  // getFocusingAssetId,
  // getFocusingBusId,
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
    console.log(`===== DATA`)
    console.log(info)
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
    if (sketchMode.startsWith(SKETCH_MODE_ADD) || info.isGuide) {
      if (sketchMode === SKETCH_MODE_ADD_LINE) {
        const assetInfos = deckGL.current.pickMultipleObjects({
          x: info.x,
          y: info.y,
          layerIds: [ASSETS_GEOJSON_LAYER_ID],
          radius: pickingRadius,
          depth: pickingDepth,
        })
        console.log(assetInfos)
        console.log(assetsGeoJson)
        const joinedLines = assetInfos.filter((asset) => asset.object.properties.guideType !== "tentative")
        console.log(joinedLines)
        if (joinedLines.length !== 2) return;

        const new_asset = joinedLines[0]
        console.log('New asses')
        console.log(new_asset)
        const old_asset = joinedLines[1]
        console.log('Old asses')
        console.log(old_asset)
        const feature = new_asset
        const vertexAssetId = feature.object.properties.id
        console.log(assetById[old_asset.object.properties.id])
        const connectionByBusId = getByKey([], 'busId')

        function getConnection(busId) {
          return connectionByBusId[busId] || {busId}
        }

        const newBusId = getRandomId(MINIMUM_BUS_ID_LENGTH)
        const connection = getConnection(newBusId)
        dispatch(setAssetConnection(vertexAssetId, 1, connection))

        const assetObjective = old_asset.object
        const assetTypeCode = getAssetTypeCode(sketchMode)
        const assetType = assetTypeByCode[assetTypeCode]
        const connections = assetById[assetObjective.properties.id].connections
        const asset = makeAsset(assetType, [])
        dispatch(setAsset(asset))
        console.log(assetInfos)

        const [splitAsset] = assetInfos.filter((asset) => asset.object.properties.id !== undefined && asset.object.properties.id.length < 10);
        console.log(splitAsset)
        const sliceFirst = lineSlice(point(splitAsset.object.geometry.coordinates[0]),
          point(info.coordinate),
          splitAsset.object)
        console.log(sliceFirst)

        const last = assetObjective.geometry.coordinates.length - 1
        const sliceSecond = lineSlice(point(info.coordinate),
          point(splitAsset.object.geometry.coordinates[last]),
          // point(assetObjective.geometry.coordinates[last]),
          splitAsset.object)
        sliceSecond.properties = {id: asset.id, typeCode: "l"}
        console.log(sliceSecond)
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
    console.log(editType)
    console.log(editContext)
    console.log(updatedData)
    console.log(assetsGeoJson)
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

  return (
    <div onKeyUp={onKeyUp}>
      <DeckGL
        ref={deckGL}
        controller={{
          doubleClickZoom: false,
        }}
        layers={mapLayers}
        viewState={mapViewState}
        pickingRadius={pickingRadius}
        pickingDepth={pickingDepth}
        onViewStateChange={handleViewStateChange}
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
