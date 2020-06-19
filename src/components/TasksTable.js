// TODO: Review from scratch

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MaterialTable from './MaterialTable'
import {
  setSelectedTaskId,
  setSelection,
} from '../actions'
import {
  getTaskPriorityLabel,
  getTaskStatusLabel,
} from '../routines'
import {
  getAssetById,
  getOpenTaskById,
  getSelectedAssetId,
  getSelectedTaskId,
} from '../selectors'

const COLUMNS = [{
  field: 'assetName',
  title: 'Asset Name',
}, {
  field: 'taskName',
  title: 'Task Name',
}, {
  field: 'description',
  title: 'Description',
}, {
  field: 'priority',
  title: 'Priority',
}, {
  field: 'status',
  title: 'Status',
}]

export default function TasksTable() {
  const dispatch = useDispatch()
  const taskById = useSelector(getOpenTaskById)
  const assetById = useSelector(getAssetById)
  const selectedAssetId = useSelector(getSelectedAssetId)
  const selectedTaskId = useSelector(getSelectedTaskId)

  const tableData = Object.values(taskById).map(
    task => {
      const assetId = task.assetId
      const assetName = assetById[assetId].name
      const taskName = task.name
      return {
        ...task,
        taskName,
        assetName,
        status: getTaskStatusLabel(task.status),
        priority: getTaskPriorityLabel(task.priority),
      }
  })

  function isSelectedRow(rowData) {
    const isSelectedAssetId = rowData.assetId === selectedAssetId
    const isSelectedTaskId = rowData.id === selectedTaskId
    return isSelectedAssetId && isSelectedTaskId
  }

  function handleRowClick(event, rowData) {
    dispatch(setSelectedTaskId(rowData.id))
    dispatch(setSelection({ assetId: rowData.assetId }))
  }

  return (
    <MaterialTable
      title='Tasks'
      columns={COLUMNS}
      data={tableData}
      isSelectedRow={isSelectedRow}
      onRowClick={handleRowClick}
    />
  )
}
