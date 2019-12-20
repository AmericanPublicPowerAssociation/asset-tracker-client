import produce from 'immer'
import {
  ASSETS_GEOJSON,
} from '../constants'

const initialState = ASSETS_GEOJSON

const assetsGeoJson = produce((draft, action) => {
}, initialState)

export default assetsGeoJson
