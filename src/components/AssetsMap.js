import React, { useState } from 'react'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import {
  DrawLineStringMode,
  DrawPointMode,
  DrawPolygonMode,
  ViewMode,
} from '@nebula.gl/edit-modes'
import { StaticMap } from 'react-map-gl'
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
  const [geoJson, setGeoJson] = useState(GEOJSON)
  const [assetTypeCount, setAssetTypeCount] = useState(1)
  const layers = []

  const mode = sketchingAssetType ? {
    l: DrawLineStringMode,
    t: DrawPointMode,
    s: DrawPolygonMode,
  }[sketchingAssetType] : ViewMode

  if (isSketching) {
    layers.push(new EditableGeoJsonLayer({
      id: 'editable-geojson-layer',
      data: geoJson,
      mode,
      selectedFeatureIndexes: selectedFeatureIndexes,
      lineWidthMinPixels: 3,
      // editHandlePointRadiusScale: 2,
      onEdit: ({editType, editContext, updatedData}) => {
        console.log(editType)
        console.log(JSON.stringify(editContext))
        console.log(JSON.stringify(updatedData))

        if (editType === 'addFeature') {
          const { featureIndexes } = editContext
          const sketchingAssetTypeName = ASSET_TYPE_BY_ID[sketchingAssetType].name
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
      getRadius: 10,
    }))
  }

  return (
    <DeckGL
      initialViewState={VIEW_STATE}
      controller={{
        // doubleClickZoom: false,
      }}
      layers={layers}
      pickingRadius={10}
      onClick={e => {
        // console.log(info)
        if (e.picked) {
          setFocusingAssetId(e.object.properties.id)
          if (!isSketching) {
            setIsWithDetails(true)
          }
        }
      }}
    >
      <StaticMap mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} />
    </DeckGL>
  )
}

export default AssetsMap
