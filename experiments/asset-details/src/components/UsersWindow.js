import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import SeeUserIcon from '@material-ui/icons/AccountCircle'
import SignOutIcon from '@material-ui/icons/LockOpen'
import {
  TOOLTIP_DELAY,
  USER_NAME,
} from '../constants'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: 0,
    right: 0,
    padding: theme.spacing(1),
  },
}))

function UsersWindow(props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>

      <Tooltip title={USER_NAME} enterDelay={TOOLTIP_DELAY}>
        <IconButton>
          <SeeUserIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='Sign Out' enterDelay={TOOLTIP_DELAY}>
        <IconButton>
          <SignOutIcon />
        </IconButton>
      </Tooltip>

    </div>
  )
}

export default UsersWindow
