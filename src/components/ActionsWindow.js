import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import SeeUserIcon from '@material-ui/icons/AccountCircle'
// import SignOutIcon from '@material-ui/icons/LockOpen'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
// import MenuItem from '@material-ui/core/MenuItem'
// import MenuList from '@material-ui/core/MenuList'
import {
  getAuthUrl,
  getAuthName,
  getAuthEmail,
} from 'appa-auth-consumer'
// import {
  // USER_NAME,
// } from '../constants'
import {
  toggleState,
} from '../macros'
import {
  getMapColors,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 2,
  },
  paper: {
    width: '200px',
    padding: theme.spacing(2),
  },
  signout: {
    borderRadius: theme.spacing(2),
    borderColor: 'black',
  },
  subMenu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  popper: {
     marginTop: '-0.3em',
  },
  emailText: {
    paddingTop: 'none',
    color: 'gray',
    fontSize: '0.8125rem',
  },
  infoWrap: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
    width: '100%',
  },
}))

export default function ActionsWindow({
  isWithImportExportDialog,
  setIsWithImportExportDialog,
}) {
  const classes = useStyles()
  const [isShowUserMenu, setIsShowUserMenu] = useState(false)
  const menuButtonRef = useRef(null)
  const mapColors = useSelector(getMapColors)
  const activeColor = mapColors.active
  const inactiveColor = mapColors.inactive
  const authUrl = useSelector(getAuthUrl)
  const authName = useSelector(getAuthName)
  const authEmail = useSelector(getAuthEmail)

  return (
    <div className={classes.root}>
      <Tooltip title='Import and Export Assets'>
        <IconButton
          className={isWithImportExportDialog ? activeColor : inactiveColor}
          disabled={!isWithImportExportDialog}
          onClick={() => setIsWithImportExportDialog(toggleState) }
        >
          <ImportExportIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='User Settings'>
        <IconButton
          className={activeColor}
          ref={menuButtonRef}
          aria-controls={isShowUserMenu ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          onClick={() => setIsShowUserMenu(true)}
        >
          <SeeUserIcon />
        </IconButton>
      </Tooltip>
      <Popper
        open={isShowUserMenu}
        anchorEl={menuButtonRef.current}
        role={undefined} transition disablePortal
        className={classes.popper}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: 'bottom' }}
          >
            <Paper elevation={10} className={classes.paper}>
              <ClickAwayListener onClickAway={() => setIsShowUserMenu(false)}>
                <div className={classes.subMenu}>
                  <div className={classes.infoWrap}>
                    <Typography variant='h6' align='center'>{authName}</Typography>
                    <Typography align='center' className={classes.emailText} noWrap>{authEmail}</Typography>
                  </div>
                  <div>
                    <Button variant='outlined' className={classes.signout} href={authUrl} size='small'>
                      Log Out
                    </Button>
                  </div>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
