import React, { useState } from 'react'
import DeckGL from '@deck.gl/react'
import produce from 'immer'
import { MapController} from 'deck.gl';
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
import FinishDrawing from './FinishDrawing'
import NavigationBar from './NavigationBar'
import {
  ASSET_TYPE_BY_ID,
  SKETCHING_MODE_ADD,
  SKETCHING_MODE_EDIT,
  SKETCHING_MODE_CONNECT,
  SKETCHING_MODE_SELECT,
  VIEW_STATE,
  DARK_MAP_STYLE,
  STREETS_MAP_STYLE,
  SATELLITE_STREETS_MAP_STYLE,
  BASE_MAP_STYLE_NAME,
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
  } = props
  // const deckRef = useRef(null)
  const [viewport, setViewport] = useState(VIEW_STATE)
  const [assetTypeCount, setAssetTypeCount] = useState(1)
  const [mapstyle, setMapstyle] = useState(BASE_MAP_STYLE_NAME)
  const layers = []
  // let deckHandleEvent
  // let polygonClickHandle

  /*
  if (deckRef && deckRef.current) {
    deckHandleEvent = deckRef.current.deck.viewManager.controllers['default-view'].handleEvent
  }
  */

  const baseMapStyleTypes = {
    dark: {
      style: DARK_MAP_STYLE,
      nextStyleName: 'streets',
    },
    streets: {
      style: STREETS_MAP_STYLE,
      nextStyleName: 'satelliteStreets',
    },
    satelliteStreets: {
      style: SATELLITE_STREETS_MAP_STYLE,
      nextStyleName: 'dark',
    }
  }

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
    l: DrawLineStringMode,
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
      'm': ModifyMode,
      't': TranslateMode,
    }[sketchingEditType]
  }


  if (isSketching) {
    layers.push(new EditableGeoJsonLayer({
      id: 'editable-geojson-layer',
      data: geoJson,
      mode,
      selectedFeatureIndexes: selectedFeatureIndexes,
      lineWidthMinPixels: 3,
      getRadius: 7,
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
      getRadius: 7,
      getLineWidth: 5,
    }))
  }

  const onViewStateChange = ({viewState}) => {
    const {
      latitude,
      longitude,
      zoom,
      bearing,
      pitch } = viewState
    setViewport({latitude, longitude, zoom})
  }

  return (
    <div>
      <DeckGL
        // ref={deckRef}
        viewState={viewport}
        onViewStateChange={onViewStateChange}
        controller={{type:MyController, modeConfig:{drawAtFront: true}}}
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
            mapStyle={baseMapStyleTypes[mapstyle]['style']}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
            <NavigationBar
              setViewport={setViewport}
              setMapstyle={setMapstyle}
              mapstyle={mapstyle}
              nextMapstyle={baseMapStyleTypes[mapstyle]['nextStyleName']}/>
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
