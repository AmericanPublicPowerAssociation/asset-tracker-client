import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import DownloadIcon from '@material-ui/icons/VerticalAlignBottom'
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

export default function UsersWindow(props) {
  const classes = useStyles()
  const colors = useSelector(getColors)
  const activeColor = colors.active
  const {
    onDownloader
  } = props;
  return (
    <div className={classes.root}>
      <Tooltip title='Download DSS Script'>
        <IconButton  onClick={onDownloader} aria-label='Download DSS Script' className={activeColor}
          ><DownloadIcon /> </IconButton>
      </Tooltip>
      <Tooltip title={USER_NAME}>
        <IconButton
          className={activeColor}
        >
          <SeeUserIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='Sign Out'>
        <IconButton
          className={activeColor}
        >
          <SignOutIcon />
        </IconButton>
      </Tooltip>

    </div>
  )
}
