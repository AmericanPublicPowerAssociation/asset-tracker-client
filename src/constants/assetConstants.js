import assetsGeoJson from '../datasets/assets/example1GeoJson.json'
import assets from '../datasets/assets/example1.json'
import {
  getById,
} from '../macros'

export const MINIMUM_ASSET_ID_LENGTH = 16
export const ABBREVIATED_ASSET_ID_LENGTH = 7

export const LINE_ASSET_TYPE_ID = 'l'
export const TRANSFORMER_ASSET_TYPE_ID = 't'
export const SUBSTATION_ASSET_TYPE_ID = 's'

export const ASSET_TYPE_BY_ID = {
  [LINE_ASSET_TYPE_ID]: {
    name: 'Line',
  },
  [TRANSFORMER_ASSET_TYPE_ID]: {
    name: 'Transformer',
  },
  [SUBSTATION_ASSET_TYPE_ID]: {
    name: 'Substation',
  },
}

export const ASSETS_GEOJSON = assetsGeoJson
export const ASSETS = assets
export const ASSET_BY_ID = getById(ASSETS, {})

export const SET_ASSETS_GEOJSON = 'SET_ASSETS_GEOJSON'
export const SET_ASSET = 'SET_ASSET'
export const SET_FOCUSING_ASSET_ID = 'SET_FOCUSING_ASSET_ID'

export const ADD_ASSET_CONNECTION = 'ADD_ASSET_CONNECTION'
