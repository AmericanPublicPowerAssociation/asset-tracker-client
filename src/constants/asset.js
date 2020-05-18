// import assets from '../datasets/assets/example1.json'
import {
  ReactComponent as LineIcon,
} from '../images/assets/line-16.svg'
import {
  ReactComponent as TransformerIcon,
} from '../images/assets/transformer-16.svg'
import {
  ReactComponent as SubstationIcon,
} from '../images/assets/substation-16.svg'
import {
  ReactComponent as MeterIcon,
} from '../images/assets/meter-white-16.svg'

// export const ASSETS = assets

export const MINIMUM_ASSET_ID_LENGTH = 16

export const ASSET_TYPE_CODE_LINE = 'l'
export const ASSET_TYPE_CODE_TRANSFORMER = 't'
export const ASSET_TYPE_CODE_SUBSTATION = 's'
export const ASSET_TYPE_CODE_METER = 'm'

export const ASSET_TYPE_ICON_BY_CODE = {
  [ASSET_TYPE_CODE_LINE]: LineIcon,
  [ASSET_TYPE_CODE_METER]: MeterIcon,
  [ASSET_TYPE_CODE_TRANSFORMER]: TransformerIcon,
  [ASSET_TYPE_CODE_SUBSTATION]: SubstationIcon,
}

export const REFRESH_ASSETS = 'REFRESH_ASSETS'
export const SET_ASSETS = 'SET_ASSETS'

export const SAVE_ASSETS = 'SAVE_ASSETS'

export const SET_ASSET = 'SET_ASSET'
export const DELETE_ASSET = 'DELETE_ASSET'

export const SET_ASSET_VALUE = 'SET_ASSET_VALUE'
export const SET_ASSET_ATTRIBUTE = 'SET_ASSET_ATTRIBUTE'
export const SET_ASSET_CONNECTION = 'SET_ASSET_CONNECTION'
export const SET_ASSET_CONNECTION_ATTRIBUTE = 'SET_ASSET_CONNECTION_ATTRIBUTE'
export const SET_ASSETS_GEOJSON = 'SET_ASSETS_GEOJSON'
export const SET_FOCUSING_ASSET_ID = 'SET_FOCUSING_ASSET_ID'
export const UPLOAD_ASSETS_CSV = 'UPLOAD_ASSETS_CSV'
export const MAKE_ASSET_NAME = 'MAKE_ASSET_NAME'

export const REMOVE_LINE_END_POINT = 'REMOVE_LINE_ENDPOINT'

export const SET_EDITING_ASSET = 'SET_EDITING_ASSET'
export const SET_EDITING_ASSET_VALUE = 'SET_EDITING_ASSET_VALUE'
export const FILL_ASSET_NAME = 'FILL_ASSET_NAME'
