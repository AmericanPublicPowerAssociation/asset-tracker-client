import { Map } from 'immutable'

import {
  SET_SORTED_ASSETS,
} from '../constants'


const initialState = Map({
  column: null,
  order: null
})


const sortedAssets = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORTED_ASSETS: {
      const payload = action.payload
      const column = payload.get('column')
      const desc = payload.get('desc')
      return state.mergeDeep({column, desc})
    }
    default: {
      return state
    }
  }
}


export default sortedAssets
