import { createSelector } from 'reselect'
import WebMercatorViewport from '@math.gl/web-mercator'
import { GeoJsonLayer, TextLayer } from '@deck.gl/layers'
import {
  getRisks,
  getRisksByAssetId,
  getSelectedRiskIndex,
  getThreatScoreByAssetId,
} from 'asset-report-risks'
import {
  getAssetsGeoJson,
  getSelectedAssetId,
} from './asset'
import {
  getOpenTaskCountByAssetId,
} from './task'
import {
  COLORS_BY_MAP_STYLE_NAME,
  MAP_STYLE_BY_NAME,
  OVERLAY_MODE_RISKS,
  OVERLAY_MODE_TASKS,
  SKETCH_MODE_VIEW,
} from '../constants'
import {
  getRepresentativeXY,
} from '../routines'

export const getMapStyleName = state => state.mapStyleName
export const getMapViewState = state => state.mapViewState
export const getOverlayMode = state => state.overlayMode
export const getSketchMode = state => state.sketchMode
export const getPopUpState = state => state.popUpState
export const getPopUpDeleteMidpointState = state => state.popUpDeleteMidpointState
export const getSelectedAssetIndexes = state => state.selectedAssetIndexes
export const getSelectedBusIndexes = state => state.selectedBusIndexes

export const getMapColors = createSelector([
  getMapStyleName,
], (
  mapStyleName,
) => {
  return COLORS_BY_MAP_STYLE_NAME[mapStyleName]
})

export const getMapStyle = createSelector([
  getMapStyleName,
], (
  mapStyleName,
) => {
  return MAP_STYLE_BY_NAME[mapStyleName]
})

export const getMapWebMercatorViewPort = createSelector([
  getMapViewState,
], (
  mapViewState,
) => {
  return new WebMercatorViewport(mapViewState)
})

export const getIsViewing = createSelector([
  getSketchMode,
], (
  sketchMode,
) => {
  return sketchMode === SKETCH_MODE_VIEW
})

export const getOverlayMapLayers = createSelector([
  getOverlayMode,
  getMapColors,
  getRisks,
  getAssetsGeoJson,
  getThreatScoreByAssetId,
  getOpenTaskCountByAssetId,
  getSelectedRiskIndex,
  getSelectedAssetId,
  getRisksByAssetId,
], (
  overlayMode,
  mapColors,
  risks,
  assetsGeoJson,
  threatScoreByAssetId,
  openTaskCountByAssetId,
  selectedRiskIndex,
  selectedAssetId,
  risksByAssetId,
) => {
  const mapLayers = []
  const assetFeatures = assetsGeoJson.features
  const textColor = mapColors.overlay

  function getTextLayerFromValueByAssetId(
    valueByAssetId,
  ) {
    const ds = []
    for (const [assetId, value] of Object.entries(
      valueByAssetId,
    )) {
      const assetFeature = assetFeatures.find(f => f.properties.id === assetId)
      if (!assetFeature) continue
      ds.push({
        name: value.toString(),
        coordinates: getRepresentativeXY(assetFeature),
      })
    }
    return new TextLayer({
      data: ds,
      pickable: false,
      fontFamily: 'Roboto',
      getText: d => d.name,
      getPosition: d => d.coordinates,
      getColor: textColor,
    })
  }

  switch (overlayMode) {
    case OVERLAY_MODE_TASKS: {
      mapLayers.push(getTextLayerFromValueByAssetId(
        openTaskCountByAssetId))
      break
    }
    case OVERLAY_MODE_RISKS: {
      let downstreamLineGeoJson
      if (selectedRiskIndex) {
        const risk = risks[selectedRiskIndex]
        if (risk) {
          downstreamLineGeoJson = risk.lineGeoJson
        }
      } else if (selectedAssetId) {
        const selectedRisks = risksByAssetId[selectedAssetId]
        if (selectedRisks) {
          downstreamLineGeoJson = selectedRisks[0].lineGeoJson
        }
      }
      if (downstreamLineGeoJson) {
        mapLayers.push(new GeoJsonLayer({
          data: downstreamLineGeoJson,
          pickable: false,
          getLineColor: mapColors.overlay,
        }))
      }
      mapLayers.push(getTextLayerFromValueByAssetId(
        threatScoreByAssetId))
      break
    }
    default: { }
  }
  return mapLayers
})
