import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import CloseButton from './CloseButton'
import AssetsTable from './AssetsTable'
import TasksTable from './TasksTable'
import RisksTable from './RisksTable'
import './App.css'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    left: theme.spacing(1),
    bottom: theme.spacing(5),
    right: theme.spacing(34),
    height: theme.spacing(30),
    padding: theme.spacing(1),
  },
}))

function RowsWindow(props) {
  const classes = useStyles()
  const {
    isSketching,
    isWithRows,
    overlay,
    assets,
    tasks,
    risks,
    setIsWithRows,
  } = props
  const table = {
    assets: <AssetsTable assets={assets} />,
    tasks: <TasksTable tasks={tasks} />,
    risks: <RisksTable risks={risks} />,
  }[overlay]
  return (
    <Paper
      className={clsx(classes.root, {
        poof: isSketching || !isWithRows,
      })}
    >
      <CloseButton onClick={() => setIsWithRows(false)} />
      {table}
      {/* TODO: Show only what is visible in the map */}
      {/* TODO: Implement paging */}
    </Paper>
  )
}

export default RowsWindow
