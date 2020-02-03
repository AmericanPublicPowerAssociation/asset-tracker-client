import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import {
  ASSET_TYPE_BY_CODE,
} from '../constants'

export default function AssetTypeSvgIcon(props) {
  const {
    assetTypeCode,
  } = props
  const assetType = ASSET_TYPE_BY_CODE[assetTypeCode]
  const assetTypeIcon = assetType.icon
  return (
    <SvgIcon
      fontSize='large'
      viewBox='0 0 16 16'
      component={assetTypeIcon}
    />
  )
}
