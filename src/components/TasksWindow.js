import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FixIcon from '@material-ui/icons/Build'
import DoneIcon from '@material-ui/icons/Check'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'


const useStyles = makeStyles(theme => ({
  hover: {
    cursor: 'pointer',
  },
  taskCancelled: {
    backgroundColor: 'red',
    color: 'white',
  },
  taskNew: {
    color: 'black',
  },
  taskPending: {
    backgroundColor: 'yellow',
    color: 'black',
  },
  taskDone: {
    backgroundColor: 'green',
    color: 'white',
  },
}))


export default function TasksWindow(props) {
  const classes = useStyles()
  const {
    taskById,
    refreshTasks,
    openTaskEditDialog,
    setEditingTaskValues,
  } = props

  useEffect(() => {
    refreshTasks()
  }, [refreshTasks])

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Task</TableCell>
          <TableCell>Asset</TableCell>
          <TableCell>Reference URI</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell align='right'>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
    {taskById.entrySeq().map(([id, task]) => {
      const taskStatus = task.get('status')
      const taskStatusClassName = {
        '-100': classes.taskCancelled,
        '0': classes.taskNew,
        '50': classes.taskPending,
        '100': classes.taskDone,
      }[taskStatus]
      return (
        <TableRow
          key={id}
          onClick={() => {
            setEditingTaskValues(task)
            openTaskEditDialog()
          }}
          hover
          classes={{ hover: classes.hover }}
        >
          <TableCell>{task.get('name')}</TableCell>
          <TableCell>{task.get('assetName')}</TableCell>
          <TableCell>{task.get('referenceUri')}</TableCell>
          <TableCell>{task.get('assignmentUserId', 'Ethan')}</TableCell>
          <TableCell align='right'>
            <IconButton
              className={taskStatusClassName}
              size='small'
              disableRipple
            >
              {taskStatus !== 100 ? <FixIcon /> : <DoneIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
      )
    })}
      </TableBody>
    </Table>
  )
}
