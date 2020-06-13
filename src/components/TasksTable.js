import React, { useEffect, forwardRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MaterialTable from './MaterialTable'
import {
  setSelectedTaskId,
} from '../actions'
import {
  getTaskPriorityLabel,
  getTaskStatusLabel,
} from '../routines'
import {
  getOpenTaskById,
  getSelectedTaskId,
} from '../selectors'

const TASK_TABLE_COLUMN_NAMES = [
  'name',
  'description',
  'priority',
  'status',
]

export default function TasksTable(props) {
  const tableName = 'Tasks'
  const dispatch = useDispatch()
  const taskById = useSelector(getOpenTaskById)
  const selectedTaskId = useSelector(getSelectedTaskId)
  const {
    getHeaderLabel,
    highlightAsset,
    selectedAssetId,
    tableOptions,
  } = props

  useEffect(() => {
    return () => {
      dispatch(setSelectedTaskId(null))
    }
  }, [dispatch])

  const data = Object.values(taskById).map(
    task => {
      return {
        ...task,
        status: getTaskStatusLabel(task.status),
        priority: getTaskPriorityLabel(task.priority),
      }
  })

  const columns = TASK_TABLE_COLUMN_NAMES.map( field => {
    return { field, title: getHeaderLabel(field) }
  })

  function handleOnRowClick(event, rowData) {
    const { assetId } = rowData
    dispatch(setSelectedTaskId(rowData.id))
    highlightAsset(assetId)
  }

  function rowStyle(rowData) {
    let backgroundColor = '#FFF'
    if (selectedAssetId === rowData.assetId && selectedTaskId === rowData.id)
      backgroundColor = '#EEE'
    return { backgroundColor }
  }

  return (
    <MaterialTable
      title={tableName}
      options={{ ...tableOptions, rowStyle }}
      columns={columns}
      data={data}
      onRowClick={handleOnRowClick}
    />
  )
}
