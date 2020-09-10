import { useDispatch, useSelector } from 'react-redux'
import { IconLayer } from '@deck.gl/layers'
import { produce } from 'immer'
import getNearestPointOnLine from '@turf/nearest-point-on-line'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { ViewMode } from '@nebula.gl/edit-modes'
import {
  getAuthUtilities,
} from 'appa-auth-consumer'
import {
  deleteAssetConnection,
  fillAssetName,
  insertAssetVertex,
  setAsset,
  setAssetConnection,
  setAssetsGeoJson,
  setMapViewState,
  setPopUpDeleteMidpoint,
  setPopUpState,
  setSelection,
  setSketchMode,
  setTemporaryAsset,
  showWarningMessage,
} from '../actions'
import {
  ASSETS_MAP_LAYER_ID,
  ASSET_LINE_WIDTH_IN_METERS,
  ASSET_RADIUS_IN_METERS_BY_CODE,
  ASSET_TYPE_CODE_CONTROL,
  ASSET_TYPE_CODE_GENERATOR,
  ASSET_TYPE_CODE_LINE,
  ASSET_TYPE_CODE_METER,
  ASSET_TYPE_CODE_POWER_QUALITY,
  ASSET_TYPE_CODE_STORAGE,
  ASSET_TYPE_CODE_SWITCH,
  ASSET_TYPE_CODE_TRANSFORMER,
  BUSES_MAP_LAYER_ID,
  BUS_RADIUS_IN_METERS,
  COLORS_BY_ASSET,
  ICONS_MAP_LAYER_ID,
  OVERLAY_MODE_ASSETS,
  SKETCH_MODE_ADD_ASSET,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_EDIT,
  SKETCH_MODE_VIEW,
} from '../constants'
import {
  getAssetDescription,
  getAssetTypeCode,
  getBusOrphanInfo,
  getFeatureInfo,
  getMapMode,
  getNearbyFeatures,
  getPositionIndex,
  isBusRequired,
  makeBusId,
  makeTemporaryAsset,
  updateFeature,
} from '../routines'
import {
  getAssetById,
  getAssetIdsByBusId,
  getAssetTypeByCode,
  getAssetsGeoJson,
  getAssetsIconLayerData,
  getBestAssetIdByBusId,
  getBusesGeoJson,
  getMapColors,
  getOverlayMode,
  getSelectedAssetId,
  getSelectedAssetIndexes,
  getSelectedBusId,
  getSelectedBusIndexes,
  getSketchMode,
  getTemporaryAsset,
  getMapWebMercatorViewPort,
} from '../selectors'

export function useMovableMap() {
  const dispatch = useDispatch()
  return {
    handleMapMove({ viewState }) {
      dispatch(setMapViewState(viewState))
    },
  }
}

export const PICKING_RADIUS_IN_PIXELS = 5
export const PICKING_DEPTH = 5

