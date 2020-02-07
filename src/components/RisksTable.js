import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import {
  RisksTable as Risks,
	refreshRisks,
	getSortedRisks,
  getRisks,
} from 'asset-report-risks'


export default function RisksTable(props) {
	const dispatch = useDispatch()

	const visibleRisks = useSelector(getRisks)
	const sortedRisks = useSelector(getSortedRisks)

  useEffect(() => {
    const { sortKey, order } = sortedRisks.toJS()
    dispatch(refreshRisks({sortKey, order}))
  }, [sortedRisks, refreshRisks])

  return (
		<Risks
			risks={visibleRisks}
			sortedRisks={sortedRisks}
			refreshRisks={refreshRisks}
		/>
  )
}
