import assetsGeoJson from '../datasets/assets/example1GeoJson.json'
import assets from '../datasets/assets/example1.json'
import {
  getById,
} from '../macros'

export const LINE_ASSET_TYPE_ID = 'l'
export const TRANSFORMER_ASSET_TYPE_ID = 't'
export const SUBSTATION_ASSET_TYPE_ID = 's'
export const STATION_ASSET_TYPE_ID = 'S'

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
  [STATION_ASSET_TYPE_ID]: {
    name: 'Station',
  },
}

export const ASSET_TABLE_COLUMN_NAMES = [
  'id',
  'typeId',
  'name'
]

export const ASSETS_GEOJSON = assetsGeoJson
export const ASSETS = assets
export const ASSET_BY_ID = getById(ASSETS, {})

export const ADD_ASSET_TO_ASSET_BY_ID = 'ADD_ASSET_TO_ASSET_BY_ID'

export const SET_ASSETS_GEOJSON = 'SET_ASSETS_GEOJSON'
export const SET_FOCUSING_ASSET_ID = 'SET_FOCUSING_ASSET_ID'

export const MERGE_ASSET = 'MERGE_ASSET'
export const CHANGE_ASSET = 'CHANGE_ASSET'
export const SET_ASSETS = 'SET_ASSETS'
