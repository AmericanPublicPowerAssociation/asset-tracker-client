import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import InputBase from '@material-ui/core/InputBase'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'


const useStyles = makeStyles(theme => ({
  taskCell: {
    paddingLeft: 0,
  },
  taskInput: {
    padding: 0,
  },
}))


export default function AssetTasks(props) {
  const classes = useStyles()
  const {
    className,
    assetId,
    taskById,
    setAddingTaskValue,
    openTaskAddDialog,
  } = props

  return (
      <FormControl fullWidth className={className}>
        <FormLabel>Tasks</FormLabel>

      <Table>
      {taskById.entrySeq().map(([id, task]) => {
        return (
          <TableRow key={id}>
            <TableCell className={classes.taskCell}>{task.get('name')}</TableCell>
            <TableCell align='right'><Checkbox /></TableCell>
          </TableRow>
        )
      })}
          <TableRow>
            <TableCell className={classes.taskCell}>
              <InputBase
                fullWidth
                placeholder='Add Task'
                inputProps={{
                  className: classes.taskInput,
                }}
              />
            </TableCell>
          </TableRow>
      </Table>

      </FormControl>
  )
}
