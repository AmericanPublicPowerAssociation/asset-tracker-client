import React, { useEffect } from 'react'
import {
  RisksTable,
} from 'asset-report-risks'


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
    <RisksTable
      risks={risks}
      openTaskEditDialog={openTaskEditDialog}
      setEditingTaskValues={setEditingTaskValues}
    />
  )
}
