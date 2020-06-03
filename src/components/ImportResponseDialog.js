import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import ErrorIcon from '@material-ui/icons/Error'
import IconButton from '@material-ui/core/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'
import Typography from '@material-ui/core/Typography'
import WarningIcon from '@material-ui/icons/Warning'

const useStyles = makeStyles(theme => ({
  successButton: {
    marginTop: '1rem',
    color: 'white',
    background: '#4caf50',
    '&:hover': {
      background: '#4caf50',
    },
  },
  successTopBox: {
    background: '#4caf50',
  },
  errorButton: {
    marginTop: '1rem',
    color: 'white',
    background: '#e2747e',
    '&:hover': {
      background: '#e2747e',
    },
  },
  errorTopBox: {
    background: '#e2747e',
  },
  svgIcon: {
    fontSize: '80px',
    color: 'white',
  },
  textCenter: {
    textAlign: 'center',
  },
}))


const messages = {
  'success': {
    displayMessageTitle: 'Great!',
    displayMessage: 'The CSV file has been uploaded successfully.',
    displayIcon: CheckCircleIcon,
  },
  'warning': {
    displayMessageTitle: 'Oh snap!',
    displayMessage: 'Certain assets were not uploaded successfully.',
    displayIcon: WarningIcon,
  },
  'error': {
    displayMessageTitle: 'Sorry!',
    displayMessage: 'An error has occured while uploading the CSV file.',
    displayIcon: CheckCircleIcon,
  },
}

export default function ImportResponseDialog({ open, onClose, response }) {
  const classes = useStyles()
  const result = 'error'

  const { displayMessageTitle, displayMessage, displayIcon } = messages[result]
  return (
    <Dialog open={open} onClose={onClose} >
      <Box pb={2} className={classes.textCenter} >
        <Box p={2} className={clsx({
          [classes.successTopBox]: result === 'success',
          [classes.errorTopBox]: result !== 'success',
          })} >
          <SvgIcon component={displayIcon} className={classes.svgIcon} />
        </Box>
        <DialogContent>
          <Container maxWidth="sm">
            <h1>{displayMessageTitle}</h1>
            <Typography>{displayMessage}</Typography>
          </Container>
        </DialogContent>
        <Button
          variant="contained" color="primary" size="large"
          onClick={onClose}
          className={clsx({
            [classes.successButton]: result === 'success',
            [classes.errorButton]: result !== 'success',
          })} >
          Close
        </Button>
      </Box>
    </Dialog>
  )
}
