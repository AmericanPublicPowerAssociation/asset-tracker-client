import { Map, fromJS } from 'immutable'
import {
  REPLACE_ASSETS,
} from '../constants'


const initialState = Map()


const assetById = (state=initialState, action) => {
  const actionType = action.type

  if (actionType === REPLACE_ASSETS) {
    const assets = action.payload
    return fromJS(assets.reduce((o, x) => Object.assign(o, {[x.id]: {
      ...x, typeId: x.typeId,
    }}), {}))
  }

  return state
}


export default assetById
