import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import {
  INFORMATION_DRAWER_WIDTH,
  NAVIGATION_DRAWER_WIDTH,
  RIGHT_DRAWER_MINIMUM_WIDTH,
} from '../constants'

const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarWithNavigation: {
    width: `calc(100% - ${NAVIGATION_DRAWER_WIDTH}px)`,
    marginLeft: NAVIGATION_DRAWER_WIDTH,
  },
  appBarWithInformation: {
    width: `calc(100% - ${INFORMATION_DRAWER_WIDTH}px)`,
    marginRight: INFORMATION_DRAWER_WIDTH,
    [theme.breakpoints.down('md')]: {
      width: `calc(100% - ${RIGHT_DRAWER_MINIMUM_WIDTH}px)`,
      marginRight: RIGHT_DRAWER_MINIMUM_WIDTH,
    },
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  vanish: {
    display: 'none',
  },
})

class ApplicationBar extends PureComponent {
  render() {
    const {
      classes,
      // Get local variables
      isNavigationDrawerOpen,
      isInformationDrawerOpen,
      openNavigationDrawer,
      // Get global variables
    } = this.props
    const isDrawerOpen = isNavigationDrawerOpen || isInformationDrawerOpen
    const applicationTitle = 'Asset Tracker'
    return (
      <AppBar
        className={classNames(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen,
          [classes.appBarWithNavigation]: isNavigationDrawerOpen,
          [classes.appBarWithInformation]: isInformationDrawerOpen,
        })}
      >
        <Toolbar
          disableGutters={!isNavigationDrawerOpen}
        >
          <IconButton
            aria-label='Open Navigation'
            color='inherit'
            className={classNames(classes.menuButton, {
              [classes.vanish]: isNavigationDrawerOpen,
            })}
            onClick={openNavigationDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            color='inherit'
            // className={classes.grow}
            noWrap
          >{applicationTitle}</Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(ApplicationBar)
