import {
  SET_FOCUSING_ASSET,
  DESELECT_EVERYTHING,
} from '../constants'


const initialState = null


const focusingAssetId = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOCUSING_ASSET: {
      const {id} = action.payload
      return id
    }
    case DESELECT_EVERYTHING: {
      return initialState
    }
    default: {
      return state
    }
  }
}


export default focusingAssetId
