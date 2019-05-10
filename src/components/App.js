import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import classNames from 'classnames'
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import { appaAuthClient } from 'appa-auth-client'
import ApplicationBar from './ApplicationBar'
import NavigationDrawer from './NavigationDrawer'
import {
  CONTENT_PADDING,
  INFORMATION_DRAWER_WIDTH,
  NAVIGATION_DRAWER_WIDTH,
  RIGHT_DRAWER_MINIMUM_WIDTH,
} from '../constants'
import ProtectedRoute from './ProtectedRoute'
import DashboardsWindow from './DashboardsWindow'
import TablesWindowContainer from '../containers/TablesWindowContainer'
import MapsWindow from './MapsWindow'
import CircuitsWindow from './CircuitsWindow'
import ReportsWindow from './ReportsWindow'
import AlertsWindow from './AlertsWindow'
import BookmarksWindow from './BookmarksWindow'
import SettingsWindow from './SettingsWindow'
import NotFoundWindow from './NotFoundWindow'


const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  main: {
    padding: CONTENT_PADDING,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('xs')]: {
      padding: 0,
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
  paper: {
    height: `calc(100vh - 56px - ${CONTENT_PADDING * 2}px)`,
    [theme.breakpoints.down('xs')]: {
      height: `calc(100vh - 56px)`,
    },
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: `calc(100vh - 48px)`,
    },
    [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - 64px - ${CONTENT_PADDING * 2}px)`,
    },
    overflow: 'auto',
  },
})
const theme = {typography: {useNextVariants: true}}
const morningTheme = createMuiTheme(theme)
const eveningTheme = createMuiTheme({...theme, palette: {type: 'dark'}})


class App extends Component {
  state = {
    isAuthenticated: false,
    isNavigationDrawerOpen: true,
    isInformationDrawerOpen: false,
    withMorningTheme: true,
  }

  signIn = () => {
    appaAuthClient.signIn(() => {
      this.setState({isAuthenticated: true})
    })}
  signOut = () => {
    appaAuthClient.signOut(() => {
      this.setState({isAuthenticated: false})
    })}

  openNavigationDrawer = () => {
    this.setState({
      isNavigationDrawerOpen: true,
      isInformationDrawerOpen: false})}
  closeNavigationDrawer = () => {
    this.setState({
      isNavigationDrawerOpen: false})}

  openInformationDrawer = () => {
    this.setState({
      isInformationDrawerOpen: true,
      isNavigationDrawerOpen: false})}
  closeInformationDrawer = () => {
    this.setState({
      isInformationDrawerOpen: false})}

  render() {
    const { classes } = this.props
    const {
      isAuthenticated,
      isNavigationDrawerOpen,
      isInformationDrawerOpen,
      withMorningTheme,
    } = this.state
    const muiTheme = withMorningTheme ? morningTheme : eveningTheme
    const isDrawerOpen = isNavigationDrawerOpen || isInformationDrawerOpen
    return (
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <ApplicationBar
          isNavigationDrawerOpen={isNavigationDrawerOpen}
          isInformationDrawerOpen={isInformationDrawerOpen}
          openNavigationDrawer={this.openNavigationDrawer}
        />
        <div className={classes.toolbar} />
        <main
          className={classNames(classes.main, {
            [classes.mainShift]: isDrawerOpen,
            [classes.mainWithNavigation]: isNavigationDrawerOpen,
            [classes.mainWithInformation]: isInformationDrawerOpen,
          })}
        >
          <Paper className={classes.paper}>
            <Switch>
              <ProtectedRoute exact path='/' render={() => (
                <DashboardsWindow />
              )} />
              <ProtectedRoute exact path='/tables' render={() => (
                <TablesWindowContainer />
              )} />
              <ProtectedRoute exact path='/maps' render={() => (
                <MapsWindow />
              )} />
              <ProtectedRoute exact path='/circuits' render={() => (
                <CircuitsWindow />
              )} />
              <ProtectedRoute exact path='/reports' render={() => (
                <ReportsWindow />
              )} />
              <ProtectedRoute exact path='/alerts' render={() => (
                <AlertsWindow />
              )} />
              <ProtectedRoute exact path='/bookmarks' render={() => (
                <BookmarksWindow />
              )} />
              <ProtectedRoute exact path='/settings' render={() => (
                <SettingsWindow />
              )} />
              <Route component={NotFoundWindow} />
            </Switch>
          </Paper>
        </main>
        <NavigationDrawer
          variant='persistent'
          anchor='left'
          open={isNavigationDrawerOpen}
          isAuthenticated={isAuthenticated}
          closeNavigationDrawer={this.closeNavigationDrawer}
          signIn={this.signIn}
          signOut={this.signOut}
        />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
