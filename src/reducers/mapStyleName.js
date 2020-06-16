import {
  MAP_STYLE_COUNT,
  MAP_STYLE_NAMES,
  TOGGLE_MAP_STYLE,
} from '../constants'

const initialState = MAP_STYLE_NAMES[0]

export default function mapStyleName(
  state=initialState,
  action,
) {
  switch (action.type) {
    case TOGGLE_MAP_STYLE: {
      const oldMapStyleIndex = MAP_STYLE_NAMES.indexOf(state)
      const newMapStyleIndex = (oldMapStyleIndex + 1) % MAP_STYLE_COUNT
      return MAP_STYLE_NAMES[newMapStyleIndex]
    }
    default: {
      return state
    }
  }
}
