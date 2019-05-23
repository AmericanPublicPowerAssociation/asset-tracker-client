import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import {
  CONTENT_PADDING,
  INFORMATION_DRAWER_WIDTH,
  NAVIGATION_DRAWER_WIDTH,
  RIGHT_DRAWER_MINIMUM_WIDTH,
  TOOLTIP_DELAY,
} from '../constants'


const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    padding: `0 ${theme.spacing.unit}px 0 ${theme.spacing.unit}px`,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
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
    paddingLeft: CONTENT_PADDING,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
    },
  },
  appBarWithInformation: {
    width: `calc(100% - ${INFORMATION_DRAWER_WIDTH}px)`,
    marginRight: INFORMATION_DRAWER_WIDTH,
    [theme.breakpoints.down('md')]: {
      width: `calc(100% - ${RIGHT_DRAWER_MINIMUM_WIDTH}px)`,
      marginRight: RIGHT_DRAWER_MINIMUM_WIDTH,
    },
  },
  grow: {
    flexGrow: 1,
  },
  leftButton: {
    marginRight: 8,
  },
  vanish: {
    display: 'none',
  },
})


class ApplicationBar extends PureComponent {

  render() {
    const {
      classes,
      isUserMember,
      isNavigationDrawerOpen,
      isInformationDrawerOpen,
      openNavigationDrawer,
      openAssetAddDialog,
    } = this.props
    const isDrawerOpen = isNavigationDrawerOpen || isInformationDrawerOpen
    const applicationTitle = 'Asset Tracker'
    const assetAddButton = isUserMember &&
      <Tooltip title='Add Asset' enterDelay={TOOLTIP_DELAY}>
        <IconButton
          aria-label='Add Asset'
          color='inherit'
          onClick={openAssetAddDialog}
        ><AddIcon /></IconButton>
      </Tooltip>
    return (
      <AppBar
        className={classNames(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen,
          [classes.appBarWithNavigation]: isNavigationDrawerOpen,
          [classes.appBarWithInformation]: isInformationDrawerOpen,
        })}
      >
        <Toolbar disableGutters>
          <Tooltip title='Open Navigation' enterDelay={TOOLTIP_DELAY}>
            <IconButton
              aria-label='Open Navigation'
              color='inherit'
              className={classNames(classes.leftButton, {
                [classes.vanish]: isNavigationDrawerOpen,
              })}
              onClick={openNavigationDrawer}
            ><MenuIcon /></IconButton>
          </Tooltip>
          <Typography
            variant='h6'
            color='inherit'
            className={classes.grow}
            noWrap
          >{applicationTitle}</Typography>

          <Route exact path='/tables' render={() => assetAddButton }/>
          <Route exact path='/maps' render={() => assetAddButton }/>
          <Route exact path='/circuits' render={() => assetAddButton }/>

        </Toolbar>
      </AppBar>
    )
  }

}


export default withStyles(styles)(ApplicationBar)
