import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'


const useStyles = makeStyles(theme => ({
  table: {
  },
}))


export default function TasksWindow(props) {
  const classes = useStyles()
  const { tasks, refreshTasks } = props

  useEffect(() => {
    refreshTasks()
  }, [refreshTasks])

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Asset</TableCell>
          <TableCell>Reference URI</TableCell>
          <TableCell>Task</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell align='right'>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
    {tasks && tasks.map(task => {
      return (
        <TableRow>
          <TableCell>{task.get('assetName')}</TableCell>
          <TableCell>{task.get('referenceUri')}</TableCell>
          <TableCell>{task.get('name')}</TableCell>
          <TableCell>{task.get('assignmentUserId')}</TableCell>
          <TableCell align='right'>{task.get('status')}</TableCell>
        </TableRow>
      )
    })}
      </TableBody>
    </Table>
  )
}
