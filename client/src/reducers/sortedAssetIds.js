import { ASSET_BY_ID } from '../constants'

const initialState = Object.keys(ASSET_BY_ID)

const sortedAssetIds = (state=initialState, action) => {
  return state
}

export default sortedAssetIds
