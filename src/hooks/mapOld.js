import getNearestPointOnLine from '@turf/nearest-point-on-line'
import {
  setAssetConnection,
  setAssetGeoJson,
  setTemporaryAsset,
} from '../actions'
import {
  SKETCH_MODE_ADD,
  ASSET_TYPE_CODE_METER,
  ASSET_TYPE_CODE_TRANSFORMER,
} from '../constants'
import {
  getAssetsByLatLng,
  getAssetsByScreenPosition,
  getBusesByLatLng,
  getDeckGLNearbyObjects,
} from '../routines'

    function handleAssetEdit(event) {
      if (editType === 'addTentativePosition') {
        if (isAddingLine) {
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
      }
    }
  }


  // connectivity meter to line
  if (temporaryAsset.typeCode === ASSET_TYPE_CODE_METER) {
    const position = feature.geometry.coordinates
    const screenCoords = deckGL.current.viewports[0].project(position)
    const nearbyAssetInfos = getDeckGLNearbyObjects({
      deckGL, screenCoords, layerId: ASSETS_MAP_LAYER_ID,
    })
    const nearbyBusInfos = getDeckGLNearbyObjects({
      deckGL, screenCoords, layerId: BUSES_MAP_LAYER_ID,
    })
    // const nearbyAssetFeatures = nearbyAssetInfos.map(info => info.object)
    const nearbyBusFeatures = nearbyBusInfos.map(info => info.object)

    let busId
    if (nearbyBusFeatures.length) {
      busId = nearbyBusFeatures[0].properties.id
      temporaryAsset.connections[0].busId = busId
    }
    else {
      busId = temporaryAsset.connections[0].busId
    }
    const nearbyAssetInfo = nearbyAssetInfos.find(info => !info.object.properties.guideType)

    if (nearbyAssetInfo) {
      const nearbyAssetIndex = nearbyAssetInfo.index
      const { features } = updatedData
      const lineFeature = features[nearbyAssetIndex]

      const nearbyAssetFeature = nearbyAssetInfo.object
      console.log(nearbyAssetFeature.properties.typeCode === ASSET_TYPE_CODE_LINE)
      if (!nearbyBusFeatures.length) {
        console.log('NEARBY ASSET && NOT NEARBY BUS')
        if (nearbyAssetFeature.properties.typeCode === ASSET_TYPE_CODE_LINE) {
          const lineMapVertices = nearbyAssetFeature.geometry.coordinates

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
          const vertexOrderedByNearesDistance = distances.map((x, i) => [x, i]).sort((r, a) => (a[0] < r[0] ? a : r))
          console.log(vertexOrderedByNearesDistance)
          const nearestVertexIndex = argMin(distances)
          console.log('NEAREST VERTEX INDEX', nearestVertexIndex)

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

            console.log(feature)
            console.log('BEFORE', oldXYs)
            console.log('AFTER', newXYs)
            console.log(updatedData)

            updatedData = produce(updatedData, draft => {
              draft.features[nearbyAssetIndex].geometry.coordinates = newXYs
            })
            // 6.3 update feature geometry
            const busOffsetToDontOverlap = (BUS_RADIUS_IN_METERS + 3)
            const placeMeterDown = moveLatitudeInMeters(nearestPointOnLinePosition, -busOffsetToDontOverlap)

            updatedData.features[featureIndex].geometry.coordinates = placeMeterDown
            // see above
            // 6.4 update downstream connection vertices
            const lineAssetId = lineFeature.properties.id
            if (!busId) busId = makeBusId()

            if (vertexOrderedByNearesDistance.length >= 2) {
              if (vertexOrderedByNearesDistance[1][1] > vertexOrderedByNearesDistance[0][1]) {
                dispatch(insertAssetVertex(lineAssetId, vertexOrderedByNearesDistance[0][1], {
                  busId,
                }))
              }
              else {
                dispatch(insertAssetVertex(lineAssetId, vertexOrderedByNearesDistance[1][1], {
                  busId,
                }))
              }
            } else {
              dispatch(insertAssetVertex(lineAssetId, nearestVertexIndex, {
                busId,
              }))
            }


            // for each connection below index
            // bump it forward
            // connect to index
          }
        }
      }
    }
  }
