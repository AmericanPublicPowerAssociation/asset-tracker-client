import { Map } from 'immutable'

import {
  RESET_ASSETS_KIT,
  SET_SORTED_ASSETS,
} from '../constants'


const initialState = Map({
  column: 'name',
  order: 'desc'
})


const sortedAssets = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}


export default sortedAssets
