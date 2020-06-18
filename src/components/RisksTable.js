// TODO: Review from scratch
// TODO: Consider moving to asset-report-risks

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from '@material-ui/core/Link'
import MaterialTable from './MaterialTable'
import {
  // setPanMapToAsset,
  // setSelectedBusIndexes,
  setSelectedAssetId,
  setSelectedAssetIndexes,
  setSelectedBusId,
  setSelectedRiskIndex,
} from '../actions'
import {
  getAssetsGeoJson,
  getRisks,
  getSelectedRiskIndex,
} from '../selectors'

const RISK_TABLE_COLUMN_NAMES = [
  {
    title: 'Asset Name',
    field: 'assetName',
  },
  {
    title: 'Meter Count',
    field: 'meterCount',
  },
  {
    title: 'Aggregated Threat',
    field: 'threatScore',
  },
  /*
  {
    title: 'Vulnerability',
    field: 'threatDescription',
    width: '60%',
  },
  */
  {
    title: 'Published',
    field: 'vulnerabilityUrl',
    render: rowData => (
      <Link
        target='_blank'
        rel='noopener noreferrer'
        href={'//' + rowData.vulnerabilityUrl}>{rowData.vulnerabilityDate}
      </Link>
    ),
  },
]

export default function RisksTable() {
	const dispatch = useDispatch()
  const { features } = useSelector(getAssetsGeoJson)
  const columns = RISK_TABLE_COLUMN_NAMES
  const risks = useSelector(getRisks)
  const selectedRiskIndex = useSelector(getSelectedRiskIndex)

  function handleRowClick(e, rowData) {
    const { assetId } = rowData

    const selectedAssetIndexes = []
    const selectedAssetIndex = features.findIndex(
      feature => feature.properties.id === assetId)
    if (selectedAssetIndex > -1) {
      selectedAssetIndexes.push(selectedAssetIndex)
      // TODO: Rename
      // TODO: Combine below into a single dispatch
      // dispatch(setPanMapToAsset(features[selectedAssetIndex]))
    }
    dispatch(setSelectedAssetIndexes(selectedAssetIndexes))
    // dispatch(setSelectedBusIndexes([]))
    dispatch(setSelectedAssetId(assetId))
    dispatch(setSelectedBusId(null))
    dispatch(setSelectedRiskIndex(rowData.tableData.id))
  }

  return (
    <MaterialTable
      isSelectedRow={rowData => rowData.tableData.id === selectedRiskIndex}
      columns={columns}
      data={risks}
      onRowClick={handleRowClick}
    />
  )
}
