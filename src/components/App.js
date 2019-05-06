import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import classNames from 'classnames'
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import ApplicationBar from './ApplicationBar'
import NavigationDrawer from './NavigationDrawer'
import {
  CONTENT_PADDING,
  INFORMATION_DRAWER_WIDTH,
  NAVIGATION_DRAWER_WIDTH,
  RIGHT_DRAWER_MINIMUM_WIDTH,
} from '../constants'


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
    isNavigationDrawerOpen: true,
    isInformationDrawerOpen: false,
    withMorningTheme: true,
  }

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
      isNavigationDrawerOpen,
      isInformationDrawerOpen,
      withMorningTheme,
    } = this.state
    const muiTheme = withMorningTheme ? morningTheme : eveningTheme
    const isDrawerOpen = isNavigationDrawerOpen || isInformationDrawerOpen
    return (
      <MuiThemeProvider theme={muiTheme} className={classes.root}>
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
            <Route exact path='/' render={() => (
              'Dashboard'
            )} />
            <Route exact path='/tables' render={() => (
              'Tables'
            )} />
            <Route exact path='/maps' render={() => (
              'Maps'
            )} />
            <Route exact path='/circuits' render={() => (
              'Circuits'
            )} />
            <Route exact path='/reports' render={() => (
              'Reports'
            )} />
            <Route exact path='/alerts' render={() => (
              'Alerts'
            )} />
            <Route exact path='/bookmarks' render={() => (
              'Bookmarks'
            )} />
            <Route exact path='/settings' render={() => (
              'Settings'
            )} />
          </Paper>
        </main>
        <NavigationDrawer
          variant='persistent'
          anchor='left'
          open={isNavigationDrawerOpen}
          closeNavigationDrawer={this.closeNavigationDrawer}
        />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
