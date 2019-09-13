import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import LeftCloseIcon from '@material-ui/icons/ChevronLeft'
import DashboardsIcon from '@material-ui/icons/Dashboard'
import SignInIcon from '@material-ui/icons/Lock'
import SignOutIcon from '@material-ui/icons/LockOpen'
import AssetsIcon from '@material-ui/icons/ListAlt'
import MapsIcon from '@material-ui/icons/Map'
import LogsIcon from '@material-ui/icons/Assignment'
import RisksIcon from '@material-ui/icons/ErrorOutline'
import CircuitsIcon from '@material-ui/icons/SettingsInputComponent'
import ExportsIcon from '@material-ui/icons/GetApp'
import SettingsIcon from '@material-ui/icons/Settings'
import ListItemLink from './ListItemLink'
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import {
  NAVIGATION_DRAWER_WIDTH,
  TOOLTIP_DELAY,
} from '../constants'


const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${theme.spacing(1)}px`,
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerPaper: {
    width: NAVIGATION_DRAWER_WIDTH,
  },
})


class NavigationDrawer extends PureComponent {

  render() {
    const {
      classes,
      authUrl,
      isNavigationDrawerOpen,
      isUserAuthenticated,
      closeNavigationDrawer,
    } = this.props

    return (
      <Drawer
        variant='persistent'
        anchor='left'
        classes={{
          paper: classes.drawerPaper,
        }}
        open={isNavigationDrawerOpen}
        onClose={closeNavigationDrawer}
      >
        <div className={classes.drawerHeader}>

          <Tooltip title='Close' enterDelay={TOOLTIP_DELAY}>
            <IconButton onClick={closeNavigationDrawer}>
              <LeftCloseIcon />
            </IconButton>
          </Tooltip>

        </div>
        <Divider />
        <List>
        {isUserAuthenticated ?
          <>
            <ListItemLink to='/' text='Dashboards'
              icon={<DashboardsIcon />} />
            <ListItemLink to='/tasks' text='Tasks'
              icon={<AlarmOnIcon />} />
            <ListItemLink to='/assets' text='Assets'
              icon={<AssetsIcon />} />
            <ListItemLink to='/maps' text='Maps'
              icon={<MapsIcon />} />
            <ListItemLink to='/circuits' text='Circuits'
              icon={<CircuitsIcon />} />
            <ListItemLink to='/risks' text='Risks'
              icon={<RisksIcon />} />
            <ListItemLink to='/logs' text='Logs'
              icon={<LogsIcon />} />
            <ListItemLink to='/exports' text='Exports'
              icon={<ExportsIcon />} />
            <ListItemLink to='/settings' text='Settings'
              icon={<SettingsIcon />} />
            <ListItemLink to={authUrl} text='Sign Out'
              icon={<SignOutIcon />} redirect />
          </> :
            <ListItemLink to={authUrl} text='Sign In'
              icon={<SignInIcon />} redirect />
        }
        </List>
      </Drawer>
    )
  }

}


export default withStyles(styles)(NavigationDrawer)
