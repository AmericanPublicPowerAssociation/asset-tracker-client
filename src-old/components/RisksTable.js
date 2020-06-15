import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  RisksTable as RawRisksTable,
} from 'asset-report-risks'
import {
  getAssetsGeoJson,
} from '../selectors'
import {
  setSelectedAssetId,
  setSelectedBusId,
  setSelectedAssetIndexes,
  // setSelectedBusIndexes,
  // setPanMapToAsset,
} from '../actions'

export default function RisksTable() {
	const dispatch = useDispatch()
  const { features } = useSelector(getAssetsGeoJson)

  function handleRowClick(assetId) {
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
  }

  return (
		<RawRisksTable
      onRowClick={handleRowClick}
		/>
  )
}
