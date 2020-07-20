import {
  SET_POPUP_STATE,
  SET_POPUP_DELETE_MIDPOINT,
  SET_SELECTION,
  SET_SELECTED_ASSET_ID,
  SET_SELECTED_ASSET_INDEXES,
  SET_SELECTED_BUS_ID,
  SET_SELECTED_BUS_INDEXES,

} from '../constants'

const initialState = null

export default function popUpDeleteMidpointState(state=initialState, action) {
  switch (action.type) {
    case SET_POPUP_DELETE_MIDPOINT: {
      return action.payload
    }

    case SET_SELECTION: 
    case SET_POPUP_STATE:
    case SET_SELECTED_BUS_ID: 
    case SET_SELECTED_ASSET_INDEXES:
    case SET_SELECTED_BUS_INDEXES: {
      return state
    }

    case SET_SELECTED_ASSET_ID: {
      const selectedAssetId = action.payload
      const { assetId } = !state ? {} : state
      if (assetId === selectedAssetId) {
        return state
      }
      return initialState
    }

    default: {
      return initialState
    }
  }
}
