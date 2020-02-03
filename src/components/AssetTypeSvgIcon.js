import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import {
  getAssetTypeIcon,
} from '../routines'

export default function AssetTypeSvgIcon(props) {
  const {
    assetTypeCode,
  } = props
  const icon = getAssetTypeIcon(assetTypeCode)
  return (
    <SvgIcon
      fontSize='large'
      viewBox='0 0 16 16'
      component={icon}
    />
  )
}
