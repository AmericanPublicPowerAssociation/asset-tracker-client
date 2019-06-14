import {
  SET_RELATING_ASSET,
} from '../constants'


const initialState = null


const relatingAssetId = (state = initialState, action) => {
  switch (action.type) {
    case SET_RELATING_ASSET: {
      const {id} = action.payload
      return id
    }
    default: {
      return state
    }
  }
}


export default relatingAssetId
