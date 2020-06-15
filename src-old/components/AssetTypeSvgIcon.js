import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import {
  ASSET_TYPE_ICON_BY_CODE,
} from '../constants'

export default function AssetTypeSvgIcon(props) {
  const {
    assetTypeCode,
  } = props
  const assetTypeIcon = ASSET_TYPE_ICON_BY_CODE[assetTypeCode]
  return (
    <SvgIcon
      fontSize='large'
      viewBox='0 0 16 16'
      component={assetTypeIcon}
    />
  )
}
