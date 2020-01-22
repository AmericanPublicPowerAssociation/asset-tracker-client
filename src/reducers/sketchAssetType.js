import {
  SET_SKETCH_ASSET_TYPE
} from '../constants'

const initialState = null

const sketchAssetType = (state = initialState, action) => {
  switch(action.type) {
    case SET_SKETCH_ASSET_TYPE: {
      const newSketchAssetType = action.payload
      return newSketchAssetType
    }
    default: {
      return state
    }
  }
}

export default sketchAssetType
