import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TaskName from './TaskName'
import TaskStatusSelect from './TaskStatusSelect'


const useStyles = makeStyles(theme => ({
  attribute: {
    margin: `${theme.spacing(3)}px 0 0 0`,
  },
}))


export default function TaskEditDialog(props) {
  const classes = useStyles()
  const {
    editTask,
    editingTask,
    closeTaskEditDialog,
    setEditingTaskValues,
  } = props

  function onCancel() {
    closeTaskEditDialog()
  }

  function onOk() {
    editTask(editingTask)
  }

  const id = editingTask.get('id')
  const open = editingTask.get('isOpen')
  const name = editingTask.get('name')
  const status = editingTask.get('status')
  const errors = editingTask.get('errors')

  return (
    <Dialog open={open} onClose={onCancel} disableBackdropClick>
      <DialogTitle>{id ? 'Edit': 'Add'} Task</DialogTitle>
      <DialogContent>
        <TaskName
          name={name}
          errorText={errors.get('name')}
          onChange={event => setEditingTaskValues({
            name: event.target.value})}
        />
        <TaskStatusSelect
          value={status}
          className={classes.attribute}
          onChange={event => setEditingTaskValues({
            status: event.target.value})}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onOk} color='primary'>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}
