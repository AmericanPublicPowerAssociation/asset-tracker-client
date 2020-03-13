import React from 'react'
import { useSelector } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {
  getTaskPriorityLabel,
  getTaskStatusLabel,
} from '../routines'
import {
  getOpenTaskById,
} from '../selectors'

const TASK_TABLE_COLUMN_NAMES = [
  'name',
  'description',
  'priority',
  'status',
]

export default function TasksTable(props) {
  const taskById = useSelector(getOpenTaskById)

  const data = Object.values(taskById).map(
    task => {
      return {
        ...task,
        status: getTaskStatusLabel(task.status),
        priority: getTaskPriorityLabel(task.priority),
      }
  })

  const head = TASK_TABLE_COLUMN_NAMES

  const name = 'task'

  function getHeaderLabel(header) {
    const result = header.replace( /([A-Z])/g, " $1" );
    var headerLabel = result.charAt(0).toUpperCase() + result.slice(1);
    return headerLabel
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          { head.map( header => {
            const key = `table-${name}-${header}`
            return <TableCell key={key} align='center'>{getHeaderLabel(header)}</TableCell>
          })}
        </TableRow>
      </TableHead>

      <TableBody>
      {data.map(task => {
        return (
          <TableRow key={task.id}>
            { head.map(header => {
              const key = `table-${name}-${header}-${task.id}`
              return (
                <TableCell
                  align='center'
                  key={key}
                >
                  {task[header]}
                </TableCell>
              )
            })}
          </TableRow>
        )}
      )}
      </TableBody>
    </Table>
  )
}
