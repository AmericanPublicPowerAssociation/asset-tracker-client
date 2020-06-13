import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
  deleteAsset,
} from '../actions'
import {
  getSelectedAssetId,
} from '../selectors'


export default function AssetDeleteDialog({
  onClose,
  openDialog,
}) {
  const [input, setInput] = useState('')
  const selectedAssetId = useSelector(getSelectedAssetId) 
  const dispatch = useDispatch()

  function handleClose(e) {
    onClose()
  }

  function onConfirm(e) {
    if (input === selectedAssetId) {
      dispatch(deleteAsset(selectedAssetId))
      onClose()
    }
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby='delete-dialog-title'
      aria-describedby='delete-dialog-description'
    >
      <DialogTitle id='delete-dialog-title'>{'Do you want to delete this asset?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='delete-dialog-description'>
          Please enter the asset id in the text input below and confirm.
        </DialogContentText>
        <DialogContentText>
          Asset Id: {selectedAssetId}
        </DialogContentText>
        <TextField
          autoFocus
          label='Asset Id'
          type='text'
          fullWidth
          onChange={ (e) => setInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onConfirm} color='primary' disabled={input !== selectedAssetId}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
