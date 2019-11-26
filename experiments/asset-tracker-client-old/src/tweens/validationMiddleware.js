import { List, Map, fromJS } from 'immutable'
import {
  setAssetErrors,
  setAddingAssetErrors,
  setFocusingAsset,
} from '../actions'
import {
  ADD_ASSET,
  CHANGE_ASSET,
} from '../constants'
import {
  getTrackingAsset,
} from '../selectors'


const validationMiddleware = ({ dispatch, getState }) => next => action => {
  const errors = {}
  switch (action.type) {
    case ADD_ASSET: {
      const asset = action.payload
      checkAssetName(asset.get('name'), errors)
      if (Object.keys(errors).length) {
        dispatch(setAddingAssetErrors(Map(errors)))
        return
      }
      return next(action)
    }
    case CHANGE_ASSET: {
      const asset = action.payload
      const trackingAsset = getTrackingAsset(getState())

      let hasChanged = false
      for (const [k, v] of Object.entries(asset)) {
        const trackingValue = trackingAsset.get(k)
        if (trackingValue instanceof List && !List(v).equals(trackingValue)) {
          hasChanged = true
        } else if (v !== trackingValue) {
          hasChanged = true
        }
      }
      if (!hasChanged) {
        return
      }

      const { id } = asset
      if ('name' in asset) {
        checkAssetName(asset.name, errors)
      }
      if (Object.keys(errors).length) {
        dispatch(setAssetErrors(fromJS({id, errors})))
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


function checkAssetName(name, errors) {
  if (!name.trim().length) {
    errors.name = 'cannot be empty'
  }
}


export default validationMiddleware
