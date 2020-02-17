import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import AssetsTable from './AssetsTable'
import TasksTable from './TasksTable'
import RisksTable from './RisksTable'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    left: theme.spacing(1),
    bottom: theme.spacing(5),
    right: theme.spacing(34),
    padding: theme.spacing(1),
    overflow: 'hidden',
  },
  table: {
    height: theme.spacing(34),
    overflowY: 'auto',
  },
}))

export default function TablesWindow(props) {
  const classes = useStyles()
  const {
    overlayMode,
    setSelectedAssetIndexes,
  } =  props
  const table = {
    assets: <AssetsTable
      setSelectedAssetIndexes={setSelectedAssetIndexes}
    />,
    tasks: <TasksTable />,
    risks: <RisksTable />,
  }[overlayMode]

  return (
    <Paper
      className={classes.root}>
      <div className={classes.table}>
        {/* <MyTable {...tableProps} /> */}
        {/* TODO: Show only what is visible in the map */}
        {/* TODO: Implement paging */}
        { table }
      </div>
    </Paper>
  )
}
