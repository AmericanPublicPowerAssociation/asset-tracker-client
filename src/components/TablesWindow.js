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
    right: theme.spacing(1),
    height: '33%',
    bottom: theme.spacing(5),
    padding: theme.spacing(1),
    overflow: 'auto',
  },
}))

export default function TablesWindow(props) {
  const classes = useStyles()
  const {
    overlayMode,
    setSelectedAssetIndexes,
    setSelectedBusIndexes,
  } =  props

  const table = {
    assets: <AssetsTable
      setSelectedAssetIndexes={setSelectedAssetIndexes}
      setSelectedBusIndexes={setSelectedBusIndexes}
    />,
    tasks: <TasksTable />,
    risks: <RisksTable />,
  }[overlayMode]

  return (
    <Paper className={classes.root}>
      {/* <MyTable {...tableProps} /> */}
      {/* TODO: Show only what is visible in the map */}
      {/* TODO: Implement paging */}
      { table }
    </Paper>
  )
}
