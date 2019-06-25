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
import TablesIcon from '@material-ui/icons/ListAlt'
import MapsIcon from '@material-ui/icons/Map'
// import CircuitsIcon from '@material-ui/icons/SettingsInputComponent'
import ReportsIcon from '@material-ui/icons/Assessment'
// import AlertsIcon from '@material-ui/icons/Notifications'
// import BookmarksIcon from '@material-ui/icons/Bookmarks'
import SettingsIcon from '@material-ui/icons/Settings'
import ListItemLink from './ListItemLink'
import {
  NAVIGATION_DRAWER_WIDTH,
  TOOLTIP_DELAY,
} from '../constants'


const styles = theme => ({
  drawerPaper: {
    width: NAVIGATION_DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${theme.spacing.unit}px`,
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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

          <Tooltip title='Close Navigation' enterDelay={TOOLTIP_DELAY}>
            <IconButton onClick={closeNavigationDrawer}>
              <LeftCloseIcon />
            </IconButton>
          </Tooltip>

        </div>
        <Divider />
        <List>
        {isUserAuthenticated ?
          <>
            <ListItemLink to='/' text='Dashboards' icon={<DashboardsIcon />} />
            <ListItemLink to='/tables' text='Tables' icon={<TablesIcon />} />
            <ListItemLink to='/maps' text='Maps' icon={<MapsIcon />} />
            {/*
            <ListItemLink to='/circuits' text='Circuits' icon={<CircuitsIcon />} />
            */}
            <ListItemLink to='/reports' text='Reports' icon={<ReportsIcon />} />
            {/*
            <ListItemLink to='/alerts' text='Alerts' icon={<AlertsIcon />} />
            <ListItemLink to='/bookmarks' text='Bookmarks' icon={<BookmarksIcon />} />
            */}
            <ListItemLink to='/settings' text='Settings' icon={<SettingsIcon />} />
            <ListItemLink to={authUrl} text='Sign Out' icon={<SignOutIcon />} redirect />
          </> :
          <ListItemLink to={authUrl} text='Sign In' icon={<SignInIcon />} redirect />
        }
        </List>
      </Drawer>
    )
  }

}


export default withStyles(styles)(NavigationDrawer)
