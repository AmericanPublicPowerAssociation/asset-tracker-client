import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  RisksTable as Risks,
	refreshRisks,
	getSortedRisks,
  getRisks,
} from 'asset-report-risks'

export default function RisksTable(props) {
	const dispatch = useDispatch()

	const risks = useSelector(getRisks)
	const sortedRisks = useSelector(getSortedRisks)

  useEffect(() => {
    const { sortKey, order } = sortedRisks
    dispatch(refreshRisks({sortKey, order}))
  }, [dispatch, sortedRisks])

  return (
		<Risks
			risks={risks}
			sortedRisks={sortedRisks}
			refreshRisks={refreshRisks}
		/>
  )
}
