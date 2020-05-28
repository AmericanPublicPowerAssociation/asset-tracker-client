import {
  DELETE_ASSET, SET_ASSET_GEOJSON,
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
    case SET_ASSET_GEOJSON: {
      console.log(action.payload)
      const newGeoJSON = state.features.map(assetGeoJSON => {
        if (assetGeoJSON.properties.id === action.payload.id) {
          return {...assetGeoJSON, geometry: action.payload.geometry}
        }
        return assetGeoJSON
      })
      console.log(newGeoJSON)
      return {...state, features: newGeoJSON}
    }
    case DELETE_ASSET: {
      const { assetId } = action.payload
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
