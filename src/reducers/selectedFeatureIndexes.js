import {
  SET_SELECTED_FEATURE_INDEXES,
} from '../constants'

const initialState = []

const selectedFeatureIndexes = (state = initialState, action) => {
  switch(action.type) {
    case SET_SELECTED_FEATURE_INDEXES: {
      const newIndexes = action.payload
      return newIndexes
    }
    default: {
      return state
    }
  }
}

export default selectedFeatureIndexes
