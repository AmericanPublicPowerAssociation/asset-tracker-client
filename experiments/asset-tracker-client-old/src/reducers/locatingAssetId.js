import {
  SET_LOCATING_ASSET,
} from '../constants'


const initialState = null


const locatingAssetId = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATING_ASSET: {
      const {id} = action.payload
      return id
    }
    default: {
      return state
    }
  }
}


export default locatingAssetId
