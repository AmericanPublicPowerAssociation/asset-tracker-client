import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TaskName from './TaskName'


export default function TaskEditDialog(props) {
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onOk} color='primary'>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}
