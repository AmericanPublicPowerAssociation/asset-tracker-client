import { produce } from 'immer'
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
      const features = state.features
      return produce(state, draft => {
        draft.features = features.filter(feature => feature.properties.id !== assetId)
      })
    }
    default: {
      return state
    }
  }
}

export default assetsGeoJson
