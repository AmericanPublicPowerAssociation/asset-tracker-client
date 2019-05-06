import { fromJS } from 'immutable'
import {
  FEATURE_GEOMETRY_BY_ID,
  UPDATE_ASSET_LOCATION,
  UPDATE_ASSET_GEOMETRY,
} from '../constants'

const initialState = FEATURE_GEOMETRY_BY_ID

const featureGeometryById = (state=initialState, action) => {
  const actionType = action.type
  const actionPayload = action.payload

  if (UPDATE_ASSET_LOCATION === actionType) {
    const {id, longitude, latitude} = actionPayload
    return state.merge({
      [id]: fromJS({type: 'Point', coordinates: [longitude, latitude]}),
    })
  } else if (UPDATE_ASSET_GEOMETRY === actionType) {
    const {id, geometry} = actionPayload
    return state.merge({
      [id]: fromJS(geometry),
    })
  }

  return state
}

export default featureGeometryById
