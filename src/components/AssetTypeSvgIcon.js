import React from 'react'
import { useSelector } from 'react-redux'
import SvgIcon from '@material-ui/core/SvgIcon'
import Tooltip from '@material-ui/core/Tooltip'
import {
  ASSET_TYPE_ICON_BY_CODE,
} from '../constants'
import {
  getAssetTypeByCode,
} from '../selectors'

export default function AssetTypeSvgIcon({ assetTypeCode }) {
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetType = assetTypeByCode[assetTypeCode]
  const assetName = (assetType && assetType.name) || ''
  return (
    <Tooltip title={assetName} placement='left'>
      <SvgIcon
        fontSize='large'
        viewBox='0 0 16 16'
        component={ASSET_TYPE_ICON_BY_CODE[assetTypeCode]}
      />
    </Tooltip>
  )
}
