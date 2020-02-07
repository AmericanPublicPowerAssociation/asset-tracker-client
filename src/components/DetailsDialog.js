import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function DetailsDialog(props) {
  const {
    showDetails,
    handleClose,
    assetId,
  } = props

  const classes = useStyles()

  return (
    <Dialog
      fullScreen
      open={showDetails}
      TransitionComponent={Transition}
    >
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Asset Details
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        {assetId}
      </div>
    </Dialog>
  )
}
