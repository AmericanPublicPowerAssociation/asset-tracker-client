import { Map, fromJS } from 'immutable'
import {
  replaceAssetErrors,
  setAddingAssetErrors,
  setFocusingAsset,
} from '../actions'
import {
  ADD_ASSET,
  CHANGE_ASSET,
} from '../constants'
import {
  rinseAsset,
} from '../routines'
import {
  getTrackingAsset,
} from '../selectors'


const validationMiddleware = ({ dispatch, getState }) => next => action => {
  const errors = {}
  switch (action.type) {
    case ADD_ASSET: {
      const asset = action.payload
      checkAssetName(asset, errors)
      if (Object.keys(errors).length) {
        dispatch(setAddingAssetErrors(Map(errors)))
        return
      }
      return next(action)
    }
    case CHANGE_ASSET: {
      const asset = action.payload
      const trackingAsset = getTrackingAsset(getState())
      // Return if asset did not change
      if (rinseAsset(asset).equals(rinseAsset(trackingAsset))) {
        return
      }
      const id = asset.get('id')
      checkAssetName(asset, errors)
      if (Object.keys(errors).length) {
        dispatch(replaceAssetErrors(fromJS({id, errors})))
        return
      }
      // Update trackingAsset
      dispatch(setFocusingAsset({id}))
      return next(action)
    }
    default:
      return next(action)
  }
}


function checkAssetName(asset, errors) {
  const name = asset.get('name').trim()
  if (!name.length) {
    errors.name = 'cannot be empty'
  }
}


export default validationMiddleware
