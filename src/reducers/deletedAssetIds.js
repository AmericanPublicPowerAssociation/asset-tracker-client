import produce from 'immer'
import {
  DELETE_ASSET,
} from '../constants'

const initialState = [] 

const mapViewState = produce((draft, action) => {
  switch (action.type) {
    case DELETE_ASSET: {
      const assetId = action.payload
      const next = draft.length
      draft[next] = assetId
      break
    }
    default: { }
  }
}, initialState)

export default mapViewState
