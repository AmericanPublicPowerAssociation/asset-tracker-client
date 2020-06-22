import { produce } from 'immer'
import {
  DELETE_ASSET,
  SET_ASSETS,
  SET_ASSETS_GEOJSON,
} from '../constants'

const initialState = { type: 'FeatureCollection', features: [] }

export default function assetsGeoJson(state=initialState, action) {
  switch(action.type) {
    case SET_ASSETS: {
      const { assetsGeoJson } = action.payload
      return assetsGeoJson
    }
    case SET_ASSETS_GEOJSON: {
      return action.payload
    }
    case DELETE_ASSET: {
      const assetId = action.payload
      const { features } = state
      return produce(state, draft => {
        draft.features = features.filter(f => f.properties.id !== assetId)
      })
    }
    default: {
      return state
    }
  }
}
