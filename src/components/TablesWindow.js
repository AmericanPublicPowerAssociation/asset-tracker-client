// TODO: Toggle whether to show only what is visible in the map

import React from 'react'
import { useSelector } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import AssetsTable from './AssetsTable'
import TasksTable from './TasksTable'
import RisksTable from './RisksTable'
import {
  getOverlayMode,
} from '../selectors'

const DRAWER_CLASSES = {
  paper: 'no-overflow-x',
}

export default function TablesWindow({
  isWithTables,
}) {
  const overlayMode = useSelector(getOverlayMode)
  const table = {
    assets: <AssetsTable />,
    tasks: <TasksTable />,
    risks: <RisksTable />,
  }[overlayMode]

  return (
    <Drawer
      anchor='bottom'
      variant='persistent'
      open={isWithTables}
      classes={DRAWER_CLASSES}
    >
      {table}
    </Drawer>
  )
}
