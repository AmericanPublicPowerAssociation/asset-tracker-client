import { produce } from 'immer'
import {
  SET_EDITING_ASSET,
  SET_EDITING_ASSET_VALUE,
  SET_SKETCH_MODE,
} from '../constants'

const initialState = {}

const editingAsset = (state=initialState, action) => {
  const { payload } = action

  switch(action.type) {
    case SET_EDITING_ASSET: {
      return payload
    }
    case SET_EDITING_ASSET_VALUE: {
      const { key, value } = payload
      return produce(state, draft => {
        draft[key] = value
      })
    }
    case SET_SKETCH_MODE: {
      return {}
    }
    default: {
      return state
    }
  }
}

export default editingAsset
