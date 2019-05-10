import { List, fromJS } from 'immutable'
import {
  REPLACE_ASSETS,
} from '../constants'


const initialState = List()


const sortedAssetIds = (state=initialState, action) => {
  const actionType = action.type

  if (actionType === REPLACE_ASSETS) {
    const assets = action.payload
    return fromJS(assets.map(asset => asset['id']))
  }

  return state
}


export default sortedAssetIds
