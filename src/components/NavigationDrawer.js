import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import DashboardsIcon from '@material-ui/icons/Dashboard'
import TablesIcon from '@material-ui/icons/ListAlt'
import MapsIcon from '@material-ui/icons/Map'
import CircuitsIcon from '@material-ui/icons/SettingsInputComponent'
import ReportsIcon from '@material-ui/icons/Assessment'
import AlertsIcon from '@material-ui/icons/Notifications'
import BookmarksIcon from '@material-ui/icons/Bookmarks'
import SettingsIcon from '@material-ui/icons/Settings'
import ListItemLink from './ListItemLink'
import { NAVIGATION_DRAWER_WIDTH } from '../constants'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: NAVIGATION_DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
})

class NavigationDrawer extends PureComponent {
  render() {
    const {
      classes,
      closeNavigationDrawer,
      ...etc
    } = this.props
    return (
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        {...etc}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={closeNavigationDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItemLink
            to='/'
            text='Dashboards'
            icon={<DashboardsIcon />}
          />
          <ListItemLink
            to='/tables'
            text='Tables'
            icon={<TablesIcon />}
          />
          <ListItemLink
            to='/maps'
            text='Maps'
            icon={<MapsIcon />}
          />
          <ListItemLink
            to='/circuits'
            text='Circuits'
            icon={<CircuitsIcon />}
          />
          <ListItemLink
            to='/reports'
            text='Reports'
            icon={<ReportsIcon />}
          />
          <ListItemLink
            to='/alerts'
            text='Alerts'
            icon={<AlertsIcon />}
            // badgeContent={3}
            // badgeColor='error'
          />
          <ListItemLink
            to='/bookmarks'
            text='Bookmarks'
            icon={<BookmarksIcon />}
          />
          <ListItemLink
            to='/settings'
            text='Settings'
            icon={<SettingsIcon />}
          />
          <ListItemLink
            to='/users/leave'
            text='Sign Out'
            inset
          />
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(NavigationDrawer)
