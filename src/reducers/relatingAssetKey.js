import {
  SET_RELATING_ASSET,
} from '../constants'


const initialState = null


const relatingAssetKey = (state = initialState, action) => {
  switch (action.type) {
    case SET_RELATING_ASSET: {
      const {key} = action.payload
      return key
    }
    default: {
      return state
    }
  }
}


export default relatingAssetKey
