import { Map, fromJS } from 'immutable'
import {
  CLOSE_INFORMATION_DRAWER,
  CLOSE_NAVIGATION_DRAWER,
  OPEN_INFORMATION_DRAWER,
  OPEN_NAVIGATION_DRAWER,
  SET_APP_VALUES,
  SET_FOCUSING_ASSET,
  TOGGLE_THEME,
} from '../constants'


const initialState = Map({
  isNavigationDrawerOpen: true,
  isInformationDrawerOpen: false,
  withMorningTheme: true,
})


const app = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NAVIGATION_DRAWER: {
      return state.merge({
        isNavigationDrawerOpen: true,
        isInformationDrawerOpen: false,
      })
    }
    case CLOSE_NAVIGATION_DRAWER: {
      return state.merge({
        isNavigationDrawerOpen: false,
      })
    }
    case SET_FOCUSING_ASSET:
    case OPEN_INFORMATION_DRAWER: {
      return state.merge({
        isInformationDrawerOpen: true,
        isNavigationDrawerOpen: false,
      })
    }
    case CLOSE_INFORMATION_DRAWER: {
      return state.merge({
        isInformationDrawerOpen: false,
      })
    }
    case TOGGLE_THEME: {
      return state.merge({
        withMorningTheme: !state.get('withMorningTheme'),
      })
    }
    case SET_APP_VALUES: {
      return state.merge(fromJS(action.payload))
    }
    default: {
      return state
    }
  }
}


export default app
