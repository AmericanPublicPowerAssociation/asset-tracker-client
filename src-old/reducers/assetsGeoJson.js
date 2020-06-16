import { produce } from 'immer'
import {
  DELETE_ASSET,
  SET_ASSETS,
  SET_ASSETS_GEOJSON,
} from '../constants'

    case DELETE_ASSET: {
      const assetId = action.payload
      const features = state.features
      return produce(state, draft => {
        draft.features = features.filter(feature => feature.properties.id !== assetId)
      })
    }
