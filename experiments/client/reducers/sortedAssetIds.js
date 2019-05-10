import {
  ADD_ASSET,
} from '../constants'


const sortedAssetIds = (state=initialState, action) => {

  if (ADD_ASSET === actionType) {
    const {id} = action.payload
    return state.unshift(id)
  }

  return state
}

