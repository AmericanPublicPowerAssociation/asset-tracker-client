import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import ProtectedRoute from '../containers/ProtectedRoute'
import DashboardsWindow from '../containers/DashboardsWindow'
import TasksWindow from '../containers/TasksWindow'
import AssetsWindow from '../containers/AssetsWindow'
import MapsWindow from '../containers/MapsWindow'
import CircuitsWindow from '../containers/CircuitsWindow'
import RisksWindow from '../containers/RisksWindow'
import LogsWindow from '../containers/LogsWindow'
import ExportsWindow from './ExportsWindow'
import SettingsWindow from '../containers/SettingsWindow'
import NotFoundWindow from './NotFoundWindow'
import {
  INFORMATION_DRAWER_WIDTH,
  NAVIGATION_DRAWER_WIDTH,
  RIGHT_DRAWER_MINIMUM_WIDTH,
} from '../constants'


const styles = theme => ({
  main: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: `calc(100vh - 56px)`,
    [theme.breakpoints.down('xs')]: {
      height: `calc(100vh - 56px)`,
    },
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: `calc(100vh - 48px)`,
    },
    [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - 64px)`,
    },
  },
  mainShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  mainWithNavigation: {
    marginLeft: NAVIGATION_DRAWER_WIDTH,
  },
  mainWithInformation: {
    marginRight: INFORMATION_DRAWER_WIDTH,
    [theme.breakpoints.down('md')]: {
      marginRight: RIGHT_DRAWER_MINIMUM_WIDTH,
    },
  },
})


class Main extends Component {

  render() {
    const {
      classes,
      isInformationDrawerOpen,
      isNavigationDrawerOpen,
    } = this.props
    const isDrawerOpen = isNavigationDrawerOpen || isInformationDrawerOpen
    return (
      <main
        className={clsx(classes.main, {
          [classes.mainShift]: isDrawerOpen,
          [classes.mainWithNavigation]: isNavigationDrawerOpen,
          [classes.mainWithInformation]: isInformationDrawerOpen,
        })}
      >
        <Switch>
          <ProtectedRoute exact path='/'
            component={DashboardsWindow} />
          <ProtectedRoute exact path='/tasks'
            component={TasksWindow} />
          <ProtectedRoute exact path='/assets'
            component={AssetsWindow} />
          <ProtectedRoute exact path='/maps'
            component={MapsWindow} />
          <ProtectedRoute exact path='/circuits'
            component={CircuitsWindow} />
          <ProtectedRoute exact path='/risks'
            component={RisksWindow} />
          <ProtectedRoute exact path='/logs'
            component={LogsWindow} />
          <ProtectedRoute exact path='/exports'
            component={ExportsWindow} />
          <ProtectedRoute exact path='/settings'
            component={SettingsWindow} />
          <Route
            component={NotFoundWindow} />
        </Switch>
      </main>
    )
  }

}


export default withStyles(styles)(Main)
