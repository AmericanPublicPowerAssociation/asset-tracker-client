import {
  SET_ASSETS,
  SET_ASSETS_GEOJSON,
} from '../constants'

const initialState = { type: 'FeatureCollection', features: [] }

export default function assetsGeoJson(
  state=initialState,
  action,
) {
  switch(action.type) {
    case SET_ASSETS: {
      const { assetsGeoJson } = action.payload
      return assetsGeoJson
    }
    case SET_ASSETS_GEOJSON: {
      return action.payload
    }
    default: {
      return state
    }
  }
}
