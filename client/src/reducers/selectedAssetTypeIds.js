import { TOGGLE_SELECTED_ASSET_TYPE } from '../constants'

const initialState = [
  '6',
]

const selectedAssetTypeIds = (state=initialState, action) => {
  switch (action.type) {
    case TOGGLE_SELECTED_ASSET_TYPE:
      const assetTypeId = action.assetTypeId
      console.log(assetTypeId)
      return state.includes(assetTypeId) ?
        state.filter(x => x !== assetTypeId) :
        [...state, assetTypeId]
    default:
      return state
  }
}

export default selectedAssetTypeIds
