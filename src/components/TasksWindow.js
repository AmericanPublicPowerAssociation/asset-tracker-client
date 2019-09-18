import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'


const useStyles = makeStyles(theme => ({
  hover: {
    cursor: 'pointer',
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
      return (
        <TableRow
          key={id}
          onClick={() => {
            setEditingTaskValues(task)
            openTaskEditDialog()
          }}
          hover
          classes={{
            hover: classes.hover,
          }}
        >
          <TableCell>{task.get('name')}</TableCell>
          <TableCell>{task.get('assetName')}</TableCell>
          <TableCell>{task.get('referenceUri')}</TableCell>
          <TableCell>{task.get('assignmentUserId')}</TableCell>
          <TableCell align='right'>{task.get('status')}</TableCell>
        </TableRow>
      )
    })}
      </TableBody>
    </Table>
  )
}
