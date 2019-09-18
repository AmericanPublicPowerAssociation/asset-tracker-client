import {
  BASE_MAP_STYLE_NAME,
  SET_BASE_MAP_STYLE_NAME,
} from '../constants'


const initialState = BASE_MAP_STYLE_NAME


const baseMapStyleName = (state = initialState, action) => {
  switch (action.type) {
    case SET_BASE_MAP_STYLE_NAME: {
      const baseStyleName  = action.payload
      return baseStyleName
    }
    default: {
      return state
    }
  }
}


export default baseMapStyleName
