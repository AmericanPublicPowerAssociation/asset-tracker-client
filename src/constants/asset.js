import {
  ReactComponent as PoleIcon,
} from '../datasets/assetTypeIcons/pole-16.svg'
import {
  ReactComponent as LineIcon,
} from '../datasets/assetTypeIcons/line-16.svg'
import {
  ReactComponent as MeterIcon,
} from '../datasets/assetTypeIcons/meter-white-16.svg'
import {
  ReactComponent as TransformerIcon,
} from '../datasets/assetTypeIcons/transformer-16.svg'
import {
  ReactComponent as SwitchIcon,
} from '../datasets/assetTypeIcons/switch-16.svg'
import {
  ReactComponent as PowerQualityIcon,
} from '../datasets/assetTypeIcons/power-quality-16.svg'
import {
  ReactComponent as ControlIcon,
} from '../datasets/assetTypeIcons/control-16.svg'
import {
  ReactComponent as StorageIcon,
} from '../datasets/assetTypeIcons/storage-white-16.svg'
import {
  ReactComponent as GeneratorIcon,
} from '../datasets/assetTypeIcons/generator-white-16.svg'
import {
  ReactComponent as SubstationIcon,
} from '../datasets/assetTypeIcons/substation-16.svg'
import {
  ReactComponent as StationIcon,
} from '../datasets/assetTypeIcons/station-16.svg'

export const ASSET_TYPE_CODE_POLE = 'p'
export const ASSET_TYPE_CODE_LINE = 'l'
export const ASSET_TYPE_CODE_METER = 'm'
export const ASSET_TYPE_CODE_TRANSFORMER = 't'
export const ASSET_TYPE_CODE_SWITCH = 'x'
export const ASSET_TYPE_CODE_POWER_QUALITY = 'q'
export const ASSET_TYPE_CODE_CONTROL = 'c'
export const ASSET_TYPE_CODE_STORAGE = 'o'
export const ASSET_TYPE_CODE_GENERATOR = 'g'
export const ASSET_TYPE_CODE_SUBSTATION = 's'
export const ASSET_TYPE_CODE_STATION = 'S'

export const ASSET_TYPE_ICON_BY_CODE = {
  [ASSET_TYPE_CODE_POLE]: PoleIcon,
  [ASSET_TYPE_CODE_LINE]: LineIcon,
  [ASSET_TYPE_CODE_METER]: MeterIcon,
  [ASSET_TYPE_CODE_TRANSFORMER]: TransformerIcon,
  [ASSET_TYPE_CODE_SWITCH]: SwitchIcon,
  [ASSET_TYPE_CODE_POWER_QUALITY]: PowerQualityIcon,
  [ASSET_TYPE_CODE_CONTROL]: ControlIcon,
  [ASSET_TYPE_CODE_STORAGE]: StorageIcon,
  [ASSET_TYPE_CODE_GENERATOR]: GeneratorIcon,
  [ASSET_TYPE_CODE_SUBSTATION]: SubstationIcon,
  [ASSET_TYPE_CODE_STATION]: StationIcon,
}

export const REFRESH_ASSETS = 'REFRESH_ASSETS'
export const SAVE_ASSETS = 'SAVE_ASSETS'
export const SET_ASSETS = 'SET_ASSETS'
export const SET_ASSETS_GEOJSON = 'SET_ASSETS_GEOJSON'

export const SELECTED_ASSET_ID = null
export const SET_SELECTED_ASSET_ID = 'SET_SELECTED_ASSET_ID'

export const SET_TEMPORARY_ASSET = 'SET_TEMPORARY_ASSET'

// TODO: Review all code below

export const MINIMUM_ASSET_ID_LENGTH = 16

export const SET_ASSET = 'SET_ASSET'
export const DELETE_ASSET = 'DELETE_ASSET'

export const SET_ASSET_VALUE = 'SET_ASSET_VALUE'
export const SET_ASSET_ATTRIBUTE = 'SET_ASSET_ATTRIBUTE'
export const SET_ASSET_CONNECTION = 'SET_ASSET_CONNECTION'
export const SET_ASSET_CONNECTION_ATTRIBUTE = 'SET_ASSET_CONNECTION_ATTRIBUTE'

export const FILL_ASSET_NAME = 'FILL_ASSET_NAME'

export const INSERT_ASSET_VERTEX = 'INSERT_ASSET_VERTEX'
export const DELETE_ASSET_VERTEX = 'DELETE_ASSET_VERTEX'

export const UPLOAD_ASSETS_CSV = 'UPLOAD_ASSETS_CSV'

// TODO: Review all code above
