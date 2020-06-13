import React from 'react'
import { useSelector } from 'react-redux'
import MaterialTable from './MaterialTable'
import {
  getAssetById,
  getAssetTypeByCode,
} from '../selectors'

const ASSET_TABLE_COLUMN_NAMES = [{
}, {
}]
  'type',
  'name',
]

export default function AssetsTable({
  getHeaderLabel,
  highlightAsset,
  selectedAssetId,
}) {
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetById = useSelector(getAssetById)

  const columns = ASSET_TABLE_COLUMN_NAMES.map( field => {
    return { field, title: getHeaderLabel(field) }
  })

  const data = Object.entries(assetById)
    .filter(([id, asset]) => !asset.is_deleted )
    .map(
      assetEntry => {
        const [assetId, asset] = assetEntry
        const assetType = asset['typeCode']
        const attributes = asset['attributes']
        const vendorName = attributes ? attributes['vendorName'] : ''
        return {
          ...asset,
          assetId,
          vendorName,
          type: assetTypeByCode[assetType]['name'],
        }
    })

  function handleOnRowClick(event, rowData) {
    const { assetId, is_deleted } = rowData
    if (is_deleted) return
    highlightAsset(assetId)
  }

  return (
    <MaterialTable
      title='Assets'
      columns={columns}
      data={data}
      onRowClick={handleOnRowClick}
    />
  )
}
