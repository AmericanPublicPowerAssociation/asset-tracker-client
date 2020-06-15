import React from 'react'
import { useSelector } from 'react-redux'
import MaterialTable from './MaterialTable'
import {
  getAssetById,
  getAssetTypeByCode,
} from '../selectors'

const COLUMNS = [{
  title: 'Asset Type',
  field: 'type',
}, {
  title: 'Asset Name',
  field: 'name',
}, {
  title: 'Vendor Name',
  field: 'vendorName',
}, {
  title: 'Product Name',
  field: 'productName',
}]

export default function AssetsTable({
  highlightAsset,
  selectedAssetId,
}) {
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetById = useSelector(getAssetById)
  const data = Object.entries(assetById)
    .filter(([id, asset]) => !asset.isDeleted)
    .map(([assetId, asset]) => {
        const assetTypeCode = asset.typeCode
        const assetType = assetTypeByCode[assetTypeCode]
        const assetAttributes = asset.attributes
        return {
          assetId,
          name: asset.name,
          type: assetType.name,
          vendorName: assetAttributes && assetAttributes.vendorName,
          productName: assetAttributes && assetAttributes.productName,
        }
    })

  function isSelectedRow(rowData) {
    return rowData.assetId === selectedAssetId
  }

  function handleRowClick(event, rowData) {
    highlightAsset(rowData.assetId)
  }

  return (
    <MaterialTable
      title='Assets'
      columns={COLUMNS}
      data={data}
      isSelectedRow={isSelectedRow}
      onRowClick={handleRowClick}
    />
  )
}
