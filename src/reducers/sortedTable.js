import { Map } from 'immutable'

import {
  RESET_ASSETS_KIT,
  SET_SORTED_ASSETS,
} from '../constants'


const initialState = Map({
  column: null,
  order: null
})


const sortedAssets = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}


export default sortedAssets
