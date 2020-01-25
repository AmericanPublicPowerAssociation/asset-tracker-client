import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'
import { EditableGeoJsonLayer } from 'nebula.gl'
import {
  addAssetConnection,
  setAsset,
  setAssetsGeojson,
  setFocusingAssetId,
  // setFocusingBusId,
  setMapViewState,
} from '../actions'
import {
  ADD_LINE,
  BUS_RADIUS_IN_METERS,
  LINE_WIDTH_IN_METERS,
  MAP_STYLE_BY_NAME,
  PICKING_RADIUS_IN_PIXELS,
  POINT_RADIUS_IN_METERS,
} from '../constants'
import {
  getMapMode,
  makeAsset,
} from '../routines'
import {
  getAssetIdByBusId,
  getAssetsGeoJson,
  getBusesGeoJson,
  getColors,
  // getFocusingAssetId,
  // getFocusingBusId,
  getMapStyleName,
  getMapViewState,
} from '../selectors'

const {
  REACT_APP_MAPBOX_TOKEN,
} = process.env

export default function AssetsMap(props) {
  const {
    sketchMode,
    selectedAssetIndexes,
    lineBusId,
    setSelectedAssetIndexes,
    setLineBusId,
    onAddLineEnd,
  } = props
  const dispatch = useDispatch()
  const mapStyleName = useSelector(getMapStyleName)
  const mapViewState = useSelector(getMapViewState)
  const assetIdByBusId = useSelector(getAssetIdByBusId)
  const assetsGeoJson = useSelector(getAssetsGeoJson)
  const busesGeoJson = useSelector(getBusesGeoJson)
  const colors = useSelector(getColors)
  // const focusingAssetId = useSelector(getFocusingAssetId)
  // const focusingBusId = useSelector(getFocusingBusId)
  const mapLayers = []
  const mapMode = getMapMode(sketchMode)

  function handleViewStateChange({viewState}) {
    // Update the map viewport
    dispatch(setMapViewState(viewState))
  }

  /*
  function handleMapClick(info, event) {
    const objectProperties = info.object.properties
    const objectId = objectProperties.id
    if (!objectId) return

    switch(info.layer.id) {
      case ASSETS_MAP_LAYER_ID: {
        selectedAssetId = objectId
        break
      }
      case BUSES_MAP_LAYER_ID: {
        break
      }
      default: { }
    }

    console.log('assetId =', selectedAssetId, 'busId =', selectedBusId)
    // dispatch(setFocusingBusId(selectedBusId))
    dispatch(setFocusingAssetId(selectedAssetId))
  }
  */

  function handleAssetsGeoJsonClick(info, event) {
    const assetId = info.object.properties.id
    assetId && dispatch(setFocusingAssetId(assetId))
  }

  function handleAssetsGeoJsonEdit({editType, editContext, updatedData}) {
    console.log('handleAssetsGeoJsonEdit', editType, editContext, updatedData)
    // If a feature is being added for the first time,
    if (editType === 'addFeature') {
      const features = updatedData.features
      const { featureIndexes } = editContext
      // Add an asset corresponding to the feature
      const asset = makeAsset(sketchMode, lineBusId)
      dispatch(setAsset(asset))
      // Store assetId in feature
      const assetId = asset.id
      for (let i = 0; i < featureIndexes.length; i++) {
        const featureIndex = featureIndexes[i]
        const feature = features[featureIndex]
        feature.properties.id = assetId
      }
      // If the new feature is a line,
      if (sketchMode === ADD_LINE) {
        // Have subsequent clicks extend the same line
        setSelectedAssetIndexes(featureIndexes)
      }
      dispatch(setFocusingAssetId(assetId))  // Show details for the new asset
    }
    dispatch(setAssetsGeojson(updatedData))  // Update geojson for assets
  }

  function handleBusesGeoJsonClick(info, event) {
    const busId = info.object.properties.id
    const assetId = assetIdByBusId[busId]

    if (sketchMode === ADD_LINE) {
      // If we already started the line,
      if (selectedAssetIndexes.length) {
        // Save the connection
        const lineFeature = assetsGeoJson.features[selectedAssetIndexes[0]]
        const lineAssetId = lineFeature.properties.id
        dispatch(addAssetConnection(lineAssetId, busId))
        // End the line
        onAddLineEnd()
      } else {
        setLineBusId(busId)
      }
    }

    // busId && dispatch(setFocusingBusId(busId))
    assetId && dispatch(setFocusingAssetId(assetId))
  }

  mapLayers.push(new EditableGeoJsonLayer({
    id: 'assets-geojson-layer',
    data: assetsGeoJson,
    mode: mapMode,
    pickable: true,
    stroked: false,
    autoHighlight: sketchMode !== ADD_LINE,
    highlightColor: colors.assetHighlight,
    selectedFeatureIndexes: selectedAssetIndexes,
    getRadius: POINT_RADIUS_IN_METERS,
    getLineWidth: LINE_WIDTH_IN_METERS,
    getFillColor: colors.asset,
    getLineColor: colors.asset,
    // onHover: (info, event) => console.log(info, event),
    onClick: handleAssetsGeoJsonClick,
    onEdit: handleAssetsGeoJsonEdit,
  }))

  mapLayers.push(new GeoJsonLayer({
    id: 'buses-geojson-layer',
    data: busesGeoJson,
    pickable: true,
    stroked: false,
    autoHighlight: true,
    highlightColor: colors.busHighlight,
    getRadius: BUS_RADIUS_IN_METERS,
    getFillColor: colors.bus,
    // onHover: (info, event) => console.log(info, event),
    onClick: handleBusesGeoJsonClick,
  }))

  return (
    <DeckGL
      controller={true}
      layers={mapLayers}
      viewState={mapViewState}
      pickingRadius={PICKING_RADIUS_IN_PIXELS}
      onViewStateChange={handleViewStateChange}
    // onClick={handleMapClick}
    >
      <StaticMap
        mapStyle={MAP_STYLE_BY_NAME[mapStyleName]}
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
      />
    </DeckGL>
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
