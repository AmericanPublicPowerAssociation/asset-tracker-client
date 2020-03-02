import {
  DELETE_ASSET,
  SET_ASSETS,
  SET_ASSETS_GEOJSON,
} from '../constants'

const initialState = {
  type: 'FeatureCollection',
  features: [],
}

const assetsGeoJson = (state=initialState, action) => {
  switch(action.type) {
    case SET_ASSETS: {
      const { assetsGeoJson } = action.payload
      return assetsGeoJson
    }
    case SET_ASSETS_GEOJSON: {
      const assetsGeoJson = action.payload
      return assetsGeoJson
    }
    case DELETE_ASSET: {
      const assetId = action.payload
      const features = state.features.filter( (asset) => (
        assetId !== asset.properties.id
      ))
      return {
        ...state,
        features,
      }
    }
    default: {
      return state
    }
  }
}

export default assetsGeoJson
