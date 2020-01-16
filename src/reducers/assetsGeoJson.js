import {
  ASSETS_GEOJSON,
  SET_ASSETS_GEOJSON,
} from '../constants'

const initialState = ASSETS_GEOJSON

const assetsGeoJson = (state = initialState, action) => {
  switch(action.type) {
    case SET_ASSETS_GEOJSON: {
      const geojson = action.payload
      return geojson
    }
    default: {
      return state
    }
  }
}

export default assetsGeoJson
