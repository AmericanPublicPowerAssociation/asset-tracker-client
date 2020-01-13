import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

function TasksTable(props) {
  const { tasks } = props
  return (
    <Table size='small'>
      <TableHead>
        <TableRow>
          <TableCell>Task</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {tasks.map(task =>
        <TableRow key={task.id}>
          <TableCell>{task.name}</TableCell>
          <TableCell>{{0: 'New', 50: 'In Progress'}[task.status]}</TableCell>
        </TableRow>
      )}
      </TableBody>
    </Table>
  )
}

export default TasksTable
