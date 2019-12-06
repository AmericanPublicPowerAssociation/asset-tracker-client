import React, { useState, useRef } from 'react'
import DeckGL from '@deck.gl/react'
import { MapController} from 'deck.gl';
import { GeoJsonLayer } from '@deck.gl/layers'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  ViewMode,
} from '@nebula.gl/edit-modes'
import { StaticMap } from 'react-map-gl'
import FinishDrawing from './FinishDrawing'
import {
  ASSET_TYPE_BY_ID,
  GEOJSON,
  VIEW_STATE } from '../constants'


function AssetsMap(props) {
  const {
    isSketching,
    sketchingAssetType,
    selectedFeatureIndexes,
    assets,
    setIsWithDetails,
    setAssets,
    setSelectedFeatureIndexes,
    setFocusingAssetId,
  } = props
  const deckRef = useRef(null)
  const [geoJson, setGeoJson] = useState(GEOJSON)
  const [assetTypeCount, setAssetTypeCount] = useState(1)
  const layers = []
  let deckHandleEvent, polygonClickHandle

  if (deckRef && deckRef.current) {
    deckHandleEvent = deckRef.current.deck.viewManager.controllers['default-view'].handleEvent
  }

  class MyController extends MapController {
    constructor(options={}) {
      super(options)
      this.events = ['keyup']
    }

    handleEvent(event) {
      if (event.type === 'doubletap') {
        setSelectedFeatureIndexes([])
      }
      else
        super.handleEvent(event)
    }
  }

  const mode = sketchingAssetType ? {
    l: class myLineMode extends DrawLineStringMode {
      handleClickAdapter(event, props){
        return super.handleClickAdapter(event, props)
      }
    },
    t: class MyPointMode extends DrawPointMode{},
    s: class MyPolygonMode extends DrawPolygonMode{
      handleClickAdapter(event, props) {
        return super.handleClickAdapter(event, props)
      }  
    },
  }[sketchingAssetType] : ViewMode

  console.log(geoJson)
  if (isSketching) {
    layers.push(new EditableGeoJsonLayer({
      id: 'editable-geojson-layer',
      data: geoJson,
      mode,
      selectedFeatureIndexes: selectedFeatureIndexes,
      lineWidthMinPixels: 3,
      getFillColor: (feature, isSelected, mode) => {
        if (isSelected) return [0, 0, 0, 90]
        return [0, 0, 0, 150]
      },
      getLineColor: (feature, isSelected, mode) => {
        if (isSelected) return [245, 0, 87]
        return [0, 0, 0]
      },
      getTentativeLineColor: (f) => {
        if (sketchingAssetType === 'l')
          return
        return [0x90, 0x90, 0x90, 0xff]
      },
      // editHandlePointRadiusScale: 2,
      onEdit: ({editType, editContext, updatedData}) => {
        console.log(editType)
        console.log(JSON.stringify(editContext))
        console.log(JSON.stringify(updatedData))

        
        const { featureIndexes } = editContext
        const sketchingAssetTypeName = ASSET_TYPE_BY_ID[sketchingAssetType].name
        if(editType === 'addPosition') {
          if (sketchingAssetType === 'l') {
            if(featureIndexes.length == 1) {
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
          if (sketchingAssetType === 'l') {
            // Continue sketching line
            setSelectedFeatureIndexes(featureIndexes)
          }
          featureIndexes.forEach(i => {
            const p = updatedData.features[i].properties
            p['id'] = assetTypeCount
            p['type'] = sketchingAssetType
            setAssetTypeCount(assetTypeCount + 1)
          })
          setAssets([...assets, {
            id: assetTypeCount,
            type: sketchingAssetType,
            name: `${sketchingAssetTypeName} ${assetTypeCount}`,
          }])
        }

        setGeoJson(updatedData)
      },
    }))
  } else {
    layers.push(new GeoJsonLayer({
      id: 'geojson-layer',
      data: geoJson,
      pickable: true,
      getRadius: 3,
    }))
  }

  return (
    <div>
      <DeckGL
        ref={deckRef}
        initialViewState={VIEW_STATE}
        controller={{type:MyController}}
        layers={layers}
        pickingRadius={10}
        onClick={e => {
          if (e.picked) {
            if (sketchingAssetType === undefined)
              setSelectedFeatureIndexes([e.index])
            setFocusingAssetId(e.object.properties.id)
            if (!isSketching) {
              setIsWithDetails(true)
            }
          }
        }}
      >
        <StaticMap mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} />
      </DeckGL>
      <FinishDrawing
        deckHandleEvent={deckHandleEvent}
        sketchingAssetType={sketchingAssetType}
        selectedFeatureIndexes={selectedFeatureIndexes}
        setSelectedFeatureIndexes={setSelectedFeatureIndexes} 
        features={geoJson.features} />
    </div>
  )
}

export default AssetsMap
