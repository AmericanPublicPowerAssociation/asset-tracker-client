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
} from '../actions'

export default function RisksTable(props) {
	const dispatch = useDispatch()
  const {
    setSelectedAssetIndexes,
  } = props
	const risks = useSelector(getRisks)
	const sortedRisks = useSelector(getSortedRisks)
  const { features } = useSelector(getAssetsGeoJson)

  useEffect(() => {
    const { sortKey, order } = sortedRisks
    dispatch(refreshRisks({sortKey, order}))
  }, [dispatch, sortedRisks])

  function onRowClickCallBack(assetId) {
    const selectedIndex = features.findIndex(
      (feature) => feature.properties.id === assetId)
    dispatch(setFocusingAssetId(assetId))
    setSelectedAssetIndexes([selectedIndex])
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
