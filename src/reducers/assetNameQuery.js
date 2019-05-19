import {
  SET_ASSET_NAME_QUERY,
} from '../constants'


const initialState = ''


const assetNameQuery = (state=initialState, action) => {
  switch (action.type) {
    case SET_ASSET_NAME_QUERY: {
      const {query} = action.payload
      return query
    }
    default:
      return state
  }
}


export default assetNameQuery
