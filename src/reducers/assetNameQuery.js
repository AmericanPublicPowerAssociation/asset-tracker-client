import {
  SET_ASSET_NAME_QUERY,
} from '../constants'


const initialState = ''


const assetNameQuery = (state=initialState, action) => {
  const actionType = action.type

  if (SET_ASSET_NAME_QUERY === actionType) {
    const {query} = action.payload
    return query
  }

  return state
}


export default assetNameQuery
