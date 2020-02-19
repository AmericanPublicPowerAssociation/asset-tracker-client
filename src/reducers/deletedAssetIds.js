import produce from 'immer'
import {
  DELETE_ASSET,
} from '../constants'

const initialState = [] 

const deletedAssetIds = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ASSET: {
      return produce(state, draft => {
        const assetId = action.payload
        const next = draft.length
        draft[next] = assetId
      })
    }
    default: {
      return state
    }
  }
}

export default deletedAssetIds
