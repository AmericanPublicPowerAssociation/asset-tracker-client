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
  isOpen,
  onClose,
}) {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const selectedAssetId = useSelector(getSelectedAssetId) 

  function handleChange(event) {
    setText(event.target.value)
  }

  function handleConfirm() {
    if (text !== selectedAssetId) {
      return
    }
    dispatch(deleteAsset(selectedAssetId))
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        Delete Asset
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the Asset ID to confirm deletion.
        </DialogContentText>
        <DialogContentText>
          Asset ID: {selectedAssetId}
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          label='Asset ID'
          type='text'
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          color='secondary'
          disabled={text !== selectedAssetId}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
