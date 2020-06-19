// TODO: Review from scratch

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MaterialTable from './MaterialTable'
import {
  setSelection,
} from '../actions'
import {
  getAssetById,
  getAssetTypeByCode,
  getSelectedAssetId,
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

export default function AssetsTable() {
  const dispatch = useDispatch()
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetById = useSelector(getAssetById)
  const selectedAssetId = useSelector(getSelectedAssetId)
  const tableData = Object.entries(assetById)
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
    dispatch(setSelection({ assetId: rowData.assetId }))
  }

  return (
    <MaterialTable
      title='Assets'
      columns={COLUMNS}
      data={tableData}
      isSelectedRow={isSelectedRow}
      onRowClick={handleRowClick}
    />
  )
}
