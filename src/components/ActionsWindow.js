import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import Tooltip from '@material-ui/core/Tooltip'
import SeeUserIcon from '@material-ui/icons/AccountCircle'
import SignOutIcon from '@material-ui/icons/LockOpen'
import {
  USER_NAME,
} from '../constants'
import {
  getColors,
} from '../selectors'
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: 0,
    right: 0,
  },
}))

export default function ActionsWindow(props) {
  const classes = useStyles()
  const colors = useSelector(getColors)
  const activeColor = colors.active
  const {
    showImportExport,
  } = props
  return (
    <div className={classes.root}>
      <Tooltip title='Import and Export Assets'>
        <IconButton onClick={showImportExport} className={activeColor}>
          <ImportExportIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={`See Agenda for ${USER_NAME}`}>
        <IconButton className={activeColor}>
          <SeeUserIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='Sign Out'>
        <IconButton className={activeColor}>
          <SignOutIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}
