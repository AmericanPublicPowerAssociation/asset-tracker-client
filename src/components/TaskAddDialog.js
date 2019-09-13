import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TaskName from './TaskName'


const useStyles = makeStyles(theme => ({
  attribute: {
    margin: `${theme.spacing(3)}px 0 0 0`,
  },
}))


export default function TaskAddDialog(props) {
  const classes = useStyles()
  const {
    addTask,
    addingTask,
    closeTaskAddDialog,
    setAddingTaskValue,
  } = props

  function onCancel() {
    closeTaskAddDialog()
  }

  function onOk() {
    addTask(addingTask)
  }

  const open = addingTask.get('isOpen')
  const name = addingTask.get('name')
  const errors = addingTask.get('errors')
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      disableBackdropClick
    >
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <TaskName
          name={name}
          errorText={errors.get('name')}
          onChange={event => setAddingTaskValue({
            name: event.target.value})}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onOk} color='primary'>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}
