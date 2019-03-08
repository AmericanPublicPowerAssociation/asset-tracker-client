import { List } from 'immutable'
import { SET_SELECTED_ASSET_IDS } from '../constants'

const initialState = List()

const selectedAssetIds = (state=initialState, action) => {
  const actionType = action.type

  if (SET_SELECTED_ASSET_IDS === actionType) {
    const {ids} = action.payload
    return state.withMutations(state => {
      state.clear()
      state.concat(ids)
    })
  }

  return state
}

export default selectedAssetIds
