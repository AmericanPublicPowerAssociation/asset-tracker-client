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

  function handleAssetsGeoJsonClick(info, event) {
    console.log('BUSES click')
    console.log(info)
    console.log(event)
    const assetId = info.object.properties.id
    console.log(sketchMode)
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
        if (assetInfos.length !== 2) return;
        console.log(assetInfos)
        const busesInfos = deckGL.current.pickMultipleObjects({
          x: info.x,
          y: info.y,
          layerIds: [BUSES_GEOJSON_LAYER_ID],
          radius: pickingRadius,
          depth: pickingDepth,
        })
        console.log(busesInfos)
        const assetObjective = assetInfos[0].object
        const magnet = busesInfos[0].object
        const assetTypeCode = getAssetTypeCode(sketchMode)
        const assetType = assetTypeByCode[assetTypeCode]
        const connections = assetById[assetObjective.properties.id].connections
        const asset = makeAsset(assetType, [...connections])
        dispatch(setAsset(asset))
        const sliceFirst = lineSlice(point(assetObjective.geometry.coordinates[0]),
          busesInfos[0].object,
          assetInfos[0].object)

        const last = assetInfos[0].object.geometry.coordinates.length - 1
        const sliceSecond = lineSlice(busesInfos[0].object,
          point(assetInfos[0].object.geometry.coordinates[last]),
          assetInfos[0].object.geometry)
        sliceSecond.properties = {id: asset.id, typeCode: "l"}
        assetsGeoJson.features.forEach((asset, i) => {
          if (asset.properties.id === assetObjective.properties.id) {
            alert('Updated')
            asset.geometry = sliceFirst.geometry
            console.log(i)
          }
        })
        assetsGeoJson.features.push(sliceSecond)
        sliceFirst.properties.typeCode = assetTypeCode

        dispatch(setAssetConnection(assetObjective.properties.id, 1, {busId: magnet.properties.id}))
        dispatch(setAssetConnection(asset.id, 0, {busId: magnet.properties.id}))
        console.log(assetsGeoJson)
        dispatch(setAssetsGeoJson(assetsGeoJson))  // Update geojson for assets

        changeSketchMode(SKETCH_MODE_ADD, busesInfos[0].object.properties.id)
      }
    }
    const featureIndex = info.index
    setSelectedAssetIndexes([featureIndex])
    setSelectedBusIndexes([])
  }

  function handleAssetsGeoJsonEdit({editType, editContext, updatedData}) {
    const splitLines = () => {};
    console.log(updatedData)

    switch(editType) {
      // If a feature is being added for the first time,
      case 'addFeature': {
        console.log('===== handleAssetsGeoJsonEdit')
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
          if (featureIndexes.length === 1) {
            const feature = features[featureIndexes[0]]
            const vertexAssetId = feature.properties.id
            const asset = assetById[vertexAssetId]
            const connectionByBusId = getByKey([], 'busId')

            function getConnection(busId) {
              return connectionByBusId[busId] || {busId}
            }

            const newBusId = getRandomId(MINIMUM_BUS_ID_LENGTH)
            const connection = getConnection(newBusId)
            dispatch(setAssetConnection(vertexAssetId, 1, connection))
            // changeSketchMode(SKETCH_MODE_ADD, assetId)
          } else {
            console.log(`${SKETCH_MODE_ADD}`)
            changeSketchMode(SKETCH_MODE_ADD)
          }
          dispatch(setFocusingAssetId(assetId))  // Show details for the new asset
          }
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
    console.log(busInfos)
    // Determine whether the user modified a middle vertex
    const vertex = getPickedEditHandle(event.picks)
    console.log(vertex);
    if (!vertex) {
      console.log('== Break flow')
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
      console.log('isMiddleVertex')
      return
    }
    console.log(feature)
    const vertexAssetId = feature.properties.id
    const vertexAsset = assetById[vertexAssetId]
    console.log(vertexAsset)
    const vertexAssetConnections = vertexAsset.connections || []
    console.log(vertexAssetConnections)
    const connectionByBusId = getByKey(vertexAssetConnections, 'busId')
    console.log(connectionByBusId)
    // console.log(connectionByBusId)
    const connectionIndex = vertexIndex === 0 ? 0 : 1
    // console.log(connectionByBusId)

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
    console.log(info.object)
    console.log(assetId)
    if (sketchMode === SKETCH_MODE_ADD_LINE) {
      console.log('=== SKETCH ADD LINE')
      setLineBusId(busId)
      // If we already started a line,
      if (selectedAssetIndexes.length) {
        console.log('=== END LINE')
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
      console.log('=== HANLDE DOUBLE click')
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
