import {
  MAP_STYLE_COUNT,
  MAP_STYLE_NAMES,
  TOGGLE_MAP_STYLE,
} from '../constants'

const initialState = MAP_STYLE_NAMES[0]

const mapStyleName = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_MAP_STYLE: {
      const mapStyleIndex = MAP_STYLE_NAMES.indexOf(state)
      const nextMapStyleIndex = (mapStyleIndex + 1) % MAP_STYLE_COUNT
      return MAP_STYLE_NAMES[nextMapStyleIndex]
    }
    default: {
      return state
    }
  }
}

export default mapStyleName
