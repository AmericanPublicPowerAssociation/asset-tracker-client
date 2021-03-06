// TODO: Review from scratch

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import {
  hideMessage,
} from '../actions'
import {
  MESSAGE_HIDE_DELAY,
} from '../constants'
import {
  getMessage,
} from '../selectors'

export default function MessageBar() {
  const dispatch = useDispatch()
  const { text, severity, isOpen } = useSelector(getMessage)

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }
    dispatch(hideMessage())
  }

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={MESSAGE_HIDE_DELAY}
      onClose={handleClose}
    >
      <Alert
        severity={severity}
        variant='filled'
        onClose={handleClose}
      >
        {text}
      </Alert>
    </Snackbar>
  )
}
