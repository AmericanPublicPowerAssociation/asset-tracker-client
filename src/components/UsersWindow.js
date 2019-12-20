import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import SeeUserIcon from '@material-ui/icons/AccountCircle'
import SignOutIcon from '@material-ui/icons/LockOpen'
import {
  USER_NAME,
} from '../constants'
import {
  getColors,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: 0,
    right: 0,
  },
}))

export default function UsersWindow() {
  const classes = useStyles()
  const colors = useSelector(getColors)
  const buttonColor = colors.button
  return (
    <div className={classes.root}>

      <Tooltip title={USER_NAME}>
        <IconButton
          className={buttonColor}
        >
          <SeeUserIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='Sign Out'>
        <IconButton
          className={buttonColor}
        >
          <SignOutIcon />
        </IconButton>
      </Tooltip>

    </div>
  )
}
