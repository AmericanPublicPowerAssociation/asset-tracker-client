import { useDispatch, useSelector } from 'react-redux'
import { produce } from 'immer'
import getNearestPointOnLine from '@turf/nearest-point-on-line'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { ViewMode } from '@nebula.gl/edit-modes'
import {
  deleteAsset,
  removeLineEndPoint,
  fillAssetName,
  insertAssetVertex,
  setAsset,
  setAssetConnection,
  setAssetsGeoJson,
  setEditingAsset,
  setFocusingAssetId,
  setFocusingBusId,
  setMapViewState,
  setSelectedAssetIndexes,
  // setSelectedBusIndexes,
  setSketchMode,
} from '../actions'
import {
  ASSETS_MAP_LAYER_ID,
  ASSET_LINE_WIDTH_IN_METERS,
  ASSET_RADIUS_IN_METERS_BY_CODE,
  ASSET_TYPE_CODE_LINE,
  BUSES_MAP_LAYER_ID,
  BUS_RADIUS_IN_METERS,
  PICKING_DEPTH,
  PICKING_RADIUS_IN_PIXELS,
  SKETCH_MODE_ADD,
  SKETCH_MODE_ADD_ASSET,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_DELETE,
  SKETCH_MODE_EDIT,
} from '../constants'
import {
  CustomEditableGeoJsonLayer,
  getAssetTypeCode,
  getFeaturePack,
  getMapMode,
  // getPickedEditHandle,
  makeBusId,
  makeEditingAsset,
  updateFeature,
} from '../routines'
import {
  getAssetIdByBusId,
  getAssetsGeoJson,
  getBusesGeoJson,
  getColors,
  getEditingAsset,
  getFocusingAssetId,
  getSelectedAssetIndexes,
  getSelectedBusIndexes,
  getSketchMode,
} from '../selectors'

export function useMovableMap() {
  const dispatch = useDispatch()
  return {
    handleMapMove({ viewState }) {
      dispatch(setMapViewState(viewState))
    },
  }
}

