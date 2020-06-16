import WebMercatorViewport from '@math.gl/web-mercator'
import getCentroid from '@turf/centroid'
import { GeoJsonLayer, TextLayer } from '@deck.gl/layers'
import {
  getRisks,
  getRisksByAssetId,
  getSelectedRiskIndex,
  getThreatScoreByAssetId,
} from 'asset-report-risks'
import {
  getAssetById,
  getSelectedAssetId,
} from './asset'
import {
  getOpenTaskCountByAssetId,
} from './task'
import {
  BRIGHT_MAP_STYLE_NAMES,
  MAP_STYLE_BY_NAME,
  OVERLAY_MODE_RISKS,
  OVERLAY_MODE_TASKS,
  SKETCH_MODE_VIEW,
} from '../constants'
import {
  getBusFeatures,
} from '../routines'

export const getMapViewState = state => state.mapViewState
export const getOverlayMode = state => state.overlayMode
export const getSketchMode = state => state.sketchMode
export const getAssetsGeoJson = state => state.assetsGeoJson
export const getSelectedAssetIndexes = state => state.selectedAssetIndexes
export const getSelectedBusIndexes = state => state.selectedBusIndexes
export const getHoverInfo = state => state.hoverInfo

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

export const getIsMapStyleBright = createSelector([
  getMapStyleName,
], (
  mapStyleName,
) => {
  return BRIGHT_MAP_STYLE_NAMES.includes(mapStyleName)
})

export const getBusesGeoJson = createSelector([
  getAssetById,
  getAssetsGeoJson,
], (
  assetById,
  assetsGeoJson,
) => {
  const assetFeatures = assetsGeoJson.features
  const busFeatures = getBusFeatures(assetFeatures, assetById)
  return {
    type: 'FeatureCollection',
    features: busFeatures,
  }
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
  switch (overlayMode) {
    case OVERLAY_MODE_TASKS: {
      const layerData = Object.entries(
        openTaskCountByAssetId,
      ).map(([assetId, openTaskCount]) => {
        const assetFeature = assetsGeoJson['features'].find(
          feature => feature.properties.id === assetId)
        // TODO: Use midpoint for lines
        const assetCentroid = getCentroid(assetFeature)
        return {
          name: '' + openTaskCount,
          coordinates: assetCentroid.geometry.coordinates,
        }
      })
      mapLayers.push(new TextLayer({
        data: layerData,
        fontFamily: 'Roboto',
        pickable: false,
        getPosition: d => d.coordinates,
        getText: d => d.name,
        getColor: mapColors.overlay,
      }))
      break
    }
    case OVERLAY_MODE_RISKS: {
      const risk = risks[selectedRiskIndex]
      if (risk) {
        mapLayers.push(new GeoJsonLayer({
          data: risk.lineGeoJson,
          pickable: false,
          getLineColor: mapColors.overlay,
        }))
      } else if (selectedAssetId) {
        const selectedRisks = risksByAssetId[selectedAssetId]
        if (selectedRisks) {
          mapLayers.push(new GeoJsonLayer({
            data: selectedRisks[0].lineGeoJson,
            pickable: false,
            getLineColor: mapColors.overlay,
          }))
        }
      }
      const layerData = Object.entries(
        threatScoreByAssetId,
      ).map(([assetId, threatScore]) => {
        const assetFeature = assetsGeoJson['features'].find(
          feature => feature.properties.id === assetId)
        const assetCentroid = getCentroid(assetFeature)
        return {
          name: '' + threatScore,
          coordinates: assetCentroid.geometry.coordinates,
        }
      })
      mapLayers.push(new TextLayer({
        data: layerData,
        pickable: false,
        fontFamily: 'Roboto',
        getPosition: d => d.coordinates,
        getText: d => d.name,
        getColor: mapColors.overlay,
      }))
      break
    }
    default: { }
  }
  return mapLayers
})
