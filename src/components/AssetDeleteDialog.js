// TODO: Review from scratch

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
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


const useStyles = makeStyles(theme => ({
  buttons: {
    justifyContent: 'space-between',
  },
  center: {
    textAlign: 'center',
  },
  delete: {
    backgroundColor: '#d22d2a',
    '&:hover': {
      backgroundColor: '#aa2623',
    },
  },
}))



export default function AssetDeleteDialog({
  deletedAssetId,
  isOpen,
  onClose,
}) {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const classes = useStyles()

  function handleChange(event) {
    setText(event.target.value)
  }

  function handleConfirm() {
    dispatch(deleteAsset(deletedAssetId))
    onClose()
  }

  return (
    <Dialog open={isOpen || false} onClose={onClose}>
      <DialogTitle className={classes.center}>
        Delete Asset
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.center}>
          You will permanently lose its:
          <br/>-tasks
          <br/>-risks
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.buttons}>
        <Button size='large' variant='outlined' onClick={onClose}>
          Cancel
        </Button>

        <Button
          classes={{
            containedSecondary: classes.delete,
          }}
          size='large'
          color='secondary'
          variant='contained'
          onClick={handleConfirm}
          disableElevation
        >
          Delete asset
        </Button>
      </DialogActions>
    </Dialog>
  )
}