export function useEditableMap(deckGL, setHoverInfo) {
  const dispatch = useDispatch()
  const sketchMode = useSelector(getSketchMode)
  let editingAsset = useSelector(getEditingAsset)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const focusingAssetId = useSelector(getFocusingAssetId)
  const selectedAssetIndexes = useSelector(getSelectedAssetIndexes)
  const selectedBusIndexes = useSelector(getSelectedBusIndexes)
  const assetIdByBusId = useSelector(getAssetIdByBusId)
  const colors = useSelector(getColors)
  const assetTypeCode = getAssetTypeCode(sketchMode)
  const isAddingLine = sketchMode === SKETCH_MODE_ADD_LINE

  function getAssetsMapLayer() {
    const mapMode = getMapMode(sketchMode)

    function handleAssetEdit(event) {
      const { editType, editContext } = event
      let { updatedData } = event
      console.log('asset edit', editType, editContext, updatedData)

      if (editType === 'addTentativePosition') {
        if (!editingAsset.id) {
          editingAsset = makeEditingAsset(assetTypeCode)
        }
        if (isAddingLine) {
          // Look for nearby objects
          const { position } = editContext
          const screenCoords = deckGL.current.viewports[0].project(position)
          const nearbyAssetInfos = deckGL.current.pickMultipleObjects({
            x: screenCoords[0],
            y: screenCoords[1],
            layerIds: [ASSETS_MAP_LAYER_ID],
            radius: PICKING_RADIUS_IN_PIXELS,
            depth: PICKING_DEPTH,
          })
          console.log('nearbyAssetInfos', nearbyAssetInfos)
          const nearbyBusInfos = deckGL.current.pickMultipleObjects({
            x: screenCoords[0],
            y: screenCoords[1],
            layerIds: [BUSES_MAP_LAYER_ID],
            radius: PICKING_RADIUS_IN_PIXELS,
            depth: PICKING_DEPTH,
          })
          console.log('nearbyBusInfos', nearbyBusInfos)
          // Convert objects into features
          const nearbyAssetFeatures = nearbyAssetInfos.map(info => info.object)
          const nearbyBusFeatures = nearbyBusInfos.map(info => info.object)
          // Get editing feature
          const editingAssetFeature = nearbyAssetFeatures.find(
            feature => feature.properties.guideType)
          const vertexCount = editingAssetFeature ?
            editingAssetFeature.geometry.coordinates.length : 1
          console.log('vertexCount', vertexCount)
          // Add connection to nearby bus or make a new bus
          let busId
          if (nearbyBusFeatures.length) {
            busId = nearbyBusFeatures[0].properties.id
          } else if (vertexCount === 1) {
            busId = makeBusId()
          }
          if (busId) {
            editingAsset = produce(editingAsset, draft => {
              draft.connections[vertexCount - 1] = { busId }
            })
          }
          const nearbyAssetInfo = nearbyAssetInfos.find(info => !info.object.properties.guideType)
          // If there is a nearby asset
          if (nearbyAssetInfo) {
            const nearbyAssetIndex = nearbyAssetInfo.index
            const { features } = updatedData
            const lineFeature = features[nearbyAssetIndex]

            const nearbyAssetFeature = nearbyAssetInfo.object
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
                console.log('PICKING RADIUS IN PIXELS', PICKING_RADIUS_IN_PIXELS)

                let vertexIndex
                if (nearestVertexDistance < PICKING_RADIUS_IN_PIXELS) {
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
                  /*
                  // Insert new coordinate after index, remove 0 items
                  lineXYs.splice(nearestPointOnLinePriorIndex, 0, nearestPointOnLinePosition)
                  lineGeometry.coordinates = newXYs
                  lineFeature.geometry = produce(lineGeometry, draft => {
                    draft.coordinates.splice(nearestPointOnLinePriorIndex, 0, nearestPointOnLinePosition)
                  })
                  lineFeature.geometry = {
                    type: 'LineString',
                    coordinates: newXYs,
                  }
                  updatedData[nearbyAssetIndex] = {
                    type: 'Feature',
                    geometry: {
                      type: 'LineString',
                      coordinates: newXYs,
                    },
                    properties: lineFeature.properties,
                  }
                  */
                  // lineFeature.properties.xyz = 1
                  updatedData = produce(updatedData, draft => {
                    draft.features[nearbyAssetIndex].geometry.coordinates = newXYs
                  })
                  // 6.3 update feature geometry
                  // see above
                  // 6.4 update downstream connection vertices
                  const lineAssetId = lineFeature.properties.id
                  if (!busId) busId = makeBusId()
                  dispatch(insertAssetVertex(lineAssetId, nearestVertexIndex, {
                    busId,
                  }))

                  // for each connection below index
                  // bump it forward
                  // connect to index
                }

                //
                // 7. add connection
              }
            }
          }
        }
        dispatch(setEditingAsset(editingAsset))
      } else if (editType === 'finishMovePosition') {
        console.log('finishMovePosition', event)
        const { position, positionIndexes, featureIndexes } = editContext
        const { features } = updatedData
        const asset = features[featureIndexes[0]]
        const assetId = asset.properties.id

        switch (asset.properties.typeCode) {
          case ASSET_TYPE_CODE_LINE: {
            const assetVertexCount = asset.geometry.coordinates.length
            const assetVertexIndex = positionIndexes[0]
            if (assetVertexIndex === 0 || assetVertexIndex === assetVertexCount - 1) {
              // endpoints only
              const screenCoords = deckGL.current.viewports[0].project(position)
              const nearbyBusInfos = deckGL.current.pickMultipleObjects({
                x: screenCoords[0],
                y: screenCoords[1],
                layerIds: [BUSES_MAP_LAYER_ID],
                radius: PICKING_RADIUS_IN_PIXELS,
                depth: PICKING_DEPTH,
              })
              const nearbyBusFeatures = nearbyBusInfos.map(info => info.object)
              // TODO: Consider whether we need to filter bus features instead of this
              // TODO: This assumes that nearbyBusFeatures is in sorted order
              // TODO: Case length >= 2 happens when moving endpoint from nowhere to bus
              const newBusIndex = nearbyBusFeatures.length === 1 ? 0 : 1
              const newBusId = (nearbyBusFeatures.length) ?
                  nearbyBusFeatures[newBusIndex].properties.id :
                  makeBusId()
              const newConnection = { busId: newBusId, attributes: {} }
              dispatch(setAssetConnection(assetId, assetVertexIndex, newConnection))
            }
            break
          }
          default: {}
        }
      } else if (editType === 'addFeature') {
        const [featureIndex, feature] = getFeaturePack(event)
        if (!editingAsset.id) {
          editingAsset = makeEditingAsset(assetTypeCode)
        } else if (isAddingLine) {
          const vertexCount = feature.geometry.coordinates.length
          if (!editingAsset.connections[vertexCount - 1]) {
            editingAsset = produce(editingAsset, draft => {
              draft.connections[vertexCount - 1] = { busId: makeBusId() }
            })
          }
        }
        const assetId = editingAsset.id
        updateFeature(feature, editingAsset)
        // TODO: Consider combining into a single dispatch
        dispatch(setAsset(editingAsset))
        dispatch(fillAssetName(assetId, feature))
        dispatch(setFocusingAssetId(assetId))
        dispatch(setSelectedAssetIndexes([featureIndex]))
        dispatch(setSketchMode(SKETCH_MODE_ADD))  // Add one at a time
      } else if (editType === 'removePosition') {
        console.log('edit remove')
        const { featureIndexes, positionIndexes } = editContext
        const { features } = updatedData
        const positionIndex = positionIndexes[0]
        const featureIndex = featureIndexes[0]
        const feature = features[featureIndex]
        const geometry =  feature['geometry']
        if (feature.properties.typeCode === ASSET_TYPE_CODE_LINE) {
          const coordinatesLength = geometry.coordinates.length
          const assetId = feature.properties.id
          if (coordinatesLength === positionIndex || positionIndex === 0) {
            // it is one endpoint of line
            dispatch(removeLineEndPoint(
              assetId, positionIndex, coordinatesLength - 1))
            // TODO: FIX
            dispatch(setSelectedAssetIndexes([]))
          }
        }
      }

      dispatch(setAssetsGeoJson(updatedData))
    }

    function handleAssetHover(info) {
      const { x, y, object } = info
      if (object) {
        const assetId = object.properties.id
        setHoverInfo({ x, y, text: assetId })
      } else {
        setHoverInfo(null)
      }
    }

    function handleAssetClick(info, event) {
      console.log('asset click', info, event)
      const targetAssetId = info.object && info.object.properties.id
      if (!targetAssetId) {
        return
      }
      if (sketchMode === SKETCH_MODE_DELETE) {
        dispatch(deleteAsset(targetAssetId))
      } else if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
        dispatch(setSelectedAssetIndexes([info.index]))
        // dispatch(setSelectedBusIndexes([]))
        dispatch(setFocusingAssetId(targetAssetId))
      }
    }

    /*
    function handleLayerDoubleClick(event) {
      console.log('layer double click', event)
    }
    */

    function handleLayerStopDragging(event) {
      console.log('layer stop dragging', event)
      /*
      // TODO: Fix side effects and make code easier to read
      const screenCoords = event.screenCoords
      console.log('*********************', event)

      const busInfos = deckGL.current.pickMultipleObjects({
        x: screenCoords[0],
        y: screenCoords[1],
        layerIds: [BUSES_MAP_LAYER_ID],
        radius: PICKING_RADIUS_IN_PIXELS,
        depth: PICKING_DEPTH,
      })
      const vertex = getPickedEditHandle(event.picks)

      if (sketchMode === SKETCH_MODE_EDIT) {
        console.log(vertex)
        console.log(busInfos)
        console.log(vertex.picks)
        console.log(busInfos.length === 0)
        let asset
        if (busInfos.length === 0 && event.picks) {
          asset = event.picks[1].object.properties
          dispatch(setAssetConnection(asset.id, 0, ''))
          console.log('== dispatched')
        } else {
          asset = event.picks[1].object.properties
          console.log(asset)
          if (!asset.typeCode === 'm') return
          console.log(busInfos[0].object.properties)
          dispatch(setAssetConnection(asset.id, 0, {
            busId: busInfos[0].object.properties.id,
          }))
        }
      }
      */
    }

    return new CustomEditableGeoJsonLayer({
      id: ASSETS_MAP_LAYER_ID,
      data: assetsGeoJson,
      mode: mapMode,
      selectedFeatureIndexes: selectedAssetIndexes,
      autoHighlight: true,
      highlightColor: colors.assetHighlight,
      pickable: true,
      stroked: false,
      getRadius: feature => {
        return ASSET_RADIUS_IN_METERS_BY_CODE[feature.properties.typeCode]
      },
      getLineWidth: ASSET_LINE_WIDTH_IN_METERS,
      getFillColor: (feature, isSelected) => {
        return isSelected ? colors.assetSelect : colors.asset
      },
      getLineColor: (feature, isSelected) => {
        return isSelected ? colors.assetSelect : colors.asset
      },
      onHover: handleAssetHover,
      onClick: handleAssetClick,
      onEdit: handleAssetEdit,
      // onDoubleClick: handleLayerDoubleClick,
      onStopDragging: handleLayerStopDragging,
    })
  }

  function getBusesMapLayer() {
    function handleBusHover(info) {
      const { x, y, object } = info
      if (object) {
        const busId = object.properties.id
        setHoverInfo({ x, y, text: busId })
      } else {
        setHoverInfo(null)
      }
    }
    function handleBusClick(info, event) {
      console.log('bus click', info, event)
      const targetBusId = info.object && info.object.properties.id
      const targetAssetId = assetIdByBusId[targetBusId]

      // If we are not adding a specific type of asset,
      /*
      if (sketchMode === SKETCH_MODE_ADD) {
        const assetInfos = deckGL.current.pickMultipleObjects({
          x: info.x,
          y: info.y,
          layerIds: [ASSETS_MAP_LAYER_ID],
          radius: PICKING_RADIUS_IN_PIXELS,
          depth: PICKING_DEPTH,
        })
        console.log(assetInfos)
        if (assetInfos.length > 0 && assetInfos[0].object.properties.typeCode === 'm') {
          const asset = assetInfos[0].object.properties
          dispatch(setAssetConnection(asset.id, 0, {
            busId: targetBusId,
          }))
        }
      }
      */
      if (!sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
        if (targetAssetId) {
          dispatch(setFocusingAssetId(targetAssetId))
          dispatch(setFocusingBusId(targetBusId))
        }
      }
    }

    return new EditableGeoJsonLayer({
      id: BUSES_MAP_LAYER_ID,
      data: busesGeoJson,
      mode: ViewMode,
      selectedFeatureIndexes: selectedBusIndexes,
      autoHighlight: true,
      highlightColor: colors.busHighlight,
      pickable: true,
      stroked: false,
      getRadius: BUS_RADIUS_IN_METERS,
      getFillColor: (feature, isSelected) => {
        return isSelected ? colors.busSelect : colors.bus
      },
      onHover: handleBusHover,
      onClick: handleBusClick,
    })
  }

  return {
    mapLayers: [
      getAssetsMapLayer(),
      getBusesMapLayer(),
    ],
    handleMapKey(event) {
      event.persist()  // Populate event with extra signals
      console.log('map key', event)
      switch (event.key) {
        case 'Escape': {
          if (sketchMode.startsWith(SKETCH_MODE_ADD_ASSET)) {
            dispatch(setSketchMode(SKETCH_MODE_ADD))
          }
          break
        }
        case 'Delete':
        case 'Backspace': {
          if (sketchMode in [SKETCH_MODE_ADD, SKETCH_MODE_EDIT]) {
            dispatch(deleteAsset(focusingAssetId))
          }
          break
        }
        default: { }
      }
    },
    handleMapClick(info, event) {
      console.log('map click', info, event)
    },
  }
}
