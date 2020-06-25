// TODO: Review from scratch
// TODO: Consider moving to asset-report-risks

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from '@material-ui/core/Link'
import MaterialTable from './MaterialTable'
import {
  getRisks,
  getSelectedRiskIndex,
  setSelectedRiskIndex,
} from 'asset-report-risks'
import {
  setSelection,
} from '../actions'
import {
  getSelectedAssetId,
} from '../selectors'

const COLUMNS = [{
  title: 'Asset Name',
  field: 'assetName',
}, {
  title: 'Meter Count',
  field: 'meterCount',
}, {
  title: 'Aggregated Threat',
  field: 'threatScore',
}, {
  title: 'Date Published',
  field: 'vulnerabilityUrl',
  render: rowData => (
    <Link
      target='_blank'
      rel='noopener noreferrer'
      href={'//' + rowData.vulnerabilityUrl}
    >
      {rowData.vulnerabilityDate}
    </Link>
  ),
}]

export default function RisksTable() {
	const dispatch = useDispatch()
  const tableData = useSelector(getRisks)
  const selectedAssetId = useSelector(getSelectedAssetId)
  const selectedRiskIndex = useSelector(getSelectedRiskIndex)

  function isSelectedRow(rowData) {
    const isSelectedAssetId = rowData.assetId === selectedAssetId
    const isSelectedRiskIndex = rowData.vulnerabilityUri === selectedRiskIndex
    return isSelectedAssetId && isSelectedRiskIndex
  }

  function handleRowClick(event, rowData) {
    dispatch(setSelectedRiskIndex(rowData.vulnerabilityUri))
    dispatch(setSelection({ assetId: rowData.assetId }))
  }

  return (
    <MaterialTable
      title='Risks'
      columns={COLUMNS}
      data={tableData}
      isSelectedRow={isSelectedRow}
      onRowClick={handleRowClick}
    />
  )
}
