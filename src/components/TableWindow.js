import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
// import MyTable from './MyTable'
import {
  // getAssetById,
  // getAssetTableData,
  // getOverlay,
} from '../selectors'
// import AssetsTable from './AssetsTable'
// import TasksTable from './TasksTable'
// import RisksTable from './RisksTable'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    left: theme.spacing(1),
    bottom: theme.spacing(5),
    right: theme.spacing(34),
    padding: theme.spacing(1),
    paddingRight: theme.spacing(5),
  },
  table: {
    height: theme.spacing(30),
    overflowY: 'auto',
  },
}))

export default function TableWindow(props) {
  const classes = useStyles()
  // const dispatch = useDispatch()
  // const overlay = useSelector(getOverlay)
  // const table = {
  //  assets: <AssetsTable assets={Object.values(assetById)} />,
  //  tasks: <TasksTable tasks={tasks} />,
  //  risks: <RisksTable risks={risks} />,
  //}[overlay]

  // const tableProps = useSelector(getAssetTableData)

  return (
    <Paper
      className={classes.root}>
      <div className={classes.table}>
        {/* <MyTable {...tableProps} /> */}
        {/* TODO: Show only what is visible in the map */}
        {/* TODO: Implement paging */}
      </div>
    </Paper>
  )
}
