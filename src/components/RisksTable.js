import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  RisksTable as Risks,
	refreshRisks,
	getSortedRisks,
  getRisks,
} from 'asset-report-risks'
import {
  getAssetsGeoJson,
} from '../selectors'
import {
  setFocusingAssetId,
  setFocusingBusId,
  setSelectedAssetIndexes,
  // setSelectedBusIndexes,
  // setPanMapToAsset,
} from '../actions'

export default function RisksTable() {
	const dispatch = useDispatch()
	const risks = useSelector(getRisks)
	const sortedRisks = useSelector(getSortedRisks)
  const { features } = useSelector(getAssetsGeoJson)

  useEffect(() => {
    const { sortKey, order } = sortedRisks
    dispatch(refreshRisks({ sortKey, order }))
  }, [dispatch, sortedRisks])

  function onRowClickCallBack(assetId) {
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
    dispatch(setFocusingAssetId(assetId))
    dispatch(setFocusingBusId(null))
  }

  return (
		<Risks
			risks={risks}
			sortedRisks={sortedRisks}
			refreshRisks={refreshRisks}
      onRowClickCallBack={onRowClickCallBack}
		/>
  )
}
