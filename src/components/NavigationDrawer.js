import React, { Fragment, PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import DashboardsIcon from '@material-ui/icons/Dashboard'
import SignInIcon from '@material-ui/icons/Lock'
import SignOutIcon from '@material-ui/icons/LockOpen'
import TablesIcon from '@material-ui/icons/ListAlt'
import MapsIcon from '@material-ui/icons/Map'
import CircuitsIcon from '@material-ui/icons/SettingsInputComponent'
import ReportsIcon from '@material-ui/icons/Assessment'
// import AlertsIcon from '@material-ui/icons/Notifications'
// import BookmarksIcon from '@material-ui/icons/Bookmarks'
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
  render = () => {
    const {
      classes,
      isUserAuthenticated,
      closeNavigationDrawer,
      signIn,
      signOut,
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
        {isUserAuthenticated ?
          <Fragment>
            <ListItemLink to='/' text='Dashboards' icon={<DashboardsIcon />} />
            <ListItemLink to='/tables' text='Tables' icon={<TablesIcon />} />
            <ListItemLink to='/maps' text='Maps' icon={<MapsIcon />} />
            <ListItemLink to='/circuits' text='Circuits' icon={<CircuitsIcon />} />
            <ListItemLink to='/reports' text='Reports' icon={<ReportsIcon />} />
            {/*
            <ListItemLink to='/alerts' text='Alerts' icon={<AlertsIcon />} />
            <ListItemLink to='/bookmarks' text='Bookmarks' icon={<BookmarksIcon />} />
            */}
            <ListItemLink to='/settings' text='Settings' icon={<SettingsIcon />} />
            <ListItem button onClick={signOut}>
              <ListItemIcon>
                <SignOutIcon />
              </ListItemIcon>
              <ListItemText inset primary='Sign Out' />
            </ListItem>
          </Fragment> :
          <ListItem button onClick={signIn}>
            <ListItemIcon>
              <SignInIcon />
            </ListItemIcon>
            <ListItemText inset primary='Sign In' />
          </ListItem>
        }
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(NavigationDrawer)