export function useEditableMap(deckGL, { onAssetDelete }) {
  const dispatch = useDispatch()
  const sketchMode = useSelector(getSketchMode)
  const mapColors = useSelector(getMapColors)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const assetsIconLayerData = useSelector(getAssetsIconLayerData)
  const selectedAssetId = useSelector(getSelectedAssetId)
  const selectedAssetIndexes = useSelector(getSelectedAssetIndexes)
  const selectedBusId = useSelector(getSelectedBusId)
  const selectedBusIndexes = useSelector(getSelectedBusIndexes)
  const bestAssetIdByBusId = useSelector(getBestAssetIdByBusId)
  const assetIdsByBusId = useSelector(getAssetIdsByBusId)
  const assetById = useSelector(getAssetById)
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const overlayMode = useSelector(getOverlayMode)
  const utilities = useSelector(getAuthUtilities)
  const assetTypeCode = getAssetTypeCode(sketchMode)
  const assetFeatures = assetsGeoJson.features
  const busFeatures = busesGeoJson.features
  const isAddingLine = sketchMode === SKETCH_MODE_ADD_LINE
  const mapWebMercatorViewPort = useSelector(getMapWebMercatorViewPort)
  const isShowAssetIcons = overlayMode === OVERLAY_MODE_ASSETS
  const isEditing = sketchMode.startsWith(SKETCH_MODE_EDIT)
  const utility = utilities[0]
  const utilityId = utility.id
  let temporaryAsset = useSelector(getTemporaryAsset)
  let iconLayerData = []
  if (isEditing) {
    iconLayerData = assetsIconLayerData.filter(asset => asset.properties.id !== selectedAssetId)
  }
  else if (isShowAssetIcons) {
    iconLayerData = assetsIconLayerData
  }


  function getAssetsMapLayer() {
    const mapMode = getMapMode(sketchMode)

    return new EditableGeoJsonLayer({
      id: ASSETS_MAP_LAYER_ID,
      data: assetsGeoJson,
      mode: mapMode,
      selectedFeatureIndexes: selectedAssetIndexes,
      autoHighlight: true,
      highlightColor: mapColors.assetHighlight,
      pickable: true,
      stroked: true,
      getRadius: feature => {
        return ASSET_RADIUS_IN_METERS_BY_CODE[ASSET_TYPE_CODE_TRANSFORMER]
      },
      getLineWidth: (feature) => {
        const asset = feature['properties']['typeCode']
        if (asset === ASSET_TYPE_CODE_LINE) {
          return ASSET_LINE_WIDTH_IN_METERS
        }
        return 3
      },
      getFillColor: (feature, isSelected, mode) => {
        const asset = feature['properties']['typeCode']
        if (asset === ASSET_TYPE_CODE_LINE) {
          return isSelected ? mapColors.assetSelect : COLORS_BY_ASSET['dark'][asset]
        }
        return isSelected ? mapColors.assetSelect : COLORS_BY_ASSET['dark'][asset]
        // return isSelected ? mapColors.assetSelect : mapColors.asset
      },
      getLineColor: (feature, isSelected) => {
        const asset = feature['properties']['typeCode']
        return isSelected ? mapColors.assetSelect : COLORS_BY_ASSET['dark'][asset]
      },
      onHover: handleAssetHover,
      onClick: handleAssetClick,
      onEdit: handleAssetEdit,
      modeConfig: { steps: 4 },
    })
  }

  function getBusesMapLayer() {
    return new EditableGeoJsonLayer({
      id: BUSES_MAP_LAYER_ID,
      data: busesGeoJson,
      mode: ViewMode,
      selectedFeatureIndexes: selectedBusIndexes,
      autoHighlight: true,
      highlightColor: mapColors.busHighlight,
      pickable: true,
      stroked: false,
      getRadius: BUS_RADIUS_IN_METERS,
      getFillColor: (feature, isSelected) => {
        return isSelected ? mapColors.busSelect : mapColors.bus
      },
      onHover: handleBusHover,
      onClick: handleBusClick,
    })
  }
  // const ICON_SIZE = 60
  // const ICON_SIZE = 8

  function getIconsMapLayer() {
    /*
    const assetsJSONForIcons = {
      type: 'FeatureCollection',
      features: assetsGeoJson.features.filter(obj => obj.properties.typeCode !== 'l'),
    }
    const zoom = mapWebMercatorViewPort.zoom
    */
    const ICON_MAPPING = {
      [ASSET_TYPE_CODE_CONTROL]:  { x: 0, y: 67, width: 100, height: 107, mask: true },
      [ASSET_TYPE_CODE_GENERATOR]:  { x: 0, y: 175, width: 100, height: 86, mask: true },
      [ASSET_TYPE_CODE_METER]:  { x: 0, y: 262, width: 100, height: 108, mask: true },
      [ASSET_TYPE_CODE_POWER_QUALITY]:  { x: 0, y: 370, width: 100, height: 98, mask: true },
      [ASSET_TYPE_CODE_STORAGE]:  { x: 0, y: 473, width: 100, height: 92, mask: true },
      [ASSET_TYPE_CODE_SWITCH]:  { x: 0, y: 559, width: 100, height: 43, mask: true },
      [ASSET_TYPE_CODE_TRANSFORMER]: { x:0, y: 600, width: 100, height: 91, mask: true },
    }

    return new IconLayer({
      id: ICONS_MAP_LAYER_ID,
      pickable: false,
/*
      sizeScale: ICON_SIZE * window.devicePixelRatio,
      getPosition: d => {
        console.log(d)
        return d.geometry.coordinates
      },
      getIcon: d => {
        console.log(d)
        return 'marker'
      } ,
*/
      data: iconLayerData,
      iconAtlas: '/tileset.png',
      iconMapping: ICON_MAPPING,
      sizeScale: 1,
      getPosition: d => d.geometry.coordinates,
      getIcon: d => d.properties.typeCode ? d.properties.typeCode : 'marker',
      getSize: d => {
        // console.log(mapWebMercatorViewPort.zoom, 2 * mapWebMercatorViewPort.zoom)
        return Math.sqrt(mapWebMercatorViewPort.zoom * mapWebMercatorViewPort.zoom) * 2
      },
      getColor: (feature) => {
        return [255, 255, 255]
        // const asset = feature['properties']['typeCode']
        // return COLORS_BY_ASSET['dark'][asset]
      },
    })
  }


  function handleMapKey(event) {
    if (sketchMode === SKETCH_MODE_VIEW) return
    // console.log('map key', event)
    switch (event.key) {
      case 'Escape': {
        dispatch(setSketchMode(SKETCH_MODE_EDIT))
        break
      }
      case 'Backspace':
      case 'Delete': {
        onAssetDelete(selectedAssetId)
        break
      }
      default: { }
    }
  }

  function handleAssetHover(info) {
    const { x, y, object } = info
    let d = null
    if (object) {
      const objectProperties = object.properties
      const assetId = objectProperties.id
      const assetDescription = getAssetDescription(
        assetId, assetById, assetTypeByCode)
      const text = assetDescription
      if (text) {
        d = { x, y, text }
      }
    }
    dispatch(setPopUpState(d))
  }

  function handleBusHover(info) {
    const { x, y, object } = info
    let d = null
    if (object) {
      const objectProperties = object.properties
      const busId = objectProperties.id
      const busIndex = objectProperties.index
      const assetId = bestAssetIdByBusId[busId]
      const assetDescription = getAssetDescription(
        assetId, assetById, assetTypeByCode)
      const text = 'Bus ' + busIndex + ' of ' + assetDescription
      d = { x, y, text }
    }
    dispatch(setPopUpState(d))
  }

  function handleDeckClick(info, event) {
    if (!info.picked) {
      dispatch(setSelection({ assetId: null, assetIndexes: [] }))
    }
  }

  function handleAssetClick(info, event) {
    console.log('asset click', info, event, 'sketch mode: ', sketchMode)
    const assetIndex = info.object.properties.featureIndex || info.index
    const assetFeature = assetFeatures[assetIndex]
    if (!assetFeature) return
    const assetId = assetFeature.properties.id
    if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
      dispatch(setSelection({ assetId, assetIndexes: [assetIndex] }))
    }
  }

  function handleBusClick(info, event) {
    console.log('bus click', info, event)
    const busIndex = info.index
    const busFeature = busFeatures[busIndex]
    if (!busFeature) return
    const busId = busFeature.properties.id
    if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
      dispatch(setSelection({ busId, busIndexes: [info.index] }))
    }
  }

  function handleAssetEdit(event) {
    const { editType, editContext } = event
    let { updatedData } = event
    let triggerSetAssetsGeoJsonLast = true
    console.log('sketch mode:', sketchMode, ', asset edit:', editType, editContext, updatedData)
    switch (editType) {
      case 'addFeature': {
        // Add a feature in draw mode
        const { feature, featureIndex } = getFeatureInfo(event)
        if (!temporaryAsset) {
          temporaryAsset = makeTemporaryAsset(utilityId, assetTypeCode)
        } else if (isAddingLine) {
          console.log('add ending vertex')
          console.log('sketch mode: ', sketchMode)
          // Add ending vertex
          const vertexCount = feature.geometry.coordinates.length
          const lastVertexIndex = vertexCount - 1
          if (!temporaryAsset.connections[lastVertexIndex]) {
            temporaryAsset = produce(temporaryAsset, draft => {
              draft.connections[lastVertexIndex] = { busId: makeBusId() }
            })
          }
        }

        if (feature.geometry.type === 'Point') {
          const position = feature.geometry.coordinates
          const {
            nearbyAssetFeatures, nearbyBusFeatures,
          } = getNearbyFeatures(
            position, deckGL, selectedAssetId, selectedBusId)

          if (nearbyAssetFeatures.length) {
            dispatch(showWarningMessage(
              'You cannot add an asset directly to another asset. Please add lines to connect buses.'))
          }
          if (nearbyBusFeatures.length) {
            dispatch(showWarningMessage(
              'You cannot add an asset directly to bus. Please add lines to connect buses.'))
          }
        }

        const assetId = temporaryAsset.id
        updateFeature(temporaryAsset, feature)
        dispatch(setAssetsGeoJson(updatedData))
        triggerSetAssetsGeoJsonLast = false
        dispatch(setAsset(temporaryAsset))
        dispatch(fillAssetName(assetId, feature))
        if (editContext !== 'addTentativePosition'){
          dispatch(setSketchMode(SKETCH_MODE_EDIT))
        }
        dispatch(setSelection({ assetId, assetIndexes: [featureIndex] }))
        break
      }
      case 'addTentativePosition': {
        // Add a vertex in DrawLineStringMode or DrawPolygonMode
        if (!temporaryAsset) {
          temporaryAsset = makeTemporaryAsset(utilityId, assetTypeCode)
        }
        console.log('temporal asset', temporaryAsset)
        if (isAddingLine) {
          const { position } = editContext
          console.log('adding line')
          const vertexCount = (temporaryAsset.vertexCount || 0) + 1
          const screenCoords = deckGL.current.viewports[0].project(position)
          temporaryAsset = produce(temporaryAsset, draft => {
            draft.vertexCount = vertexCount
          })
          const {
            nearbyAssetFeatures, nearbyBusFeatures,
          } = getNearbyFeatures(
            editContext.position, deckGL, selectedAssetId, selectedBusId)

          // Add connection to nearby bus or make a new bus
          let busId
          if (nearbyBusFeatures.length) {
            busId = nearbyBusFeatures[0].properties.id
          } else if (vertexCount >= 1) {
            busId = makeBusId()
          }
          if (busId) {
            console.log('>> Adding connection', vertexCount - 1)
            console.log('>> Connection', busId)
            temporaryAsset = produce(temporaryAsset, draft => {
              draft.connections[vertexCount - 1] = { busId }
            })
          }
          console.log(nearbyAssetFeatures)
          const nearbyAssetInfos = deckGL.current.pickMultipleObjects({
            x: screenCoords[0],
            y: screenCoords[1],
            layerIds: [ASSETS_MAP_LAYER_ID],
            radius: PICKING_RADIUS_IN_PIXELS,
            depth: PICKING_DEPTH,
          })

          const nearbyAssetInfo = nearbyAssetInfos.find(info => !info.object.properties.guideType)


          if (nearbyAssetInfo) {
            const nearbyAssetIndex = nearbyAssetInfo.index
            const { features } = updatedData
            const lineFeature = features[nearbyAssetIndex]
            const nearbyAssetFeature = nearbyAssetInfo.object
            console.log('===============')
            console.log(temporaryAsset)
            console.log(lineFeature)
            console.log(nearbyAssetFeature)
            console.log('===============')

            if (nearbyBusFeatures.length) {
              console.log('NEARBY ASSET && NEARBY BUS')
              // If there was a nearby bus, do nothing
            } else {
              console.log('NEARBY ASSET && NOT NEARBY BUS')
              // If the nearby asset was a line,
              if (nearbyAssetFeature.geometry.type === 'LineString') {
                console.log('NEARBY LINESTRING')
                const lineMapVertices = nearbyAssetFeature.geometry.coordinates
                console.log('MAP VERTICES', lineMapVertices)
                // ==> Get nearest vertex if within picking distance
                // 1. convert vertices to pixel coordinates
                const linePixelVertices = lineMapVertices.map(
                  _ => deckGL.current.viewports[0].project(_))
                console.log('PIXEL VERTICES', linePixelVertices)
                // 2. get distance to each
                const distances = linePixelVertices.map(([x, y]) => Math.hypot(x - screenCoords[0], y - screenCoords[1]))
                console.log('DISTANCES', distances)

                // 3. get index of nearest
                function argMin(array) {
                  // put into macros
                  // https://gist.github.com/engelen/fbce4476c9e68c52ff7e5c2da5c24a28
                  return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] < r[0] ? a : r))[1]
                }

                const nearestVertexIndex = argMin(distances)
                console.log('NEAREST VERTEX INDEX', nearestVertexIndex)
                // 4. check if within picking distance
                const nearestVertexDistance = distances[nearestVertexIndex]
                console.log('NEAREST VERTEX DISTANCE', nearestVertexDistance)
                console.log('PICKING RADIUS IN PIXELS', 5)

                let vertexIndex
                if (nearestVertexDistance < 5) {
                  // 5. if yes, then use this vertexIndex
                  vertexIndex = nearestVertexIndex
                  console.log('IS NEAR VERTEX')
                  const lineAssetId = lineFeature.properties.id
                  if (!busId) busId = makeBusId()
                  dispatch(setAssetConnection(
                    lineAssetId,
                    vertexIndex,
                    { busId },
                  ))
                } else {
                  // 6. if no, then make point on line and use that vertexIndex
                  console.log('IS TOO FAR FROM VERTEX')
                  // 6.1 get nearest point on line
                  const nearestPointOnLine = getNearestPointOnLine(nearbyAssetFeature, {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: position,
                    },
                  })
                  const nearestPointOnLinePosition = nearestPointOnLine.geometry.coordinates
                  const nearestPointOnLinePriorIndex = nearestPointOnLine.properties.index
                  // console.log(nearestPointOnLinePosition, nearestPointOnLinePriorIndex)
                  // 6.2 insert that point as a vertex on line
                  const lineGeometry = lineFeature.geometry
                  const oldXYs = lineGeometry.coordinates
                  const newXYs = [
                    ...oldXYs.slice(0, nearestPointOnLinePriorIndex + 1),
                    nearestPointOnLinePosition,
                    ...oldXYs.slice(nearestPointOnLinePriorIndex + 1, oldXYs.length),
                  ]
                  console.log('BEFORE', oldXYs)
                  console.log('AFTER', newXYs)
                  updatedData = produce(updatedData, draft => {
                    draft.features[nearbyAssetIndex].geometry.coordinates = newXYs
                  })
                  // 6.3 update feature geometry
                  // see above
                  // 6.4 update downstream connection vertices
                  const lineAssetId = lineFeature.properties.id
                  console.log('===================')
                  console.log(lineAssetId)
                  if (!busId) busId = makeBusId()
                  dispatch(insertAssetVertex(lineAssetId, nearestVertexIndex, {
                    busId,
                  }))
                  console.log('===================')

                  // for each connection below index
                  // bump it forward
                  // connect to index
                }
              }
            }
          }
        }
        dispatch(setTemporaryAsset(temporaryAsset))
        break
      }
      case 'addPosition': {
        console.log('adding vertex position')
        // Add a vertex in ModifyMode
        const { feature } = getFeatureInfo(event)
        const addedPositionIndex = getPositionIndex(event)
        const featureProperties = feature.properties
        if (featureProperties.typeCode === ASSET_TYPE_CODE_LINE) {
          const assetId = feature.properties.id
          const afterIndex = addedPositionIndex - 1
          dispatch(insertAssetVertex(assetId, afterIndex))
        }
        break
      }
      case 'removePosition': {
        // Remove a vertex in ModifyMode
        const { feature } = getFeatureInfo(event)
        const removedPositionIndex = getPositionIndex(event)
        const featureProperties = feature.properties
        const vertexCount = feature.geometry.coordinates.length
        const assetId = featureProperties.id
        const lonlat = editContext.position
        dispatch(setPopUpDeleteMidpoint({
          lonlat, assetId, removedPositionIndex, vertexCount, updatedData,
        }))
        return // prevent update
      }
      case 'movePosition': {
        // Drag a vertex in ModifyMode
        const asset = assetById[selectedAssetId]
        const assetConnections = asset.connections
        if (!assetConnections) break

        const vertexIndex = editContext.positionIndexes[0]
        const connection = assetConnections[vertexIndex]
        const oldBusId = connection && connection.busId
        const {
          nearbyAssetFeatures, nearbyBusFeatures, screenXY,
        } = getNearbyFeatures(
          editContext.position, deckGL, selectedAssetId, oldBusId)

        const [x, y] = screenXY
        if (nearbyBusFeatures.length) {
          handleBusHover({ x, y, object: nearbyBusFeatures[0] })
        } else if (nearbyAssetFeatures.length) {
          handleAssetHover({ x, y, object: nearbyAssetFeatures[0] })
        }
        break
      }
      case 'finishMovePosition': {
        // Drop a vertex in ModifyMode
        const asset = assetById[selectedAssetId]
        const assetConnections = asset.connections
        if (!assetConnections) break

        const busPacks = []
        const assetTypeCode = asset.typeCode
        if (assetTypeCode === ASSET_TYPE_CODE_LINE) {
          const vertexIndex = editContext.positionIndexes[0]
          const connection = assetConnections[vertexIndex]
          const busId = connection && connection.busId
          const busPosition = editContext.position
          busPacks.push([vertexIndex, busId, busPosition])
        } else {
          for (const [
            vertexIndex, connection,
          ] of Object.entries(asset.connections)) {
            const { busId } = connection
            const busPosition = busFeatures.find(
              f => f.properties.id === busId,
            ).geometry.coordinates
            busPacks.push([vertexIndex, busId, busPosition])
          }
        }

        const { feature } = getFeatureInfo(event)
        for (const [vertexIndex, oldBusId, busPosition] of busPacks) {
          // Delete orphan line midpoint bus if it exists
          const busOrphanInfo = getBusOrphanInfo(
            oldBusId, selectedAssetId, assetById, assetIdsByBusId,
            assetFeatures)
          if (busOrphanInfo) {
            const [connectedAssetId, connectedVertexIndex] = busOrphanInfo
            dispatch(deleteAssetConnection(
              connectedAssetId, connectedVertexIndex))
          }

          let busId = null
          const {
            nearbyAssetFeatures, nearbyBusFeatures,
          } = getNearbyFeatures(busPosition, deckGL, selectedAssetId, oldBusId)
          if (nearbyAssetFeatures.length) {
            dispatch(showWarningMessage(
              'Connecting to a line is not supported yet. Please connect to a bus.'))
          }
          if (nearbyBusFeatures.length) {
            busId = nearbyBusFeatures[0].properties.id
          } else if (isBusRequired(feature, vertexIndex)) {
            busId = makeBusId()
          }

          if (busId) {
            dispatch(setAssetConnection(
              selectedAssetId, vertexIndex, { busId }))
          } else {
            dispatch(deleteAssetConnection(selectedAssetId, vertexIndex))
          }
        }
        break
      }
      default: { }
    }
    if (triggerSetAssetsGeoJsonLast) {
      dispatch(setAssetsGeoJson(updatedData))
    }
  }

  const mapLayers = [
    getAssetsMapLayer(),
    getBusesMapLayer(),
    getIconsMapLayer(),
  ]

  return {
    mapLayers,
    handleMapKey,
    handleDeckClick,
  }
}
