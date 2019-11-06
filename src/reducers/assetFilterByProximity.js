import {
  SET_ASSET_FILTER_PROXIMITY,
} from '../constants'

const initialState = false


const assetFilterByProximity = (state=initialState, action) => {
  switch (action.type) {
    case SET_ASSET_FILTER_PROXIMITY: {
      return !action.payload
    }
    default: {
      return state
    }
  }
}


export default assetFilterByProximity
