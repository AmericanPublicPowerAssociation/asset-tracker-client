import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import {
  ASSET_TYPE_ICON_BY_CODE,
} from '../constants'

export default function AssetTypeSvgIcon({ assetTypeCode }) {
  return (
    <SvgIcon
      fontSize='large'
      viewBox='0 0 16 16'
      component={ASSET_TYPE_ICON_BY_CODE[assetTypeCode]}
    />
  )
}
