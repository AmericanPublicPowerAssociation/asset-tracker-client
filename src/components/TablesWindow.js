// TODO: Toggle whether to show only what is visible in the map

import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AssetsTable from './AssetsTable'
import TasksTable from './TasksTable'
import RisksTable from './RisksTable'
import {
  getOverlayMode,
} from '../selectors'
import {
  IsLayoutMobileContext,
} from '../contexts'

const DRAWER_CLASSES = {
  paper: 'no-overflow-x',
}

const useStyles = makeStyles(theme => ({
  'paperCustom': {
    'position': 'relative',
    'width': '100vw',
    'marginTop': '10px',
  },
}))

export default function TablesWindow({
  isWithTables,
}) {
  const classes = useStyles()
  const isLayoutMobile = useContext(IsLayoutMobileContext)
  const overlayMode = useSelector(getOverlayMode)
  const table = {
    assets: <AssetsTable />,
    tasks: <TasksTable />,
    risks: <RisksTable />,
  }[overlayMode]

  return (
    <>
      {isLayoutMobile ?
        <Drawer
          anchor='bottom'
          variant='persistent'
          open={isWithTables}
          classes={{ paper: classes.paperCustom }}
        >
          {table}
        </Drawer>
      :
        <Drawer
          anchor='bottom'
          variant='persistent'
          open={isWithTables}
          classes={DRAWER_CLASSES}
        >
          {table}
        </Drawer>
      }
    </>
  )
}
