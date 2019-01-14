import {ADD_ASSET, EDIT_ASSET,
        REMOVE_ASSET, RECEIVE_ASSETS} from '../actions'

const assets = (state=[], action) => {
  switch (action.type) {
    case ADD_ASSET:
      return state.concat([action.asset])
    case EDIT_ASSET:
      return state.map((a) => a.id === action.asset.id ? action.asset : a)
    case REMOVE_ASSET:
      return state.filter((a) => a.id !== action.id)
    case RECEIVE_ASSETS:
      return action.assets
    default:
      return state
  }
}

export default assets;
