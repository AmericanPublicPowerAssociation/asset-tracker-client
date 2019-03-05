import { fromJS } from 'immutable'
import {
  ASSET_LOCATION_BY_ID,
  UPDATE_ASSET_LOCATION,
} from '../constants'

const initialState = ASSET_LOCATION_BY_ID

const assetLocationById = (state=initialState, action) => {
  const actionType = action.type

  if (UPDATE_ASSET_LOCATION === actionType) {
    const {id, longitude, latitude} = action.payload
    return state.mergeDeep({
      [id]: fromJS({longitude, latitude}),
    })
  }

  return state
}

export default assetLocationById
