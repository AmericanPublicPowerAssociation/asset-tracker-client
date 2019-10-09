import React, { useEffect } from 'react'
import {
  RisksTable,
} from 'asset-report-risks'
import SummaryWindow from '../containers/SummaryWindow'


export default function RisksWindow(props) {
  const {
    refreshRisks,
    risks,
    openTaskEditDialog,
    setEditingTaskValues,
  } = props

  useEffect(() => {
    refreshRisks()
  }, [refreshRisks])

  return (
    <>
      <SummaryWindow />
      <RisksTable
        risks={risks}
        openTaskEditDialog={openTaskEditDialog}
        setEditingTaskValues={setEditingTaskValues}
      />
    </>
  )
}
