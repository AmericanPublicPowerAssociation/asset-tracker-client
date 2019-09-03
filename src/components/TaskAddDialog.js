import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
// import { withStyles } from '@material-ui/core/styles'

// import AssetTypeSelect from '../containers/AssetTypeSelect'
// import AssetName from './AssetName'


// const styles = theme => ({
//   attribute: {
//     margin: `${theme.spacing(3)}px 0 0 0`,
//   },
// })


export default function TaskAddDialog() {
  const [open, setOpen] = React.useState(false);
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  return (
      <>
      <Dialog
        open = {open}
      >Task
      
      <DialogTitle>
        Add a New Task
      </DialogTitle>
      <DialogContent>
        Content
      </DialogContent>
      <DialogActions>
        <Button onClick = {handleClose}>
          Cancel
        </Button>
        <Button onClick = {handleClose}>
          Add
        </Button>
      </DialogActions>
      </Dialog>
      <IconButton onClick={handleClickOpen}>
      <AddIcon />
      </IconButton>
      </>
  )

//   onCancel = () => {
//     // const { closeTaskAddDialog } = this.props
//     // closeTaskAddDialog()
//   }

//   onOk = () => {
//     // const { addingTask, addTask } = this.props
//     // addTask(addingTask)
//   }

//   render() {
//     const {
//       classes,
//       addingTask,
//       setAddingTaskValue,
//     } = this.props
//     //const open = addingTask.get('isOpen')
//     //const typeId = addingTask.get('typeId')
//     // const name = addingTask.get('name')
//     // const errors = addingTask.get('errors')
//     return (
//       <Dialog
//         open = {true}
//         onClose={this.onCancel}
//         disableBackdropClick
//       >
//         <DialogTitle>Add Task</DialogTitle>
//         <DialogContent>
//           {/*<AssetTypeSelect
//             value={typeId}
//             onChange={event => setAddingTaskValue({
//               typeId: event.target.value})}
//             />*/}
//            {/*<AssetName
//             name={name}
//             errorText={errors.get('name')}
//             className={classes.attribute}
//             onChange={event => setAddingTaskValue({
//               name: event.target.value})}
//             />*/}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={this.onCancel}>Cancel</Button>
//           <Button onClick={this.onOk} color='primary'>Ok</Button>
//         </DialogActions>
//       </Dialog>
//     )
//   }
}


// export default withStyles(styles)(TaskAddDialog)