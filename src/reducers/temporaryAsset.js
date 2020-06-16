import { produce } from 'immer'
import {
  SET_SKETCH_MODE,
  SET_TEMPORARY_ASSET,
  SET_TEMPORARY_ASSET_VALUE,
} from '../constants'

const initialState = null

export default function temporaryAsset(
  state=initialState,
  action,
) {
  switch(action.type) {
    case SET_TEMPORARY_ASSET: {
      return action.payload
    }
    case SET_TEMPORARY_ASSET_VALUE: {
      const { key, value } = action.payload
      return produce(state, draft => {
        draft[key] = value
      })
    }
    case SET_SKETCH_MODE: {
      return null
    }
    default: {
      return state
    }
  }
}
