import centroid from '@turf/centroid'
import {
  getMapViewStateFromBoundingBox,
} from '../routines'
import {
  PAN_MAP_TO_ASSET,
  SET_ASSETS,
} from '../constants'


const mapViewState = produce((draft, action) => {
  switch (action.type) {
    case SET_ASSETS: {
      const { boundingBox } = action.payload
      if (!boundingBox || draft['reset']) {
        return
      }
      const viewState = getMapViewStateFromBoundingBox(
        boundingBox, window.innerWidth, window.innerHeight, draft.zoom)
      if (!viewState) return
      transferViewState(draft, viewState)
      draft.reset = true
      break
    }
    // TODO: Rename
    case PAN_MAP_TO_ASSET: {
      const assetGeoJson = action.payload
      const pointGeojson = centroid(assetGeoJson)
      const [ lon, lat ] = pointGeojson.geometry.coordinates
      draft.longitude = lon
      draft.latitude = lat
      break
    }
