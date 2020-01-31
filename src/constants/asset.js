import assetsGeoJson from '../datasets/assets/example1GeoJson.json'
import assets from '../datasets/assets/example1.json'
import {
  getById,
} from '../macros'

export const MINIMUM_ASSET_ID_LENGTH = 16
export const ABBREVIATED_ASSET_ID_LENGTH = 7

export const LINE_ASSET_TYPE_CODE = 'l'
export const TRANSFORMER_ASSET_TYPE_CODE = 't'
export const SUBSTATION_ASSET_TYPE_CODE = 's'

export const ASSET_TYPE_BY_CODE = {
  [LINE_ASSET_TYPE_CODE]: {
    name: 'Line',
  },
  [TRANSFORMER_ASSET_TYPE_CODE]: {
    name: 'Transformer',
  },
  [SUBSTATION_ASSET_TYPE_CODE]: {
    name: 'Substation',
  },
}

export const ASSETS_GEOJSON = assetsGeoJson
export const ASSETS = assets
export const ASSET_BY_ID = getById(ASSETS, {})

export const REFRESH_ASSETS_KIT = 'REFRESH_ASSETS_KIT'

export const SET_ASSETS_GEOJSON = 'SET_ASSETS_GEOJSON'
export const SET_ASSET = 'SET_ASSET'
export const SET_ASSETS = 'SET_ASSETS'
export const SET_FOCUSING_ASSET_ID = 'SET_FOCUSING_ASSET_ID'

export const ADD_ASSET_CONNECTION = 'ADD_ASSET_CONNECTION'
