import React, { useState } from 'react'
import produce from 'immer'
import DeckGL from '@deck.gl/react'
import { MapController} from 'deck.gl'
import { GeoJsonLayer } from '@deck.gl/layers'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  ModifyMode,
  TranslateMode,
  ViewMode,
} from '@nebula.gl/edit-modes'
import { StaticMap } from 'react-map-gl'
import translateFeature from '@turf/transform-translate'
import FinishDrawing from './FinishDrawing'
import NavigationBar from './NavigationBar'
import {
  ASSET_TYPE_BY_ID,
  SKETCHING_MODE_ADD,
  SKETCHING_MODE_EDIT,
  SKETCHING_MODE_CONNECT,
  SKETCHING_MODE_SELECT,
  VIEW_STATE,
} from '../constants'


export default function AssetsMap(props) {
  const {
    isSketching,
    sketchingMode,
    sketchingAssetType,
    sketchingEditType,
    selectedFeatureIndexes,
    assetById,
    // setIsWithDetails,
    geoJson,
    setHistory,
    setGeoJson,
    setAssetById,
    setSelectedFeatureIndexes,
    setFocusingAssetId,
    mapStyle,
  } = props
  // const deckRef = useRef(null)
  const [viewport, setViewport] = useState(VIEW_STATE)
  const [assetTypeCount, setAssetTypeCount] = useState(1)
  const layers = []
  // let deckHandleEvent
  // let polygonClickHandle

  /*
  if (deckRef && deckRef.current) {
    deckHandleEvent = deckRef.current.deck.viewManager.controllers['default-view'].handleEvent
  }
  */


  class MyController extends MapController {
    constructor(options={}) {
      super(options)
      this.events = ['doubletap', 'keyup']
    }

    handleEvent(event) {
      if (event.type === 'keyup' && event.key === 'Enter'){
        setSelectedFeatureIndexes([])
        setFocusingAssetId(undefined)
      }
      else if (event.type === 'doubletap') {
        setSelectedFeatureIndexes([])
        setFocusingAssetId(undefined)
      } else {
        super.handleEvent(event)
      }
    }
  }

  let mode = ViewMode

  if (
    sketchingMode === SKETCHING_MODE_ADD &&
    sketchingAssetType 
  ) {
    mode = {
      l: class MyLine extends DrawLineStringMode {
        handleClickAdapter(event, props) {
          const output = super.handleClickAdapter(event, props)
          return output
        }
      },
      b: DrawPointMode,
      t: DrawPointMode,
      s: DrawPolygonMode,
    }[sketchingAssetType]
  }
  else if (
    sketchingMode === SKETCHING_MODE_EDIT &&
    sketchingEditType
  ) {
    mode = {
      m: ModifyMode,
      t: TranslateMode,
    }[sketchingEditType]
  }


  if (isSketching) {
    layers.push(new EditableGeoJsonLayer({
      id: 'editable-geojson-layer',
      data: geoJson,
      mode,
      selectedFeatureIndexes: selectedFeatureIndexes,
      lineWidthMinPixels: 3,
      getRadius: 10,
      getLineWidth: 5,
      getFillColor: (feature, isSelected, mode) => {
        if (isSelected) {
          return [0, 0, 0, 90]
        }
        return [0, 0, 0, 150]
      },
      getLineColor: (feature, isSelected, mode) => {
        if (isSelected) {
          return [245, 0, 87]
        }
        return [0, 0, 0]
      },
      getTentativeLineColor: (f) => {
        /*
        if (sketchingAssetType === 'l') {
          return
        }
        */
        return [0x90, 0x90, 0x90, 0xff]
      },
      /*
      updateTriggers: {
        getFillColor: [sketchingMode],
      },
      */
      // editHandlePointRadiusScale: 2,
      onEdit: ({editType, editContext, updatedData}) => {
        const { featureIndexes } = editContext
        if (editType === 'addPosition') {
          if (sketchingAssetType === 'l') {
            if (featureIndexes.length === 1) {
              const curFeatureIndex = featureIndexes[0]
              const feature = updatedData.features[curFeatureIndex]
              const coordinates = feature.geometry.coordinates
              if (coordinates.length > 2){
                // remove last repeated point when double clicking in line mode
                const length = coordinates.length
                const lastCoord = coordinates[length-1]
                const secondLastCoord = coordinates[length-2]
                if (lastCoord[0] === secondLastCoord[0] && 
                    lastCoord[1] === secondLastCoord[1])
                  feature.geometry.coordinates = coordinates.slice(0, coordinates.length-1)
              }
            } 
          }
        }

        if (editType === 'addFeature') {
          const sketchingAssetTypeName = ASSET_TYPE_BY_ID[sketchingAssetType]['name']
          if (sketchingAssetType === 'l') {
            // Continue sketching line
            setSelectedFeatureIndexes(featureIndexes)
          }
          const id = assetTypeCount
          featureIndexes.forEach(i => {
            const p = updatedData.features[i].properties
            p['id'] = id
            p['type'] = sketchingAssetType
            setAssetTypeCount(assetTypeCount + 1)
          })
          setAssetById(produce(assetById, _ => {
            _[id] = {
              id: id.toString(),
              type: sketchingAssetType,
              name: `${sketchingAssetTypeName} ${assetTypeCount}`,
            }
          }))
          setFocusingAssetId(id)
        }

        setHistory( 
          produce( draft => {
            draft.push({
              editType,
              updatedData
            })
            draft = draft.slice(0, 10)
          })
        )
        setGeoJson(updatedData)
      },
    }))
  } else {
    layers.push(new GeoJsonLayer({
      id: 'geojson-layer',
      data: geoJson,
      pickable: true,
      getRadius: 10,
      getLineWidth: 5,
      getFillColor: [0, 0, 0, 150],
      getLineColor: [0, 0, 0],
    }))
  }

  const _onViewStateChange = ({viewState}) => {
    const {
      latitude,
      longitude,
      zoom,
      bearing,
      pitch,
      width,
      height} = viewState
    setViewport({latitude, longitude, zoom, bearing, pitch, width, height})
  }

  // const busFeatureById = {}
  const busFeatures = []
  const temporaryFeatures = geoJson.features
  for (let i = 0; i < temporaryFeatures.length; i++) {
    const f = temporaryFeatures[i]
    const geometry = f.geometry
    const geometryType = geometry.type
    const geometryCoordinates = geometry.coordinates
    const assetId = f.properties.id
    const asset = assetById[assetId]
    const busByIndex = asset.busByIndex

    if (!busByIndex) {
      continue
    }

    const busEntries = Object.entries(busByIndex)
    const busIndices = Object.keys(busByIndex)
    const busCount = busEntries.length

    switch(geometryType) {
      case 'Point': {
        const busAngleIncrement = 360 / busCount

        for (let i = 0; i < busCount; i++) {
          const busIndex = busIndices[i]
          const bus = busByIndex[busIndex]
          const busId = bus.id
          const busAngle = busAngleIncrement * i

          busFeatures.push({
            type: 'Feature',
            properties: {
              id: busId,
            },
            geometry: translateFeature(f, 0.02, busAngle).geometry,
          })
        }
        break
      }
      case 'LineString': {
        for (let i = 0; i < busCount; i++) {
          const busIndex = busIndices[i]
          const bus = busByIndex[busIndex]
          const busId = bus.id
          const geometryXY = geometryCoordinates[busIndex]
          busFeatures.push({
            type: 'Feature',
            properties: {
              id: busId,
            },
            geometry: {
              type: 'Point',
              coordinates: geometryXY,
            },
          })
        }
        break
      }
      case 'Polygon': {
        break
      }
      default: {
        break
      }
    }
  }

  layers.push(new GeoJsonLayer({
    id: 'bus-geojson-layer',
    data: {
      type: 'FeatureCollection',
      features: busFeatures,
    },
    pickable: true,
    getRadius: 5,
    getFillColor: [63, 81, 181],
    getLineColor: [0, 255, 255],
    getLineWidth: 2,
  }))

  return (
    <div>
      <DeckGL
        // ref={deckRef}
        viewState={viewport}
        onViewStateChange={_onViewStateChange}
        controller={{type:MyController}}
        layers={layers}
        pickingRadius={10}
        onClick={e => {
          if (e.picked) {
            if (sketchingMode === SKETCHING_MODE_SELECT ||
                sketchingMode === SKETCHING_MODE_EDIT) {
              setSelectedFeatureIndexes([e.index])
              setFocusingAssetId(e.object.properties.id)
            } else if (sketchingMode === SKETCHING_MODE_CONNECT) {
              const selectedAssetId = e.object.properties.id
              const selectedAsset = assetById[selectedAssetId]
              const selectedAssetType = selectedAsset.type

              if (selectedFeatureIndexes.length === 0) {
                if (selectedAssetType !== 'b' && selectedAssetType !== 's' && selectedAssetType !== 'S') {
                  setSelectedFeatureIndexes([e.index])
                  setFocusingAssetId(e.object.properties.id)
                }
              } else {
                const assetId = geoJson.features[selectedFeatureIndexes[0]].properties.id
                // const asset = assetById[assetId]

                if (assetId === selectedAssetId) {
                  return
                }

                if (selectedAsset.type === 'b') {
                  setAssetById(produce(assetById, _ => {
                    const asset1 = _[assetId]
                    if (!asset1.electricalConnections) {
                      asset1.electricalConnections = {}
                    }
                    // asset.electricalConnections[selectedAssetId] = {}
                    asset1.electricalConnections[selectedAssetId] = true

                    const asset2 = _[selectedAssetId] 
                    if (!asset2.electricalConnections) {
                      asset2.electricalConnections = {}
                    }
                    // asset2.electricalConnections[selectedAssetId] = {}
                    asset2.electricalConnections[assetId] = true

                  }))
                  setSelectedFeatureIndexes([])
                }

              }
            }
            /*
            if (!isSketching) {
              setIsWithDetails(true)
            }
            */
          }
        }}
      >
          <StaticMap
            {...viewport}
            mapStyle={mapStyle}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
          </StaticMap>
      </DeckGL>
      <FinishDrawing
        sketchingMode={sketchingMode}
        sketchingAssetType={sketchingAssetType}
        selectedFeatureIndexes={selectedFeatureIndexes}
        setSelectedFeatureIndexes={setSelectedFeatureIndexes} 
        features={geoJson.features} />
    </div>
  )
}
