// import assetsGeoJson from '../datasets/assets/example1GeoJson.json'
// import assets from '../datasets/assets/example1.json'
import {
  ReactComponent as LineIcon
} from '../images/assets/line-16.svg'
import {
  ReactComponent as TransformerIcon
} from '../images/assets/transformer-16.svg'
import {
  ReactComponent as SubstationIcon
} from '../images/assets/substation-16.svg'
import {
  ReactComponent as MeterIcon
} from '../images/assets/meter-light-16.svg'
import {
  // getById,
} from '../macros'

export const MINIMUM_ASSET_ID_LENGTH = 16
export const ABBREVIATED_ASSET_ID_LENGTH = 7

export const ASSET_TYPE_CODE_LINE = 'l'
export const ASSET_TYPE_CODE_TRANSFORMER = 't'
export const ASSET_TYPE_CODE_SUBSTATION = 's'
export const ASSET_TYPE_CODE_METER = 'm'

export const ASSET_TYPE_BY_CODE = {
  [ASSET_TYPE_CODE_LINE]: {
    name: 'Line',
    icon: LineIcon,
  },
  [ASSET_TYPE_CODE_METER]: {
    name: 'Meter',
    icon: MeterIcon,
  },
  [ASSET_TYPE_CODE_TRANSFORMER]: {
    name: 'Transformer',
    icon: TransformerIcon,
  },
  [ASSET_TYPE_CODE_SUBSTATION]: {
    name: 'Substation',
    icon: SubstationIcon,
  },
}

// export const ASSETS_GEOJSON = assetsGeoJson
// export const ASSETS = assets
// export const ASSET_BY_ID = getById(ASSETS, {})
export const SAVE_ASSETS = 'SAVE_ASSETS'

export const REFRESH_ASSETS = 'REFRESH_ASSETS'
export const UPDATE_ASSETS = 'UPDATE_ASSETS'

export const SET_ASSETS = 'SET_ASSETS'
export const SET_ASSET = 'SET_ASSET'
export const SET_ASSET_VALUE = 'SET_ASSET_VALUE'
export const SET_ASSET_ATTRIBUTE = 'SET_ASSET_ATTRIBUTE'
export const ADD_ASSET_CONNECTION = 'ADD_ASSET_CONNECTION'
export const SET_ASSET_CONNECTION_ATTRIBUTE = 'SET_ASSET_CONNECTION_ATTRIBUTE'

export const SET_ASSETS_GEOJSON = 'SET_ASSETS_GEOJSON'
export const SET_FOCUSING_ASSET_ID = 'SET_FOCUSING_ASSET_ID'
